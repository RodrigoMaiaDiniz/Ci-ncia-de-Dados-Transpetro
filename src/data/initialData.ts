import { Question, EssayScenario, Flashcard, TopicProgress } from '../types';
import { REAL_OFFICIAL_QUESTIONS_FOR_SIMULATOR } from './officialExamData';
import { REVISAO_PRA_TORAR_QUESTIONS_FOR_SIMULATOR } from './revisaoPraTorarData';

export const INITIAL_QUESTIONS: Question[] = [
  // --- SIMULADO 01 - REVISÃO PRA TORAR (PROF. THIAGO CAVALCANTI / CESGRANRIO) ---
  ...REVISAO_PRA_TORAR_QUESTIONS_FOR_SIMULATOR,

  // --- QUESTÕES REAIS DA PROVA OFICIAL PETROBRAS / CEBRASPE 2021-2022 ---
  ...REAL_OFFICIAL_QUESTIONS_FOR_SIMULATOR,

  // --- MACHINE LEARNING & DEEP LEARNING ---
  {
    id: 'tp-01',
    topic: 'Machine Learning',
    subtopic: 'Gradient Boosting e Regularização',
    difficulty: 'Difícil',
    statement: `Um cientista de dados da Transpetro está construindo um modelo preditivo baseado em XGBoost para estimar a probabilidade de falha mecânica por cavitação em bombas centrífugas de terminais de oleoduto. Durante a validação, observou-se forte overfitting no conjunto de treino. 

Considerando os hiperparâmetros nativos do XGBoost e a metodologia de regularização, qual conjunto de ajustes de hiperparâmetros atua diretamente na redução da variância e combate ao sobreajuste?`,
    options: [
      { letter: 'A', text: 'Aumentar max_depth, diminuir subsample e fixar learning_rate em 1.0.' },
      { letter: 'B', text: 'Reduzir max_depth, aumentar gamma (min_split_loss) e aumentar os parâmetros reg_alpha (L1) e reg_lambda (L2).' },
      { letter: 'C', text: 'Aumentar colsample_bytree para 1.0 e desativar a regularização L2 (reg_lambda = 0).' },
      { letter: 'D', text: 'Diminuir min_child_weight e aumentar scale_pos_weight de modo irrestrito.' },
      { letter: 'E', text: 'Aumentar o número de n_estimators indefinidamente mantendo learning_rate constante e alta.' },
    ],
    correctAnswer: 'B',
    explanationCorrect: `No XGBoost, para mitigar o sobreajuste (overfitting/alta variância), as práticas recomendadas são:
1. Diminuir 'max_depth' (árvores mais rasas e menos complexas).
2. Aumentar 'gamma' (custo mínimo de perda exigido para realizar nova partição em uma folha).
3. Aumentar 'reg_alpha' (regularização L1 / Lasso nos pesos das folhas) e 'reg_lambda' (regularização L2 / Ridge nos pesos das folhas).
4. Aumentar 'min_child_weight' e usar 'subsample' < 1.0.`,
    distractorAnalysis: [
      { letter: 'A', whyWrong: 'Aumentar max_depth gera árvores mais profundas e learning_rate de 1.0 é extremamente agressivo, agravando o overfitting.' },
      { letter: 'C', whyWrong: 'colsample_bytree = 1.0 usa 100% dos atributos em cada árvore e desativar L2 reduz a penalização da complexidade.' },
      { letter: 'D', whyWrong: 'Diminuir min_child_weight permite que o modelo crie folhas com pouquíssimas instâncias, favorecendo o overfitting.' },
      { letter: 'E', whyWrong: 'Aumentar n_estimators com learning_rate alto faz o boosting memorizar o ruído do treino.' },
    ],
    cesgranrioTip: 'A Cesgranrio cobra frequentemente a relação direta entre regularização L1/L2 (reg_alpha/reg_lambda) e o controle da complexidade das árvores no XGBoost e LightGBM.'
  },
  {
    id: 'tp-02',
    topic: 'Machine Learning',
    subtopic: 'Avaliação em Datasets Altamente Desbalanceados',
    difficulty: 'Médio',
    statement: `Na detecção de vazamentos em dutos de transporte de derivados de petróleo via telemetria acústica, a classe positiva (vazamento real) representa apenas 0,05% das observações de sensores (1 vazamento a cada 2000 leituras normais).

Qual métrica é INADEQUADA para guiar o ajuste do limiar (threshold) e qual métrica é a mais recomendada pela literatura para avaliar o desempenho do classificador neste cenário de extremo desbalanceamento?`,
    options: [
      { letter: 'A', text: 'Inadequada: Acurácia Simples; Recomendada: Curva PR (Precision-Recall AUC / PR-AUC) e F-beta Score com ênfase no Recall.' },
      { letter: 'B', text: 'Inadequada: Recall; Recomendada: Acurácia Global.' },
      { letter: 'C', text: 'Inadequada: F1-Score; Recomendada: ROC-AUC puro sem análise de matriz de confusão.' },
      { letter: 'D', text: 'Inadequada: Precision; Recomendada: Erro Quadrático Médio (MSE).' },
      { letter: 'E', text: 'Inadequada: Especificidade; Recomendada: Coeficiente de Determinação (R²).' },
    ],
    correctAnswer: 'A',
    explanationCorrect: `Em problemas com desbalanceamento severo (0,05% de positivos):
1. A Acurácia é falaciosa (um classificador ingênuo que preveja sempre 'normal' teria 99,95% de acurácia, mas 0% de detecção de vazamentos).
2. A Curva PR-AUC (Área sob a curva Precisão-Recall) foca diretamente na classe minoritária positiva sem ser mascarada pelo número massivo de Verdadeiros Negativos. O F2-Score (F-beta com beta > 1) prioriza o Recall (minimizar vazamentos não detectados).`,
    distractorAnalysis: [
      { letter: 'B', whyWrong: 'Recall é essencial para não perder falsos negativos em segurança operacional.' },
      { letter: 'C', whyWrong: 'F1-Score é muito útil em desbalanceamento; o ROC-AUC tradicional pode parecer otimista devido ao grande volume de TNs.' },
      { letter: 'D', whyWrong: 'MSE é métrica de regressão contínua, não de classificação probabilística binária.' },
      { letter: 'E', whyWrong: 'R² é estritamente para regressão e avaliação de variância explicada.' },
    ],
    cesgranrioTip: 'Quando o enunciado falar de "eventos raros", "fraudes" ou "falhas críticas", a Cesgranrio sempre penaliza a escolha de Acurácia Simples e valoriza PR-AUC, Recall e F-Beta.'
  },
  {
    id: 'tp-03',
    topic: 'Machine Learning',
    subtopic: 'Support Vector Machines (SVM) e Kernel Trick',
    difficulty: 'Difícil',
    statement: `Em um problema de classificação de padrões de vibração espectral não linearmente separáveis para diagnóstico de rolamentos de turbinas a gás da Transpetro, optou-se por utilizar Support Vector Machines (SVM).

A respeito da formulação matemática do SVM, do hiperparâmetro C de regularização (soft margin) e da função de base radial (Kernel RBF: K(x, z) = exp(-gamma * ||x - z||²)), assinale a afirmativa correta:`,
    options: [
      { letter: 'A', text: 'Um valor muito alto de C impõe penalidade rígida a violações de margem, levando a uma margem mais estreita e maior propensão a overfitting.' },
      { letter: 'B', text: 'Aumentar o parâmetro gamma faz com que o raio de influência dos vetores de suporte aumente, resultando em fronteiras de decisão quase lineares e alto viés.' },
      { letter: 'C', text: 'O SVM com Kernel RBF calcula explicitamente as coordenadas de cada ponto no espaço infinito de Hilbert antes de calcular o produto interno.' },
      { letter: 'D', text: 'Um valor de C tendendo a zero cria uma margem rígida (hard margin) que proíbe qualquer erro de classificação no conjunto de treinamento.' },
      { letter: 'E', text: 'O vetor de pesos w no SVM depende de todos os pontos amostrais do conjunto de treino igualmente, e não apenas dos vetores de suporte.' },
    ],
    correctAnswer: 'A',
    explanationCorrect: `Na formulação do SVM com margem suave:
- O hiperparâmetro C controla o balanço entre maximizar a margem e minimizar o erro de classificação. C alto penaliza severamente qualquer ponto dentro da margem ou classificado incorretamente, estreitando a margem e podendo gerar overfitting (alta variância).
- O parâmetro gamma do RBF define o inverso do raio de influência: gamma alto = raio pequeno = fronteira muito recortada/complexa (overfitting); gamma baixo = raio amplo = fronteira suave.
- O Kernel Trick permite calcular o produto interno no espaço de dimensão superior sem mapear explicitamente os vetores.`,
    distractorAnalysis: [
      { letter: 'B', whyWrong: 'Aumentar gamma diminui o raio de influência, tornando a fronteira hiper-sensível a pontos individuais (overfitting, alta variância).' },
      { letter: 'C', whyWrong: 'O Kernel Trick justamente evita o cálculo explícito das coordenadas infinitas.' },
      { letter: 'D', whyWrong: 'C tendendo ao infinito cria hard margin; C próximo a zero permite margem larga com muitas violações.' },
      { letter: 'E', whyWrong: 'O vetor w depende única e exclusivamente dos Vetores de Suporte (Support Vectors) situados na margem ou violando-a.' },
    ],
    cesgranrioTip: 'A Cesgranrio costuma cobrar a contraposição entre hiperparâmetros de regularização: C no SVM funciona de forma inversa ao lambda da regressão Ridge (C maior = menor regularização).'
  },
  {
    id: 'tp-04',
    topic: 'Machine Learning',
    subtopic: 'Clustering Não-Supervisionado: K-Means vs DBSCAN',
    difficulty: 'Médio',
    statement: `A equipe de dados da Transpetro necessita agrupar trajetórias geoespaciais e pontos de fundeio de navios petroleiros na Baía de Guanabara para identificar áreas de atracação não oficiais e anomalias de rota. O conjunto de dados contém aglomerados com formatos arbitrários e côncavos, além de grande quantidade de ruído (ruído de GPS).

Qual algoritmo de agrupamento é o mais adequado e qual é sua propriedade fundamental?`,
    options: [
      { letter: 'A', text: 'K-Means, pois assume que todos os clusters possuem distribuição esférica e variâncias idênticas.' },
      { letter: 'B', text: 'DBSCAN (Density-Based Spatial Clustering of Applications with Noise), pois agrupa pontos com base em densidade local, descobre clusters de formatos arbitrários e classifica pontos isolados explicitamente como ruído (outliers).' },
      { letter: 'C', text: 'Gaussian Mixture Models (GMM), pois obriga que cada ponto pertença estritamente a um único cluster sem probabilidades de pertinência.' },
      { letter: 'D', text: 'PCA (Principal Component Analysis), pois é o principal algoritmo de particionamento rígido com centróides centrais.' },
      { letter: 'E', text: 'Hierarchical Agglomerative Clustering com Single Linkage, pois nunca sofre do efeito de encadeamento (chaining effect).' },
    ],
    correctAnswer: 'B',
    explanationCorrect: `O DBSCAN baseia-se em densidade conectada definida por dois parâmetros: eps (raio da vizinhança) e min_samples (mínimo de pontos na vizinhança para formar um ponto central / core point). Ele:
1. Identifica clusters de formato arbitrário e não-convexos.
2. Não exige pré-especificação do número k de clusters.
3. Rotula pontos de baixa densidade diretamente como ruído (-1 / noise).`,
    distractorAnalysis: [
      { letter: 'A', whyWrong: 'K-Means falha em aglomerados côncavos/arbitrários e é muito sensível a outliers.' },
      { letter: 'C', whyWrong: 'GMM é soft clustering probabilístico e assume misturas de normais multivariadas.' },
      { letter: 'D', whyWrong: 'PCA é técnica de redução de dimensionalidade linear, não de agrupamento.' },
      { letter: 'E', whyWrong: 'Single Linkage sofre intensamente do efeito de encadeamento (chaining).' },
    ],
    cesgranrioTip: 'Para dados com ruído e formas não-esféricas (como trajetórias de navios ou oleodutos), a Cesgranrio sempre aponta o DBSCAN como a resposta canônica.'
  },
  {
    id: 'tp-05',
    topic: 'Machine Learning',
    subtopic: 'Deep Learning & Mecanismos de Atenção (Transformers)',
    difficulty: 'Difícil',
    statement: `Na arquitetura Transformer (Vaswani et al., 2017), o mecanismo de Scaled Dot-Product Attention é definido matematicamente pela expressão:

Attention(Q, K, V) = softmax( (Q * K^T) / sqrt(d_k) ) * V

Qual é a razão técnica essencial para a divisão pelo termo escalar sqrt(d_k) (raiz quadrada da dimensão das chaves)?`,
    options: [
      { letter: 'A', text: 'Para valores grandes de d_k, o produto escalar Q*K^T cresce em magnitude, empurrando a função softmax para regiões de gradientes extremamente pequenos (saturação e desaparecimento de gradiente).' },
      { letter: 'B', text: 'Para converter a matriz resultante em uma distribuição estocástica com autovalores unitários.' },
      { letter: 'C', text: 'Para garantir que a complexidade computacional da atenção caia de O(N²) para O(N log N).' },
      { letter: 'D', text: 'Para substituir a necessidade de matrizes de projeção linear de Query e Value.' },
      { letter: 'E', text: 'Para aplicar regularização L1 nos pesos de atenção e induzir esparsidade estrutural.' },
    ],
    correctAnswer: 'A',
    explanationCorrect: `Se as componentes de Q e K forem variáveis aleatórias independentes com média 0 e variância 1, o produto escalar terá média 0 e variância d_k. Para valores grandes de d_k, a magnitude do produto escalar torna-se muito elevada, fazendo com que a função softmax gere valores próximos a 0 ou 1 em saturação, onde as derivadas/gradientes são quase nulos (vanishing gradient). A divisão por sqrt(d_k) normaliza a variância de volta para 1.`,
    distractorAnalysis: [
      { letter: 'B', whyWrong: 'O softmax já normaliza para uma distribuição de probabilidade; o escalar serve para controlar a variância.' },
      { letter: 'C', whyWrong: 'A divisão por escalar não altera a complexidade quadrática O(N²) da auto-atenção padrão.' },
      { letter: 'D', whyWrong: 'As matrizes de projeção W_q, W_k, W_v continuam obrigatórias.' },
      { letter: 'E', whyWrong: 'Não é regularização L1; é um fator de escala para estabilidade de gradientes no treinamento.' },
    ],
    cesgranrioTip: 'Questões de Deep Learning da Cesgranrio cobram a intuição matemática de ativações, vanishing/exploding gradients e funções de atenção dos Transformers.'
  },

  // --- ESTATÍSTICA E PROBABILIDADE ---
  {
    id: 'tp-06',
    topic: 'Estatística e Probabilidade',
    subtopic: 'Inferência e Testes de Hipóteses',
    difficulty: 'Médio',
    statement: `A equipe de manutenção preventiva da Transpetro analisou o tempo médio até a falha (MTTF) de válvulas de alívio de pressão em navios gaseiros antes e após a aplicação de um novo lubrificante sintético. Foram coletadas duas amostras independentes com distribuição aproximadamente normal e variâncias populacionais desconhecidas, porém assumidas como desiguais (teste de Welch). 

Ao realizar o teste bilateral com nível de significância de 5% (α = 0,05), o teste resultou em uma estatística t com p-valor = 0,028. Qual a conclusão correta e a respectiva interpretação do p-valor segundo a teoria estatística?`,
    options: [
      { letter: 'A', text: 'Rejeita-se a hipótese nula (H0) ao nível de 5%, concluindo-se que há evidência estatística de diferença no MTTF, pois p-valor < 0,05.' },
      { letter: 'B', text: 'Aceita-se a hipótese nula (H0), pois a probabilidade de H0 ser verdadeira é de exatamente 2,8%.' },
      { letter: 'C', text: 'Não se pode rejeitar H0, pois o p-valor indica que a probabilidade de cometer o Erro Tipo II é de 2,8%.' },
      { letter: 'D', text: 'Rejeita-se H0, implicando que a probabilidade do Erro Tipo I é de 97,2%.' },
      { letter: 'E', text: 'O teste é inconclusivo, sendo obrigatório que o p-valor seja inferior a 0,01 para testes bilaterais.' },
    ],
    correctAnswer: 'A',
    explanationCorrect: `Como o p-valor obtido (0,028) é menor do que o nível de significância adotado (α = 0,05), rejeita-se a hipótese nula (H0: não há diferença entre as médias). O p-valor representa a probabilidade de se observar uma estatística de teste tão extrema ou mais extrema do que a observada, sob a suposição de que a hipótese nula seja verdadeira.`,
    distractorAnalysis: [
      { letter: 'B', whyWrong: 'O p-valor NÃO é a probabilidade de H0 ser verdadeira (falácia clássica de inferência estatística).' },
      { letter: 'C', whyWrong: 'Com p-valor < alfa, rejeita-se H0; além disso, o p-valor não quantifica diretamente a probabilidade de erro Tipo II (beta).' },
      { letter: 'D', whyWrong: 'A probabilidade do Erro Tipo I máximo tolerado é fixada a priori pelo alfa (0,05), não 97,2%.' },
      { letter: 'E', whyWrong: 'O critério de rejeição é p-valor < alfa (0,05). Não há regra que exija alfa de 0,01 a menos que pré-especificado.' },
    ],
    cesgranrioTip: 'Cuidado: A Cesgranrio adora colocar alternativas dizendo que o p-valor é "a probabilidade da hipótese nula ser verdadeira". Isso é conceitualmente incorreto na inferência frequentista!'
  },
  {
    id: 'tp-07',
    topic: 'Estatística e Probabilidade',
    subtopic: 'Teorema de Bayes e Probabilidade Condicional',
    difficulty: 'Médio',
    statement: `Em um terminal aquaviário da Transpetro, um sistema automatizado de ultrassom inspeciona soldas de tubulações. Sabe-se que:
- A prevalência de trincas estruturais reais nas soldas é de 1% (P(T) = 0,01).
- A sensibilidade do teste (probabilidade de dar positivo se há trinca) é de 95% (P(+|T) = 0,95).
- A taxa de falso-positivo (probabilidade de dar positivo quando NÃO há trinca) é de 5% (P(+|T^c) = 0,05).

Se uma solda testou POSITIVO no ultrassom, qual é a probabilidade a posteriori de ela realmente conter uma trinca estrutural (P(T|+))?`,
    options: [
      { letter: 'A', text: 'Aproximadamente 16,1%' },
      { letter: 'B', text: 'Exatamente 95,0%' },
      { letter: 'C', text: 'Exatamente 90,0%' },
      { letter: 'D', text: 'Aproximadamente 50,0%' },
      { letter: 'E', text: 'Aproximadamente 1,0%' },
    ],
    correctAnswer: 'A',
    explanationCorrect: `Pelo Teorema de Bayes:
P(T|+) = [ P(+|T) * P(T) ] / P(+)
Onde P(+) = P(+|T)*P(T) + P(+|T^c)*P(T^c)
P(+) = (0,95 * 0,01) + (0,05 * 0,99) = 0,0095 + 0,0495 = 0,0590 (5,9%)
P(T|+) = 0,0095 / 0,0590 = 0,1610 -> 16,1%.
Mesmo com teste de 95% de sensibilidade, a baixa prevalência inicial (1%) faz com que a maioria dos positivos seja falso-positivo.`,
    distractorAnalysis: [
      { letter: 'B', whyWrong: '95% é a sensibilidade P(+|T), confundir P(+|T) com P(T|+) é a falácia do promotor.' },
      { letter: 'C', whyWrong: 'Cálculo desconsiderando a probabilidade total do denominador P(+).' },
      { letter: 'D', whyWrong: 'Valor arbitrário obtido ao ignorar a probabilidade a priori de 0,01.' },
      { letter: 'E', whyWrong: '1% é apenas o prior P(T), o teste positivo aumentou de 1% para 16,1%.' },
    ],
    cesgranrioTip: 'Questões de Bayes em testes diagnósticos ou sensores com eventos raros são marca registrada da Cesgranrio em concursos da Petrobras/Transpetro.'
  },
  {
    id: 'tp-08',
    topic: 'Estatística e Probabilidade',
    subtopic: 'Regressão Linear Múltipla e Pressupostos de Gauss-Markov',
    difficulty: 'Difícil',
    statement: `Um modelo de Regressão Linear Múltipla estimado por Mínimos Quadrados Ordinários (MQO) para prever o consumo de combustível de navios petroleiros deve cumprir os pressupostos clássicos para que os estimadores sejam os Melhores Estimadores Lineares Não-Viesados (BLUE - Teorema de Gauss-Markov).

Qual teste estatístico é utilizado especificamente para diagnosticar a presença de AUTOCORRELAÇÃO de primeira ordem nos resíduos de séries temporais e qual valor indica ausência de autocorrelação?`,
    options: [
      { letter: 'A', text: 'Teste de Durbin-Watson; valor próximo a 2 indica ausência de autocorrelação.' },
      { letter: 'B', text: 'Teste de Breusch-Pagan; valor próximo a 0 indica ausência de heterocedasticidade.' },
      { letter: 'C', text: 'Teste de Shapiro-Wilk; valor de p > 0,05 indica homocedasticidade perfeita.' },
      { letter: 'D', text: 'Fator de Inflação da Variância (VIF); valor igual a 10 indica ausência de autocorrelação.' },
      { letter: 'E', text: 'Teste de Kolmogorov-Smirnov; estatística d = 4 indica resíduos normais.' },
    ],
    correctAnswer: 'A',
    explanationCorrect: `O teste de Durbin-Watson (DW) testa a autocorrelação de primeira ordem nos resíduos:
- DW varia de 0 a 4.
- DW ≈ 2 indica ausência de autocorrelação serial.
- DW < 2 (próximo a 0) indica autocorrelação positiva.
- DW > 2 (próximo a 4) indica autocorrelação negativa.`,
    distractorAnalysis: [
      { letter: 'B', whyWrong: 'Breusch-Pagan testa heterocedasticidade, não autocorrelação serial.' },
      { letter: 'C', whyWrong: 'Shapiro-Wilk testa a normalidade dos resíduos.' },
      { letter: 'D', whyWrong: 'VIF diagnostica multicolinearidade entre variáveis explicativas (VIF > 5 ou 10 indica alta multicolinearidade).' },
      { letter: 'E', whyWrong: 'Kolmogorov-Smirnov é teste de aderência de distribuição geral.' },
    ],
    cesgranrioTip: 'Memorize o mapa dos testes: Durbin-Watson = Autocorrelação (ideal ~2); Breusch-Pagan / White = Heterocedasticidade; VIF = Multicolinearidade; Shapiro-Wilk / Jarque-Bera = Normalidade.'
  },
  {
    id: 'tp-09',
    topic: 'Estatística e Probabilidade',
    subtopic: 'Distribuições de Probabilidade: Poisson vs Binomial',
    difficulty: 'Fácil',
    statement: `O número de vazamentos em pequenas conexões de tubulação em um terminal segue um processo de Poisson com taxa média de λ = 2 ocorrências por mês.

Qual a expressão correta para calcular a probabilidade de ocorrerem EXATAMENTE 3 vazamentos no próximo mês?`,
    options: [
      { letter: 'A', text: 'P(X = 3) = (e^(-2) * 2^3) / 3!' },
      { letter: 'B', text: 'P(X = 3) = (e^(-3) * 3^2) / 2!' },
      { letter: 'C', text: 'P(X = 3) = (2^3) / (3! * e^3)' },
      { letter: 'D', text: 'P(X = 3) = 1 - e^(-2*3)' },
      { letter: 'E', text: 'P(X = 3) = (3/2) * e^(-2)' },
    ],
    correctAnswer: 'A',
    explanationCorrect: `A função de probabilidade da distribuição de Poisson é:
P(X = k) = (e^(-λ) * λ^k) / k!
Para λ = 2 e k = 3:
P(X = 3) = (e^(-2) * 2^3) / 3! = (e^(-2) * 8) / 6 = (4/3) * e^(-2) ≈ 0,1804 (18%).`,
    distractorAnalysis: [
      { letter: 'B', whyWrong: 'Inverteu λ (taxa = 2) e k (contagem = 3).' },
      { letter: 'C', whyWrong: 'Exponencial com expoente incorreto.' },
      { letter: 'D', whyWrong: 'Esta é a FDA acumulada da distribuição Exponencial contínua, não Poisson discreta.' },
      { letter: 'E', whyWrong: 'Fórmula incorreta sem a potência e o fatorial.' },
    ],
    cesgranrioTip: 'Na distribuição de Poisson, um fato frequentemente cobrado é que a Média e a Variância são rigorosamente iguais: E[X] = Var(X) = λ.'
  },

  // --- BIG DATA, SQL AVANÇADO & SPARK ---
  {
    id: 'tp-10',
    topic: 'Big Data & SQL',
    subtopic: 'Window Functions e Otimização',
    difficulty: 'Difícil',
    statement: `Considere a tabela 'telemetria_dutos' da Transpetro contendo as colunas (id_duto INT, sensor_timestamp TIMESTAMP, pressao_bar NUMERIC). Um analista precisa calcular, para cada registro de telemetria de um duto, a média móvel da pressão dos últimos 3 registros temporais (incluindo o atual) estritamente ordenados pelo tempo.

Qual comando SQL utiliza a Window Function de forma correta e eficiente segundo o padrão ANSI SQL?`,
    options: [
      { letter: 'A', text: `SELECT id_duto, sensor_timestamp, pressao_bar, AVG(pressao_bar) OVER (PARTITION BY id_duto ORDER BY sensor_timestamp ROWS BETWEEN 2 PRECEDING AND CURRENT ROW) AS media_movel FROM telemetria_dutos;` },
      { letter: 'B', text: `SELECT id_duto, sensor_timestamp, pressao_bar, AVG(pressao_bar) OVER (ORDER BY id_duto ROWS 3 PRECEDING) AS media_movel FROM telemetria_dutos;` },
      { letter: 'C', text: `SELECT id_duto, sensor_timestamp, pressao_bar, MOVING_AVG(pressao_bar, 3) OVER (GROUP BY id_duto) AS media_movel FROM telemetria_dutos;` },
      { letter: 'D', text: `SELECT id_duto, sensor_timestamp, pressao_bar, AVG(pressao_bar) OVER (PARTITION BY id_duto ORDER BY sensor_timestamp RANGE BETWEEN 3 PRECEDING AND CURRENT ROW) AS media_movel FROM telemetria_dutos;` },
      { letter: 'E', text: `SELECT id_duto, sensor_timestamp, pressao_bar, LAG(pressao_bar, 3) OVER (PARTITION BY id_duto) / 3 AS media_movel FROM telemetria_dutos;` },
    ],
    correctAnswer: 'A',
    explanationCorrect: `Para calcular a média móvel de 3 registros físicos (o atual e os 2 imediatamente anteriores) para cada duto:
- 'PARTITION BY id_duto' separa a janela por duto.
- 'ORDER BY sensor_timestamp' garante a ordem cronológica.
- 'ROWS BETWEEN 2 PRECEDING AND CURRENT ROW' define a janela de exatamente 3 linhas (2 anteriores + 1 atual).`,
    distractorAnalysis: [
      { letter: 'B', whyWrong: 'Falta PARTITION BY id_duto e a ordenação está por id_duto em vez de sensor_timestamp.' },
      { letter: 'C', whyWrong: 'MOVING_AVG e GROUP BY dentro de OVER não são sintaxe padrão ANSI SQL.' },
      { letter: 'D', whyWrong: 'RANGE é baseado no valor do timestamp (diferença de intervalo numérico/temporal), não na contagem física de linhas (ROWS).' },
      { letter: 'E', whyWrong: 'LAG apenas busca o valor de 3 linhas atrás, não calcula a média.' },
    ],
    cesgranrioTip: 'Diferença entre ROWS (linhas físicas) e RANGE (valores do eixo de ordenação) em janelas analíticas é questão recorrente em provas da Cesgranrio de nível superior em TI/Dados.'
  },
  {
    id: 'tp-11',
    topic: 'Big Data & SQL',
    subtopic: 'Apache Spark: Otimização de Joins e Broadcast',
    difficulty: 'Difícil',
    statement: `No processamento distribuído com Apache Spark (PySpark), um pipeline junta uma tabela massiva de telemetria de sensores de dutos (10 bilhões de registros, 2 Terabytes) com uma tabela dimensional pequena de metadados de terminais (48 registros, 50 Kilobytes).

Qual estratégia de JOIN evita completamente o dispendioso 'Shuffle' de rede entre os nós do cluster?`,
    options: [
      { letter: 'A', text: 'Broadcast Hash Join (usando broadcast(df_terminais)), enviando uma cópia da tabela pequena para a memória de cada nó executor.' },
      { letter: 'B', text: 'Sort-Merge Join com repartition(1000) em ambas as tabelas.' },
      { letter: 'C', text: 'Cartesian Product Join executado em modo lazy em um único nó master.' },
      { letter: 'D', text: 'Shuffle Hash Join forçando particionamento por hash da tabela de telemetria.' },
      { letter: 'E', text: 'Nested Loop Join desativando o Catalyst Optimizer.' },
    ],
    correctAnswer: 'A',
    explanationCorrect: `O Broadcast Hash Join (BHJ) é a técnica mais eficiente quando uma das tabelas cabe confortavelmente na memória dos executores (limite padrão spark.sql.autoBroadcastJoinThreshold = 10MB). A tabela pequena é transmitida (broadcast) para todos os workers, permitindo que a junção seja feita 100% localmente sem qualquer transferência (Shuffle) dos terabytes da tabela grande pela rede.`,
    distractorAnalysis: [
      { letter: 'B', whyWrong: 'Sort-Merge Join exige que ambas as tabelas sofram shuffle e ordenação por chave na rede.' },
      { letter: 'C', whyWrong: 'Produto Cartesiano é computacionalmente proibitivo O(M*N).' },
      { letter: 'D', whyWrong: 'Shuffle Hash Join ainda causa shuffle de ambas as tabelas.' },
      { letter: 'E', whyWrong: 'Nested Loop Join sem índice é extremamente lento e o Catalyst Optimizer deve sempre ficar ativo.' },
    ],
    cesgranrioTip: 'O Broadcast Hash Join elimina a etapa de Shuffle em tabelas assimétricas (fato gigante x dimensão pequena). Lembrar de: broadcast(dim_table).'
  },
  {
    id: 'tp-12',
    topic: 'Big Data & SQL',
    subtopic: 'Arquitetura Data Lakehouse e Delta Lake (ACID)',
    difficulty: 'Médio',
    statement: `A arquitetura Data Lakehouse combina a flexibilidade e baixo custo de armazenamento de objetos (S3/ADLS/GCS) com as capacidades de gestão de dados de um Data Warehouse.

Ao utilizar o formato Delta Lake sobre arquivos Parquet, qual recurso garante que operações concorrentes de escrita e leitura mantenham a consistência ACID e permitam viagens no tempo (Time Travel)?`,
    options: [
      { letter: 'A', text: 'O Transaction Log estruturado em JSON (_delta_log) com controle de concorrência otimista (OCC).' },
      { letter: 'B', text: 'O uso de índices B-tree gravados diretamente no cabeçalho binário dos arquivos CSV.' },
      { letter: 'C', text: 'A substituição de todos os arquivos Parquet por bancos relacionais SQLite em cada nó.' },
      { letter: 'D', text: 'O bloqueio pessimista global (Table Lock) que suspende todas as consultas durante qualquer inserção.' },
      { letter: 'E', text: 'A conversão automática de esquemas flexíveis em esquemas estáticos em tempo de compilação C++.' },
    ],
    correctAnswer: 'A',
    explanationCorrect: `O Delta Lake implementa ACID transactions através do Delta Transaction Log (diretório _delta_log contendo commits atômicos em JSON e checkpoints periódicos em Parquet). Ele utiliza Optimistic Concurrency Control (OCC) para gerenciar escritas concorrentes e mantém o histórico de versões dos arquivos, permitindo consultar dados no estado em que estavam em timestamps passados (Time Travel).`,
    distractorAnalysis: [
      { letter: 'B', whyWrong: 'Delta Lake armazena dados em Parquet colunar e metadados no log de transações, não em CSVs com B-tree.' },
      { letter: 'C', whyWrong: 'Não há uso de SQLite nos nós; o armazenamento permanece em cloud storage em Parquet.' },
      { letter: 'D', whyWrong: 'Delta usa concorrência otimista (OCC), permitindo leituras contínuas sem locks pessimistas globais.' },
      { letter: 'E', whyWrong: 'Delta Lake suporta Schema Enforcement e Schema Evolution dinamicamente.' },
    ],
    cesgranrioTip: 'Cesgranrio adora cobrar o Delta Log, formato Parquet colunar com compressão Snappy e ACID em Lakehouse.'
  },

  // --- PYTHON PARA DADOS & MLOPS ---
  {
    id: 'tp-13',
    topic: 'Python & MLOps',
    subtopic: 'Data Drift, Concept Drift e Monitoramento',
    difficulty: 'Difícil',
    statement: `Um modelo de rede neural implantado pela Transpetro para prever o consumo de combustível (Bunker) de navios de cabotagem começou a apresentar degradação contínua no RMSE após 6 meses em operação, mesmo sem alteração no pipeline de ingestão. A equipe constatou que novas regulamentações marítimas da IMO impuseram reduções na velocidade de cruzeiro e novas composições de biocombustíveis.

Do ponto de vista de MLOps e Estatística, esse fenômeno é caracterizado formalmente como:`,
    options: [
      { letter: 'A', text: 'Concept Drift (mudança na relação probabilística condicional P(Y|X)), pois o comportamento físico do consumo de combustível dado os parâmetros de navegação mudou.' },
      { letter: 'B', text: 'Data Leakage (vazamento de dados), pois dados de treino foram contaminados por variáveis futuras no pré-processamento.' },
      { letter: 'C', text: 'Covariate Shift puro sem alteração de P(Y|X), uma vez que apenas a distribuição marginal P(X) foi modificada.' },
      { letter: 'D', text: 'Underfitting estático induzido por excesso de neurônios nas camadas densas.' },
      { letter: 'E', text: 'Overfitting por regularização Dropout excessiva em tempo de inferência.' },
    ],
    correctAnswer: 'A',
    explanationCorrect: `Concept Drift ocorre quando a relação condicional entre as features de entrada X e o target Y (isto é, P(Y|X)) se altera ao longo do tempo devido a mudanças nas regras de negócio, físicas ou regulatórias. Como novas velocidades e tipos de combustível alteraram como as features geram o consumo final, a própria função alvo mudou.`,
    distractorAnalysis: [
      { letter: 'B', whyWrong: 'Data leakage acontece durante a modelagem quando informações do target ou teste vazam para o treino.' },
      { letter: 'C', whyWrong: 'Covariate shift seria se P(X) mudasse mas a relação P(Y|X) permanecesse rigorosamente a mesma.' },
      { letter: 'D', whyWrong: 'Excesso de neurônios causaria overfitting, não underfitting; além disso o modelo degradou meses depois de produção.' },
      { letter: 'E', whyWrong: 'Dropout é desativado em tempo de inferência (modo eval).' },
    ],
    cesgranrioTip: 'Diferença conceitual: Data/Covariate Drift = mudança em P(X); Concept Drift = mudança em P(Y|X); Prior Probability Shift = mudança em P(Y).'
  },
  {
    id: 'tp-14',
    topic: 'Python & MLOps',
    subtopic: 'Explicabilidade de Modelos: SHAP (Shapley Additive exPlanations)',
    difficulty: 'Médio',
    statement: `Para atender às auditorias operacionais e de segurança da ANP (Agência Nacional do Petróleo), os modelos de Machine Learning de caixa-preta da Transpetro devem possuir explicabilidade local e global. A biblioteca SHAP foi selecionada por se fundamentar na Teoria dos Jogos Cooperativos de Lloyd Shapley.

Qual das seguintes propriedades matemáticas é rigorosamente satisfeita pelos Shapley Values no SHAP?`,
    options: [
      { letter: 'A', text: 'Eficiência (Soma dos valores SHAP de todas as features para uma instância é exatamente igual à diferença entre a predição do modelo e a predição média da base).' },
      { letter: 'B', text: 'Invariância estrita ao número de árvores no ensemble Random Forest.' },
      { letter: 'C', text: 'Garantia de que features correlacionadas sempre recebem exatamente peso zero.' },
      { letter: 'D', text: 'Exigência de que o modelo seja linear e sem termos de interação de variáveis.' },
      { letter: 'E', text: 'Independência estocástica entre os atributos no espaço amostral.' },
    ],
    correctAnswer: 'A',
    explanationCorrect: `Os Valores de Shapley possuem 4 axiomas fundamentais comprovados:
1. Eficiência (Efficiency / Additivity): A soma das contribuições marginais de todas as features para uma observação específica é igual a f(x) - E[f(x)] (diferença entre o output previsto e o valor base esperado).
2. Simetria: Se duas features contribuem igualmente para todas as coalizões, recebem o mesmo valor.
3. Dummy / Null Player: Se uma feature não altera a predição em nenhuma coalizão, seu Shapley Value é 0.
4. Linearidade / Aditividade: Para modelos compostos, a soma dos Shapley Values é a soma dos Shapley Values individuais.`,
    distractorAnalysis: [
      { letter: 'B', whyWrong: 'Os valores SHAP refletem a estrutura do ensemble completo, não são invariantes à mudança do modelo.' },
      { letter: 'C', whyWrong: 'Features correlacionadas dividem importância de acordo com suas contribuições marginais nas coalizões.' },
      { letter: 'D', whyWrong: 'TreeSHAP e KernelSHAP operam sobre modelos altamente não-lineares com interações complexas.' },
      { letter: 'E', whyWrong: 'Não exige independência estocástica.' },
    ],
    cesgranrioTip: 'A propriedade de Eficiência (soma das contribuições locais = predição menos média base) é o conceito mais cobrado sobre SHAP em concursos de TI e Ciência de Dados.'
  },
  {
    id: 'tp-15',
    topic: 'Python & MLOps',
    subtopic: 'Pandas & NumPy: Vetorização e Otimização de Performance',
    difficulty: 'Fácil',
    statement: `Em um DataFrame do Pandas com 10 milhões de linhas de telemetria, um cientista precisa criar uma nova coluna 'status' calculada a partir de duas colunas numéricas ('pressao' e 'temperatura').

Qual abordagem apresenta a MAIOR velocidade de execução (menor tempo de CPU) tirando proveito da vetorização em baixo nível em C?`,
    options: [
      { letter: 'A', text: 'Operações vetorizadas com NumPy: np.where((df["pressao"] > 10) & (df["temperatura"] > 80), "Critico", "Normal")' },
      { letter: 'B', text: 'Loop iterativo com for index, row in df.iterrows(): row["status"] = ...' },
      { letter: 'C', text: 'Uso de df.apply(lambda row: ..., axis=1) linha a linha em Python puro.' },
      { letter: 'D', text: 'Loop com df.itertuples() seguido de atribuição por df.loc[index, "status"].' },
      { letter: 'E', text: 'Conversão do DataFrame em lista de dicionários com df.to_dict("records") e list comprehension.' },
    ],
    correctAnswer: 'A',
    explanationCorrect: `A hierarquia de velocidade no Pandas/NumPy:
1. Vetorização nativa NumPy (np.where / expressões booleanas C-level) -> ordens de magnitude mais rápida (milissegundos).
2. Vetorização de séries no Pandas -> muito rápida.
3. itertuples() -> razoável para iteração quando vetorização não for possível.
4. df.apply(axis=1) -> lenta (overhead do interpretador Python para cada linha).
5. iterrows() e df.loc em loop -> extremamente lenta (pior prática, pode levar minutos ou horas).`,
    distractorAnalysis: [
      { letter: 'B', whyWrong: 'iterrows() é a abordagem mais lenta do ecossistema Pandas.' },
      { letter: 'C', whyWrong: 'apply(axis=1) não é vetorizado; executa um loop em Python linha a linha.' },
      { letter: 'D', whyWrong: 'df.loc em loop gera overhead massivo de indexação a cada linha.' },
      { letter: 'E', whyWrong: 'to_dict() copia toda a memória para estruturas nativas de Python, consumindo muita RAM e tempo.' },
    ],
    cesgranrioTip: 'A Cesgranrio penaliza iterrows() e apply(axis=1) em questões de engenharia de software para dados e destaca vetorização NumPy / Pandas.'
  },

  // --- GOVERNANÇA DE DADOS, DAMA-DMBOK & LGPD ---
  {
    id: 'tp-16',
    topic: 'Governança & LGPD',
    subtopic: 'LGPD (Lei nº 13.709/2018): Princípios e Bases Legais',
    difficulty: 'Médio',
    statement: `A Transpetro realiza o tratamento de dados pessoais de marítimos e colaboradores embarcados em navios petroleiros para controle de jornada, exames de saúde ocupacional e certificações marítimas de segurança (normas da Marinha do Brasil e ANP).

Segundo o Art. 7º e o Art. 11 da Lei Geral de Proteção de Dados (LGPD - Lei nº 13.709/2018), qual base legal justifica prioritariamente esse tratamento sem necessidade de obtenção do consentimento individual do titular?`,
    options: [
      { letter: 'A', text: 'Cumprimento de obrigação legal ou regulatória pelo controlador.' },
      { letter: 'B', text: 'Proteção do crédito e scoring financeiro de mercado.' },
      { letter: 'C', text: 'Realização de estudos por órgão de pesquisa privado sem anonimização.' },
      { letter: 'D', text: 'Legítimo interesse do controlador para fins exclusivamente comerciais.' },
      { letter: 'E', text: 'Transferência internacional irrestrita de dados sem garantias de salvaguarda.' },
    ],
    correctAnswer: 'A',
    explanationCorrect: `O Art. 7º, inciso II, e o Art. 11, inciso II, alínea 'a' da LGPD autorizam expressamente o tratamento de dados pessoais (inclusive dados pessoais sensíveis, como saúde ocupacional) para o "cumprimento de obrigação legal ou regulatória pelo controlador" (e.g., Consolidação das Leis do Trabalho, Normas Regulamentadoras - NRs, normas da Autoridade Marítima e ANP). Nesses casos, o consentimento não é a base aplicável.`,
    distractorAnalysis: [
      { letter: 'B', whyWrong: 'Proteção do crédito se aplica a transações financeiras e inadimplência, não a normas de saúde e segurança marítima.' },
      { letter: 'C', whyWrong: 'Estudos por órgãos de pesquisa exigem, sempre que possível, a anonimização.' },
      { letter: 'D', whyWrong: 'Legítimo interesse não prevalece sobre direitos fundamentais e não se aplica a dados sensíveis de saúde no art. 11.' },
      { letter: 'E', whyWrong: 'Transferência internacional exige instrumentos legais de proteção adequados.' },
    ],
    cesgranrioTip: 'A Cesgranrio adora colocar o Consentimento como pegadinha. Quando há lei ou norma técnica obrigando a empresa pública a coletar dados, a base é OBRIGAÇÃO LEGAL OU REGULATÓRIA.'
  },
  {
    id: 'tp-17',
    topic: 'Governança & LGPD',
    subtopic: 'Framework DAMA-DMBOK: Dimensões da Qualidade de Dados',
    difficulty: 'Médio',
    statement: `No framework de governança DAMA-DMBOK (Data Management Body of Knowledge), a gestão da qualidade de dados (Data Quality) avalia os ativos segundo dimensões padronizadas.

Quando um analista verifica que a coluna 'codigo_oleoduto' possui 100% de seus valores preenchidos (sem registros nulos ou vazios), e que todos os códigos existem previamente na tabela cadastral oficial de ativos de dutos da ANP, quais duas dimensões da qualidade foram atendidas respectivamente?`,
    options: [
      { letter: 'A', text: 'Completude (Completeness) e Conformidade/Validade (Validity/Conformity).' },
      { letter: 'B', text: 'Tempestividade (Timeliness) e Volatilidade (Volatility).' },
      { letter: 'C', text: 'Unicidade (Uniqueness) e Densidade Espacial (Spatial Density).' },
      { letter: 'D', text: 'Anonimização (Anonymity) e Criptografia (Confidentiality).' },
      { letter: 'E', text: 'Portabilidade (Portability) e Escalabilidade (Scalability).' },
    ],
    correctAnswer: 'A',
    explanationCorrect: `As dimensões clássicas da qualidade de dados segundo o DAMA-DMBOK incluem:
1. Completude (Completeness): Grau em que todos os dados requeridos estão presentes (ausência de nulos/missing values).
2. Conformidade/Validade (Validity/Conformity): Dados em conformidade com formatos, regras sintáticas e tabelas de referência/domínio.
3. Unicidade (Uniqueness): Ausência de duplicações indesejadas.
4. Consistência (Consistency): Ausência de contradições entre bases de dados.
5. Acurácia/Exatidão (Accuracy): O dado reflete com precisão o fato do mundo real.
6. Tempestividade (Timeliness): O dado está disponível no momento oportuno para tomada de decisão.`,
    distractorAnalysis: [
      { letter: 'B', whyWrong: 'Tempestividade refere-se à disponibilidade no tempo correto.' },
      { letter: 'C', whyWrong: 'Unicidade avalia se há duplicatas de registros.' },
      { letter: 'D', whyWrong: 'Anonimização e Criptografia são técnicas de segurança da informação, não dimensões fundamentais do DMBOK.' },
      { letter: 'E', whyWrong: 'Portabilidade e Escalabilidade são atributos de arquitetura de software.' },
    ],
    cesgranrioTip: 'DAMA-DMBOK é tema certo na Cesgranrio. Saiba diferenciar Completude (não ter nulo), Acurácia (ser verdadeiro no mundo real) e Consistência (não ter contradições).'
  },

  // --- CONHECIMENTOS BÁSICOS (PORTUGUÊS & INGLÊS TÉCNICO) ---
  {
    id: 'tp-18',
    topic: 'Básicos',
    subtopic: 'Língua Portuguesa Cesgranrio: Regência e Crase',
    difficulty: 'Médio',
    statement: `Considere a frase adaptada de um relatório técnico da Transpetro:

"A implantação do novo algoritmo de inteligência artificial visa ___ otimização do fluxo de combustíveis, proporcionando ___ operadores maior segurança e obedecendo ___ normas internacionais de segurança aquaviária."

De acordo com a norma-padrão da Língua Portuguesa e as regras de regência verbal e emprego do sinal indicativo de crase, as lacunas devem ser preenchidas, respectivamente, por:`,
    options: [
      { letter: 'A', text: 'à — aos — às' },
      { letter: 'B', text: 'a — aos — as' },
      { letter: 'C', text: 'à — a os — a' },
      { letter: 'D', text: 'na — para — com as' },
      { letter: 'E', text: 'à — aos — a' },
    ],
    correctAnswer: 'A',
    explanationCorrect: `Análise sintática e regencial:
1. O verbo 'visar' no sentido de 'ter por objetivo / almejar' é Transitivo Indireto e rege a preposição 'a'. Como 'otimização' é substantivo feminino com artigo 'a', ocorre crase: "visa à otimização".
2. O verbo 'proporcionar' é Transitivo Direto e Indireto (proporcionar algo a alguém). Aos operadores: preposição 'a' + artigo masculino 'os' = "aos operadores".
3. O verbo 'obedecer' é estritamente Transitivo Indireto e rege a preposição 'a'. Como 'normas' é substantivo feminino plural com artigo 'as', ocorre crase: "obedecendo às normas".`,
    distractorAnalysis: [
      { letter: 'B', whyWrong: 'Falta crase no verbo visar e no verbo obedecer.' },
      { letter: 'C', whyWrong: 'A forma "a os" não existe e obedecer exige preposição a + artigo as = às.' },
      { letter: 'D', whyWrong: 'Não segue a regência padrão culta dos verbos visar e obedecer cobrada pela banca Cesgranrio.' },
      { letter: 'E', whyWrong: 'Falta crase em "às normas".' },
    ],
    cesgranrioTip: 'A Cesgranrio cobra sistematicamente a regência dos verbos: VISAR (no sentido de almejar = exige preposição a), OBEDECER/DESOBEDECER (exige preposição a) e ASPIRAR (no sentido de almejar = exige preposição a).'
  },
  {
    id: 'tp-19',
    topic: 'Básicos',
    subtopic: 'Língua Inglesa Instrumental: Vocabulário Técnico de Dados',
    difficulty: 'Fácil',
    statement: `Read the following excerpt from a technical paper on Machine Learning in Pipeline Integrity Management:

"Pipeline operators are leveraging end-to-end predictive pipelines to mitigate catastrophic pipeline leaks. By continuously ingesting high-throughput SCADA telemetry, the system triggers alerts when residual anomalies exceed established thresholds."

In this technical context, the words "mitigate" and "thresholds" mean, respectively:`,
    options: [
      { letter: 'A', text: 'Atenuar / reduzir o impacto; Limiares / valores-limite.' },
      { letter: 'B', text: 'Acelerar / antecipar; Médias móveis.' },
      { letter: 'C', text: 'Investigar / auditar; Sensores de pressão.' },
      { letter: 'D', text: 'Ignorar / descartar; Desvios-padrão.' },
      { letter: 'E', text: 'Comprovar / validar; Gráficos de dispersão.' },
    ],
    correctAnswer: 'A',
    explanationCorrect: `Na leitura técnica instrumental:
- "To mitigate": atenuar, amenizar, reduzir os riscos ou danos (cognato de mitigar).
- "Thresholds": limiares, níveis de corte, valores de referência a partir dos quais um alarme ou decisão é disparado.`,
    distractorAnalysis: [
      { letter: 'B', whyWrong: 'Mitigate não significa acelerar.' },
      { letter: 'C', whyWrong: 'Thresholds não são sensores físicos.' },
      { letter: 'D', whyWrong: 'Mitigate é o oposto de ignorar.' },
      { letter: 'E', whyWrong: 'Thresholds não significa gráficos de dispersão (scatter plots).' },
    ],
    cesgranrioTip: 'Nas questões de inglês da Cesgranrio para Ciência de Dados e TI, a banca costuma focar em vocabulário técnico de governança de riscos, arquitetura de sistemas e termos estatísticos.'
  },
  {
    id: 'tp-20',
    topic: 'Machine Learning',
    subtopic: 'Redução de Dimensionalidade: PCA vs t-SNE vs UMAP',
    difficulty: 'Difícil',
    statement: `Um cientista de dados está analisando um espaço vetorial com 500 features extraídas de sinais de espectrometria de petróleo bruto. Ele precisa aplicar uma técnica de redução de dimensionalidade para visualização 2D preservando prioritariamente a estrutura global e variância do espaço, além de servir como pré-processamento linear sem perda de ortogonalidade.

Qual método deve ser empregado e qual propriedade o fundamenta?`,
    options: [
      { letter: 'A', text: 'PCA (Análise de Componentes Principais), pois encontra projeções ortogonais não correlacionadas que maximizam a variância dos dados a partir dos autovetores da matriz de covariância.' },
      { letter: 'B', text: 't-SNE com perplexidade 30, pois seus eixos reduzidos possuem interpretação direta de variância explicada.' },
      { letter: 'C', text: 'UMAP com métrica de cosseno, pois é uma transformação puramente linear com garantia de reversibilidade exata.' },
      { letter: 'D', text: 'Autoencoders não lineares com ativação Sigmoid em todas as camadas sem função de perda.' },
      { letter: 'E', text: 'LDA (Linear Discriminant Analysis) sem rótulos de classe, pois não depende de informações supervisionadas.' },
    ],
    correctAnswer: 'A',
    explanationCorrect: `O PCA (Principal Component Analysis):
- É uma técnica não-supervisionada linear.
- Encontra direções ortogonais (autovetores da matriz de covariância amostral) que maximizam a variância explicada.
- Os autovalores quantificam a proporção de variância associada a cada componente principal.
- É ideal para reduzir multicolinearidade e preservar a estrutura global.`,
    distractorAnalysis: [
      { letter: 'B', whyWrong: 't-SNE é estocástico, não linear, preserva apenas vizinhanças locais e os eixos não possuem significado de variância explicada.' },
      { letter: 'C', whyWrong: 'UMAP é baseado em geometria Riemanniana não-linear, não sendo uma transformação linear.' },
      { letter: 'D', whyWrong: 'Autoencoders exigem função de perda de reconstrução.' },
      { letter: 'E', whyWrong: 'LDA é estritamente supervisionado (requer rótulos de classe para maximizar a separação entre classes).' },
    ],
    cesgranrioTip: 'Diferença clássica: PCA = Não supervisionado, linear, preserva estrutura global/variância; LDA = Supervisionado, busca separabilidade de classes.'
  }
];

export const INITIAL_ESSAY_SCENARIOS: EssayScenario[] = [
  {
    id: 'essay-01',
    title: 'Manutenção Preditiva em Malha de Dutos e Bombas de Terminais (Transpetro)',
    category: 'Manutenção Preditiva & Séries Temporais',
    estimatedTimeMinutes: 45,
    scenarioContext: `A Transpetro opera mais de 7.000 km de dutos e 48 terminais marítimos e terrestres. Bombas centrífugas de alta pressão e compressores são ativos críticos cuja falha não planejada pode interromper o fluxo de combustíveis, gerar riscos ambientais e prejuízos milionários.
A gerência de Tecnologia da Informação e Automação instalou sensores IoT de telemetria coletando vibração triaxial (RMS e espectro FFT), temperatura dos mancais, vazão e diferencial de pressão a cada 1 segundo.`,
    promptQuestion: `Na condição de Cientista de Dados de Nível Superior da Transpetro, elabore um plano técnico estruturado abordando:

a) A formulação matemática do problema de Ciência de Dados (classificação de falha iminente vs detecção de anomalias não supervisionada vs regressão de Vida Útil Remanescente - RUL).
b) Estratégias de engenharia de atributos (feature engineering) para os dados de telemetria de vibração e séries temporais de sensores.
c) Escolha da arquitetura de modelos de Machine Learning / Deep Learning, justificando a escolha frente ao desbalanceamento de falhas reais.
d) Pipeline de MLOps para inferência (Edge vs Nuvem), métricas de avaliação e estratégia de explicabilidade dos alertas para os operadores de campo (ex: SHAP).`,
    evaluationRubric: [
      'Definição precisa da abordagem de modelagem (RUL/Anomalia/Classificação)',
      'Técnicas de Fourier/Wavelet e estatísticas de janela móvel para vibração',
      'Modelagem com XGBoost/LSTM/Autoencoders e métricas adequadas (PR-AUC, F-beta)',
      'Arquitetura de MLOps: monitoramento de drift, inferência e explicabilidade com SHAP'
    ],
    keyConceptsExpected: [
      'FFT (Fast Fourier Transform)',
      'Kurtosis, RMS, Skewness em janelas móveis',
      'Autoencoders / Isolation Forest / XGBoost / LSTM',
      'RUL (Remaining Useful Life)',
      'Precision-Recall AUC / Custo da Falha',
      'SHAP / Feature Importance para a operação',
      'Data Drift / Evidently / MLflow'
    ]
  },
  {
    id: 'essay-02',
    title: 'Otimização Logística e Previsão de Demanda de Bunkering de Navios Petroleiros',
    category: 'Logística & Otimização',
    estimatedTimeMinutes: 40,
    scenarioContext: `A frota da Transpetro realiza transporte de petróleo bruto do pré-sal para refinarias e exportação, além do abastecimento de combustíveis marítimos (bunkering). O custo de combustível e o tempo de espera de navios em fundeio geram despesas de demurrage expressivas. A empresa deseja um sistema de suporte à decisão baseado em IA para prever a demanda portuária de atracação e otimizar rotas e abastecimento.`,
    promptQuestion: `Apresente uma proposta técnica abrangendo:

a) Levantamento de fontes de dados (dados AIS de rastreamento de navios, dados meteorológicos, dados de tanques e cotações de frete) e arquitetura de dados (Data Lakehouse / Delta Lake).
b) Modelagem preditiva de tempo estimado de chegada (ETA) e previsão de consumo de bunker (LightGBM, Séries Temporais Hierárquicas ou Modelos de Grafos Espaço-Temporais).
c) Formulação de otimização combinatória ou aprendizado por reforço para alocação de berços e roteamento.
d) Governança de dados segundo DAMA-DMBOK e conformidade com a LGPD em dados operacionais e de tripulação.`,
    evaluationRubric: [
      'Integração de dados AIS e streaming com Spark/Delta Lake',
      'Modelos de previsão de ETA e consumo de bunker com validação temporal',
      'Modelagem de otimização (Pesquisa Operacional / MILP / Grafos)',
      'Governança DAMA, rastreabilidade e LGPD'
    ],
    keyConceptsExpected: [
      'AIS (Automatic Identification System)',
      'Data Lakehouse / Medallion Architecture (Bronze, Silver, Gold)',
      'TimeSeries Split / Cross-Validation sem vazamento temporal',
      'MILP / Algoritmos Genéticos / Graph Neural Networks',
      'DAMA DMBOK / Linhagem de Dados / LGPD'
    ]
  },
  {
    id: 'essay-03',
    title: 'Detecção Automatizada de Vazamentos em Oleodutos Submarinos via Sensores Acústicos e Visão Computacional',
    category: 'Segurança Operacional & Visão Computacional',
    estimatedTimeMinutes: 45,
    scenarioContext: `Dutos submarinos da Transpetro que interligam plataformas offshore a terminais costeiros operam sob condições severas de pressão e salinidade. Para inspeção, utilizam-se Veículos Submarinos Operados Remotamente (ROVs) com câmeras de alta definição e redes de hidrofones acústicos instalados ao longo da linha.`,
    promptQuestion: `Como Cientista de Dados responsável, elabore a solução técnica contemplando:

a) Arquitetura de processamento multimodal (fusão de sinais acústicos de alta frequência com feed de vídeo dos ROVs).
b) Pré-processamento e modelos de Visão Computacional (YOLOv8 / Mask R-CNN / Segment Anything) para detecção de bolhas de gás e turbidez de hidrocarbonetos na coluna d'água.
c) Mitigação de falsos positivos causados por cardumes ou variações de correntes marinhas.
d) Estratégia de implantação em Edge Computing nos navios de apoio à inspeção marítima.`,
    evaluationRubric: [
      'Fusão sensorial multimodal (sinal temporal acústico + frames de vídeo)',
      'Arquiteturas modernas de Visão Computacional e detecção de objetos/segmentação',
      'Mecanismos de filtragem de ruído oceânico e validação cruzada temporal',
      'Edge deployment (ONNX / TensorRT / quantização INT8) em ambiente offshore'
    ],
    keyConceptsExpected: [
      'Multimodal Sensor Fusion',
      'YOLOv8 / Vision Transformers / Mask R-CNN',
      'Spectrogram Audio Classification (CNN-2D / Conformer)',
      'Edge AI / TensorRT / ONNX Runtime',
      'False Alarm Rate (FAR) / PR-AUC'
    ]
  }
];

export const INITIAL_FLASHCARDS: Flashcard[] = [
  {
    id: 'fc-01',
    topic: 'Estatística',
    front: 'Teorema Central do Limite (TCL)',
    back: 'Para qualquer população com média μ e variância finita σ², a distribuição da média amostral (X̄) aproxima-se de uma Normal N(μ, σ²/n) à medida que o tamanho amostral n cresce (geralmente n ≥ 30), independentemente da distribuição original da população.',
    formulaOrCode: 'x_barra ~ norm(loc=mu, scale=sigma / np.sqrt(n))',
    examFrequency: 'Altíssima'
  },
  {
    id: 'fc-02',
    topic: 'Machine Learning',
    front: 'Regularização L1 (Lasso) vs L2 (Ridge)',
    back: 'L1 (Lasso) adiciona penalidade proporcional ao valor absoluto dos coeficientes (|w|), forçando pesos menos importantes a zero (faz Feature Selection). L2 (Ridge) adiciona penalidade proporcional ao quadrado dos coeficientes (w²), encolhendo os pesos sem zerá-los (trata multicolinearidade).',
    formulaOrCode: 'loss_l1 = mse + reg_lambda * np.sum(np.abs(w))\nloss_l2 = mse + reg_lambda * np.sum(w ** 2)',
    examFrequency: 'Altíssima'
  },
  {
    id: 'fc-03',
    topic: 'Machine Learning',
    front: 'Trade-off Viés vs Variância (Bias-Variance)',
    back: 'Alto Viés (Underfitting): Modelo simples demais, não captura padrões nos dados de treino. Alta Variância (Overfitting): Modelo complexo demais, memoriza o ruído do treino e generaliza mal para dados inéditos. Bagging reduz variância; Boosting reduz viés.',
    formulaOrCode: 'erro_total = (vies ** 2) + variancia + erro_irredutivel',
    examFrequency: 'Altíssima'
  },
  {
    id: 'fc-04',
    topic: 'Big Data & SQL',
    front: 'SQL Window Functions: ROW_NUMBER vs RANK vs DENSE_RANK',
    back: 'ROW_NUMBER(): Atribui inteiros sequenciais únicos (1, 2, 3, 4) mesmo com empates.\nRANK(): Atribui a mesma posição para empates e pula posições subsequentes (1, 2, 2, 4).\nDENSE_RANK(): Atribui a mesma posição para empates sem pular números (1, 2, 2, 3).',
    formulaOrCode: 'DENSE_RANK() OVER (PARTITION BY duto ORDER BY pressao DESC)',
    examFrequency: 'Alta'
  },
  {
    id: 'fc-05',
    topic: 'Machine Learning',
    front: 'Matriz de Confusão: Precision vs Recall vs F1-Score',
    back: 'Precisão: De todos os preditos positivos, quantos eram realmente positivos? VP / (VP + FP)\nRecall (Sensibilidade): De todos os reais positivos, quantos foram encontrados? VP / (VP + FN)\nF1-Score: Média harmônica entre Precisão e Recall.',
    formulaOrCode: 'f1 = 2 * (precision * recall) / (precision + recall)',
    examFrequency: 'Altíssima'
  },
  {
    id: 'fc-06',
    topic: 'Governança & LGPD',
    front: 'Bases Legais da LGPD (Lei 13.709/2018) para Tratamento de Dados',
    back: 'Art. 7º: Consentimento do titular, cumprimento de obrigação legal/regulatória, execução de políticas públicas, estudos por órgão de pesquisa (com anonimização), execução de contrato, exercício regular de direitos, proteção da vida, tutela da saúde, legítimo interesse do controlador e proteção do crédito.',
    formulaOrCode: '10 Bases Legais - Art. 7º LGPD',
    examFrequency: 'Alta'
  },
  {
    id: 'fc-07',
    topic: 'Estatística',
    front: 'P-Valor (Valor-P) na Inferência Frequentista',
    back: 'O p-valor é a probabilidade de se obter uma estatística de teste igual ou mais extrema do que a observada na amostra, SOB A SUPOSIÇÃO DE QUE A HIPÓTESE NULA (H0) SEJA VERDADEIRA. Não é a probabilidade de H0 ser verdadeira!',
    formulaOrCode: 'p-valor = P(Estatística Amostral >= Observada | H0 é verdadeira)',
    examFrequency: 'Altíssima'
  },
  {
    id: 'fc-08',
    topic: 'Big Data & SQL',
    front: 'Apache Spark: Narrow vs Wide Transformations',
    back: 'Narrow (map, filter, flatMap, withColumn): Opera dentro de cada partição local sem troca de dados na rede (sem Shuffle).\nWide (groupByKey, reduceByKey, join, distinct, repartition): Exige redistribuição de dados por chave através da rede entre os executores (provoca Shuffle).',
    formulaOrCode: 'Wide = Shuffle na Rede (Gargalo de I/O)',
    examFrequency: 'Altíssima'
  }
];

export const SYLLABUS_TOPICS: TopicProgress[] = [
  {
    topicId: 'cb-portugues',
    name: 'Língua Portuguesa',
    category: 'Básicos',
    weight: 10,
    masteryPercentage: 75,
    questionsSolved: 28,
    correctCount: 21,
    subtopics: [
      'Compreensão e interpretação de textos de gêneros variados',
      'Reconhecimento de tipos e gêneros textuais (dissertativo, expositivo, injuntivo)',
      'Domínio da ortografia oficial e acentuação gráfica',
      'Mecanismos de coesão textual: referenciação, anáfora, catáfora e conectores',
      'Emprego de tempos e modos verbais (subjuntivo vs indicativo)',
      'Estrutura morfossintática: classes de palavras e relações de coordenação e subordinação',
      'Emprego dos sinais de pontuação (regras obrigatórias e proibições da vírgula)',
      'Concordância verbal e nominal (casos clássicos Cesgranrio e partícula SE)',
      'Regência verbal e nominal; emprego do sinal indicativo de crase',
      'Colocação dos pronomes átonos (próclise, mesóclise e ênclise)',
      'Reescrita de frases e parágrafos: significação, sinonímia e reestruturação sintática'
    ]
  },
  {
    topicId: 'cb-ingles',
    name: 'Língua Inglesa Técnica',
    category: 'Básicos',
    weight: 5,
    masteryPercentage: 80,
    questionsSolved: 15,
    correctCount: 12,
    subtopics: [
      'Compreensão de textos escritos em língua inglesa gerais e técnicos',
      'Itens gramaticais: tempos verbais, conectores discursivos, modais e voz passiva',
      'Vocabulário técnico em Ciência de Dados, Engenharia de Software e IA'
    ]
  },
  {
    topicId: 'b1-sup-ml',
    name: 'Aprendizado Supervisionado & Seleção de Modelos',
    category: 'Machine Learning',
    weight: 20,
    masteryPercentage: 74,
    questionsSolved: 35,
    correctCount: 27,
    subtopics: [
      'Regressão e Classificação e métricas de avaliação (ROC-AUC, PR-AUC, F1, LogLoss, RMSE, R²)',
      'Overfitting e underfitting, diagnóstico por curvas de aprendizado',
      'Técnicas de regularização: L1 Lasso (esparsidade), L2 Ridge e ElasticNet',
      'Seleção de modelos (erro de generalização) e validação cruzada (K-fold, Stratified)',
      'Divisão de dados em treino, validação e teste sem Data Leakage',
      'Trade-off entre Variância e Viés (Bias-Variance Tradeoff)',
      'Algoritmos: Regressão Linear, Logística, Árvores de Decisão e Random Forests',
      'Máquina de Suporte de Vetores (SVM) com Margem Suave e Kernel Trick (Linear, RBF)',
      'Classificador Naive Bayes e K-Nearest Neighbors (K-NN)',
      'Técnicas de Ensembles: Bagging, Boosting (AdaBoost, XGBoost, LightGBM, CatBoost) e Stacking',
      'Aprendizado supervisionado com Scikit-Learn (Pipelines, ColumnTransformer)',
      'Otimização de hiperparâmetros: Grid Search, Random Search e Otimização Bayesiana'
    ]
  },
  {
    topicId: 'b1-unsup-ml',
    name: 'Aprendizado Não Supervisionado & Clustering',
    category: 'Machine Learning',
    weight: 15,
    masteryPercentage: 70,
    questionsSolved: 20,
    correctCount: 14,
    subtopics: [
      'Redução de dimensionalidade: Análise de Componentes Principais (PCA)',
      'Propriedades dos autovalores e autovetores da matriz de covariância no PCA',
      'Critérios de variância explicada acumulada e Scree Plot',
      'Algoritmo K-Means: inicialização K-Means++, inércia e Método do Cotovelo',
      'Métricas de clustering: Coeficiente de Silhueta (Silhouette Score) e Davies-Bouldin',
      'Mistura de Gaussianas (GMM - Gaussian Mixture Models) e Algoritmo EM',
      'DBSCAN: clustering baseado em densidade (pontos core, border e ruído)',
      'Clustering Hierárquico e análise de dendrogramas',
      'Noções de projeção não-linear de baixa dimensão: t-SNE e UMAP'
    ]
  },
  {
    topicId: 'b1-dl-neural',
    name: 'Redes Neurais Artificiais & Deep Learning',
    category: 'Machine Learning',
    weight: 15,
    masteryPercentage: 65,
    questionsSolved: 22,
    correctCount: 15,
    subtopics: [
      'Perceptron simples e Perceptron Multicamadas (MLP)',
      'Funções de ativação: Sigmoide, Tanh, ReLU, Leaky ReLU e Softmax',
      'Algoritmo Backpropagation e atualização de pesos pela regra da cadeia',
      'Otimizadores estocásticos: SGD, Momentum, RMSprop e Adam',
      'Regularização em Redes Neurais: Dropout, Weight Decay e Batch Normalization',
      'Redes Neurais Convolucionais (CNNs): convolução, stride, padding e pooling',
      'Redes Neurais Recorrentes (RNNs, LSTM e GRU) para sequências e séries temporais',
      'Treino prático com bibliotecas Python (PyTorch e Keras/TensorFlow)',
      'Conceitos de Mecanismos de Atenção e Arquitetura Transformer (Self-Attention, BERT, GPT)'
    ]
  },
  {
    topicId: 'b1-nlp',
    name: 'Processamento de Linguagem Natural (NLP)',
    category: 'Machine Learning',
    weight: 10,
    masteryPercentage: 72,
    questionsSolved: 16,
    correctCount: 12,
    subtopics: [
      'Pré-processamento: tokenização, remoção de stopwords, pontuação e normalização',
      'Stemming (algoritmos heurísticos) vs Lemmatização (morfológica)',
      'Representação vetorial: Bag of Words (BoW) e N-Grams',
      'TF-IDF (Term Frequency - Inverse Document Frequency) e penalização de termos comuns',
      'Word Embeddings densos: Word2Vec (arquiteturas CBOW e Skip-Gram)',
      'Embeddings pré-treinados: GloVe e FastText',
      'Modelagem de tópicos probabilística com LDA (Latent Dirichlet Allocation)'
    ]
  },
  {
    topicId: 'b2-linear-algebra',
    name: 'Álgebra Linear & Python NumPy',
    category: 'Estatística',
    weight: 15,
    masteryPercentage: 68,
    questionsSolved: 24,
    correctCount: 16,
    subtopics: [
      'Notação e operações matriciais: produto escalar, produto matricial e produto vetorial',
      'Matrizes especiais: identidade, transposta, inversa, simétrica e ortogonal',
      'Determinante e traço de matrizes e suas propriedades com autovalores',
      'Normas vetoriais e matriciais: Norma L1, Norma L2, Norma infinito e Frobenius',
      'Autovalores, autovetores e diagonalização de matrizes simétricas',
      'Decomposição em Valores Singulares (SVD: A = U Σ V^T)',
      'Decomposição de Cholesky (A = L L^T) para matrizes simétricas positivas definidas',
      'Computação vetorizada com NumPy: arrays ndarray, dtypes e indexação booleana',
      'Regras de Broadcasting no NumPy e módulo numpy.linalg'
    ]
  },
  {
    topicId: 'b2-calculus-opt',
    name: 'Cálculo Diferencial & Otimização Numérica',
    category: 'Estatística',
    weight: 10,
    masteryPercentage: 62,
    questionsSolved: 18,
    correctCount: 11,
    subtopics: [
      'Funções de uma e várias variáveis, limites, continuidade e regras de derivação',
      'Regra da cadeia para funções compostas multivariáveis',
      'Derivadas parciais de primeira e segunda ordens e Teorema de Schwarz',
      'Vetor Gradiente (∇f): interpretação geométrica e ortogonalidade às curvas de nível',
      'Matriz Hessiana: determinação de concavidade, convexidade e teste da segunda derivada',
      'Pontos críticos: determinação analítica (∇f = 0) e classificação (mínimo, máximo, sela)',
      'Algoritmo do Gradiente Descendente (Gradient Descent) e taxa de aprendizado',
      'Variações do Gradiente: Batch, Mini-batch e Stochastic Gradient Descent (SGD)',
      'Multiplicadores de Lagrange e condições KKT para otimização com restrições'
    ]
  },
  {
    topicId: 'b2-prob-stat',
    name: 'Probabilidade, Estatística & Testes de Hipóteses',
    category: 'Estatística',
    weight: 20,
    masteryPercentage: 70,
    questionsSolved: 30,
    correctCount: 21,
    subtopics: [
      'Axiomas da probabilidade, eventos independentes e probabilidade condicional',
      'Teorema de Bayes e Lei da Probabilidade Total',
      'Variáveis aleatórias discretas e contínuas, FDP e FDA',
      'Esperança, variância, covariância e correlação de Pearson e Spearman',
      'Distribuições discretas: Bernoulli, Binomial, Poisson, Geométrica e Hipergeométrica',
      'Distribuições contínuas: Normal, Normal Padrão Z, t de Student, Qui-Quadrado, F e Dirichlet',
      'Estatística Descritiva: medidas de tendência central, dispersão e separatrizes',
      'Visualização e detecção de outliers: Boxplot, quartis, IQR e critério de Tukey',
      'Teorema Central do Limite (TCL) e distribuição das médias amostrais',
      'Estimador de Máxima Verossimilhança (MLE) e Intervalos de Confiança',
      'Testes de Hipóteses: formulação de H0/H1, α, erros tipo I e II, poder do teste e p-valor',
      'Testes paramétricos (Z, t de Student, ANOVA) e não-paramétricos (Qui-Quadrado, Mann-Whitney)',
      'Metodologia e dimensionamento amostral de Testes A/B'
    ]
  },
  {
    topicId: 'b2-data-structures',
    name: 'Estruturas de Dados & Algoritmos (Big-O)',
    category: 'Python & MLOps',
    weight: 10,
    masteryPercentage: 75,
    questionsSolved: 18,
    correctCount: 14,
    subtopics: [
      'Complexidade assintótica de tempo e espaço e Notação Big-O',
      'Estruturas lineares: Arrays dinâmicos, Listas Encadeadas, Pilhas (LIFO) e Filas (FIFO)',
      'Tabelas Hash (dicionários): funções de hash, tratamento de colisões e custo O(1)',
      'Árvores Binárias de Busca (BST), árvores balanceadas (AVL) e percursos',
      'Heaps Binários (Min-Heap, Max-Heap) e Filas de Prioridade',
      'Algoritmos de busca: Busca Linear O(n) vs Busca Binária O(log n)',
      'Algoritmos de ordenação: Quicksort, Mergesort e Heapsort',
      'Noções de Grafos: matriz e lista de adjacência, busca em largura (BFS) e profundidade (DFS)'
    ]
  },
  {
    topicId: 'b2-pandas-data',
    name: 'Manipulação de Dados com Python Pandas',
    category: 'Python & MLOps',
    weight: 15,
    masteryPercentage: 82,
    questionsSolved: 25,
    correctCount: 21,
    subtopics: [
      'Estruturas Series e DataFrame no Pandas',
      'Leitura e gravação de arquivos: CSV, Parquet, Excel, JSON e SQL',
      'Indexação e seleção: .loc (rótulos, inclusivo) vs .iloc (inteiros, exclusivo) e .query()',
      'Filtragem booleana composta com operadores bitwise (&, |, ~)',
      'Tratamento de dados ausentes: isna(), dropna(), fillna() e imputação',
      'Identificação e remoção de duplicatas com drop_duplicates()',
      'Transformações de colunas com .apply(), .map() e operações vetorizadas',
      'Agrupamentos e agregações: groupby(), .agg(), .transform() e pivot_table()',
      'Junções relacionais com pd.merge() e concatenações com pd.concat()',
      'Séries temporais no Pandas: pd.to_datetime, .resample() e janelas móveis .rolling()'
    ]
  },
  {
    topicId: 'b2-bigdata-spark',
    name: 'Big Data, Hadoop, Apache Spark & Lakehouse',
    category: 'Big Data & SQL',
    weight: 20,
    masteryPercentage: 78,
    questionsSolved: 28,
    correctCount: 22,
    subtopics: [
      'Conceitos fundamentais dos 5 Vs de Big Data',
      'Arquitetura Apache Hadoop: HDFS (NameNode, DataNodes, replicação) e MapReduce',
      'YARN: gerenciamento e alocação de recursos em cluster',
      'Apache Spark: Driver, Cluster Manager, Executors e computação em memória',
      'Abstrações PySpark: RDDs, DataFrames e Datasets',
      'Transformações Narrow (map, filter) vs Transformações Wide (groupBy, join com Shuffle)',
      'Avaliação preguiçosa (Lazy Evaluation), grafo DAG e Otimizador Catalyst',
      'Otimizações no Spark: particionamento, Broadcast Hash Join e cache()/persist()',
      'Armazenamento orientado a objetos (Object Store: S3, GCS, Blob)',
      'Formatos colunares: Apache Parquet e Apache ORC vs formatos linha (CSV, Avro)',
      'Data Warehouse vs Data Lake vs Data Lakehouse (Delta Lake, Apache Iceberg, ACID, Time-Travel)'
    ]
  },
  {
    topicId: 'b2-devops-mlops',
    name: 'Containers (Docker), DevOps & MLOps',
    category: 'Python & MLOps',
    weight: 10,
    masteryPercentage: 68,
    questionsSolved: 16,
    correctCount: 11,
    subtopics: [
      'Virtualização leve por Containers vs Máquinas Virtuais (cgroups e namespaces)',
      'Tecnologia Docker: Imagens, Camadas Copy-on-Write, Containers, Volumes e Redes',
      'Instruções de Dockerfile: FROM, RUN, COPY, WORKDIR, ENV, CMD vs ENTRYPOINT',
      'Registros de containers e noções de orquestração com Kubernetes (Pods, Deployments)',
      'Controle de versão com Git: áreas de trabalho, commits, branches, merge vs rebase',
      'Pipelines de Integração Contínua e Entrega Contínua (CI/CD)',
      'Ciclo de vida de MLOps: rastreamento com MLflow e versionamento de dados com DVC',
      'Monitoramento em produção: detecção de Data Drift e Concept Drift e retreinamento'
    ]
  },
  {
    topicId: 'b3-governanca-dmbok',
    name: 'Governança de Dados & Framework DAMA-DMBOK',
    category: 'Governança & LGPD',
    weight: 10,
    masteryPercentage: 85,
    questionsSolved: 15,
    correctCount: 13,
    subtopics: [
      'Princípios de governança de dados corporativos e modelos (centralizado, federado)',
      'Papéis e responsabilidades: Data Owner, Data Steward e Data Custodian',
      'Framework DAMA-DMBOK e a Roda das 11 funções de gerenciamento',
      'Dimensões da Qualidade de Dados: Acurácia, Completude, Consistência, Tempestividade, Unicidade',
      'Gestão de Metadados: Metadados de Negócio, Técnicos e Operacionais',
      'Catálogo de Dados corporativo e Linhagem de Dados (Data Lineage end-to-end)'
    ]
  },
  {
    topicId: 'b3-lgpd',
    name: 'Legislação e Privacidade - LGPD (Lei nº 13.709/2018)',
    category: 'Governança & LGPD',
    weight: 15,
    masteryPercentage: 88,
    questionsSolved: 20,
    correctCount: 18,
    subtopics: [
      'Âmbito de aplicação territorial e material da LGPD',
      'Dado Pessoal, Dado Pessoal Sensível e Dado Anonimizado vs Pseudonimizado',
      'Os 10 Princípios da LGPD (Art. 6º): finalidade, necessidade, transparência, segurança, etc.',
      'As 10 Bases Legais para tratamento de dados comuns (Art. 7º) e dados sensíveis (Art. 11)',
      'Direitos dos titulares de dados (Art. 18): acesso, correção, eliminação, portabilidade',
      'Agentes de tratamento: Controlador vs Operador e Encarregado (DPO)',
      'Atribuições e sanções da Autoridade Nacional de Proteção de Dados (ANPD)',
      'Relatório de Impacto à Proteção de Dados Pessoais (RIPD)'
    ]
  },
  {
    topicId: 'b3-etica-xai',
    name: 'Ética, Explicabilidade (XAI) & IA Responsável',
    category: 'Governança & LGPD',
    weight: 10,
    masteryPercentage: 80,
    questionsSolved: 14,
    correctCount: 12,
    subtopics: [
      'Princípios de IA Responsável: equidade, confiabilidade, transparência e mitigação de viés',
      'Tipologia de vieses: amostragem, histórico, confirmação e métricas de paridade',
      'Modelos interpretáveis (White-Box) vs modelos caixa-preta (Black-Box)',
      'Explicabilidade pós-hoc com SHAP (Valores de Shapley / Teoria dos Jogos)',
      'Explicabilidade local com LIME (modelos substitutos interpretáveis)',
      'Segurança em IA: ataques adversariais (FGSM), envenenamento de dados (Data Poisoning) e extração'
    ]
  }
];

