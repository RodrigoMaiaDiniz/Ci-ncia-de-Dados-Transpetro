import { DigitalBook } from '../../types';

export const BLOCO_1_BOOKS: DigitalBook[] = [
  {
    id: 'livro-b1-supervisionado',
    itemCode: 'B1-01',
    block: 'Bloco I',
    title: 'Tratado de Aprendizado de Máquina Supervisionado & Seleção de Modelos',
    subtitle: 'Da Teoria Estatística aos Algoritmos de Gradient Boosting e SVM para Concursos de Alto Nível',
    edition: 'Edição Especial Transpetro / Petrobras 2026',
    author: 'Dr. Lucas Silveira & Equipe Especialista em Data Science Petrobras',
    pagesEquivalent: 240,
    readTimeEstimate: '3h 50min',
    badge: 'Peso Máximo no Edital',
    themeGradient: 'from-emerald-600 via-teal-600 to-cyan-700',
    borderAccent: 'border-emerald-500/40',
    iconName: 'Cpu',
    overview: 'Livro digital completo abordando a espinha dorsal de Machine Learning para a Transpetro. Cobre desde o trade-off viés-variância, regularizações L1 (Lasso) e L2 (Ridge), métricas em dados desbalanceados (PR-AUC, F-Beta), SVM com Kernel Trick, até a arquitetura matemática de árvores e algoritmos de ensemble (Random Forests, XGBoost, LightGBM, CatBoost) e pipelines com Scikit-Learn.',
    officialEditalTopics: [
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
    ],
    targetAudience: 'Candidatos que desejam gabaritar o Bloco I com rigor matemático e visão prática de engenharia.',
    chapters: [
      {
        id: 'cap-b1-01',
        chapterNumber: 1,
        title: 'Fundamentos: Bias-Variance Trade-off, Validação Cruzada & Prevenção de Data Leakage',
        subtitle: 'A base teórica de generalização e diagnóstico de curvas de aprendizado',
        readTimeEstimate: '45 min',
        summary: 'Decomposição formal do erro quadrático esperado em viés², variância e ruído irredutível. Validação cruzada estratificada para problemas desbalanceados e identificação de vazamento de dados em etapas de pré-processamento.',
        contentMarkdown: `## 1. Decomposição do Erro: Viés, Variância e Ruído Irredutível

No aprendizado supervisionado, dado um modelo preditivo f_hat(x) treinado para estimar y = f(x) + epsilon, com E[epsilon] = 0 e Var(epsilon) = sigma², o Erro Quadrático Médio Esperado em um ponto não visto x_0 decompõe-se matematicamente em:

\`\`\`python
# Decomposição do Erro Quadrático Esperado (Padrão Petrobras / Cesgranrio):
# E[(y_0 - f_hat(x_0))²] = Bias(f_hat(x_0))² + Var(f_hat(x_0)) + sigma²
erro_esperado = (bias ** 2) + variancia + ruido_irredutivel
\`\`\`

Onde:
- **Viés (Bias):** bias = E[f_hat(x_0)] - f(x_0). Representa o erro de aproximação por hipóteses simplificadoras errôneas. Modelos com alto viés sofrem de **Underfitting** (subajuste), apresentando alto erro tanto no treino quanto no teste.
- **Variância:** variancia = E[(f_hat(x_0) - E[f_hat(x_0)])²]. Mede a sensibilidade do modelo às flutuações amostrais do conjunto de treino. Alto erro de variância caracteriza **Overfitting** (sobreajuste): erro quase nulo no treino, mas alto erro no teste.
- **Ruído Irredutível (sigma²):** Variação inerente aos dados e variáveis latentes não observadas; nenhum algoritmo pode superá-lo.

### Diagnóstico por Curvas de Aprendizado (Learning Curves)
- **High Bias (Subajuste):** As curvas de treino e validação convergem rapidamente para um platô com erro elevado. Aumentar o tamanho do dataset (N) não ajuda. *Soluções:* adicionar mais features, usar modelos mais complexos (aumentar polinômios, árvores mais profundas), reduzir regularização.
- **High Variance (Sobreajuste):** Grande lacuna (gap) persistente entre a curva de erro de treino (muito baixo) e a curva de teste (significativamente mais alto). *Soluções:* coletar mais dados de treino, aplicar regularização (L1/L2, dropout), reduzir número de atributos (seleção/PCA), usar ensembles com Bagging.

---

## 2. Validação Cruzada sem Data Leakage (Vazamento de Dados)

O Vazamento de Dados ocorre quando informações do conjunto de teste ou do futuro contaminam o treinamento do modelo:
- **Erro Fatal em Concursos:** Executar padronização (ex: \`StandardScaler().fit_transform(X)\`) sobre todo o dataset ANTES de fazer a divisão de treino e teste!
  - *Correção Obrigatória:* O \`fit\` deve ser executado **exclusivamente nos dados de treino**, aplicando apenas o \`transform\` nos dados de teste. No Scikit-Learn, isso é automatizado utilizando \`Pipeline\`.
- **Estratificação (Stratified K-Fold):** Em problemas com classes desbalanceadas (ex: 98% de operação normal e 2% de falha em dutos), o K-Fold comum pode gerar folds de validação sem nenhum exemplo positivo. O \`StratifiedKFold\` preserva rigorosamente a proporção percentual de cada classe em todos os folds.`,
        keyTakeaways: [
          'Erro esperado = Viés² + Variância + Ruído Irredutível.',
          'Modelos complexos reduzem viés, mas aumentam a variância.',
          'O pré-processamento deve ser ajustado exclusivamente no conjunto de treino para evitar Data Leakage.',
          'Stratified K-Fold é obrigatório quando as classes são desbalanceadas.'
        ],
        cesgranrioTraps: [
          'Afirmar que coletar mais dados resolve problemas de alto viés (Underfitting). Mais dados só resolvem alta variância (Overfitting).',
          'Aplicar imputação de dados ausentes ou StandardScaler antes da divisão de treino e teste: é a definição clássica de Data Leakage.'
        ],
        practiceQuestions: [
          {
            questionNumber: 1,
            statement: 'Um modelo preditivo de manutenção de dutos da Transpetro apresenta acurácia de 99,5% no conjunto de treino, mas sua acurácia cai para 68,0% no conjunto de validação. Esse comportamento indica:',
            options: [
              'A) Alto viés e underfitting.',
              'B) Alta variância e overfitting.',
              'C) Ruído irredutível dominante.',
              'D) Falha de convergência do gradiente.',
              'E) Amostragem perfeitamente equilibrada.'
            ],
            correctLetter: 'B',
            explanation: 'O contraste marcante entre o desempenho quase perfeito no treino e o desempenho fraco no conjunto de validação caracteriza a incapacidade de generalização, típica de alta variância (overfitting).',
            cesgranrioTip: 'Treino excelente + Teste ruim = Overfitting (Alta Variância).'
          },
          {
            questionNumber: 2,
            statement: 'Qual das seguintes medidas é mais eficaz para combater um modelo diagnosticado com Alto Viés (Underfitting)?',
            options: [
              'A) Adicionar mais dados de treino mantendo o mesmo modelo e variáveis.',
              'B) Aumentar a complexidade do modelo (ex: adicionar atributos polinomiais ou diminuir a regularização).',
              'C) Aumentar a penalização de regularização L2.',
              'D) Reduzir o número de variáveis preditoras via seleção para apenas uma coluna.',
              'E) Aplicar subamostragem aleatória severa no conjunto de treino.'
            ],
            correctLetter: 'B',
            explanation: 'Um modelo com alto viés é excessivamente simplista para capturar a estrutura dos dados. Aumentar a capacidade e complexidade do modelo (adicionando features, termos polinomiais ou reduzindo regularização) permite reduzir o viés.',
            cesgranrioTip: 'Alto viés = Modelo fraco/simples. Solução: Mais features ou modelo mais complexo.'
          },
          {
            questionNumber: 3,
            statement: 'Um cientista de dados realizou o preenchimento de valores ausentes (imputação pela média) utilizando todo o conjunto de dados (treino e teste combinados) antes de particionar a base com train_test_split. Esse procedimento constitui:',
            options: [
              'A) Uma boa prática obrigatória de engenharia de dados.',
              'B) Vazamento de dados (Data Leakage), pois informações do conjunto de teste influenciaram as médias calculadas no treino.',
              'C) Uma técnica válida de regularização L1.',
              'D) Um método para reduzir a variância do estimador sem viés.',
              'E) Otimização bayesiana de hiperparâmetros.'
            ],
            correctLetter: 'B',
            explanation: 'Calcular médias, escalas ou qualquer estatística sobre o conjunto completo contamina os dados de treino com informações estatísticas do teste, constituindo Data Leakage e produzindo métricas de validação artificialmente otimistas.',
            cesgranrioTip: 'Fit de transformadores no dataset inteiro antes do split = Data Leakage.'
          },
          {
            questionNumber: 4,
            statement: 'Em um dataset de detecção de fraudes na contratação de fretes com 99,8% de casos legítimos e apenas 0,2% de fraudes, qual estratégia de validação cruzada deve ser adotada para garantir representatividade idêntica das classes em todas as partições?',
            options: [
              'A) K-Fold padrão simples.',
              'B) Stratified K-Fold (Validação Cruzada Estratificada).',
              'C) Leave-One-Out Cross-Validation.',
              'D) Time Series Split sem embaralhamento.',
              'E) Amostragem sem reposição com 1 único fold.'
            ],
            correctLetter: 'B',
            explanation: 'O Stratified K-Fold divide os dados preservando a proporção exata de cada classe (neste caso, 0,2% de positivos) em cada um dos K blocos, evitando folds desprovidos de instâncias da classe minoritária.',
            cesgranrioTip: 'Classes desbalanceadas = Stratified K-Fold.'
          },
          {
            questionNumber: 5,
            statement: 'Ao analisar as Curvas de Aprendizado (Learning Curves) de um modelo preditivo, um cientista observa que tanto o erro de treino quanto o erro de validação convergem rapidamente para um patamar comum com valor de erro inaceitavelmente alto para os padrões de segurança operacional. Nesse cenário, coletar 50.000 amostras adicionais de treino surtirá qual efeito?',
            options: [
              'A) Reduzirá o erro para zero solucionando completamente o problema.',
              'B) Terá efeito prático quase nulo, pois o modelo sofre de Alto Viés (Underfitting), cuja resolução exige aumentar a complexidade do modelo ou adicionar novos atributos mais informativos.',
              'C) Eliminará o ruído irredutível do processo físico de medição.',
              'D) Transformará a distribuição dos resíduos em uma Gaussiana perfeita sem alterar os parâmetros.',
              'E) Inverterá a matriz de covariância automaticamente.'
            ],
            correctLetter: 'B',
            explanation: 'Quando as curvas de treino e validação convergem para um platô de alto erro (High Bias / Underfitting), o modelo é simplista demais para capturar a complexidade da função geradora. Aumentar o volume de dados só ajuda quando há sobreajuste (High Variance); para combater alto viés, deve-se aumentar a complexidade do algoritmo ou adicionar novas variáveis explicativas.',
            cesgranrioTip: 'Curvas de aprendizado convergindo com erro alto = Alto Viés (Underfitting). Mais dados NÃO resolvem o problema!'
          }
        ]
      },
      {
        id: 'cap-b1-02',
        chapterNumber: 2,
        title: 'Métricas de Avaliação: Da Acurácia Ilusória às Curvas ROC e PR-AUC',
        subtitle: 'Sensibilidade, Especificidade, Precisão, F-Beta, LogLoss e Matriz de Confusão',
        readTimeEstimate: '50 min',
        summary: 'Matriz de confusão em profundidade. Por que a acurácia é uma armadilha em classes desbalanceadas. Comparativo técnico definitivo entre ROC-AUC e PR-AUC (Precision-Recall AUC). Formulação do F-Beta para ponderação de Recall.',
        contentMarkdown: `## 1. A Matriz de Confusão e a Armadilha da Acurácia

Considere um problema de detecção de anomalias em oleodutos com 10.000 amostras, onde apenas 100 são anomalias reais (1% dos dados):
- Um classificador simplório que prevê SEMPRE "Operação Normal" alcançará **99% de acurácia**!
- Apesar da acurácia de 99%, o modelo tem utilidade nula, pois falhou em detectar 100% dos acidentes.

### As Quatro Métricas Cardeais:
1. **Sensibilidade / Revocação (Recall / True Positive Rate - TPR):**
   \`TPR = TP / (TP + FN)\`. Responde: *De todas as falhas reais existentes, quantas o modelo conseguiu capturar?*
2. **Especificidade (True Negative Rate - TNR):**
   \`TNR = TN / (TN + FP)\`. Responde: *De todas as operações normais, quantas foram corretamente identificadas?*
   - Note que a Taxa de Falsos Positivos é: \`FPR = 1 - Especificidade = FP / (TN + FP)\`.
3. **Precisão (Precision / Valor Preditivo Positivo):**
   \`Precision = TP / (TP + FP)\`. Responde: *Quando o modelo disparou um alarme de falha, qual a chance de ser realmente uma falha?*
4. **F1-Score e F-Beta:**
   Média harmônica entre Precisão e Recall:
   \`F1 = 2 * (Precision * Recall) / (Precision + Recall)\`.
   - **F-Beta:** Permite ponderar a importância: com beta = 2 (F2-Score), o Recall tem o dobro do peso da Precisão, ideal para segurança industrial onde perder uma falha é catastrófico!

---

## 2. ROC-AUC vs. PR-AUC: A Questão Favorita da Banca

- **Curva ROC (Receiver Operating Characteristic):**
  Gráfico de **TPR (Sensibilidade)** no eixo Y versus **FPR (1 - Especificidade)** no eixo X para todos os limiares de decisão possíveis.
  - O valor de **AUC-ROC** varia de 0.5 (modelo aleatório / linha diagonal) a 1.0 (classificador perfeito).
  - *Ponto Fraco:* O FPR possui no denominador os Verdadeiros Negativos (\`TN\`). Em datasets desbalanceados com milhões de casos negativos normais, o número de \`FP\` fica diluído por um \`TN\` colossal, fazendo com que a curva ROC pareça espetacular mesmo quando o modelo dispara milhares de alarmes falsos!
- **Curva PR (Precision-Recall):**
  Gráfico de **Precisão** no eixo Y versus **Recall** no eixo X.
  - A métrica **PR-AUC (ou Average Precision)** NÃO é influenciada pelo número de Verdadeiros Negativos (\`TN\`).
  - **REGRA DE OURO DA CESGRANRIO:** Em conjuntos de dados fortemente desbalanceados com foco na classe minoritária rara, a curva **PR-AUC é estritamente superior e mais informativa que a curva ROC-AUC**!`,
        keyTakeaways: [
          'Acurácia não deve ser utilizada em problemas com classes desbalanceadas.',
          'Recall = TP / (TP + FN); Precisão = TP / (TP + FP).',
          'ROC plota TPR vs FPR; PR plota Precisão vs Recall.',
          'PR-AUC é a métrica padrão para eventos raros porque não é inflacionada por TN gigantesco.'
        ],
        cesgranrioTraps: [
          'Afirmar que a ROC-AUC é imune a classes desbalanceadas. A ROC-AUC é fortemente distorcida pelo excesso de Verdadeiros Negativos.',
          'Confundir a taxa de falsos positivos (FPR) com precisão. FPR mede falsos alarmes em relação aos negativos totais.'
        ],
        practiceQuestions: [
          {
            questionNumber: 1,
            statement: 'Em um problema de monitoramento de integridade estrutural onde a perda de uma falha real pode provocar desastres ambientais, a equipe de engenharia decide que identificar o maior número de falhas possíveis é muito mais importante do que evitar alarmes falsos. A métrica que deve ser maximizada prioritariamente é o:',
            options: [
              'A) Recall (Sensibilidade).',
              'B) Especificidade.',
              'C) Precisão.',
              'D) Acurácia global.',
              'E) Tempo de inferência.'
            ],
            correctLetter: 'A',
            explanation: 'O Recall mede a fração de positivos reais que foram corretamente identificados (TP / (TP + FN)). Quando o custo de um falso negativo (perder uma falha real) é altíssimo, o Recall deve ser a métrica priorizada.',
            cesgranrioTip: 'Evitar perder positivos reais a qualquer custo = Maximizar Recall.'
          },
          {
            questionNumber: 2,
            statement: 'Por que a métrica PR-AUC (área sob a curva Precisão-Recall) é considerada tecnicamente superior à ROC-AUC para avaliar modelos preditivos em datasets altamente desbalanceados (ex: 0,1% de anomalias)?',
            options: [
              'A) Porque a ROC-AUC não aceita probabilidades contínuas entre 0 e 1.',
              'B) Porque o cálculo da curva ROC utiliza o FPR, cujo denominador contém os Verdadeiros Negativos (TN), gerando uma ilusão de excelência pela diluição de falsos alarmes em uma massa gigantesca de negativos.',
              'C) Porque a PR-AUC pode ser calculada sem matriz de confusão.',
              'D) Porque a curva PR sempre atinge o valor 1.0 independentemente do modelo.',
              'E) Porque a ROC-AUC só funciona para problemas com mais de 3 classes.'
            ],
            correctLetter: 'B',
            explanation: 'No cálculo do FPR = FP / (FP + TN), quando TN é imenso, mesmo centenas de alarmes falsos (FP) geram um FPR minúsculo, empurrando a curva ROC para o topo esquerdo e gerando um AUC-ROC ilusoriamente alto. A curva Precision-Recall foca exclusivamente na classe positiva (TP, FP, FN), revelando o real impacto dos falsos alarmes.',
            cesgranrioTip: 'Desbalanceamento severo de classes = PR-AUC supera ROC-AUC.'
          },
          {
            questionNumber: 3,
            statement: 'Um classificador binário testado em 100 amostras produziu a seguinte matriz de confusão: TP = 40, FP = 10, FN = 10, TN = 40. Os valores da Precisão e do Recall desse modelo são, respectivamente:',
            options: [
              'A) 80% e 80%',
              'B) 80% e 50%',
              'C) 50% e 80%',
              'D) 75% e 75%',
              'E) 90% e 80%'
            ],
            correctLetter: 'A',
            explanation: 'Precisão = TP / (TP + FP) = 40 / (40 + 10) = 40 / 50 = 0,80 (80%). Recall = TP / (TP + FN) = 40 / (40 + 10) = 40 / 50 = 0,80 (80%).',
            cesgranrioTip: 'Precisão = TP/(TP+FP); Recall = TP/(TP+FN).'
          },
          {
            questionNumber: 4,
            statement: 'A métrica F-Beta permite atribuir pesos diferenciados à Precisão e ao Recall. Ao adotar beta = 2 (F2-Score), o avaliador está estabelecendo que:',
            options: [
              'A) A Precisão tem o dobro do peso do Recall.',
              'B) O Recall tem o dobro da importância da Precisão.',
              'C) O modelo só pode classificar duas variáveis por vez.',
              'D) A acurácia foi multiplicada por 2.',
              'E) A taxa de erro foi reduzida pela metade.'
            ],
            correctLetter: 'B',
            explanation: 'Na fórmula do F-beta: F_beta = (1 + beta²) * (Precision * Recall) / (beta² * Precision + Recall). Quando beta > 1 (ex: beta=2), o Recall ganha peso proporcional ao quadrado de beta, tornando-se duas vezes mais influente que a Precisão.',
            cesgranrioTip: 'F2-Score: Recall tem o dobro do peso da Precisão. F0.5-Score: Precisão tem o dobro do peso do Recall.'
          },
          {
            questionNumber: 5,
            statement: 'A métrica de Perda Logística (LogLoss / Entropia Cruzada Binária) avalia a calibração de modelos probabilísticos penalizando com severidade logarítmica máxima qual tipo de comportamento do classificador?',
            options: [
              'A) Fazer predições incorretas com altíssimo grau de convicção e certeza probabilística (por exemplo, atribuir probabilidade 0,99 para a classe 1 quando o rótulo real é 0).',
              'B) Apresentar sensibilidade idêntica à especificidade.',
              'C) Utilizar um limiar de decisão fixado rigorosamente em 0,5.',
              'D) Classificar corretamente uma instância quando a probabilidade for 0,51.',
              'E) Operar com matriz de confusão com valores perfeitamente simétricos.'
            ],
            correctLetter: 'A',
            explanation: 'A função LogLoss calcula -log(p) para a classe verdadeira. Quando o modelo atribui uma probabilidade próxima de 1 (alta certeza) para um evento que não ocorre (ou próxima de 0 para um evento que ocorre), o logaritmo tende a menos infinito, gerando uma penalidade catastrófica. O LogLoss mede não apenas o acerto, mas a calibração e a modéstia probabilística do modelo.',
            cesgranrioTip: 'LogLoss penaliza severamente previsões erradas feitas com alta probabilidade de certeza.'
          }
        ]
      },
      {
        id: 'cap-b1-03',
        chapterNumber: 3,
        title: 'Técnicas de Regularização: L1 (Lasso), L2 (Ridge) e ElasticNet',
        subtitle: 'Esparsidade, controle de multicolinearidade e geometria das penalidades',
        readTimeEstimate: '45 min',
        summary: 'Formulação matemática das penalidades de regularização. Por que a norma L1 (Lasso) zera coeficientes promovendo seleção de atributos e por que a norma L2 (Ridge) encolhe coeficientes resolvendo multicolinearidade.',
        contentMarkdown: `## 1. O Problema do Sobreajuste em Modelos Lineares

Em problemas com muitos atributos correlacionados, os coeficientes de uma Regressão Linear por Mínimos Quadrados Ordinários (OLS) explodem em magnitude numérica, tornando o modelo hipersensível a ruídos. A regularização adiciona uma penalidade ao custo original:
\`Custo_Regularizado = Perda_Empírica(y, y_hat) + lambda * Penalidade(w)\`.

---

## 2. L1 - Lasso (Least Absolute Shrinkage and Selection Operator)
- **Função de Custo:** Adiciona a **Norma L1** (soma dos valores absolutos dos pesos):
  \`Custo_Lasso = MSE + lambda * sum(|w_i|)\`.
- **Propriedade Cardeal:** O Lasso **ZERA EXATAMENTE** coeficientes de variáveis irrelevantes ou redundantes!
- **Consequência:** Promove **Esparsidade** (Sparsity), funcionando nativamente como um mecanismo automático de **Seleção de Atributos (Feature Selection)**.
- **Geometria:** A região de restrição de L1 no espaço dos pesos é um poliedro com vértices afiados (losango no plano 2D). As curvas de nível do erro tocam os cantos afiados nos eixos coordenados, onde uma ou mais coordenadas w_i são exatamente zero!

---

## 3. L2 - Ridge (Regressão de Tikhonov)
- **Função de Custo:** Adiciona a **Norma L2 ao quadrado** (soma dos quadrados dos pesos):
  \`Custo_Ridge = MSE + lambda * sum(w_i²)\`.
- **Propriedade Cardeal:** O Ridge **encolhe os coeficientes em direção a zero, MAS NUNCA OS ZERA EXATAMENTE**!
- **Consequência:** Excelente para combater **Multicolinearidade** (quando variáveis são fortemente correlacionadas). O Ridge distribui o peso igualmente entre atributos correlacionados em vez de descartá-los.
- **Geometria:** A região de restrição de L2 é uma hiperesfera lisa (círculo no plano 2D), onde o ponto de tangência com as curvas de erro raramente coincide com os eixos coordenados.

---

## 4. ElasticNet: O Melhor dos Dois Mundos
Combina ambas as penalidades com um parâmetro de balanço l1_ratio (r):
\`Penalidade_ElasticNet = lambda * [ r * sum(|w_i|) + (1 - r)/2 * sum(w_i²) ]\`.
- Ideal quando há mais variáveis do que observações (p > n) e grupos de variáveis fortemente correlacionadas (onde o Lasso escolheria apenas uma arbitrariamente, o ElasticNet seleciona o grupo inteiro).`,
        keyTakeaways: [
          'L1 (Lasso) soma valores absolutos e zera coeficientes (esparsidade e seleção de variáveis).',
          'L2 (Ridge) soma quadrados e encolhe pesos sem zerá-los (combate multicolinearidade).',
          'ElasticNet combina L1 e L2 balanceadas pelo hiperparâmetro l1_ratio.',
          'Maior lambda significa maior regularização e menor variância (aumentando o viés).'
        ],
        cesgranrioTraps: [
          'Afirmar que a regressão Ridge pode ser utilizada para seleção de atributos. Ridge nunca zera coeficientes; quem zera é o Lasso (L1).',
          'Esquecer que a padronização das features (StandardScaler) é mandatória antes de aplicar regularização L1 ou L2.'
        ],
        practiceQuestions: [
          {
            questionNumber: 1,
            statement: 'Um cientista de dados precisa treinar um modelo de regressão linear em uma base com 500 atributos, mas sabe que a grande maioria deles é irrelevante e deseja que o algoritmo selecione automaticamente as variáveis mais importantes zerando os coeficientes das demais. A técnica de regularização indicada é:',
            options: [
              'A) Regressão Ridge (L2).',
              'B) Regressão Lasso (L1).',
              'C) Mínimos Quadrados Ordinários (OLS) sem regularização.',
              'D) Gradient Descent sem decaimento de peso.',
              'E) Regressão Polinomial de grau 5.'
            ],
            correctLetter: 'B',
            explanation: 'A regularização L1 (Lasso) possui a propriedade geométrica de contrair coeficientes não essenciais exatamente a zero, produzindo um modelo esparso e atuando como seleção automática de atributos.',
            cesgranrioTip: 'Zerar coeficientes / Seleção de variáveis = L1 Lasso.'
          },
          {
            questionNumber: 2,
            statement: 'Qual é o efeito do aumento do hiperparâmetro de regularização lambda na Regressão Ridge sobre o viés e a variância do modelo?',
            options: [
              'A) Aumenta a variância e diminui o viés.',
              'B) Diminui a variância e aumenta o viés.',
              'C) Zera tanto o viés quanto a variância.',
              'D) Não causa qualquer impacto nas métricas.',
              'E) Transforma o modelo em uma árvore de decisão.'
            ],
            correctLetter: 'B',
            explanation: 'Aumentar a força da penalidade de regularização (lambda) restringe a flexibilidade dos coeficientes do modelo, reduzindo sua variância (combate overfitting) ao custo de aumentar o viés (torna o modelo mais simples e rígido).',
            cesgranrioTip: 'Maior regularização = Menor variância e Maior viés.'
          },
          {
            questionNumber: 3,
            statement: 'Em um dataset de sensores industriais, as variáveis "pressao_sensor_1" e "pressao_sensor_2" possuem coeficiente de correlação de Pearson r = 0,99 (forte multicolinearidade). Se aplicarmos a Regressão Ridge (L2), como o algoritmo lidará com essas duas variáveis?',
            options: [
              'A) Eliminará aleatoriamente uma das duas variáveis, zerando seu coeficiente.',
              'B) Encolherá os coeficientes de ambas as variáveis, distribuindo o peso preditivo entre elas de maneira estável.',
              'C) Entrará em loop infinito por singularidade na inversão da matriz.',
              'D) Converterá as variáveis em texto categórico.',
              'E) Atribuirá peso infinito para a primeira e peso zero para a segunda.'
            ],
            correctLetter: 'B',
            explanation: 'A regressão Ridge é especialmente projetada para estabilizar problemas com multicolinearidade severa: ela adiciona uma constante à diagonal da matriz X^T X, permitindo que os coeficientes das variáveis correlacionadas sejam encolhidos conjuntamente sem descartar nenhuma.',
            cesgranrioTip: 'Multicolinearidade severa = Ridge (L2) distribui pesos; Lasso (L1) descarta uma arbitrariamente.'
          },
          {
            questionNumber: 4,
            statement: 'Por que é indispensável padronizar as variáveis numéricas (por exemplo, com média zero e variância unitária) antes de ajustar um modelo com regularização L1 ou L2?',
            options: [
              'A) Porque a regularização penaliza a magnitude dos coeficientes, e variáveis com escalas maiores teriam coeficientes artificialmente menores e seriam injustamente menos penalizadas.',
              'B) Porque o Scikit-Learn rejeita dados em escala real.',
              'C) Porque a norma L1 só pode ser computada em números negativos.',
              'D) Para transformar o modelo em um classificador não supervisionado.',
              'E) Porque a padronização elimina a necessidade de calcular a função de perda.'
            ],
            correctLetter: 'A',
            explanation: 'A penalidade de regularização soma os valores dos coeficientes (|w| ou w²). Uma variável medida em unidades minúsculas (ex: gramas em vez de toneladas) terá um coeficiente numérico enorme e sofrerá penalização desproporcional. Padronizar coloca todas as features no mesmo patamar de penalidade.',
            cesgranrioTip: 'Regularização exige SEMPRE padronização prévia das variáveis.'
          },
          {
            questionNumber: 5,
            statement: 'O modelo ElasticNet combina linearmente as penalidades L1 (Lasso) e L2 (Ridge) através do hiperparâmetro de proporção l1_ratio. Em cenários práticos de dados de telemetria com múltiplos atributos fortemente correlacionados entre si, a vantagem teórica do ElasticNet sobre o Lasso puro é:',
            options: [
              'A) Selecionar ou descartar conjuntamente o grupo de atributos correlacionados (efeito de agrupamento / grouping effect), superando a tendência do Lasso de escolher arbitrariamente apenas uma variável do grupo e zerar as demais.',
              'B) Tornar a função de perda estritamente linear e sem derivadas parciais.',
              'C) Eliminar a necessidade de dividir a base em treino e teste.',
              'D) Forçar todos os coeficientes a assumirem valores rigorosamente idênticos.',
              'E) Dispensar a padronização prévia das grandezas físicas dos dados.'
            ],
            correctLetter: 'A',
            explanation: 'Quando várias variáveis possuem alta correlação (como sensores duplicados na mesma linha), o Lasso tende a selecionar uma única variável aleatoriamente e descartar as outras. O componente L2 do ElasticNet introduz curvatura na função de perda, permitindo selecionar o grupo de variáveis correlacionadas em conjunto (efeito de agrupamento).',
            cesgranrioTip: 'ElasticNet combina L1 e L2 para superar a seleção arbitrária do Lasso em variáveis correlacionadas.'
          }
        ]
      },
      {
        id: 'cap-b1-04',
        chapterNumber: 4,
        title: 'Algoritmos Não-Lineares: Support Vector Machines (SVM) & Kernel Trick',
        subtitle: 'Margem máxima, vetores de suporte, formulação dual e funções de base radial (RBF)',
        readTimeEstimate: '50 min',
        summary: 'Geometria do SVM linear e margem suave com hiperparâmetro C. O Kernel Trick no espaço dual e funções de kernel (Linear, Polinomial, RBF/Gaussiano). Comportamento do hiperparâmetro gamma.',
        contentMarkdown: `## 1. O Princípio da Margem Máxima no SVM

O SVM (Support Vector Machine) busca encontrar o hiperplano de separação ótimo que **maximiza a margem geométrica** (a distância entre o hiperplano e as observações mais próximas de cada classe).
- **Vetores de Suporte (Support Vectors):** São os pontos de dados críticos que tocam a fronteira da margem. **Apenas esses pontos determinam a posição do hiperplano**; se todos os outros pontos forem movidos ou removidos, o modelo não se altera!

### O Hiperparâmetro C (Margem Suave / Soft Margin):
Em dados reais com sobreposição de classes, permite-se que alguns pontos violem a margem:
- **C Baixo:** Penalidade suave para violações. Gera **margem larga** e tolerante a erros (aumenta o viés, reduz a variância).
- **C Alto:** Penalidade severa para qualquer erro de classificação. Gera **margem estreita** e rígida (reduz o viés, mas corre alto risco de **Overfitting**).
- *Atenção:* O parâmetro C age de forma inversa ao lambda da regularização!

---

## 2. O Truque do Kernel (Kernel Trick)
Quando os dados não são linearmente separáveis no espaço original (como pontos dispostos em círculos concêntricos), o SVM mapeia os dados para um espaço de dimensão superior onde eles se tornam linearmente separáveis.
- **A Mágica Matemática:** Pelo Teorema de Mercer, o SVM formula o problema de otimização estritamente em função do **produto escalar entre pares de pontos**: \`x_i @ x_j\`.
- O **Kernel Trick** calcula o produto escalar no espaço de alta dimensão **diretamente a partir das coordenadas no espaço original**, sem jamais precisar calcular explicitamente a transformação espacial das dimensões superiores!

### Principais Funções de Kernel:
1. **Kernel Linear:** \`K(x, z) = x^T z\`. Rápido para problemas de alta dimensionalidade (como classificação de texto).
2. **Kernel Polinomial:** \`K(x, z) = (gamma * x^T z + c)^d\`.
3. **Kernel RBF (Radial Basis Function / Gaussiano):**
   \`K(x, z) = exp(-gamma * ||x - z||²)\`.
   - Mapeia os dados para um espaço de **dimensão infinita**!
   - **O Hiperparâmetro Gamma (\`gamma\`):** Define o raio de influência de cada vetor de suporte:
     - **Gamma Baixo:** Raio amplo de influência; fronteira de decisão suave e quase linear.
     - **Gamma Alto:** Raio curtíssimo de influência; fronteira de decisão extremamente recortada em torno de cada ponto de treino (**Overfitting severo**).`,
        keyTakeaways: [
          'SVM maximiza a margem geométrica entre as classes.',
          'Apenas os Vetores de Suporte definem o hiperplano de decisão.',
          'C alto gera margens estreitas e risco de overfitting; C baixo gera margens largas.',
          'Kernel Trick computa o produto escalar em alta dimensão sem custo de projeção explícita.',
          'No kernel RBF, gamma alto gera fronteiras complexas e risco de overfitting.'
        ],
        cesgranrioTraps: [
          'Confundir o efeito de C: no SVM, C alto significa MENOR regularização (mais overfitting).',
          'Achar que o Kernel Trick transforma explicitamente os pontos e aloca memória de alta dimensão. O kernel calcula apenas o produto escalar escalar.',
          'Dizer que todos os pontos de treino influenciam o hiperplano: apenas os Support Vectors influenciam.'
        ],
        practiceQuestions: [
          {
            questionNumber: 1,
            statement: 'No classificador Support Vector Machine (SVM) com margem suave, qual é o efeito prático de configurar o hiperparâmetro C com um valor extremamente elevado?',
            options: [
              'A) O modelo prioriza uma margem muito larga, tolerando grande número de classificações incorretas.',
              'B) O modelo impõe penalidade severa a erros de treino, gerando margens estreitas e aumentando o risco de overfitting.',
              'C) O algoritmo se transforma automaticamente em uma regressão logística.',
              'D) Os vetores de suporte são descartados do cálculo.',
              'E) A função de kernel é desabilitada.'
            ],
            correctLetter: 'B',
            explanation: 'O hiperparâmetro C controla o equilíbrio entre a maximização da margem e a minimização de erros de treino. C alto penaliza fortemente violações da margem, forçando uma margem estreita e ajuste estrito aos dados de treino, o que eleva a variância (overfitting).',
            cesgranrioTip: 'SVM: C alto = Menos tolerância a erros = Margem estreita = Risco de Overfitting.'
          },
          {
            questionNumber: 2,
            statement: 'O "Kernel Trick" em Support Vector Machines permite classificar dados não linearmente separáveis de maneira eficiente porque:',
            options: [
              'A) Converte classes categóricas em variáveis dummy antes da modelagem.',
              'B) Calcula o produto escalar no espaço transformado de maior dimensão diretamente a partir dos vetores no espaço original, sem necessidade de computar explicitamente a projeção em alta dimensão.',
              'C) Elimina a necessidade de encontrar os vetores de suporte.',
              'D) Substitui o gradiente descendente por uma busca em grade exaustiva.',
              'E) Transforma o problema não supervisionado em supervisionado.'
            ],
            correctLetter: 'B',
            explanation: 'O Kernel Trick utiliza funções que satisfazem o Teorema de Mercer para obter o resultado do produto escalar no espaço de características de alta dimensão usando apenas operações no espaço original, poupando custo computacional e memória.',
            cesgranrioTip: 'Kernel Trick = Produto escalar em espaço de alta dimensão sem computar a transformação explícita.'
          },
          {
            questionNumber: 3,
            statement: 'Ao utilizar um SVM com Kernel RBF (Gaussiano), um cientista observou que o modelo gerou ilhas de decisão minúsculas e altamente recortadas ao redor de cada ponto isolado da classe positiva no conjunto de treino. Esse comportamento indica que o hiperparâmetro gamma:',
            options: [
              'A) Foi configurado com um valor excessivamente alto.',
              'B) Foi configurado com um valor próximo de zero.',
              'C) Foi desativado pelo Scikit-Learn.',
              'D) Assumiu valor negativo.',
              'E) Não tem influência no Kernel RBF.'
            ],
            correctLetter: 'A',
            explanation: 'No kernel RBF exp(-gamma * ||x-z||²), um gamma alto faz com que a influência de cada ponto caia quase imediatamente com a distância, criando ilhas de decisão estreitas e personalizadas ao redor de cada vetor de suporte, o que gera overfitting severo.',
            cesgranrioTip: 'SVM RBF: Gamma alto = Raio de influência curto = Ilhas recortadas = Overfitting.'
          },
          {
            questionNumber: 4,
            statement: 'Em um modelo SVM treinado com sucesso, quais instâncias do conjunto de dados de treino efetivamente determinam a posição e a inclinação do hiperplano separador ótimo?',
            options: [
              'A) Todos os dados da base de treino com pesos ponderados uniformemente.',
              'B) Exclusivamente os dados localizados no centróide de cada classe.',
              'C) Apenas os Vetores de Suporte (Support Vectors) que tocam ou violam a margem.',
              'D) Apenas os pontos com valores nulos imputados.',
              'E) O primeiro e o último registro da tabela.'
            ],
            correctLetter: 'C',
            explanation: 'O hiperplano de separação ótimo do SVM é uma combinação linear exclusiva dos Vetores de Suporte. Todos os demais pontos de treino que estão confortavelmente distantes da margem têm multiplicador de Lagrange alpha_i = 0 e não exercem qualquer efeito sobre o hiperplano.',
            cesgranrioTip: 'Apenas os Support Vectors definem o hiperplano no SVM.'
          },
          {
            questionNumber: 5,
            statement: 'Na dedução geométrica do Support Vector Machine (SVM) com margem máxima, a largura física da margem de separação entre os hiperplanos de suporte de cada classe é dada por:',
            options: [
              'A) 2 / ||w||, de modo que maximizar a largura da margem equivale analiticamente a minimizar a norma ||w||² sujeita às restrições de separação.',
              'B) ||w||², de modo que maximizar a margem exige maximizar o vetor de pesos.',
              'C) 1 / C², dependendo exclusivamente da penalidade de folga.',
              'D) Proporcional unicamente ao número total de linhas do dataset de treino.',
              'E) Ao determinante da matriz de covariância invertida.'
            ],
            correctLetter: 'A',
            explanation: 'A distância geométrica entre os dois hiperplanos de suporte w.T @ x + b = +1 e w.T @ x + b = -1 é calculada exatamente como 2 / ||w||. Maximizar a margem equivale a minimizar ||w|| / 2 ou, convenientemente para otimização quadrática convexa, minimizar (1/2) * ||w||².',
            cesgranrioTip: 'Largura da margem do SVM = 2 / ||w||. Maximizar a margem = Minimizar ||w||².'
          }
        ]
      },
      {
        id: 'cap-b1-05',
        chapterNumber: 5,
        title: 'Árvores e Métodos de Ensemble: Bagging, Random Forests e Gradient Boosting',
        subtitle: 'Critérios de divisão (Gini vs Entropia), XGBoost, LightGBM e CatBoost',
        readTimeEstimate: '50 min',
        summary: 'Construção de árvores de decisão e cálculo de impureza (Gini e Entropia). Filosofia de Bagging em paralelo com subamostragem de features (Random Forest) vs Boosting sequencial com aprendizado sobre resíduos (Gradient Boosting, XGBoost, LightGBM).',
        contentMarkdown: `## 1. Árvores de Decisão (CART) e Métricas de Impureza

As árvores de decisão particionam o espaço recursivamente através de divisões ortogonais aos eixos de atributos:
- **Entropia de Shannon:** Mede a desordem da informação: \`Entropia = -sum(p_i * log2(p_i))\`.
- **Índice Gini (Padrão Scikit-Learn / CART):** \`Gini = 1 - sum(p_i²)\`.
  - Mede a probabilidade de um elemento aleatório ser classificado incorretamente.
  - Vantagem: Computacionalmente muito mais rápido que a Entropia por não exigir cálculo de logaritmos.

---

## 2. Bagging & Random Forests (Foco em Redução de Variância)
- **Bootstrap Aggregating (Bagging):** Treina múltiplos modelos em paralelo com amostragens com reposição do dataset original. A previsão final é a média (regressão) ou votação majoritária (classificação).
- **Random Forest:** Adiciona um segundo nível de aleatoriedade: além de subamostrar linhas (bootstrap), subamostra **colunas** em cada nó (\`m = int(sqrt(p))\` para classificação).
  - Descorrelaciona as árvores individuais, reduzindo drasticamente a variância sem aumentar o viés.
  - Árvores em Random Forest podem ser treinadas de forma **completamente paralela**.

---

## 3. Boosting: A Construção Sequencial (Foco em Redução de Viés)
Diferente do Bagging, os modelos no Boosting são treinados **sequencialmente**:
- Cada novo regressor aprende a predizer os **resíduos (gradientes da função de perda)** cometidos pelo conjunto dos modelos anteriores:
  \`F_m = F_anterior + learning_rate * h_m(x)\`.
  Onde \`learning_rate\` é o encolhimento (Shrinkage) e \`h_m(x)\` é uma árvore fraca (*weak learner*).

### As Ferramentas de Ponta:
1. **XGBoost (Extreme Gradient Boosting):** Utiliza aproximação de Taylor de segunda ordem da função de perda (calcula gradiente e hessiana). Inclui regularização explícita L1 e L2 nos pesos das folhas da árvore.
2. **LightGBM:** Utiliza divisão baseada em histogramas e crescimento por folhas (**Leaf-wise** em vez de Depth-wise), sendo ordens de grandeza mais veloz em datasets de larga escala.
3. **CatBoost:** Otimizado nativamente para variáveis categóricas sem exigir One-Hot Encoding manual excessivo, combatendo o target leakage.`,
        keyTakeaways: [
          'Random Forest combina árvores profundas em paralelo para reduzir variância.',
          'Gradient Boosting combina árvores rasas sequencialmente para reduzir viés e resíduos.',
          'No XGBoost, os hiperparâmetros de regularização L1/L2 controlam a complexidade das folhas.',
          'Gini não usa logaritmo, sendo computacionalmente mais veloz que Entropia.'
        ],
        cesgranrioTraps: [
          'Confundir Bagging com Boosting: Bagging treina em paralelo com árvores independentes; Boosting é estritamente sequencial onde o modelo N corrige os erros do modelo N-1.',
          'Dizer que Random Forest sofre de alto viés. O ponto forte de Random Forest é justamente a redução de variância de árvores de decisão profundas.'
        ],
        practiceQuestions: [
          {
            questionNumber: 1,
            statement: 'A principal diferença metodológica entre o algoritmo Random Forest e o Gradient Boosting é:',
            options: [
              'A) O Random Forest treina árvores sequencialmente corrigindo resíduos, enquanto o Gradient Boosting treina árvores independentes em paralelo com bootstrap.',
              'B) O Random Forest é um método baseado em Bagging que reduz a variância através do treinamento paralelo de árvores descorrelacionadas, enquanto o Gradient Boosting é baseado em Boosting que treina modelos sequencialmente para reduzir o viés.',
              'C) O Random Forest utiliza apenas o critério de Entropia, enquanto o Gradient Boosting utiliza estritamente o critério Gini.',
              'D) O Random Forest não suporta problemas de classificação binária.',
              'E) O Gradient Boosting só pode ser utilizado com funções de perda lineares.'
            ],
            correctLetter: 'B',
            explanation: 'Random Forest baseia-se em Bagging (Bootstrap Aggregation + subamostragem aleatória de features) com árvores profundas e independentes treinadas em paralelo para mitigar a variância. Boosting constrói modelos sequenciais onde cada nova árvore foca em predizer os resíduos ou gradientes da anterior para reduzir viés.',
            cesgranrioTip: 'Bagging = Paralelo + Reduz Variância. Boosting = Sequencial + Reduz Viés.'
          },
          {
            questionNumber: 2,
            statement: 'No cálculo de partição em árvores de decisão do algoritmo CART (padrão Scikit-Learn), a impureza de Gini para um nó com 100 amostras, sendo 70 da classe Positiva e 30 da classe Negativa, é igual a:',
            options: [
              'A) 0,42',
              'B) 0,50',
              'C) 0,21',
              'D) 0,58',
              'E) 0,10'
            ],
            correctLetter: 'A',
            explanation: 'Gini = 1 - sum(p_i²). Com p_1 = 70/100 = 0,7 e p_2 = 30/100 = 0,3: Gini = 1 - (0,7² + 0,3²) = 1 - (0,49 + 0,09) = 1 - 0,58 = 0,42.',
            cesgranrioTip: 'Fórmula rápida do Gini para 2 classes: 2 * p * (1 - p) = 2 * 0,7 * 0,3 = 0,42.'
          },
          {
            questionNumber: 3,
            statement: 'No algoritmo XGBoost, qual é a vantagem teórica de utilizar uma expansão de Taylor de segunda ordem na função de perda em comparação com o Gradient Boosting clássico?',
            options: [
              'A) Permite usar tanto a primeira derivada (gradiente) quanto a segunda derivada (hessiana), acelerando a convergência e otimizando funções de perda arbitrárias com maior precisão.',
              'B) Transforma o modelo em um estimador não probabilístico.',
              'C) Elimina a necessidade de calcular divisões nas árvores.',
              'D) Impede a ocorrência de qualquer sobreajuste sem necessidade de hiperparâmetros.',
              'E) Torna desnecessário o uso de árvores de decisão.'
            ],
            correctLetter: 'A',
            explanation: 'O XGBoost aproxima a função de perda por uma série de Taylor até a segunda ordem, tirando proveito dos gradientes g_i e das hessianas h_i para encontrar o split ideal analiticamente, além de incluir penalidades L1 e L2 na complexidade das folhas.',
            cesgranrioTip: 'XGBoost = Taylor de 2ª ordem (Gradiente + Hessiana) + Regularização nas folhas.'
          },
          {
            questionNumber: 4,
            statement: 'Qual hiperparâmetro do Scikit-Learn pode ser aumentado em uma Random Forest para restringir a complexidade das árvores e combater o overfitting?',
            options: [
              'A) max_depth',
              'B) min_samples_split',
              'C) n_estimators',
              'D) max_features',
              'E) learning_rate'
            ],
            correctLetter: 'B',
            explanation: 'Aumentar min_samples_split (o número mínimo de amostras necessárias para dividir um nó interno) impede que a árvore crie ramificações para subgrupos minúsculos e ruídos, agindo diretamente como uma poda e reduzindo o overfitting.',
            cesgranrioTip: 'Para podar árvores e evitar overfitting: aumente min_samples_split ou min_samples_leaf; diminua max_depth.'
          },
          {
            questionNumber: 5,
            statement: 'O algoritmo LightGBM destaca-se pela alta velocidade de treinamento e menor consumo de memória em relação ao XGBoost tradicional principalmente pela utilização da estratégia de crescimento de árvores:',
            options: [
              'A) Depth-wise (nível por nível), que divide todos os nós da mesma profundidade simultaneamente.',
              'B) Leaf-wise (folha por folha), que escolhe a cada iteração a folha que proporciona a maior redução da função de perda, combinada com discretização por histogramas.',
              'C) Random split, que sorteia os limiares sem avaliar a função de ganho.',
              'D) Exhaustive continuous search, que avalia todas as permutações contínuas de pontos flutuantes.',
              'E) Pruning determinístico de podas sem critério de parada.'
            ],
            correctLetter: 'B',
            explanation: 'O LightGBM adota o crescimento Leaf-wise com limitação de profundidade máxima (max_depth): a cada etapa, ele divide apenas a folha que maximiza a redução da perda (loss reduction), convergindo para perdas menores com muito menos divisões que o XGBoost clássico (que operava tradicionalmente por Depth-wise / nível por nível).',
            cesgranrioTip: 'LightGBM = Crescimento Leaf-wise (folha por folha) com histogramas discretizados.'
          }
        ]
      }
    ],
    examChecklist: [
      'Lembrar que PR-AUC supera ROC-AUC em problemas com eventos raros (poucos positivos).',
      'L1 Lasso zera coeficientes (esparsidade); L2 Ridge encolhe sem zerar.',
      'C no SVM é inverso a lambda: maior C significa menor regularização.',
      'Gamma alto no SVM RBF reduz o raio de influência e causa overfitting.',
      'XGBoost calcula derivadas de 1ª e 2ª ordem (gradiente e hessiana).'
    ],
    practiceQuestions: [
      {
        questionNumber: 1,
        statement: 'Durante a modelagem de falhas em válvulas de bloqueio de gasodutos na Transpetro, um analista observou que o modelo treinado com Random Forest apresentou erro de treino de 0,5% e erro no conjunto de teste de 28,4%. Para mitigar o problema observado sem alterar o algoritmo base, o procedimento correto é:',
        options: [
          'A) Diminuir o parâmetro min_samples_split e aumentar indefinidamente max_depth das árvores.',
          'B) Restringir max_depth das árvores, aumentar min_samples_leaf e limitar max_features por split.',
          'C) Desativar o mecanismo de amostragem bootstrap para treinar todas as árvores com 100% dos dados.',
          'D) Aumentar learning_rate para 1.0 e reduzir o número de estimadores (n_estimators) para 2.',
          'E) Substituir a validação cruzada estratificada por uma divisão simples 99/1 sem particionamento.'
        ],
        correctLetter: 'B',
        explanation: 'A discrepância entre o erro de treino ínfimo (0,5%) e o erro de teste alto (28,4%) é o diagnóstico clássico de sobreajuste (overfitting / alta variância). Para regularizar uma Random Forest, deve-se podar a complexidade das árvores individuais: limitar a profundidade máxima (max_depth), exigir mais amostras mínimas para formar uma folha (min_samples_leaf) e reduzir o subconjunto aleatório de features avaliadas em cada divisão (max_features).',
        cesgranrioTip: 'A Cesgranrio explora constantemente o ajuste de hiperparâmetros de controle de complexidade de árvores (max_depth, min_samples_split, min_samples_leaf).'
      }
    ]
  },
  {
    id: 'livro-b1-nao-supervisionado',
    itemCode: 'B1-02',
    block: 'Bloco I',
    title: 'Manual de Aprendizado Não Supervisionado, Clustering & Redução de Dimensionalidade',
    subtitle: 'PCA, Autovalores, K-Means, DBSCAN, GMM, t-SNE e Métricas de Validação de Agrupamento',
    edition: 'Edição Especial Transpetro 2026',
    author: 'Equipe de Inteligência Artificial & Estatística Computacional',
    pagesEquivalent: 210,
    readTimeEstimate: '3h 30min',
    badge: 'Cobrança Garantida',
    themeGradient: 'from-cyan-600 via-teal-600 to-blue-700',
    borderAccent: 'border-cyan-500/40',
    iconName: 'Boxes',
    overview: 'Tratamento completo de algoritmos de aprendizado não supervisionado. Demonstração matemática de PCA por autovetores da matriz de covariância e SVD, convergência do K-Means e inicialização K-Means++, densidade com DBSCAN para detecção de anomalias com ruído, modelos probabilísticos com GMM e métricas de validação intrínseca (Silhouette Score, Davies-Bouldin).',
    officialEditalTopics: [
      'Redução de dimensionalidade: Análise de Componentes Principais (PCA)',
      'Propriedades dos autovalores e autovetores da matriz de covariância no PCA',
      'Critérios de variância explicada acumulada e Scree Plot',
      'Algoritmo K-Means: inicialização K-Means++, inércia e Método do Cotovelo',
      'Métricas de clustering: Coeficiente de Silhueta (Silhouette Score) e Davies-Bouldin',
      'Mistura de Gaussianas (GMM - Gaussian Mixture Models) e Algoritmo EM',
      'DBSCAN: clustering baseado em densidade (pontos core, border e ruído)',
      'Clustering Hierárquico e análise de dendrogramas',
      'Noções de projeção não-linear de baixa dimensão: t-SNE e UMAP'
    ],
    targetAudience: 'Cientistas de dados que precisam dominar agrupamento e compressão geométrica de atributos.',
    chapters: [
      {
        id: 'cap-b1-pca',
        chapterNumber: 1,
        title: 'Análise de Componentes Principais (PCA): Derivação Geométrica e Algébrica',
        subtitle: 'Maximização de variância, autovalores da matriz de covariância, SVD e Scree Plot',
        readTimeEstimate: '45 min',
        summary: 'Passo a passo matemático da projeção linear ortogonal que preserva a máxima variância dos dados. Por que a matriz precisa estar padronizada, cálculo da variância explicada por cada autovalor e conexão com SVD.',
        contentMarkdown: `## 1. O Objetivo do PCA
O PCA (Principal Component Analysis) é uma técnica linear de redução de dimensionalidade não supervisionada. O objetivo é projetar dados de d dimensões para k dimensões (k < d) em um novo sistema de eixos ortogonais ordenados pela variância dos dados.

### As Duas Propriedades Fundamentais:
1. O primeiro componente principal (PC1) aponta na direção de **máxima variância** dos dados.
2. Cada componente subsequente (PC2, PC3, ...) é estritamente **ortogonal** (não correlacionado) a todos os anteriores e maximiza a variância residual.

---

## 2. Passo a Passo Matemático em Python (NumPy):
1. **Centralização e Padronização:**
   Os atributos devem ter média zero. Além disso, se as escalas forem distintas (ex: pressão em Bar vs fluxo em m³/h), deve-se usar \`StandardScaler\` (Z-score). Sem padronização, a variável com maior magnitude numérica dominará o PC1 artificialmente!
2. **Cálculo da Matriz de Covariância em Python:**
\`\`\`python
# Matriz de covariância amostral com NumPy:
cov_matrix = (1 / (N - 1)) * (X.T @ X)  # Assumindo X com média zero
\`\`\`
3. **Decomposição Espectral (Autovalores e Autovetores):**
\`\`\`python
# Cálculo dos autovalores e autovetores:
autovalores, autovetores = np.linalg.eig(cov_matrix)
# Relação fundamental: cov_matrix @ v[:, i] == autovalores[i] * v[:, i]
\`\`\`
   - Os **autovetores** fornecem as direções dos eixos principais.
   - Os **autovalores (lambda >= 0)** fornecem a variância explicada ao longo de cada autovetor.
4. **Razão de Variância Explicada (Explained Variance Ratio):**
\`\`\`python
# Fração de variância explicada por cada componente:
evr = autovalores / np.sum(autovalores)
\`\`\`
5. **Critério de Seleção (Scree Plot e Kaiser):**
   - **Regra de Kaiser:** Reter componentes com autovalor lambda > 1 (quando aplicado sobre a matriz de correlação padronizada).
   - **Método do Cotovelo (Scree Plot):** Reter os componentes antes do ponto de inflexão na curva de autovalores.`,
        keyTakeaways: [
          'PCA requer centralização da média e padronização prévia das escalas.',
          'Os autovetores da matriz de covariância definem as direções; os autovalores medem a variância explicada.',
          'Os componentes principais são linearmente descorrelacionados entre si.'
        ],
        cesgranrioTraps: [
          'A banca costuma afirmar que o PCA é uma técnica supervisionada que utiliza os rótulos de classe para encontrar as direções. O PCA é puramente NÃO supervisionado.',
          'Dizer que o PCA elimina ruído sem perder informação (qualquer redução de dimensão com descarte de autovalores não-nulos acarreta perda de variância residual).'
        ],
        practiceQuestions: [
          {
            questionNumber: 1,
            statement: 'Em uma análise de Componentes Principais (PCA) aplicada a um conjunto de dados com 4 variáveis padronizadas (média zero e variância unitária), os autovalores obtidos da matriz de covariância foram: lambda_1 = 2,4; lambda_2 = 1,0; lambda_3 = 0,4; lambda_4 = 0,2. A porcentagem da variância total retida ao selecionar os dois primeiros componentes principais (PC1 e PC2) é igual a:',
            options: [
              'A) 60%',
              'B) 75%',
              'C) 85%',
              'D) 50%',
              'E) 90%'
            ],
            correctLetter: 'C',
            explanation: 'A variância total dos dados padronizados é a soma dos autovalores: 2,4 + 1,0 + 0,4 + 0,2 = 4,0. A variância explicada pelos dois primeiros componentes é 2,4 + 1,0 = 3,4. Portanto, a proporção retida é 3,4 / 4,0 = 0,85 = 85%.',
            cesgranrioTip: 'Variância retida = (Soma dos autovalores dos componentes escolhidos) / (Soma de todos os autovalores).'
          },
          {
            questionNumber: 2,
            statement: 'Por que é indispensável aplicar a padronização das escalas dos atributos (por exemplo, via StandardScaler) antes de executar o PCA em um dataset com variáveis medidas em grandezas físicas heterogêneas (ex: pressão em Pa e temperatura em °C)?',
            options: [
              'A) Porque a ausência de padronização impede a inversão numérica da matriz.',
              'B) Porque variáveis com magnitudes numéricas e variâncias elevadas dominariam artificialmente os primeiros componentes principais, independentemente da sua relevância estatística real.',
              'C) Porque o PCA só pode ser computado em matrizes com determinantes estritamente negativos.',
              'D) Para transformar variáveis contínuas em variáveis binárias discretas.',
              'E) Porque o algoritmo do PCA exige que todos os autovalores sejam obrigatoriamente iguais a zero.'
            ],
            correctLetter: 'B',
            explanation: 'O PCA busca maximizar a variância projetada. Se uma variável tiver variância numérica artificialmente gigantesca devido à unidade de medida (ex: nanômetros ou Pascals), o primeiro autovetor se alinhará quase exclusivamente com esse atributo, ignorando as demais relações multivariadas dos dados.',
            cesgranrioTip: 'PCA maximiza variância: padronize sempre (Z-score) para que todas as variáveis tenham peso inicial idêntico (variância 1).'
          },
          {
            questionNumber: 3,
            statement: 'Qual é a relação entre os componentes principais gerados pelo PCA?',
            options: [
              'A) Eles são fortemente correlacionados entre si.',
              'B) Eles são linearmente independentes e mutuamente ortogonais (correlação zero entre pares).',
              'C) Eles devem ter a mesma variância.',
              'D) Eles são ordenados do menor para o maior autovalor.',
              'E) Eles requerem que os dados sigam uma distribuição de Poisson.'
            ],
            correctLetter: 'B',
            explanation: 'Por construção algébrica, os autovetores de uma matriz de covariância simétrica real são ortogonais entre si, o que garante que os componentes principais sejam linearmente descorrelacionados (covariância zero entre qualquer par de componentes distintos).',
            cesgranrioTip: 'Componentes principais são ortogonais e descorrelacionados entre si.'
          },
          {
            questionNumber: 4,
            statement: 'Na regra de Kaiser para retenção de componentes principais em uma matriz de correlação padronizada, retêm-se os componentes cujo autovalor associado satisfaça a condição:',
            options: [
              'A) lambda < 0',
              'B) lambda > 1',
              'C) lambda = 0,5',
              'D) lambda > 100',
              'E) lambda <= 1'
            ],
            correctLetter: 'B',
            explanation: 'A regra de Kaiser estabelece que só devem ser retidos os componentes com autovalor maior que 1 (lambda > 1). Isso se justifica porque, em dados padronizados, cada variável original possui variância unitária (igual a 1); reter um componente com lambda < 1 significaria reter um eixo que explica menos informação do que uma única variável original.',
            cesgranrioTip: 'Regra de Kaiser: reter componentes com autovalor lambda > 1.'
          },
          {
            questionNumber: 5,
            statement: 'Na conexão algébrica entre a Decomposição em Valores Singulares (SVD) de uma matriz de dados centralizada X (com dimensões N x p) dada por X = U @ Sigma @ V.T e a Análise de Componentes Principais (PCA), as colunas da matriz ortogonal V correspondem a:',
            options: [
              'A) Aos autovetores da matriz de covariância amostral X.T @ X, que definem exatamente as direções dos componentes principais.',
              'B) Aos resíduos de ruído irredutível descartados na projeção geométrica.',
              'C) Às médias aritméticas empíricas calculadas para cada coluna de X.',
              'D) Aos valores singulares ao quadrado divididos pelo número de linhas.',
              'E) Aos pesos sinápticos de uma rede neural densa totalmente conectada.'
            ],
            correctLetter: 'A',
            explanation: 'Como a matriz de dispersão é X.T @ X = (V @ Sigma @ U.T) @ (U @ Sigma @ V.T) = V @ Sigma² @ V.T, as colunas da matriz direita V do SVD são identicamente os autovetores da matriz de covariância (os eixos dos componentes principais), e os valores singulares s_i relacionam-se com os autovalores por lambda_i = s_i² / (N - 1).',
            cesgranrioTip: 'SVD de X = U Sigma V.T: as colunas de V são os autovetores da covariância (direções do PCA).'
          }
        ]
      },
      {
        id: 'cap-b1-cluster',
        chapterNumber: 2,
        title: 'Algoritmos de Clustering: K-Means, DBSCAN e Métricas de Validação',
        subtitle: 'Particionamento por centróides versus densidade conectada com tolerância a ruído',
        readTimeEstimate: '45 min',
        summary: 'Comparação profunda entre K-Means (limitações de esfericidade e sensibilidade a outliers) e DBSCAN (densidade espacial com min_samples e eps). Modelos de Mistura de Gaussianas (GMM) e cálculo do Coeficiente de Silhueta.',
        contentMarkdown: `## 1. Algoritmo K-Means
Busca particionar N observações em K clusters minimizando a soma das distâncias quadradas intra-cluster (**Inércia / WCSS - Within-Cluster Sum of Squares**):
\`\`\`python
# Função de Inércia (WCSS) do K-Means:
wcss = np.sum([np.sum((X[cluster_k] - centroide_k) ** 2) for k, centroide_k in enumerate(centroides)])
\`\`\`

### Passos de Lloyd:
1. Inicializa K centróides.
2. **Atribuição:** Associa cada ponto ao centróide mais próximo pelo cálculo da distância euclidiana (\`np.linalg.norm(x_i - centroide_k)\`).
3. **Atualização:** Recalcula cada centróide como a média aritmética dos pontos atribuídos a ele (\`np.mean(X[cluster_k], axis=0)\`).
4. Repete até convergência.

### Fragilidades do K-Means Cobradas em Prova:
- Exige que o analista forneça o número K previamente.
- Assume clusters **esféricos**, convexos e de tamanhos/densidades similares.
- Altamente sensível a **outliers** (a média aritmética é puxada por pontos extremos).
- Pode convergir para ótimos locais. *Solução:* Usar a inicialização **K-Means++**, que afasta os centróides iniciais proporcionalmente à distância quadrada.

---

## 2. DBSCAN (Density-Based Spatial Clustering of Applications with Noise)
Não assume formas esféricas e descobre o número de clusters automaticamente com base na densidade local:
- **Dois Hiperparâmetros:** \`eps\` (raio da vizinhança esférica) e \`min_samples\` (mínimo de pontos na vizinhança).
- **Três Tipos de Pontos:**
  1. **Core Point (Ponto Central):** Possui pelo menos \`min_samples\` pontos dentro do raio \`eps\`.
  2. **Border Point (Ponto de Borda):** Não é Core, mas está na vizinhança \`eps\` de algum Core Point.
  3. **Noise (Ruído / Outlier):** Nem é Core, nem é vizinho de Core. É rotulado explicitamente com \`-1\`.

---

## 3. Métricas de Validação Sem Gabarito (Intrínsecas)
- **Coeficiente de Silhueta (Silhouette Score):**
  Para cada ponto i:
\`\`\`python
# Coeficiente de Silhueta em Python:
s_i = (b_i - a_i) / max(a_i, b_i)
\`\`\`
  Onde \`a_i\` é a distância média intra-cluster (coesão) e \`b_i\` é a distância média até os pontos do cluster vizinho mais próximo (separação).
  - Varia entre **-1 e +1**.
  - Próximo de **+1**: Ponto bem agrupado e distante de outros clusters.
  - Próximo de **0**: Ponto na fronteira entre dois clusters.
  - Negativo: Ponto provavelmente atribuído ao cluster errado.`,
        keyTakeaways: [
          'K-Means minimiza WCSS e falha em formas não esféricas/côncavas.',
          'DBSCAN encontra clusters de qualquer geometria e classifica pontos isolados como ruído (-1).',
          'Silhouette Score varia de -1 a +1; quanto mais próximo de 1, melhor a coesão e separação.'
        ],
        cesgranrioTraps: [
          'Afirmar que o Silhouette Score varia de 0 a 1 (o intervalo real é -1 a +1).',
          'Sugerir K-Means para agrupar trajetórias geográficas curvas de dutos ou navios.'
        ],
        practiceQuestions: [
          {
            questionNumber: 1,
            statement: 'Um cientista de dados aplicou o K-Means para agrupar clientes e calculou o Silhouette Score médio para diferentes valores de K: K=2 (s=0,31), K=3 (s=0,74), K=4 (s=0,52), K=5 (s=0,20). Com base exclusivamente nessa métrica, o número ótimo de clusters a ser adotado é:',
            options: [
              'A) K = 5',
              'B) K = 3',
              'C) K = 2',
              'D) K = 4',
              'E) O teste é inconclusivo pois o score deve ser estritamente negativo.'
            ],
            correctLetter: 'B',
            explanation: 'O Silhouette Score varia de -1 a +1, onde valores mais próximos de +1 indicam agrupamentos densos e bem separados. Dentre os valores testados, K=3 apresenta o score mais elevado (0,74), indicando a melhor estrutura de partição.',
            cesgranrioTip: 'Maior Silhouette Score = Melhor separação entre clusters e coesão interna.'
          },
          {
            questionNumber: 2,
            statement: 'No algoritmo DBSCAN com hiperparâmetros eps e min_samples, como é classificado um ponto de dados que possui menos de min_samples pontos em sua vizinhança eps, porém está localizado dentro do raio eps de um Ponto Central (Core Point)?',
            options: [
              'A) Ponto de Ruído (Noise - cluster -1).',
              'B) Ponto de Borda (Border Point).',
              'C) Novo Centróide de Cluster.',
              'D) Ponto Singular.',
              'E) Ponto Crítico de Lagrange.'
            ],
            correctLetter: 'B',
            explanation: 'Por definição do DBSCAN, um Border Point (Ponto de Borda) é aquele que não atinge a densidade mínima por si próprio (menos de min_samples em sua vizinhança), mas é alcançável por densidade por estar dentro do raio eps de algum Core Point.',
            cesgranrioTip: 'DBSCAN: Core Point tem >= min_samples; Border Point tem < min_samples mas é vizinho de Core; Noise não tem vizinho Core.'
          },
          {
            questionNumber: 3,
            statement: 'Qual é a principal vantagem da inicialização K-Means++ em comparação com a inicialização puramente aleatória clássica do K-Means?',
            options: [
              'A) Garante que a matriz de covariância seja invertível.',
              'B) Escolhe o primeiro centróide e posiciona os seguintes com probabilidade proporcional ao quadrado da distância até o centróide mais próximo, acelerando a convergência e evitando mínimos locais ruins.',
              'C) Elimina a necessidade de calcular distâncias euclidianas.',
              'D) Transforma o K-Means em um algoritmo determinístico que sempre acha o mínimo global absoluto em uma única iteração.',
              'E) Converte clusters côncavos em clusters esféricos.'
            ],
            correctLetter: 'B',
            explanation: 'O K-Means++ seleciona centróides iniciais espalhados geograficamente pelo espaço, reduzindo drasticamente o risco de convergência prematura para ótimos locais de má qualidade e acelerando a convergência do algoritmo de Lloyd.',
            cesgranrioTip: 'K-Means++ = Inicialização espaçada proporcional à distância quadrada.'
          },
          {
            questionNumber: 4,
            statement: 'Qual das seguintes características é uma limitação conhecida do algoritmo K-Means?',
            options: [
              'A) Incapacidade de lidar com dados numéricos contínuos.',
              'B) Dificuldade em agrupar clusters de formatos não convexos/não esféricos ou com densidades amplamente distintas.',
              'C) Complexidade computacional exponencial em relação ao número de observações N.',
              'D) Exigência de rótulos de classe supervisionados prévios.',
              'E) Impossibilidade de execução em Python.'
            ],
            correctLetter: 'B',
            explanation: 'O K-Means baseia-se na distância euclidiana para centróides médios, funcionando de maneira ótima para grupos esféricos e com densidades homogêneas. Para dados com formas sinuosas, anéis ou densidades desiguais, o K-Means falha e o DBSCAN é superior.',
            cesgranrioTip: 'K-Means falha em clusters não esféricos / não convexos.'
          },
          {
            questionNumber: 5,
            statement: 'Ao avaliar a qualidade intrínseca de uma partição de clusters gerada pelo K-Means sem a presença de rótulos externos de teste, um cientista calcula o Coeficiente de Silhueta (Silhouette Score) e o Índice Davies-Bouldin. A configuração de agrupamento preferível é caracterizada por:',
            options: [
              'A) Silhueta próxima de -1 e Davies-Bouldin o mais alto possível.',
              'B) Silhueta próxima de +1 (máxima coesão interna e separação externa) e Davies-Bouldin o menor possível (menor similaridade entre clusters distintos).',
              'C) Ambos os índices rigorosamente iguais a zero simultaneamente.',
              'D) Silhueta nula e Davies-Bouldin tendendo a infinito.',
              'E) Silhueta negativa e Davies-Bouldin estritamente negativo.'
            ],
            correctLetter: 'B',
            explanation: 'O Coeficiente de Silhueta varia de -1 a +1, onde valores próximos de +1 indicam que os pontos estão densamente agrupados em seu cluster e bem separados dos clusters vizinhos. O Índice Davies-Bouldin mede a razão entre a dispersão intra-cluster e a distância inter-cluster: quanto menor o valor de Davies-Bouldin (mais próximo de 0), melhor e mais nítida é a separação dos grupos.',
            cesgranrioTip: 'Qualidade de clustering: Silhouette Score alto (perto de +1) e Davies-Bouldin baixo (perto de 0).'
          }
        ]
      }
    ],
    examChecklist: [
      'Normalizar dados antes de aplicar PCA.',
      'Lembrar que o DBSCAN não exige definir o número K de clusters antecipadamente.',
      'Saber que o K-Means++ melhora a inicialização escolhendo sementes distantes.',
      'Silhouette Score combina coesão intra-cluster e separação inter-cluster.'
    ],
    practiceQuestions: [
      {
        questionNumber: 1,
        statement: 'Em um projeto de monitoramento de vazamentos na malha de transporte da Transpetro, os engenheiros precisam agrupar coordenadas georreferenciadas de leituras acústicas. O mapa de ruído apresenta aglomerados em formatos de anéis concêntricos e linhas sinuosas, com dezenas de falsos ecos aleatórios espalhados pelo oceano. O algoritmo mais indicado para essa tarefa é:',
        options: [
          'A) K-Means com K=3 e inicialização aleatória padrão.',
          'B) DBSCAN, por independer de centróides esféricos e rotular ecos isolados diretamente como ruído.',
          'C) PCA com redução para 1 componente ortogonal.',
          'D) Naive Bayes Supervisionado com suavização de Laplace.',
          'E) Regressão Linear com penalização L2 Ridge.'
        ],
        correctLetter: 'B',
        explanation: 'O K-Means pressupõe que os aglomerados sejam convexos e esféricos, falhando categoricamente em anéis concêntricos e formas sinuosas. Além disso, o K-Means é forçado a associar todo e qualquer ponto a um centróide, sem tolerar ruído. O DBSCAN (Density-Based Spatial Clustering) é o algoritmo canônico para descobrir agrupamentos de formas geométricas arbitrárias e marcar anomalias ou ecos isolados diretamente como ruído (cluster -1).',
        cesgranrioTip: 'Palavras-chave como "formas arbitrárias", "anéis concêntricos" e "presença de ruído/outliers" são a assinatura inequívoca do DBSCAN nas provas da Cesgranrio.'
      }
    ]
  },
  {
    id: 'livro-b1-deep-learning',
    itemCode: 'B1-03',
    block: 'Bloco I',
    title: 'Manual de Redes Neurais Artificiais, Deep Learning & Frameworks Modernos',
    subtitle: 'Do Perceptron ao Backpropagation, Otimizadores Adam, CNNs, LSTMs e Transformers',
    edition: 'Edição Especial Transpetro 2026',
    author: 'Equipe de Deep Learning & Visão Computacional Petrobras',
    pagesEquivalent: 235,
    readTimeEstimate: '3h 45min',
    badge: 'Alta Complexidade',
    themeGradient: 'from-violet-600 via-purple-600 to-indigo-800',
    borderAccent: 'border-violet-500/40',
    iconName: 'Network',
    overview: 'Curso aprofundado cobrindo o arcabouço matemático de Redes Neurais. Dedução do algoritmo Backpropagation pela regra da cadeia multivariada, análise das funções de ativação (Sigmoide, Tanh, ReLU, Leaky ReLU, GELU), regularização profunda com Dropout e Batch Normalization, dinâmicas de otimização estocástica (Adam, RMSprop) e arquiteturas especializadas: CNNs (visão em inspeção de dutos) e LSTMs/Transformers (séries temporais e telemetria).',
    officialEditalTopics: [
      'Perceptron simples e Perceptron Multicamadas (MLP)',
      'Funções de ativação: Sigmoide, Tanh, ReLU, Leaky ReLU e Softmax',
      'Algoritmo Backpropagation e atualização de pesos pela regra da cadeia',
      'Otimizadores estocásticos: SGD, Momentum, RMSprop e Adam',
      'Regularização em Redes Neurais: Dropout, Weight Decay e Batch Normalization',
      'Redes Neurais Convolucionais (CNNs): convolução, stride, padding e pooling',
      'Redes Neurais Recorrentes (RNNs, LSTM e GRU) para sequências e séries temporais',
      'Treino prático com bibliotecas Python (PyTorch e Keras/TensorFlow)',
      'Conceitos de Mecanismos de Atenção e Arquitetura Transformer (Self-Attention, BERT, GPT)'
    ],
    targetAudience: 'Engenheiros e especialistas que atuarão com visão computacional e inteligência preditiva profunda.',
    chapters: [
      {
        id: 'cap-b1-dl-fund',
        chapterNumber: 1,
        title: 'Estrutura do Neurônio Artificial, Funções de Ativação e Backpropagation',
        subtitle: 'A regra da cadeia multivariada e o problema do desaparecimento do gradiente',
        readTimeEstimate: '45 min',
        summary: 'Matemática da propagação para frente (forward pass) e retropropagação do erro (backward pass). Análise gráfica das funções Sigmoide, Tanh e ReLU com as causas do gradiente nulo.',
        contentMarkdown: `## 1. O Neurônio Artificial e o Perceptron Multicamadas (MLP)
Um neurônio artificial computa uma combinação linear ponderada de suas entradas adicionada de um bias b, seguida por uma função de ativação não linear sigma:
\`\`\`python
# Neurônio Artificial em Python:
z = np.dot(w, x) + b  # ou X @ w + b
ativacao = sigma(z)
\`\`\`
Sem funções de ativação não lineares, uma rede neural de 100 camadas colapsaria matematicamente em uma única transformação linear afim (W3 @ W2 @ W1 @ x = W_net @ x), sendo incapaz de aprender fronteiras complexas como a função XOR.

### Funções de Ativação Mais Cobradas em Python:
1. **Sigmoide Logística:**
\`\`\`python
sigmoid = lambda z: 1 / (1 + np.exp(-z))
# Derivada analítica: d_sigmoid = sigmoid(z) * (1 - sigmoid(z))
\`\`\`
   - *Problema Crítico:* Para |z| > 4, a derivada é quase zero (saturação). Provoca o **Desaparecimento do Gradiente (Vanishing Gradient)** nas camadas iniciais de redes profundas.
2. **Tangente Hiperbólica (Tanh):**
\`\`\`python
tanh = lambda z: np.tanh(z)  # (np.exp(z) - np.exp(-z)) / (np.exp(z) + np.exp(-z))
\`\`\`
   - Centrada no zero (ajuda na convergência), mas também sofre de saturação em valores extremos.
3. **ReLU (Rectified Linear Unit):**
\`\`\`python
relu = lambda z: np.maximum(0, z)
# Derivada: 1 se z > 0, senão 0
\`\`\`
   - Não satura para valores positivos grandes! Permitiu o nascimento do Deep Learning moderno.
   - *Ponto de Atenção:* **Dying ReLU** (se um neurônio receber ativação negativa crônica, seu gradiente será zero e ele nunca mais aprenderá). *Solução:* Leaky ReLU (\`np.maximum(0.01 * z, z)\`) ou Parametric ReLU.

---

## 2. O Algoritmo Backpropagation
Dada uma função de perda L, o gradiente em relação ao peso da camada l é calculado recursivamente pela Regra da Cadeia:
\`\`\`python
# Regra da Cadeia no Backpropagation:
# dL_dw[l] = delta[l] @ ativacao[l-1].T
# Onde delta[l] propaga o sinal de erro:
delta[l] = (W[l+1].T @ delta[l+1]) * d_sigma(z[l])
\`\`\`

---

## 3. Regularização Profunda: Dropout e Batch Normalization
- **Dropout:** Durante cada época de treino, desativa aleatoriamente uma fração p de neurônios (ex: p=0.5). Força os neurônios restantes a aprender representações robustas sem coadaptações frágeis (atua como um ensemble implícito). No teste/inferência, todos os neurônios são ativados e seus pesos são escalados por (1 - p).
- **Batch Normalization (BatchNorm):** Normaliza as ativações de cada mini-batch para média zero e variância unitária, acelerando dramaticamente o treinamento e permitindo taxas de aprendizado maiores.`,
        keyTakeaways: [
          'A não-linearidade é indispensável para resolver problemas não-separáveis (como XOR).',
          'Sigmoide e Tanh sofrem com Vanishing Gradient em redes profundas.',
          'ReLU resolve o desaparecimento de gradientes positivos, mas pode sofrer com Dying ReLU.',
          'Backpropagation é a aplicação recursiva da regra da cadeia multivariada.',
          'Dropout desativa neurônios aleatoriamente no treino para evitar coadaptação.'
        ],
        cesgranrioTraps: [
          'Afirmar que a função ReLU sofre de saturação para valores muito positivos. Quem satura em valores positivos é a Sigmoide e a Tanh; a derivada da ReLU é constante e igual a 1 para qualquer valor positivo.',
          'Dizer que o Dropout deve ser mantido ativo na fase de teste/inferência: no teste, o Dropout é desativado para garantir predições determinísticas.'
        ],
        practiceQuestions: [
          {
            questionNumber: 1,
            statement: 'Em redes neurais profundas (Deep Learning) com dezenas de camadas densas conectadas, o uso da função de ativação Sigmoide em todas as camadas intermediárias costuma provocar o fenômeno conhecido como Desaparecimento do Gradiente (Vanishing Gradient). A causa matemática desse problema reside no fato de que:',
            options: [
              'A) A função sigmoide gera números negativos indefinidos para entradas positivas.',
              'B) A derivada máxima da função sigmoide é de apenas 0,25, fazendo com que a multiplicação cumulativa pela regra da cadeia tenda exponencialmente a zero nas camadas iniciais.',
              'C) A função sigmoide é descontínua e não diferenciável na origem.',
              'D) O bias da camada de saída anula o cálculo das matrizes de peso W.',
              'E) O algoritmo de Backpropagation não permite cálculo de derivadas de funções logísticas.'
            ],
            correctLetter: 'B',
            explanation: 'A derivada da sigmoide sigma\'(z) = sigma(z) * (1 - sigma(z)) atinge seu valor máximo em z=0, onde vale 0,5 * 0,5 = 0,25. Ao multiplicar gradientes menores ou iguais a 0,25 por muitas camadas pela regra da cadeia no Backpropagation, o gradiente nas camadas próximas da entrada se reduz quase a zero, paralisando o aprendizado dessas camadas.',
            cesgranrioTip: 'Derivada máxima da sigmoide = 0,25. Multiplicar números < 0,25 muitas vezes = gradiente evapora para 0 (Vanishing Gradient).'
          },
          {
            questionNumber: 2,
            statement: 'Para mitigar o problema de "Dying ReLU", no qual neurônios com ativações estritamente negativas têm gradiente nulo permanente e deixam de aprender, a modificação recomendada na função de ativação é:',
            options: [
              'A) Substituir a ReLU pela função Degrau Unitário de Heaviside.',
              'B) Utilizar a Leaky ReLU, que introduz uma inclinação suave não nula (ex: f(z) = 0.01*z para z < 0).',
              'C) Elevar todas as ativações z ao quadrado antes do forward pass.',
              'D) Fixar a taxa de aprendizagem em zero.',
              'E) Desativar a camada de normalização por lote (Batch Normalization).'
            ],
            correctLetter: 'B',
            explanation: 'A função Leaky ReLU define f(z) = z se z > 0 e f(z) = alpha * z se z <= 0 (onde alpha é uma constante pequena como 0,01). Isso garante que o gradiente nunca seja estritamente zero para valores negativos, permitindo que neurônios previamente inativos continuem recebendo atualizações de peso.',
            cesgranrioTip: 'Dying ReLU -> Solução: Leaky ReLU ou Parametric ReLU (PReLU).'
          },
          {
            questionNumber: 3,
            statement: 'Qual é o papel desempenhado pela técnica de regularização Dropout durante o treinamento de redes neurais profundas?',
            options: [
              'A) Zera permanentemente os pesos das conexões sinápticas mais fracas.',
              'B) Desativa aleatoriamente uma fração dos neurônios a cada iteração de treino, impedindo a coadaptação complexa de atributos e reduzindo o overfitting.',
              'C) Converte neurônios densos em camadas convolucionais.',
              'D) Substitui o otimizador Adam pelo gradiente descendente exato.',
              'E) Aumenta a resolução espacial de imagens de entrada.'
            ],
            correctLetter: 'B',
            explanation: 'O Dropout desliga temporariamente neurônios aleatórios com probabilidade p durante o treinamento. Isso força cada neurônio a aprender características úteis de forma autônoma sem depender exclusivamente de neurônios vizinhos, mitigando o sobreajuste.',
            cesgranrioTip: 'Dropout = Desativação aleatória temporária de neurônios no treino para combater overfitting.'
          },
          {
            questionNumber: 4,
            statement: 'Por que uma rede neural artificial composta por múltiplas camadas densas que utiliza apenas funções de ativação estritamente lineares f(z) = z é incapaz de resolver o problema lógico do OU-Exclusivo (XOR)?',
            options: [
              'A) Porque o algoritmo Backpropagation não funciona com funções lineares.',
              'B) Porque a composição sucessiva de transformações lineares resulta matematicamente em uma única transformação linear equivalente, sendo incapaz de traçar fronteiras de decisão não-lineares.',
              'C) Porque funções lineares exigem que todas as entradas sejam números complexos.',
              'D) Porque o número de neurônios deve ser estritamente igual a 2.',
              'E) Porque a função XOR só pode ser resolvida por algoritmos não supervisionados.'
            ],
            correctLetter: 'B',
            explanation: 'A composição de transformações lineares (W2 @ (W1 @ x)) é identicamente igual a uma única matriz W_eq @ x. Como o problema do XOR não é linearmente separável por um único hiperplano, a não-linearidade das funções de ativação é matematicamente indispensável.',
            cesgranrioTip: 'Rede sem ativação não-linear = Equivalente a um único modelo linear simples.'
          },
          {
            questionNumber: 5,
            statement: 'Durante a fase de inferência (avaliação ou teste) de uma rede neural profunda treinada com camadas de Batch Normalization (BatchNorm), qual procedimento é adotado para normalizar os dados?',
            options: [
              'A) A média e a variância continuam sendo computadas dinamicamente a partir de cada mini-lote de teste isolado.',
              'B) A camada utiliza a média móvel e a variância móvel acumuladas (running mean e running variance) calculadas estavelmente durante a etapa de treinamento.',
              'C) A média é fixada estaticamente em zero e a variância em um sem considerar os dados históricos de treino.',
              'D) A camada de BatchNorm é inteiramente desativada e seus parâmetros gama e beta são zerados.',
              'E) O algoritmo exige que o lote de teste tenha exatamente o mesmo tamanho do lote de treino.'
            ],
            correctLetter: 'B',
            explanation: 'Durante o treino, o BatchNorm normaliza cada mini-batch e acumula uma estimativa móvel global da média e da variância populacional. No teste/inferência (model.eval() em PyTorch), para que a previsão de um único exemplo não dependa dos outros exemplos do lote, o BatchNorm usa essas médias e variâncias acumuladas do treino para normalizar deterministicamente.',
            cesgranrioTip: 'BatchNorm no teste/inferência: usa running mean e running variance aprendidas no treino.'
          }
        ]
      },
      {
        id: 'cap-b1-cnn-transformer',
        chapterNumber: 2,
        title: 'Arquiteturas Avançadas: CNNs, LSTMs, Otimizador Adam e Transformers',
        subtitle: 'Convoluções para visão em dutos e Self-Attention para linguagem e séries',
        readTimeEstimate: '50 min',
        summary: 'Operações de convolução, padding válido vs same, stride, max pooling. Portas de esquecimento em LSTMs e o mecanismo de atenção escalonada por produto escalar (Scaled Dot-Product Attention) em Transformers.',
        contentMarkdown: `## 1. Redes Convolucionais (CNNs)
Projetadas para dados com topologia em grade (como imagens térmicas de dutos ou espectrogramas):
- **Camada Convolucional:** Aplica filtros (kernels) compartilhados localmente. Reduz brutalmente o número de parâmetros frente a um MLP denso (Propriedade de **Compartilhamento de Pesos** e **Invariância à Translação**).
- **Fórmula da Dimensão de Saída em Python:**
\`\`\`python
# Dimensão espacial resultante após Convolução 2D:
# W: largura/altura da imagem, F: tamanho do filtro, P: padding, S: stride
W_out = int(np.floor((W - F + 2 * P) / S)) + 1
\`\`\`
- **Max Pooling:** Reduz a resolução espacial selecionando o valor máximo de cada janela (\`np.max\`), conferindo robustez a pequenas distorções e reduzindo dimensionalidade sem adicionar parâmetros treináveis.

---

## 2. Redes Recorrentes (RNNs) e LSTMs
- Redes neurais padrão não possuem memória de estados anteriores. As RNNs introduzem conexões de realimentação (\`h_t = sigma(W @ x_t + U @ h_prev)\`).
- **LSTM (Long Short-Term Memory):** Resolve o desaparecimento do gradiente em sequências longas mediante o **Cell State (C_t)** regulado por três portas (*Gates*):
  1. **Forget Gate (f_t):** Decide o que esquecer da memória anterior: \`f_t = sigmoid(W_f @ [h_prev, x_t] + b_f)\`.
  2. **Input Gate (i_t):** Decide quais novas informações escrever na célula.
  3. **Output Gate (o_t):** Decide o que expor no estado oculto h_t.

---

## 3. O Mecanismo de Autoatenção (Self-Attention) dos Transformers
Substituiu a recorrência em NLP e séries temporais com processamento 100% paralelo:
\`\`\`python
# Scaled Dot-Product Attention dos Transformers em Python:
# Q: Query, K: Key, V: Value, d_k: dimensão das chaves
attention = softmax((Q @ K.T) / np.sqrt(d_k)) @ V
\`\`\`
Onde \`np.sqrt(d_k)\` impede que o produto escalar atinja valores enormes que saturariam a softmax.

---

## 4. Otimizadores Estocásticos: Do SGD ao Adam
- **SGD com Momentum:** Adiciona uma fração da velocidade anterior para superar vales e mínimos locais rasos.
- **RMSprop:** Divide o gradiente pela raiz da média móvel exponencial dos gradientes ao quadrado, adaptando a taxa de aprendizado por parâmetro.
- **Adam (Adaptive Moment Estimation):** Combina o melhor do **Momentum** (média móvel de 1ª ordem do gradiente) com o **RMSprop** (média móvel de 2ª ordem dos quadrados dos gradientes). É o otimizador padrão ouro em Deep Learning.`,
        keyTakeaways: [
          'CNNs usam compartilhamento de pesos para processar imagens com poucos parâmetros.',
          'LSTMs possuem Cell State e três portas (Forget, Input e Output) para manter memória longa.',
          'Transformers eliminam a dependência de loops sequenciais através da autoatenção paralela.',
          'Otimizador Adam combina Momentum e RMSprop.'
        ],
        cesgranrioTraps: [
          'Confundir Pooling com Convolução: Camadas de Pooling NÃO possuem parâmetros treináveis (apenas realizam operações fixas como max ou average).',
          'Afirmar que a LSTM treina mais rápido do que a arquitetura Transformer. Transformers treinam muito mais rápido por permitirem paralelismo total no tempo, sem loops sequenciais recursivos.'
        ],
        practiceQuestions: [
          {
            questionNumber: 1,
            statement: 'Uma imagem radiográfica de solda de oleoduto com dimensões 64x64 pixels é processada por uma camada convolucional 2D com filtro de tamanho 3x3, sem preenchimento (padding = 0) e com passo unitário (stride = 1). A dimensão espacial (largura x altura) da imagem de saída após essa convolução é:',
            options: [
              'A) 64 x 64 pixels',
              'B) 62 x 62 pixels',
              'C) 60 x 60 pixels',
              'D) 32 x 32 pixels',
              'E) 66 x 66 pixels'
            ],
            correctLetter: 'B',
            explanation: 'Aplicando a fórmula dimensional W_out = ((W - F + 2*P) / S) + 1: W_out = ((64 - 3 + 2*0) / 1) + 1 = (61 / 1) + 1 = 62 pixels. Logo, a imagem de saída tem 62 x 62 pixels.',
            cesgranrioTip: 'Fórmula clássica de CNN: W_out = (W - F + 2P)/S + 1. Sem padding (P=0), perde-se (F - 1) pixels em cada dimensão.'
          },
          {
            questionNumber: 2,
            statement: 'Qual das seguintes afirmações sobre a arquitetura Transformer (Vaswani et al.) em comparação com as redes recorrentes tradicionais (LSTMs e GRUs) é tecnicamente correta?',
            options: [
              'A) O Transformer requer processamento estritamente sequencial token a token, sendo computacionalmente mais lento para treinar em GPUs.',
              'B) O Transformer substitui os loops recorrentes temporais pelo mecanismo de Autoatenção (Self-Attention), permitindo que todos os tokens de uma sequência sejam processados de maneira totalmente paralela.',
              'C) O Transformer não necessita de codificação de posição (Positional Encoding) porque os vetores de peso já contêm informação de ordenação sequencial.',
              'D) A camada de autoatenção calcula distâncias euclidianas em vez de produtos escalares entre matrizes Q e K.',
              'E) O Transformer só pode ser utilizado para classificação binária de imagens.'
            ],
            correctLetter: 'B',
            explanation: 'A grande revolução do Transformer foi eliminar a dependência sequencial passo a passo das RNNs/LSTMs, computando o mecanismo de atenção (Scaled Dot-Product Attention) em paralelo para toda a matriz de tokens de uma só vez, explorando com máxima eficiência o poder das GPUs.',
            cesgranrioTip: 'LSTMs = Sequenciais / Lentas. Transformers = Paralelos via Self-Attention.'
          },
          {
            questionNumber: 3,
            statement: 'Na arquitetura de Redes Neurais Recorrentes LSTM (Long Short-Term Memory), qual é o papel específico desempenhado pela porta de esquecimento (Forget Gate)?',
            options: [
              'A) Apagar permanentemente os pesos treinados da camada de saída.',
              'B) Decidir quais informações do estado da célula anterior (Cell State C_{t-1}) devem ser descartadas ou mantidas com base na entrada atual e no estado oculto prévio.',
              'C) Forçar todos os neurônios a adotarem a função de ativação ReLU.',
              'D) Calcular a perda cross-entropy entre predições e rótulos.',
              'E) Normalizar as ativações da camada convolucional.'
            ],
            correctLetter: 'B',
            explanation: 'A Forget Gate aplica uma função sigmoide sobre [h_{t-1}, x_t] produzindo valores entre 0 e 1 para multiplicar o Cell State anterior C_{t-1}. Um valor 0 significa "esquecer completamente" e 1 significa "manter integralmente" aquela informação na memória de longo prazo.',
            cesgranrioTip: 'Forget Gate da LSTM = Decidir o que descartar da memória da célula.'
          },
          {
            questionNumber: 4,
            statement: 'O otimizador Adam (Adaptive Moment Estimation) é amplamente considerado o padrão da indústria para treinamento de redes neurais profundas porque combina os conceitos de:',
            options: [
              'A) Algoritmos Genéticos e Simulated Annealing.',
              'B) Momentum (estimativa de 1º momento dos gradientes) e RMSprop (estimativa de 2º momento dos quadrados dos gradientes).',
              'C) Mínimos Quadrados e Decomposição Cholesky.',
              'D) Multiplicadores de Lagrange e Teorema de Bayes.',
              'E) Programação Linear e Simplex.'
            ],
            correctLetter: 'B',
            explanation: 'O Adam calcula médias móveis com decaimento exponencial dos gradientes passados (m_t - primeiro momento / momentum) e dos quadrados dos gradientes (v_t - segundo momento / RMSprop), adaptando a taxa de aprendizado individualmente para cada parâmetro com correção de viés.',
            cesgranrioTip: 'Adam = Momentum + RMSprop.'
          },
          {
            questionNumber: 5,
            statement: 'Em redes neurais convolucionais (CNNs), ao aplicar uma camada de Max Pooling 2D com tamanho de janela 2x2 e stride igual a 2 sobre um mapa de ativação com resolução espacial de 64x64 pixels e 32 canais de filtros, as dimensões do mapa de saída e a quantidade de parâmetros treináveis introduzidos pelo pooling serão, respectivamente:',
            options: [
              'A) Resolução 32x32 com 32 canais, e zero parâmetros treináveis.',
              'B) Resolução 64x64 com 16 canais, e 1.024 parâmetros treináveis.',
              'C) Resolução 16x16 com 64 canais, e 4.096 parâmetros treináveis.',
              'D) Resolução 32x32 com 64 canais, e 512 parâmetros treináveis.',
              'E) Resolução 128x128 com 32 canais, e zero parâmetros treináveis.'
            ],
            correctLetter: 'A',
            explanation: 'O Max Pooling com janela 2x2 e stride 2 reduz a largura e altura pela metade (64 / 2 = 32), mantendo inalterada a quantidade de canais (32 canais). O pooling é uma operação determinística fixa (extração do valor máximo da vizinhança) e NÃO introduz nenhum peso ou parâmetro treinável na rede neural.',
            cesgranrioTip: 'Pooling reduz a resolução espacial (largura x altura) sem alterar o número de canais e possui ZERO parâmetros treináveis.'
          }
        ]
      }
    ],
    examChecklist: [
      'Calcular o tamanho da imagem de saída da CNN usando a fórmula (W - F + 2P)/S + 1.',
      'Saber que o Max Pooling não tem pesos treináveis.',
      'Conhecer as três portas da LSTM: Forget, Input e Output.',
      'Entender que o Otimizador Adam combina Momentum e RMSprop.'
    ],
    practiceQuestions: [
      {
        questionNumber: 1,
        statement: 'Uma imagem radiográfica de solda de oleoduto da Transpetro com dimensões 128x128 pixels passa por uma camada convolucional 2D com filtros de tamanho 5x5, preenchimento com zeros (padding = 2) e passo (stride = 1). Em seguida, o mapa resultante passa por uma camada de Max Pooling com janela 2x2 e stride = 2. A dimensão espacial resultante (largura x altura) após essas duas operações é:',
        options: [
          'A) 124 x 124 pixels.',
          'B) 64 x 64 pixels.',
          'C) 62 x 62 pixels.',
          'D) 128 x 128 pixels.',
          'E) 32 x 32 pixels.'
        ],
        correctLetter: 'B',
        explanation: 'Primeiro, calculamos a saída da convolução: W_conv = ((128 - 5 + 2*2) / 1) + 1 = ((128 - 5 + 4) / 1) + 1 = 127 + 1 = 128 pixels (o padding=2 com filtro 5x5 garante "same padding"). Em seguida, o Max Pooling 2x2 com stride 2 reduz as dimensões pela metade: W_pool = 128 / 2 = 64 pixels. Portanto, a dimensão final é 64 x 64 pixels.',
        cesgranrioTip: 'Questões com cálculos aritméticos da dimensão de tensores em CNNs são recorrentes nas bancas Cesgranrio e Cebraspe para cargos de ciência de dados.'
      }
    ]
  },
  {
    id: 'livro-b1-nlp',
    itemCode: 'B1-04',
    block: 'Bloco I',
    title: 'Manual de Processamento de Linguagem Natural (NLP) & Modelagem de Tópicos',
    subtitle: 'TF-IDF, Stemming, Lemmatização, Word2Vec, BERT e Latent Dirichlet Allocation (LDA)',
    edition: 'Edição Especial Transpetro 2026',
    author: 'Equipe de Inteligência Artificial & Engenharia de Dados',
    pagesEquivalent: 220,
    readTimeEstimate: '3h 30min',
    badge: 'Cobrança Moderna',
    themeGradient: 'from-pink-600 via-rose-600 to-red-700',
    borderAccent: 'border-pink-500/40',
    iconName: 'MessageSquareText',
    overview: 'Explicação definitiva do ciclo completo de NLP para textos corporativos e relatórios operacionais. Pré-processamento rigoroso (Stemming de Porter/Snowball vs Lemmatização lexical), penalização matemática do TF-IDF, embeddings distribucionais com Word2Vec (CBOW vs Skip-Gram), modelagem probabilística não supervisionada com LDA e introdução a modelos pré-treinados (BERT).',
    officialEditalTopics: [
      'Pré-processamento: tokenização, remoção de stopwords, pontuação e normalização',
      'Stemming (algoritmos heurísticos) vs Lemmatização (morfológica)',
      'Representação vetorial: Bag of Words (BoW) e N-Grams',
      'TF-IDF (Term Frequency - Inverse Document Frequency) e penalização de termos comuns',
      'Word Embeddings densos: Word2Vec (arquiteturas CBOW e Skip-Gram)',
      'Embeddings pré-treinados: GloVe e FastText',
      'Modelagem de tópicos probabilística com LDA (Latent Dirichlet Allocation)'
    ],
    targetAudience: 'Especialistas em mineração de texto técnico e automação de compliance.',
    chapters: [
      {
        id: 'cap-b1-nlp-prep',
        chapterNumber: 1,
        title: 'Pré-Processamento Textual, TF-IDF e Representações Vetoriais',
        subtitle: 'Da limpeza de caracteres à ponderação de frequência inversa de documentos',
        readTimeEstimate: '45 min',
        summary: 'Diferença técnica entre Stemming (heurística sintática) e Lemmatização (análise gramatical completa). Formulação matemática do TF-IDF e vetorização esparsa.',
        contentMarkdown: `## 1. O Pipeline de Pré-Processamento de Texto
Antes de alimentar qualquer modelo estatístico ou de aprendizado de máquina, o texto não estruturado deve ser limpo e vetorizado:
1. **Tokenização:** Segmentação do fluxo contínuo de caracteres em palavras ou subpalavras (tokens).
2. **Remoção de Stopwords:** Eliminação de palavras gramaticais de alta frequência e baixo teor semântico (como preposições, artigos e conjunções).
3. **Normalização:** Conversão para minúsculas e remoção de caracteres de pontuação.

### Stemming vs. Lemmatização (Tema Clássico de Prova):
- **Stemming (Troncamento Heurístico):** Corta afixos e sufixos baseado em regras pré-fixadas (ex: Algoritmo de Porter). Não consulta dicionário. O resultado pode não ser uma palavra real no vocabulário!
  - *Exemplo:* "estudando", "estudioso", "estudos" -> radical "estud".
  - *Vantagem:* Extremamente rápido computacionalmente.
- **Lemmatização (Lematização Morfológica):** Utiliza um léxico morfológico formal e a classe gramatical (Part-of-Speech) da palavra no contexto para reduzi-la ao seu lema de dicionário (forma canônica).
  - *Exemplo:* "fomos" e "era" -> lema "ser". O Stemming falharia completamente aqui.
  - *Custo:* Requer análise sintática prévia e consome mais CPU.

---

## 2. Ponderação TF-IDF (Term Frequency - Inverse Document Frequency)
O modelo Bag-of-Words simples apenas conta ocorrências (TF), supervalorizando termos recorrentes sem valor discriminatório. O **TF-IDF** penaliza termos que aparecem em praticamente todos os documentos da coleção:
\`\`\`python
# Cálculo do TF-IDF em Python:
tf_idf = tf * idf
idf = np.log(total_documentos / (doc_freq + 1))
\`\`\`
- Se o termo aparece em todos os relatórios da Transpetro (\`doc_freq == total_documentos\`), o \`idf = np.log(1) = 0\`. O peso cai para zero!
- Se o termo for raro e exclusivo de falhas em bombas, seu IDF será muito alto.

---

## 3. Limitações de Bag-of-Words e N-Grams
- Bag-of-Words e TF-IDF tratam o texto como uma "sacola de palavras", **ignorando completamente a ordem e a sintaxe** ("não é bom" e "é bom não" teriam representações idênticas).
- Para amenizar isso, utilizam-se **N-Grams** (pares de palavras consecutivas como bigramas "não_bom" ou trigramas), ao custo de explodir a dimensionalidade do vocabulário.`,
        keyTakeaways: [
          'Stemming corta terminações por heurística bruta; Lemmatização usa morfologia e dicionário.',
          'TF-IDF penaliza palavras que aparecem em quase todos os documentos do corpus.',
          'Bag-of-Words e TF-IDF geram matrizes esparsas de alta dimensionalidade sem contexto de ordem.'
        ],
        cesgranrioTraps: [
          'Afirmar que o Stemming sempre produz palavras dicionarizadas válidas. Stemmers produzem radicais que frequentemente não existem no dicionário.',
          'Dizer que TF-IDF preserva o significado sintático e a ordem das palavras. TF-IDF é um modelo Bag-of-Words desprovido de ordem temporal.'
        ],
        practiceQuestions: [
          {
            questionNumber: 1,
            statement: 'Em processamento de linguagem natural, ao analisar as formas verbais "produzindo", "produziram" e "produção", um algoritmo reduziu todas para o radical "produz", enquanto para as formas "foi", "eram" e "serão" reduziu todas para o termo canônico "ser". Os processos linguísticos executados foram, respectivamente:',
            options: [
              'A) Lemmatização e Stemming.',
              'B) Stemming e Lemmatização.',
              'C) Tokenização e Remoção de Stopwords.',
              'D) Análise de Sentimento e Bag-of-Words.',
              'E) Part-of-Speech Tagging e Parsing de Dependência.'
            ],
            correctLetter: 'B',
            explanation: 'O primeiro processo aplicou uma regra de truncamento sufixal para extrair o radical comum "produz" (Stemming). O segundo processo utilizou dicionário léxico e análise morfológica para identificar a forma lematizada canônica no infinitivo do verbo irregular "ser" (Lemmatização).',
            cesgranrioTip: 'Stemming corta afixos gerando radicais (que podem não ser palavras reais). Lemmatização devolve o lema de dicionário (ex: "fui" -> "ir" ou "ser").'
          },
          {
            questionNumber: 2,
            statement: 'Um corpus é composto por 1.000 documentos técnicos. O termo "pressão" ocorre 5 vezes no documento D1. Sabe-se que o termo "pressão" aparece em exatamente 10 dos 1.000 documentos do acervo. Utilizando a fórmula IDF = log10(N / DF), o valor de TF-IDF do termo "pressão" no documento D1 é igual a:',
            options: [
              'A) 5 * log10(100) = 5 * 2 = 10',
              'B) 5 * log10(10) = 5 * 1 = 5',
              'C) 5 / 100 = 0,05',
              'D) log10(1.000) = 3',
              'E) 0, pois o termo ocorre em múltiplos documentos'
            ],
            correctLetter: 'A',
            explanation: 'TF = 5 (frequência no documento D1). IDF = log10(1.000 / 10) = log10(100) = 2. Portanto, TF-IDF = TF * IDF = 5 * 2 = 10.',
            cesgranrioTip: 'Cálculos diretos de TF * IDF com logaritmos de base 10 (log10(10)=1, log10(100)=2, log10(1000)=3) são extremamente frequentes na Cesgranrio.'
          },
          {
            questionNumber: 3,
            statement: 'Qual é a principal limitação conceitual da representação de documentos através do modelo Bag-of-Words (Saco de Palavras)?',
            options: [
              'A) O modelo é incapaz de processar números inteiros.',
              'B) O modelo descarta integralmente a ordem sequencial das palavras e as relações sintáticas do texto.',
              'C) O modelo só funciona para documentos com menos de 10 palavras.',
              'D) O modelo gera vetores estritamente densos com menos de 3 dimensões.',
              'E) O modelo exige obrigatoriamente redes neurais convolucionais.'
            ],
            correctLetter: 'B',
            explanation: 'O modelo Bag-of-Words desconsidera a estrutura gramatical, sintática e a ordem das palavras, tratando o documento como uma coleção desordenada de frequências de termos.',
            cesgranrioTip: 'Bag-of-Words ignora a ordem das palavras no texto.'
          },
          {
            questionNumber: 4,
            statement: 'Para capturar expressões compostas como "inteligência artificial" ou "gás liquefeito" em um pipeline de vetorização textual clássico sem modelos de linguagem profundos, utiliza-se a técnica de:',
            options: [
              'A) N-Grams (bigramas).',
              'B) Stemming reverso.',
              'C) Stopwords dinâmicas.',
              'D) Regressão Ridge.',
              'E) K-Means++ textual.'
            ],
            correctLetter: 'A',
            explanation: 'A extração de N-Grams agrupa sequências contíguas de n palavras (para n=2, bigramas como "gás liquefeito"), permitindo que modelos baseados em contagem capturem locuções e contexto imediato.',
            cesgranrioTip: 'Expressões compostas de palavras consecutivas = N-Grams.'
          },
          {
            questionNumber: 5,
            statement: 'Os modelos de linguagem modernos da família dos Transformers (como BERT e GPT) superaram as limitações da tokenização por palavras inteiras (vocabulários colossais e problemas com palavras fora do vocabulário) e por caracteres simples (sequências excessivamente longas) adotando algoritmos de tokenização por subpalavras (subword tokenization), tais como:',
            options: [
              'A) Byte-Pair Encoding (BPE), WordPiece e SentencePiece.',
              'B) Porter Stemmer e Snowball Stemmer estritos.',
              'C) Filtros de Bloom com hashing unidirecional sem retorno.',
              'D) Decomposição em Valores Singulares de N-grams.',
              'E) Autômatos finitos determinísticos de ordem 1 sem dicionário.'
            ],
            correctLetter: 'A',
            explanation: 'Algoritmos de subpalavras como BPE (Byte-Pair Encoding, usado no GPT), WordPiece (usado no BERT) e SentencePiece aprendem fragmentos estatisticamente frequentes de texto, permitindo representar palavras raras como junções de fragmentos conhecidos e evitando totalmente o problema de tokens desconhecidos (OOV).',
            cesgranrioTip: 'Tokenização em Transformers (BERT/GPT) = Subpalavras (BPE, WordPiece, SentencePiece).'
          }
        ]
      },
      {
        id: 'cap-b1-nlp-embed',
        chapterNumber: 2,
        title: 'Embeddings Densos (Word2Vec) e Modelagem de Tópicos (LDA)',
        subtitle: 'Espaços vetoriais semânticos densos, FastText e alocação probabilística de tópicos',
        readTimeEstimate: '45 min',
        summary: 'Arquiteturas CBOW e Skip-Gram do Word2Vec. Propriedade de linearidade semântica (Rei - Homem + Mulher = Rainha), FastText para palavras fora do vocabulário e tópicos latentes com distribuições de Dirichlet no LDA.',
        contentMarkdown: `## 1. Word2Vec: Embeddings Semânticos Densos
Modelos baseados em matrizes de coocorrência ou TF-IDF sofrem com a **maldição da dimensionalidade** e ignoram a similaridade semântica (para o TF-IDF, "petróleo" e "combustível" são vetores ortogonais com similaridade zero).

O Word2Vec mapeia cada palavra para um vetor contínuo denso em d dimensões (d entre 100 e 300) baseado na hipótese distribucional: *"Uma palavra é conhecida pela companhia que mantém"*.

### As Duas Arquiteturas Word2Vec:
1. **CBOW (Continuous Bag of Words):** Prevê a **palavra central alvo** a partir do contexto das palavras vizinhas.
   - *Comportamento:* Mais rápido para treinar, melhor para palavras frequentes.
2. **Skip-Gram:** Recebe a **palavra central** e tenta prever as **palavras do contexto** ao redor.
   - *Comportamento:* Superior para datasets menores e para representar termos raros.

### Propriedade de Álgebra Vetorial Semântica em Python:
\`\`\`python
# Operação vetorial semântica no Word2Vec:
vetor_resultado = vetor_rei - vetor_homem + vetor_mulher
# vetor_resultado ~= vetor_rainha (maior similaridade de cosseno)
\`\`\`

---

## 2. FastText: Superando Palavras Fora do Vocabulário (OOV)
O Word2Vec tradicional falha categoricamente quando encontra uma palavra que não existia no corpus de treinamento (problema Out-Of-Vocabulary / OOV).
O **FastText** (desenvolvido pelo Facebook/Meta) resolve isso representando cada palavra como um conjunto de **n-grams de caracteres** (ex: \`<pe\`, \`pet\`, \`etr\`, \`tro\`, \`ro>\`).
- O embedding da palavra é a soma dos embeddings dos seus n-grams de caracteres.
- Consegue gerar representações semânticas precisas para erros de digitação, termos técnicos novos e neologismos morfológicos!

---

## 3. Modelagem de Tópicos com LDA (Latent Dirichlet Allocation)
O LDA é um modelo generativo probabilístico não supervisionado para coleções de documentos:
- Assume que cada **documento** é uma mistura aleatória de múltiplos **tópicos latentes**.
- Cada **tópico latente** é uma distribuição de probabilidade sobre o **vocabulário de palavras**.
- As distribuições a priori de tópicos e palavras são modeladas por **Distribuições de Dirichlet** com hiperparâmetros alpha e beta.`,
        keyTakeaways: [
          'CBOW prevê palavra-alvo a partir do contexto; Skip-Gram prevê contexto a partir do alvo.',
          'Word2Vec preserva relações semânticas e analógicas no espaço vetorial.',
          'FastText utiliza n-grams de caracteres, resolvendo o problema de palavras fora do vocabulário (OOV).',
          'LDA é um modelo não supervisionado que assume que documentos são misturas probabilísticas de tópicos.'
        ],
        cesgranrioTraps: [
          'Confundir a direção de predição do CBOW e do Skip-Gram: o CBOW recebe o contexto e gera a palavra central.',
          'Dizer que o LDA requer que cada documento pertença a apenas um único tópico. O LDA modela misturas contínuas (proporções de múltiplos tópicos).'
        ],
        practiceQuestions: [
          {
            questionNumber: 1,
            statement: 'No treinamento de embeddings com Word2Vec, a arquitetura que utiliza as palavras de contexto vizinhas em uma janela deslizante para tentar prever a palavra central oculta é denominada:',
            options: [
              'A) Skip-Gram',
              'B) Continuous Bag of Words (CBOW)',
              'C) Latent Semantic Analysis (LSA)',
              'D) Latent Dirichlet Allocation (LDA)',
              'E) Autoencoder Variacional (VAE)'
            ],
            correctLetter: 'B',
            explanation: 'O CBOW (Continuous Bag of Words) recebe como entrada as representações das palavras de contexto circundantes e tenta predizer a palavra alvo central. Já o Skip-Gram faz o caminho inverso: recebe a palavra central e busca predizer o contexto ao seu redor.',
            cesgranrioTip: 'CBOW = Contexto prevê Alvo. Skip-Gram = Alvo prevê Contexto.'
          },
          {
            questionNumber: 2,
            statement: 'Na modelagem de tópicos por Alocação Latente de Dirichlet (LDA), a premissa probabilística central sobre a estrutura dos documentos e tópicos é que:',
            options: [
              'A) Cada documento pertence estrita e exclusivamente a um único tópico discreto determinístico.',
              'B) Cada documento é uma mistura probabilística de múltiplos tópicos, e cada tópico é uma distribuição de probabilidade sobre as palavras do vocabulário.',
              'C) As palavras em um texto seguem uma cadeia de Markov de 5ª ordem.',
              'D) Todos os tópicos possuem frequências estritamente idênticas no corpus.',
              'E) O LDA é um algoritmo supervisionado que exige anotação prévia dos tópicos por humanos.'
            ],
            correctLetter: 'B',
            explanation: 'O LDA é um modelo generativo não supervisionado que trata cada documento como uma distribuição de probabilidade sobre um conjunto de tópicos latentes (amostrados de uma Dirichlet), e cada tópico como uma distribuição sobre palavras.',
            cesgranrioTip: 'LDA = Não supervisionado + Mistura de tópicos nos documentos + Distribuição de Dirichlet.'
          },
          {
            questionNumber: 3,
            statement: 'Qual é a principal inovação técnica do modelo FastText em relação ao Word2Vec que lhe permite gerar embeddings de alta qualidade mesmo para palavras raras ou não vistas durante o treino (palavras fora do vocabulário - OOV)?',
            options: [
              'A) Uso de redes neurais convolucionais tridimensionais.',
              'B) Representação de cada palavra como a soma dos embeddings de seus n-grams de caracteres.',
              'C) Descarte automático de todas as vogais.',
              'D) Substituição de produtos escalares por distâncias de Manhattan.',
              'E) Exigência de dicionários manuais em formato XML.'
            ],
            correctLetter: 'B',
            explanation: 'O FastText decompõe as palavras em subpalavras (n-grams de caracteres, como "sub", "mar", "ino" para "submarino"). Isso permite que palavras não vistas no vocabulário tenham seu vetor estimado pela agregação dos pedaços de caracteres conhecidos.',
            cesgranrioTip: 'FastText = N-grams de caracteres = Lida com palavras fora do vocabulário (OOV).'
          },
          {
            questionNumber: 4,
            statement: 'No espaço de embeddings do Word2Vec, a famosa propriedade de linearidade semântica demonstrada pela operação vetorial "Rei - Homem + Mulher = Rainha" é capturada geometricamente porque:',
            options: [
              'A) O modelo calcula a distância Euclidiana invertida.',
              'B) As relações semânticas e gramaticais (como gênero, tempo verbal e capital-país) correspondem a vetores de deslocamento direcionais consistentes no espaço latente contínuo.',
              'C) O algoritmo foi treinado com regras explícitas de gramática prescritiva.',
              'D) O modelo opera exclusivamente com números primos.',
              'E) A função de perda força todas as palavras a terem norma zero.'
            ],
            correctLetter: 'B',
            explanation: 'O treinamento do Word2Vec com base no contexto linguístico força que analogias (ex: masculino para feminino) sejam representadas por vetores de translação semelhantes no hiperespaço contínuo.',
            cesgranrioTip: 'Word2Vec: Relações analógicas correspondem a vetores de deslocamento direcionais consistentes.'
          },
          {
            questionNumber: 5,
            statement: 'Ao mensurar a afinidade semântica entre dois vetores de embeddings em espaços densos de alta dimensionalidade (como representações de 300 dimensões do Word2Vec ou 768 dimensões do BERT), a métrica recomendada pela literatura em vez da distância Euclidiana simples é a:',
            options: [
              'A) Distância Euclidiana L2 pura, por penalizar a norma dos vetores.',
              'B) Similaridade de Cosseno, pois avalia o ângulo e a orientação direcional dos vetores no hiperespaço sem ser distorcida pela magnitude escalar ou comprimento do texto original.',
              'C) Distância de Hamming discreta para caracteres binários.',
              'D) Distância de Chebyshev baseada no valor absoluto supremo.',
              'E) Norma L1 de Manhattan estrita sem ponderação.'
            ],
            correctLetter: 'B',
            explanation: 'A Similaridade de Cosseno calcula o produto escalar normalizado (u . v) / (||u|| * ||v||), medindo o cosseno do ângulo entre os dois vetores. Ela varia de -1 a +1 e é independente do comprimento do vetor, capturando a orientação semântica sem ser afetada pela frequência absoluta de termos que inflaria a norma Euclidiana.',
            cesgranrioTip: 'Similaridade de Cosseno = Métrica padrão para avaliar proximidade semântica de embeddings.'
          }
        ]
      }
    ],
    examChecklist: [
      'Entender a fórmula do IDF: termos em todos os documentos têm IDF tendendo a zero.',
      'Diferenciar claramente Stemming (heurística) de Lemmatização (morfológica).',
      'Lembrar que o Skip-Gram é superior ao CBOW para palavras raras.',
      'FastText usa n-grams de caracteres para lidar com palavras OOV.',
      'Identificar o LDA como técnica não supervisionada probabilística baseada em Dirichlet.'
    ],
    practiceQuestions: [
      {
        questionNumber: 1,
        statement: 'Um engenheiro de dados da Transpetro processou um acervo de 10.000 relatórios de manutenção marítima para alimentar um algoritmo de busca semântica. Ao aplicar a métrica TF-IDF, o termo "Transpetro" apareceu em exatamente todos os 10.000 relatórios. O valor de IDF atribuído a esse termo na fórmula padrão e o efeito de sua multiplicação sobre o TF desse termo serão:',
        options: [
          'A) IDF = 1, mantendo o peso máximo do termo no vetor.',
          'B) IDF = 0 (pois log(10000/10000) = log(1) = 0), anulando a importância discriminatória do termo.',
          'C) IDF = 10.000, elevando o termo ao topo das pesquisas semânticas.',
          'D) IDF = infinito, gerando erro numérico de overflow.',
          'E) IDF = -1, invertendo a similaridade de cosseno de todos os vetores.'
        ],
        correctLetter: 'B',
        explanation: 'A fórmula de Frequência Inversa de Documento é dada por IDF = log(N / DF). Se o total de documentos N é 10.000 e a frequência documental DF também é 10.000, a fração resulta em 1. O logaritmo de 1 em qualquer base é zero (log(1) = 0). Logo, TF-IDF = TF * 0 = 0. Isso reflete a intuição teórica de que uma palavra presente em todos os documentos não serve para discriminar nenhum tópico.',
        cesgranrioTip: 'A Cesgranrio explora propriedades assintóticas das fórmulas de TF-IDF e o comportamento de termos universais em bases de textos.'
      }
    ]
  }
];
