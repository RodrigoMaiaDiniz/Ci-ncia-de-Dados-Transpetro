import { RequestedSubject, EditalBlockType } from '../types';

const STORAGE_KEY = 'transpetro_requested_subjects_v1';
const EVENT_NAME = 'tp_subject_history_updated';

// Helper to deduce block & category from content
export function deduceSubjectMetadata(text: string): { category: string; block: EditalBlockType; tags: string[] } {
  const lower = text.toLowerCase();
  
  if (lower.includes('portugu') || lower.includes('crase') || lower.includes('concordância') || lower.includes('pontuação') || lower.includes('inglês')) {
    return {
      category: 'Básicos',
      block: 'Conhecimentos Básicos',
      tags: ['Língua Portuguesa', 'Gramática', 'Cesgranrio']
    };
  }

  if (lower.includes('lgpd') || lower.includes('dmbok') || lower.includes('dama') || lower.includes('govern') || lower.includes('titular') || lower.includes('anpd') || lower.includes('shap') || lower.includes('lime') || lower.includes('ética')) {
    return {
      category: 'Governança & LGPD',
      block: 'Bloco III',
      tags: ['LGPD', 'DAMA-DMBOK', 'Qualidade de Dados', 'Ética']
    };
  }

  if (lower.includes('spark') || lower.includes('pyspark') || lower.includes('hadoop') || lower.includes('sql') || lower.includes('lakehouse') || lower.includes('delta lake') || lower.includes('parquet') || lower.includes('docker') || lower.includes('mlops') || lower.includes('pandas') || lower.includes('vetor') || lower.includes('matriz') || lower.includes('gradiente') || lower.includes('hessiana') || lower.includes('estatística') || lower.includes('probabilidade') || lower.includes('bayes') || lower.includes('hipótese') || lower.includes('p-valor') || lower.includes('big-o')) {
    const isDataOrDevOps = lower.includes('spark') || lower.includes('pyspark') || lower.includes('sql') || lower.includes('lakehouse') || lower.includes('docker') || lower.includes('pandas');
    return {
      category: isDataOrDevOps ? 'Big Data & SQL' : 'Estatística',
      block: 'Bloco II',
      tags: ['Bloco II', 'Computação', 'Cesgranrio']
    };
  }

  return {
    category: 'Machine Learning',
    block: 'Bloco I',
    tags: ['Machine Learning', 'Modelagem Preditiva', 'Cesgranrio']
  };
}

const SEED_SUBJECTS: RequestedSubject[] = [
  {
    id: 'seed-01',
    title: 'Pegadinha de P-valor e Erros Tipo I e II',
    source: 'quick_prompt',
    category: 'Estatística',
    block: 'Bloco II',
    userQuery: 'Quais são as principais pegadinhas da Cesgranrio sobre interpretação de p-valor e testes de hipóteses estatísticos?',
    agentResponse: `### Pegadinhas Críticas da Cesgranrio sobre P-Valor:

1. **O P-valor NÃO é a probabilidade de H0 ser verdadeira:**
   - A Cesgranrio adora afirmar: *"Um p-valor de 0,03 significa que há 3% de chance de a hipótese nula ser verdadeira."* **ERRADO!**
   - **Conceito correto:** O p-valor é a probabilidade de obter uma estatística de teste tão ou mais extrema que a observada, **sob a premissa de que a hipótese nula H0 é verdadeira**.

2. **Regra de Ouro da Decisão:**
   - Se p ≤ α → **Rejeita-se H0** (Resultado estatisticamente significante).
   - Se p > α → **Não se rejeita H0** (Nunca diga "aceita-se H0 como verdade absoluta").

3. **Erros Tipo I e Tipo II:**
   - **Erro Tipo I (α):** Rejeitar H0 quando ela é verdadeira (falso positivo).
   - **Erro Tipo II (β):** Não rejeitar H0 quando ela é falsa (falso negativo).
   - **Poder do Teste:** 1 - β (capacidade de detectar um efeito real).`,
    timestamp: '02/09/2026, 17:15',
    isoDate: '2026-09-02T17:15:00.000Z',
    mode: 'cesgranrio_traps',
    tags: ['Estatística', 'P-valor', 'Testes de Hipóteses', 'Cesgranrio'],
    status: 'answered',
    isFavorite: true,
    notes: 'Revisar antes da prova: a Cesgranrio sempre confunde p-valor com P(H0|Dados).'
  },
  {
    id: 'seed-02',
    title: 'XGBoost vs Random Forest em Sensores de Dutos',
    source: 'agent_chat',
    category: 'Machine Learning',
    block: 'Bloco I',
    userQuery: 'Explique a diferença matemática e prática entre o método de ensemble Bagging (Random Forest) e Boosting (XGBoost), e como regularizar o XGBoost para evitar overfitting em dados de sensores de dutos.',
    agentResponse: `### Bagging (Random Forest) vs Boosting (XGBoost)

- **Random Forest (Bagging):**
  - Constrói árvores profundas de forma **independente e paralela**.
  - O objetivo primordial é a **redução de variância** sem aumentar o viés.
  - Cada árvore treina em uma amostra bootstrap com subconjunto aleatório de features.

- **XGBoost (Gradient Boosting):**
  - Constrói árvores rasas de forma **sequencial**.
  - Cada nova árvore ajusta os **pseudo-resíduos (gradientes da função de perda)** do modelo anterior.
  - Minimiza a função objetivo regularizada (notação oficial de prova):
    Função Objetivo = Σ L(y_i, y_previsto_i) + Σ [γ * T + 0.5 * λ * Σ(w_j²)]
    onde T é o número de folhas da árvore, γ é o ganho mínimo para divisão e λ é o peso L2 das folhas.

### Regularização contra Overfitting em Sensores de Dutos:
1. \`max_depth\`: Limitar entre 3 e 6 (dutos têm ruído de alta frequência).
2. \`learning_rate\` (eta): Reduzir para 0.01 - 0.05 e aumentar \`n_estimators\` com early stopping.
3. \`subsample\` e \`colsample_bytree\`: Usar 0.7 a 0.8 para evitar memorização de trechos de duto.
4. \`gamma\` (min_split_loss) e \`reg_lambda\` (L2) para penalizar nós complexos.`,
    timestamp: '02/09/2026, 17:40',
    isoDate: '2026-09-02T17:40:00.000Z',
    mode: 'tutor',
    tags: ['Machine Learning', 'XGBoost', 'Random Forest', 'Dutos'],
    status: 'answered',
    isFavorite: false,
    notes: 'Boa analogia para a prova discursiva de manutenção preditiva.'
  },
  {
    id: 'seed-03',
    title: 'Window Functions no Apache PySpark',
    source: 'quick_prompt',
    category: 'Big Data & SQL',
    block: 'Bloco II',
    userQuery: 'Mostre um exemplo completo em PySpark calculando a média móvel de pressão e o ranking das 3 maiores anomalias de sensores por dia usando Window.partitionBy e orderBy.',
    agentResponse: `\`\`\`python
from pyspark.sql import SparkSession
from pyspark.sql.window import Window
from pyspark.sql import functions as F

spark = SparkSession.builder.appName("TranspetroSensors").getOrCreate()

# Janela móvel de 3 medições para pressão
janela_movel = Window.partitionBy("duto_id") \\
                     .orderBy("timestamp") \\
                     .rowsBetween(-2, 0) # 2 anteriores + atual

df_analise = df.withColumn("media_movel_pressao", F.avg("pressao_bar").over(janela_movel))

# Janela de ranking diário por anomalia
janela_ranking = Window.partitionBy("duto_id", "data") \\
                       .orderBy(F.col("desvio_pressao").desc())

top3_anomalias = df_analise.withColumn("rank", F.dense_rank().over(janela_ranking)) \\
                           .filter(F.col("rank") <= 3)
\`\`\`
**Ponto de Prova Cesgranrio:** Atenção à diferença entre \`rowsBetween\` (linhas físicas) e \`rangeBetween\` (valores no intervalo numérico ou temporal)!`,
    timestamp: '02/09/2026, 18:05',
    isoDate: '2026-09-02T18:05:00.000Z',
    mode: 'debugger',
    tags: ['PySpark', 'Window Functions', 'Big Data', 'SQL'],
    status: 'answered',
    isFavorite: true,
    notes: 'Revisar a diferença entre rank(), dense_rank() e row_number().'
  }
];

export function getRequestedSubjects(): RequestedSubject[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      // Initialize with seed data so history is never empty
      localStorage.setItem(STORAGE_KEY, JSON.stringify(SEED_SUBJECTS));
      return SEED_SUBJECTS;
    }
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.length > 0) {
      return parsed;
    }
    return SEED_SUBJECTS;
  } catch (err) {
    console.error('Error loading requested subjects history:', err);
    return SEED_SUBJECTS;
  }
}

export function saveRequestedSubject(
  subjectData: Omit<RequestedSubject, 'id' | 'isoDate' | 'timestamp'> & { id?: string; timestamp?: string }
): RequestedSubject {
  try {
    const existing = getRequestedSubjects();
    const isoDate = new Date().toISOString();
    const id = subjectData.id || `subj-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`;

    const newSubject: RequestedSubject = {
      ...subjectData,
      id,
      isoDate,
      timestamp: subjectData.timestamp || new Date().toLocaleString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }),
      tags: subjectData.tags || [],
      status: subjectData.status || 'answered'
    };

    // Check if an entry with this same query already exists in the last 2 minutes; if so, update it
    const existingIndex = existing.findIndex(item => item.userQuery.trim() === newSubject.userQuery.trim());
    let updatedList: RequestedSubject[];

    if (existingIndex >= 0) {
      updatedList = [...existing];
      updatedList[existingIndex] = {
        ...updatedList[existingIndex],
        ...newSubject,
        id: updatedList[existingIndex].id, // keep original ID
      };
    } else {
      updatedList = [newSubject, ...existing];
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedList));
    window.dispatchEvent(new CustomEvent(EVENT_NAME, { detail: newSubject }));
    return newSubject;
  } catch (err) {
    console.error('Error saving requested subject:', err);
    return {
      ...subjectData,
      id: `err-${Date.now()}`,
      isoDate: new Date().toISOString(),
      timestamp: new Date().toLocaleTimeString()
    } as RequestedSubject;
  }
}

export function updateRequestedSubject(id: string, updates: Partial<RequestedSubject>): void {
  try {
    const existing = getRequestedSubjects();
    const updated = existing.map(item => {
      if (item.id === id) {
        return { ...item, ...updates };
      }
      return item;
    });
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    window.dispatchEvent(new CustomEvent(EVENT_NAME));
  } catch (err) {
    console.error('Error updating requested subject:', err);
  }
}

export function deleteRequestedSubject(id: string): void {
  try {
    const existing = getRequestedSubjects();
    const updated = existing.filter(item => item.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    window.dispatchEvent(new CustomEvent(EVENT_NAME));
  } catch (err) {
    console.error('Error deleting requested subject:', err);
  }
}

export function toggleFavoriteSubject(id: string): void {
  try {
    const existing = getRequestedSubjects();
    const updated = existing.map(item => {
      if (item.id === id) {
        return { ...item, isFavorite: !item.isFavorite };
      }
      return item;
    });
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    window.dispatchEvent(new CustomEvent(EVENT_NAME));
  } catch (err) {
    console.error('Error toggling favorite:', err);
  }
}

export function updateSubjectNotes(id: string, notes: string): void {
  try {
    const existing = getRequestedSubjects();
    const updated = existing.map(item => {
      if (item.id === id) {
        return { ...item, notes };
      }
      return item;
    });
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    window.dispatchEvent(new CustomEvent(EVENT_NAME));
  } catch (err) {
    console.error('Error updating notes:', err);
  }
}

export function clearAllSubjects(): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([]));
    window.dispatchEvent(new CustomEvent(EVENT_NAME));
  } catch (err) {
    console.error('Error clearing subjects:', err);
  }
}

export function exportHistoryAsMarkdown(subjects: RequestedSubject[]): string {
  let md = `# Histórico de Assuntos e Dúvidas Solicitados - Concurso Transpetro (Banca Cesgranrio)\n`;
  md += `*Exportado em: ${new Date().toLocaleString('pt-BR')}*\n\n`;
  md += `Total de consultas registradas: ${subjects.length}\n\n---\n\n`;

  subjects.forEach((subj, idx) => {
    md += `## ${idx + 1}. ${subj.title}\n`;
    md += `- **Data:** ${subj.timestamp}\n`;
    md += `- **Bloco:** ${subj.block || 'Geral'} | **Categoria:** ${subj.category}\n`;
    md += `- **Modo do Agente:** ${subj.mode || 'Tutor'}\n`;
    md += `- **Tags:** ${subj.tags.join(', ')}\n\n`;
    md += `### Pergunta / Prompt Solicitado:\n`;
    md += `> ${subj.userQuery}\n\n`;
    if (subj.agentResponse) {
      md += `### Resposta do Agente:\n\n${subj.agentResponse}\n\n`;
    }
    if (subj.notes) {
      md += `> 📝 **Anotação Pessoal:** ${subj.notes}\n\n`;
    }
    md += `---\n\n`;
  });

  return md;
}
