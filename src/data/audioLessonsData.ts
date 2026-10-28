import { AudioLesson } from '../types';
import { REVISAO_PRA_TORAR_AUDIO_LESSONS } from './revisaoPraTorarData';

export const AUDIO_LESSONS_PLAYLIST: AudioLesson[] = [
  ...REVISAO_PRA_TORAR_AUDIO_LESSONS,
  {
    id: 'audio-01-prova-real',
    title: 'Gabarito Comentado: Os Itens Decisivos da Prova Petrobras 2021/2022',
    axisOrDiscipline: 'Prova Oficial Petrobras',
    durationEstimate: '6 min',
    tag: 'Gabarito Oficial',
    summary: 'Análise falada e didática dos itens mais cobrados na prova: Matriz de confusão, cálculo de derivadas na vazão de petróleo, TF-IDF e armadilhas de viés e variância.',
    transcript: `Olá, futuro concursado da Petrobras e Transpetro! Bem-vindo à nossa aula em áudio com o raio-x das questões mais emblemáticas da prova oficial de Ciência de Dados.

Vamos começar pelo item 52: a banca afirma que quanto menores forem os valores na diagonal principal da matriz de confusão, melhor o modelo. Cuidado! Essa afirmação está ERRADA. Os elementos da diagonal principal representam os acertos da classificação, ou seja, os verdadeiros positivos de cada classe. Portanto, quanto MAIORES os valores na diagonal, maior a acurácia e a precisão do classificador.

No item 53 sobre a Curva ROC, a banca inverteu a relação: a curva plota no eixo vertical a Sensibilidade, também chamada de taxa de verdadeiros positivos, contra a taxa de falsos positivos no eixo horizontal. Não confunda sensibilidade com falsos positivos!

Agora, atenção para o item 83 sobre Processamento de Linguagem Natural: foi perguntado o valor do TF-IDF para uma palavra que apareceu em todos os 10 livros do autor. Se o termo está presente em 100% dos documentos, a frequência documental é igual ao número total de documentos. Portanto, o IDF é o logaritmo de 10 dividido por 10, que é o logaritmo de 1. Como o log de 1 é rigorosamente ZERO, o TF-IDF zera completamente! Essa é uma clássica questão eliminatória da banca.

Por fim, no item 100 de Matemática Aplicada à Operação: para saber se a produção de petróleo estava aumentando na décima hora, calculamos a primeira derivada da função de vazão. Como f linha no ponto 10 resultou em um valor estritamente positivo, a função é crescente e a produção estava aumentando. 

Memorize estas regras e siga firme na preparação!`,
    keyPoints: [
      'Diagonal principal da matriz de confusão representa acertos (quanto maior, melhor).',
      'Curva ROC plota TPR (Sensibilidade) no eixo Y versus FPR no eixo X.',
      'Se um termo aparece em todos os documentos da base, seu IDF é zero e o TF-IDF é zero.',
      'Primeira derivada positiva indica produção de óleo estritamente crescente.'
    ]
  },
  {
    id: 'audio-02-metricas-avaliacao',
    title: 'Eixo VI: Métricas de Avaliação, Curva ROC e Regularização L1 e L2',
    axisOrDiscipline: 'Eixo VI - Modelagem & Métricas',
    durationEstimate: '5 min',
    tag: 'Métricas & Regularização',
    summary: 'Entenda quando usar Acurácia, Precisão, Recall, F1-Score e como o Lasso e o Ridge atuam sobre os pesos para evitar overfitting.',
    transcript: `Bem-vindo ao episódio dedicado às Métricas de Avaliação de Modelos e Técnicas de Regularização.

A pergunta fundamental em provas de concurso é: por que a Acurácia não deve ser utilizada isoladamente em bases desbalanceadas? Imagine que em um duto de transporte de petróleo, apenas zero vírgula um por cento das medições representem um vazamento crítico. Um modelo ingênuo que sempre preveja ausência de vazamento terá 99,9% de acurácia, mas será totalmente inútil porque não detectará nenhuma falha! Nesses cenários, as métricas mandatórias são o Recall, que mede a capacidade do modelo de capturar todos os casos positivos reais, e a Precisão, que mede a confiabilidade dos alarmes disparados.

Quando precisamos ponderar falsos positivos e falsos negativos simultaneamente, usamos o F1-Score, que é a média harmônica entre precisão e recall.

Já no campo da regularização para combater o overfitting, temos dois pilares: o Lasso, ou penalização L1, e o Ridge, ou penalização L2. O Lasso penaliza a soma dos valores absolutos dos pesos e tem a propriedade matemática única de forçar coeficientes irrelevantes a ZERO, realizando seleção de variáveis. O Ridge, por outro lado, penaliza a soma dos quadrados dos pesos; ele reduz a magnitude dos coeficientes, mas nunca os zera por completo.

Lembre-se: Lasso induz esparsidade e zera variáveis; Ridge encolhe coeficientes sem zerar. Guarde essa distinção!`,
    keyPoints: [
      'Em classes desbalanceadas, priorize Recall, Precisão e PR-AUC sobre Acurácia simples.',
      'F1-Score é a média harmônica entre Precisão e Recall.',
      'Regularização L1 (Lasso) zera coeficientes e atua como seleção automática de variáveis.',
      'Regularização L2 (Ridge) encolhe os coeficientes sem zerá-los.'
    ]
  },
  {
    id: 'audio-03-ensembles-modelos',
    title: 'Eixo VII: A Batalha dos Ensembles — Bagging (Random Forest) vs Boosting (XGBoost)',
    axisOrDiscipline: 'Eixo VII - Classes de Modelos',
    durationEstimate: '5 min',
    tag: 'Ensembles & ML',
    summary: 'Aprenda a diferença arquitetural definitiva entre modelos paralelos focados em variância (Bagging) e modelos sequenciais focados em viés (Boosting).',
    transcript: `Neste episódio, vamos desvendar o tema favorito da Cesgranrio e Cebraspe na área de aprendizado de máquina: Ensembles.

Os métodos ensemble combinam múltiplos modelos fracos, geralmente árvores de decisão, para produzir um estimador robusto. Existem duas filosofias principais:

A primeira é o BAGGING, sigla para Bootstrap Aggregating. No Bagging, nós criamos diversas amostras aleatórias com reposição a partir dos dados originais, chamadas de amostras Bootstrap. Em seguida, treinamos árvores de decisão profundas de forma independente e em PARALELO. Como árvores profundas têm baixo viés, mas altíssima variância, a combinação de suas predições por média ou voto majoritário tem como principal objetivo REDUZIR A VARIÂNCIA. O exemplo mais clássico de Bagging é a Floresta Aleatória, a Random Forest, que ainda adiciona aleatoriedade na escolha dos atributos em cada nó.

A segunda filosofia é o BOOSTING, representado pelo AdaBoost, Gradient Boosting, XGBoost e LightGBM. No Boosting, os modelos são treinados de forma SEQUENCIAL. Cada nova árvore é treinada para corrigir os erros e resíduos cometidos pelos modelos anteriores. Como o foco é transformar modelos fracos em um modelo forte, o objetivo primordial do Boosting é REDUZIR O VIÉS.

Resumo para levar para a prova: Bagging treina em paralelo e reduz variância. Boosting treina em série e reduz viés. Não caia na pegadinha de trocar os dois!`,
    keyPoints: [
      'Bagging: Treinamento independente em paralelo com amostras Bootstrap, foco em REDUZIR VARIÂNCIA.',
      'Boosting: Treinamento sequencial focado em aprender com erros residuais, foco em REDUZIR VIÉS.',
      'Random Forest adiciona seleção aleatória de subespaço de features a cada split da árvore.'
    ]
  },
  {
    id: 'audio-04-nlp-embeddings',
    title: 'Eixo VIII: NLP Moderno — De Stop-words e Word2Vec até Transformers',
    axisOrDiscipline: 'Eixo VIII - Processamento de Linguagem Natural',
    durationEstimate: '5 min',
    tag: 'NLP & Transformers',
    summary: 'Como transformar texto em vetores numéricos: Stop-words, TF-IDF, Word2Vec (CBOW vs Skip-Gram) e o mecanismo de auto-atenção nos Transformers.',
    transcript: `Seja muito bem-vindo ao módulo de Processamento de Linguagem Natural.

Tudo em NLP começa com o pré-processamento. A remoção de stop-words elimina conectivos, artigos e preposições de alta frequência que pouco contribuem para distinguir o sentido semântico de um documento. 

A seguir, vem a representação vetorial. A clássica fórmula do TF-IDF multiplica a frequência do termo no documento pelo inverso da frequência do termo em toda a coleção. O objetivo é valorizar termos que aparecem bastante no texto atual, mas que são raros no corpus geral. Como vimos na prova da Petrobras, se a palavra aparecer em todos os textos, o IDF vira zero e o peso final também zera.

Depois vieram os embeddings densos com o Word2Vec. Memorize esta diferença: o modelo CBOW, Continuous Bag of Words, recebe as palavras de contexto circundantes para prever a palavra central. Já o Skip-Gram faz o caminho oposto: recebe a palavra central para prever as palavras que estão ao seu redor no contexto.

Por fim, a revolução dos Transformers substituiu as redes recorrentes por mecanismos de Auto-Atenção Escalonada, ou Self-Attention, permitindo que todas as palavras de uma sequência sejam processadas em paralelo com captura de dependências a longa distância. 

Compreender o cálculo de TF-IDF e a dicotomia CBOW versus Skip-Gram garantirá pontos preciosos na sua classificação!`,
    keyPoints: [
      'Stop-words: palavras de alta frequência e baixa informação discriminativa semântica.',
      'CBOW prevê a palavra central com base no contexto circundante.',
      'Skip-Gram prevê o contexto circundante a partir da palavra central.',
      'Mecanismo de Atenção dos Transformers: Attention(Q, K, V) = softmax(Q * K^T / raiz(d_k)) * V.'
    ]
  },
  {
    id: 'audio-05-limpeza-missing-data',
    title: 'Eixo V: Limpeza de Dados, Imputação com MICE e K-NN e Detecção de Outliers',
    axisOrDiscipline: 'Eixo V - Preparação de Dados',
    durationEstimate: '5 min',
    tag: 'Preparação & Limpeza',
    summary: 'Conceitos de MCAR, MAR, MNAR, imputação multivariada com MICE e métricas de boxplot e Z-score.',
    transcript: `Neste episódio, tratamos de uma das etapas mais intensivas do trabalho do cientista de dados: a preparação e qualidade dos dados.

Diante de valores faltantes, a literatura classifica a perda em três categorias:
Primeiro, MCAR: Missing Completely at Random. A probabilidade de um dado faltar é puramente acidental e não depende de nenhuma variável.
Segundo, MAR: Missing at Random. A ausência do dado está correlacionada com outras variáveis observadas no conjunto de dados, mas não com o próprio valor ausente. É exatamente para dados do tipo MAR que o método MICE, ou Imputação Multivariada por Equações Encadeadas, é a escolha mais consagrada da literatura!
Terceiro, MNAR: Missing Not at Random. A perda depende do próprio valor que está faltando.

Quando utilizamos o algoritmo KNN Imputer para estimar nulos com base nos vizinhos mais próximos, devemos ter cuidado com bases heterogêneas. Se a tabela misturar atributos numéricos e atributos categóricos nominais, distâncias euclidianas puras não funcionam, exigindo métricas híbridas como a HEOM.

Para identificar outliers de forma univariada, o diagrama de caixa ou Boxplot utiliza o intervalo interquartil IQR, definido por Q3 menos Q1. Qualquer observação abaixo de Q1 menos um vírgula cinco vezes o IQR, ou acima de Q3 mais um vírgula cinco vezes o IQR, é classificada como potencial outlier.

Dominar essa régua estatística é indispensável para gabaritar o Eixo V!`,
    keyPoints: [
      'Dados MAR (Missing at Random) são o cenário ideal para aplicação do algoritmo MICE.',
      'KNN Imputer em dados mistos exige funções de distância heterogêneas como HEOM ou HVDM.',
      'Fórmula do Boxplot: Outliers estão além de 1,5 vezes o IQR a partir dos quartis Q1 e Q3.',
      'A média das observações padronizadas por Z-score é sempre rigorosamente zero.'
    ]
  },
  {
    id: 'audio-06-big-data-lakehouse',
    title: 'Eixo III: Big Data, Arquitetura Data Lakehouse e Apache Spark',
    axisOrDiscipline: 'Eixo III - Dados & Big Data',
    durationEstimate: '5 min',
    tag: 'Big Data & Spark',
    summary: 'Conheça o ecossistema moderno de dados: transações ACID no Lakehouse (Delta Lake), HDFS e otimização de joins com Broadcast Hash Join no Spark.',
    transcript: `Seja muito bem-vindo à nossa aula sobre Engenharia e Arquitetura de Big Data para a Transpetro.

Historicamente, as empresas dividiam seus dados entre Data Warehouses, que ofereciam garantias transacionais ACID e alto desempenho SQL, porém com custos elevados de armazenamento e pouca flexibilidade, e os Data Lakes, que armazenavam petabytes de dados brutos e semiestruturados em storage de objetos a baixo custo, mas sem garantias de consistência.

A arquitetura moderna adotada pela Petrobras é o Data Lakehouse, exemplificada por tecnologias como Delta Lake e Apache Iceberg. O Lakehouse une o melhor dos dois mundos: armazena dados em formatos abertos colunares como Parquet, mas adiciona um log de transações que viabiliza propriedades ACID, time travel para voltar a versões históricas da tabela e aplicação rigorosa de esquema. Na Arquitetura Medalhão, os dados transitam da camada Bronze para a Silver limpa e finalmente para a Gold agregada para BI e modelos de IA.

No processamento distribuído com Apache Spark, lembre-se de duas regras de ouro:
Primeiro: transformações são LAZY. Elas montam um grafo de execução e só são computadas quando uma ação como count ou write é solicitada.
Segundo: ao juntar uma tabela gigantesca com uma tabela pequena de dimensão, use o Broadcast Hash Join. O Spark envia a tabela pequena inteira para a memória de cada worker, eliminando por completo a dispendiosa transferência de dados pela rede, o famoso shuffle!

Guarde esses conceitos arquiteturais para garantir sua vaga!`,
    keyPoints: [
      'Data Lakehouse combina o storage barato do Data Lake com as transações ACID do Data Warehouse.',
      'Delta Lake permite Time Travel (viagem no tempo) e Schema Enforcement sobre arquivos Parquet.',
      'Broadcast Hash Join no Apache Spark distribui tabela pequena e elimina o custo do shuffle de rede.',
      'Arquitetura Medalhão divide os dados em camadas Bronze (raw), Silver (limpo) e Gold (analítico).'
    ]
  },
  {
    id: 'audio-07-estatistica-inferencia',
    title: 'Eixo II: Probabilidade, Teorema Central do Limite e Testes de Hipóteses',
    axisOrDiscipline: 'Eixo II - Estatística',
    durationEstimate: '5 min',
    tag: 'Inferência & Testes',
    summary: 'A lógica dos testes de hipóteses: Erro Tipo I, Erro Tipo II, p-valor, Welch t-test, ANOVA e convergência assintótica pelo TCL.',
    transcript: `Neste episódio, mergulhamos no coração da Inferência Estatística.

Quando formulamos um teste de hipóteses, a hipótese nula H0 representa a ausência de efeito ou igualdade. O julgamento pode incorrer em dois erros clássicos:
O Erro Tipo I, simbolizado pela letra grega Alfa, ocorre quando rejeitamos a hipótese nula H0, embora ela seja verdadeira. É o famoso falso positivo.
O Erro Tipo II, simbolizado pela letra Beta, ocorre quando não rejeitamos H0, mesmo sendo ela falsa. É o falso negativo.
O Poder do Teste Estatístico é dado por um menos Beta, que mede a capacidade do teste de detectar um efeito real quando ele de fato existe.

E o que significa o p-valor? O p-valor é a probabilidade de obtermos uma estatística de teste tão ou mais extrema do que a observada na amostra, assumindo que H0 seja verdadeira. Regra prática de ouro: se o p-valor for menor ou igual ao nível de significância Alfa, nós rejeitamos H0!

Por fim, o Teorema Central do Limite nos garante que, à medida que o tamanho amostral cresce, a distribuição da média amostral padronizada converge para a distribuição normal padrão, independentemente da forma da distribuição original dos dados. 

Com essa base matemática sólida, nenhum teste de hipóteses te pegará de surpresa!`,
    keyPoints: [
      'Erro Tipo I (Alfa): Rejeitar H0 verdadeira (falso alarme).',
      'Erro Tipo II (Beta): Deixar de rejeitar H0 falsa (falha de detecção).',
      'Poder do Teste: 1 - Beta (capacidade de detectar efeito real).',
      'Se p-valor <= Alfa, rejeita-se H0.',
      'Teorema Central do Limite garante convergência da média amostral para Normal N(0, 1).'
    ]
  },
  {
    id: 'audio-08-governanca-lgpd-ia',
    title: 'Eixos XI e XII: Governança de Dados DMBOK, LGPD e IA Responsável',
    axisOrDiscipline: 'Eixos XI & XII - Governança & IA Ética',
    durationEstimate: '5 min',
    tag: 'LGPD & IA Ética',
    summary: 'As bases legais da LGPD na indústria, dimensões da qualidade DMBOK, explicabilidade com SHAP e LIME e segurança contra ataques adversariais.',
    transcript: `Concluímos nossa trilha de áudio com dois temas estratégicos para empresas de economia mista como a Petrobras e subsidiárias como a Transpetro: Governança de Dados e IA Responsável.

Sobre a LGPD, Lei 13.709 de 2018: lembre-se de que o consentimento é apenas UMA das dez bases legais autorizadoras. O tratamento de dados para cumprimento de obrigação legal ou regulatória e para a execução de contratos pode ser realizado legalmente sem a necessidade de consentimento do titular.
Outro ponto quente em concursos é a distinção entre Dado Anonimizado e Dado Pseudonimizado. O dado anonimizado perdeu de forma irreversível a associação à pessoa natural e sai do escopo da LGPD. Já o dado pseudonimizado mantém a capacidade de reassociação mediante chave externa mantida sob controle restrito e continua sob a tutela da lei.

No framework DAMA-DMBOK, destacam-se seis dimensões da qualidade: Completude, Conformidade, Consistência, Acurácia, Integridade e Tempestividade.

No campo da IA Responsável e Segura, o modelo não pode ser uma caixa-preta inexplicável. Usamos técnicas de XAI como o SHAP, fundamentado na teoria dos jogos de Shapley, para atribuir a contribuição marginal justa de cada feature para a previsão final. E na segurança cibernética, prevenimos ataques de envenenamento de dados, conhecidos como Data Poisoning, e perturbações adversariais nos inputs.

Com essa visão integral de negócios, governança e técnica, você está pronto para conquistar sua aprovação!`,
    keyPoints: [
      'Consentimento é apenas uma das 10 bases legais da LGPD (execução de contrato e obrigação legal não exigem consentimento).',
      'Dado anonimizado não é dado pessoal para a LGPD; dado pseudonimizado permanece sob a lei.',
      '6 Dimensões de qualidade DMBOK: Completude, Acurácia, Consistência, Tempestividade, Conformidade e Integridade.',
      'SHAP baseia-se em valores de Shapley para fornecer explicabilidade local e global justa.'
    ]
  }
];
