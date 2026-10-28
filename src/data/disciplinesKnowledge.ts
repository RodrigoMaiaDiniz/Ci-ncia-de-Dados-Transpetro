import { DisciplineKnowledgeBase } from '../types';

export const OFFICIAL_SYLLABUS_DISCIPLINES: DisciplineKnowledgeBase[] = [
  {
    id: 'eixo-1-matematica',
    axisNumber: 'Eixo I',
    title: 'Matemática & Álgebra Linear',
    category: 'Matemática',
    shortDescription: 'Cálculo diferencial e integral multivariável, espaços vetoriais, normas, autovetores, SVD e Cholesky.',
    officialExamReferences: ['Petrobras 2021 Item 67 (PCA e Autovalores)', 'Petrobras 2021 Item 100 (Derivadas)', 'Petrobras 2021 Item 102 (Pontos Críticos e Mínimos)', 'Petrobras 2021 Item 103 (Derivadas Parciais)'],
    coreConcepts: [
      {
        conceptName: 'Cálculo Diferencial e Derivadas Parciais',
        summary: 'Taxa instantânea de variação, vetor gradiente ∇f(x, y), matriz Hessiana para concavidade e otimização por Gradiente Descendente.',
        formulasOrCode: '∇f(x, y) = [ ∂f/∂x, ∂f/∂y ]^T ; x_{t+1} = x_t - η * ∇f(x_t)',
        commonExamTrap: 'A banca cobra derivadas parciais com expoentes negativos ou frações para avaliar se o candidato domina a regra da cadeia e sinais.',
        keyPoints: [
          'Derivada nula f\'(t) = 0 define pontos críticos; se f\'\'(t) > 0, o ponto é mínimo local.',
          'Se f\'(t) > 0 em um intervalo, a função é estritamente crescente naquele ponto.'
        ]
      },
      {
        conceptName: 'Álgebra Linear, Normas e Decomposição Matricial',
        summary: 'Espaços vetoriais no R^n, Produto Escalar, Ortogonalidade, Normas L1 (Manhattan), L2 (Euclidiana) e L_inf (Chebyshev). SVD e Decomposição de Cholesky.',
        formulasOrCode: '||x||_1 = ∑|x_i| ; ||x||_2 = √(∑x_i²) ; A = U * Σ * V^T',
        commonExamTrap: 'Na Decomposição de Cholesky A = L * L^T, a matriz A PRECISA ser simétrica e positiva definida.',
        keyPoints: [
          'O traço de uma matriz de covariância é igual à soma dos seus autovalores (representa a variância total explicada).',
          'Autovetores associados a autovalores distintos de matrizes simétricas são ortogonais entre si.'
        ]
      }
    ]
  },
  {
    id: 'eixo-2-estatistica',
    axisNumber: 'Eixo II',
    title: 'Probabilidade & Inferência Estatística',
    category: 'Estatística',
    shortDescription: 'Axiomas, Teorema de Bayes, Distribuições Discretas e Contínuas, Teorema Central do Limite, Testes de Hipóteses (t, z, F, ANOVA, Chi-Quadrado) e Testes A/B.',
    officialExamReferences: ['Petrobras 2021 Item 59 (Regressão MQO)', 'Petrobras 2021 Item 112 (Teorema Central do Limite)', 'Petrobras 2021 Item 115 (Assimetria Média vs Mediana)'],
    coreConcepts: [
      {
        conceptName: 'Teorema de Bayes & Probabilidade Condicional',
        summary: 'Atualização probabilística a posteriori de uma hipótese a partir da verossimilhança dos dados observados e da crença a priori.',
        formulasOrCode: 'P(A|B) = [ P(B|A) * P(A) ] / P(B)',
        commonExamTrap: 'Confundir P(A|B) com P(B|A). No cálculo de P(B), deve-se usar a Lei da Probabilidade Total.',
        keyPoints: [
          'Eventos independentes: P(A ∩ B) = P(A) * P(B) e P(A|B) = P(A).',
          'Distribuições discretas: Binomial (n ensaios Bernoulli), Poisson (taxa λ por unidade de tempo/espaço).'
        ]
      },
      {
        conceptName: 'Inferência Estatística & Testes de Hipóteses',
        summary: 'Formulação de H0 e H1, Erro Tipo I (α - falso positivo), Erro Tipo II (β - falso negativo), Poder do Teste (1 - β), p-valor e intervalos de confiança.',
        formulasOrCode: 'Z = (x_bar - μ_0) / (σ / √n) ; t = (x_bar - μ_0) / (s / √n)',
        commonExamTrap: 'O p-valor NÃO é a probabilidade de H0 ser verdadeira; é a probabilidade de se obter uma estatística tão ou mais extrema sob a suposição de que H0 é verdadeira.',
        keyPoints: [
          'Se p-valor <= α (nível de significância), rejeita-se a hipótese nula H0.',
          'Teste ANOVA: Compara médias de 3 ou mais populações via razão de variâncias F.'
        ]
      }
    ]
  },
  {
    id: 'eixo-3-dados',
    axisNumber: 'Eixo III',
    title: 'Dados, SGBDs, Data Lakehouse & Big Data',
    category: 'Big Data & SQL',
    shortDescription: 'Formatos de arquivos (Parquet, ORC, JSON, CSV), SGBDs relacionais e NoSQL, Data Warehouse, Data Lake, Lakehouse (Delta Lake), Apache Spark e Hadoop/HDFS.',
    officialExamReferences: [
      'Petrobras 2021 Item 98 (NoSQL Chave-Valor)', 
      'Petrobras 2021 Item 99 (Hadoop HDFS e Java)',
      'Simulado 01 Revisão Pra Torar Item 10 (Spark Lazy Evaluation)',
      'Simulado 01 Revisão Pra Torar Item 11 (HDFS NameNode vs DataNode)',
      'Simulado 01 Revisão Pra Torar Item 12 (SQL Window Functions RANK vs DENSE_RANK)',
      'Simulado 01 Revisão Pra Torar Item 13 (Isolamento ACID e Leituras Fantasma)'
    ],
    coreConcepts: [
      {
        conceptName: 'Arquitetura Data Lakehouse & Formatos Colunares',
        summary: 'Combina a escalabilidade de baixo custo do Data Lake com as garantias transacionais ACID, Time Travel e isolamento de um Data Warehouse clássico.',
        formulasOrCode: 'Parquet: Formato binário colunar com pushdown predicates (filtra metadados antes de ler os blocos).',
        commonExamTrap: 'Formato Parquet e ORC são ideais para leitura analítica OLAP; Avro é ideal para gravação rápida por linhas em streaming.',
        keyPoints: [
          'Delta Lake / Apache Iceberg adicionam ACID e versionamento ao Data Lake sobre storage de objetos.',
          'Arquitetura Medalhão: Camadas Bronze (raw), Silver (limpo e deduplicado) e Gold (modelos analíticos prontos).'
        ]
      },
      {
        conceptName: 'Apache Spark & Processamento Distribuído',
        summary: 'Processamento distribuído em memória baseado em grafos acíclicos dirigidos (DAGs). Otimizador Catalyst e motor de execução Tungsten.',
        formulasOrCode: 'Broadcast Join: df_large.join(broadcast(df_small), "id") -> elimina o shuffle na rede.',
        commonExamTrap: 'Transformações no Spark são LAZY (só executam quando uma AÇÃO como count(), show() ou write() é chamada).',
        keyPoints: [
          'HDFS: NameNode gerencia metadados e namespace; DataNodes armazenam os blocos de dados replicados.',
          'Narrow Transformations não exigem troca de dados entre partições (map, filter); Wide Transformations exigem shuffle (groupBy, join).'
        ]
      }
    ]
  },
  {
    id: 'eixo-4-gestao',
    axisNumber: 'Eixo IV',
    title: 'Gestão de Projetos de Ciência de Dados',
    category: 'Gestão & Metodologias',
    shortDescription: 'Metodologias CRISP-DM, TDSP (Team Data Science Process), OSEMN e frameworks ágeis (Scrum / Kanban).',
    officialExamReferences: ['Edital Oficial Petrobras / Transpetro', 'Ciclo de Vida de Modelos'],
    coreConcepts: [
      {
        conceptName: 'CRISP-DM (Cross-Industry Standard Process for Data Mining)',
        summary: 'Metodologia cíclica e iterativa dividida em 6 fases: Entendimento do Negócio, Entendimento dos Dados, Preparação dos Dados, Modelagem, Avaliação e Implantação.',
        formulasOrCode: 'Ciclo: Negócio -> Dados -> Preparação -> Modelagem -> Avaliação -> Implantação',
        commonExamTrap: 'A fase de Avaliação (Evaluation) verifica se os resultados atendem aos OBJETIVOS DE NEGÓCIO, e não apenas métricas estatísticas.',
        keyPoints: [
          'Data Preparation consome historicamente a maior fatia de esforço (70-80%) do projeto.',
          'Se a avaliação reprovar o modelo perante o negócio, retorna-se à fase de Entendimento do Negócio.'
        ]
      }
    ]
  },
  {
    id: 'eixo-5-preparacao',
    axisNumber: 'Eixo V',
    title: 'Qualidade, Limpeza & Preparação de Dados',
    category: 'Engenharia de Features',
    shortDescription: 'Tratamento de dados ausentes (MICE, K-NN Imputer), detecção de outliers (IQR, Z-Score, Isolation Forest), encoding (One-Hot, Target, Binary) e Cross-Validation.',
    officialExamReferences: ['Petrobras 2021 Item 86 (Boxplot e IQR)', 'Petrobras 2021 Item 89 (Z-score normalizado)', 'Petrobras 2021 Item 90 (KNN Imputer HEOM)', 'Petrobras 2021 Item 91 (MICE para MAR)'],
    coreConcepts: [
      {
        conceptName: 'Tipologia de Dados Faltantes & Imputação Avançada',
        summary: 'MCAR (Missing Completely at Random), MAR (Missing at Random) e MNAR (Missing Not at Random). Métodos: MICE (equações encadeadas multivariadas) e KNN Imputer.',
        formulasOrCode: 'Z-score = (x - μ) / σ ; IQR = Q3 - Q1 ; Outliers: x < Q1 - 1.5*IQR ou x > Q3 + 1.5*IQR',
        commonExamTrap: 'Nunca calcular a média ou mediana para imputação utilizando a base inteira antes do split treino/teste (isso gera Vazamento de Dados / Data Leakage).',
        keyPoints: [
          'MICE é altamente indicado e fundamentado para dados do tipo MAR.',
          'Para bases heterogêneas (numéricas + categóricas), o KNN Imputer exige métricas como HEOM ou HVDM.'
        ]
      },
      {
        conceptName: 'Codificação de Categóricos & Normalização',
        summary: 'One-Hot Encoding, Target Encoding (com regularização), Binary Encoding (converte em bits 0/1) e StandardScaler vs MinMaxScaler.',
        formulasOrCode: 'StandardScaler: z = (x - μ) / σ (média 0, desvio 1) ; MinMaxScaler: x_norm = (x - min) / (max - min)',
        commonExamTrap: 'A média das variáveis padronizadas por Z-score é rigorosamente ZERO para qualquer distribuição.',
        keyPoints: [
          'Modelos baseados em distâncias euclidianas (KNN, SVM, K-Means) e redes neurais exigem escala padronizada.',
          'Árvores de decisão e modelos baseados em divisão de features são invariantes a transformações monotônicas de escala.'
        ]
      }
    ]
  },
  {
    id: 'eixo-6-modelagem',
    axisNumber: 'Eixo VI',
    title: 'Modelagem, Validação & Métricas de Avaliação',
    category: 'Machine Learning',
    shortDescription: 'Pipelines scikit-learn, AutoML, Otimização de Hiperparâmetros (Bayesiana vs Random), Métricas (ROC-AUC, PR-AUC, F1, RMSE), Bias-Variance Tradeoff e Regularização.',
    officialExamReferences: [
      'Petrobras 2021 Item 52 (Matriz de Confusão)', 
      'Petrobras 2021 Item 53 (Curva ROC)', 
      'Petrobras 2021 Item 56-57 (Bias-Variance)', 
      'Petrobras 2021 Item 66 (Otimização Bayesiana)',
      'Simulado 01 Revisão Pra Torar Item 1 (Z-Score vs RobustScaler)',
      'Simulado 01 Revisão Pra Torar Item 2 (Lasso L1 Sparsity vs Ridge L2)',
      'Simulado 01 Revisão Pra Torar Item 4 (PR-AUC vs ROC-AUC e Desbalanceamento)'
    ],
    coreConcepts: [
      {
        conceptName: 'Tradeoff Viés-Variância & Métricas de Classificação',
        summary: 'Erro Total = Viés² + Variância + Ruído Irredutível. Underfitting = Alto Viés. Overfitting = Alta Variância. Métricas: Acurácia, Precisão, Recall, F1, ROC-AUC e PR-AUC.',
        formulasOrCode: 'Precisão = TP / (TP + FP) ; Recall = TP / (TP + FN) ; F1 = 2 * (P * R) / (P + R)',
        commonExamTrap: 'Em bases severamente desbalanceadas (ex: detecção de anomalias em dutos ou fraudes), a Acurácia é enganosa. Use PR-AUC ou Recall.',
        keyPoints: [
          'Curva ROC plota TPR (eixo Y) versus FPR (eixo X); a área sob a curva (AUC) mede a capacidade de discriminação.',
          'Diagonal da matriz de confusão contém os acertos (Verdadeiros Positivos de cada classe); quanto MAIOR, melhor o modelo.'
        ]
      },
      {
        conceptName: 'Técnicas de Regularização (Lasso, Ridge, Elastic Net)',
        summary: 'Penalização da magnitude dos coeficientes para combater overfitting. Lasso (L1) gera coeficientes esparsos (zerados); Ridge (L2) encolhe os coeficientes sem zerá-los.',
        formulasOrCode: 'Lasso (L1): Loss + λ * ∑|w_j| ; Ridge (L2): Loss + λ * ∑(w_j²)',
        commonExamTrap: 'Lasso realiza seleção automática de variáveis ao forçar coeficientes irrelevantes a zero; Ridge não zera.',
        keyPoints: [
          'Elastic Net combina L1 e L2 para superar a limitação do Lasso diante de variáveis altamente correlacionadas.',
          'Early Stopping monitora o erro de validação para interromper o treinamento antes que a variância suba.'
        ]
      }
    ]
  },
  {
    id: 'eixo-7-classes-modelos',
    axisNumber: 'Eixo VII',
    title: 'Classes de Modelos (Supervisionados, Não-Supervisionados & Séries Temporais)',
    category: 'Algoritmos de ML',
    shortDescription: 'Árvores de Decisão, Random Forest, XGBoost, LightGBM, CatBoost, SVM, K-Means, DBSCAN, PCA, Séries Temporais (ARIMA, GARCH), Modelos Causais e Redes Neurais (MLP, CNN, LSTM).',
    officialExamReferences: ['Petrobras 2021 Item 60 (Random Forest e Bootstrap)', 'Petrobras 2021 Item 62 (SVM Hiperplano)', 'Petrobras 2021 Item 63 (Ensembles Bagging vs Boosting)', 'Petrobras 2021 Item 72-73 (Redes Neurais e Backpropagation)'],
    coreConcepts: [
      {
        conceptName: 'Ensembles: Bagging vs Boosting',
        summary: 'Bagging (ex: Random Forest) treina modelos independentes em paralelo com amostras Bootstrap para reduzir VARIÂNCIA. Boosting (ex: XGBoost, LightGBM) treina modelos em série corrigindo resíduos para reduzir VIÉS.',
        formulasOrCode: 'Random Forest = Bootstrap + Subespaço Aleatório ; XGBoost = Otimização com Gradiente e Hessiana.',
        commonExamTrap: 'Bagging reduz variância de modelos complexos (árvores profundas); Boosting reduz viés de modelos fracos (árvores rasas).',
        keyPoints: [
          'SVM busca o hiperplano que MAXIMIZA a margem geométrica 2/||w|| entre as classes.',
          'O Kernel Trick (RBF, polinomial) mapeia os dados implicitamente em dimensões superiores sem calcular o produto interno explícito.'
        ]
      },
      {
        conceptName: 'Séries Temporais & Modelos ARIMA',
        summary: 'Componentes: Tendência, Sazonalidade, Ciclos e Ruído. Estacionariedade requer média e variância constantes no tempo. Modelos AR(p), MA(q) e ARIMA(p, d, q).',
        formulasOrCode: 'AR(p): FAC decai e FACP corta abruptamente no lag p ; MA(q): FAC corta no lag q e FACP decai.',
        commonExamTrap: 'Se a FACP corta no lag 1 e a FAC decai exponencialmente, o processo é um AR(1). Se a FACP for nula nos lags >= 2, trata-se de um modelo autoregressivo de ordem 1.',
        keyPoints: [
          'Teste Augmented Dickey-Fuller (ADF): se p-valor < 0,05, rejeita-se a raiz unitária e a série é estacionária.',
          'Diferenciação de ordem d remove tendência estocástica tornando a série estacionária.'
        ]
      }
    ]
  },
  {
    id: 'eixo-8-nlp',
    axisNumber: 'Eixo VIII',
    title: 'Processamento de Linguagem Natural (NLP) & LLMs',
    category: 'NLP & IA Generativa',
    shortDescription: 'Tokenização, Lemmatização, TF-IDF, Word Embeddings (Word2Vec CBOW/Skip-Gram, GloVe), Transformers, Atenção Auto-Multi-Head, BERT, GPT e tarefas de NLP.',
    officialExamReferences: ['Petrobras 2021 Item 81 (Stop-words)', 'Petrobras 2021 Item 82 (CBOW vs Skip-Gram)', 'Petrobras 2021 Item 83 (TF-IDF com IDF zero)'],
    coreConcepts: [
      {
        conceptName: 'Representação Vetorial de Texto & Word2Vec',
        summary: 'TF-IDF pondera a frequência local do termo pela raridade no corpus. Word2Vec gera vetores densos: CBOW (prevê a palavra central pelo contexto) vs Skip-Gram (prevê o contexto pela palavra central).',
        formulasOrCode: 'TF-IDF = TF * log(N / DF) ; Self-Attention = softmax(Q * K^T / √d_k) * V',
        commonExamTrap: 'Se um termo aparece em todos os documentos da base (DF = N), o IDF é log(1) = 0 e o TF-IDF é rigorosamente ZERO.',
        keyPoints: [
          'CBOW é mais rápido e funciona bem para palavras frequentes; Skip-Gram performa melhor para palavras raras.',
          'Arquitetura Transformer utiliza mecanismos de auto-atenção paralela eliminando as limitações recorrentes de RNNs/LSTMs.'
        ]
      }
    ]
  },
  {
    id: 'eixo-9-programacao',
    axisNumber: 'Eixo IX',
    title: 'Programação Python, SQL Avançado & Power BI',
    category: 'Ferramentas de Engenharia',
    shortDescription: 'Bibliotecas Python (NumPy, Pandas, Scikit-Learn, PyTorch, PySpark), Window Functions em SQL, Otimização de Consultas e Modelagem DAX no Power BI.',
    officialExamReferences: ['Petrobras 2021 Item 64 (Scikit-Learn API fit)', 'Petrobras 2021 Item 108 (NumPy Slicing e Determinante)'],
    coreConcepts: [
      {
        conceptName: 'Vetorização e Manipulação com Python & Pandas',
        summary: 'Broadcasting em NumPy, indexação booleana, slicing matricial com exclusão do limite superior, transformações com map/apply e pipelines scikit-learn.',
        formulasOrCode: 'A[3:7, 0] -> seleciona linhas 3, 4, 5 e 6 da coluna 0 ; model.fit(X_train, y_train)',
        commonExamTrap: 'Em Python A[3:7], o índice final 7 NÃO entra na fatia.',
        keyPoints: [
          'A API Scikit-Learn adota estritamente X para matriz de amostras/features e y para vetor de rótulos.',
          'Window Functions em SQL: PARTITION BY divide o particionamento analítico sem reduzir as linhas retornadas.'
        ]
      }
    ]
  },
  {
    id: 'eixo-10-visualizacao',
    axisNumber: 'Eixo X',
    title: 'Visualização de Dados & Storytelling Corporativo',
    category: 'Visualização & BI',
    shortDescription: 'Princípios de design de gráficos eficazes, carga cognitiva, gráficos analíticos (Boxplot, Scatter, Histograma, Heatmap) e Dashboards executivos.',
    officialExamReferences: ['Petrobras 2021 Item 86 (Boxplot)', 'Petrobras 2021 Item 113 (Histograma e Decis)', 'Petrobras 2021 Item 115 (Assimetria da Distribuição)'],
    coreConcepts: [
      {
        conceptName: 'Análise Exploratória Visual & Gráficos Analíticos',
        summary: 'Escolha correta de gráficos: Boxplot para distribuições e dispersão; Scatter plot para correlações bivariadas; Histograma para densidade de frequência.',
        formulasOrCode: 'Boxplot: Q1 (25%), Q2 (Mediana 50%), Q3 (75%), IQR = Q3 - Q1, Bigodes = [Q1 - 1.5*IQR, Q3 + 1.5*IQR].',
        commonExamTrap: 'Não confundir a mediana com a média em distribuições com assimetria acentuada.',
        keyPoints: [
          'Assimetria positiva (à direita): Cauda longa à direita, Média > Mediana.',
          'Assimetria negativa (à esquerda): Cauda longa à esquerda, Média < Mediana.'
        ]
      }
    ]
  },
  {
    id: 'eixo-11-governanca',
    axisNumber: 'Eixo XI',
    title: 'Governança de Dados, DMBOK & LGPD',
    category: 'Governança & Segurança',
    shortDescription: 'Framework DAMA-DMBOK, Dimensões da Qualidade de Dados, Linhagem, Metadados, LGPD (Lei 13.709/2018), Anonimização e Pseudonimização.',
    officialExamReferences: ['Edital Transpetro 2023/2026', 'Petrobras 2021/2022'],
    coreConcepts: [
      {
        conceptName: 'LGPD (Lei nº 13.709/2018) - Bases Legais & Conceitos Chave',
        summary: 'Regulamenta o tratamento de dados pessoais no Brasil. Art. 7º: 10 bases legais para dados comuns. Art. 11: dados sensíveis (saúde, biometria, origem racial, etc.).',
        formulasOrCode: 'Bases: Consentimento, Cumprimento de Obrigação Legal, Execução de Políticas Públicas, Execução de Contratos, Legítimo Interesse, Proteção da Vida.',
        commonExamTrap: 'O Consentimento é apenas UMA das 10 bases legais; a empresa pública pode tratar dados por obrigação legal e execução de contrato sem consentimento.',
        keyPoints: [
          'Dado Anonimizado: Perdeu a associação ao indivíduo por meios técnicos razoáveis e irreversíveis; não é considerado dado pessoal para fins da LGPD.',
          'Dado Pseudonimizado: Mantém a possibilidade de reassociação mediante chave controlada e separada; permanece sujeito à LGPD.'
        ]
      }
    ]
  },
  {
    id: 'eixo-12-ia-responsavel',
    axisNumber: 'Eixo XII',
    title: 'Governança, Segurança & Aplicação Responsável de IA',
    category: 'Ética & Segurança em IA',
    shortDescription: 'Mitigação de viés algorítmico, explicabilidade (XAI: SHAP, LIME), ataques adversariais, envenenamento de dados, extração de modelos e alucinações em LLMs.',
    officialExamReferences: ['Edital Transpetro 2023/2026', 'Guia de IA Responsável'],
    coreConcepts: [
      {
        conceptName: 'Segurança em IA & Ataques Adversariais',
        summary: 'Data Poisoning (envenenamento do treino), Ataques Adversariais (perturbações imperceptíveis na entrada para enganar o classificador), Inversão de Modelo e Extração.',
        formulasOrCode: 'SHAP (Shapley Additive Explanations) pondera a contribuição marginal de cada feature em todas as coalizões possíveis.',
        commonExamTrap: 'Alucinação em LLMs decorre da amostragem estocástica do próximo token; mitiga-se com RAG (Retrieval-Augmented Generation) e ancoragem em bases verificadas.',
        keyPoints: [
          'Explicabilidade: Modelos intrinsecamente interpretáveis (Regressão Linear, Árvores rasas) versus pós-hoc (SHAP e LIME para caixas-pretas).',
          'Auditoria de Viés: Garantir paridade demográfica e ausência de viés algorítmico discriminatório.'
        ]
      }
    ]
  }
];
