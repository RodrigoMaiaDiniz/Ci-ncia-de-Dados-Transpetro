import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

let aiClient: GoogleGenAI | null = null;
function getGeminiAI(): GoogleGenAI {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    aiClient = new GoogleGenAI({
      apiKey: apiKey || "",
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return aiClient;
}

// Robust multi-model fallback order
const FALLBACK_MODELS = [
  "gemini-flash-latest",
  "gemini-3.1-flash-lite",
  "gemini-3.8-flash"
];

async function callGeminiWithFallback(params: {
  contents: any;
  config?: any;
}) {
  const ai = getGeminiAI();
  let lastError: any = null;

  for (const model of FALLBACK_MODELS) {
    try {
      const response = await ai.models.generateContent({
        model,
        contents: params.contents,
        config: params.config,
      });
      if (response && response.text) {
        return response;
      }
    } catch (err: any) {
      console.warn(`[Gemini API] Tentativa com modelo ${model} falhou:`, err?.message || err);
      lastError = err;
    }
  }

  throw lastError || new Error("Todos os modelos de IA estão temporariamente indisponíveis.");
}

interface ChatAttachmentPayload {
  id?: string;
  type: 'image' | 'pdf' | 'link';
  name: string;
  mimeType?: string;
  dataUrl?: string;
  linkUrl?: string;
}

interface ChatMessagePayload {
  role: string;
  content: string;
  attachments?: ChatAttachmentPayload[];
}

function sanitizeChatContents(messages: Array<ChatMessagePayload>) {
  if (!messages || messages.length === 0) {
    return [{ role: "user", parts: [{ text: "Olá! Como posso estudar para a Transpetro?" }] }];
  }

  // Filter out any initial greetings from the assistant/model before the first user message
  const firstUserIdx = messages.findIndex(m => m.role === "user");
  const validMessages = firstUserIdx >= 0 ? messages.slice(firstUserIdx) : messages;

  const contents: Array<{ role: "user" | "model"; parts: any[] }> = [];

  for (const m of validMessages) {
    const role: "user" | "model" = m.role === "assistant" || m.role === "model" ? "model" : "user";
    const msgParts: any[] = [];

    // Process attachments (Images, PDFs, Links)
    if (m.attachments && Array.isArray(m.attachments) && m.attachments.length > 0) {
      for (const att of m.attachments) {
        if ((att.type === 'image' || att.type === 'pdf') && att.dataUrl) {
          const match = att.dataUrl.match(/^data:([^;]+);base64,(.+)$/);
          if (match) {
            msgParts.push({
              inlineData: {
                mimeType: match[1] || att.mimeType || (att.type === 'pdf' ? 'application/pdf' : 'image/jpeg'),
                data: match[2]
              }
            });
          }
        } else if (att.type === 'link' && att.linkUrl) {
          msgParts.push({
            text: `[REFERÊNCIA / LINK ANEXADO: "${att.name || 'Link'}" - URL: ${att.linkUrl}]`
          });
        }
      }
    }

    const textContent = (m.content || "").trim();
    if (textContent || msgParts.length === 0) {
      msgParts.push({ text: textContent || "Analise os arquivos e links anexados." });
    }

    const last = contents[contents.length - 1];
    
    // Ensure strict alternation of user -> model -> user -> model
    if (last && last.role === role) {
      last.parts.push(...msgParts);
    } else {
      contents.push({
        role,
        parts: msgParts
      });
    }
  }

  // Fallback if empty or first turn is still model
  if (contents.length === 0) {
    return [{ role: "user", parts: [{ text: "Olá! Pode me orientar nos estudos para a Transpetro?" }] }];
  }
  if (contents[0].role === "model") {
    contents.shift();
  }
  if (contents.length === 0) {
    return [{ role: "user", parts: [{ text: "Olá!" }] }];
  }

  return contents;
}

const app = express();
const PORT = 3000;

app.use(express.json({ limit: "30mb" }));

// Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// Helper para converter áudio Linear PCM (L16) retornado pelo Gemini para WAV padrão reproduzível
function pcmToWav(pcmBuffer: Buffer, sampleRate = 24000, channels = 1, bitsPerSample = 16): Buffer {
  const byteRate = sampleRate * channels * (bitsPerSample / 8);
  const blockAlign = channels * (bitsPerSample / 8);
  const dataSize = pcmBuffer.length;
  const headerSize = 44;
  const totalSize = headerSize + dataSize;
  const out = Buffer.alloc(totalSize);

  out.write("RIFF", 0);
  out.writeUInt32LE(totalSize - 8, 4);
  out.write("WAVE", 8);

  out.write("fmt ", 12);
  out.writeUInt32LE(16, 16);
  out.writeUInt16LE(1, 20); // AudioFormat 1 = PCM
  out.writeUInt16LE(channels, 22);
  out.writeUInt32LE(sampleRate, 24);
  out.writeUInt32LE(byteRate, 28);
  out.writeUInt16LE(blockAlign, 32);
  out.writeUInt16LE(bitsPerSample, 34);

  out.write("data", 36);
  out.writeUInt32LE(dataSize, 40);
  pcmBuffer.copy(out, 44);

  return out;
}

// Endpoint de Síntese de Voz de Alta Fidelidade (Gemini AI Neural TTS)
app.post("/api/tts", async (req, res) => {
  try {
    const { text, voiceName = "Kore" } = req.body;
    if (!text || typeof text !== "string" || !text.trim()) {
      return res.status(400).json({ error: "Texto para sintetizar não fornecido." });
    }

    const cleanText = text.trim().slice(0, 1800);
    const ai = getGeminiAI();

    const response = await ai.models.generateContent({
      model: "gemini-3.1-flash-tts-preview",
      contents: [{ parts: [{ text: cleanText }] }],
      config: {
        responseModalities: ["AUDIO"],
        speechConfig: {
          voiceConfig: {
            prebuiltVoiceConfig: { voiceName: voiceName || "Kore" }
          }
        }
      }
    });

    const rawData = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
    if (!rawData) {
      return res.status(500).json({ error: "Não foi possível gerar áudio neural para o texto solicitado." });
    }

    const pcmBuf = Buffer.from(rawData, "base64");
    const wavBuf = pcmToWav(pcmBuf, 24000, 1, 16);
    const audioBase64 = `data:audio/wav;base64,${wavBuf.toString("base64")}`;

    res.json({
      success: true,
      audioBase64,
      sampleRate: 24000,
      durationMs: Math.round((pcmBuf.length / (24000 * 2)) * 1000)
    });
  } catch (error: any) {
    console.error("Erro no endpoint /api/tts:", error);
    res.status(500).json({ error: error?.message || "Erro na síntese neural de voz." });
  }
});

import { cleanCesgranrioExamNotation } from "./src/utils/mathNotation";

// Chat endpoint
app.post("/api/chat", async (req, res) => {
  const { messages, mode = "tutor", contextTopic } = req.body;

  try {
    const cesgranrioExamNotationGuideline = `
DIRETRIZ OBRIGATÓRIA DE NOTAÇÃO MATEMÁTICA E FORMATAÇÃO (PADRÃO OFICIAL DAS PROVAS CESGRANRIO / PETROBRAS / TRANSPETRO):
- É EXPRESSAMENTE PROIBIDO USAR CÓDIGO OU SINTAXE LATEX. NÃO use barras invertidas como \\frac, \\sum, \\sqrt, \\alpha, \\beta, \\mu, \\sigma, nem cifrões como $...$ ou $$...$$.
- Toda e qualquer fórmula, equação, símbolo estatístico ou expressão matemática DEVE ser apresentada em TEXTO CLARO E LEGÍVEL COM NOTAÇÃO PADRÃO DE PROVA IMPRESSA DA CESGRANRIO:
  * Variáveis e coeficientes: y = b0 + b1*x ou Y = β0 + β1*X + e
  * Letras gregas e operadores diretos: α (alfa), β (beta), μ (média populacional), σ (desvio padrão), σ² (variância), λ (lambda), θ (theta), ε (erro), Σ (somatório), √ (raiz), ², ³, ≤, ≥, ≠, ≈, ±, ∈.
  * Frações e divisões: use a barra inclinada com parênteses claros, ex: (X - μ) / σ ou (VP) / (VP + FN).
  * Hipóteses estatísticas: "H0: μ = 0" e "H1: μ ≠ 0" (ou Ha), exatamente como vem no caderno de questões da Cesgranrio.
  * Regressão e Mínimos Quadrados: "SQTotal = SQReg + SQRes", "R² = 1 - (SQRes / SQTotal)", "Estatística F = QMReg / QMRes".
  * Teste Z e t de Student: "z_calculado = (x_barra - μ0) / (σ / √(n))", "graus de liberdade = n - 1".
  * Regularização: "Custo_L1 = EQM + λ * Σ|w_i| (Lasso)", "Custo_L2 = EQM + λ * Σ(w_i²) (Ridge)".
  * Métricas de Machine Learning: "Acurácia = (VP + VN) / Total", "Sensibilidade (Recall) = VP / (VP + FN)", "Precisão = VP / (VP + FP)", "F1 = 2 * (Precisão * Recall) / (Precisão + Recall)".
  * Teorema de Bayes: "P(A|B) = [P(B|A) * P(A)] / P(B)".
- Use Markdown simples e limpo (negrito, listas com marcadores, tabelas e blocos de código com linguagem identificada). O candidato precisa ler a fórmula exatamente como estará impressa na folha de prova da Transpetro e Petrobras elaborada pela Fundação Cesgranrio.`;

    const systemInstructions: Record<string, string> = {
      tutor: `Você é o "Agente Especialista Transpetro - Ciência de Dados", um mentor de altíssimo nível para candidatos do Concurso Público da Transpetro (Banca Fundação Cesgranrio) para o cargo de Profissional de Nível Superior - Ciência de Dados.
Seu conhecimento abrange todo o edital oficial:
1. Estatística e Probabilidade (inferência, distribuições, testes de hipótese, regressões, Bayes, intervalos de confiança).
2. Machine Learning & Deep Learning (supervisionado, não-supervisionado, XGBoost, Random Forest, Redes Neurais, CNNs, Transformers, métricas como ROC-AUC, F1, LogLoss, regularização L1/L2, validação cruzada).
3. Engenharia de Dados & Big Data (SQL avançado, Window Functions, modelagem dimensional, Apache Spark/PySpark, Hadoop, Data Lakehouse, Kafka, Airflow).
4. Python para Dados (Pandas, NumPy, Scikit-learn, Polars) e MLOps (Data Drift, Concept Drift, monitoramento, deploy).
5. Governança e Ética (LGPD, DAMA DMBOK, qualidade e linhagem de dados, SHAP/LIME).
6. Casos práticos da Transpetro (dutos, navios petroleiros e gaseiros, terminais aquaviários e terrestres, telemetria de sensores, manutenção preditiva, otimização logística de combustíveis e GLP).

Instruções pedagógicas:
- Seja didático, rigoroso e direto.
- Utilize formatação Markdown rica (títulos, listas, tabelas e blocos de código Python/SQL comentados).
- NUNCA use código LaTeX. Escreva fórmulas exatamente na notação impressa da Cesgranrio/Petrobras (ex: H0, p ≤ α, β1, μ, σ, √(n)).
- Sempre que pertinente, relacione a teoria com como a BANCA CESGRANRIO costuma cobrar e aplicações reais no setor de transporte de óleo e gás da Transpetro.`,

      cesgranrio_traps: `Você é o "Especialista em Pegadinhas Cesgranrio" para o concurso Transpetro Ciência de Dados.
Sua missão é desmascarar as pegadinhas e sutilezas conceituais que a Fundação Cesgranrio adora colocar em provas da Transpetro e Petrobras.
Exemplos de pegadinhas frequentes:
- Confundir Correlação com Causalidade ou pressupostos de Pearson vs Spearman.
- Interpretação do P-valor e Erros Tipo I (α) e Tipo II (β) (falso positivo vs falso negativo).
- Diferença entre L1 (Lasso - faz feature selection) e L2 (Ridge - encolhe coeficientes).
- Uso de Acurácia em datasets desbalanceados vs PR-AUC / F1-Score.
- Diferença entre Bagging (reduz variância) e Boosting (reduz viés).
- Comportamento de NULLs em SQL (COUNT(*) vs COUNT(coluna), LEFT JOIN com WHERE vs ON).
- Lazy evaluation e transformações vs ações no Apache Spark.
Analise a dúvida do aluno, aponte onde os candidatos costumam errar e como gabaritar com segurança. Nunca use código LaTeX; use notação textual idêntica às questões de prova.`,

      debugger: `Você é o "Instrutor de Algoritmos & Live Code" para a prova técnica da Transpetro Ciência de Dados.
Seu foco é código executável em Python (Pandas, NumPy, Scikit-learn, PySpark) e SQL padrão ANSI/PostgreSQL/SparkSQL.
Explique passo a passo a lógica, a complexidade temporal e espacial, e forneça snippets limpos, idiomáticos e otimizados para pipelines de dados reais. Nunca use LaTeX para explicar complexidade ou cálculos.`,

      quiz: `Você é o "Avaliador de Simulação Oral da Transpetro".
Você deve interagir com o candidato como um examinador técnico. Formule perguntas objetivas ou pequenos estudos de caso, avalie as respostas com rigor, aponte acertos e correções pontuais e convide o usuário a resolver o próximo desafio. Apresente fórmulas em texto limpo como nas provas da Cesgranrio.`
    };

    const activeInstruction = systemInstructions[mode] || systemInstructions.tutor;
    const additionalContext = contextTopic ? `\nTópico focado: ${contextTopic}` : "";
    const attachmentGuideline = `\nInstruções para Anexos (Imagens, PDFs e Links):
Caso o usuário forneça imagens (ex: prints de questões de provas anteriores da Cesgranrio, gráficos de métricas, esquemas de pipelines de dados, diagramas de dutos), documentos PDF (editais, apostilas, provas) ou links para documentações, analise detalhadamente os elementos visuais, fórmulas e dados técnicos contidos nos anexos e integre a análise à sua resposta pedagógica com precisão.`;

    const contents = sanitizeChatContents(messages);

    const response = await callGeminiWithFallback({
      contents,
      config: {
        systemInstruction: `${activeInstruction}${cesgranrioExamNotationGuideline}${additionalContext}${attachmentGuideline}`,
        temperature: 0.35,
      },
    });

    const cleanedText = cleanCesgranrioExamNotation(response.text || "Sem resposta gerada pelo modelo.");
    res.json({ text: cleanedText });
  } catch (error: any) {
    console.error("Erro no chat:", error);

    // Provide a resilient, high-value fallback response if upstream services hit transient limits
    const lastUserMsg = (messages || []).filter((m: any) => m.role === "user").pop();
    const query = lastUserMsg?.content || "Sua dúvida";

    res.json({
      text: `### 🎯 Orientação Especializada Transpetro / Cesgranrio\n\n` +
            `*(Atenção: Os servidores centrais de IA estão com alta demanda temporária, exibindo resposta de prontidão da base técnica)*\n\n` +
            `**Sobre a sua consulta:** *"${query.slice(0, 140)}..."*\n\n` +
            `#### 📌 Pontos-Chave Essenciais para a Prova da Cesgranrio:\n` +
            `1. **Interpretação e Modelagem:** Na Fundação Cesgranrio, problemas com sensores de dutos e telemetria naval envolvem classes fortemente desbalanceadas. Jamais use Acurácia isolada; a banca cobra **PR-AUC, F1-Score ponderado e matriz de confusão (falsos negativos têm alto custo operacional)**.\n` +
            `2. **Regularização (L1 vs L2):** Lasso (L1) zera coeficientes (faz seleção de variáveis), enquanto Ridge (L2) encolhe os pesos proporcionalmente sem zerá-los.\n` +
            `3. **Big Data & Spark:** Lembre-se que operações como \`map\`, \`filter\` e \`select\` são **transformações com avaliação preguiçosa (lazy evaluation)**, enquanto \`count\`, \`collect\` e \`take\` são **ações que disparam o plano físico no Catalyst Optimizer**.\n\n` +
            `💡 *Dica:* Clique no botão **"Tentar Novamente"** ou envie uma nova mensagem para obter a resolução detalhada via IA assim que os servidores normalizarem.`
    });
  }
});

// Generate Cesgranrio style Questions
app.post("/api/generate-questions", async (req, res) => {
  try {
    const { topic = "Machine Learning", count = 5, difficulty = "Médio/Difícil", context = "Transpetro" } = req.body;
    const ai = getGeminiAI();

    const prompt = `Gere ${count} questões inéditas de múltipla escolha rigorosamente no padrão da BANCA CESGRANRIO para o concurso público TRANSPETRO - Cargo de Nível Superior: Profissional de Ciência de Dados.

Tópico: ${topic}
Nível de Dificuldade: ${difficulty}
Contexto: ${context} (Incorpore quando relevante situações realistas da Transpetro: telemetria de dutos, sensores IoT de vibração/pressão em bombas, logística de navios petroleiros, detecção de vazamentos, manutenção preditiva, previsão de demanda de derivados de petróleo, governança de dados operacionais).

DIRETRIZ OBRIGATÓRIA DE NOTAÇÃO: PROIBIDO usar código ou sintaxe LaTeX (NÃO use $, $$, \\frac, \\sum, \\sqrt, etc.). Escreva todas as fórmulas e expressões em texto puro com símbolos padrão (ex: H0, p ≤ α, β1, μ, σ, √(n), VP / (VP + FN)), exatamente como impresso nos cadernos oficiais da Cesgranrio.

Cada questão DEVE ter:
1. Enunciado bem elaborado com contextualização técnica e/ou código/tabela quando aplicável.
2. Exatamente 5 alternativas identificadas pelas letras A, B, C, D, E.
3. Indicação exata da alternativa correta (apenas a letra: 'A', 'B', 'C', 'D' ou 'E').
4. Justificativa minuciosa da alternativa correta.
5. Explicação pontual do erro de cada um dos 4 distratores (alternativas incorretas).
6. Tópico e Subtópico do Edital.
7. Dica de ouro para identificar a pegadinha da Cesgranrio.`;

    const response = await callGeminiWithFallback({
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            questions: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  id: { type: Type.STRING },
                  topic: { type: Type.STRING },
                  subtopic: { type: Type.STRING },
                  difficulty: { type: Type.STRING },
                  statement: { type: Type.STRING, description: "Texto completo do enunciado da questão" },
                  options: {
                    type: Type.ARRAY,
                    items: {
                      type: Type.OBJECT,
                      properties: {
                        letter: { type: Type.STRING, description: "A, B, C, D ou E" },
                        text: { type: Type.STRING, description: "Texto da alternativa" },
                      },
                      required: ["letter", "text"],
                    },
                  },
                  correctAnswer: { type: Type.STRING, description: "Apenas a letra correta: A, B, C, D ou E" },
                  explanationCorrect: { type: Type.STRING, description: "Justificativa detalhada do gabarito" },
                  distractorAnalysis: {
                    type: Type.ARRAY,
                    items: {
                      type: Type.OBJECT,
                      properties: {
                        letter: { type: Type.STRING },
                        whyWrong: { type: Type.STRING },
                      },
                      required: ["letter", "whyWrong"],
                    },
                  },
                  cesgranrioTip: { type: Type.STRING, description: "Dica de ouro sobre o padrão da banca" },
                },
                required: ["id", "topic", "statement", "options", "correctAnswer", "explanationCorrect", "distractorAnalysis"],
              },
            },
          },
          required: ["questions"],
        },
      },
    });

    const parsed = JSON.parse(response.text || "{}");
    if (parsed.questions && Array.isArray(parsed.questions)) {
      parsed.questions = parsed.questions.map((q: any) => ({
        ...q,
        statement: cleanCesgranrioExamNotation(q.statement || ""),
        options: (q.options || []).map((opt: any) => ({
          ...opt,
          text: cleanCesgranrioExamNotation(opt.text || "")
        })),
        explanationCorrect: cleanCesgranrioExamNotation(q.explanationCorrect || ""),
        distractorAnalysis: (q.distractorAnalysis || []).map((d: any) => ({
          ...d,
          whyWrong: cleanCesgranrioExamNotation(d.whyWrong || "")
        })),
        cesgranrioTip: cleanCesgranrioExamNotation(q.cesgranrioTip || "")
      }));
    }
    res.json(parsed);
  } catch (error: any) {
    console.error("Erro ao gerar questões:", error);
    res.status(500).json({ error: error.message || "Erro ao gerar questões com IA." });
  }
});

// Evaluate Written Essay (Prova Discursiva / Estudo de Caso)
app.post("/api/evaluate-essay", async (req, res) => {
  try {
    const { scenarioTitle, scenarioPrompt, candidateAnswer, keyCriteria } = req.body;

    const prompt = `Você é a banca examinadora oficial da Cesgranrio para a Prova Discursiva / Estudo de Caso do Concurso da Transpetro - Ciência de Dados.

Tema do Estudo de Caso: ${scenarioTitle}
Enunciado / Problema Técnico: ${scenarioPrompt}
Critérios Específicos: ${keyCriteria || "Abordagem metodológica de Ciência de Dados, arquitetura de solução, métricas, mitigação de riscos e governança."}

Texto da Resposta do Candidato:
"""
${candidateAnswer}
"""

Avalie com rigor técnico segundo a matriz oficial de correção (Total de 100 pontos):
1. Domínio do Conhecimento Técnico em Ciência de Dados e IA (0 a 40 pontos).
2. Arquitetura e Viabilidade Técnica da Solução para o contexto Transpetro (0 a 30 pontos).
3. Estrutura Textual, Clareza, Coesão e Terminologia Técnica Formal (0 a 20 pontos).
4. Boas Práticas, MLOps, Métricas de Avaliação e Governança/LGPD (0 a 10 pontos).

Forneça nota total (0-100), notas por critério, pontos fortes, pontos fracos com sugestões de melhoria, e o Espelho de Correção Modelo Padrão que tiraria nota 100.`;

    const response = await callGeminiWithFallback({
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            totalScore: { type: Type.NUMBER, description: "Nota final de 0 a 100" },
            scoreBreakdown: {
              type: Type.OBJECT,
              properties: {
                technicalKnowledge: { type: Type.NUMBER, description: "0 a 40" },
                architecturalSolution: { type: Type.NUMBER, description: "0 a 30" },
                clarityAndStructure: { type: Type.NUMBER, description: "0 a 20" },
                mlopsAndGovernance: { type: Type.NUMBER, description: "0 a 10" },
              },
              required: ["technicalKnowledge", "architecturalSolution", "clarityAndStructure", "mlopsAndGovernance"],
            },
            status: { type: Type.STRING, description: "Aprovado com Excelência (>=85), Aprovado (>=70), Recuperação (<70)" },
            generalComment: { type: Type.STRING, description: "Parecer geral da banca examinadora" },
            strengths: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "Aspectos bem desenvolvidos na resposta",
            },
            improvements: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "Gaps técnicos ou omissões que custaram pontos",
            },
            lineByLineFeedback: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  topic: { type: Type.STRING },
                  feedback: { type: Type.STRING },
                },
                required: ["topic", "feedback"],
              },
            },
            modelAnswer: { type: Type.STRING, description: "Espelho de resposta padrão nota 100 da banca" },
          },
          required: ["totalScore", "scoreBreakdown", "status", "generalComment", "strengths", "improvements", "modelAnswer"],
        },
      },
    });

    const parsed = JSON.parse(response.text || "{}");
    res.json(parsed);
  } catch (error: any) {
    console.error("Erro ao avaliar discursiva:", error);
    res.status(500).json({ error: error.message || "Erro ao avaliar discursiva com IA." });
  }
});

// Generate realistic Transpetro Case Studies / Discursiva Prompts
app.post("/api/generate-essay-prompt", async (req, res) => {
  try {
    const { category = "Manutenção Preditiva & IoT" } = req.body;

    const prompt = `Gere uma proposta de Estudo de Caso / Questão Discursiva técnica inédita para a prova de Nível Superior - Ciência de Dados da Transpetro (Banca Cesgranrio).
Categoria: ${category}
Contexto: Cenário real da Transpetro (e.g., transporte de hidrocarbonetos por dutos submarinos e terrestres, terminais aquaviários, navios petroleiros/gaseiros, telemetria de sensores, detecção de cavitação em bombas centrífugas, prevenção de corrosão interna, otimização de frotas e bunkering, IA generativa para conformidade operacional).

O caso deve exigir do candidato:
- Formulação do problema de ML/Estatística.
- Escolha dos dados, pré-processamento e engenharia de atributos (feature engineering).
- Escolha da arquitetura do modelo e métricas adequadas (com justificativa para desbalanceamento se for anomalia).
- Pipeline de MLOps (monitoramento de drift, CI/CD, inferência em tempo real vs batch).
- Governança, explicabilidade (ex: SHAP) e segurança operacional.`;

    const response = await callGeminiWithFallback({
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            id: { type: Type.STRING },
            title: { type: Type.STRING },
            category: { type: Type.STRING },
            estimatedTimeMinutes: { type: Type.NUMBER },
            scenarioContext: { type: Type.STRING, description: "Cenário contextualizado da Transpetro" },
            promptQuestion: { type: Type.STRING, description: "Instruções específicas e itens que o candidato deve responder (a, b, c, d)" },
            evaluationRubric: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "Critérios chaves que a banca vai avaliar",
            },
            keyConceptsExpected: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "Termos e técnicas essenciais esperados",
            },
          },
          required: ["id", "title", "category", "scenarioContext", "promptQuestion", "evaluationRubric", "keyConceptsExpected"],
        },
      },
    });

    const parsed = JSON.parse(response.text || "{}");
    res.json(parsed);
  } catch (error: any) {
    console.error("Erro ao gerar estudo de caso:", error);
    res.status(500).json({ error: error.message || "Erro ao gerar estudo de caso com IA." });
  }
});

// Generate Personalized Study Plan
app.post("/api/generate-study-plan", async (req, res) => {
  try {
    const { dailyHours = 3, targetDays = 60, currentLevel = "Intermediário", weakTopics = [] } = req.body;

    const prompt = `Crie um plano de estudos tático e intensivo para o Concurso Público Transpetro - Ciência de Dados (Nível Superior - Cesgranrio).
Horas disponíveis por dia: ${dailyHours}h
Dias até a prova: ${targetDays} dias
Nível atual: ${currentLevel}
Tópicos com maior dificuldade relatada pelo candidato: ${weakTopics.join(", ") || "Inferência Estatística, MLOps e PySpark"}

O plano deve cobrir com pesos proporcionais à Cesgranrio:
- Bloco 1: Conhecimentos Básicos (Língua Portuguesa e Língua Inglesa técnica).
- Bloco 2 e 3: Conhecimentos Específicos (Estatística/Probabilidade, ML/Deep Learning, SQL Avançado/Big Data/Spark, Python, MLOps/Governança LGPD).

Estruture em fases (Fundamentação, Aprofundamento Cesgranrio, Simulação Intensiva & Reta Final), com cronograma semanal e metas práticas.`;

    const response = await callGeminiWithFallback({
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING },
            summary: { type: Type.STRING },
            recommendedWeeklyHours: { type: Type.NUMBER },
            phases: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  phaseNumber: { type: Type.NUMBER },
                  phaseName: { type: Type.STRING },
                  weeksSpan: { type: Type.STRING },
                  focus: { type: Type.STRING },
                  goals: { type: Type.ARRAY, items: { type: Type.STRING } },
                  cesgranrioTips: { type: Type.STRING },
                },
                required: ["phaseNumber", "phaseName", "weeksSpan", "focus", "goals"],
              },
            },
            weeklyRoutine: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  day: { type: Type.STRING },
                  primaryTopic: { type: Type.STRING },
                  activity: { type: Type.STRING },
                  durationHours: { type: Type.NUMBER },
                },
                required: ["day", "primaryTopic", "activity", "durationHours"],
              },
            },
            topCesgranrioPriorities: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
            },
          },
          required: ["title", "summary", "phases", "weeklyRoutine", "topCesgranrioPriorities"],
        },
      },
    });

    const parsed = JSON.parse(response.text || "{}");
    res.json(parsed);
  } catch (error: any) {
    console.error("Erro ao gerar plano de estudos:", error);
    res.status(500).json({ error: error.message || "Erro ao gerar plano de estudos com IA." });
  }
});

// Helper para gerar diagramas técnicos e ilustrações em SVG caso o modelo raster nativo esteja temporariamente indisponível
function getDeterministicVisualSvg(topic: string, style: string, aspectRatio = "16:9"): { svg: string; title: string; description: string; technicalDetails: string[]; keyFormula: string } {
  const is1to1 = aspectRatio === "1:1";
  const is4to3 = aspectRatio === "4:3";
  const vbW = is1to1 ? 800 : is4to3 ? 800 : 1000;
  const vbH = is1to1 ? 800 : is4to3 ? 600 : 562;
  const lower = (topic + " " + style).toLowerCase();

  if (lower.includes("roc") || lower.includes("métrica") || lower.includes("confus") || lower.includes("classific") || lower.includes("precision") || lower.includes("recall")) {
    const title = "Curva ROC vs Curva PR & Matriz de Confusão Cesgranrio";
    const description = "Visualização do comportamento do limiar de decisão em problemas com classes desbalanceadas (ex: falhas em dutos e sensores Transpetro). A Cesgranrio cobra a distinção entre TPR (Sensibilidade), FPR e o trade-off de PR-AUC.";
    const technicalDetails = [
      "Taxa de Verdadeiros Positivos (TPR/Recall) = VP / (VP + FN)",
      "Taxa de Falsos Positivos (FPR) = FP / (FP + VN) = 1 - Especificidade",
      "Em desbalanceamento severo (ex: 99,8% normais vs 0,2% vazamentos), a curva Precision-Recall é superior à ROC",
      "Ponto de corte ótimo (Youden Index J = TPR - FPR) maximiza a separabilidade do modelo"
    ];
    const keyFormula = "J = Sensibilidade + Especificidade - 1 | AUC-ROC ∈ [0.5, 1.0]";
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${vbW} ${vbH}" width="100%" height="100%" style="background:#090d16;font-family:ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,sans-serif;">
  <defs>
    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#090d16"/>
      <stop offset="50%" stop-color="#0f172a"/>
      <stop offset="100%" stop-color="#070a12"/>
    </linearGradient>
    <linearGradient id="rocCurveGrad" x1="0%" y1="100%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#10b981"/>
      <stop offset="60%" stop-color="#06b6d4"/>
      <stop offset="100%" stop-color="#3b82f6"/>
    </linearGradient>
    <linearGradient id="areaGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#06b6d4" stop-opacity="0.35"/>
      <stop offset="100%" stop-color="#06b6d4" stop-opacity="0.02"/>
    </linearGradient>
    <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="4" result="blur"/>
      <feComposite in="SourceGraphic" in2="blur" operator="over"/>
    </filter>
  </defs>
  <rect width="${vbW}" height="${vbH}" fill="url(#bgGrad)"/>
  <rect x="20" y="20" width="${vbW - 40}" height="${vbH - 40}" rx="16" fill="none" stroke="#1e293b" stroke-width="1.5"/>
  
  <!-- Header -->
  <g transform="translate(40, 50)">
    <rect x="0" y="0" width="190" height="24" rx="6" fill="#10b981" fill-opacity="0.15" stroke="#10b981" stroke-opacity="0.4"/>
    <text x="10" y="16" fill="#34d399" font-size="11" font-weight="700" letter-spacing="1">CESGRANRIO • CIÊNCIA DE DADOS</text>
    <text x="0" y="52" fill="#ffffff" font-size="20" font-weight="800">Visualização de Desempenho: Curva ROC e Limiares</text>
    <text x="0" y="72" fill="#94a3b8" font-size="12">Avaliação de Modelos Preditivos e Trade-Offs em Telemetria Operacional Transpetro</text>
  </g>

  <!-- ROC Chart Box -->
  <g transform="translate(60, 150)">
    <rect x="0" y="0" width="460" height="340" rx="12" fill="#0f172a" fill-opacity="0.8" stroke="#334155" stroke-width="1"/>
    <!-- Grid -->
    <line x1="50" y1="280" x2="430" y2="280" stroke="#475569" stroke-width="1.5"/>
    <line x1="50" y1="40" x2="50" y2="280" stroke="#475569" stroke-width="1.5"/>
    <line x1="50" y1="220" x2="430" y2="220" stroke="#1e293b" stroke-dasharray="4"/>
    <line x1="50" y1="160" x2="430" y2="160" stroke="#1e293b" stroke-dasharray="4"/>
    <line x1="50" y1="100" x2="430" y2="100" stroke="#1e293b" stroke-dasharray="4"/>
    <line x1="145" y1="40" x2="145" y2="280" stroke="#1e293b" stroke-dasharray="4"/>
    <line x1="240" y1="40" x2="240" y2="280" stroke="#1e293b" stroke-dasharray="4"/>
    <line x1="335" y1="40" x2="335" y2="280" stroke="#1e293b" stroke-dasharray="4"/>

    <!-- Labels -->
    <text x="25" y="285" fill="#64748b" font-size="10">0.0</text>
    <text x="25" y="225" fill="#64748b" font-size="10">0.25</text>
    <text x="25" y="165" fill="#64748b" font-size="10">0.50</text>
    <text x="25" y="105" fill="#64748b" font-size="10">0.75</text>
    <text x="25" y="45" fill="#64748b" font-size="10">1.0</text>
    <text x="240" y="315" fill="#94a3b8" font-size="11" font-weight="600" text-anchor="middle">FPR (1 - Especificidade)</text>
    <text x="-160" y="15" fill="#94a3b8" font-size="11" font-weight="600" text-anchor="middle" transform="rotate(-90)">TPR (Sensibilidade / Recall)</text>

    <!-- Diagonal Random Chance -->
    <line x1="50" y1="280" x2="430" y2="40" stroke="#e2e8f0" stroke-opacity="0.3" stroke-dasharray="5 5" stroke-width="2"/>
    <text x="290" y="170" fill="#94a3b8" font-size="10" transform="rotate(-32 290 170)">Classificador Aleatório (AUC = 0.50)</text>

    <!-- ROC Fill Area -->
    <path d="M 50 280 Q 70 80, 180 55 T 430 40 L 430 280 Z" fill="url(#areaGrad)"/>

    <!-- ROC Curve Line -->
    <path d="M 50 280 Q 70 80, 180 55 T 430 40" fill="none" stroke="url(#rocCurveGrad)" stroke-width="3.5" filter="url(#glow)"/>

    <!-- Optimal Point (Youden) -->
    <circle cx="120" cy="78" r="6" fill="#f59e0b" stroke="#ffffff" stroke-width="2"/>
    <text x="135" y="75" fill="#fbbf24" font-size="11" font-weight="bold">Ponto de Corte Ótimo (J)</text>
    <text x="135" y="90" fill="#cbd5e1" font-size="9">TPR: 0.92 | FPR: 0.08</text>

    <!-- AUC Badge -->
    <rect x="280" y="220" width="130" height="35" rx="8" fill="#1e293b" stroke="#06b6d4" stroke-width="1.5"/>
    <text x="290" y="235" fill="#94a3b8" font-size="9">Área sob a Curva:</text>
    <text x="290" y="249" fill="#22d3ee" font-size="13" font-weight="bold">AUC-ROC = 0.94</text>
  </g>

  <!-- Confusion Matrix & Exam Notes Panel -->
  <g transform="translate(550, 150)">
    <!-- Matrix Box -->
    <rect x="0" y="0" width="${vbW - 590}" height="175" rx="12" fill="#0f172a" stroke="#334155" stroke-width="1"/>
    <text x="15" y="24" fill="#38bdf8" font-size="12" font-weight="700">MATRIZ DE CONFUSÃO (CASO TRANSPETRO)</text>
    
    <g transform="translate(20, 40)">
      <!-- VP Box -->
      <rect x="0" y="0" width="170" height="50" rx="6" fill="#065f46" fill-opacity="0.3" stroke="#10b981"/>
      <text x="10" y="20" fill="#a7f3d0" font-size="11" font-weight="bold">Verdadeiro Positivo (VP)</text>
      <text x="10" y="38" fill="#6ee7b7" font-size="10">Vazamento detectado</text>

      <!-- FP Box -->
      <rect x="180" y="0" width="170" height="50" rx="6" fill="#854d0e" fill-opacity="0.2" stroke="#f59e0b"/>
      <text x="190" y="20" fill="#fde68a" font-size="11" font-weight="bold">Falso Positivo (Erro Tipo I)</text>
      <text x="190" y="38" fill="#fef08a" font-size="10">Alarme falso (custo menor)</text>

      <!-- FN Box -->
      <rect x="0" y="60" width="170" height="50" rx="6" fill="#991b1b" fill-opacity="0.3" stroke="#ef4444"/>
      <text x="10" y="80" fill="#fca5a5" font-size="11" font-weight="bold">Falso Negativo (Erro Tipo II)</text>
      <text x="10" y="98" fill="#f87171" font-size="10">Vazamento NÃO detectado ⚠️</text>

      <!-- VN Box -->
      <rect x="180" y="60" width="170" height="50" rx="6" fill="#1e293b" stroke="#475569"/>
      <text x="190" y="80" fill="#cbd5e1" font-size="11" font-weight="bold">Verdadeiro Negativo (VN)</text>
      <text x="190" y="98" fill="#94a3b8" font-size="10">Operação normal correta</text>
    </g>

    <!-- Key Cesgranrio Tip Box -->
    <g transform="translate(0, 190)">
      <rect x="0" y="0" width="${vbW - 590}" height="150" rx="12" fill="#0b1329" stroke="#6366f1" stroke-width="1.2"/>
      <text x="15" y="25" fill="#a5b4fc" font-size="12" font-weight="bold">💡 PEGADINHA CLÁSSICA CESGRANRIO</text>
      <text x="15" y="50" fill="#e2e8f0" font-size="11">• Em dados desbalanceados, a ACURÁCIA é enganosa.</text>
      <text x="15" y="70" fill="#e2e8f0" font-size="11">• O Falso Negativo em oleodutos tem custo catastrófico.</text>
      <text x="15" y="90" fill="#e2e8f0" font-size="11">• Reduzir o limiar (threshold) aumenta o Recall / TPR,</text>
      <text x="25" y="108" fill="#93c5fd" font-size="11">mas eleva a taxa de alarmes falsos (FPR).</text>
      <text x="15" y="132" fill="#34d399" font-size="11" font-weight="bold">Fórmula de Ouro: F1 = 2 × (Precision × Recall) / (P + R)</text>
    </g>
  </g>
</svg>`;
    return { svg, title, description, technicalDetails, keyFormula };
  }

  if (lower.includes("spark") || lower.includes("lakehouse") || lower.includes("pipeline") || lower.includes("delta") || lower.includes("ingest") || lower.includes("hadoop") || lower.includes("duto") || lower.includes("iot")) {
    const title = "Arquitetura Medallion & Pipeline de Telemetria de Dutos Transpetro";
    const description = "Fluxo ponta a ponta de engenharia de dados em tempo real: sensores SCADA em oleodutos e gasodutos, ingestão Kafka/Spark Streaming, camadas Bronze, Silver e Gold em Delta Lakehouse e modelos preditivos de vazamento.";
    const technicalDetails = [
      "Camada Bronze (Raw): Dados brutos de telemetria ingeridos via Kafka com schema-on-read e append-only",
      "Camada Silver (Cleaned): Deduplicação, preenchimento de nulos, tipagem estrita e validação de limites físicos de pressão",
      "Camada Gold (Aggregated): Janelas temporais móveis (Window Functions), cálculo de gradientes de pressão para detecção de anomalias",
      "No Spark, transformações como filter, map e select são lazy (avaliação preguiçosa); ações como count e write disparam jobs físicos"
    ];
    const keyFormula = "Delta Table ACID: Parquet + Transaction Log JSON (_delta_log)";
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${vbW} ${vbH}" width="100%" height="100%" style="background:#090d16;font-family:ui-sans-serif,system-ui,-apple-system,sans-serif;">
  <defs>
    <linearGradient id="bgGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#090d16"/>
      <stop offset="100%" stop-color="#0d1527"/>
    </linearGradient>
    <linearGradient id="flowLine" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#10b981"/>
      <stop offset="50%" stop-color="#06b6d4"/>
      <stop offset="100%" stop-color="#6366f1"/>
    </linearGradient>
    <marker id="arrow" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto">
      <path d="M 0 1 L 10 5 L 0 9 z" fill="#38bdf8" />
    </marker>
  </defs>
  <rect width="${vbW}" height="${vbH}" fill="url(#bgGrad2)"/>
  <rect x="20" y="20" width="${vbW - 40}" height="${vbH - 40}" rx="16" fill="none" stroke="#1e293b" stroke-width="1.5"/>

  <!-- Header -->
  <g transform="translate(40, 50)">
    <rect x="0" y="0" width="220" height="24" rx="6" fill="#06b6d4" fill-opacity="0.15" stroke="#06b6d4" stroke-opacity="0.4"/>
    <text x="10" y="16" fill="#22d3ee" font-size="11" font-weight="700" letter-spacing="1">ENGENHARIA DE DADOS • TRANSPETRO</text>
    <text x="0" y="52" fill="#ffffff" font-size="20" font-weight="800">Pipeline de Dados em Tempo Real (Lakehouse Medallion)</text>
    <text x="0" y="72" fill="#94a3b8" font-size="12">Do Sensor no Duto ao Modelo Preditivo via Apache Spark &amp; Delta Lake</text>
  </g>

  <!-- Flow Steps -->
  <g transform="translate(40, 150)">
    <!-- Stage 1: IoT Sensors / Telemetry -->
    <g transform="translate(0, 0)">
      <rect x="0" y="0" width="165" height="240" rx="12" fill="#0f172a" stroke="#10b981" stroke-width="1.5"/>
      <rect x="12" y="12" width="141" height="28" rx="6" fill="#065f46" fill-opacity="0.4"/>
      <text x="20" y="30" fill="#34d399" font-size="11" font-weight="bold">📡 SCADA / DUTOS</text>
      <text x="12" y="65" fill="#f1f5f9" font-size="12" font-weight="bold">Sensores IoT</text>
      <text x="12" y="85" fill="#94a3b8" font-size="10">• Pressão (psi / bar)</text>
      <text x="12" y="103" fill="#94a3b8" font-size="10">• Temperatura (°C)</text>
      <text x="12" y="121" fill="#94a3b8" font-size="10">• Vazão mássica</text>
      <text x="12" y="139" fill="#94a3b8" font-size="10">• Vibração em bombas</text>
      <line x1="12" y1="155" x2="153" y2="155" stroke="#334155"/>
      <text x="12" y="175" fill="#38bdf8" font-size="10" font-weight="bold">Kafka Producer</text>
      <text x="12" y="195" fill="#94a3b8" font-size="9">Latência: &lt; 200ms</text>
      <text x="12" y="215" fill="#94a3b8" font-size="9">Partições por trecho</text>
    </g>

    <!-- Arrow 1 -->
    <line x1="170" y1="120" x2="210" y2="120" stroke="#38bdf8" stroke-width="2" marker-end="url(#arrow)"/>

    <!-- Stage 2: Bronze Layer -->
    <g transform="translate(215, 0)">
      <rect x="0" y="0" width="175" height="240" rx="12" fill="#0f172a" stroke="#d97706" stroke-width="1.5"/>
      <rect x="12" y="12" width="151" height="28" rx="6" fill="#78350f" fill-opacity="0.4"/>
      <text x="20" y="30" fill="#fbbf24" font-size="11" font-weight="bold">🥉 CAMADA BRONZE</text>
      <text x="12" y="65" fill="#f1f5f9" font-size="12" font-weight="bold">Dados Brutos (Raw)</text>
      <text x="12" y="85" fill="#94a3b8" font-size="10">• Ingestão Append-only</text>
      <text x="12" y="103" fill="#94a3b8" font-size="10">• Histórico imutável</text>
      <text x="12" y="121" fill="#94a3b8" font-size="10">• Payload JSON / Avro</text>
      <text x="12" y="139" fill="#94a3b8" font-size="10">• Preservação de logs</text>
      <line x1="12" y1="155" x2="163" y2="155" stroke="#334155"/>
      <text x="12" y="175" fill="#fbbf24" font-size="10" font-weight="bold">Spark Structured Streaming</text>
      <text x="12" y="195" fill="#94a3b8" font-size="9">readStream / writeStream</text>
      <text x="12" y="215" fill="#94a3b8" font-size="9">Checkpoints no S3/Blob</text>
    </g>

    <!-- Arrow 2 -->
    <line x1="395" y1="120" x2="435" y2="120" stroke="#38bdf8" stroke-width="2" marker-end="url(#arrow)"/>

    <!-- Stage 3: Silver Layer -->
    <g transform="translate(440, 0)">
      <rect x="0" y="0" width="175" height="240" rx="12" fill="#0f172a" stroke="#94a3b8" stroke-width="1.5"/>
      <rect x="12" y="12" width="151" height="28" rx="6" fill="#334155" fill-opacity="0.5"/>
      <text x="20" y="30" fill="#e2e8f0" font-size="11" font-weight="bold">🥈 CAMADA SILVER</text>
      <text x="12" y="65" fill="#f1f5f9" font-size="12" font-weight="bold">Limpeza &amp; Enriquecimento</text>
      <text x="12" y="85" fill="#94a3b8" font-size="10">• Deduplicação de IDs</text>
      <text x="12" y="103" fill="#94a3b8" font-size="10">• Remoção de outliers</text>
      <text x="12" y="121" fill="#94a3b8" font-size="10">• Schema enforcement</text>
      <text x="12" y="139" fill="#94a3b8" font-size="10">• Joins cadastrais (duto)</text>
      <line x1="12" y1="155" x2="163" y2="155" stroke="#334155"/>
      <text x="12" y="175" fill="#38bdf8" font-size="10" font-weight="bold">Formato Delta Lake</text>
      <text x="12" y="195" fill="#94a3b8" font-size="9">ACID Transactions</text>
      <text x="12" y="215" fill="#94a3b8" font-size="9">Time Travel &amp; Compactação</text>
    </g>

    <!-- Arrow 3 -->
    <line x1="620" y1="120" x2="660" y2="120" stroke="#38bdf8" stroke-width="2" marker-end="url(#arrow)"/>

    <!-- Stage 4: Gold Layer & AI -->
    <g transform="translate(665, 0)">
      <rect x="0" y="0" width="${vbW - 745}" height="240" rx="12" fill="#0f172a" stroke="#eab308" stroke-width="1.5"/>
      <rect x="12" y="12" width="${vbW - 769}" height="28" rx="6" fill="#854d0e" fill-opacity="0.4"/>
      <text x="20" y="30" fill="#fef08a" font-size="11" font-weight="bold">🥇 CAMADA GOLD &amp; IA</text>
      <text x="12" y="65" fill="#f1f5f9" font-size="12" font-weight="bold">Agregações &amp; Modelos ML</text>
      <text x="12" y="85" fill="#94a3b8" font-size="10">• Window Functions (Média Móvel)</text>
      <text x="12" y="103" fill="#94a3b8" font-size="10">• Detecção de Vazamentos (XGBoost)</text>
      <text x="12" y="121" fill="#94a3b8" font-size="10">• Previsão de Falhas em Bombas</text>
      <text x="12" y="139" fill="#94a3b8" font-size="10">• Dashboards Operacionais Transpetro</text>
      <line x1="12" y1="155" x2="${vbW - 757}" y2="155" stroke="#334155"/>
      <text x="12" y="175" fill="#34d399" font-size="10" font-weight="bold">Consumo de Alto Valor</text>
      <text x="12" y="195" fill="#94a3b8" font-size="9">MLOps / Drift Monitoring</text>
      <text x="12" y="215" fill="#94a3b8" font-size="9">Alertas em Sala de Controle</text>
    </g>
  </g>

  <!-- Bottom Technical Insights Bar -->
  <g transform="translate(40, 420)">
    <rect x="0" y="0" width="${vbW - 80}" height="80" rx="12" fill="#0d1b2a" stroke="#1e293b" stroke-width="1"/>
    <text x="20" y="28" fill="#38bdf8" font-size="11" font-weight="bold">📌 CONCEITOS COBRADOS NA PROVA CESGRANRIO:</text>
    <text x="20" y="50" fill="#cbd5e1" font-size="10">1. Spark Transformations (lazy) vs Actions (eager): operações que disparam jobs reais são count(), collect(), save(), take().</text>
    <text x="20" y="68" fill="#cbd5e1" font-size="10">2. Delta Lake combina velocidade de Parquet colunar com controle transacional ACID via arquivo _delta_log.</text>
  </g>
</svg>`;
    return { svg, title, description, technicalDetails, keyFormula };
  }

  // Default: Machine Learning & Statistical Learning Concepts
  const title = `Esquema Técnico e Conceitual: ${topic || "Modelagem Estatística & ML"}`;
  const description = `Diagrama explicativo ilustrando os fundamentos, equações e aplicações práticas no padrão da Banca Cesgranrio para Ciência de Dados na Transpetro.`;
  const technicalDetails = [
    "Trade-off Viés-Variância: modelos muito simples sofrem de Underfitting (alto viés); modelos complexos sofrem de Overfitting (alta variância)",
    "Regularização L1 (Lasso) produz esparsidade e seleção automática de variáveis; Regularização L2 (Ridge) encolhe coeficientes",
    "Validação Cruzada K-Fold com estratificação preserva a proporção das classes raras em sensores operacionais",
    "Monitoramento de Concept Drift e Data Drift garante que o modelo mantenha acurácia após deploy na Transpetro"
  ];
  const keyFormula = "Loss = MSE + λ ∑ |w_i| (L1) | Loss = MSE + λ ∑ w_i² (L2)";
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${vbW} ${vbH}" width="100%" height="100%" style="background:#090d16;font-family:ui-sans-serif,system-ui,-apple-system,sans-serif;">
  <defs>
    <linearGradient id="bgDef" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#090d16"/>
      <stop offset="100%" stop-color="#0f172a"/>
    </linearGradient>
    <linearGradient id="gradEmerald" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#10b981"/>
      <stop offset="100%" stop-color="#06b6d4"/>
    </linearGradient>
  </defs>
  <rect width="${vbW}" height="${vbH}" fill="url(#bgDef)"/>
  <rect x="20" y="20" width="${vbW - 40}" height="${vbH - 40}" rx="16" fill="none" stroke="#1e293b" stroke-width="1.5"/>

  <!-- Header -->
  <g transform="translate(40, 50)">
    <rect x="0" y="0" width="200" height="24" rx="6" fill="#10b981" fill-opacity="0.15" stroke="#10b981" stroke-opacity="0.4"/>
    <text x="10" y="16" fill="#34d399" font-size="11" font-weight="700" letter-spacing="1">CESGRANRIO • TRANSPETRO</text>
    <text x="0" y="52" fill="#ffffff" font-size="20" font-weight="800">Mapa Visual de Conceitos: ${topic.slice(0, 36)}</text>
    <text x="0" y="72" fill="#94a3b8" font-size="12">Fundamentos Teóricos, Fórmulas Matemáticas e Aplicação Prática</text>
  </g>

  <!-- 3 Pillars Grid -->
  <g transform="translate(40, 140)">
    <!-- Card 1 -->
    <g transform="translate(0, 0)">
      <rect x="0" y="0" width="${Math.floor((vbW - 120) / 3)}" height="260" rx="12" fill="#0f172a" stroke="#334155" stroke-width="1.2"/>
      <rect x="12" y="12" width="${Math.floor((vbW - 120) / 3) - 24}" height="28" rx="6" fill="#065f46" fill-opacity="0.4"/>
      <text x="20" y="30" fill="#34d399" font-size="11" font-weight="bold">1. FUNDAMENTAÇÃO MATEMÁTICA</text>
      <text x="14" y="65" fill="#f8fafc" font-size="13" font-weight="bold">Teoria &amp; Formulação</text>
      <text x="14" y="90" fill="#cbd5e1" font-size="11">• Otimização via Gradiente Descendente</text>
      <text x="14" y="110" fill="#cbd5e1" font-size="11">• Função de Custo Convexa</text>
      <text x="14" y="130" fill="#cbd5e1" font-size="11">• Matriz Hessiana e Curvatura</text>
      <text x="14" y="150" fill="#cbd5e1" font-size="11">• Penalização L1 (Lasso) vs L2 (Ridge)</text>
      <rect x="12" y="180" width="${Math.floor((vbW - 120) / 3) - 24}" height="65" rx="8" fill="#090d16" stroke="#10b981" stroke-opacity="0.5"/>
      <text x="20" y="200" fill="#34d399" font-size="10" font-weight="bold">Equação Central:</text>
      <text x="20" y="222" fill="#e2e8f0" font-size="10" font-family="monospace">min L(w) + λ||w||</text>
    </g>

    <!-- Card 2 -->
    <g transform="translate(${Math.floor((vbW - 120) / 3) + 20}, 0)">
      <rect x="0" y="0" width="${Math.floor((vbW - 120) / 3)}" height="260" rx="12" fill="#0f172a" stroke="#0284c7" stroke-width="1.2"/>
      <rect x="12" y="12" width="${Math.floor((vbW - 120) / 3) - 24}" height="28" rx="6" fill="#075985" fill-opacity="0.4"/>
      <text x="20" y="30" fill="#38bdf8" font-size="11" font-weight="bold">2. BANCA CESGRANRIO</text>
      <text x="14" y="65" fill="#f8fafc" font-size="13" font-weight="bold">Pegadinhas &amp; Padrões</text>
      <text x="14" y="90" fill="#cbd5e1" font-size="11">• Confundir Bagging com Boosting</text>
      <text x="14" y="110" fill="#cbd5e1" font-size="11">• Acurácia em classes desbalanceadas</text>
      <text x="14" y="130" fill="#cbd5e1" font-size="11">• Interpretação do P-valor (H0)</text>
      <text x="14" y="150" fill="#cbd5e1" font-size="11">• Lazy Evaluation no Apache Spark</text>
      <rect x="12" y="180" width="${Math.floor((vbW - 120) / 3) - 24}" height="65" rx="8" fill="#090d16" stroke="#38bdf8" stroke-opacity="0.5"/>
      <text x="20" y="200" fill="#38bdf8" font-size="10" font-weight="bold">Dica de Gabarito:</text>
      <text x="20" y="222" fill="#e2e8f0" font-size="10">Random Forest reduz variância; Boosting reduz viés.</text>
    </g>

    <!-- Card 3 -->
    <g transform="translate(${(Math.floor((vbW - 120) / 3) + 20) * 2}, 0)">
      <rect x="0" y="0" width="${Math.floor((vbW - 120) / 3)}" height="260" rx="12" fill="#0f172a" stroke="#d97706" stroke-width="1.2"/>
      <rect x="12" y="12" width="${Math.floor((vbW - 120) / 3) - 24}" height="28" rx="6" fill="#78350f" fill-opacity="0.4"/>
      <text x="20" y="30" fill="#fbbf24" font-size="11" font-weight="bold">3. PRÁTICA TRANSPETRO</text>
      <text x="14" y="65" fill="#f8fafc" font-size="13" font-weight="bold">Casos Operacionais</text>
      <text x="14" y="90" fill="#cbd5e1" font-size="11">• Detecção de Vazamentos em Oleodutos</text>
      <text x="14" y="110" fill="#cbd5e1" font-size="11">• Telemetria de Navios Petroleiros</text>
      <text x="14" y="130" fill="#cbd5e1" font-size="11">• Previsão de Demanda de Combustíveis</text>
      <text x="14" y="150" fill="#cbd5e1" font-size="11">• MLOps &amp; Monitoramento de Sensores</text>
      <rect x="12" y="180" width="${Math.floor((vbW - 120) / 3) - 24}" height="65" rx="8" fill="#090d16" stroke="#f59e0b" stroke-opacity="0.5"/>
      <text x="20" y="200" fill="#fbbf24" font-size="10" font-weight="bold">Impacto no Negócio:</text>
      <text x="20" y="222" fill="#e2e8f0" font-size="10">Segurança ambiental e zero downtime.</text>
    </g>
  </g>

  <!-- Bottom Legend Bar -->
  <g transform="translate(40, 430)">
    <rect x="0" y="0" width="${vbW - 80}" height="70" rx="10" fill="#0c1322" stroke="#1e293b"/>
    <text x="20" y="25" fill="#38bdf8" font-size="11" font-weight="bold">DIAGRAMA TÉCNICO VETORIAL DE ALTA DEFINIÇÃO</text>
    <text x="20" y="45" fill="#94a3b8" font-size="10">Gerado pelo Agente Especialista Transpetro • Use para memorização ativa e revisão antes da prova.</text>
  </g>
</svg>`;
  return { svg, title, description, technicalDetails, keyFormula };
}

// Endpoint de Criação e Geração de Imagens & Diagramas Didáticos
app.post("/api/generate-image", async (req, res) => {
  try {
    const { 
      prompt, 
      topic = "Ciência de Dados Transpetro", 
      style = "architecture", 
      aspectRatio = "16:9",
      context 
    } = req.body;

    if (!prompt || typeof prompt !== "string" || !prompt.trim()) {
      return res.status(400).json({ error: "O texto ou conceito para a geração da imagem não foi fornecido." });
    }

    const cleanPrompt = prompt.trim();
    const styleDescriptions: Record<string, string> = {
      architecture: "Diagrama esquemático de arquitetura técnica de dados e computação em nuvem",
      statistics: "Gráfico e curva estatística com eixos cartesianos detalhados e fórmulas matemáticas",
      ml_pipeline: "Pipeline e fluxo de Machine Learning, engenharia de atributos e validação",
      decision_tree: "Árvore de decisão hierárquica e fluxograma lógico de tomada de decisão",
      transpetro_ops: "Infográfico operacional de dutos, navios petroleiros e sensores de telemetria Transpetro",
      infographic: "Infográfico didático e resumo esquemático para concurso público"
    };

    const styleDesc = styleDescriptions[style] || styleDescriptions.architecture;
    const ai = getGeminiAI();

    let generatedImageUrl: string | null = null;
    let sourceModel = "gemini-3.1-flash-lite-image";
    let generatedTitle = `${topic || "Diagrama Técnico"} - ${styleDesc}`;
    let generatedDescription = `Visualização técnica focada em "${cleanPrompt}" para preparação da Transpetro (Banca Cesgranrio).`;
    let technicalDetails: string[] = [];
    let keyFormula = "";

    // 1. Tentar primeiro via modelo nativo de geração de imagem caso o usuário possua chave habilitada
    try {
      const visualPrompt = `Professional high quality technical visual infographic illustration of: ${cleanPrompt}. Style: ${styleDesc}. Dark futuristic background, clean typography, precise vector look, petroleum and data science theme.`;
      
      const imgRes = await ai.models.generateContent({
        model: "gemini-3.1-flash-lite-image",
        contents: {
          parts: [{ text: visualPrompt }]
        },
        config: {
          imageConfig: {
            aspectRatio: (aspectRatio === "16:9" || aspectRatio === "4:3") ? aspectRatio : "1:1"
          }
        }
      });

      const part = imgRes.candidates?.[0]?.content?.parts?.find((p: any) => !!p.inlineData);
      if (part?.inlineData?.data) {
        const mime = part.inlineData.mimeType || "image/png";
        generatedImageUrl = `data:${mime};base64,${part.inlineData.data}`;
        sourceModel = "gemini-3.1-flash-lite-image";
        generatedTitle = `${topic || "Ilustração Técnica"} (${styleDesc})`;
        technicalDetails = [
          `Imagem gerada pelo modelo de visão neural ${sourceModel}`,
          `Tópico solicitado: ${cleanPrompt}`,
          `Estilo de representação: ${styleDesc}`
        ];
      }
    } catch (imgError: any) {
      console.log("[Gerador de Imagens] Tentativa com modelo raster retornou:", imgError?.message?.slice(0, 100));
    }

    // 2. Se o modelo raster não estiver disponível ou cota excedida, gerar diagrama vetorial SVG de alta resolução com Gemini
    if (!generatedImageUrl) {
      const vbW = aspectRatio === "1:1" ? 800 : aspectRatio === "4:3" ? 800 : 1000;
      const vbH = aspectRatio === "1:1" ? 800 : aspectRatio === "4:3" ? 600 : 562;

      try {
        const svgPrompt = `Você é um Engenheiro Gráfico e Especialista em Visualização de Dados para o Concurso Público da Transpetro (Banca Cesgranrio) - Cargo Ciência de Dados.
Gere um diagrama técnico completo, visualmente impressionante e perfeitamente renderizável em código SVG para o seguinte conteúdo:
"${cleanPrompt}"
Tópico: ${topic}
Estilo visual solicitado: ${styleDesc}

Requisitos OBRIGATÓRIOS do SVG:
1. Deve ser um código SVG 100% válido, autocontido, começando com <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${vbW} ${vbH}" width="100%" height="100%"> e terminando com </svg>.
2. Tema escuro profissional moderno (fundo #090d16 ou #0b1120 com gradientes sutis).
3. Paleta vibrante e elegante com destaque para esmeralda (#10b981), ciano (#06b6d4), índigo (#6366f1) e âmbar (#f59e0b).
4. Tipografia limpa (font-family: system-ui, -apple-system, sans-serif), textos nítidos, badges com cantos arredondados, caixas de componentes com bordas estilizadas e setas direcionais conectando os elementos.
5. Incorpore termos técnicos precisos do edital da Cesgranrio e aplicações reais da Transpetro (dutos, sensores, telemetria, vazão, pressão, Apache Spark, Delta Lake, ROC-AUC, XGBoost, etc.).
6. NUNCA gere SVG vazio ou corrompido.

Responda em formato JSON com o seguinte esquema estrito:
{
  "title": "Título conciso do diagrama",
  "description": "Explicação pedagógica clara de 2-3 frases do que o diagrama representa",
  "keyFormula": "Fórmula matemática ou métrica central relevante",
  "technicalDetails": [
    "Ponto técnico 1",
    "Ponto técnico 2",
    "Ponto técnico 3",
    "Dica ou pegadinha da Cesgranrio sobre o assunto"
  ],
  "svg": "<svg xmlns=\\"http://www.w3.org/2000/svg\\" viewBox=\\"0 0 ${vbW} ${vbH}\\" width=\\"100%\\" height=\\"100%\\">...</svg>"
}`;

        const aiResponse = await callGeminiWithFallback({
          contents: svgPrompt,
          config: {
            responseMimeType: "application/json",
            temperature: 0.3
          }
        });

        const parsed = JSON.parse(aiResponse.text || "{}");
        if (parsed.svg && parsed.svg.includes("<svg") && parsed.svg.includes("</svg>")) {
          // Extrair SVG limpo
          let cleanSvg = parsed.svg.trim();
          const svgStart = cleanSvg.indexOf("<svg");
          const svgEnd = cleanSvg.lastIndexOf("</svg>");
          if (svgStart !== -1 && svgEnd !== -1) {
            cleanSvg = cleanSvg.slice(svgStart, svgEnd + 6);
          }
          const base64Svg = Buffer.from(cleanSvg, "utf-8").toString("base64");
          generatedImageUrl = `data:image/svg+xml;base64,${base64Svg}`;
          sourceModel = "gemini-diagram-engine";
          generatedTitle = parsed.title || `${topic} - ${styleDesc}`;
          generatedDescription = parsed.description || generatedDescription;
          technicalDetails = Array.isArray(parsed.technicalDetails) ? parsed.technicalDetails : [];
          keyFormula = parsed.keyFormula || "";
        }
      } catch (svgErr) {
        console.warn("[Gerador de Imagens] Tentativa com LLM SVG gerou erro, usando template determinístico:", svgErr);
      }
    }

    // 3. Fallback determinístico robusto (garante 100% de confiabilidade mesmo se todos os modelos tiverem pico)
    if (!generatedImageUrl) {
      const fallbackData = getDeterministicVisualSvg(cleanPrompt, style, aspectRatio);
      const base64Svg = Buffer.from(fallbackData.svg, "utf-8").toString("base64");
      generatedImageUrl = `data:image/svg+xml;base64,${base64Svg}`;
      sourceModel = "transpetro-vector-engine";
      generatedTitle = fallbackData.title;
      generatedDescription = fallbackData.description;
      technicalDetails = fallbackData.technicalDetails;
      keyFormula = fallbackData.keyFormula;
    }

    const imagePayload = {
      id: `img-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      url: generatedImageUrl,
      prompt: cleanPrompt,
      title: generatedTitle,
      style,
      aspectRatio,
      description: generatedDescription,
      technicalDetails,
      keyFormulaOrMetric: keyFormula,
      sourceModel,
      createdAt: new Date().toISOString()
    };

    res.json({
      success: true,
      image: imagePayload
    });
  } catch (error: any) {
    console.error("Erro no endpoint /api/generate-image:", error);
    res.status(500).json({ error: error?.message || "Erro ao gerar imagem ou diagrama técnico." });
  }
});

// Vite middleware setup
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Transpetro AI Agent Server rodando na porta ${PORT}`);
  });
}

startServer();
