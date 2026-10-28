import { DigitalBook } from '../../types';

export const CONHECIMENTOS_BASICOS_BOOKS: DigitalBook[] = [
  {
    id: 'livro-cb-portugues',
    itemCode: 'CB-01',
    block: 'Conhecimentos Básicos',
    title: 'Manual Completo de Língua Portuguesa para Concursos',
    subtitle: 'Compreensão, Morfossintaxe, Crase, Regência, Pontuação e Reescrita na Banca Cesgranrio',
    edition: 'Edição Especial Transpetro / Petrobras 2026',
    author: 'Equipe de Letras & Especialistas em Concursos Petrobras',
    pagesEquivalent: 195,
    readTimeEstimate: '3h 15min',
    badge: '10 Questões Garantidas',
    themeGradient: 'from-amber-600 via-orange-600 to-yellow-500',
    borderAccent: 'border-amber-500/40',
    iconName: 'BookType',
    overview: 'Guia definitivo e aprofundado cobrindo todos os pontos do edital de Língua Portuguesa da Fundação Cesgranrio para a Transpetro. Foco cirúrgico nas peculiaridades de cobrança: interpretação textual por inferência lógica versus compreensão literal, regência de verbos chave, concordância com a partícula SE (apassivador versus índice de indeterminação), crase, proibições absolutas da vírgula e reescrita sintática sem alteração semântica.',
    officialEditalTopics: [
      '1. Compreensão e interpretação de textos de gêneros variados',
      '2. Reconhecimento de tipos e gêneros textuais (dissertativo, expositivo, injuntivo)',
      '3. Domínio da ortografia oficial e acentuação gráfica',
      '4. Domínio dos mecanismos de coesão textual: referenciação, anáfora, catáfora e conectores',
      '5. Emprego de tempos e modos verbais (subjuntivo versus indicativo e correlação)',
      '6. Estrutura morfossintática do período: coordenação e subordinação',
      '7. Emprego dos sinais de pontuação (regras e proibições da vírgula)',
      '8. Concordância verbal e nominal (casos clássicos com a partícula SE)',
      '9. Regência verbal e nominal e sinal indicativo de crase',
      '10. Colocação dos pronomes átonos (próclise, mesóclise e ênclise)',
      '11. Reescrita de frases e reorganização sintática mantendo coerência e correção'
    ],
    targetAudience: 'Candidatos ao cargo de Profissional Transpetro de Nível Superior - Ciência de Dados.',
    chapters: [
      {
        id: 'cap-pt-01',
        chapterNumber: 1,
        title: 'Compreensão, Interpretação e Tipologia Textual',
        subtitle: 'Diferença crucial entre o que o texto diz e o que a banca infere',
        readTimeEstimate: '45 min',
        summary: 'Aprenda o método de desconstrução de textos da Cesgranrio: distinção formal entre compreensão literal e inferência interpretativa, identificação da tese central em editoriais e artigos de opinião, reconhecimento das estruturas dissertativo-argumentativas e eliminação de alternativas com extrapolação, redução ou contradição.',
        contentMarkdown: `## 1. Compreensão Textual versus Interpretação Textual na Cesgranrio

A Fundação Cesgranrio adota rotineiramente textos contemporâneos extraídos de grandes periódicos, ensaios científicos e editoriais de economia, infraestrutura, transição energética e inteligência artificial. A causa número um de perda de pontos em provas de nível superior é a confusão entre Compreensão e Interpretação.

### A. Compreensão Textual (O que está explícito no texto)
- Comandos típicos de enunciado: Segundo o texto, O autor afirma expressamente que, De acordo com o primeiro parágrafo, Na linha vinte e cinco, constata-se que.
- Postura analítica exigida: Estrita fidelidade às informações expressas de forma literal ou por paráfrase direta. O candidato não deve inferir premissas não ditas. Se a banca pergunta o que está no texto, a resposta está textualmente visível.

### B. Interpretação Textual (O que se deduz do texto)
- Comandos típicos de enunciado: Infere-se do texto que, É possível deduzir da argumentação que, Conclui-se das premissas apresentadas que, O texto autoriza a conclusão de que.
- Postura analítica exigida: A resposta decorre de deduções lógicas legítimas a partir de premissas expressas pelo autor, figuras de linguagem, ironias sutis e intenções comunicativas. A inferência exige conexão lógica estrita sem criar dados novos.

### Os Três Vícios de Leitura Penalizados pela Cesgranrio:
1. Extrapolação: Consiste em introduzir conhecimento prévio de mundo ou convicções pessoais que não possuem respaldo no texto. Mesmo que uma proposição seja cientificamente verdadeira na realidade contemporânea, se ela não foi afirmada nem decorre logicamente das premissas do texto-base da prova, a alternativa é considerada errada.
2. Redução: Consiste em selecionar uma alternativa que aborda unicamente um detalhe periférico ou exemplo secundário do texto, desconsiderando a tese nuclear ou o argumento central do autor.
3. Contradição: Consiste em assinalar uma opção que inverte as relações de causa e efeito ou afirma o oposto do que o autor argumentou ao longo do ensaio.

---

## 2. Tipologias Textuais Mais Recorrentes em Concursos

| Tipologia Textual | Finalidade Comunicativa | Marcas Linguísticas Típicas | Recorrência em Prova |
|---|---|---|---|
| Dissertativo-Argumentativo | Defender uma tese, persuadir o leitor por argumentos racionais | Verbos no presente do indicativo, conectores lógicos causais e concessivos, citações de autoridade | Mais de 80 por cento dos textos principais |
| Expositivo ou Informativo | Apresentar conceitos, dados e fatos de forma impessoal e clara | Linguagem denotativa estrita, ausência de juízos de valor subjetivos, precisão terminológica | Textos complementares e artigos de divulgação |
| Injuntivo ou Instrucional | Orientar, instruir ou prescrever comandos e rotinas operacionais | Verbos no imperativo ou no infinitivo prescritivo, enumerações ordenadas cronologicamente | Manuais de operação técnica e protocolos |
| Narrativo | Relatar sucessão cronológica de eventos vividos por personagens | Verbos no pretérito perfeito e imperfeito, marcadores temporais e espaciais | Raro como texto principal na Cesgranrio |

---

## 3. Roteiro Prático de Leitura Analítica para a Prova da Transpetro

1. Mapeamento da Tese Central: Nos artigos de opinião e ensaios da Cesgranrio, a tese central costuma ser posicionada no desfecho do primeiro parágrafo ou imediatamente após o primeiro conector de oposição ou concessão, como contudo, no entanto ou embora.
2. Desarme de Distratores Generalistas: Alternativas construídas com advérbios ou pronomes absolutos como invariavelmente, sempre, jamais, exclusivamente, totalmente ou unicamente são distratores falsos em mais de 90 por cento dos casos. A banca costuma converter uma probabilidade apontada pelo autor em uma certeza categórica para induzir o candidato ao erro.
3. Distinção de Polifonia: Quando o autor introduz opiniões alheias com expressões como Alguns analistas apontam que ou Setores conservadores alegam que, ele está frequentemente montando um contra-argumento que pretende refutar no parágrafo seguinte. Não confunda a tese de terceiros com a opinião do próprio autor.`,
        keyTakeaways: [
          'Compreensão busca o explícito e literal; interpretação busca o dedutível logicamente das premissas textuais.',
          'A Cesgranrio penaliza com rigor a extrapolação, quando o candidato traz informações verídicas de fora do texto.',
          'Termos absolutos como invariavelmente, exclusivamente e sempre quase sempre sinalizam alternativas incorretas.',
          'A tese do autor surge frequentemente após conectores de oposição ou concessão no início do texto.'
        ],
        cesgranrioTraps: [
          'Apresentar uma proposição absolutamente verdadeira no setor de energia ou inteligência artificial, mas que não foi sequer mencionada no texto da prova.',
          'Confundir a citação de um argumento adverso refutado pelo autor com a própria conclusão dele.'
        ],
        practiceQuestions: [
          {
            questionNumber: 1,
            statement: 'Em questões de interpretação da Fundação Cesgranrio, ao se deparar com o enunciado "Infere-se do texto que...", a postura analítica correta do candidato deve ser:',
            options: [
              'A) Buscar exclusivamente palavras idênticas às do texto, rejeitando qualquer dedução lógica.',
              'B) Identificar conclusões que decorrem necessariamente das premissas textuais, sem incorrer em extrapolações infundadas.',
              'C) Assinalar a alternativa que apresentar o seu conhecimento prévio sobre o tema, independentemente do texto.',
              'D) Priorizar alternativas que contenham advérbios generalistas como "invariavelmente".',
              'E) Considerar que interpretação e transcrição literal possuem exatamente a mesma exigência.'
            ],
            correctLetter: 'B',
            explanation: 'A inferência exige dedução lógica a partir de pistas e premissas textuais explícitas, sem extrapolar o escopo delimitado pelo autor. Extrapolações com base em opiniões pessoais são o principal motivo de erro.',
            cesgranrioTip: 'Inferir é deduzir do texto com respaldo lógico, sem inventar premissas ausentes.'
          },
          {
            questionNumber: 2,
            statement: 'Considere o trecho adaptado de um editorial: "Embora os investimentos em energias renováveis tenham crescido em escala global nos últimos cinco anos, a infraestrutura logística de transporte de hidrocarbonetos permanece como eixo crítico para a segurança de abastecimento das nações em desenvolvimento." A partir desse excerto, infere-se que:',
            options: [
              'A) O crescimento das energias renováveis tornou obsoleta a malha logística de transporte de hidrocarbonetos.',
              'B) Os países desenvolvidos já erradicaram totalmente o consumo de combustíveis fósseis.',
              'C) O papel estratégico do transporte de hidrocarbonetos ainda é indispensável para países em desenvolvimento, não obstante o avanço das fontes limpas.',
              'D) Os investimentos em fontes renováveis foram inexpressivos e não causaram impacto na matriz energética.',
              'E) A segurança de abastecimento depende unicamente de investimentos em fontes alternativas.'
            ],
            correctLetter: 'C',
            explanation: 'O conector concessivo "Embora" introduz o crescimento das renováveis como fato que não anula a tese central: a permanência do transporte de hidrocarbonetos como eixo crítico para países em desenvolvimento.',
            cesgranrioTip: 'Oração com "Embora" traz uma concessão; a tese que prevalece na interpretação fica na oração principal.'
          },
          {
            questionNumber: 3,
            statement: 'Um candidato que assinala uma alternativa por julgá-la "um fato verídico na atual conjuntura do setor de energia", apesar de tal dado não constar de nenhuma linha do texto fornecido na prova, cometeu o erro interpretativo denominado:',
            options: [
              'A) Contradição.',
              'B) Redução.',
              'C) Extrapolação.',
              'D) Paráfrase.',
              'E) Coesão anafórica.'
            ],
            correctLetter: 'C',
            explanation: 'A extrapolação ocorre quando o leitor introduz informações de seu repertório pessoal que não estão ancoradas em premissas do texto-base da prova.',
            cesgranrioTip: 'Se não está dito nem pode ser deduzido das premissas do texto, é extrapolação e a alternativa é falsa.'
          },
          {
            questionNumber: 4,
            statement: 'Na análise da tipologia textual de editoriais publicados em jornais de circulação nacional, a estrutura predominante caracteriza-se como:',
            options: [
              'A) Narrativa, em razão da prevalência de ações sucessivas no pretérito perfeito.',
              'B) Descritiva, tendo em vista a enumeração minuciosa de objetos físicos.',
              'C) Injuntiva, face ao uso contínuo de ordens e verbos no imperativo dirigidos ao leitor.',
              'D) Dissertativo-argumentativa, em virtude da defesa de uma tese fundamentada em argumentos lógicos.',
              'E) Poética, em decorrência da predominância da função emotiva da linguagem.'
            ],
            correctLetter: 'D',
            explanation: 'O editorial é o gênero dissertativo-argumentativo por excelência na imprensa, cujo propósito é exprimir a opinião institucional do veículo sobre tema de interesse público, sustentada por argumentos.',
            cesgranrioTip: 'Editoriais e artigos de opinião são classificados como dissertativo-argumentativos.'
          },
          {
            questionNumber: 5,
            statement: 'Ao examinar as alternativas de uma questão da Cesgranrio sobre o ponto de vista do autor, o candidato encontra uma assertiva afirmando que determinada tecnologia "solucionará sem exceções e de modo irreversível as falhas de suprimento". Essa alternativa deve ser vista com ceticismo prioritário porque:',
            options: [
              'A) Apresenta generalizações absolutas ("sem exceções", "irreversível") que raramente encontram respaldo na ponderação dos textos dissertativos da banca.',
              'B) Utiliza verbos no tempo futuro do presente, proibidos pela gramática normativa.',
              'C) Emprega termos técnicos não dicionarizados pela Academia Brasileira de Letras.',
              'D) Expressa uma concessão sem o emprego da conjunção "embora".',
              'E) Configura um desvio de regência verbal do verbo solucionar.'
            ],
            correctLetter: 'A',
            explanation: 'Generalizações extremadas contendo termos como "sem exceções", "irreversível" ou "invariavelmente" costumam ser formulações falsas elaboradas pela banca para testar a atenção do leitor.',
            cesgranrioTip: 'Fique atento a afirmações categóricas extremadas; textos técnicos raramente usam termos absolutos sem ressalvas.'
          }
        ],
        transpetroApplication: 'Leitura crítica de relatórios de auditoria ambiental, termos de cooperação técnica com a Marinha e pareceres de conformidade regulatória da ANP.'
      },
      {
        id: 'cap-pt-02',
        chapterNumber: 2,
        title: 'Mecanismos de Coesão, Conectores e Tempos Verbais',
        subtitle: 'Anáfora, catáfora, o valor discursivo das conjunções e a correlação verbal',
        readTimeEstimate: '45 min',
        summary: 'Domínio das relações lógicas de causa, consequência, concessão, condição e proporção estabelecidas por conectores na Cesgranrio. O emprego expressivo do modo subjuntivo para hipóteses e a correlação verbal estrita entre pretéritos e condicionais.',
        contentMarkdown: `## 1. Mecanismos de Coesão Referencial e Sequencial

A coesão textual estrutura a amarração semântica e sintática do texto, sendo cobrada sistematicamente em questões de substituição de pronomes e conectores:

1. Coesão Anafórica (Retomada): Ocorre quando um termo gramatical remete a outro termo já citado anteriormente no texto.
   - Exemplo: O oleoduto submarino apresentou oscilação de vazão. Esse ativo foi inspecionado por drones autônomos. O pronome esse e o substantivo ativo operam como mecanismos anafóricos.
2. Coesão Catafórica (Antecipação): Ocorre quando o termo gramatical antecipa uma informação que só será enunciada na sequência da frase.
   - Exemplo: A diretriz operacional da Transpetro é esta: tolerância zero a vazamentos operacionais. O pronome esta aponta para o que vem adiante.
3. Elipse e Coesão Lexical: A omissão de termos facilmente recuperáveis pelo contexto sintático evita redundâncias e mantém a fluidez do raciocínio.

---

## 2. Tabela de Conectores Críticos da Cesgranrio

| Relação Semântica | Conjunções Mais Cobradas | Sinônimos Funcionais Perfeitos | Efeito Sintático e Modo Verbal |
|---|---|---|---|
| Concessão (Oposição que não impede a ação) | Embora, conquanto, ainda que, mesmo que | Não obstante, a despeito de, malgrado, se bem que | Exigem obrigatoriamente verbo no modo subjuntivo |
| Causa (Motivo gerador cronologicamente anterior) | Porque, já que, visto que, dado que | Porquanto, haja vista, como (anteposto à oração principal) | Introduzem o fato que originou o efeito |
| Consequência (Resultado cronologicamente posterior) | De modo que, de forma que, tanto que | De sorte que, tão... que, tamanho... que | Apontam o desfecho provocado pela causa antecedente |
| Proporção (Simetria de variação contínua) | À medida que, ao passo que | À proporção que | Denotam gradação paralela; nunca use "à medida em que" |
| Condição (Premissa hipotética necessária) | Se, caso, contanto que | Desde que (com subjuntivo), a menos que, a não ser que | Condicionam a realização da oração principal |
| Adversidade (Quebra de expectativa ou contraste firme) | Mas, porém, contudo, todavia | Entretanto, no entanto, não obstante (com indicativo) | Unem orações coordenadas; não exigem modo subjuntivo |

### O Confronto Clássico da Cesgranrio: À Medida Que versus Na Medida Em Que
- À medida que: Expressa exclusivamente relação de PROPORÇÃO. Exemplo: À medida que a profundidade oceânica aumenta, a pressão sobre as tubulações cresce exponencialmente.
- Na medida em que: Expressa exclusivamente relação de CAUSA ou JUSTIFICATIVA. Exemplo: A automação de dutos deve ser priorizada, na medida em que reduz a exposição humana a riscos severos.
- Forma inexistente na norma culta: A locução híbrida à medida em que é um erro gramatical grosseiro frequentemente inserido como opção errada nas provas.

---

## 3. Correlação dos Tempos Verbais (Modo Subjuntivo e Indicativo)

A Cesgranrio exige rigor absoluto na harmonia temporal entre as orações coordenadas e subordinadas:
1. Pretérito Imperfeito do Subjuntivo com Futuro do Pretérito do Indicativo: Se a equipe realizasse manutenções preventivas regulares, a refinaria evitaria paralisações imprevistas. A troca de evitaria por evitará ou evitou destrói a correlação padrão.
2. Futuro do Subjuntivo com Futuro do Presente do Indicativo: Quando os navios petroleiros atracarem no terminal de Angra dos Reis, a equipe técnica iniciará o bombeamento imediato. Note que o verbo atracar assume a forma atracarem no futuro do subjuntivo.
3. Presente do Subjuntivo com Presente do Indicativo ou Imperativo: É imperativo que os analistas validem os dados telemétricos antes de emitir o laudo de conformidade.`,
        keyTakeaways: [
          'Anáfora retoma termos antecedentes; catáfora antecipa termos que serão enunciados adiante.',
          'Conquanto e embora introduzem orações subordinadas concessivas e exigem modo subjuntivo.',
          'À medida que expressa proporção; na medida em que expressa causa; a forma à medida em que não existe.',
          'A correlação verbal exige harmonia: se fizesse (pretérito imperfeito do subjuntivo), faria (futuro do pretérito).'
        ],
        cesgranrioTraps: [
          'A banca usa a locução incorreta "à medida em que" afirmando que ela expressa proporção.',
          'Substituir a conjunção explicativa "porquanto" pela adversativa "portanto", induzindo o candidato ao erro de som.'
        ],
        practiceQuestions: [
          {
            questionNumber: 1,
            statement: 'Na frase "A produção de biocombustíveis aumentará, na medida em que as novas tecnologias agrícolas forem consolidadas", a locução sublinhada estabelece relação de:',
            options: [
              'A) Proporção contínua.',
              'B) Causa e justificativa.',
              'C) Concessão excepcional.',
              'D) Tempo cronológico.',
              'E) Oposição adversativa.'
            ],
            correctLetter: 'B',
            explanation: '"Na medida em que" tem valor estritamente causal e explicativo, equivalendo a "já que", "visto que" ou "dado que". A relação de proporção exigiria a locução "À medida que".',
            cesgranrioTip: 'Na medida em que = porque / visto que (Causa). À medida que = à proporção que (Proporção).'
          },
          {
            questionNumber: 2,
            statement: 'Assinale a frase em que o conector em destaque introduz uma oração subordinada adverbial concessiva:',
            options: [
              'A) Os sensores submarinos foram acionados, porquanto a pressão caiu abruptamente.',
              'B) Conquanto houvesse forte tempestade em alto-mar, o navio aliviador completou a operação de transbordo com segurança.',
              'C) Como as previsões meteorológicas alertaram para ondas severas, as equipes adiaram o mergulho.',
              'D) Os tanques de armazenamento foram esvaziados para que a inspeção interna ocorresse.',
              'E) O plano de contingência foi executado à proporção que o incidente ganhava escala.'
            ],
            correctLetter: 'B',
            explanation: '"Conquanto" é conjunção subordinativa concessiva por excelência, sinônima exata de "embora" e "ainda que", introduzindo oração cujo fato oposto não impede a realização da principal.',
            cesgranrioTip: 'Conquanto = Embora (Concessão obrigatória com verbo no subjuntivo).'
          },
          {
            questionNumber: 3,
            statement: 'Considere a seguinte frase: "Se os algoritmos de telemetria identificassem falhas com antecedência, os custos operacionais de reparo seriam drasticamente reduzidos." Caso o verbo "identificassem" seja substituído por "identificarem", para que a correlação verbal se mantenha correta na norma culta, a forma "seriam" deve ser alterada para:',
            options: [
              'A) foram',
              'B) serão',
              'C) seriam sido',
              'D) seriam sendo',
              'E) fossem'
            ],
            correctLetter: 'B',
            explanation: 'Ao conjugar o verbo na condição no futuro do subjuntivo ("identificarem"), a oração principal correlata deve ir para o futuro do presente do indicativo ("serão reduzidos"). A combinação imperfeito do subjuntivo com futuro do pretérito é substituída por futuro do subjuntivo com futuro do presente.',
            cesgranrioTip: 'Se fizesse -> faria. Se fizer -> fará.'
          },
          {
            questionNumber: 4,
            statement: 'Assinale a alternativa em que a substituição de conjunções preserva tanto o sentido original quanto a correção gramatical da oração "O relatório foi aprovado, não obstante as ressalvas apresentadas pelos auditores":',
            options: [
              'A) a despeito das ressalvas apresentadas',
              'B) em virtude das ressalvas apresentadas',
              'C) à medida das ressalvas apresentadas',
              'D) porquanto as ressalvas apresentadas',
              'E) tão logo as ressalvas apresentadas'
            ],
            correctLetter: 'A',
            explanation: '"Não obstante" expressa concessão e equivale perfeitamente a "a despeito de" ou "apesar de". "Em virtude de" indica causa, e "porquanto" exige oração com verbo conjugado.',
            cesgranrioTip: 'Não obstante = A despeito de = Apesar de.'
          },
          {
            questionNumber: 5,
            statement: 'Em "A diretriz operacional prioritária do terminal aquaviário é esta: garantir a estanqueidade absoluta das linhas de transferência", o pronome sublinhado atua como mecanismo de coesão:',
            options: [
              'A) anafórica, ao recapitular termos já expressos no período anterior.',
              'B) catafórica, ao antecipar uma informação que será expressa a seguir.',
              'C) dêitica temporal pura, sem função no interior da sintaxe frasal.',
              'D) reflexiva simétrica, equivalendo ao pronome se apassivador.',
              'E) hiperonímica dispersa, sintetizando orações subordinadas causais.'
            ],
            correctLetter: 'B',
            explanation: 'O pronome demonstrativo "esta" tem função catafórica quando anuncia e antecipa o conteúdo que vem imediatamente após os dois pontos.',
            cesgranrioTip: 'Esta / isto = catáfora (aponta para frente). Essa / isso = anáfora (retoma o que já passou).'
          }
        ],
        transpetroApplication: 'Elaboração de comunicações corporativas e relatórios técnicos em que a precisão de conectores evita disputas contratuais sobre obrigações e prazos.'
      },
      {
        id: 'cap-pt-03',
        chapterNumber: 3,
        title: 'Morfossintaxe: Concordância, Regência e o Sinal de Crase',
        subtitle: 'A partícula SE, a regência dos verbos críticos e as proibições da crase',
        readTimeEstimate: '50 min',
        summary: 'Casos decisivos de concordância verbal com sujeito composto, expressões partitivas e a partícula SE (apassivador versus índice de indeterminação do sujeito). Regência detalhada de verbos como aspirar, visar, assistir, implicar, preferir, esquecer e lembrar. Regras proibitivas, obrigatórias e facultativas do acento grave indicativo de crase.',
        contentMarkdown: `## 1. Concordância Verbal com a Partícula SE

A Cesgranrio aborda reiteradamente a dupla função sintática do pronome SE nas estruturas oracionais:

### A. SE como Partícula Apassivadora (Pronome Apassivador)
- Condição estrutural: Acompanha Verbo Transitivo Direto (VTD) ou Verbo Transitivo Direto e Indireto (VTDI).
- Consequência: O termo que parece objeto direto é, na realidade, o SUJEITO PACIENTE da oração. Portanto, o verbo DEVE CONCORDAR em número com esse sujeito!
- Exemplos:
  - Analisou-se o dado de telemetria. (Sujeito singular: o dado de telemetria -> verbo no singular).
  - Analisaram-se os dados de telemetria. (Sujeito plural: os dados de telemetria -> verbo no plural).
  - Transfere-se o óleo refinado. / Transferem-se os óleos refinados.

### B. SE como Índice de Indeterminação do Sujeito (IIS)
- Condição estrutural: Acompanha Verbo Transitivo Indireto (VTI), Verbo Intransitivo (VI) ou Verbo de Ligação (VL), habitualmente seguido de preposição.
- Consequência: O sujeito é indeterminado. O verbo FICA OBRIGATORIAMENTE NA 3ª PESSOA DO SINGULAR! É proibido pluralizar o verbo nesse caso!
- Exemplos:
  - Precisa-se de operadores qualificados. (Correto. Dizer "Precisam-se de operadores" é erro crasso!).
  - Trata-se de ocorrências extraordinárias. (Correto. Dizer "Tratam-se de ocorrências" é erro crasso!).
  - Assistiu-se aos experimentos no laboratório químico.

---

## 2. Regência Verbal de Verbos Decisivos em Concursos

| Verbo | Sentido Específico | Transitividade e Regência | Exemplo Correto segundo a Norma Culta |
|---|---|---|---|
| Implicar | Acarretar, produzir como resultado | Transitivo Direto (VTD) sem preposição | A falha na válvula implicará prejuízos milionários. (Nunca use: implicará em prejuízos!). |
| Visar | Ter como meta ou objetivo | Transitivo Indireto (VTI) com preposição "a" | O novo algoritmo visa ao aumento da eficiência logística. (Admite crase se houver artigo feminino: visa à melhoria). |
| Visar | Mirar ou apor visto / assinatura | Transitivo Direto (VTD) sem preposição | O capitão visou o alvo. O gerente visou o documento. |
| Aspirar | Almejar, desejar ardentemente | Transitivo Indireto (VTI) com preposição "a" | Os recém-formados aspiram ao cargo de cientista de dados. |
| Aspirar | Sorver, inalar ar ou gases | Transitivo Direto (VTD) sem preposição | Os operadores aspiraram os vapores tóxicos. |
| Assistir | Presenciar, ver com atenção | Transitivo Indireto (VTI) com preposição "a" | A diretoria assistiu à apresentação dos modelos preditivos. |
| Assistir | Prestar assistência ou socorro | VTD ou VTI facultativo | O médico socorreu e assistiu o paciente (ou ao paciente). |
| Preferir | Ter primazia ou preferência | VTDI exigindo "a" (rejeita "do que" ou "mais que") | Prefiro a precisão do modelo à velocidade de treinamento. (Nunca diga: prefiro mais do que). |
| Esquecer / Lembrar | Forma não pronominal (sem pronome se) | Transitivo Direto (VTD) sem preposição | Ele esqueceu o protocolo de segurança. |
| Esquecer-se / Lembrar-se | Forma pronominal (com pronome se) | Transitivo Indireto (VTI) com preposição "de" | Ele se esqueceu do protocolo de segurança. |

---

## 3. O Sinal Indicativo de Crase: Regras Sistemáticas

A crase é a fusão da preposição "a" exigida por um termo regente com o artigo definido feminino "a" ou pronome demonstrativo inicial "a/aquele".

### Proibições Absolutas da Crase (Crase Jamais Ocorre):
1. Antes de palavras masculinas: Andar a cavalo, pagar a prazo, motores a diesel, transbordo feito a bordo.
2. Antes de verbos no infinitivo: Ficou a ver navios, começou a bombear o fluido, disposto a colaborar.
3. Antes de pronomes de tratamento, pessoais e indefinidos: Referiu-se a ela, entregou a Vossa Senhoria, solicitou a qualquer pessoa, dirigiu-se a todos. (Exceções de tratamento: senhora, senhorita e dona admitem crase).
4. Diante do "a" singular seguido de palavra no plural: Refiro-me a reuniões extraordinárias. (Se fosse craseado, estaria no plural: às reuniões).
5. Entre palavras repetidas idênticas: Cara a cara, dia a dia, gota a gota, ponta a ponta.

### Casos de Crase Facultativa (O Uso É Opcional):
1. Antes de pronomes possessivos femininos no singular seguidos de substantivo: Refiro-me a sua tese ou Refiro-me à sua tese.
2. Antes de nomes próprios femininos sem valor de nobreza: Entregou o relatório a Mariana ou Entregou o relatório à Mariana.
3. Após a preposição até: Caminhou até a plataforma ou Caminhou até à plataforma.`,
        keyTakeaways: [
          'Verbo Transitivo Direto com SE admite sujeito paciente e vai para o plural: Identificaram-se falhas.',
          'Verbo com preposição acompanhado de SE tem sujeito indeterminado e fica no singular: Precisa-se de dados.',
          'O verbo implicar, no sentido de acarretar, é VTD e não aceita a preposição em: implicará demissão.',
          'Crase é estritamente proibida antes de palavras masculinas, verbos e pronomes indefinidos.'
        ],
        cesgranrioTraps: [
          'Usar "Tratam-se de problemas" ou "Precisam-se de vagas": o verbo com preposição e pronome SE nunca pluraliza.',
          'Escrever "implicará em atraso": a banca considera desvio formal de regência com penalização direta.'
        ],
        practiceQuestions: [
          {
            questionNumber: 1,
            statement: 'De acordo com a norma-padrão da Língua Portuguesa, a concordância verbal está inteiramente correta em:',
            options: [
              'A) Tratam-se de parâmetros computacionais que exigem validação empírica.',
              'B) Identificou-se, durante as manobras no terminal, diversas oscilações de fluxo.',
              'C) Identificaram-se, durante as manobras no terminal, diversas oscilações de fluxo.',
              'D) Devem haver muitos procedimentos pendentes na auditoria da refinaria.',
              'E) Fazem cinco anos que os novos sistemas de proteção catódica foram instalados.'
            ],
            correctLetter: 'C',
            explanation: 'Na opção C, "diversas oscilações de fluxo" é o sujeito paciente do verbo transitivo direto "identificar" com a partícula apassivadora "se", impondo a concordância no plural: "Identificaram-se". Em A, trata-se de VTI com índice de indeterminação, exigindo singular ("Trata-se de"). Em D, o verbo haver no sentido de existir é impessoal e fica no singular ("Deve haver"). Em E, o verbo fazer indicando tempo decorrido é impessoal e não flexiona no plural ("Faz cinco anos").',
            cesgranrioTip: 'VTD + SE = Concorda com o sujeito no plural. Verbo haver (existir) ou fazer (tempo) = Fica sempre no singular.'
          },
          {
            questionNumber: 2,
            statement: 'Assinale a alternativa que atende com rigor às normas de regência verbal e ao emprego do sinal indicativo de crase:',
            options: [
              'A) A reestruturação da malha de oleodutos implicará em drástica economia de combustível.',
              'B) Os pesquisadores aspiravam ao cargo de coordenador de inovação tecnológica.',
              'C) O gerente geral preferia mais a conformidade regulatória do que o lucro imediato.',
              'D) A diretoria da Transpetro sempre assistiu os eventos internacionais de óleo e gás.',
              'E) O cientista de dados esqueceu dos detalhes matemáticos do teorema de convergência.'
            ],
            correctLetter: 'B',
            explanation: 'O verbo "aspirar" no sentido de desejar ardentemente é transitivo indireto regido pela preposição "a", tornando correta a expressão "aspiravam ao cargo". Em A, "implicar" no sentido de acarretar é VTD (não aceita "em"). Em C, "preferir" rejeita "mais" e "do que", exigindo a estrutura "preferia a conformidade ao lucro". Em D, assistir no sentido de presenciar exige preposição "a" ("assistiu aos eventos"). Em E, esquecer sem pronome reflexivo é VTD ("esqueceu os detalhes").',
            cesgranrioTip: 'Aspirar ao cargo (VTI). Implicar demissão (VTD). Preferir X a Y (VTDI).'
          },
          {
            questionNumber: 3,
            statement: 'O acento grave indicativo de crase está empregado em estrita conformidade com a norma culta em:',
            options: [
              'A) O capitão ordenou que a tripulação voltasse à bordo imediatamente.',
              'B) O relatório de emissões foi encaminhado à uma comissão parlamentar mista.',
              'C) O engenheiro dedicou-se à aprimorar os modelos de predição de fadiga mecânica.',
              'D) A equipe técnica recorreu à auditoria externa para revisar os procedimentos de segurança.',
              'E) Os técnicos realizavam testes de campo dia à dia para checar a espessura do duto.'
            ],
            correctLetter: 'D',
            explanation: 'O verbo "recorrer" rege preposição "a" ("recorrer a"), e "auditoria externa" é substantivo feminino antecedido pelo artigo "a", ocorrendo a fusão da crase: "recorreu à auditoria". Nas demais opções a crase é proibida: antes de palavra masculina ("bordo"), antes de artigo indefinido ("uma"), antes de verbo ("aprimorar") e entre palavras repetidas ("dia a dia").',
            cesgranrioTip: 'Crase proibida: antes de masculino, verbo, artigo indefinido e entre palavras repetidas.'
          },
          {
            questionNumber: 4,
            statement: 'Assinale a frase em que o uso do acento indicativo de crase é facultativo segundo a norma-padrão:',
            options: [
              'A) A comissão entregou os relatórios à sua supervisora imediata.',
              'B) O navio aproximou-se à costa brasileira durante a madrugada.',
              'C) O operador dedicou seu expediente à verificação das válvulas.',
              'D) O comunicado oficial foi direcionado à empresa concessionária.',
              'E) A empresa concedeu prioridade àquela demanda operacional.'
            ],
            correctLetter: 'A',
            explanation: 'O uso da crase é facultativo diante de pronomes possessivos femininos no singular acompanhados de substantivo ("à sua supervisora" ou "a sua supervisora"), porque o emprego do artigo definido antes do possessivo é opcional.',
            cesgranrioTip: 'Casos facultativos de crase: pronome possessivo feminino singular, nome próprio feminino e após a palavra "até".'
          },
          {
            questionNumber: 5,
            statement: 'Considere a seguinte oração: "A diretoria do terminal aquaviário informou que se necessitavam de novos planos de evacuação". Do ponto de vista da norma-padrão gramatical, a frase apresenta desvio de:',
            options: [
              'A) Regência nominal, pois evacuação não admite complemento com a preposição de.',
              'B) Concordância verbal, pois o verbo necessitar é transitivo indireto acompanhado de partícula de indeterminação do sujeito, devendo permanecer na 3ª pessoa do singular.',
              'C) Colocação pronominal, uma vez que a próclise é expressamente proibida após orações subordinadas substantivas.',
              'D) Ortografia oficial, em virtude do hífen inexistente.',
              'E) Regência verbal, já que necessitar exige complemento sem preposição.'
            ],
            correctLetter: 'B',
            explanation: 'O verbo "necessitar" rege a preposição "de" (VTI). Com a partícula "se", o sujeito é indeterminado, e o verbo deve obrigatoriamente permanecer na 3ª pessoa do singular: "necessitava-se de novos planos". A flexão no plural é incorreta.',
            cesgranrioTip: 'VTI + preposição + se = Verbo sempre no singular.'
          }
        ],
        transpetroApplication: 'Redação oficial de memorandos, termos de compromisso de ajuste de conduta e relatórios de conformidade regulatória para órgãos estatais.'
      },
      {
        id: 'cap-pt-04',
        chapterNumber: 4,
        title: 'Pontuação Rigorosa e Reescrita de Frases',
        subtitle: 'As proibições invioláveis da vírgula e a equivalência semântica de orações',
        readTimeEstimate: '45 min',
        summary: 'Domínio das regras de pontuação mais exploradas pela Cesgranrio: as três proibições capitais da vírgula, o isolamento de adjuntos adverbiais antecipados e a distinção entre orações adjetivas explicativas e restritivas. Técnicas de reescrita oracional mantendo sentido e correção.',
        contentMarkdown: `## 1. As Três Proibições Capitais da Vírgula

Em provas de concurso público de alto nível, os erros mais frequentes de pontuação envolvem a colocação indevida de vírgula quebrando blocos sintáticos coesos:

1. Proibição 1: Jamais separe por vírgula o SUJEITO do seu PREDICADO.
   - Incorreto: Todos os engenheiros responsáveis pelo terminal de dutos, participaram da simulação de contenção de incidentes.
   - Correto: Todos os engenheiros responsáveis pelo terminal de dutos participaram da simulação de contenção de incidentes. (Mesmo que o sujeito seja longo, a vírgula é proibida!).
2. Proibição 2: Jamais separe por vírgula o VERBO do seu COMPLEMENTO (objeto direto ou indireto).
   - Incorreto: A diretoria de logística determinou, que todas as manobras fossem registradas em tempo real no blockchain.
   - Correto: A diretoria de logística determinou que todas as manobras fossem registradas em tempo real no blockchain.
3. Proibição 3: Jamais separe por vírgula o NOME do seu ADJUNTO ADNOMINAL ou COMPLEMENTO NOMINAL.
   - Incorreto: A aquisição, de novos navios petroleiros foi autorizada pelo conselho.
   - Correto: A aquisição de novos navios petroleiros foi autorizada pelo conselho.

---

## 2. Emprego Obrigatório e Facultativo da Vírgula

### A. Adjunto Adverbial Deslocado (Antecipado ou Intercalado)
- Regra de ouro da Cesgranrio: Quando o adjunto adverbial de grande extensão (três palavras ou mais) for antecipado ou intercalado no período, a vírgula é OBRIGATÓRIA.
  - Exemplo: Diante das severas oscilações na pressão dos oleodutos submarinos, a equipe técnica acionou os sistemas de bloqueio emergencial.
- Se o adjunto adverbial for de curta extensão (uma ou duas palavras), a vírgula é facultativa: Ontem os analistas concluíram o teste ou Ontem, os analistas concluíram o teste.

### B. Orações Subordinadas Adjetivas: Explicativas versus Restritivas
- Com vírgulas (Explicativa): Generaliza a informação para todos os elementos do conjunto.
  - Exemplo: Os navios petroleiros da frota, que possuem duplo casco, oferecem maior segurança ambiental. (Sentido: TODOS os navios da frota possuem duplo casco).
- Sem vírgulas (Restritiva): Restringe a informação apenas para um subconjunto específico dos elementos.
  - Exemplo: Os navios petroleiros da frota que possuem duplo casco oferecem maior segurança ambiental. (Sentido: Apenas UMA PARTE da frota possui duplo casco; os que não possuem não oferecem a mesma segurança).
- Atenção para questões de reescrita: Retirar as vírgulas de uma oração adjetiva explicativa mantém a correção gramatical, mas ALTERA O SENTIDO ORIGINAL do período!

---

## 3. Reescrita de Frases com Equivalência Semântica

A Cesgranrio costuma apresentar enunciados do tipo: "O trecho sublinhado pode ser reescrito, mantendo-se a correção gramatical e o sentido original, da seguinte forma:". Para gabaritar essas questões, siga as regras de substituição:
- Troca de voz ativa por voz passiva: Os analistas desenvolveram o algoritmo -> O algoritmo foi desenvolvido pelos analistas.
- Substituição de oração subordinada causal por conector equivalente: Como os custos operacionais subiram -> Visto que os custos operacionais subiram.
- Cuidado com troca de conectores concessivos por adversativos: Se o texto original usa "Embora chovesse, fomos à praia", trocar por "Chovia, mas fomos à praia" altera a hierarquia sintática (de subordinação para coordenação), embora mantenha a coerência global.`,
        keyTakeaways: [
          'É estritamente proibido colocar vírgula entre sujeito e verbo, e entre verbo e seu complemento.',
          'Adjunto adverbial longo antecipado exige vírgula obrigatória.',
          'Oração adjetiva entre vírgulas é explicativa (abrange a totalidade); sem vírgulas é restritiva (restringe ao grupo).',
          'Retirar vírgulas de uma oração explicativa altera o sentido original, transformando-a em restritiva.'
        ],
        cesgranrioTraps: [
          'Inserir vírgula após sujeitos longos e compostos para testar se o candidato respira mentalmente.',
          'Afirmar que a eliminação das vírgulas de uma oração explicativa "mantém inalterado o sentido original do texto".'
        ],
        practiceQuestions: [
          {
            questionNumber: 1,
            statement: 'Assinale a opção em que a pontuação está inteiramente correta segundo as normas gramaticais:',
            options: [
              'A) Todos os membros do comitê de segurança operacional da Transpetro, reuniram-se para homologar o plano.',
              'B) Diante das oscilações anômalas de vazão no duto submarino, os operadores fecharam as válvulas de segurança.',
              'C) O sistema de detecção acústica de vazamentos, que opera ininterruptamente não apresentou falhas.',
              'D) A equipe técnica comprovou que, os modelos preditivos baseados em redes neurais elevaram o rendimento.',
              'E) No porto de São Sebastião navios de grande porte, aguardavam autorização ambiental para atracação.'
            ],
            correctLetter: 'B',
            explanation: 'Na opção B, a oração principia com um adjunto adverbial longo antecipado ("Diante das oscilações anômalas de vazão no duto submarino,"), que foi corretamente isolado por vírgula. Nas outras opções há vírgula separando sujeito longo e verbo (A e E), oração adjetiva com vírgula abrindo sem fechar (C) e vírgula separando conjunção integrante do predicado (D).',
            cesgranrioTip: 'Nunca separe sujeito de verbo, nem abra oração explicativa por vírgula sem fechá-la.'
          },
          {
            questionNumber: 2,
            statement: 'Considere a seguinte frase original: "Os equipamentos de bombeamento que foram modernizados no ano passado apresentaram índice nulo de paradas não programadas". Caso sejam inseridas vírgulas isolando a oração "que foram modernizados no ano passado", ocorrerá:',
            options: [
              'A) Erro gramatical insuportável de concordância verbal.',
              'B) Alteração semântica, transformando uma oração adjetiva restritiva em explicativa, passando a indicar que todos os equipamentos foram modernizados.',
              'C) Conversão automática do período em voz passiva sintética com pronome apassivador.',
              'D) Prejuízo imediato à coesão anafórica do sujeito.',
              'E) Nenhuma alteração semântica ou sintática, mantendo-se a equivalência absoluta.'
            ],
            correctLetter: 'B',
            explanation: 'Sem vírgulas, a oração é subordinada adjetiva restritiva (apenas os equipamentos modernizados tiveram índice nulo de paradas). Com vírgulas, ela torna-se explicativa, atribuindo a modernização a todos os equipamentos do conjunto.',
            cesgranrioTip: 'Com vírgula = Explicativa (todos). Sem vírgula = Restritiva (alguns).'
          },
          {
            questionNumber: 3,
            statement: 'Assinale a alternativa em que a proposta de reescrita preserva integralmente a correção gramatical e o sentido original do trecho: "Conquanto o orçamento estivesse reduzido, os investimentos em cibersegurança foram mantidos pela diretoria":',
            options: [
              'A) Já que o orçamento estivesse reduzido, a diretoria manteve os investimentos em cibersegurança.',
              'B) Embora o orçamento estivesse reduzido, a diretoria manteve os investimentos em cibersegurança.',
              'C) À medida que o orçamento esteve reduzido, a diretoria manteve os investimentos em cibersegurança.',
              'D) Não obstante o orçamento estivesse reduzido a diretoria, manteve os investimentos em cibersegurança.',
              'E) Porquanto o orçamento reduziu-se, a diretoria manteve os investimentos em cibersegurança.'
            ],
            correctLetter: 'B',
            explanation: '"Embora" é conjunção subordinativa concessiva perfeitamente equivalente a "Conquanto", mantendo a correlação com o pretérito imperfeito do subjuntivo ("estivesse") e o sentido original.',
            cesgranrioTip: 'Conquanto = Embora (substituição canônica em questões de reescrita).'
          },
          {
            questionNumber: 4,
            statement: 'Identifique o motivo pelo qual a vírgula na oração "O diretor de operações confirmou, que os testes hidrostáticos nos tanques foram concluídos" é gramaticalmente incorreta:',
            options: [
              'A) Separa indevidamente o verbo transitivo direto de sua oração subordinada substantiva objetiva direta.',
              'B) Quebra a regência do adjunto adnominal de modo.',
              'C) Interrompe a concordância nominal entre diretor e testes.',
              'D) Antecipa indevidamente uma oração coordenada sindética adversativa.',
              'E) Constitui uma mesóclise imperfeita com a conjunção integrante.'
            ],
            correctLetter: 'A',
            explanation: 'Não se coloca vírgula entre o verbo e o seu complemento. No caso, "que os testes hidrostáticos..." funciona como objeto direto oracional do verbo transitivo direto "confirmou".',
            cesgranrioTip: 'Verbo transitivo nunca é separado de seu objeto direto por vírgula.'
          },
          {
            questionNumber: 5,
            statement: 'Na frase "A conformidade com os regulamentos ambientais, segundo os auditores independentes, constitui o alicerce da reputação corporativa", as vírgulas foram empregadas para isolar:',
            options: [
              'A) Uma oração subordinada adjetiva restritiva.',
              'B) Um vocativo enfático.',
              'C) Uma oração ou expressão adverbial de conformidade intercalada no período.',
              'D) Um aposto especificador de um nome próprio.',
              'E) Um adjunto adverbial de tempo colocado no final da frase.'
            ],
            correctLetter: 'C',
            explanation: 'A expressão "segundo os auditores independentes" expressa relação de conformidade e encontra-se intercalada entre o sujeito e o predicado, exigindo dupla vírgula de isolamento.',
            cesgranrioTip: 'Expressões intercaladas de conformidade (segundo fulano, de acordo com cicrano) devem vir isoladas por vírgulas.'
          }
        ],
        transpetroApplication: 'Revisão textual de termos de referência, pareceres jurídicos e especificações técnicas de contratação de serviços de inteligência de dados.'
      }
    ],
    examChecklist: [
      'Diferenciar claramente compreensão (o que está no texto) de interpretação (o que se infere logicamente).',
      'Desconfiar sistematicamente de alternativas que usem termos generalistas como "sempre", "nunca", "exclusivamente".',
      'Dominar o valor semântico dos conectores concessivos (conquanto, embora, a despeito de) e causais (porquanto, já que).',
      'Memorizar que "à medida que" expressa proporção, enquanto "na medida em que" expressa causa.',
      'Identificar o pronome SE apassivador (VTD com concordância no plural) versus índice de indeterminação (VTI sempre no singular).',
      'Reconhecer as regências críticas: implicar (VTD sem em), aspirar e visar (VTI com preposição a) e preferir (VTDI com preposição a).',
      'Fixar as proibições absolutas de crase: antes de palavras masculinas, verbos, pronomes de tratamento e indefinidos.',
      'Nunca separar por vírgula sujeito de verbo, nem verbo de seu objeto direto ou indireto.'
    ],
    practiceQuestions: []
  },
  {
    id: 'livro-cb-ingles',
    itemCode: 'CB-02',
    block: 'Conhecimentos Básicos',
    title: 'Manual de Língua Inglesa Instrumental para Tecnologia & Dados',
    subtitle: 'Compreensão de Artigos Científicos, Vocabulário Técnico de IA, Modais e Falsos Cognatos na Cesgranrio',
    edition: 'Edição Especial Transpetro 2026',
    author: 'Equipe de Linguagens Técnicas & Ciência da Computação',
    pagesEquivalent: 130,
    readTimeEstimate: '2h 20min',
    badge: '5 Questões Críticas',
    themeGradient: 'from-sky-600 via-blue-600 to-indigo-700',
    borderAccent: 'border-sky-500/40',
    iconName: 'Languages',
    overview: 'Leitura instrumental focada em artigos científicos de Machine Learning, Big Data, Cloud e Engenharia de Petróleo. Técnicas de skimming e scanning para resolver textos longos em menos de 8 minutos, identificação de falsos amigos (false friends), graus de certeza expressos por verbos modais e voz passiva em publicações científicas internacionais.',
    officialEditalTopics: [
      '1. Compreensão de textos escritos em língua inglesa gerais e técnicos',
      '2. Itens gramaticais: tempos verbais, conectores discursivos, modais e voz passiva',
      '3. Vocabulário técnico em Ciência de Dados, Engenharia de Software e IA',
      '4. Identificação de falsos cognatos e referência pronominal'
    ],
    targetAudience: 'Engenheiros e Cientistas de Dados que buscam maximizar pontuação com leitura rápida.',
    chapters: [
      {
        id: 'cap-en-01',
        chapterNumber: 1,
        title: 'Técnicas de Leitura Instrumental: Skimming, Scanning e Conectores Técnicos',
        subtitle: 'Como desvendar textos técnicos em inglês na metade do tempo',
        readTimeEstimate: '40 min',
        summary: 'Metodologias práticas para extrair a ideia central (Skimming) e localizar parâmetros numéricos, nomes de modelos e conclusões de pesquisa (Scanning) sem precisar traduzir palavra por palavra.',
        contentMarkdown: `## 1. O Formato da Prova de Inglês da Cesgranrio

A Fundação Cesgranrio costuma apresentar nas provas de Ciência de Dados e Tecnologia um texto de extensão média ou longa (4 a 6 parágrafos densos), extraído de publicações renomadas como MIT Technology Review, Wired, IEEE Spectrum, Communications of the ACM ou anais de conferências de topo como NeurIPS, ICML e KDD.

### As Duas Metodologias Vitais de Leitura Instrumental:
1. Skimming (Leitura Panorâmica Rápida - 90 a 120 segundos):
   - Roteiro: Leia o título, o subtítulo, o primeiro parágrafo por inteiro, a primeira sentença de cada parágrafo intermediário (denominada topic sentence) e o último parágrafo conclusivo.
   - Objetivo: Estabelecer o mapa mental do texto, a tese central defendida e a atitude do autor (se é favorável, crítica, neutra ou reflexiva).
2. Scanning (Varredura Visual Específica):
   - Roteiro: Vá direto ao enunciado da questão. Identifique as palavras-âncora (números, percentuais, siglas de modelos, nomes de autores ou termos como predictive maintenance, throughput, latency).
   - Retorne ao texto usando seus olhos como um radar visual para localizar o parágrafo exato onde esses termos ocorrem, lendo com atenção microscópica apenas as duas frases que contêm a informação solicitada.

---

## 2. Conectores Discursivos em Inglês Técnico

Os conectores (linking words) são as bússolas da interpretação de textos técnicos da Cesgranrio:

| Categoria Lógica | Conectores Principais | Sinônimos Funcionais de Prova | Significado e Efeito Semântico |
|---|---|---|---|
| Contraste ou Concessão | However, Although, While, Whereas | Nevertheless, Nonetheless, Even though, Despite, Yet | Introduzem quebra de expectativa ou limitação de uma hipótese |
| Causa ou Justificativa | Because, Since, As, Due to | Owing to, On account of, In light of, Given that | Apontam a premissa geradora de um fenômeno |
| Consequência ou Conclusão | Therefore, Thus, Hence | Consequently, As a result, Accordingly, Thereby | Mostram o resultado matemático ou empírico decorrente |
| Adição ou Continuidade | Furthermore, Moreover, In addition | Besides, What is more, Along with | Agregam novas evidências para fortalecer o argumento |
| Condição ou Restrição | Provided that, Unless, As long as | In case, On condition that | Estabelecem premissas essenciais para a validade do teste |
| Exemplificação | For instance, For example | Namely, To illustrate, Such as | Introduzem aplicações concretas ou dados empíricos |

---

## 3. Análise de Padrões Frasais em Artigos de Ciência de Dados

Considere o seguinte trecho autêntico adaptado de literatura científica:
"Although deep learning architectures have demonstrated unprecedented accuracy in pipeline fault diagnostics, their opaque decision-making processes nevertheless hinder widespread regulatory adoption across critical offshore operations."

Desconstrução analítica:
- "Although" introduz uma concessão: as redes profundas possuem altíssima acurácia.
- "nevertheless" introduz a adversidade na oração principal: o caráter de caixa-preta (opaque) dificulta a aprovação regulatória em operações offshore.
- Pergunta típica da Cesgranrio: "Qual é o principal obstáculo para a adoção dos modelos em plataformas offshore?". Resposta direta por scanning: a opacidade dos processos de tomada de decisão, e não a acurácia dos modelos.`,
        keyTakeaways: [
          'Nunca tente traduzir o texto inteiro palavra por palavra na prova de inglês.',
          'Pratique Skimming para entender o tema geral e Scanning para responder cada questão objetiva.',
          'Conectores como However, Although e Whereas apontam exatamente onde estão as respostas dos itens interpretativos.',
          'Topic sentences (primeira frase de cada parágrafo) concentram 70 por cento do conteúdo semântico.'
        ],
        cesgranrioTraps: [
          'Confundir conectores de causa (Because, Since) com conectores de consequência (Thus, Therefore, Hence).',
          'Assinalar alternativas que traduzem termos isolados sem considerar a oração concessiva que os condiciona.'
        ],
        practiceQuestions: [
          {
            questionNumber: 1,
            statement: 'When solving a reading comprehension question from Cesgranrio that includes the instruction "According to paragraph 2, the primary advantage of predictive maintenance is...", the most efficient test-taking strategy is to:',
            options: [
              'A) Re-read the entire text from the first paragraph translating word by word.',
              'B) Use scanning to locate key terms like "predictive maintenance" and "advantage" specifically in paragraph 2.',
              'C) Ignore the text completely and pick the longest option.',
              'D) Look for the answer in the title of the article.',
              'E) Assume paragraph 2 is always irrelevant for technical topics.'
            ],
            correctLetter: 'B',
            explanation: 'A técnica de Scanning consiste em rastrear visualmente o parágrafo indicado em busca de palavras-chave da pergunta ("predictive maintenance", "advantage"), economizando tempo e evitando armadilhas de tradução mental exaustiva.',
            cesgranrioTip: 'Scanning = busca cirúrgica de palavras-chave no parágrafo citado.'
          },
          {
            questionNumber: 2,
            statement: 'In the sentence "Although the sensor array operated in extreme underwater pressure, it nevertheless transmitted accurate telemetry data", the connectors "Although" and "nevertheless" establish a relation of:',
            options: [
              'A) cause and effect',
              'B) concession and contrast',
              'C) addition and enumeration',
              'D) condition and hypothesis',
              'E) chronological sequence'
            ],
            correctLetter: 'B',
            explanation: '"Although" (embora/conquanto) e "nevertheless" (não obstante/ainda assim) estabelecem relação de concessão e contraste, indicando um obstáculo que não impediu o resultado favorável.',
            cesgranrioTip: 'Although / Even though / Despite / In spite of / However = Concessão e contraste.'
          },
          {
            questionNumber: 3,
            statement: 'In the sentence "The computational throughput was enhanced; hence, the real-time inference latency dropped significantly", the transition word "hence" is closest in meaning to:',
            options: [
              'A) whereas',
              'B) therefore',
              'C) nonetheless',
              'D) although',
              'E) however'
            ],
            correctLetter: 'B',
            explanation: '"Hence" é um conector de conclusão e consequência lógica, significando "por conseguinte", "portanto" ou "dessa forma", correspondendo perfeitamente a "therefore" ou "thus".',
            cesgranrioTip: 'Hence = Therefore = Thus = Consequently.'
          },
          {
            questionNumber: 4,
            statement: 'In technical literature, the transitional phrase "provided that" as in "The model guarantees convergence provided that the learning rate is strictly bounded" introduces a:',
            options: [
              'A) condition',
              'B) consequence',
              'C) chronological order',
              'D) contrast',
              'E) spatial location'
            ],
            correctLetter: 'A',
            explanation: '"Provided that" significa "contanto que" ou "desde que", introduzindo uma oração condicional que estabelece a premissa necessária para a garantia da oração principal.',
            cesgranrioTip: 'Provided that / As long as = Contanto que (Condição).'
          },
          {
            questionNumber: 5,
            statement: 'Consider the sentence: "While deep neural networks achieve superior benchmark scores, their computational overhead remains prohibitive for edge microcontrollers." The word "While" in this context functions as:',
            options: [
              'A) a temporal indicator denoting simultaneous events.',
              'B) a concessive or contrasting linker equivalent to "whereas" or "although".',
              'C) a causal conjunction indicating the origin of the scores.',
              'D) an intensifying adverb qualifying the word superior.',
              'E) a preposition introducing a physical location.'
            ],
            correctLetter: 'B',
            explanation: 'Embora "while" possa indicar tempo ("enquanto"), em textos técnicos acadêmicos é frequentemente utilizado com valor contrastivo ou concessivo ("ao passo que", "embora"), opondo os escores elevados ao alto custo computacional.',
            cesgranrioTip: 'While em textos técnicos frequentemente equivale a "ao passo que" ou "embora".'
          }
        ],
        transpetroApplication: 'Leitura de documentação técnica de bibliotecas de código aberto (PyTorch, TensorFlow, Apache Arrow) e artigos de congressos internacionais de engenharia.'
      },
      {
        id: 'cap-en-02',
        chapterNumber: 2,
        title: 'Gramática Contextual: Modais, Voz Passiva e Falsos Cognatos de TI',
        subtitle: 'Os falsos amigos de vocabulário e a expressão da certeza científica em inglês',
        readTimeEstimate: '45 min',
        summary: 'Identificação de falsos cognatos traiçoeiros frequentes em computação (actual, eventually, comprehensive, intend, pretend). Análise dos verbos modais e seus graus epistêmicos de probabilidade e obrigação (must, should, may, might, can, could). A estrutura da voz passiva como padrão em artigos científicos.',
        contentMarkdown: `## 1. Glossário dos Falsos Cognatos Decisivos em Tecnologia

Os falsos cognatos (false friends) são termos que possuem grafia semelhante ao português, mas significado completamente divergente. A Cesgranrio explora essas palavras para criar pegadinhas em alternativas de tradução:

| Termo em Inglês | O que PARECE em Português | O que REALMENTE SIGNIFICA | Exemplo Técnico em Contexto |
|---|---|---|---|
| Actually | Atualmente | Na verdade, De fato, Realmente | The algorithm actually failed under heavy load. (O algoritmo na verdade falhou...). |
| Currently | Corretamente | Atualmente, No momento presente | The system is currently monitoring 50 offshore platforms. |
| Eventually | Eventualmente (às vezes) | No final das contas, Com o tempo | The training loss eventually plateaued after 100 epochs. |
| Comprehensive | Compreensivo (tolerante) | Abrangente, Amplo, Completo | A comprehensive evaluation of telemetry data was conducted. |
| Intend | Entender | Pretender, Ter intenção de | The data engineering team intends to migrate to Apache Iceberg. |
| Pretend | Pretender | Fingir, Simular | The script does not pretend to simulate real-world fluid dynamics. |
| Notice | Notícia | Notar, Perceber, Aviso prévio | The sensor failed to notice the pressure drop. |
| Large | Largo | Grande, Extenso | A large amount of streaming logs is processed daily. |
| Wide | Vida | Largo, Amplo em largura | The pipeline requires a wide bandwidth for raw video streams. |
| Resume | Resumir | Retomar, Reiniciar | The pipeline execution resumed after the network glitch. |
| Summarize | Somar | Resumir, Sintetizar | The table summarizes the principal hyperparameters. |

---

## 2. A Voz Passiva em Artigos Científicos

Em publicações científicas de computação e engenharia, a voz passiva é a forma padrão de escrita, pois confere impessoalidade e objetividade ao método experimental. O foco recai sobre o processo ou o resultado, e não sobre quem realizou o experimento:

- Estrutura Canônica: Objeto Paciente + Verbo TO BE (no tempo adequado) + Particípio Passado do Verbo Principal (+ by + Agente da Passiva opcional).
- Exemplo Ativo: The engineering team deployed a federated learning architecture.
- Exemplo Passivo: A federated learning architecture was deployed by the engineering team.
- Perguntas da Cesgranrio: A banca frequentemente pede a identificação do agente ou o sentido da ação expressa por sentenças na voz passiva com supressão do agente (agentless passive), como em: "The pipeline parameters were optimized to minimize latency." (Quem otimizou? A equipe técnica ou o algoritmo, subentendido pelo contexto).

---

## 3. Verbos Modais e Graus Epistêmicos de Probabilidade

Os verbos modais qualificam o grau de certeza, probabilidade, permissão ou dever ético/operacional de uma ação:

| Verbo Modal | Valor Semântico Primário | Grau de Certeza / Força | Exemplo no Setor de Petróleo e Dados |
|---|---|---|---|
| Must | Dedução lógica quase certa ou Obrigação severa | 95 a 100 por cento (Certeza / Obrigação) | The pressure sensor reads zero; the pipeline must be depressurized. |
| Should / Ought to | Recomendação, expectativa razoável ou dever moral | 70 a 80 por cento (Expectativa / Conselho) | Hyperparameters should be cross-validated to avoid overfitting. |
| May | Possibilidade plausível ou Permissão formal | 50 por cento (Possibilidade factual) | Excessive vibration may indicate structural fatigue in the drill. |
| Might / Could | Possibilidade remota ou Capacidade condicional | 20 a 30 por cento (Possibilidade remota) | Unmonitored anomalies might cause unexpected shutdowns. |
| Can | Habilidade, capacidade técnica ou possibilidade genérica | Capacidade operacional inerente | The GPU cluster can train the model in under two hours. |`,
        keyTakeaways: [
          'Actually significa na verdade; currently significa atualmente; eventually significa com o tempo ou finalmente.',
          'Comprehensive significa abrangente e completo, e não compreensivo.',
          'A voz passiva é a estrutura padrão em artigos de IA para conferir objetividade científica aos procedimentos.',
          'Must indica certeza lógica ou obrigação; should indica recomendação; may e might indicam possibilidade.'
        ],
        cesgranrioTraps: [
          'Traduzir "actually" por "atualmente" em questões de múltipla escolha.',
          'Traduzir "eventually" por "eventualmente" (como sinônimo de ocasionalmente), quando o termo denota desfecho final.'
        ],
        practiceQuestions: [
          {
            questionNumber: 1,
            statement: 'In the scientific passage "Although initial benchmarks looked promising, the distributed pipeline actually consumed twice as much memory as expected", the word "actually" conveys the meaning of:',
            options: [
              'A) at the present moment',
              'B) in reality / in fact',
              'C) periodically',
              'D) potentially',
              'E) deliberately'
            ],
            correctLetter: 'B',
            explanation: '"Actually" é um falso cognato clássico que significa "na verdade", "de fato" ou "em realidade", não guardando relação com "atualmente" (que se traduz como "currently" ou "nowadays").',
            cesgranrioTip: 'Actually = in fact / in reality. Currently = at present.'
          },
          {
            questionNumber: 2,
            statement: 'Choose the sentence in which the word "eventually" is used with its correct standard English meaning:',
            options: [
              'A) We go to the beach eventually, only when the weather is warm.',
              'B) After iterative optimization across several epochs, the loss function eventually stabilized.',
              'C) The sensor operates eventually, about twice per month.',
              'D) Eventually actions are prohibited during emergency drills.',
              'E) He was hired on an eventually basis without permanent contract.'
            ],
            correctLetter: 'B',
            explanation: '"Eventually" significa "com o tempo", "no final das contas" ou "por fim" (indicando o resultado de um processo temporal prolongado), e não "ocasionalmente".',
            cesgranrioTip: 'Eventually = In the end / finally (após um período de tempo).'
          },
          {
            questionNumber: 3,
            statement: 'In the technical sentence "To maintain system integrity, safety protocols must be executed prior to any underwater valve manipulation", the modal auxiliary "must" expresses:',
            options: [
              'A) a weak suggestion or polite request',
              'B) a strict necessity or obligation',
              'C) an improbable hypothetical event',
              'D) a past habitual action',
              'E) a physical ability to perform manual labor'
            ],
            correctLetter: 'B',
            explanation: 'O modal "must" expressa obrigação inegociável, estrita necessidade ou dever mandatório, sendo essencial em protocolos de segurança industrial e normas regulatórias.',
            cesgranrioTip: 'Must = Obrigação estrita ou dedução lógica inequívoca.'
          },
          {
            questionNumber: 4,
            statement: 'In the phrase "A comprehensive audit of the streaming infrastructure was conducted by external consultants", the adjective "comprehensive" can be accurately replaced by:',
            options: [
              'A) compassionate',
              'B) thorough and complete',
              'C) lenient',
              'D) superficial',
              'E) sympathetic'
            ],
            correctLetter: 'B',
            explanation: '"Comprehensive" é falso amigo que significa abrangente, exaustivo, profundo e completo, traduzindo-se fielmente por "thorough and complete".',
            cesgranrioTip: 'Comprehensive = Complete / Thorough (abrangente, completo).'
          },
          {
            questionNumber: 5,
            statement: 'Consider the active sentence: "Autonomous underwater vehicles gathered real-time salinity data across the maritime basin." Which option represents the correct passive voice transformation?',
            options: [
              'A) Real-time salinity data was gathered by autonomous underwater vehicles across the maritime basin.',
              'B) Real-time salinity data will gather autonomous underwater vehicles across the maritime basin.',
              'C) Real-time salinity data had been gathering autonomous underwater vehicles.',
              'D) Real-time salinity data is gathering by autonomous underwater vehicles.',
              'E) Autonomous underwater vehicles were gathered by real-time salinity data.'
            ],
            correctLetter: 'A',
            explanation: 'Na voz passiva no pretérito simples (simple past), o objeto "Real-time salinity data" torna-se sujeito paciente, acompanhado do verbo to be no passado ("was") e o particípio passado "gathered", com o agente da passiva introduzido por "by".',
            cesgranrioTip: 'Simple Past passivo = was/were + past participle.'
          }
        ],
        transpetroApplication: 'Compreensão de relatórios de auditoria internacional de segurança cibernética e manuais de conformidade de plataformas marinhas de exploração.'
      }
    ],
    examChecklist: [
      'Executar Skimming nos primeiros 90 segundos para capturar a tese central e a atitude do autor.',
      'Executar Scanning focado nos parágrafos citados nos enunciados das questões.',
      'Memorizar a lista de falsos cognatos: actually (de fato), eventually (no fim das contas), comprehensive (completo), intend (pretender).',
      'Identificar o grau epistêmico dos modais: must (obrigação/certeza), should (recomendação), may/might (possibilidade).',
      'Dominar o valor dos conectores: however/although/whereas (concessão/contraste), thus/therefore/hence (consequência).'
    ],
    practiceQuestions: []
  }
];
