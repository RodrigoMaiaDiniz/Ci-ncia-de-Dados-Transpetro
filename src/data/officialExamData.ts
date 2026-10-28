import { Question, OfficialExam } from '../types';

export const OFFICIAL_PETROBRAS_2021_EXAM: OfficialExam = {
  id: 'petrobras-2021-cd',
  title: 'Petrobras – Edital 2021 (Aplicação 20/02/2022)',
  institution: 'Petróleo Brasileiro S.A. – PETROBRAS',
  board: 'CEBRASPE / CESGRANRIO (Padrão Oficial)',
  year: 2022,
  totalItems: 120,
  description: 'Caderno de Prova e Gabarito Oficial Definitivo completo para Ciência de Dados (Conhecimentos Básicos + Conhecimentos Específicos Blocos I, II e III).',
  items: [
    // --- CONHECIMENTOS BÁSICOS: LÍNGUA PORTUGUESA & INGLESA ---
    {
      itemNumber: 1,
      statement: 'Dado o fato de o vocábulo "mas", em sua primeira ocorrência no segundo período do primeiro parágrafo, ter sido empregado com sentidos adversativo, de oposição, os sentidos originais do texto seriam mantidos caso ele fosse substituído por porém.',
      officialAnswer: 'E',
      discipline: 'Conhecimentos Básicos',
      subtopic: 'Conectivos e Relações Aditivas vs Adversativas',
      block: 'Conhecimentos Básicos',
      explanation: 'Gabarito Oficial: ERRADO (E). No trecho "A visão do Sol representa não só o alcance da Verdade..., mas também, como diz Sócrates...", a correlação sintática "não só... mas também" tem valor ADITIVO (soma de ideias) e não adversativo/opositivo. Substituir por "porém" quebraria a estrutura de adição.',
      cesgranrioTrap: 'A banca adora colocar a conjunção "mas" dentro da estrutura correlativa "não só... mas também" para induzir o candidato a marcar adversativa por reflexo.'
    },
    {
      itemNumber: 2,
      statement: 'Depreende-se do texto que as visões de Sócrates e Platão convergem ao relacionar a justiça ao conhecimento do Bem.',
      officialAnswer: 'C',
      discipline: 'Conhecimentos Básicos',
      subtopic: 'Compreensão e Interpretação Textual',
      block: 'Conhecimentos Básicos',
      explanation: 'Gabarito Oficial: CERTO (C). O texto aponta que Sócrates conclui que a ideia do Bem é causa de tudo o que há de reto e belo, e Platão afirma que conhecer o Bem significa tornar-se virtuoso, concluindo que aquele que conhece a justiça age de modo justo.',
      cesgranrioTrap: 'Interpretação literal ancorada na convergência expressa no texto filosófico.'
    },
    {
      itemNumber: 4,
      statement: 'O termo "Alegoria", empregado no texto precedente, alude à ideia de representação.',
      officialAnswer: 'C',
      discipline: 'Conhecimentos Básicos',
      subtopic: 'Semântica e Figuras de Linguagem',
      block: 'Conhecimentos Básicos',
      explanation: 'Gabarito Oficial: CERTO (C). Alegoria é uma figura de estilo ou modo de expressão no qual uma coisa é descrita sob a imagem ou representação figurada de outra.',
      cesgranrioTrap: 'Questão semântica direta; a alegoria da caverna funciona como metáfora e representação figurativa.'
    },
    {
      itemNumber: 9,
      statement: 'No texto sobre internet e crimes contra a honra, predomina o tipo textual dissertativo-argumentativo.',
      officialAnswer: 'C',
      discipline: 'Conhecimentos Básicos',
      subtopic: 'Tipologia Textual',
      block: 'Conhecimentos Básicos',
      explanation: 'Gabarito Oficial: CERTO (C). O texto defende uma tese a respeito do impacto semântico e moral do compartilhamento de fake news, apresentando argumentos e juízo de valor com o objetivo de persuadir o leitor.',
      cesgranrioTrap: 'Diferenciar dissertação expositiva (apenas informa fatos) de dissertação argumentativa (defende tese e juízo de valor).'
    },
    {
      itemNumber: 13,
      statement: 'Sem prejuízo dos sentidos originais e da correção gramatical do texto, o trecho "falsa responsabilidade do que é postado ou compartilhado" (segundo período) poderia ser substituído por falsa responsabilidade do que se posta ou se compartilha.',
      officialAnswer: 'C',
      discipline: 'Conhecimentos Básicos',
      subtopic: 'Voz Passiva Analítica vs Voz Passiva Pragmática (Partícula Apassivadora)',
      block: 'Conhecimentos Básicos',
      explanation: 'Gabarito Oficial: CERTO (C). A transposição da voz passiva analítica ("é postado ou compartilhado") para a voz passiva sintética ("se posta ou se compartilha", com "se" como partícula apassivadora) mantém rigorosamente o sentido e a gramática.',
      cesgranrioTrap: 'A partícula "se" apassivadora preserva a equivalência com a locução passiva com verbo ser.'
    },
    {
      itemNumber: 31,
      statement: 'There are three fake Old West towns in the province of Almería, in Spain.',
      officialAnswer: 'C',
      discipline: 'Conhecimentos Básicos',
      subtopic: 'Língua Inglesa - Textual Reading',
      block: 'Conhecimentos Básicos',
      explanation: 'Gabarito Oficial: CERTO (C). O texto afirma explicitamente: "It\'s one of three faux Old Western towns in the small village of Tabernas and the surrounding desert of the Almería province". O termo "faux" é sinônimo direto de "fake".',
      cesgranrioTrap: 'Identificar sinônimos eruditos em inglês como "faux" = "fake/artificial".'
    },
    {
      itemNumber: 34,
      statement: 'In the fragment "The good guy only has to keep things in order", the word "has" could be correctly replaced with must, without changing the meaning of the text.',
      officialAnswer: 'E',
      discipline: 'Conhecimentos Básicos',
      subtopic: 'Língua Inglesa - Modais Semânticos',
      block: 'Conhecimentos Básicos',
      explanation: 'Gabarito Oficial: ERRADO (E). Substituir apenas a palavra "has" por "must" resultaria na construção agramatical "The good guy only must to keep...", pois o modal auxiliar "must" não admite a preposição "to" antes do verbo no infinitivo ("must keep").',
      cesgranrioTrap: 'Pegadinha gramatical estrita da banca: modal verbs em inglês (must, can, should) são seguidos de infinitivo sem "to".'
    },

    // --- CONHECIMENTOS ESPECÍFICOS: BLOCO I ---
    {
      itemNumber: 51,
      statement: 'Para evitar um erro de ponderação arbitrária, deve-se recorrer ao artifício de uso de variáveis dummy, o que permitirá a estratificação da amostra da maneira que for definido um determinado critério, evento ou atributo, para então serem inseridas no modelo em análise; isso permitirá o estudo da relação entre o comportamento de determinada variável explicativa qualitativa e o fenômeno em questão, representado pela variável dependente.',
      officialAnswer: 'C',
      discipline: 'Modelagem e Regressão',
      subtopic: 'Variáveis Dummy e Escalas Qualitativas',
      block: 'Bloco I',
      explanation: 'Gabarito Oficial: CERTO (C). O uso de variáveis dummy (indicadoras binárias 0 ou 1) impede que se atribua uma escala métrica arbitrária a categorias qualitativas nominais (como 1=Norte, 2=Sul), permitindo medir o efeito de cada categoria sobre a variável dependente.',
      cesgranrioTrap: 'Lembrar que para K categorias, inserem-se K - 1 dummies para evitar colinearidade perfeita (dummy variable trap).'
    },
    {
      itemNumber: 52,
      statement: 'A matriz de confusão apresenta três rótulos de classe; os elementos diagonais representam o número de pontos para os quais o rótulo previsto é igual ao rótulo verdadeiro, enquanto qualquer coisa fora da diagonal teve um rótulo atribuído erroneamente pelo classificador. Quanto menores forem os valores diagonais da matriz de confusão, melhor o modelo adotado.',
      officialAnswer: 'E',
      discipline: 'Machine Learning',
      subtopic: 'Métricas e Matriz de Confusão',
      block: 'Bloco I',
      explanation: 'Gabarito Oficial: ERRADO (E). A diagonal principal de uma matriz de confusão contém as predições corretas (Verdadeiros Positivos de cada classe). Logo, quanto MAIORES forem os valores na diagonal principal, melhor é a acurácia e a taxa de acerto do modelo.',
      cesgranrioTrap: 'A banca tentou inverter "maiores" por "menores" no final do comando de leitura rápida.'
    },
    {
      itemNumber: 53,
      statement: 'As curvas ROC mostram a taxa de especificidade (verdadeiros positivos) versus a taxa de sensibilidade (falsos positivos) do modelo adotado; a linha tracejada é a linha de base da métrica de avaliação e define uma adivinhação aleatória.',
      officialAnswer: 'E',
      discipline: 'Machine Learning',
      subtopic: 'Curva ROC (TPR vs FPR)',
      block: 'Bloco I',
      explanation: 'Gabarito Oficial: ERRADO (E). O item inverteu dois conceitos-chave: a Sensibilidade (Recall) é a Taxa de Verdadeiros Positivos (TPR, eixo Y), enquanto o eixo X é a Taxa de Falsos Positivos (FPR = 1 - Especificidade). Especificidade não é verdadeiro positivo.',
      cesgranrioTrap: 'Confundir Sensibilidade (Recall/TPR) com Especificidade (TNR).'
    },
    {
      itemNumber: 54,
      statement: 'A região do gráfico entre as duas curvas (treinamento e validação), indicada pela letra B, mostra a região de erro de generalização para o modelo de aprendizado de máquina.',
      officialAnswer: 'C',
      discipline: 'Machine Learning',
      subtopic: 'Curvas de Aprendizado e Erro de Generalização',
      block: 'Bloco I',
      explanation: 'Gabarito Oficial: CERTO (C). O hiato ou gap entre o erro no conjunto de treino (baixo) e o erro no conjunto de validação (alto) representa a perda de generalização para dados não vistos (gap de overfitting).',
      cesgranrioTrap: 'A distância vertical entre a curva de validação e a de treino define a variância/generalization gap.'
    },
    {
      itemNumber: 55,
      statement: 'O Set de Treinamento é usado para qualificar o desempenho do modelo, enquanto o Set de Validação é utilizado para criar o modelo de aprendizado de máquina.',
      officialAnswer: 'E',
      discipline: 'Machine Learning',
      subtopic: 'Particionamento Treino / Validação',
      block: 'Bloco I',
      explanation: 'Gabarito Oficial: ERRADO (E). A ordem é exatamente o inverso: o conjunto de treinamento é usado para CRIAR/treinar o modelo (ajustar os parâmetros internos), enquanto a validação é usada para QUALIFICAR o desempenho e selecionar hiperparâmetros.',
      cesgranrioTrap: 'Inversão proposital de papéis entre set de treino e validação.'
    },
    {
      itemNumber: 56,
      statement: 'Considerando que a variância é um erro de sensibilidade para pequenas flutuações no conjunto de treinamento, infere-se que um baixo nível de variância pode fazer que o algoritmo associado a um modelo de aprendizado de máquina perca as relações relevantes entre os atributos de entrada e a variável de saída, caracterizando o erro de overfitting, percebido na região à direita do ponto A.',
      officialAnswer: 'E',
      discipline: 'Machine Learning',
      subtopic: 'Tradeoff Viés-Variância (Overfitting vs Underfitting)',
      block: 'Bloco I',
      explanation: 'Gabarito Oficial: ERRADO (E). O erro de perder relações relevantes devido a modelo simplista demais é o erro de BIAS (alto viés), caracterizando UNDERFITTING, e não overfitting.',
      cesgranrioTrap: 'Mistura conceitual: alto viés gera underfitting; alta variância gera overfitting.'
    },
    {
      itemNumber: 57,
      statement: 'Quando se verifica um alto erro no treinamento com valor próximo ao erro na validação, percebido na região à esquerda do ponto A, tem-se um clássico problema de underfitting, caracterizado pelo alto valor do bias.',
      officialAnswer: 'C',
      discipline: 'Machine Learning',
      subtopic: 'Diagnóstico de Underfitting',
      block: 'Bloco I',
      explanation: 'Gabarito Oficial: CERTO (C). Se o erro no treinamento é alto e o erro na validação é similarmente alto (curvas convergem em patamar ruim), o modelo é incapaz de capturar o padrão dos dados: alto bias / underfitting.',
      cesgranrioTrap: 'Característica marcante: sobressai o erro já no próprio treino.'
    },
    {
      itemNumber: 58,
      statement: 'Uma forma de melhorar o modelo de regressão linear para a situação em questão é utilizar o modelo de regressão logística, uma vez que a variável dependente se apresenta de forma quantitativa.',
      officialAnswer: 'E',
      discipline: 'Modelagem e Regressão',
      subtopic: 'Regressão Linear vs Regressão Logística',
      block: 'Bloco I',
      explanation: 'Gabarito Oficial: ERRADO (E). A regressão logística é utilizada exclusivamente quando a variável resposta é QUALITATIVA (categórica binária ou multinomial). A variável em questão (tempo em minutos) é quantitativa contínua.',
      cesgranrioTrap: 'Regressão logística estima probabilidade de classe P(Y=1|X), não variáveis contínuas numéricas.'
    },
    {
      itemNumber: 59,
      statement: 'Pelo modelo de regressão linear simples, a equação que expressa o relacionamento ajustado entre a variável y em função de x é y_hat = (85/70)*x_i + alpha, em que alpha é uma constante.',
      officialAnswer: 'C',
      discipline: 'Estatística e Regressão',
      subtopic: 'Mínimos Quadrados Ordinários (MQO)',
      block: 'Bloco I',
      explanation: 'Gabarito Oficial: CERTO (C). No estimador MQO simples, beta_1 = sum((x_i - x_bar)(y_i - y_bar)) / sum((x_i - x_bar)^2). Pelos dados da tabela oficial: numerador = 28 - 12 - 2 - 7 + 78 = 85; denominador = 16 + 16 + 1 + 1 + 36 = 70. Logo beta_1 = 85/70.',
      cesgranrioTrap: 'Cálculo manual direto na tabela do caderno de prova da Petrobras.'
    },
    {
      itemNumber: 60,
      statement: 'Se o processo adotado para a construção de árvores de decisão for determinístico, uma forma de obtenção de árvores aleatórias, que compõem as florestas aleatórias, pode ser realizada por meio do bootstrap dos dados, em que cada árvore é treinada com base no resultado de bootstrap_sample(inputs).',
      officialAnswer: 'C',
      discipline: 'Machine Learning',
      subtopic: 'Random Forests e Bootstrap Sampling',
      block: 'Bloco I',
      explanation: 'Gabarito Oficial: CERTO (C). Florestas Aleatórias (Random Forests) combinam Bagging (amostragem com reposição bootstrap dos dados de treino) com a seleção aleatória de subespaços de atributos para descorrelacionar as árvores determinísticas.',
      cesgranrioTrap: 'Bootstrap = amostragem aleatória com reposição de tamanho N.'
    },
    {
      itemNumber: 61,
      statement: 'A entropia de uma árvore de decisão aborda o aspecto da quantidade de informações que está associada às respostas que podem ser obtidas às perguntas formuladas, representando o grau de incerteza associado aos dados.',
      officialAnswer: 'C',
      discipline: 'Machine Learning',
      subtopic: 'Árvores de Decisão e Teoria da Informação',
      block: 'Bloco I',
      explanation: 'Gabarito Oficial: CERTO (C). Na formulação de Shannon (algoritmos ID3/C4.5), a entropia H(S) = - sum p_i * log2(p_i) mede exatamente o grau de incerteza/impureza da distribuição de rótulos.',
      cesgranrioTrap: 'Entropia zero significa nó perfeitamente puro (todos os exemplos da mesma classe).'
    },
    {
      itemNumber: 62,
      statement: 'Um conjunto linearmente separável é composto por exemplos que podem ser separados por pelo menos um hiperplano. As SVMs lineares buscam o hiperplano ótimo segundo a teoria do aprendizado estatístico, definido como aquele em que a margem de separação entre as classes presentes nos dados é minimizada.',
      officialAnswer: 'E',
      discipline: 'Machine Learning',
      subtopic: 'Support Vector Machines (SVM)',
      block: 'Bloco I',
      explanation: 'Gabarito Oficial: ERRADO (E). O algoritmo SVM busca o hiperplano que MAXIMIZA a margem de separação geométrica (2 / ||w||), garantindo maior capacidade de generalização e menor risco estrutural.',
      cesgranrioTrap: 'Pegadinha clássica: SVM maximiza a margem geométrica, e não minimiza.'
    },
    {
      itemNumber: 63,
      statement: 'O ensemble denominado bagging tem como foco principal a redução do viés e não da variância, treinando-se os modelos em sequência, tal que os erros dos primeiros modelos treinados são utilizados para o ajuste nos pesos matemáticos dos próximos modelos.',
      officialAnswer: 'E',
      discipline: 'Machine Learning',
      subtopic: 'Ensembles: Bagging vs Boosting',
      block: 'Bloco I',
      explanation: 'Gabarito Oficial: ERRADO (E). Treinar em sequência ajustando pesos com base nos erros é a definição de BOOSTING. O BAGGING (Bootstrap Aggregating) treina modelos em PARALELO e tem como foco primordial a REDUÇÃO DA VARIÂNCIA.',
      cesgranrioTrap: 'A banca trocou o conceito de Bagging pelo de Boosting.'
    },
    {
      itemNumber: 64,
      statement: 'No código "from sklearn import tree; X = [[0, 0], [1, 1]]; Y = [0, 1]; clf = tree.DecisionTreeClassifier(); clf = clf.fit(X, Y)", DecisionTreeClassifier é um classificador que recebe como entrada dois arrays: um array X, de valores inteiros, contendo os rótulos de classe para as amostras de treinamento; e um array Y, esparso ou denso, contendo as amostras de treinamento.',
      officialAnswer: 'E',
      discipline: 'Python & Scikit-Learn',
      subtopic: 'Convenção da API Scikit-Learn (fit X, y)',
      block: 'Bloco I',
      explanation: 'Gabarito Oficial: ERRADO (E). A banca inverteu: X representa a matriz 2D de atributos/features (amostras de treinamento) e Y representa o vetor com os rótulos/classes alvo (labels).',
      cesgranrioTrap: 'X = features/amostras, Y = rótulos de classe.'
    },
    {
      itemNumber: 66,
      statement: 'A otimização bayesiana se utiliza do conceito de probabilidade para encontrar o valor de entrada de uma função que possa retornar o menor valor de saída possível. Nesse método, o número de iterações de pesquisa pode ser reduzido a partir da escolha dos valores de entrada, levando em consideração os resultados anteriores, o que caracteriza um processo iterativo.',
      officialAnswer: 'C',
      discipline: 'Modelagem & MLOps',
      subtopic: 'Otimização Bayesiana de Hiperparâmetros',
      block: 'Bloco I',
      explanation: 'Gabarito Oficial: CERTO (C). A otimização bayesiana modela a função objetivo desconhecida através de um modelo probabilístico substituto (surrogate model, como Gaussian Processes) e usa uma acquisition function para balancear exploração e aproveitamento.',
      cesgranrioTrap: 'Supera o Grid Search e Random Search por aprender com iterações passadas.'
    },
    {
      itemNumber: 67,
      statement: 'Se a matriz de variância-covariância referente a três variáveis for Sigma = [[4, -0.5, 0.2], [-0.5, 4, 0.5], [0.2, 0.5, 2]], e se o menor autovalor dessa matriz for igual a 1,84, então as duas primeiras componentes principais explicam 81,6% da variação total referente a essas variáveis.',
      officialAnswer: 'C',
      discipline: 'Matemática & PCA',
      subtopic: 'Autovalores e Proporção de Variância Explicada',
      block: 'Bloco I',
      explanation: 'Gabarito Oficial: CERTO (C). O traço da matriz de covariância é a soma dos elementos da diagonal principal: 4 + 4 + 2 = 10, que é igual à soma de todos os autovalores (lambda_1 + lambda_2 + lambda_3 = 10). Se o menor autovalor lambda_3 = 1,84, a soma dos dois primeiros é 10 - 1,84 = 8,16. A porcentagem explicada é 8,16 / 10 = 81,6%.',
      cesgranrioTrap: 'Propriedade fundamental da álgebra linear: Tr(A) = soma dos autovalores.'
    },
    {
      itemNumber: 68,
      statement: 'Considere que, em uma análise de agrupamentos por meio de mistura de gaussianas, três distribuições normais com médias mu1, mu2 e mu3 se referem, respectivamente, aos clusters 1, 2 e 3. Nessa situação, pelo modelo de mistura de gaussianas, o cluster 1 é constituído pelas observações mais próximas da média mu1.',
      officialAnswer: 'E',
      discipline: 'Machine Learning',
      subtopic: 'Gaussian Mixture Models (GMM)',
      block: 'Bloco I',
      explanation: 'Gabarito Oficial: ERRADO (E). O GMM realiza soft clustering baseado em densidade de probabilidade multivariada ponderada (esperança a posteriori P(C_k|x)), levando em conta a matriz de covariância (formato e dispersão da gaussiana) e os pesos de mistura pi_k, e não meramente a distância euclidiana ao vetor de médias.',
      cesgranrioTrap: 'Classificação por distância pura à média é K-Means, não GMM.'
    },
    {
      itemNumber: 72,
      statement: 'As funções de ativação são elementos importantes nas redes neurais artificiais; essas funções introduzem componente não linear nas redes neurais, fazendo que elas possam aprender mais do que relações lineares entre as variáveis dependentes e independentes, tornando-as capazes de modelar também relações não lineares.',
      officialAnswer: 'C',
      discipline: 'Deep Learning',
      subtopic: 'Funções de Ativação Não-Lineares',
      block: 'Bloco I',
      explanation: 'Gabarito Oficial: CERTO (C). Sem ativações não lineares (ReLU, Sigmoid, Tanh, GELU), uma rede profunda de N camadas se reduz matematicamente ao produto de matrizes lineares W_n * ... * W_1 * x, que equivale a uma única regressão linear simples.',
      cesgranrioTrap: 'Teorema da Aproximação Universal exige funções de ativação não lineares.'
    },
    {
      itemNumber: 73,
      statement: 'O algoritmo de backpropagation consiste das fases de propagação e de retropropagação: na primeira, as entradas são passadas através da rede e as previsões de saída são obtidas; na segunda, se calcula o termo de correção dos pesos e, por conseguinte, a atualização dos pesos.',
      officialAnswer: 'C',
      discipline: 'Deep Learning',
      subtopic: 'Backpropagation (Passo Forward e Backward)',
      block: 'Bloco I',
      explanation: 'Gabarito Oficial: CERTO (C). No forward pass calcula-se a predição e o valor da função de perda (loss). No backward pass propaga-se o erro de trás para frente usando a regra da cadeia para encontrar dLoss/dWeight e atualizar os pesos.',
      cesgranrioTrap: 'O algoritmo backpropagation é a aplicação da regra da cadeia do cálculo diferencial.'
    },
    {
      itemNumber: 77,
      statement: 'Uma rede neural convolucional é composta por camadas convolucionais, unidades de processamento não linear e camadas de subamostragem (pooling); ela possui como característica a habilidade em explorar correlações temporais e espaciais nos dados.',
      officialAnswer: 'C',
      discipline: 'Deep Learning & Visão Computacional',
      subtopic: 'Arquitetura de CNNs e Camadas de Pooling',
      block: 'Bloco I',
      explanation: 'Gabarito Oficial: CERTO (C). As CNNs utilizam filtros espaciais (kernels) com compartilhamento de pesos e camadas de pooling para invariância espacial a translações e redução de dimensionalidade.',
      cesgranrioTrap: 'Convoluções 1D exploram correlações temporais e 2D/3D correlações espaciais.'
    },

    // --- CONHECIMENTOS ESPECÍFICOS: BLOCO II ---
    {
      itemNumber: 80,
      statement: 'Mask RCNN (region-based convolutional neural network) é um método para segmentação de objetos e instâncias que se baseia em detecção, enquanto o método SSAP (single-shot instance segmentation) se baseia em pixels.',
      officialAnswer: 'C',
      discipline: 'Visão Computacional',
      subtopic: 'Segmentação de Instâncias (Mask R-CNN vs SSAP)',
      block: 'Bloco II',
      explanation: 'Gabarito Oficial: CERTO (C). O Mask R-CNN estende o Faster R-CNN gerando caixas delimitadoras (bounding box detection) e uma máscara binária para cada ROI (top-down), enquanto SSAP agrupa afinidade entre pixels (bottom-up).',
      cesgranrioTrap: 'Top-down (baseado em detecção) versus bottom-up (baseado em pixels).'
    },
    {
      itemNumber: 81,
      statement: 'Stop-words constituem um conjunto de palavras que proporcionam pouca informação para o significado de uma frase.',
      officialAnswer: 'C',
      discipline: 'NLP (Processamento de Linguagem Natural)',
      subtopic: 'Pré-Processamento Textual e Stop-Words',
      block: 'Bloco II',
      explanation: 'Gabarito Oficial: CERTO (C). Stop-words são palavras gramaticais altamente frequentes (preposições, artigos, conjunções) que oferecem baixo poder discriminativo para classificação ou clustering de textos.',
      cesgranrioTrap: 'Remoção de stop-words reduz a dimensionalidade da matriz documento-termo.'
    },
    {
      itemNumber: 82,
      statement: 'O CBOW é um modelo de aprendizado de máquina desenhado para prever contexto com base em determinada palavra.',
      officialAnswer: 'E',
      discipline: 'NLP & Embeddings',
      subtopic: 'Word2Vec: CBOW vs Skip-Gram',
      block: 'Bloco II',
      explanation: 'Gabarito Oficial: ERRADO (E). O item inverteu: o CBOW (Continuous Bag of Words) prevê a palavra central com base no contexto circundante. O modelo que prevê o contexto com base na palavra central é o SKIP-GRAM.',
      cesgranrioTrap: 'Pegadinha certeira em quase todos os concursos de TI/Dados: CBOW prevê a palavra; Skip-Gram prevê o contexto.'
    },
    {
      itemNumber: 83,
      statement: 'Suponha que a palavra amor ocorra 1.000 vezes no último livro escrito por certo autor, que escreveu, no total, 10 livros. Nesse caso, se a palavra amor for encontrada em todos os livros desse autor, então o valor do TF-IDF (term frequency-inverse document frequency) referente à palavra amor no último livro escrito será igual a 1/1.000.',
      officialAnswer: 'E',
      discipline: 'NLP & Estatística Textual',
      subtopic: 'Cálculo de TF-IDF e Valor Nulo de IDF',
      block: 'Bloco II',
      explanation: 'Gabarito Oficial: ERRADO (E). A fórmula do IDF é log(Total de Documentos / Documentos que contêm o termo). Se a palavra aparece em todos os 10 livros, IDF = log(10 / 10) = log(1) = 0. Como TF-IDF = TF * IDF, o resultado é rigorosamente ZERO, e não 1/1.000.',
      cesgranrioTrap: 'Sempre que um termo está presente em 100% dos documentos do corpus, seu IDF é zero e o TF-IDF zera.'
    },
    {
      itemNumber: 86,
      statement: 'No que se refere à distribuição da quantidade de carga do tipo B perdida em 2021, observa-se que o valor da perda mínima foi superior a Q1 - 1,5*D_q, no qual Q1 representa o primeiro quartil e D_q denota o intervalo interquartil da distribuição em tela.',
      officialAnswer: 'C',
      discipline: 'Estatística Descritiva',
      subtopic: 'Boxplot, Limite Inferior e Detecção de Outliers',
      block: 'Bloco II',
      explanation: 'Gabarito Oficial: CERTO (C). No diagrama de caixa (boxplot), o bigode inferior se estende até o menor dado que não seja outlier, isto é, maior ou igual a Q1 - 1,5*IQR. Não havendo pontos abaixo do bigode inferior, a perda mínima é superior ao limite teórico.',
      cesgranrioTrap: 'Limite inferior do boxplot = Q1 - 1,5 * IQR; observações abaixo são outliers.'
    },
    {
      itemNumber: 89,
      statement: 'Suponha que os valores das quantidades de carga perdida sejam submetidos a uma normalização numérica com base no critério do Z-score da forma Z = (X - mu) / sigma. Como resultado dessa normalização, a média da soma Z_A + Z_B + Z_C será igual à média da soma Z_A + Z_B + Z_C.',
      officialAnswer: 'C',
      discipline: 'Estatística & Preparação de Dados',
      subtopic: 'Propriedades da Padronização Z-Score',
      block: 'Bloco II',
      explanation: 'Gabarito Oficial: CERTO (C). Uma propriedade matemática universal do Z-score é que a média de qualquer variável padronizada E[Z] é estritamente igual a 0. A média da soma é a soma das médias: E[Z_A + Z_B + Z_C] = 0 + 0 + 0 = 0.',
      cesgranrioTrap: 'Propriedade elementar: Variável padronizada por Z-score tem média zero e variância 1.'
    },
    {
      itemNumber: 90,
      statement: 'O método de imputação K-NN leva em consideração os padrões de similaridade presentes no conjunto de dados para predizer os valores faltantes. No entanto, a escolha da função de distância para a aplicação desse método, como, por exemplo, HEOM (heterogeneous euclidean-overlap metric) ou HVDM (heterogeneous value difference metric), pode influenciar significativamente nos resultados da imputação.',
      officialAnswer: 'C',
      discipline: 'Preparação de Dados',
      subtopic: 'Imputação KNN em Bases Heterogêneas',
      block: 'Bloco II',
      explanation: 'Gabarito Oficial: CERTO (C). Bases reais possuem variáveis numéricas e categóricas simultaneamente. Métricas clássicas (como Euclidiana padrão) falham com categorias nominais, exigindo HEOM ou HVDM para manter coerência nos vizinhos mais próximos.',
      cesgranrioTrap: 'A métrica de distância determina quais vizinhos são selecionados, alterando os valores imputados.'
    },
    {
      itemNumber: 91,
      statement: 'Um dos passos para tratar com dados faltantes é avaliar o tipo de dado perdido; assim, por exemplo, o método MICE (multivariate imputation by chained equations) não seria aplicável para dados perdidos do tipo MAR (missing at random).',
      officialAnswer: 'E',
      discipline: 'Preparação de Dados',
      subtopic: 'Tipos de Missing Data e Algoritmo MICE',
      block: 'Bloco II',
      explanation: 'Gabarito Oficial: ERRADO (E). O método MICE é concebido e amplamente indicado exatamente sob a premissa de que os dados faltantes são do tipo MAR (Missing at Random), onde a ausência depende das variáveis observadas.',
      cesgranrioTrap: 'MICE é a principal referência da literatura para dados MAR.'
    },
    {
      itemNumber: 98,
      statement: 'Em sistemas NoSQL baseados em armazenamento de chave-valor, a chave é multidimensional e composta pela combinação do nome de tabela com a chave linha-coluna e com o rótulo de data e hora.',
      officialAnswer: 'E',
      discipline: 'Bancos de Dados & Big Data',
      subtopic: 'NoSQL: Chave-Valor vs Wide-Column (Bigtable)',
      block: 'Bloco II',
      explanation: 'Gabarito Oficial: ERRADO (E). A descrição corresponde aos bancos NoSQL orientados a colunas esparsas multidimensionais (como Google Bigtable e Apache HBase), e não a bancos Chave-Valor puros (como Redis ou DynamoDB), cuja chave é uma string/identificador simples.',
      cesgranrioTrap: 'Chave-valor simples (Key-Value) indexa um blob por uma chave unidimensional.'
    },
    {
      itemNumber: 99,
      statement: 'O Hadoop Distributed File System (HDFS) é construído usando a linguagem Java, o que permite que sua arquitetura mestre/escravo seja implementada em uma ampla variedade de máquinas.',
      officialAnswer: 'C',
      discipline: 'Big Data & Arquitetura',
      subtopic: 'Apache Hadoop e HDFS',
      block: 'Bloco II',
      explanation: 'Gabarito Oficial: CERTO (C). O framework Apache Hadoop e seu sistema de arquivos distribuídos (HDFS) são desenvolvidos em Java (executados em qualquer JVM) sob a clássica arquitetura Master/Slave (NameNode e DataNodes).',
      cesgranrioTrap: 'Portabilidade multiplataforma da JVM é pilar fundacional do Hadoop.'
    },

    // --- CONHECIMENTOS ESPECÍFICOS: BLOCO III ---
    {
      itemNumber: 100,
      statement: 'O volume instantâneo de petróleo produzido por um poço é dado por f(t) = alpha * (300 - 12*t^2 + t^3), com 0 <= t <= 24 e 0 < alpha < 1. O volume instantâneo que o poço produz está aumentando no instante t = 10 horas.',
      officialAnswer: 'C',
      discipline: 'Matemática e Cálculo',
      subtopic: 'Derivadas e Taxa Instantânea de Variação',
      block: 'Bloco III',
      explanation: 'Gabarito Oficial: CERTO (C). A taxa instantânea de variação é a derivada f\'(t) = alpha * (-24*t + 3*t^2). Substituindo t = 10: f\'(10) = alpha * (-24*10 + 3*100) = alpha * (-240 + 300) = +60*alpha. Como alpha > 0, f\'(10) > 0, logo a produção está aumentando.',
      cesgranrioTrap: 'Se a primeira derivada é positiva f\'(t) > 0, a função é estritamente crescente no ponto.'
    },
    {
      itemNumber: 102,
      statement: 'O volume instantâneo mínimo ocorre após t = 6 horas.',
      officialAnswer: 'C',
      discipline: 'Matemática e Cálculo',
      subtopic: 'Otimização, Pontos Críticos e Mínimos',
      block: 'Bloco III',
      explanation: 'Gabarito Oficial: CERTO (C). Igualando a derivada a zero: f\'(t) = alpha * (3*t^2 - 24*t) = 0 => 3t(t - 8) = 0. Temos t = 0 e t = 8. A segunda derivada é f\'\'(t) = alpha * (6t - 24). Para t = 8, f\'\'(8) = alpha * (48 - 24) = +24*alpha > 0 (ponto de mínimo local). Como 8 > 6, o mínimo ocorre após t = 6h.',
      cesgranrioTrap: 'Calcular pontos críticos com f\'(t) = 0 e classificar com o teste da segunda derivada.'
    },
    {
      itemNumber: 103,
      statement: 'Se P(x, y) = (x^3) / (y^2) representa o consumo de gasolina em função do preço y e quantidade x de veículos, a taxa instantânea de variação do consumo quando y varia e x é mantido fixo é igual a (x^3) / (2*y).',
      officialAnswer: 'E',
      discipline: 'Matemática e Cálculo',
      subtopic: 'Derivada Parcial em Duas Variáveis',
      block: 'Bloco III',
      explanation: 'Gabarito Oficial: ERRADO (E). Derivando parcialmente P(x, y) em relação a y mantendo x constante: ∂P/∂y = x^3 * d/dy(y^-2) = x^3 * (-2 * y^-3) = -2*(x^3) / (y^3). O resultado no enunciado esqueceu o sinal negativo e o expoente cúbico no denominador.',
      cesgranrioTrap: 'Regra da potência com expoente negativo: d/dy(y^-2) = -2*y^-3.'
    },
    {
      itemNumber: 108,
      statement: 'Se A = np.array([[6],[2],[-1],[0],[-5],[6],[7],[9],[2]]), A1 = A[3:7, 0], e A2 = A1.reshape(2, 2), então np.linalg.det(A2) > 20.',
      officialAnswer: 'C',
      discipline: 'Python & NumPy',
      subtopic: 'Slicing, Reshape e Determinante Matricial',
      block: 'Bloco III',
      explanation: 'Gabarito Oficial: CERTO (C). O slice A[3:7, 0] seleciona os índices 3, 4, 5 e 6: vetor [0, -5, 6, 7]. O reshape(2, 2) gera a matriz [[0, -5], [6, 7]]. O determinante é (0 * 7) - (-5 * 6) = 0 - (-30) = +30. Como 30 > 20, o item está correto.',
      cesgranrioTrap: 'Em Python o fatiamento [3:7] vai até o índice 6 inclusive, excluindo o 7.'
    },
    {
      itemNumber: 112,
      statement: 'Com base no teorema do limite central, é correto concluir que a variável padronizada (S_n - E[S_n]) / sqrt(Var[S_n]) converge em distribuição para uma distribuição normal padrão quando n tende ao infinito.',
      officialAnswer: 'C',
      discipline: 'Estatística e Probabilidade',
      subtopic: 'Teorema Central do Limite (TCL)',
      block: 'Bloco III',
      explanation: 'Gabarito Oficial: CERTO (C). O Teorema Central do Limite (TCL) estabelece que a soma (ou média) padronizada de variáveis aleatórias independentes e identicamente distribuídas converge assintoticamente para a normal padrão N(0, 1) conforme n -> infinito.',
      cesgranrioTrap: 'TCL é a base matemática de toda a inferência estatística clássica.'
    },
    {
      itemNumber: 115,
      statement: 'A figura mostra um histograma com cauda alongada à direita e tamanho amostral 1.000, média 10 e desvio padrão 4,7. A diferença entre a média amostral e a mediana amostral é superior a 0.',
      officialAnswer: 'C',
      discipline: 'Estatística Descritiva',
      subtopic: 'Assimetria Positiva e Relação Média-Mediana',
      block: 'Bloco III',
      explanation: 'Gabarito Oficial: CERTO (C). Em distribuições unimodais com assimetria à direita (positive skewness), os valores extremos na cauda puxam a média para a direita, de modo que Moda < Mediana < Média. Portanto, Média - Mediana > 0.',
      cesgranrioTrap: 'Distribuição assimétrica à direita: Média > Mediana. Distribuição assimétrica à esquerda: Média < Mediana.'
    },
    {
      itemNumber: 117,
      statement: 'Um aplicativo para edição de textos foi disponibilizado para seus usuários sob a forma de computação em nuvem com colaboração mútua e histórico de versões. A situação descreve um modelo de nuvem denominado PaaS (platform as a service).',
      officialAnswer: 'E',
      discipline: 'Computação em Nuvem',
      subtopic: 'Classificação de Modelos de Nuvem (IaaS, PaaS, SaaS)',
      block: 'Bloco III',
      explanation: 'Gabarito Oficial: ERRADO (E). Um software pronto oferecido para o usuário final via navegador (como Google Docs ou Office 365) é um SaaS (Software as a Service). PaaS é um ambiente para desenvolvedores criarem e hospedarem softwares sem gerenciar SO.',
      cesgranrioTrap: 'SaaS = usuário final (software pronto). PaaS = desenvolvedor (ambiente/runtime). IaaS = infraestrutura bruta (VMs, redes).'
    },
    {
      itemNumber: 120,
      statement: 'A cultura DevOps permite simplificar a implantação e o gerenciamento eficiente de containers.',
      officialAnswer: 'C',
      discipline: 'DevOps & Engenharia de Dados',
      subtopic: 'DevOps, CI/CD e Orquestração de Containers',
      block: 'Bloco III',
      explanation: 'Gabarito Oficial: CERTO (C). DevOps integra equipes de desenvolvimento e operações com automação contínua (CI/CD), onde a conteinerização (Docker/Kubernetes) garante portabilidade e reprodutibilidade idêntica entre dev, teste e produção.',
      cesgranrioTrap: 'A sinergia entre containers e práticas DevOps acelera o ciclo de entrega de modelos e apps.'
    }
  ]
};

export const REAL_OFFICIAL_QUESTIONS_FOR_SIMULATOR: Question[] = OFFICIAL_PETROBRAS_2021_EXAM.items.map(item => ({
  id: `petrobras-2021-item-${item.itemNumber}`,
  topic: item.discipline,
  subtopic: item.subtopic,
  difficulty: item.officialAnswer === 'C' ? 'Médio' : 'Difícil',
  format: 'certo_errado',
  statement: `[PETROBRAS / CEBRASPE - Item ${item.itemNumber} - ${item.block}]\n\n${item.statement}`,
  options: [
    { letter: 'C', text: 'CERTO' },
    { letter: 'E', text: 'ERRADO' }
  ],
  correctAnswer: item.officialAnswer as 'C' | 'E',
  explanationCorrect: item.explanation,
  distractorAnalysis: [
    { 
      letter: item.officialAnswer === 'C' ? 'E' : 'C', 
      whyWrong: `O gabarito definitivo oficial da banca é ${item.officialAnswer === 'C' ? 'CERTO' : 'ERRADO'}. Justificativa: ${item.explanation}` 
    }
  ],
  cesgranrioTip: item.cesgranrioTrap,
  officialExam: {
    examName: 'Petrobras Nível Superior - Ciência de Dados',
    board: 'CEBRASPE',
    year: 2022,
    itemNumber: item.itemNumber,
    isAnnulled: false,
    block: item.block
  },
  audioScript: `Item oficial ${item.itemNumber} da Petrobras, bloco ${item.block}. Questão sobre ${item.subtopic}. O enunciado diz: ${item.statement}. O gabarito oficial definitivo é: ${item.officialAnswer === 'C' ? 'CERTO' : 'ERRADO'}. Explicação técnica: ${item.explanation}. Dica da banca: ${item.cesgranrioTrap}.`
}));
