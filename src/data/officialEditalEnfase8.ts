import { OfficialSyllabusTopic } from '../types';

export const OFFICIAL_EDITAL_ENFASE_8: OfficialSyllabusTopic[] = [
  // ==========================================
  // CONHECIMENTOS BÁSICOS - LÍNGUA PORTUGUESA
  // ==========================================
  {
    id: 'basico-portugues',
    block: 'Conhecimentos Básicos',
    itemCode: 'CB-01',
    title: 'Língua Portuguesa',
    officialWording: '1. Compreensão e interpretação de textos de gêneros variados. 2. Reconhecimento de tipos e gêneros textuais. 3. Domínio da ortografia oficial. 4. Domínio dos mecanismos de coesão textual: referenciação, substituição, repetição, conectores e outros elementos de sequenciação textual; emprego de tempos e modos verbais. 5. Domínio da estrutura morfossintática do período: emprego das classes de palavras; relações de coordenação entre orações e entre termos da oração; relações de subordinação entre orações e entre termos da oração; emprego dos sinais de pontuação; concordância verbal e nominal; regência verbal e nominal; emprego do sinal indicativo de crase; colocação dos pronomes átonos. 6. Reescrita de frases e parágrafos do texto: significação das palavras; substituição de palavras ou de trechos de texto; reorganização da estrutura de orações e de períodos do texto; reescrita de textos de diferentes gêneros e níveis de formalidade.',
    area: 'Linguagens & Comunicação',
    relevance: 'Altíssima',
    subtopics: [
      'Compreensão e interpretação de textos: inferência, intenção comunicativa e pressupostos',
      'Tipologia textual: dissertativo-argumentativo, expositivo, narrativo e injuntivo',
      'Coesão e coerência: anáfora, catáfora, conectores interparágrafos e operadores argumentativos',
      'Valores semânticos e temporais de tempos e modos verbais (subjuntivo vs indicativo)',
      'Concordância verbal com sujeitos partitivos, percentuais e pronome "se" apassivador/indeterminação',
      'Regência verbal e nominal dos verbos clássicos Cesgranrio (assistir, visar, aspirar, implicar, preferir)',
      'Emprego do sinal indicativo de crase: casos proibidos, facultativos e obrigatórios',
      'Pontuação: uso obrigatório e proibido da vírgula (nunca separar sujeito do predicado ou verbo de complemento)',
      'Colocação pronominal: casos rigorosos de próclise (palavras atrativas), mesóclise e ênclise',
      'Reescrita de períodos: manutenção do sentido original e correção gramatical'
    ],
    keyConceptsAndFormulas: [
      {
        name: 'Partícula "SE": Apassivador vs Indeterminação',
        description: 'VTD/VTDI + SE = Pronome Apassivador (verbo concorda com o sujeito: "Analisam-se os dados"). VTI/VI/VL + SE = Índice de Indeterminação do Sujeito (verbo obrigatoriamente na 3ª pessoa do singular: "Precisa-se de dados").',
        formulaOrCode: 'VTD + SE -> Sujeito Paciente (pluraliza) | VTI + SE -> Oração sem Sujeito Determinado (singular)'
      },
      {
        name: 'Casos Críticos de Crase na Cesgranrio',
        description: 'Nunca ocorre crase antes de palavras masculinas, verbos, pronomes em geral (com raras exceções) e quando o "a" está no singular diante de palavra no plural.',
        formulaOrCode: 'A + A = À (Troca-se a palavra feminina por masculina: se der "AO", há crase)'
      }
    ],
    cesgranrioExamTraps: [
      'A Cesgranrio costuma apresentar frases longas com orações intercaladas para induzir ao erro de concordância verbal com palavras atrativas próximas.',
      'Em reescrita de frases, preste atenção em alterações sutis de sentido: trocar "algum dado" por "dado algum" inverte completamente o sentido sem violar a gramática.',
      'O verbo implicar no sentido de acarretar é estritamente VTD (não admite a preposição "em"). Exemplo correto: "A anomalia implicou atrasos", e não "implicou em atrasos".'
    ],
    transpetroPracticalContext: 'Elaboração de relatórios técnicos de engenharia de confiabilidade, pareceres periciais de dutos e documentação corporativa para auditorias regulatórias da ANP.',
    recommendedStudyStrategy: [
      'Resolver diariamente 5 a 10 questões de Português recentes da Fundação Cesgranrio (concursos Petrobras, Transpetro, Caixa e CNU).',
      'Montar tabela de regência com os 15 verbos mais recorrentes na banca.',
      'Dominar a identificação das orações adjetivas explicativas (com vírgula) vs restritivas (sem vírgula).'
    ]
  },
  // ==========================================
  // CONHECIMENTOS BÁSICOS - LÍNGUA INGLESA
  // ==========================================
  {
    id: 'basico-ingles',
    block: 'Conhecimentos Básicos',
    itemCode: 'CB-02',
    title: 'Língua Inglesa Técnica',
    officialWording: '1. Compreensão de textos escritos em língua inglesa de temas gerais e técnicos. 2. Itens gramaticais relevantes para o entendimento textual: tempos verbais, conectores discursivos, modais, voz passiva, comparativos e superlativos. 3. Vocabulário técnico na área de Ciência de Dados, Computação e Negócios.',
    area: 'Linguagens & Comunicação',
    relevance: 'Alta',
    subtopics: [
      'Leitura instrumental e skimming/scanning de textos técnicos e relatórios de TI',
      'Conectivos lógicos discursivos (However, Although, Therefore, Furthermore, In spite of, Moreover)',
      'Verbos Modais (Must, Should, May, Might, Could) e graus de certeza/obrigação',
      'Voz passiva em artigos científicos de aprendizado de máquina e relatórios de arquitetura',
      'Vocabulário específico de Ciência de Dados (Trade-off, Bottleneck, Pipeline, Feature Store, Latency, Throughput)',
      'Identificação de pronomes de referência e sinônimos no contexto'
    ],
    keyConceptsAndFormulas: [
      {
        name: 'Discourse Markers & Contrast Connectors',
        description: 'Conectivos de oposição (However, Nevertheless, Nonetheless) vs Concessão (Although, Even though, In spite of / Despite + substantivo/gerúndio).',
        formulaOrCode: 'Despite the high latency, the model converged. / The model converged; however, latency was high.'
      }
    ],
    cesgranrioExamTraps: [
      'Falsos cognatos frequentes: "Actually" significa na verdade (não atualmente); "Eventually" significa no final das contas (não eventualmente); "Comprehensive" significa abrangente/completo (não compreensivo).',
      'A banca cobra perguntas diretas de localização de referências pronominais (ex: "The pronoun \'it\' in line 14 refers to...").'
    ],
    transpetroPracticalContext: 'Compreensão de documentações oficiais de bibliotecas (PySpark, PyTorch, Scikit-Learn), especificações de telemetria de sensores industriais e literatura internacional de modelagem preditiva marítima.',
    recommendedStudyStrategy: [
      'Fazer a leitura periódica dos abstracts dos papers do NeurIPS/ICML e da documentação técnica do Apache Spark e MLflow.',
      'Treinar questões da Cesgranrio focando na identificação rápida de palavras-chave no texto.'
    ]
  },

  // ==========================================
  // BLOCO I - TÓPICO 1: APRENDIZADO SUPERVISIONADO
  // ==========================================
  {
    id: 'bloco1-aprendizado-supervisionado',
    block: 'Bloco I',
    itemCode: 'B1-01',
    title: 'Aprendizado de Máquina Supervisionado & Seleção de Modelos',
    officialWording: 'Regressão e Classificação, incluindo métricas de avaliação. Conceitos como overfitting e underfitting, regularização, seleção de modelos (erro de generalização) e validação cruzada. Divisão de conjuntos de dados em treino, validação e teste. Trade-off entre Variância e Viés. Algoritmos como Regressão Linear e Logística, Árvores de decisão e Random Forests, Máquina de Suporte de Vetores (SVM), Naive Bayes e K-NN. Técnicas de Ensembles. Aprendizado supervisionado com a biblioteca Python scikit-learn. Conceitos de otimização de hiperparâmetros.',
    area: 'Machine Learning',
    relevance: 'Altíssima',
    subtopics: [
      'Problemas de Regressão e Classificação: formulação matemática e funções de perda',
      'Métricas de Classificação: Matriz de Confusão, Acurácia, Precisão, Recall, F1-Score, F-Beta, ROC-AUC, PR-AUC, LogLoss e Brier Score',
      'Métricas de Regressão: MSE, RMSE, MAE, MAPE, R² e R² Ajustado',
      'Overfitting (Alta Variância) vs Underfitting (Alto Viés): diagnóstico via curvas de aprendizado',
      'Trade-off Viés-Variância (Bias-Variance Tradeoff): decomposição analítica do erro quadrático esperado',
      'Técnicas de Regularização: L1 (Lasso / esparsidade), L2 (Ridge / contração proporcional) e ElasticNet',
      'Estratégias de Validação Cruzada: K-Fold, Stratified K-Fold, Leave-One-Out, TimeSeriesSplit e GroupKFold',
      'Regressão Linear Múltipla (MQO / OLS, suposições clássicas de Gauss-Markov) e Regressão Logística (Sigmoide, Log-Odds, Máxima Verossimilhança)',
      'Árvores de Decisão: critérios de divisão (Índice Gini, Entropia / Ganho de Informação, MSE) e pós-poda (Cost-Complexity Pruning)',
      'Random Forests: amostragem Bootstrap, agregação Bagging e subespaço aleatório de features',
      'Ensembles Avançados de Boosting: AdaBoost, Gradient Boosting, XGBoost, LightGBM e CatBoost',
      'Máquina de Vetores de Suporte (SVM): formulação primal/dual, margem suave (C), vetores de suporte e Kernel Trick (Linear, Polinomial, RBF/Gaussiano)',
      'Classificador Naive Bayes: suposição de independência condicional, GaussianNB, MultinomialNB e BernoulliNB',
      'K-Nearest Neighbors (K-NN): métricas de distância (Euclidiana, Manhattan, Minkowski), ponderação por distância e maldição da dimensionalidade',
      'Pipelines Scikit-Learn: Pipeline, ColumnTransformer, FeatureUnion e prevenção contra vazamento de dados (Data Leakage)',
      'Otimização de Hiperparâmetros: Grid Search, Randomized Search e Otimização Bayesiana com Processos Gaussianos'
    ],
    keyConceptsAndFormulas: [
      {
        name: 'Decomposição do Erro Esperado',
        description: 'O erro de generalização de qualquer estimador decompõe-se na soma do quadrado do viés, da variância do modelo e do ruído irredutível da natureza.',
        formulaOrCode: 'E[(y - f̂(x))²] = [Bias(f̂(x))]² + Var(f̂(x)) + σ²_irredutível'
      },
      {
        name: 'Regularização L1 vs L2',
        description: 'Lasso (L1) adiciona a soma dos valores absolutos dos pesos e zera coeficientes (faz seleção de variáveis). Ridge (L2) adiciona a soma dos quadrados dos pesos e apenas encolhe os coeficientes sem zerá-los.',
        formulaOrCode: 'J_Lasso = MSE + λ ∑|w_j|  |  J_Ridge = MSE + λ ∑w_j²'
      },
      {
        name: 'Curva PR-AUC vs ROC-AUC em Desbalanceamento',
        description: 'Em problemas de anomalia severa (ex: 0,1% de falhas em dutos), ROC-AUC gera uma ilusão de excelência devido ao alto volume de Verdadeiros Negativos. PR-AUC foca exclusivamente nos Positivos.',
        formulaOrCode: 'Precision = TP / (TP + FP)  |  Recall = TP / (TP + FN)  |  FPR = FP / (FP + TN)'
      }
    ],
    cesgranrioExamTraps: [
      'A Cesgranrio adora afirmar que o Ridge Regression é capaz de realizar feature selection automática, o que é FALSO (apenas o Lasso zera coeficientes).',
      'Em Árvores de Decisão, aumentar max_depth e diminuir min_samples_split AUMENTA a variância (risco de overfitting), e não o viés.',
      'No Scikit-Learn, aplicar o fit_transform do Scaler na base INTEIRA antes de fazer o train_test_split é uma falha metodológica grave chamada Data Leakage (vazamento de dados).'
    ],
    transpetroPracticalContext: 'Modelos de manutenção preditiva para detecção de anomalias em bombas centrífugas de oleodutos, previsão de consumo de combustível em navios aliviadores e estimativa do tempo de atracação em terminais marítimos.',
    recommendedStudyStrategy: [
      'Construir um mapa mental comparando Bagging (Random Forest, reduz variância) vs Boosting (XGBoost, reduz viés sequencialmente).',
      'Memorizar as fórmulas de Precisão, Recall, F1 e a matriz de confusão 2x2 com todas as combinações (TP, FP, TN, FN).',
      'Resolver exercícios de cálculo manual de ganho de informação e índice Gini.'
    ]
  },

  // ==========================================
  // BLOCO I - TÓPICO 2: APRENDIZADO NÃO SUPERVISIONADO
  // ==========================================
  {
    id: 'bloco1-aprendizado-nao-supervisionado',
    block: 'Bloco I',
    itemCode: 'B1-02',
    title: 'Aprendizado Não Supervisionado, Clustering & Redução de Dimensionalidade',
    officialWording: 'Redução de dimensionalidade, com foco em PCA (Análise de Componentes Principais). Algoritmos de agrupamento como K-Means e Mistura de Gaussianas.',
    area: 'Machine Learning',
    relevance: 'Altíssima',
    subtopics: [
      'Análise de Componentes Principais (PCA): formulação matemática, cálculo da matriz de covariância, autovalores e autovetores',
      'Critérios de seleção do número de componentes principais: variância explicada acumulada e gráfico de cotovelo (Scree Plot)',
      'Propriedades ortogonais do PCA: componentes principais são linearmente não correlacionados entre si',
      'Algoritmo K-Means: inicialização padrão vs K-Means++, convergência de centróides, cálculo da inércia (WCSS)',
      'Métodos de determinação do número ideal de clusters k: Método do Cotovelo (Elbow Method) e Coeficiente de Silhueta (Silhouette Score)',
      'Mistura de Gaussianas (GMM - Gaussian Mixture Models): agrupamento probabilístico (soft clustering) e Algoritmo de Esperança-Maximização (EM)',
      'DBSCAN (Density-Based Spatial Clustering of Applications with Noise): pontos centrais (core), bordas (border), ruído (noise), parâmetros eps e min_samples',
      'Clustering Hierárquico: estratégias aglomerativa e divisiva, métodos de ligação (Single Linkage, Complete Linkage, Average Linkage, Ward) e leitura de dendrogramas',
      'Técnicas modernas de projeção não-linear de baixa dimensão: t-SNE (t-Distributed Stochastic Neighbor Embedding) e UMAP'
    ],
    keyConceptsAndFormulas: [
      {
        name: 'PCA e Autovetores da Matriz de Covariância',
        description: 'Os autovetores da matriz de covariância definem as direções de máxima variância (eixos ortogonais), e os autovalores correspondentes quantificam a variância explicada por cada componente.',
        formulaOrCode: 'C · v_i = λ_i · v_i  |  Variância Explicada = λ_i / ∑ λ_j'
      },
      {
        name: 'Coeficiente de Silhueta (Silhouette Coefficient)',
        description: 'Mede o quão próximo cada ponto está de seu próprio cluster (a(i)) em comparação com o cluster mais próximo (b(i)). Varia de -1 a +1.',
        formulaOrCode: 's(i) = [ b(i) - a(i) ] / max(a(i), b(i))  |  s ≈ +1: bem agrupado; s ≈ -1: atribuído ao cluster errado'
      }
    ],
    cesgranrioExamTraps: [
      'A Cesgranrio costuma testar se o candidato sabe que o K-Means falha ao agrupar dados em formatos côncavos, anulares ou com densidades heterogêneas (onde o DBSCAN é superior).',
      'O PCA é sensível à escala dos atributos: aplicar PCA sem padronizar previamente as variáveis com StandardScaler faz com que a variável com maior magnitude numérica domine indevidamente o primeiro componente principal.',
      'No GMM, cada ponto recebe uma probabilidade de pertencer a cada componente gaussiano (soft clustering), enquanto no K-Means a atribuição é rígida (hard clustering).'
    ],
    transpetroPracticalContext: 'Segmentação de perfis operacionais de frotas de navios petroleiros, identificação de regimes anômalos de bombeamento e agrupamento geoespacial de trajetórias de embarcações para otimização de berços.',
    recommendedStudyStrategy: [
      'Estudar detalhadamente a questão oficial da Petrobras sobre PCA e autovalores.',
      'Saber desenhar o funcionamento do algoritmo EM (fase E calcula probabilidades a posteriori; fase M atualiza médias, covariâncias e pesos).'
    ]
  },

  // ==========================================
  // BLOCO I - TÓPICO 3: REDES NEURAIS & DEEP LEARNING
  // ==========================================
  {
    id: 'bloco1-redes-neurais-deep-learning',
    block: 'Bloco I',
    itemCode: 'B1-03',
    title: 'Redes Neurais Artificiais, Deep Learning & Frameworks (PyTorch / Keras)',
    officialWording: 'Treino de modelos com bibliotecas Python como Keras e Pytorch. Redes neurais artificiais, MLP, convolucionais e recorrentes.',
    area: 'Deep Learning',
    relevance: 'Alta',
    subtopics: [
      'Neurônio de McCulloch-Pitts e Perceptron simples: limitações de linearidade (problema do XOR)',
      'Perceptron Multicamadas (MLP): camadas de entrada, ocultas e de saída, teorema da aproximação universal',
      'Funções de Ativação: Sigmoide, Tangente Hiperbólica (Tanh), ReLU (Rectified Linear Unit), Leaky ReLU, ELU e Softmax para saídas multicasse',
      'Algoritmo Backpropagation: derivação pela regra da cadeia, cálculo dos deltas de erro e atualização de pesos',
      'Otimizadores Estocásticos: SGD (Stochastic Gradient Descent), Momentum, Nesterov, RMSprop e Adam (Adaptive Moment Estimation)',
      'Problemas de Treinamento em Redes Profundas: Desvanecimento do Gradiente (Vanishing Gradient) e Explosão do Gradiente (Exploding Gradient)',
      'Técnicas de Regularização em Redes Neurais: Dropout, Regularização L1/L2 (Weight Decay), Early Stopping e Normalização em Lote (Batch Normalization)',
      'Redes Neurais Convolucionais (CNNs): operação de convolução 2D/1D, kernels/filtros, stride, padding (valid vs same), camadas de pooling (Max Pooling, Average Pooling)',
      'Redes Neurais Recorrentes (RNNs): loops temporais, problemas de dependência de longo prazo, LSTM (portas de esquecimento, entrada e saída, estado da célula) e GRU',
      'Treinamento e inferência prática com PyTorch (Tensors, autograd, nn.Module, DataLoader, Optimizer, loop de treino) e Keras/TensorFlow'
    ],
    keyConceptsAndFormulas: [
      {
        name: 'Função ReLU vs Sigmoide',
        description: 'ReLU resolve o problema do desvanecimento do gradiente nas regiões positivas pois sua derivada é constante e igual a 1, enquanto a sigmoide satura em valores extremos com derivada próxima de 0.',
        formulaOrCode: 'ReLU(x) = max(0, x)  |  d/dx ReLU(x) = 1 para x > 0, 0 para x < 0'
      },
      {
        name: 'Batch Normalization',
        description: 'Normaliza as ativações de cada camada oculta para média zero e variância unitária durante o mini-batch, acelerando drasticamente o treinamento e reduzindo a dependência da inicialização.',
        formulaOrCode: 'x̂_i = (x_i - μ_B) / √(σ²_B + ε)  |  y_i = γ · x̂_i + β'
      }
    ],
    cesgranrioExamTraps: [
      'A Cesgranrio costuma perguntar sobre o papel do Dropout: durante a fase de TESTE / INFERÊNCIA, o Dropout é DESATIVADO e as ativações são escalonadas pelo fator de probabilidade p.',
      'Cuidado com a função Softmax: a soma de todas as saídas é rigorosamente igual a 1.0, servindo como uma distribuição de probabilidade multicasse.',
      'Na CNN, aplicar um filtro 3x3 com stride 1 e sem padding (valid padding) em uma imagem 28x28 resulta em uma matriz reduzida de dimensões 26x26.'
    ],
    transpetroPracticalContext: 'Inspeção visual automatizada com CNNs para detecção de corrosão em cascos de navios e estruturas de tanques, e modelos LSTM para previsão de séries temporais de vazão e pressão em gasodutos.',
    recommendedStudyStrategy: [
      'Dominar o fluxo do loop de treino em PyTorch: optimizer.zero_grad() -> outputs = model(inputs) -> loss = criterion(outputs, labels) -> loss.backward() -> optimizer.step().',
      'Entender a função de cada porta interna de uma célula LSTM.'
    ]
  },

  // ==========================================
  // BLOCO I - TÓPICO 4: PROCESSAMENTO DE LINGUAGEM NATURAL
  // ==========================================
  {
    id: 'bloco1-processamento-linguagem-natural',
    block: 'Bloco I',
    itemCode: 'B1-04',
    title: 'Processamento de Linguagem Natural (NLP) & Modelagem de Tópicos',
    officialWording: 'Processamento de Linguagem Natural, representação de texto, Bag-of-Words, TF-IDF, Word Embeddings, Transformers e tópicos.',
    area: 'NLP & IA Generativa',
    relevance: 'Alta',
    subtopics: [
      'Pipeline de Pré-processamento de Texto: tokenização, conversão para minúsculas, remoção de pontuação e caracteres especiais',
      'Tratamento de Stop-words: identificação, impacto no vocabulário e quando não devem ser removidas (análise de sentimento/negação)',
      'Normalização Lexical: Stemming (algoritmos heurísticos baseados em sufixos como Porter/RSLP) vs Lemmatização (análise morfológica com dicionário/POS-tag)',
      'Modelos de Bag of Words (BoW) e N-Grams (unigramas, bigramas, trigramas)',
      'TF-IDF (Term Frequency - Inverse Document Frequency): formulação matemática e ponderação por raridade no corpus',
      'Word Embeddings densos: Word2Vec (arquitetura CBOW - Continuous Bag of Words vs Skip-Gram com Negative Sampling)',
      'Embeddings pré-treinados: GloVe (coocorrência global) e FastText (embeddings baseados em subpalavras para lidar com palavras fora do vocabulário)',
      'Modelagem de Tópicos: LDA (Latent Dirichlet Allocation) como modelo probabilístico generativo',
      'Noções de Arquitetura Transformer: mecanismo de autoatenção (Self-Attention), Multi-Head Attention e modelos pré-treinados (BERT bidirecional vs GPT autorregressivo)'
    ],
    keyConceptsAndFormulas: [
      {
        name: 'TF-IDF e Palavras Universais',
        description: 'Se um termo ocorre em todos os N documentos de uma base (Document Frequency DF = N), o termo IDF = log(N / N) = log(1) = 0, zerando seu valor de TF-IDF.',
        formulaOrCode: 'TF(t, d) = f_t,d / ∑ f_t\',d  |  IDF(t, D) = log( |D| / |{d ∈ D : t ∈ d}| )  |  TF-IDF = TF × IDF'
      },
      {
        name: 'CBOW vs Skip-Gram no Word2Vec',
        description: 'CBOW prevê a palavra-alvo com base nas palavras do contexto ao redor (mais rápido, ideal para termos frequentes). Skip-Gram prevê as palavras do contexto a partir da palavra central (melhor para palavras raras e vocabulários extensos).',
        formulaOrCode: 'CBOW: P(w_t | w_{t-c}, ..., w_{t+c})  |  Skip-Gram: P(w_{t+j} | w_t)'
      }
    ],
    cesgranrioExamTraps: [
      'A Cesgranrio costuma colocar pegadinhas com palavras que aparecem em TODOS os documentos: o TF-IDF é rigorosamente zero, pois a palavra não tem poder discriminante.',
      'Stemming pode gerar palavras inexistentes na língua ("comput" para computador e computação), enquanto a Lemmatização sempre retorna um lema válido do dicionário.',
      'O mecanismo de Autoatenção nos Transformers calcula a compatibilidade entre Query (Q) e Key (K) escalonado pela raiz da dimensão d_k.'
    ],
    transpetroPracticalContext: 'Mineração e classificação automatizada de milhares de relatórios de incidentes operacionais da frota naval e análise textual de termos de contratação e especificações técnicas de suprimentos.',
    recommendedStudyStrategy: [
      'Memorizar a fórmula exata do TF-IDF e resolver a questão histórica da Petrobras onde o IDF é nulo.',
      'Comparar numa tabela resumo: BoW vs TF-IDF vs Word2Vec vs BERT.'
    ]
  },

  // ==========================================
  // BLOCO II - TÓPICO 1: ÁLGEBRA LINEAR & NUMPY
  // ==========================================
  {
    id: 'bloco2-algebra-linear-numpy',
    block: 'Bloco II',
    itemCode: 'B2-01',
    title: 'Fundamentos Matemáticos, Álgebra Linear para Ciência de Dados & Python NumPy',
    officialWording: 'Notação e operações com vetores e matrizes (produto escalar, produto vetorial, identidade, inversa, transposta), transformações lineares, normas (L1, L2), autovalores e autovetores, decomposição SVD e operações matriciais com Python Numpy.',
    area: 'Matemática & Computação',
    relevance: 'Altíssima',
    subtopics: [
      'Vetores e Matrizes no R^n: soma, multiplicação por escalar, produto matricial e propriedades algébricas',
      'Produto Escalar (Dot Product): significado geométrico, projeção de vetores, ortogonalidade e teste de independência',
      'Matrizes Especiais: Matriz Identidade, Transposta, Simétrica, Diagonal, Ortogonal e Matriz Inversa (condição det(A) ≠ 0)',
      'Determinante e Traço de uma matriz: propriedades fundamentais (traço = soma dos autovalores; det = produto dos autovalores)',
      'Transformações Lineares: matrizes como operadores de rotação, cisalhamento, reflexão e projeção',
      'Normas Vetoriais e Matriciais: Norma L1 (Manhattan), Norma L2 (Euclidiana), Norma infinito (L_inf) e Norma de Frobenius',
      'Autovalores e Autovetores: equação característica det(A - λI) = 0, multiplicidade algébrica e geométrica',
      'Diagonalização de Matrizes Simétricas: Teorema Espectral e decomposição A = Q · Λ · Q^T',
      'Decomposição em Valores Singulares (SVD): A = U · Σ · V^T para matrizes retangulares e aproximação de baixo posto (Teorema de Eckart-Young)',
      'Decomposição de Cholesky: A = L · L^T para matrizes simétricas e estritamente positivas definidas',
      'Computação Científica com NumPy: arrays ndarray, tipos de dados (dtypes), indexação, fatiamento (slicing) com limites exclusivos',
      'Mecanismo de Broadcasting em NumPy: regras de expansão automática de dimensões menores para operações elemento a elemento',
      'Módulo numpy.linalg: cálculo de determinantes (np.linalg.det), inversas (np.linalg.inv), autovalores (np.linalg.eig) e resolução de sistemas lineares (np.linalg.solve)'
    ],
    keyConceptsAndFormulas: [
      {
        name: 'Equação Fundamental de Autovalores',
        description: 'Um vetor não-nulo v é autovetor de A se sua transformação por A resultar apenas em um escalonamento por λ.',
        formulaOrCode: 'A · v = λ · v  ⇔  (A - λ · I) · v = 0  ⇒  det(A - λ · I) = 0'
      },
      {
        name: 'Decomposição em Valores Singulares (SVD)',
        description: 'Qualquer matriz real m x n pode ser decomposta no produto de uma matriz ortogonal U (vetores singulares à esquerda), uma matriz diagonal Σ (valores singulares) e uma matriz ortogonal V^T (vetores singulares à direita).',
        formulaOrCode: 'A_{m × n} = U_{m × m} · Σ_{m × n} · V^T_{n × n}'
      },
      {
        name: 'Regras de Broadcasting no NumPy',
        description: 'Duas dimensões são compatíveis quando são iguais ou quando uma delas é 1. Se os arrays tiverem números diferentes de dimensões, dimensões de tamanho 1 são adicionadas à esquerda do array menor.',
        formulaOrCode: 'Array 1: (5, 1, 3) + Array 2: (4, 3) -> Dimensões resultantes: (5, 4, 3)'
      }
    ],
    cesgranrioExamTraps: [
      'Na Decomposição de Cholesky (A = L · L^T), a matriz A PRECISA ser simétrica e positiva definida. Se o determinante for nulo ou houver autovalores negativos, a decomposição não existe.',
      'No fatiamento de matrizes NumPy (ex: arr[1:4, 2:5]), o limite superior NÃO é incluído. A Cesgranrio cobra o tamanho exato da submatriz resultante.',
      'O produto de matrizes A @ B só é possível se o número de colunas de A for igual ao número de linhas de B.'
    ],
    transpetroPracticalContext: 'Modelagem da propagação de ondas e análise modal de tensões em dutos submarinos, compressão de imagens de sensores de sonar e redução de ruído em dados sísmicos usando SVD.',
    recommendedStudyStrategy: [
      'Resolver cálculos manuais de determinantes de matrizes 3x3 (regra de Sarrus) e autovalores de matrizes 2x2.',
      'Praticar no interpretador Python as regras de slicing e broadcasting do NumPy.'
    ]
  },

  // ==========================================
  // BLOCO II - TÓPICO 2: CÁLCULO DIFERENCIAL & OTIMIZAÇÃO
  // ==========================================
  {
    id: 'bloco2-calculo-otimizacao',
    block: 'Bloco II',
    itemCode: 'B2-02',
    title: 'Cálculo Diferencial, Vetor Gradiente & Otimização Numérica',
    officialWording: 'Cálculo: inclui pré-cálculo com conjuntos, coordenadas cartesianas, cônicas e produtos notáveis. Derivadas, derivadas parciais, gradiente, Hessiana e otimização.',
    area: 'Matemática & Cálculo',
    relevance: 'Alta',
    subtopics: [
      'Fundamentos: funções reais, limites fundamentais, continuidade e regras básicas de derivação (potência, produto, quociente)',
      'Regra da Cadeia para funções compostas de uma e de múltiplas variáveis',
      'Derivadas Parciais de primeira e segunda ordens: interpretação física e Teorema de Schwarz (simetria das derivadas cruzadas)',
      'Vetor Gradiente (∇f): definição, direção de máxima taxa de crescimento e ortogonalidade às curvas de nível',
      'Matriz Hessiana (H): matriz de derivadas de segunda ordem, concavidade, convexidade e teste da segunda derivada',
      'Pontos Críticos: determinação analítica (∇f = 0) e classificação em ponto de mínimo local, máximo local ou ponto de sela',
      'Otimização Matemática em Aprendizado de Máquina: formulação de funções de custo convexas vs não-convexas',
      'Algoritmo do Gradiente Descendente (Gradient Descent): fórmula de atualização iterativa, taxa de aprendizado (learning rate)',
      'Variações do Gradiente Descendente: Batch Gradient Descent, Mini-Batch e Stochastic Gradient Descent (SGD)',
      'Otimização com Restrições: método dos Multiplicadores de Lagrange e condições KKT (Karush-Kuhn-Tucker)'
    ],
    keyConceptsAndFormulas: [
      {
        name: 'Vetor Gradiente e Atualização de Pesos',
        description: 'O gradiente aponta no sentido de maior subida da função; portanto, para minimizar a função de custo J(θ), caminhamos no sentido oposto.',
        formulaOrCode: '∇f(x, y) = [ ∂f/∂x, ∂f/∂y ]^T  |  θ_{t+1} = θ_t - η · ∇J(θ_t)'
      },
      {
        name: 'Classificação de Pontos Críticos pela Matriz Hessiana',
        description: 'Se H for positiva definida (todos autovalores > 0), o ponto crítico é um MÍNIMO local. Se H for negativa definida, é um MÁXIMO local. Se houver autovalores positivos e negativos, é um PONTO DE SELA.',
        formulaOrCode: 'H = [ ∂²f/∂x²  ∂²f/∂x∂y ; ∂²f/∂y∂x  ∂²f/∂y² ]  |  det(H) > 0 e f_xx > 0 ⇒ Mínimo'
      }
    ],
    cesgranrioExamTraps: [
      'A Cesgranrio costuma pedir para identificar se uma função é estritamente crescente ou decrescente em um intervalo a partir do sinal da primeira derivada f\'(t).',
      'Cuidado com funções multivariáveis: ter derivadas parciais nulas ∂f/∂x = 0 e ∂f/∂y = 0 é condição necessária, mas NÃO suficiente para garantir que o ponto é de mínimo (pode ser ponto de sela).',
      'Taxa de aprendizado η excessivamente alta causa divergência da função de custo em vez de convergência.'
    ],
    transpetroPracticalContext: 'Otimização das pressões nas estações de compressão de gás natural para minimizar o gasto energético com compressores turbinados respeitando os limites de vazão operacional.',
    recommendedStudyStrategy: [
      'Resolver as questões oficiais do concurso da Petrobras 2021 sobre cálculo de derivadas parciais e mínimos locais.',
      'Revisar a classificação de cônicas e o teste do determinante da Hessiana.'
    ]
  },

  // ==========================================
  // BLOCO II - TÓPICO 3: PROBABILIDADE & ESTATÍSTICA
  // ==========================================
  {
    id: 'bloco2-probabilidade-estatistica',
    block: 'Bloco II',
    itemCode: 'B2-03',
    title: 'Probabilidade, Distribuições, Inferência Estatística & Testes de Hipóteses',
    officialWording: 'Conceitos de probabilidade (modelo, probabilidade condicional, independência, variáveis aleatórias, esperança, variância e covariância). Distribuições contínuas e discretas (Normal, t-Student, Poisson, Exponencial, Binomial, Dirichlet). Distribuições multidimensionais e matriz de covariância. Estatísticas descritivas e inferência estatística (Teorema do Limite Central, Teste de Hipótese e Intervalo de Confiança, Estimador de Máxima Verossimilhança, Inferência Bayesiana). Coeficiente de correlação de Pearson. Visualização de dados com histogramas, curvas de frequência e diagramas boxplot. Avaliação de outliers.',
    area: 'Estatística & Probabilidade',
    relevance: 'Altíssima',
    subtopics: [
      'Conceitos Fundamentais: Espaço Amostral, Eventos mutuamente exclusivos, Axiomas da Probabilidade',
      'Probabilidade Condicional, Independência Estocástica, Lei da Probabilidade Total e Teorema de Bayes',
      'Variáveis Aleatórias Discretas e Contínuas: Função de Probabilidade, Função Densidade de Probabilidade (FDP) e Função de Distribuição Acumulada (FDA)',
      'Momentos Estatísticos: Esperança E[X], Variância Var(X), Desvio Padrão, Covariância Cov(X, Y) e Propriedades da Variância de Somas',
      'Distribuições Discretas: Bernoulli, Binomial, Poisson (processo de contagem no tempo/espaço), Geométrica e Hipergeométrica',
      'Distribuições Contínuas: Uniforme, Normal / Gaussiana, Normal Padronizada Z, t de Student, Qui-Quadrado (χ²), F de Snedecor, Exponencial e Distribuição de Dirichlet',
      'Estatística Descritiva: Medidas de Tendência Central (Média, Mediana, Moda), Medidas de Dispersão (Amplitude, Variância, Desvio Padrão, Coeficiente de Variação) e Assimetria (Skewness)',
      'Visualização e Detecção de Outliers: Diagrama Boxplot, Primeiro Quartil (Q1), Terceiro Quartil (Q3), Intervalo Interquartil (IQR) e Limites de Tukey [Q1 - 1.5*IQR, Q3 + 1.5*IQR]',
      'Teorema Central do Limite (TCL): distribuição da média amostral para amostras grandes (n ≥ 30) independentemente da distribuição populacional',
      'Estimação Pontual e Métodos de Estimação: Estimador de Máxima Verossimilhança (MLE - Maximum Likelihood Estimation) e Método dos Momentos',
      'Intervalos de Confiança (IC): interpretação correta, IC para a média populacional com variância conhecida (Z) e desconhecida (t-Student)',
      'Testes de Hipóteses: Hipótese Nula (H0) vs Alternativa (H1), Nível de Significância (α), Erro Tipo I (falso positivo), Erro Tipo II (β, falso negativo), Poder do Teste (1 - β)',
      'Conceito rigoroso de p-valor (valor-p) e regra de decisão estatística (p ≤ α)',
      'Testes Paramétricos: Teste Z, Teste t para uma amostra, Teste t para amostras independentes e emparelhadas, Teste F e Análise de Variância (ANOVA)',
      'Testes Não-Paramétricos e Testes A/B: Teste Qui-Quadrado de Aderência e Independência, Mann-Whitney, Wilcoxon e dimensionamento amostral de Testes A/B'
    ],
    keyConceptsAndFormulas: [
      {
        name: 'Teorema de Bayes',
        description: 'Atualização da probabilidade da hipótese A dado o evento observado B utilizando a verossimilhança e a probabilidade a priori.',
        formulaOrCode: 'P(A|B) = [ P(B|A) · P(A) ] / P(B)  |  P(B) = ∑ P(B|A_i) · P(A_i)'
      },
      {
        name: 'Teorema Central do Limite (TCL)',
        description: 'A distribuição das médias amostrais aproxima-se de uma normal com média igual à média populacional μ e desvio padrão igual ao erro padrão da média σ/√n.',
        formulaOrCode: 'X̄ ~ N( μ, σ² / n )  |  Z = ( X̄ - μ ) / ( σ / √n )'
      },
      {
        name: 'Detecção de Outliers pelo Boxplot (Critério de Tukey)',
        description: 'Qualquer ponto além dos limites inferior e superior é considerado valor atípico (outlier).',
        formulaOrCode: 'IQR = Q3 - Q1  |  Limite Inferior = Q1 - 1.5 · IQR  |  Limite Superior = Q3 + 1.5 · IQR'
      }
    ],
    cesgranrioExamTraps: [
      'A Cesgranrio AMA cobrar a interpretação de Assimetria: se a cauda da distribuição é alongada para a direita (assimetria positiva), a relação é Média > Mediana > Moda. Se for alongada para a esquerda, Média < Mediana.',
      'O p-valor NÃO mede a probabilidade de H0 ser verdadeira. Ele mede a probabilidade de obter uma estatística amostral tão ou mais extrema que a observada, ASSUMINDO que H0 seja verdadeira.',
      'O desvio padrão de uma variável padronizada pelo Z-Score (z = (x - μ)/σ) é rigorosamente 1, e sua média é rigorosamente ZERO.'
    ],
    transpetroPracticalContext: 'Análise de confiabilidade estrutural de válvulas e dutos sob distribuição de Weibull e Poisson, testes de significância para avaliar aditivos de redução de atrito e testes A/B em dashboards logísticos.',
    recommendedStudyStrategy: [
      'Revisar a prova da Petrobras 2021/2022 com especial atenção para os itens de TCL, assimetria de gráficos e regressão MQO.',
      'Construir tabela comparativa dos testes estatísticos: quando usar Teste Z, Teste t, ANOVA ou Qui-Quadrado.'
    ]
  },

  // ==========================================
  // BLOCO II - TÓPICO 4: ESTRUTURAS DE DADOS & ALGORITMOS
  // ==========================================
  {
    id: 'bloco2-estruturas-dados-algoritmos',
    block: 'Bloco II',
    itemCode: 'B2-04',
    title: 'Estruturas de Dados, Análise de Algoritmos & Notação Assintótica (Big-O)',
    officialWording: 'Estrutura de Dados: complexidade de algoritmos e notação assintótica (Big O). Arrays, listas, pilhas, filas, tabelas hash, árvores e grafos.',
    area: 'Ciência da Computação',
    relevance: 'Alta',
    subtopics: [
      'Notação Assintótica: Big-O (limite superior), Ômega (limite inferior) e Theta (limite justo)',
      'Classes de Complexidade de Tempo e Espaço: O(1), O(log n), O(n), O(n log n), O(n²), O(2^n) e O(n!)',
      'Estruturas Lineares: Vetores (Arrays dinâmicos), Listas Encadeadas (simples e duplamente encadeadas) e custo de inserção/busca',
      'Pilhas (LIFO - Last In First Out) e Filas (FIFO - First In First Out): operações push, pop, enqueue, dequeue e aplicações',
      'Tabelas Hash (Hash Maps / Dicionários): funções hash, resolução de colisões (encadeamento vs endereçamento aberto) e custo médio O(1)',
      'Árvores Binárias de Busca (BST): travessias (em-ordem, pré-ordem, pós-ordem), altura da árvore e balanceamento (Árvores AVL e Rubro-Negras)',
      'Heaps Binários (Min-Heap e Max-Heap): filas de prioridade e algoritmo Heapsort',
      'Algoritmos Clássicos de Busca: Busca Linear O(n) vs Busca Binária O(log n) em coleções ordenadas',
      'Algoritmos de Ordenação: Quicksort (pivoteamento, pior caso O(n²), médio O(n log n)), Mergesort (estável, O(n log n) no tempo) e Insertion Sort',
      'Conceitos fundamentais de Teoria dos Grafos: representação por matriz de adjacência vs listas de adjacência, busca em largura (BFS) e em profundidade (DFS)'
    ],
    keyConceptsAndFormulas: [
      {
        name: 'Comparação Assintótica de Complexidade',
        description: 'Ordem de crescimento das funções de complexidade temporal:',
        formulaOrCode: 'O(1) < O(log n) < O(n) < O(n log n) < O(n²) < O(2^n)'
      },
      {
        name: 'Busca Binária vs Busca Linear',
        description: 'A busca binária divide o espaço de busca pela metade a cada iteração, exigindo que a coleção esteja estritamente ordenada.',
        formulaOrCode: 'T(n) = T(n/2) + O(1)  ⇒  Complexidade: O(log n)'
      }
    ],
    cesgranrioExamTraps: [
      'A Cesgranrio costuma perguntar a complexidade da busca em tabela hash: no caso MÉDIO é O(1), mas no PIOR CASO (todas as chaves colidindo na mesma posição) degrada para O(n).',
      'O Quicksort no pior caso (array já ordenado com escolha ingênua do primeiro elemento como pivô) é O(n²), enquanto o Mergesort garante O(n log n) mesmo no pior caso à custa de memória auxiliar O(n).'
    ],
    transpetroPracticalContext: 'Otimização de índices de busca em telemetria em tempo real, roteamento de fluxo em malhas de oleodutos (algoritmos de menor caminho em grafos) e filas de despacho de petroleiros.',
    recommendedStudyStrategy: [
      'Dominar o cálculo assintótico pelo método de substituição e pelo Teorema Mestre.',
      'Saber de memória as tabelas de complexidade de tempo (melhor, médio e pior caso) de ordenação e busca.'
    ]
  },

  // ==========================================
  // BLOCO II - TÓPICO 5: MANIPULAÇÃO COM PYTHON PANDAS
  // ==========================================
  {
    id: 'bloco2-pandas-manipulacao',
    block: 'Bloco II',
    itemCode: 'B2-05',
    title: 'Manipulação, Tratamento & Engenharia de Dados com Python Pandas',
    officialWording: 'Manipulação de dataframes com Python Pandas, incluindo leitura de dados tabulares, seleção de linhas e colunas, agregação, preenchimento de valores faltantes, remoção de duplicados e junção de dataframes.',
    area: 'Engenharia de Dados & Python',
    relevance: 'Altíssima',
    subtopics: [
      'Estruturas Fundamentais: pd.Series (unidimensional com índice) e pd.DataFrame (bidimensional heterogêneo)',
      'Leitura e Escrita de Dados: read_csv, read_parquet, read_excel, read_json, to_csv, to_parquet com controle de separadores e encodings',
      'Indexação e Seleção de Dados: indexação posicional .iloc vs indexação baseada em rótulos .loc, e método .query()',
      'Filtragem Booleana com operadores bitwise (& para AND, | para OR, ~ para NOT) e fatiamento avançado',
      'Tratamento de Valores Ausentes: isna(), notna(), dropna() com parâmetros how/thresh/subset, fillna() com estatísticas (média, mediana, bfill, ffill)',
      'Remoção de Duplicatas: duplicated() e drop_duplicates(subset=..., keep="first"/"last"/False)',
      'Transformações de Colunas: métodos .apply(), .map(), .applymap() (substituído por .map), vetorização com .str e .dt',
      'Agregações e Agrupamentos: groupby(), métodos de agregação .agg(), .transform(), .filter() e criação de tabelas dinâmicas com pivot_table() e melt()',
      'Junções de DataFrames: pd.merge() (inner, left, right, outer, cross joins com chaves on/left_on/right_on) e pd.concat() ao longo dos eixos axis=0 e axis=1',
      'Manipulação de Séries Temporais: conversão pd.to_datetime, definição de DatetimeIndex, resampling com .resample() e cálculos com janelas móveis .rolling()'
    ],
    keyConceptsAndFormulas: [
      {
        name: 'Diferença Crítica entre .loc e .iloc',
        description: '.loc seleciona por rótulos/nomes e INCLUI o ponto final do intervalo. .iloc seleciona por índices inteiros base 0 e EXCLUI o ponto final do intervalo.',
        formulaOrCode: 'df.loc["a":"c", :] -> inclui "c"  |  df.iloc[0:3, :] -> inclui índices 0, 1 e 2 (exclui o 3)'
      },
      {
        name: 'pd.merge() vs pd.concat()',
        description: 'merge() realiza joins relacionais baseados em chaves compartilhadas (semelhante ao SQL JOIN). concat() apenas empilha dataframes ao longo do eixo vertical (linhas, axis=0) ou horizontal (colunas, axis=1).',
        formulaOrCode: 'pd.merge(df1, df2, on="id_duto", how="left")  |  pd.concat([df1, df2], axis=0)'
      }
    ],
    cesgranrioExamTraps: [
      'A Cesgranrio adora colocar trechos de código em Python perguntando o resultado: esquecer os parênteses em filtros compostos (ex: df[(df["temp"] > 80) & (df["pressao"] < 50)]) gera TypeError.',
      'O método groupby sem uma função de agregação retorna um objeto gerador DataFrameGroupBy, não um DataFrame materializado.',
      'Atenção ao inplace=True: quando utilizado, a operação modifica o dataframe original e retorna None; atribuir df = df.dropna(inplace=True) destrói a variável tornando-a None.'
    ],
    transpetroPracticalContext: 'Limpeza e padronização de registros de telemetria SCADA de oleodutos, união de logs de carregamento de navios com dados meteorológicos e consolidação de indicadores de movimentação portuária.',
    recommendedStudyStrategy: [
      'Praticar intensamente exercícios com códigos curtos de Pandas prevendo a saída de prints.',
      'Memorizar as regras de merge e concatenação horizontal vs vertical.'
    ]
  },

  // ==========================================
  // BLOCO II - TÓPICO 6: BIG DATA & SISTEMAS DISTRIBUÍDOS
  // ==========================================
  {
    id: 'bloco2-bigdata-sistemas-distribuidos',
    block: 'Bloco II',
    itemCode: 'B2-06',
    title: 'Conceitos de Big Data, Ecossistema Hadoop, Apache Spark & Data Lakehouse',
    officialWording: 'Conceitos de Big Data: conceitos gerais de Hadoop (HDFS, MapReduce, YARN e Spark) e armazenamento orientado a objeto (object store). Data Lake, Lakehouse e formatos colunares.',
    area: 'Engenharia de Dados & Big Data',
    relevance: 'Altíssima',
    subtopics: [
      'Conceitos Fundamentais dos 5 Vs de Big Data: Volume, Velocidade, Variedade, Veracidade e Valor',
      'Arquitetura Apache Hadoop: HDFS (Hadoop Distributed File System), NameNode (metadados), DataNodes (blocos de dados, fator de replicação padrão = 3)',
      'Paradigma MapReduce: funções Map, fase intermediária de Shuffle & Sort e função Reduce, limitações de I/O em disco',
      'YARN (Yet Another Resource Negotiator): ResourceManager, NodeManager e ApplicationMaster para orquestração de recursos no cluster',
      'Apache Spark e Computação em Memória: arquitetura com Driver Program, Cluster Manager (YARN/K8s/Standalone) e Executors',
      'Abstrações do Spark: RDDs (Resilient Distributed Datasets), DataFrames e Datasets (PySpark)',
      'Transformações vs Ações no Spark: Avaliação Preguiçosa (Lazy Evaluation), Grafo Acíclico Dirigido (DAG) e Otimizador Catalyst',
      'Transformações Estreitas (Narrow: map, filter) vs Transformações Amplas (Wide: groupByKey, reduceByKey, join, distinct com Shuffle na rede)',
      'Otimização em PySpark: particionamento de dados, Broadcast Hash Join para tabelas pequenas e persistência em memória/disco (cache() e persist())',
      'Armazenamento Orientado a Objetos (Object Store): AWS S3, Google Cloud Storage, Azure Blob e MinIO (imutabilidade, buckets e consistência eventual vs forte)',
      'Formatos de Arquivos Analíticos: Formatos orientados a linha (CSV, JSON, Apache Avro para streaming) vs Formatos Colunares (Apache Parquet, Apache ORC) com pushdown predicates e compressão de dicionário',
      'Evolução da Arquitetura de Dados: Data Warehouse (modelagem dimensional, schema-on-write) vs Data Lake (baixa governança, schema-on-read) vs Data Lakehouse (Delta Lake / Apache Iceberg com garantias ACID e Time-Travel)'
    ],
    keyConceptsAndFormulas: [
      {
        name: 'Transformações Narrow vs Wide no Apache Spark',
        description: 'Narrow transformations operam localmente em cada partição sem tráfego de rede (sem shuffle). Wide transformations exigem a redistribuição de dados por chaves entre diferentes nós executores através da rede (Shuffle), sendo o maior gargalo de desempenho.',
        formulaOrCode: 'Narrow: map, filter, flatMap  |  Wide: groupByKey, reduceByKey, join, repartition'
      },
      {
        name: 'Broadcast Join no PySpark',
        description: 'Transmite a tabela menor inteira para todos os executores do cluster, permitindo que o join seja executado como Narrow Transformation eliminando 100% do shuffle.',
        formulaOrCode: 'from pyspark.sql.functions import broadcast\ndf_grande.join(broadcast(df_pequena), "id_sensor")'
      }
    ],
    cesgranrioExamTraps: [
      'Transformações no Apache Spark NÃO processam dados imediatamente. Elas apenas constroem o plano de execução (DAG). Os dados só são realmente computados quando uma AÇÃO (ex: count(), collect(), show(), save()) é invocada.',
      'O HDFS divide os arquivos em blocos de tamanho fixo (tipicamente 128 MB ou 256 MB) replicados em múltiplos DataNodes (tolerância a falhas baseada em hardware comum).',
      'O formato Parquet é superior para cargas de trabalho OLAP analíticas porque permite ler apenas as colunas necessárias sem carregar o registro inteiro da linha.'
    ],
    transpetroPracticalContext: 'Processamento de petabytes de telemetria contínua gerada por sensores instalados ao longo de 14.000 km de malha de dutos e rastreamento em tempo real da posição GPS e rotação de motores da frota naval.',
    recommendedStudyStrategy: [
      'Estudar detalhadamente os itens de HDFS e Spark das provas anteriores da Petrobras.',
      'Saber diferenciar com precisão: RDD vs DataFrame vs Dataset e Delta Lake vs Data Warehouse.'
    ]
  },

  // ==========================================
  // BLOCO II - TÓPICO 7: DEVOPS, CONTAINERS & MLOPS
  // ==========================================
  {
    id: 'bloco2-devops-containers-mlops',
    block: 'Bloco II',
    itemCode: 'B2-07',
    title: 'Conceitos Modernos de TI, Containers (Docker), DevOps & MLOps',
    officialWording: 'Conceitos Modernos de Sistemas de Informação: conceitos de Containers (construção, registro, execução e orquestração). Noções básicas de DevOps (versionamento com git, pipeline e CI/CD). MLOps e ciclo de vida de modelos.',
    area: 'Engenharia de Software & MLOps',
    relevance: 'Alta',
    subtopics: [
      'Conceitos de Virtualização Leve vs Máquinas Virtuais: Kernel compartilhado, isolamento por cgroups e namespaces do Linux',
      'Tecnologia Docker: Imagens Docker, Camadas de Sistema de Arquivos (Copy-on-Write) e Containers em execução',
      'Estrutura de um Dockerfile: instruções FROM, RUN, COPY, WORKDIR, ENV, EXPOSE, CMD vs ENTRYPOINT',
      'Ciclo de Vida do Container: docker build, docker run, docker stop, docker rm, volumes para persistência e redes isoladas',
      'Conceitos de Registros de Containers (Container Registries: Docker Hub, ECR, GCR) e Orquestração (noções de Kubernetes: Pods, Services, Deployments)',
      'Controle de Versão com Git: modelo distribuído, áreas de trabalho (Working Directory, Staging Area / Index, Repositório Local, Remoto)',
      'Comandos Essenciais de Git: git init, git add, git commit, git push, git pull, git branch, git checkout / switch e resolução de conflitos em merge vs rebase',
      'Pipelines de CI/CD (Continuous Integration / Continuous Deployment): estágios de automação de testes, linting, build de artefatos e entrega contínua',
      'Ciclo de Vida de MLOps: estágios de Desenvolvimento, Rastreamento de Experimentos, Registro de Modelos, Empacotamento, Deploy e Monitoramento',
      'Ferramentas de MLOps: MLflow (Tracking, Projects, Models, Model Registry) e versionamento de dados com DVC (Data Version Control)',
      'Monitoramento de Modelos em Produção: Data Drift (mudança na distribuição estatística de entrada P(X)), Concept Drift (mudança na relação real P(Y|X)) e pipelines de retreinamento contínuo'
    ],
    keyConceptsAndFormulas: [
      {
        name: 'CMD vs ENTRYPOINT no Dockerfile',
        description: 'ENTRYPOINT define o executável imutável que será executado quando o container subir. CMD fornece argumentos padrão que podem ser facilmente substituídos na linha de comando pelo usuário.',
        formulaOrCode: 'ENTRYPOINT ["python", "app.py"]  |  CMD ["--port", "8000"]'
      },
      {
        name: 'Data Drift vs Concept Drift',
        description: 'Data Drift (covariate shift): a distribuição das features de entrada P(X) muda, mas a relação P(Y|X) permanece inalterada. Concept Drift: a relação funcional subjacente P(Y|X) muda (o padrão do negócio mudou).',
        formulaOrCode: 'Data Drift: P_treino(X) ≠ P_produção(X)  |  Concept Drift: P_treino(Y|X) ≠ P_produção(Y|X)'
      }
    ],
    cesgranrioExamTraps: [
      'Git merge vs Git rebase: o merge cria um novo commit de junção preservando todo o histórico não-linear das branches; o rebase reescreve o histórico aplicando os commits linearmente sobre a branch base.',
      'No Docker, cada comando RUN cria uma nova camada imutável na imagem; para reduzir o tamanho da imagem, concatenam-se comandos com && e removem-se caches na mesma instrução.',
      'O DVC não salva os dados volumosos dentro do repositório Git; ele salva ponteiros de metadados (.dvc) no Git e armazena os dados brutos em um storage externo (S3, GCS, etc).'
    ],
    transpetroPracticalContext: 'Empacotamento de modelos de previsão de manutenção em containers padronizados para execução em nós de computação de borda (Edge Computing) instalados a bordo de navios petroleiros com sincronização automática de logs via CI/CD.',
    recommendedStudyStrategy: [
      'Revisar a sintaxe dos comandos básicos do Docker e do Git.',
      'Estudar o ciclo de vida completo do MLflow e as métricas estatísticas para detecção de Data Drift (como teste Kolmogorov-Smirnov e PSI - Population Stability Index).'
    ]
  },

  // ==========================================
  // BLOCO III - TÓPICO 1: GOVERNANÇA & DMBOK
  // ==========================================
  {
    id: 'bloco3-governanca-dmbok',
    block: 'Bloco III',
    itemCode: 'B3-01',
    title: 'Governança de Dados Corporativos, Framework DAMA-DMBOK & Qualidade',
    officialWording: 'Governança de dados, Framework DAMA-DMBOK, gestão da qualidade de dados, metadados e linhagem.',
    area: 'Governança & Gestão de Dados',
    relevance: 'Alta',
    subtopics: [
      'Princípios de Governança de Dados: autoridade, controle, tomada de decisão e valor estratégico do ativo de dados',
      'Modelos de Governança: Centralizado, Descentralizado e Federado (híbrido)',
      'Papéis e Responsabilidades: Data Owner (dono do dado), Data Steward (curador/responsável operacional), Data Custodian (guardião técnico de infraestrutura)',
      'Framework DAMA-DMBOK (Data Management Body of Knowledge): as 11 funções de gerenciamento da Roda do DMBOK',
      'Gestão da Qualidade de Dados (Data Quality): as dimensões clássicas (Acurácia, Completude, Consistência, Tempestividade, Unicidade e Validade)',
      'Gestão de Metadados: Metadados de Negócio (definições, glossário), Técnicos (esquemas, tipos, índices) e Operacionais (logs de execução, linhagem)',
      'Catálogo de Dados Corporativo: busca, descoberta, classificação de dados sensíveis e autocatálogo',
      'Linhagem de Dados (Data Lineage): rastreamento de ponta a ponta da origem, transformações intermediárias e destinos analíticos'
    ],
    keyConceptsAndFormulas: [
      {
        name: 'Dimensões da Qualidade de Dados (DMBOK)',
        description: 'Acurácia (dados corretos frente ao mundo real), Completude (ausência de dados faltantes onde deveriam existir), Consistência (ausência de contradições entre diferentes sistemas) e Tempestividade (disponibilidade no momento certo).',
        formulaOrCode: 'Completude = (Registros Válidos / Total de Registros) × 100%'
      },
      {
        name: 'Data Owner vs Data Steward',
        description: 'Data Owner é o líder da área de negócio com autoridade para definir regras e políticas de acesso aos dados. Data Steward é o profissional que executa a curadoria diária e garante a aderência às políticas de qualidade.',
        formulaOrCode: 'Owner = Autoridade e Decisão  |  Steward = Curadoria e Qualidade'
      }
    ],
    cesgranrioExamTraps: [
      'A Cesgranrio costuma trocar as atribuições do Data Owner com as do Data Custodian (o Custodian cuida da infraestrutura de TI, backup e armazenamento; o Owner é do NEGÓCIO).',
      'Consistência e Acurácia são conceitos distintos: um dado pode ser 100% consistente em vários bancos (todos dizem o mesmo valor), mas estar completamente impreciso/errado em relação à realidade.'
    ],
    transpetroPracticalContext: 'Padronização dos metadados de telemetria dos tanques de armazenamento e rastreabilidade total da linhagem das informações fiscais de transporte de combustíveis enviadas à ANP.',
    recommendedStudyStrategy: [
      'Memorizar as dimensões clássicas de qualidade do DMBOK com exemplos práticos.',
      'Focar nas distinções de papéis de governança em empresas estatais.'
    ]
  },

  // ==========================================
  // BLOCO III - TÓPICO 2: LGPD (LEI 13.709/2018)
  // ==========================================
  {
    id: 'bloco3-lgpd',
    block: 'Bloco III',
    itemCode: 'B3-02',
    title: 'Legislação, Privacidade & LGPD (Lei Geral de Proteção de Dados - Lei nº 13.709/2018)',
    officialWording: 'Lei Geral de Proteção de Dados Pessoais (LGPD - Lei nº 13.709/2018 e alterações). Princípios, bases legais, agentes de tratamento, direitos dos titulares e segurança da informação.',
    area: 'Legislação & Conformidade',
    relevance: 'Altíssima',
    subtopics: [
      'Âmbito de Aplicação da LGPD: operações de tratamento de dados pessoais realizadas no território nacional ou que visem à oferta de bens/serviços',
      'Conceitos Fundamentais: Dado Pessoal (identificado ou identificável), Dado Pessoal Sensível (origem racial, saúde, biometria, etc.) e Tratamento',
      'Distinção Técnica Crítica: Dado Anonimizado (processo técnico irreversível que retira da abrangência da LGPD) vs Dado Pseudonimizado (processo reversível sob custódia de chave)',
      'Os 10 Princípios da LGPD (Art. 6º): Finalidade, Adequação, Necessidade (minimização), Livre Acesso, Qualidade dos Dados, Transparência, Segurança, Prevenção, Não Discriminação e Responsabilização',
      'As 10 Bases Legais para Tratamento de Dados Pessoais Comuns (Art. 7º): Consentimento, Obrigação Legal/Regulatória, Políticas Públicas, Execução de Contratos, Legítimo Interesse, Proteção da Vida, etc.',
      'Bases Legais Restritivas para Dados Pessoais Sensíveis (Art. 11): vedação ao uso de legítimo interesse',
      'Direitos dos Titulares de Dados (Art. 18): confirmação da existência, acesso, correção, anonimização/bloqueio, portabilidade, eliminação e revogação',
      'Agentes de Tratamento: Controlador (toma decisões) e Operador (executa o tratamento em nome do controlador), e responsabilidade civil solidária',
      'Encarregado pelo Tratamento de Dados Pessoais (DPO - Data Protection Officer): funções de canal de comunicação com os titulares e a ANPD',
      'Autoridade Nacional de Proteção de Dados (ANPD): competências, fiscalização e sanções administrativas (advertência, multas de até 2% do faturamento limitada a R$ 50 milhões)',
      'Relatório de Impacto à Proteção de Dados Pessoais (RIPD): obrigatoriedade em tratamentos com base em legítimo interesse ou dados sensíveis'
    ],
    keyConceptsAndFormulas: [
      {
        name: 'Dado Anonimizado vs Dado Pseudonimizado',
        description: 'Dado anonimizado não é considerado dado pessoal para os fins da LGPD, desde que o processo não possa ser revertido utilizando esforços razoáveis. O dado pseudonimizado MANTÉM a qualificação de dado pessoal e continua sob a tutela da lei.',
        formulaOrCode: 'Anonimizado: Irreversível ⇒ Fora da LGPD (Art. 12)  |  Pseudonimizado: Reversível ⇒ Sujeito à LGPD (Art. 13)'
      },
      {
        name: 'Bases Legais mais Cobradas em Empresas Públicas',
        description: 'Empresas públicas e concessionárias utilizam primariamente "Cumprimento de Obrigação Legal ou Regulatória" e "Execução de Contratos", não dependendo exclusivamente de consentimento.',
        formulaOrCode: 'Art. 7º, II (Obrigação Legal) + Art. 7º, V (Execução de Contrato)'
      }
    ],
    cesgranrioExamTraps: [
      'A Cesgranrio costuma colocar que o consentimento é indispensável para qualquer tratamento de dados, o que é FALSO (é apenas uma entre 10 bases legais autônomas).',
      'O Legítimo Interesse NÃO é admitido como base legal para o tratamento de dados pessoais sensíveis (Art. 11).',
      'O Encarregado (DPO) não é um agente de tratamento; os agentes de tratamento são estritamente o Controlador e o Operador.'
    ],
    transpetroPracticalContext: 'Gestão de dados de tripulação de navios, registros biométricos de acesso a terminais e bases de dados de prestadores de serviços marítimos em conformidade com as diretrizes da ANPD.',
    recommendedStudyStrategy: [
      'Ler integralmente os Artigos 1º a 18 da Lei nº 13.709/2018.',
      'Decorar os 10 princípios do Artigo 6º e as diferenças entre dado pessoal comum e dado sensível.'
    ]
  },

  // ==========================================
  // BLOCO III - TÓPICO 3: ÉTICA, XAI & IA RESPONSÁVEL
  // ==========================================
  {
    id: 'bloco3-etica-xai-seguranca',
    block: 'Bloco III',
    itemCode: 'B3-03',
    title: 'Ética, Transparência, Explicabilidade (XAI) & Inteligência Artificial Responsável',
    officialWording: 'Governança, segurança e aplicação responsável de IA. Mitigação de viés algorítmico, explicabilidade (SHAP, LIME), ataques adversariais e segurança em modelos.',
    area: 'IA Responsável & Segurança',
    relevance: 'Alta',
    subtopics: [
      'Princípios de IA Responsável: Equidade (Fairness), Confiabilidade, Privacidade, Inclusão, Transparência e Responsabilização',
      'Tipologia de Vieses Algorítmicos: Viés de Amostragem, Viés Histórico, Viés de Confirmação e Viés de Medição',
      'Métricas de Equidade em Modelos: Paridade Demográfica (Demographic Parity), Igualdade de Oportunidades (Equal Opportunity) e Odds Iguais',
      'Interpretabilidade vs Explicabilidade de Modelos: Modelos intrinsecamente interpretáveis (White-Box: regressão linear, árvores rasas) vs Modelos Caixa-Preta (Black-Box: Deep Learning, Ensembles)',
      'Explainable AI (XAI) - Métodos Pós-Hoc: Abordagens locais (explicação de uma predição individual) vs globais (compreensão geral do modelo)',
      'SHAP (SHapley Additive exPlanations): fundamentação em Teoria dos Jogos Cooperativos (Valores de Shapley), propriedades matemáticas de eficiência e consistência',
      'LIME (Local Interpretable Model-agnostic Explanations): perturbação local de amostras e ajuste de modelo linear localmente ponderado',
      'Ataques Adversariais em Modelos de Machine Learning: perturbações imperceptíveis de entrada (ex: FGSM - Fast Gradient Sign Method)',
      'Ameaças de Segurança em Pipelines de Dados: Envenenamento de Dados (Data Poisoning no treino), Ataques de Inversão de Modelo (reconstrução dos dados de treino) e Extração de Modelo',
      'Boas Práticas de Governança em IA: auditoria contínua de modelos, cartões de modelo (Model Cards) e salvaguardas humanas no ciclo (Human-in-the-Loop)'
    ],
    keyConceptsAndFormulas: [
      {
        name: 'SHAP (Valores de Shapley)',
        description: 'Calcula a contribuição marginal média de cada variável para o resultado final da predição considerando todas as possíveis coalizões de atributos.',
        formulaOrCode: 'ϕ_i = ∑_{S ⊆ F \\ {i}} [ |S|! (|F| - |S| - 1)! / |F|! ] · [ f(S ∪ {i}) - f(S) ]'
      },
      {
        name: 'LIME (Explicabilidade Local)',
        description: 'Aproxima a fronteira de decisão de um modelo complexo em torno de uma instância específica utilizando um modelo substituto interpretável linear.',
        formulaOrCode: 'Explicação(x) = argmin_{g ∈ G} L(f, g, π_x) + Ω(g)'
      }
    ],
    cesgranrioExamTraps: [
      'SHAP baseia-se na teoria dos jogos cooperativos e satisfaz propriedades teóricas fundamentais (eficiência, simetria, dummy e aditividade), enquanto LIME é puramente heurístico e pode gerar explicações ligeiramente instáveis.',
      'Ataque de envenenamento (Data Poisoning) ocorre durante a fase de TREINAMENTO (adulteração dos rótulos/dados); ataques adversariais de evasão ocorrem durante a fase de TESTE/INFERÊNCIA.',
      'Interpretabilidade não depende do tamanho do dataset, mas sim da estrutura do algoritmo (uma árvore com profundidade 50 deixa de ser interpretável mesmo sendo uma árvore).'
    ],
    transpetroPracticalContext: 'Auditoria e explicabilidade dos modelos de ranqueamento de fornecedores e justificativa regulatória perante a ANP para decisões automatizadas de interrupção preventiva de fluxo em dutos.',
    recommendedStudyStrategy: [
      'Compreender a diferença prática entre SHAP Summary Plot (gráfico de abelhas com impacto positivo/negativo) e Waterfall Plot.',
      'Revisar a taxonomia dos ataques cibernéticos a modelos de inteligência artificial.'
    ]
  }
];
