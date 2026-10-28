import { Question, OfficialExam, AudioLesson } from '../types';

export const SIMULADO_01_REVISAO_PRA_TORAR_EXAM: OfficialExam = {
  id: 'simulado-01-revisao-pra-torar',
  title: 'Simulado 01 – Revisão Pra Torar (Ciência de Dados Petrobras / Transpetro)',
  institution: 'Petrobras / Transpetro – Curso Revisão Pra Torar',
  board: 'CESGRANRIO (Prof. Thiago Cavalcanti & Equipe)',
  year: 2024,
  totalItems: 70,
  description: 'Simulado intensivo inédito e aprofundado do projeto "Revisão Pra Torar", com questões de alto nível técnico e perfil idêntico ao da Banca Cesgranrio para a ênfase de Ciência de Dados.',
  items: [
    {
      itemNumber: 1,
      statement: 'Na preparação de dados para modelos lineares e redes neurais, considere o tratamento de variáveis numéricas contínuas com presença de outliers severos. A padronização via Z-Score clássico calcula (x - média) / desvio_padrão. Em contrapartida, o RobustScaler utiliza a mediana e o intervalo interquartil (IQR). Em datasets com presença de outliers extremos, o RobustScaler é superior ao Z-Score porque a média e o desvio padrão são métricas altamente sensíveis a valores discrepantes, deslocando o centro e a escala da distribuição.',
      officialAnswer: 'C',
      discipline: 'Machine Learning',
      subtopic: 'Pré-Processamento e Escalonamento Robusto',
      block: 'Bloco I',
      explanation: 'Gabarito Oficial: CERTO (C). O Z-Score tradicional é diretamente afetado por outliers, pois tanto a média aritmética quanto o desvio padrão (que eleva desvios ao quadrado) sofrem distorção severa na presença de caudas pesadas. O RobustScaler calcula (x - Q2) / (Q3 - Q1), baseando-se na mediana e no IQR (medidas de posição não paramétricas imunes a valores extremos).',
      cesgranrioTrap: 'A Cesgranrio costuma contrastar StandardScaler (sensível a outliers), MinMaxScaler (comprime toda a distribuição ao intervalo [0, 1] em função dos valores extremos) e RobustScaler (robusto).'
    },
    {
      itemNumber: 2,
      statement: 'Considere a regularização L1 (Lasso) e L2 (Ridge) aplicadas à regressão linear. A penalidade Lasso adiciona a norma L1 dos coeficientes à função de custo, enquanto a Ridge adiciona o quadrado da norma L2. Devido ao formato geométrico da restrição de contorno da norma L1 (um poliedro com vértices sobre os eixos coordenados), a regularização Lasso frequentemente zera coeficientes de variáveis irrelevantes ou redundantes, atuando como um método embutido (embedded) de seleção de atributos (feature selection).',
      officialAnswer: 'C',
      discipline: 'Machine Learning',
      subtopic: 'Regularização L1 (Lasso) vs L2 (Ridge)',
      block: 'Bloco I',
      explanation: 'Gabarito Oficial: CERTO (C). A restrição L1 possui "cantos" pontiagudos nos eixos cartesianos (formato de losango em 2D). As curvas de nível elípticas do erro quadrático quase sempre tocam a região de viabilidade em um desses vértices, forçando um ou mais pesos w_j exatamente a zero. A penalidade L2 (disco circular) aproxima os coeficientes de zero mas não os anula exatamente.',
      cesgranrioTrap: 'Lasso seleciona features zerando coeficientes; Ridge apenas encolhe (shrinkage) os coeficientes sem zerá-los. ElasticNet combina ambos os termos alfa*L1 + (1-alfa)*L2.'
    },
    {
      itemNumber: 3,
      statement: 'Ao ajustar um modelo Random Forest para classificação binária, o aumento irrestrito do número de árvores (n_estimators) leva inevitavelmente a um sobreajuste (overfitting) catastrófico do modelo no conjunto de teste.',
      officialAnswer: 'E',
      discipline: 'Machine Learning',
      subtopic: 'Ensembles Bagging e Random Forest',
      block: 'Bloco I',
      explanation: 'Gabarito Oficial: ERRADO (E). Diferente do Gradient Boosting (onde adicionar muitas árvores pode sim causar overfitting por memorização de resíduos), no Random Forest (Bagging), aumentar o número de estimadores não gera overfitting. Pela Lei dos Grandes Números de Breiman, a variância do ensemble converge assintoticamente para um limite inferior estável conforme mais árvores não correlacionadas são agregadas.',
      cesgranrioTrap: 'Pegadinha clássica da Cesgranrio: em Random Forest, adicionar árvores reduz variância até estabilizar, sem causar overfitting; em Gradient Boosting / AdaBoost, árvores excessivas causam overfitting.'
    },
    {
      itemNumber: 4,
      statement: 'Na avaliação de classificadores em cenários com classes altamente desbalanceadas (ex.: detecção de fraudes com 0,1% de casos positivos), a métrica de Acurácia é enganosa. Nesse contexto, a curva Precision-Recall (PR-AUC) é preferível à curva ROC-AUC, porque a curva ROC pode transmitir uma impressão excessivamente otimista devido ao grande volume de Verdadeiros Negativos que mantém a taxa de Falsos Positivos (FPR) artificialmente baixa.',
      officialAnswer: 'C',
      discipline: 'Machine Learning',
      subtopic: 'Avaliação de Desempenho e Curvas PR vs ROC',
      block: 'Bloco I',
      explanation: 'Gabarito Oficial: CERTO (C). A Taxa de Falsos Positivos (FPR = FP / (FP + TN)) possui o número massivo de TNs no denominador, fazendo com que a FPR permaneça ínfima mesmo quando o modelo comete centenas de Falsos Positivos. A Curva PR foca exclusivamente em Precision (TP / (TP + FP)) e Recall (TP / (TP + FN)), ignorando TNs e expondo com precisão a degradação do modelo na classe rara.',
      cesgranrioTrap: 'Quando a classe minoritária for de interesse crítico e muito rara, priorize PR-AUC e F-beta score em vez da acurácia global e ROC-AUC ingênua.'
    },
    {
      itemNumber: 5,
      statement: 'No algoritmo K-Means, a escolha aleatória inicial dos centroides pode resultar em convergência para mínimos locais subótimos. O método K-Means++ resolve esse problema escolhendo o primeiro centroide uniformemente ao acaso e selecionando cada centroide subsequente com probabilidade proporcional ao quadrado da distância mínima ao centroide mais próximo já escolhido.',
      officialAnswer: 'C',
      discipline: 'Aprendizado Não Supervisionado',
      subtopic: 'Algoritmo K-Means e Inicialização K-Means++',
      block: 'Bloco II',
      explanation: 'Gabarito Oficial: CERTO (C). A heurística do K-Means++ penaliza a proximidade entre os centroides iniciais, garantindo que os novos centros sejam distribuídos de forma mais dispersa e balanceada pelo espaço amostral. Isso acelera a convergência e evita que múltiplos centroides fiquem presos no mesmo cluster denso.',
      cesgranrioTrap: 'K-Means++ é o padrão no Scikit-Learn (init="k-means++") e reduz drasticamente o número de iterações necessárias para convergir à inércia mínima.'
    },
    {
      itemNumber: 6,
      statement: 'O algoritmo de clusterização DBSCAN (Density-Based Spatial Clustering of Applications with Noise) requer como entrada a prévia definição do número K de agrupamentos a serem formados no conjunto de dados.',
      officialAnswer: 'E',
      discipline: 'Aprendizado Não Supervisionado',
      subtopic: 'DBSCAN e Agrupamento Baseado em Densidade',
      block: 'Bloco II',
      explanation: 'Gabarito Oficial: ERRADO (E). O DBSCAN não exige o número K de clusters. Ele depende de dois hiperparâmetros fundamentais: eps (raio da vizinhança épsilon) e min_samples (número mínimo de pontos para formar uma região densa). Ele identifica automaticamente o número de clusters de geometria arbitrária e rotula pontos em regiões de baixa densidade como ruído (outliers, label -1).',
      cesgranrioTrap: 'K-Means exige K previamente; DBSCAN NÃO exige K e detecta ruído; Agrupamento Hierárquico permite cortar o dendrograma no nível desejado.'
    },
    {
      itemNumber: 7,
      statement: 'Na Análise de Componentes Principais (PCA), os componentes principais correspondem aos autovetores da matriz de covariância (ou correlação) dos dados, e a proporção da variância total explicada por cada componente é dada pelo seu respectivo autovalor dividido pela soma de todos os autovalores.',
      officialAnswer: 'C',
      discipline: 'Aprendizado Não Supervisionado',
      subtopic: 'PCA e Decomposição Espectral',
      block: 'Bloco II',
      explanation: 'Gabarito Oficial: CERTO (C). O PCA busca direções de máxima variância ortogonais entre si. Essas direções ótimas são os autovetores da matriz de covariância dos dados centralizados. A magnitude da variância retida na direção do i-ésimo componente é exatamente igual ao autovalor lambda_i correspondente. A variância explicada acumulada é a soma acumulada dos autovalores dividida pelo traço da matriz de covariância.',
      cesgranrioTrap: 'Os componentes principais são ortogonais entre si (correlação zero entre as novas variáveis) e dispostos em ordem decrescente de seus autovalores.'
    },
    {
      itemNumber: 8,
      statement: 'Em redes neurais profundas, a função de ativação ReLU (Rectified Linear Unit), definida por f(x) = max(0, x), mitiga o problema do desaparecimento do gradiente (vanishing gradient) nas camadas ocultas profundas porque sua derivada é constante e igual a 1 para qualquer entrada positiva, diferente da função Sigmoide cuja derivada máxima é 0,25.',
      officialAnswer: 'C',
      discipline: 'Deep Learning',
      subtopic: 'Funções de Ativação e Vanishing Gradient',
      block: 'Bloco II',
      explanation: 'Gabarito Oficial: CERTO (C). Quando calculamos a retropropagação (backpropagation) por regra da cadeia, multiplicamos as derivadas parciais das ativações. Na Sigmoide e Tanh, as derivadas são inferiores a 1 (máx 0.25 na Sigmoide e 1.0 no ponto zero na Tanh, saturando rapidamente). Em muitas camadas, esse produto exponencialmente converge a zero (vanishing gradient). Com a ReLU, para x > 0 a derivada é exatamente 1.0, transmitindo o sinal de gradiente sem atenuação.',
      cesgranrioTrap: 'Cuidado com o "Dying ReLU": se neurônios caírem em x < 0 com derivada 0, eles podem parar de aprender. Variações como Leaky ReLU (f(x) = max(alpha*x, x)) corrigem isso.'
    },
    {
      itemNumber: 9,
      statement: 'Na análise de Séries Temporais pelo método de Box-Jenkins, uma série temporal é considerada fracamente estacionária (estacionária em sentido amplo) quando sua média e sua autocovariância são estritamente variantes ao longo do tempo.',
      officialAnswer: 'E',
      discipline: 'Séries Temporais',
      subtopic: 'Estacionariedade e Metodologia Box-Jenkins',
      block: 'Bloco II',
      explanation: 'Gabarito Oficial: ERRADO (E). Uma série temporal é fracamente estacionária quando: 1) Sua média é constante no tempo (E[Y_t] = mu); 2) Sua variância é constante e finita (Var(Y_t) = sigma²); 3) Sua autocovariância entre Y_t e Y_{t-k} depende exclusivamente do deslocamento temporal k (lag), e NÃO do instante específico t.',
      cesgranrioTrap: 'Estacionariedade exige média CONSTANTE, variância CONSTANTE e autocovariância dependente apenas do lag k, e não do tempo t. A questão afirmou o oposto (estritamente variantes).'
    },
    {
      itemNumber: 10,
      statement: 'Em processamento distribuído com Apache Spark, as operações aplicadas a um RDD (Resilient Distributed Dataset) dividem-se em Transformações e Ações. As transformações (como map, filter, groupBy) são avaliadas de modo preguiçoso (lazy evaluation), sendo computadas apenas quando uma Ação (como count, collect, take, saveAsTextFile) é invocada pelo programa.',
      officialAnswer: 'C',
      discipline: 'Engenharia de Dados & Big Data',
      subtopic: 'Apache Spark: RDDs, Transformações e Ações',
      block: 'Bloco III',
      explanation: 'Gabarito Oficial: CERTO (C). O Apache Spark constrói um Grafo Acíclico Dirigido (DAG) de dependências conforme as transformações são declaradas, sem executá-las imediatamente. Somente quando uma ação (como count ou collect) exige o resultado materializado, o Catalyst Optimizer e o DAG Scheduler otimizam os estágios de execução (stages) e disparam as tarefas (tasks) nos executores.',
      cesgranrioTrap: 'A Cesgranrio testa com frequência a distinção: map/filter/flatMap são transformações (lazy); count/collect/first/reduce/take são ações (triggers).'
    },
    {
      itemNumber: 11,
      statement: 'Considere o sistema de arquivos distribuído Hadoop HDFS. O NameNode armazena em disco todos os dados brutos e blocos dos arquivos de dados, enquanto os DataNodes são responsáveis exclusivamente pelo controle dos metadados e pelo mapeamento dos diretórios da árvore de arquivos.',
      officialAnswer: 'E',
      discipline: 'Engenharia de Dados & Big Data',
      subtopic: 'Arquitetura Hadoop HDFS: NameNode vs DataNode',
      block: 'Bloco III',
      explanation: 'Gabarito Oficial: ERRADO (E). Os papéis foram invertidos: O NameNode gerencia o namespace do sistema de arquivos e mantém em memória RAM (e fsimage/edits) os metadados (árvore de diretórios, permissões e localização dos blocos nos DataNodes). Os DataNodes são os nós escravos que efetivamente armazenam os blocos de dados físicos no disco local.',
      cesgranrioTrap: 'NameNode = Mestre dos Metadados em RAM. DataNode = Armazenamento físico dos blocos particionados em disco (tamanho padrão de bloco de 128MB).'
    },
    {
      itemNumber: 12,
      statement: 'Na linguagem SQL padrão ANSI, considere as funções analíticas de janela (Window Functions). A função DENSE_RANK() difere da função RANK() porque, na ocorrência de valores empatados na ordenação, a DENSE_RANK() não pula números na sequência das posições seguintes, atribuindo números consecutivos inteiros, enquanto a RANK() introduz lacunas (gaps) na numeração.',
      officialAnswer: 'C',
      discipline: 'Bancos de Dados & SQL',
      subtopic: 'Funções de Janela SQL: RANK vs DENSE_RANK',
      block: 'Bloco III',
      explanation: 'Gabarito Oficial: CERTO (C). Exemplo com empates nos dois primeiros colocados: ROW_NUMBER atribui 1, 2, 3; RANK atribui 1, 1, 3 (pula o número 2 devido ao empate no 1º lugar); DENSE_RANK atribui 1, 1, 2 (mantém a numeração densa e sequencial sem lacunas).',
      cesgranrioTrap: 'A Cesgranrio ama cobrar a diferença exata entre ROW_NUMBER() (único por linha), RANK() (com lacunas após empates) e DENSE_RANK() (sem lacunas).'
    },
    {
      itemNumber: 13,
      statement: 'Em bancos de dados relacionais com transações concorrentes, o nível de isolamento READ COMMITTED previne o problema de Leitura Suja (Dirty Read), mas ainda permite a ocorrência de Leituras Não Repetíveis (Non-Repeatable Reads) e Leituras Fantasma (Phantom Reads).',
      officialAnswer: 'C',
      discipline: 'Bancos de Dados & SQL',
      subtopic: 'Transações ACID e Níveis de Isolamento ANSI/ISO',
      block: 'Bloco III',
      explanation: 'Gabarito Oficial: CERTO (C). A Leitura Suja (ler dados não commitados por outra transação que pode sofrer rollback) é evitada no READ COMMITTED. Entretanto, se uma transação reler a mesma linha após outro commit concorrente, o valor poderá ter sido alterado (Non-Repeatable Read). Para evitar Non-Repeatable Read exige-se REPEATABLE READ; para evitar Fantasmas exige-se SERIALIZABLE.',
      cesgranrioTrap: 'Tabela clássica de isolamento da Cesgranrio: Read Uncommitted (permite Dirty Read); Read Committed (previne Dirty Read); Repeatable Read (previne Dirty Read e Non-Repeatable Read); Serializable (previne todas as anomalias).'
    },
    {
      itemNumber: 14,
      statement: 'Na cultura de DevOps e MLOps, o conceito de "Data Drift" (deriva de dados) refere-se à alteração da relação funcional entre as features de entrada e a variável alvo P(Y|X), enquanto a distribuição marginal dos dados de entrada P(X) permanece estritamente invariável.',
      officialAnswer: 'E',
      discipline: 'MLOps & Governança',
      subtopic: 'Data Drift vs Concept Drift',
      block: 'Bloco III',
      explanation: 'Gabarito Oficial: ERRADO (E). O conceito descrito refere-se ao Concept Drift (deriva de conceito), no qual a relação P(Y|X) muda (o que era fraude antes agora tem outro comportamento do consumidor). Data Drift (também chamado de Covariate Shift) ocorre quando a distribuição das entradas P(X) se altera ao longo do tempo, mesmo que a função teórica P(Y|X) não tenha mudado.',
      cesgranrioTrap: 'Data Drift = P(X) muda (novos sensores, perfis etários, sazonalidade). Concept Drift = P(Y|X) muda (o próprio significado de fraude ou falha mecânica mudou no mundo real).'
    },
    {
      itemNumber: 15,
      statement: 'No ecossistema de controle de versão com Git, o comando "git rebase" reescreve o histórico de commits ao replantar os commits da branch atual no topo da branch de destino de forma linear, eliminando a criação de um commit extra de mesclagem (merge commit).',
      officialAnswer: 'C',
      discipline: 'DevOps & Git',
      subtopic: 'Git: Merge vs Rebase',
      block: 'Bloco III',
      explanation: 'Gabarito Oficial: CERTO (C). O "git merge" preserva o histórico exato original criando um "merge commit" com dois nós pais (histórico em losango). O "git rebase" recalcula os patches dos commits locais e os reaplica sequencialmente sobre a ponta da branch alvo, produzindo um histórico estritamente linear e limpo, modificando os hashes SHA-1 dos commits replantados.',
      cesgranrioTrap: 'Nunca faça rebase em branches públicas/compartilhadas (como main), pois reescrever o histórico compartilhado quebra os repositórios dos outros colaboradores.'
    }
  ]
};

export const REVISAO_PRA_TORAR_QUESTIONS_FOR_SIMULATOR: Question[] = [
  // Multi-choice Cesgranrio format from Simulado 01 Revisão Pra Torar
  {
    id: 'rpt-01-ml-metrics',
    topic: 'Machine Learning',
    subtopic: 'Métricas de Avaliação para Classes Desbalanceadas',
    difficulty: 'Difícil',
    format: 'multipla_escolha',
    statement: `[SIMULADO 01 - REVISÃO PRA TORAR - PROF. THIAGO CAVALCANTI]

Em um projeto de manutenção preditiva em dutos da Transpetro, treina-se um modelo para prever vazamento de nafta (classe positiva = 1), cuja ocorrência histórica é de apenas 0,2% do total de medições diárias (extremo desbalanceamento). 
A equipe de engenharia estipulou que o custo de não detectar um vazamento (Falso Negativo) acarreta risco ambiental severo, sendo 10 vezes mais crítico do que inspecionar um alarme falso (Falso Positivo).

Diante dessa premissa operacional e da distribuição das classes, qual métrica composta deve ser utilizada como critério primordial para otimizar o limiar de decisão (threshold) do classificador?`,
    options: [
      { letter: 'A', text: 'Acurácia Balanceada pura, pois ela calcula a média aritmética entre a sensibilidade e o valor preditivo positivo.' },
      { letter: 'B', text: 'F-beta score com beta = 2 (ou superior), pois ele pondera o Recall (sensibilidade) com peso superior ao da Precisão.' },
      { letter: 'C', text: 'F-beta score com beta = 0.5, pois ele penaliza fortemente a ocorrência de Falsos Negativos em detrimento da Precisão.' },
      { letter: 'D', text: 'Área sob a curva ROC (ROC-AUC), pois a ROC não sofre influência de desbalanceamento e ignora a taxa de verdadeiros negativos.' },
      { letter: 'E', text: 'Coeficiente de Silhueta Médio ponderado pela variância explicada das features de vazamento.' }
    ],
    correctAnswer: 'B',
    explanationCorrect: `Na fórmula do F-beta Score:
F_beta = (1 + beta^2) * (Precision * Recall) / ((beta^2 * Precision) + Recall)
Quando beta > 1 (por exemplo, F2-score, beta = 2), o Recall recebe peso beta² = 4 vezes maior que a Precisão. Como o custo do Falso Negativo (vazamento não detectado) é muito maior que o Falso Positivo, o modelo deve priorizar o Recall. Logo, o F2-Score é a métrica ideal.`,
    distractorAnalysis: [
      { letter: 'A', whyWrong: 'Acurácia balanceada é a média entre Sensibilidade e Especificidade (TNR), não envolvendo o valor preditivo positivo.' },
      { letter: 'C', whyWrong: 'F-beta com beta = 0.5 prioriza a Precisão em relação ao Recall (usado quando o Falso Positivo é muito mais custoso).' },
      { letter: 'D', whyWrong: 'A curva ROC-AUC tradicional é sensível ao grande volume de TNs no denominador do FPR, gerando uma avaliação enganosamente otimista.' },
      { letter: 'E', whyWrong: 'Coeficiente de Silhueta é métrica de clustering (aprendizado não supervisionado), não de classificação supervisionada.' }
    ],
    cesgranrioTip: 'A Cesgranrio costuma cobrar: F1-score (beta=1, equilíbrio harmônico); F2-score (beta=2, prioriza Recall / minimizar Falsos Negativos); F0.5-score (beta=0.5, prioriza Precisão / minimizar Falsos Positivos).',
    officialExam: {
      examName: 'Simulado 01 - Revisão Pra Torar',
      board: 'CESGRANRIO',
      year: 2024,
      itemNumber: 1,
      block: 'Bloco I'
    }
  },
  {
    id: 'rpt-02-regularization',
    topic: 'Machine Learning',
    subtopic: 'Regularização e Seleção de Atributos',
    difficulty: 'Difícil',
    format: 'multipla_escolha',
    statement: `[SIMULADO 01 - REVISÃO PRA TORAR - PROF. THIAGO CAVALCANTI]

Considere a formulação matemática de modelos de regressão linear regularizada. A perda mínima em MQO tradicional é dada por ||y - Xw||². 
Ao aplicar a regularização ElasticNet com hiperparâmetros alpha (peso total da penalidade) e l1_ratio (proporção relativa entre as normas L1 e L2):

Qual é a consequência prática de fixar o hiperparâmetro l1_ratio = 1.0 em comparação com l1_ratio = 0.0?`,
    options: [
      { letter: 'A', text: 'Com l1_ratio = 1.0, o modelo equivale à Ridge Regression, encolhendo os pesos de forma suave sem anular nenhum coeficiente.' },
      { letter: 'B', text: 'Com l1_ratio = 1.0, o modelo equivale à regressão Lasso, permitindo que coeficientes w_j atinjam exatamente o valor zero e gerando esparsidade.' },
      { letter: 'C', text: 'Com l1_ratio = 1.0, os autovalores da matriz de covariância são forçados a zero, tornando a inversão da matriz impossível.' },
      { letter: 'D', text: 'Com l1_ratio = 0.0, o modelo anula todas as features colineares, selecionando arbitrariamente apenas uma variável de cada par correlacionado.' },
      { letter: 'E', text: 'Com l1_ratio = 0.0, a função de perda torna-se não convexa, impedindo a obtenção do mínimo global pelo algoritmo de descida de gradiente.' }
    ],
    correctAnswer: 'B',
    explanationCorrect: `Na implementação padrão do ElasticNet (como no Scikit-Learn):
Penalidade = alpha * [ l1_ratio * ||w||_1 + 0.5 * (1 - l1_ratio) * ||w||_2^2 ]
- Quando l1_ratio = 1.0, o termo L2 é anulado e temos puramente a Regressão Lasso (L1 puro), que induz soluções esparsas (seleção de features zerando pesos).
- Quando l1_ratio = 0.0, o termo L1 é anulado e temos puramente a Regressão Ridge (L2 puro), que encolhe pesos mas não os anula.`,
    distractorAnalysis: [
      { letter: 'A', whyWrong: 'l1_ratio = 1.0 corresponde ao Lasso (L1), não ao Ridge.' },
      { letter: 'C', whyWrong: 'Lasso não impede a convergência da matriz de covariância; ele impõe regularização convexa.' },
      { letter: 'D', whyWrong: 'É o Lasso puro que seleciona arbitrariamente uma variável em multicolinearidade; o Ridge (l1_ratio = 0) divide os pesos entre elas.' },
      { letter: 'E', whyWrong: 'A função de perda do Ridge (l1_ratio = 0) é estritamente convexa e possui solução analítica fechada.' }
    ],
    cesgranrioTip: 'Memorize: l1_ratio = 1 é Lasso (esparsidade, zera pesos, vértices nos eixos). l1_ratio = 0 é Ridge (disco suave, l2, não zera pesos).',
    officialExam: {
      examName: 'Simulado 01 - Revisão Pra Torar',
      board: 'CESGRANRIO',
      year: 2024,
      itemNumber: 2,
      block: 'Bloco I'
    }
  },
  {
    id: 'rpt-03-spark-dag',
    topic: 'Engenharia de Dados & Big Data',
    subtopic: 'Apache Spark: Shuffle, Particionamento e Dependências',
    difficulty: 'Muito Difícil',
    format: 'multipla_escolha',
    statement: `[SIMULADO 01 - REVISÃO PRA TORAR - PROF. THIAGO CAVALCANTI]

No Apache Spark, o DAGScheduler divide um job em múltiplos estágios (Stages). A fronteira de divisão entre um estágio e o próximo é demarcada obrigatoriamente por operações que demandam redistribuição física de dados pela rede entre os nós executores (Shuffle).

Dentre as operações listadas abaixo em um RDD/DataFrame do Spark, qual é uma dependência estreita (Narrow Dependency) que NÃO provoca Shuffle e, portanto, é executada dentro do mesmo Stage sem tráfego de rede?`,
    options: [
      { letter: 'A', text: 'groupByKey()' },
      { letter: 'B', text: 'reduceByKey()' },
      { letter: 'C', text: 'mapPartitions()' },
      { letter: 'D', text: 'distinct()' },
      { letter: 'E', text: 'repartition(200)' }
    ],
    correctAnswer: 'C',
    explanationCorrect: `No Apache Spark:
- Dependências Estreitas (Narrow Dependencies): Cada partição do RDD pai é utilizada por no máximo uma partição do RDD filho. Não requer movimentação de dados pela rede (shuffle). Exemplos: map(), filter(), mapPartitions(), flatMap().
- Dependências Amplas (Wide Dependencies): Múltiplas partições filhas dependem de dados distribuídos em várias partições pais, exigindo o processo de Shuffle (escrita em disco e transmissão pela rede). Exemplos: groupByKey(), reduceByKey(), distinct(), repartition(), join().`,
    distractorAnalysis: [
      { letter: 'A', whyWrong: 'groupByKey exige reunir todas as chaves iguais no mesmo nó, gerando shuffle massivo.' },
      { letter: 'B', whyWrong: 'reduceByKey realiza agregação local no mapper mas ainda exige shuffle para consolidar as partições.' },
      { letter: 'D', whyWrong: 'distinct exige comparar elementos entre todas as partições do cluster, forçando shuffle.' },
      { letter: 'E', whyWrong: 'repartition redistribui uniformemente os dados por hash em novas partições, disparando shuffle completo.' }
    ],
    cesgranrioTip: 'Cesgranrio adora perguntar: Narrow vs Wide. Narrow = sem shuffle (map, filter, union). Wide = com shuffle (groupByKey, reduceByKey, join, distinct, repartition).',
    officialExam: {
      examName: 'Simulado 01 - Revisão Pra Torar',
      board: 'CESGRANRIO',
      year: 2024,
      itemNumber: 3,
      block: 'Bloco III'
    }
  },
  {
    id: 'rpt-04-sql-window',
    topic: 'Bancos de Dados & SQL',
    subtopic: 'SQL Avançado: Window Functions e Paginação Analítica',
    difficulty: 'Médio',
    format: 'multipla_escolha',
    statement: `[SIMULADO 01 - REVISÃO PRA TORAR - PROF. THIAGO CAVALCANTI]

Considere uma tabela de telemetria "leituras_pressao" com colunas (sensor_id, data_hora, valor_psi). Deseja-se calcular, para cada registro de cada sensor, a diferença de pressão em relação à leitura imediatamente anterior daquele mesmo sensor.

Qual cláusula SQL cumpre esse objetivo analítico de forma correta e padronizada?`,
    options: [
      { letter: 'A', text: 'valor_psi - LAG(valor_psi, 1) OVER (PARTITION BY sensor_id ORDER BY data_hora)' },
      { letter: 'B', text: 'valor_psi - LEAD(valor_psi, 1) OVER (PARTITION BY data_hora ORDER BY sensor_id)' },
      { letter: 'C', text: 'valor_psi - DENSE_RANK() OVER (ORDER BY sensor_id, data_hora)' },
      { letter: 'D', text: 'valor_psi - FIRST_VALUE(valor_psi) GROUP BY sensor_id HAVING data_hora > 0' },
      { letter: 'E', text: 'DIFF(valor_psi) OVER (WINDOW sensor_id ORDER BY valor_psi DESC)' }
    ],
    correctAnswer: 'A',
    explanationCorrect: `A função analítica LAG(coluna, offset) acessa dados de uma linha que antecede a linha atual por um deslocamento físico (offset) dentro da partição especificada.
- PARTITION BY sensor_id: isola as medições de cada sensor independentemente.
- ORDER BY data_hora: garante a cronologia temporal exata.
- valor_psi - LAG(valor_psi, 1): subtrai o valor da leitura anterior da leitura corrente.`,
    distractorAnalysis: [
      { letter: 'B', whyWrong: 'LEAD olha para a linha seguinte (futuro), e o PARTITION BY foi colocado incorretamente em data_hora.' },
      { letter: 'C', whyWrong: 'DENSE_RANK retorna a posição ordinal densa de classificação, não o valor da leitura anterior.' },
      { letter: 'D', whyWrong: 'FIRST_VALUE retorna a primeira linha da partição; e GROUP BY com FIRST_VALUE sem ser função de janela causaria erro de sintaxe.' },
      { letter: 'E', whyWrong: 'DIFF não é função analítica padrão ANSI/ISO do SQL.' }
    ],
    cesgranrioTip: 'LAG = linha anterior (passado). LEAD = linha posterior (futuro). NTILE(n) = divide em quartis/decis. ROW_NUMBER() = numeração contínua.',
    officialExam: {
      examName: 'Simulado 01 - Revisão Pra Torar',
      board: 'CESGRANRIO',
      year: 2024,
      itemNumber: 4,
      block: 'Bloco III'
    }
  },
  {
    id: 'rpt-05-time-series',
    topic: 'Séries Temporais',
    subtopic: 'Processos Estacionários, Teste Dickey-Fuller e Diferenciação',
    difficulty: 'Difícil',
    format: 'multipla_escolha',
    statement: `[SIMULADO 01 - REVISÃO PRA TORAR - PROF. THIAGO CAVALCANTI]

Ao analisar a série temporal de vazão de óleo bruto em um duto da Transpetro, o cientista de dados aplicou o Teste de Dickey-Fuller Aumentado (ADF - Augmented Dickey-Fuller).
Os resultados retornados foram:
- Estatística do Teste ADF: -1.45
- Valor Crítico a 5%: -2.89
- P-valor: 0.55

Com base nos fundamentos de testes de hipótese e séries temporais, qual é a interpretação estatística correta e a próxima etapa técnica para modelagem ARIMA?`,
    options: [
      { letter: 'A', text: 'Rejeita-se a hipótese nula H0; a série é estacionária e pode-se aplicar diretamente um modelo ARMA(p, q) sem diferenciação.' },
      { letter: 'B', text: 'Não se rejeita a hipótese nula H0; a série possui raiz unitária (é não estacionária) e requer ao menos uma diferenciação (d >= 1) para estabilizar a média.' },
      { letter: 'C', text: 'Rejeita-se a hipótese nula H0; a variância da série é heterocedástica, exigindo transformação de Box-Cox obrigatória.' },
      { letter: 'D', text: 'O teste ADF foi inconclusivo porque a estatística de teste (-1.45) é menor em módulo que o p-valor.' },
      { letter: 'E', text: 'A série é ruído branco gaussiano puro com autocorrelação nula para todos os lags k > 0.' }
    ],
    correctAnswer: 'B',
    explanationCorrect: `No Teste de Dickey-Fuller Aumentado (ADF):
- Hipótese Nula (H0): A série temporal possui raiz unitária (é NÃO estacionária).
- Hipótese Alternativa (H1): A série temporal não possui raiz unitária (é estacionária).
Como a estatística do teste (-1.45) é superior (está à direita na cauda negativa) ao valor crítico (-2.89) e o p-valor (0.55) é muito superior a alfa = 0.05, NÃO podemos rejeitar a hipótese nula. Portanto, a série é NÃO ESTACIONÁRIA e precisa ser diferenciada (ordem d >= 1 no modelo ARIMA(p,d,q)).`,
    distractorAnalysis: [
      { letter: 'A', whyWrong: 'Com p-valor 0.55 > 0.05, não se rejeita H0; a série não é estacionária.' },
      { letter: 'C', whyWrong: 'O teste ADF testa raiz unitária (estacionariedade da média), não heterocedasticidade.' },
      { letter: 'D', whyWrong: 'A estatística do teste é comparada com os valores críticos tabelados, não com o p-valor.' },
      { letter: 'E', whyWrong: 'Se a série tem raiz unitária, os valores passados exercem forte inércia sobre os futuros (não é ruído branco).' }
    ],
    cesgranrioTip: 'Regra de ouro Cesgranrio no ADF: H0 = raiz unitária (não estacionária). Para ser estacionária queremos REJEITAR H0 (p-valor < 0,05 e estatística mais negativa que o valor crítico).',
    officialExam: {
      examName: 'Simulado 01 - Revisão Pra Torar',
      board: 'CESGRANRIO',
      year: 2024,
      itemNumber: 5,
      block: 'Bloco II'
    }
  },
  {
    id: 'rpt-06-nlp-embeddings',
    topic: 'Processamento de Linguagem Natural',
    subtopic: 'TF-IDF vs Word Embeddings (Word2Vec e BERT)',
    difficulty: 'Médio',
    format: 'multipla_escolha',
    statement: `[SIMULADO 01 - REVISÃO PRA TORAR - PROF. THIAGO CAVALCANTI]

No processamento de relatórios técnicos de ocorrências operacionais da Transpetro, avaliou-se o uso de TF-IDF em comparação com modelos densos de Word Embeddings (Word2Vec) e modelos baseados em Transformers (BERT).

Qual é uma limitação estrutural intrínseca do vetorizador TF-IDF quando comparado a representações baseadas em Word Embeddings?`,
    options: [
      { letter: 'A', text: 'O TF-IDF gera representações esparsas de alta dimensionalidade e é incapaz de capturar relações de similaridade semântica ou sinonímia entre termos distintos (ex.: "oleoduto" e "duto").' },
      { letter: 'B', text: 'O TF-IDF não permite o cálculo da frequência de termos em documentos curtos devido à divergência de Kullback-Leibler.' },
      { letter: 'C', text: 'O TF-IDF atribui peso nulo a termos raros que ocorrem em apenas um documento da coleção de textos.' },
      { letter: 'D', text: 'O TF-IDF exige redes neurais convolucionais bidimensionais para calcular o inverso da frequência nos documentos.' },
      { letter: 'E', text: 'O TF-IDF preserva rigorosamente a ordem sintática das palavras na frase, impedindo o embaralhamento de n-gramas.' }
    ],
    correctAnswer: 'A',
    explanationCorrect: `O TF-IDF é uma abordagem baseada em Bag-of-Words:
1. Cada palavra do vocabulário vira uma dimensão ortogonal independente no espaço vetorial (matriz esparsa de milhares de colunas).
2. Dois sinônimos perfeitos (como "oleoduto" e "duto") têm vetores ortogonais (produto interno zero), de modo que o TF-IDF não compreende a proximidade semântica entre eles.
3. Modelos de Embeddings (Word2Vec, FastText, BERT) projetam palavras em um espaço contínuo denso de baixa dimensionalidade (ex.: 300 dimensões), onde termos semanticamente correlatos ficam próximos por distância de cosseno.`,
    distractorAnalysis: [
      { letter: 'B', whyWrong: 'TF-IDF funciona perfeitamente em documentos curtos e longos sem depender de divergência KL.' },
      { letter: 'C', whyWrong: 'Termos raros que aparecem em apenas um documento recebem o maior valor de IDF possível (peso máximo).' },
      { letter: 'D', whyWrong: 'TF-IDF é puramente estatístico (contagem e logaritmo), sem necessidade de redes neurais.' },
      { letter: 'E', whyWrong: 'TF-IDF tradicional descarta a ordem das palavras (modelo saco de palavras / bag of words).' }
    ],
    cesgranrioTip: 'Cesgranrio ama contrapor: Bag of Words / TF-IDF = esparso, sem semântica relacional, ortogonal. Word Embeddings = denso, captura contexto semântico e analogias (Rei - Homem + Mulher = Rainha).',
    officialExam: {
      examName: 'Simulado 01 - Revisão Pra Torar',
      board: 'CESGRANRIO',
      year: 2024,
      itemNumber: 6,
      block: 'Bloco II'
    }
  },
  // Items in Certo/Errado format mirroring the official exam items of Simulado 01
  ...SIMULADO_01_REVISAO_PRA_TORAR_EXAM.items.map(item => ({
    id: `rpt-simulado-01-item-${item.itemNumber}`,
    topic: item.discipline,
    subtopic: item.subtopic,
    difficulty: (item.officialAnswer === 'C' ? 'Médio' : 'Difícil') as 'Médio' | 'Difícil',
    format: 'certo_errado' as const,
    statement: `[SIMULADO 01 - REVISÃO PRA TORAR - Item ${item.itemNumber} - ${item.block}]\n\n${item.statement}`,
    options: [
      { letter: 'C' as const, text: 'CERTO' },
      { letter: 'E' as const, text: 'ERRADO' }
    ],
    correctAnswer: item.officialAnswer as 'C' | 'E',
    explanationCorrect: item.explanation,
    distractorAnalysis: [
      {
        letter: item.officialAnswer === 'C' ? 'E' : 'C',
        whyWrong: `O gabarito oficial do simulado é ${item.officialAnswer === 'C' ? 'CERTO' : 'ERRADO'}. Justificativa: ${item.explanation}`
      }
    ],
    cesgranrioTip: item.cesgranrioTrap,
    officialExam: {
      examName: 'Simulado 01 - Revisão Pra Torar (Ciência de Dados)',
      board: 'CESGRANRIO' as const,
      year: 2024,
      itemNumber: item.itemNumber,
      isAnnulled: false,
      block: item.block
    },
    audioScript: `Item ${item.itemNumber} do Simulado 01 Revisão Pra Torar, disciplina ${item.discipline}. O enunciado diz: ${item.statement}. Gabarito oficial: ${item.officialAnswer === 'C' ? 'CERTO' : 'ERRADO'}. Explicação detalhada: ${item.explanation}. Dica da Banca Cesgranrio: ${item.cesgranrioTrap}`
  }))
];

export const REVISAO_PRA_TORAR_AUDIO_LESSONS: AudioLesson[] = [
  {
    id: 'audio-rpt-01-ml-regularization',
    title: 'Simulado 01 Revisão Pra Torar: Masterclass Machine Learning e Regularização Cesgranrio',
    axisOrDiscipline: 'Eixo Temático 6 • Machine Learning e Regularização',
    durationEstimate: '11 min',
    tag: 'Simulado 01 - Revisão Pra Torar',
    summary: 'Análise profunda dos itens de Machine Learning do Simulado 01 Revisão Pra Torar: Bias-Variance, por que Lasso zera coeficientes e Ridge não, métricas para desbalanceamento (PR-AUC vs ROC-AUC) e hiperparâmetros do XGBoost.',
    keyPoints: [
      'Lasso (L1) possui geometria em losango que intercepta os eixos cartesianos, induzindo esparsidade e seleção automática de variáveis.',
      'Ridge (L2) impõe penalidade circular suave, encolhendo os pesos sem jamais anulá-los exatamente a zero.',
      'Em cenários de desbalanceamento severo (fraudes e vazamentos), a acurácia é falaciosa; utilize PR-AUC e F-beta com beta > 1 (ênfase em Recall).',
      'No Random Forest, aumentar n_estimators não causa sobreajuste; no Gradient Boosting e XGBoost, árvores em excesso provocam overfitting.'
    ],
    transcript: `Bem-vindo à Masterclass do Simulado 01 do projeto Revisão Pra Torar, com foco no edital de Ciência de Dados para a Petrobras e Transpetro, padrão Banca Cesgranrio.

Vamos dissecar os conceitos mais cobrados de Aprendizado de Máquina Supervisionado que caem com frequência absurda nas provas da Cesgranrio.

Primeiro grande tópico: o dilema entre viés e variância, o famoso Bias-Variance Tradeoff.
O erro total de generalização de qualquer estimador supervisionado pode ser decomposto em três termos fundamentais: o quadrado do viés, a variância do estimador e o erro irredutível, que é o ruído inerente aos dados.
Modelos muito simples, como a regressão linear com poucas variáveis, sofrem de alto viés e subajuste (underfitting). Modelos altamente flexíveis, como árvores de decisão profundas ou redes neurais sem regularização, sofrem de alta variância e sobreajuste (overfitting).

Para controlar a variância sem sacrificar a capacidade preditiva, aplicamos técnicas de regularização.
Na regressão linear com regularização L2, conhecida como Ridge Regression, adicionamos à função de custo a soma dos quadrados dos coeficientes multiplicada pelo hiperparâmetro lambda. Geometricamente, a região de viabilidade é uma hiperesfera ou disco circular. As elipses da soma dos quadrados dos resíduos tangenciam o disco suavemente, fazendo com que os coeficientes diminuam de magnitude, mas quase nunca sejam exatamente iguais a zero.
Já na regressão Lasso, que é a regularização L1, adicionamos a soma dos valores absolutos dos coeficientes. Geometricamente, a restrição é um poliedro com vértices pontiagudos sobre os eixos coordenados. Quando as curvas de nível do erro tocam esse poliedro, o ponto de contato ocorre com altíssima probabilidade em um dos vértices, fazendo com que coeficientes de variáveis irrelevantes sejam forçados a zero absoluto! Por essa razão, a Cesgranrio sempre afirma que o Lasso realiza seleção embutida de atributos.

E se o problema apresentar variáveis altamente correlacionadas entre si?
O Lasso tende a selecionar arbitrariamente apenas uma dessas variáveis e descartar as demais. Para solucionar isso, Zou e Hastie criaram o ElasticNet, que combina a penalidade L1 e a penalidade L2. No Scikit-Learn, o parâmetro l1_ratio controla essa proporção: se l1_ratio for igual a um, temos Lasso puro; se for zero, temos Ridge puro; se for zero vírgula cinco, temos um equilíbrio perfeito entre esparsidade e agrupamento de variáveis colineares.

Segundo ponto crucial do Simulado 01: Métricas de Avaliação em Classes Desbalanceadas.
Pense no monitoramento de vazamentos em dutos da Transpetro: de um milhão de medições de telemetria por dia, talvez apenas dez representem um vazamento real. Se você construir um modelo preguiçoso que sempre prevê a classe zero (sem vazamento), sua acurácia será de noventa e nove vírgula novecentos e noventa e nove por cento! Uma acurácia altíssima, mas o modelo é completamente inútil porque não detecta nenhum vazamento.
Nesse caso, a curva ROC tradicional pode enganar, porque a taxa de falsos positivos coloca no denominador o número massivo de verdadeiros negativos. A curva recomendada pela banca Cesgranrio é a curva Precisão-Recall, ou PR-AUC.
Além disso, quando o custo do falso negativo é catastrófico, usamos o F-beta Score com beta maior do que um, como o F2-Score, que confere o dobro de peso ao Recall em comparação com a Precisão.

Fixe esses conceitos e revise cada detalhe do Simulado 01 para garantir pontuação máxima na prova!`
  },
  {
    id: 'audio-rpt-02-spark-sql-devops',
    title: 'Simulado 01 Revisão Pra Torar: Masterclass Big Data, Spark, SQL Avançado e DevOps',
    axisOrDiscipline: 'Eixo Temático 3 • Big Data e Engenharia de Dados',
    durationEstimate: '12 min',
    tag: 'Simulado 01 - Revisão Pra Torar',
    summary: 'Revisão técnica de Engenharia de Dados e SQL do Simulado 01: DAG e Shuffling no Apache Spark, Hadoop NameNode vs DataNode, funções analíticas de janela (ROW_NUMBER, RANK, DENSE_RANK, LAG, LEAD), isolamento ACID e MLOps (Data Drift vs Concept Drift).',
    keyPoints: [
      'No Apache Spark, transformações são preguiçosas (lazy evaluation); ações disparam a execução física do DAG.',
      'Narrow Dependencies (map, filter) não exigem shuffle; Wide Dependencies (groupByKey, distinct, join) exigem shuffle pela rede.',
      'Funções de Janela SQL: RANK deixa lacunas após empates (1, 1, 3); DENSE_RANK não deixa lacunas (1, 1, 2); LAG acessa linha anterior.',
      'Data Drift altera a distribuição das variáveis de entrada P(X); Concept Drift altera a relação alvo condicional P(Y|X).'
    ],
    transcript: `Olá, futuro Cientista de Dados da Petrobras e Transpetro! Nesta aula do Simulado 01 Revisão Pra Torar, vamos dominar os tópicos que separam os aprovados nos blocos de Engenharia de Dados, Bancos de Dados e MLOps.

Iniciando com o Apache Spark, o motor de computação distribuída em memória mais cobrado nos concursos da Cesgranrio.
O Spark baseia-se no conceito de RDD, Resilient Distributed Dataset, que são coleções de dados tolerantes a falhas particionadas entre os nós do cluster.
As operações sobre RDDs e DataFrames dividem-se em duas categorias:
A primeira são as Transformações, como map, filter, flatMap e groupBy. Elas possuem avaliação preguiçosa, lazy evaluation. O Spark não processa os dados no momento em que você as digita; ele apenas constrói um plano lógico em formato de Grafo Acíclico Dirigido, o DAG.
A segunda categoria são as Ações, como count, collect, take, reduce e saveAsTextFile. São as ações que disparam o plano físico de execução no cluster através do DAGScheduler.

Dentro do Spark, guarde esta distinção vital: Dependências Estreitas contra Dependências Amplas.
Em uma Narrow Dependency, como map e filter, cada partição do RDD pai gera uma partição no RDD filho. Não há necessidade de comunicação pela rede entre as máquinas, o processamento ocorre in-memory no mesmo nó.
Em uma Wide Dependency, como groupByKey, reduceByKey, join, distinct ou repartition, os dados precisam ser reorganizados e enviados para diferentes máquinas. Esse processo é o temido Shuffle! O Shuffle grava dados em disco e trafega pela rede, sendo o maior gargalo de desempenho em clusters Spark. A fronteira entre estágios, ou stages, no Spark ocorre exatamente onde há uma operação de Shuffle!

Agora vamos para o SQL Avançado da Cesgranrio: Funções Analíticas de Janela, as Window Functions.
Diferente de um GROUP BY clássico que colapsa várias linhas em uma única linha agregada, as funções de janela calculam métricas sobre uma partição de dados mantendo cada linha original intacta.
A estrutura é: FUNÇÃO() OVER (PARTITION BY coluna_agrupadora ORDER BY coluna_ordenadora).
Preste máxima atenção aos três métodos de ranqueamento quando ocorrem empates:
O ROW_NUMBER atribui números inteiros sequenciais únicos sem jamais repetir: se houver empate, ele dá um, dois e três arbitrariamente.
O RANK atribui a mesma posição aos empates, mas pula a numeração subsequente: se dois registros empatarem em primeiro lugar, ele gera um, um e três, pulando o número dois!
O DENSE_RANK também atribui a mesma posição aos empates, mas não deixa lacunas: ele gera um, um e dois!
E para séries temporais e telemetria em SQL, use sempre LAG e LEAD. LAG busca o valor de uma linha anterior no tempo; LEAD busca o valor de uma linha futura.

Para fechar com chave de ouro: MLOps e monitoramento de modelos em produção.
Quando um modelo de machine learning começa a perder desempenho após alguns meses em operação, a causa quase sempre é a deriva, ou drift.
Se a distribuição estatística das features de entrada mudar com o tempo, por exemplo devido a sensores que envelhecem ou nova faixa etária de clientes, temos Data Drift, ou Covariate Shift. A relação estatística P(X) mudou.
Por outro lado, se a relação funcional entre a entrada e o desfecho mudar, temos Concept Drift. Por exemplo, fraudadores que inventam um método novo de burlar a segurança, mudando a probabilidade condicional P de Y dado X.

Com esse conhecimento sólido, você estará pronto para gabaritar o Simulado 01 e a prova real!`
  }
];
