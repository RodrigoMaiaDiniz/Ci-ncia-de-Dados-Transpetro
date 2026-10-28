import { DigitalBook } from '../../types';

export const BLOCO_2_ENG_BOOKS: DigitalBook[] = [
  {
    id: 'livro-b2-estruturas-algoritmos',
    itemCode: 'B2-04',
    block: 'Bloco II',
    title: 'Manual de Estruturas de Dados, Algoritmos & Complexidade Big-O',
    subtitle: 'Análise Assintótica, Tabelas Hash, Árvores Balanceadas, Grafos e Algoritmos de Ordenação',
    edition: 'Edição Especial Transpetro 2026',
    author: 'Equipe de Engenharia de Software & Algoritmos Avançados',
    pagesEquivalent: 220,
    readTimeEstimate: '3h 40min',
    badge: 'Cobrança Clássica de TI',
    themeGradient: 'from-blue-700 via-sky-600 to-cyan-800',
    borderAccent: 'border-blue-500/40',
    iconName: 'Network',
    overview: 'Dominando a eficiência computacional em processamento de dados em larga escala. Notação Big-O no pior caso, melhor caso e caso médio. Comportamento de memória e tempo para Listas Encadeadas, Filas (FIFO), Pilhas (LIFO), Tabelas Hash com tratamento de colisão (encadeamento vs endereçamento aberto), Árvores Binárias de Busca (BST e AVL), Heaps Binários e algoritmos clássicos de ordenação (Quicksort, Mergesort, Heapsort).',
    officialEditalTopics: [
      'Complexidade assintótica de tempo e espaço e Notação Big-O',
      'Estruturas lineares: Arrays dinâmicos, Listas Encadeadas, Pilhas (LIFO) e Filas (FIFO)',
      'Tabelas Hash (dicionários): funções de hash, tratamento de colisões e custo O(1)',
      'Árvores Binárias de Busca (BST), árvores balanceadas (AVL) e percursos',
      'Heaps Binários (Min-Heap, Max-Heap) e Filas de Prioridade',
      'Algoritmos de busca: Busca Linear O(n) vs Busca Binária O(log n)',
      'Algoritmos de ordenação: Quicksort, Mergesort e Heapsort',
      'Noções de Grafos: matriz e lista de adjacência, busca em largura (BFS) e profundidade (DFS)'
    ],
    targetAudience: 'Engenheiros de dados que buscam alta performance algorítmica e gabarito na Cesgranrio.',
    chapters: [
      {
        id: 'cap-b2-algo-bigo',
        chapterNumber: 1,
        title: 'Análise Assintótica, Notação Big-O e Algoritmos de Ordenação',
        subtitle: 'Quicksort vs Mergesort vs Heapsort: estabilidade e consumo de memória',
        readTimeEstimate: '45 min',
        summary: 'Definição formal de O(g(n)). Comparativo completo das ordens de grandeza (O(1), O(log n), O(n), O(n log n), O(n²)). Análise rigorosa dos algoritmos de ordenação no melhor, médio e pior caso, com estabilidade e memória auxiliar.',
        contentMarkdown: `## 1. Notação Assintótica: Big-O, Omega (Ω) e Theta (Θ)

A análise assintótica estuda o comportamento do tempo de execução ou do consumo de memória de um algoritmo quando o tamanho da entrada de dados n tende ao infinito (n -> inf).

- **Big-O (O): Limite Superior Assintótico (Teto).**
  Dizemos que f(n) = O(g(n)) se existirem constantes positivas c e n_0 tais que f(n) <= c * g(n) para todo n >= n_0. Representa o **pior caso garantido** do algoritmo.
- **Big-Omega (Ω): Limite Inferior Assintótico (Piso).**
  Dizemos que f(n) = Ω(g(n)) se f(n) >= c * g(n) para todo n >= n_0. Representa o **melhor caso absoluto**.
- **Big-Theta (Θ): Limite Justo / Exato.**
  Ocorre quando a função é limitada tanto superiormente quanto inferiormente pela mesma ordem de grandeza: c_1 * g(n) <= f(n) <= c_2 * g(n). Significa que o algoritmo roda estritamente nessa taxa de crescimento.

### Hierarquia de Complexidades Assintóticas:
\`\`\`python
# Hierarquia formal da mais veloz para a mais lenta:
# O(1) < O(log(n)) < O(n) < O(n * log(n)) < O(n ** 2) < O(2 ** n) < O(factorial(n))
\`\`\`

---

## 2. Tabela Comparativa de Algoritmos de Ordenação

A banca Cesgranrio cobra com alta frequência a comparação precisa entre os algoritmos de ordenação elementares e avançados:

| Algoritmo | Melhor Caso | Caso Médio | Pior Caso | Memória Adicional | Estabilidade |
|---|---|---|---|---|---|
| **Insertion Sort** | O(n) (já ordenado) | O(n²) | O(n²) | O(1) (in-place) | **Estável** |
| **Bubble Sort** | O(n) (com flag) | O(n²) | O(n²) | O(1) (in-place) | **Estável** |
| **Quicksort** | O(n log n) | O(n log n) | **O(n²)** (pivô desbalanceado) | O(log n) (pilha recursiva) | **Não Estável** |
| **Mergesort** | O(n log n) | O(n log n) | **O(n log n)** | **O(n)** (vetor auxiliar) | **Estável** |
| **Heapsort** | O(n log n) | O(n log n) | **O(n log n)** | **O(1)** (in-place) | **Não Estável** |

### Conceito Vital: Estabilidade da Ordenação
Um algoritmo é dito **estável** se, e somente se, ele **preserva a ordem relativa original** de elementos que possuem chaves de ordenação idênticas.
- *Aplicação prática na Transpetro:* Se tivermos registros de telemetria de pressão onde dois eventos ocorreram no mesmo segundo, um algoritmo estável (como Mergesort) garante que o evento que chegou primeiro na fila permaneça antes do segundo na saída ordenada. O Quicksort e o Heapsort podem trocar essas posições relativas durante trocas de elementos distantes!

---

## 3. Quicksort em Detalhes: O Perigo do Pior Caso
O Quicksort baseia-se no paradigma de **Divisão e Conquista**. Ele escolhe um elemento como **pivô** e particiona o vetor em dois subvetores: elementos menores que o pivô à esquerda, e elementos maiores à direita.
- **Caso Médio O(n log n):** Quando o pivô divide o vetor em partes aproximadamente iguais a cada chamada recursiva.
- **Pior Caso O(n²):** Ocorre quando o pivô escolhido é repetidamente o menor ou o maior elemento do vetor (por exemplo, quando o vetor já está ordenado e escolhe-se o primeiro ou o último elemento como pivô). A árvore de recursão degenera para profundidade n.
- **Prevenção:** Emprego de *pivô aleatório* (Randomized Quicksort) ou técnica de *mediana de três* (mediana entre primeiro, meio e último).

---

## 4. Mergesort vs Heapsort: Decisão de Arquitetura
- **Mergesort:** Divide o vetor ao meio até subvetores unitários e recombina-os de forma ordenada (função merge). Garante O(n log n) mesmo no pior caso e é estável. Entretanto, a etapa de fusão exige alocação de um vetor temporário de tamanho O(n).
- **Heapsort:** Transforma o vetor em um Max-Heap em tempo O(n) com o algoritmo heapify e, em seguida, extrai sucessivamente o elemento da raiz (o maior) trocando-o com o último elemento do vetor e reconstruindo o heap. Executa inteiramente **in-place** com memória adicional O(1), mas não é estável.`,
        keyTakeaways: [
          'Quicksort tem caso médio O(n log n), mas pior caso O(n²) se o particionamento for assimétrico.',
          'Mergesort garante O(n log n) no pior caso e é estável, mas consome O(n) de memória auxiliar.',
          'Heapsort garante O(n log n) no pior caso e é in-place O(1), mas não é estável.',
          'Insertion Sort atinge O(n) no melhor caso quando os dados já estão quase ordenados.'
        ],
        cesgranrioTraps: [
          'Afirmar que o Quicksort consome O(1) de memória: a pilha de chamadas recursivas consome O(log n) no caso médio e O(n) no pior caso.',
          'Confundir a estabilidade do Heapsort com a do Mergesort: o Heapsort realiza trocas arbitrárias no heap e NUNCA é considerado estável.',
          'Dizer que Mergesort é in-place: a rotina de intercalação tradicional exige vetor auxiliar de tamanho n.'
        ],
        practiceQuestions: [
          {
            questionNumber: 1,
            statement: 'Um sistema de monitoramento de fluxo de dutos da Transpetro precisa ordenar um vetor de 10.000.000 de leituras de pressão em memória. Devido a rígidas restrições de segurança de hardware, é estritamente proibido alocar vetores auxiliares em memória RAM (exigindo ordenação in-place) e o tempo de execução no pior caso absoluto não pode ultrapassar a complexidade assintótica O(n log n). O algoritmo de ordenação que atende a todos esses requisitos é:',
            options: [
              'A) Mergesort.',
              'B) Quicksort.',
              'C) Heapsort.',
              'D) Bubblesort.',
              'E) Counting Sort.'
            ],
            correctLetter: 'C',
            explanation: 'O Mergesort atende à garantia O(n log n) no pior caso, mas requer memória auxiliar O(n), violando a restrição in-place. O Quicksort é in-place, mas seu pior caso é O(n²), violando a garantia assintótica. O Heapsort atende perfeitamente a ambos os requisitos: possui complexidade estrita de O(n log n) em todos os casos (melhor, médio e pior) e ordena os elementos in-place, consumindo apenas O(1) de memória adicional.',
            cesgranrioTip: 'A Cesgranrio explora os limites de pior caso de tempo vs consumo de espaço adicional entre Quicksort, Mergesort e Heapsort.'
          },
          {
            questionNumber: 2,
            statement: 'Em relação ao algoritmo Quicksort, assinale a opção que descreve a circunstância que leva o algoritmo à sua pior complexidade temporal assintótica O(n²):',
            options: [
              'A) Quando o algoritmo escolhe sempre a mediana exata como elemento pivô.',
              'B) Quando o particionamento divide sucessivamente o array em duas metades com tamanhos equilibrados.',
              'C) Quando o elemento pivô selecionado é repetidamente o menor ou o maior elemento de cada partição restante.',
              'D) Quando o array de entrada contém exclusivamente chaves com valores distintos em ordem aleatória.',
              'E) Quando o algoritmo é implementado utilizando uma pilha explícita em vez de recursão de cauda.'
            ],
            correctLetter: 'C',
            explanation: 'O pior caso O(n²) do Quicksort ocorre quando a divisão é maximamente desbalanceada a cada chamada: uma partição fica com 0 elementos e a outra com n-1 elementos. Isso acontece quando o pivô escolhido é sucessivamente o elemento mínimo ou máximo do conjunto restante (como ocorre ao aplicar Quicksort com pivô no primeiro elemento sobre um vetor já ordenado).',
            cesgranrioTip: 'Pivô mínimo ou máximo repetido = pior caso O(n²) no Quicksort.'
          },
          {
            questionNumber: 3,
            statement: 'Deseja-se ordenar uma base de dados de transações financeiras de afretamento marítimo que já se encontra quase totalmente ordenada (com apenas alguns poucos registros fora de posição). O algoritmo que apresenta complexidade temporal linear O(n) nessa condição favorável e que preserva a estabilidade das transações é o:',
            options: [
              'A) Heapsort.',
              'B) Insertion Sort (Ordenação por Inserção).',
              'C) Quicksort clássico.',
              'D) Selection Sort (Ordenação por Seleção).',
              'E) Mergesort.'
            ],
            correctLetter: 'B',
            explanation: 'O Insertion Sort possui a notável propriedade de executar em tempo linear O(n) no melhor caso (quando o vetor já está ordenado ou quase ordenado), realizando apenas uma comparação por elemento e nenhum deslocamento. Além disso, o Insertion Sort é um algoritmo estável e in-place. O Selection Sort, por exemplo, é sempre O(n²) mesmo para vetores já ordenados.',
            cesgranrioTip: 'Vetor quase ordenado = Insertion Sort é imbatível com complexidade O(n).'
          },
          {
            questionNumber: 4,
            statement: 'Dois registros contêm o mesmo valor de chave de ordenação. Um algoritmo de ordenação é classificado como estável quando:',
            options: [
              'A) O tempo de execução do algoritmo independe da distribuição estatística da entrada.',
              'B) O algoritmo consome obrigatoriamente espaço de memória adicional O(1).',
              'C) A ordem relativa entre registros com chaves iguais é estritamente mantida no vetor ordenado.',
              'D) O algoritmo não utiliza chamadas recursivas na sua pilha de execução.',
              'E) O número de trocas realizadas é sempre menor ou igual ao número de comparações.'
            ],
            correctLetter: 'C',
            explanation: 'A definição formal de estabilidade em algoritmos de ordenação estabelece que registros com chaves equivalentes mantêm sua precedência original após o processamento. Mergesort e Insertion Sort são estáveis; Quicksort e Heapsort não são.',
            cesgranrioTip: 'Estabilidade = manutenção da ordem relativa original de chaves idênticas.'
          },
          {
            questionNumber: 5,
            statement: 'Em relação aos limites assintóticos de complexidade para algoritmos de ordenação baseados em comparações entre pares de elementos (como Quicksort, Mergesort e Heapsort), a teoria da computação demonstra que o limite inferior (piso assintótico) para o pior caso de qualquer algoritmo dessa categoria é:',
            options: [
              'A) Omega(n log n), provado matematicamente pela altura mínima da árvore de decisão binária com n! folhas.',
              'B) Omega(n), pois bastaria percorrer a lista uma única vez.',
              'C) Omega(1), utilizando memória compartilhada.',
              'D) Omega(n²), pois cada elemento deve ser comparado com todos os demais.',
              'E) Omega(log n), aplicando busca binária recursiva.'
            ],
            correctLetter: 'A',
            explanation: 'Qualquer algoritmo de ordenação por comparação pode ser modelado por uma árvore de decisão binária com n! folhas (todas as permutações possíveis de n elementos). A altura dessa árvore é no mínimo log2(n!), que pela aproximação de Stirling cresce como Theta(n log n). Portanto, é matematicamente impossível ordenar por comparações no pior caso em tempo inferior a Omega(n log n).',
            cesgranrioTip: 'Limite inferior de ordenação por comparação = Omega(n log n). Menor que isso só algoritmos não baseados em comparação (Counting/Radix Sort).'
          }
        ]
      },
      {
        id: 'cap-b2-algo-hash-arvores',
        chapterNumber: 2,
        title: 'Tabelas Hash, Heaps Binários e Árvores Balanceadas',
        subtitle: 'Estruturas de acesso direto, filas de prioridade e garantia logarítmica',
        readTimeEstimate: '45 min',
        summary: 'Estruturas de dados não lineares. Funcionamento interno de Tabelas Hash (funções hash, fator de carga e colisões). Heaps Binários e filas de prioridade. Árvores Binárias de Busca (BST) e balanceamento AVL com rotações.',
        contentMarkdown: `## 1. Tabelas Hash (Hash Tables) e Acesso em Tempo Constante

As Tabelas Hash mapeiam chaves arbitrárias para posições em uma tabela de tamanho m por meio de uma **função de espalhamento** (Função Hash): h(chave) -> [0, m - 1].

### O Fator de Carga (Load Factor):
- O fator de carga é definido por alpha = n / m, onde n é o número de elementos armazenados e m é o tamanho da tabela.
- Conforme alpha se aproxima de 1.0 (ou ultrapassa 0.75), a probabilidade de colisões aumenta exponencialmente, exigindo uma operação de **rehashing** (redimensionamento da tabela para o dobro do tamanho e redistribuição das chaves).

### Tratamento de Colisões:
Duas estratégias fundamentais resolvem o problema quando duas chaves produzem o mesmo índice (h(k_1) = h(k_2)):
1. **Encadeamento Separado (Chaining):** Cada posição da tabela aponta para uma lista encadeada (ou árvore rubro-negra).
   - *Caso Médio:* Busca, inserção e remoção em O(1 + alpha) -> O(1).
   - *Pior Caso:* Se todas as n chaves colidirem no mesmo bucket, a estrutura degenera para uma lista única com custo **O(n)**!
2. **Endereçamento Aberto (Open Addressing):** Todos os elementos residem diretamente na tabela.
   - *Sondagem Linear (Linear Probing):* Se o índice estiver ocupado, testa index + 1, index + 2... (sofre de agrupamento primário / primary clustering).
   - *Sondagem Quadrática:* Testa posições com passos quadráticos (+ 1², + 2²...).
   - *Hash Duplo (Double Hashing):* Usa uma segunda função hash para determinar o salto: h'(k).

---

## 2. Heaps Binários e Filas de Prioridade (Priority Queues)

Um **Heap Binário** é uma árvore binária completa (ou quase completa) que satisfaz a **Propriedade do Heap**:
- **Max-Heap:** Para todo nó i (exceto a raiz), o valor do nó pai é maior ou igual ao valor dos filhos: A[pai(i)] >= A[i]. A raiz armazena o valor máximo absoluto.
- **Min-Heap:** Para todo nó i, A[pai(i)] <= A[i]. A raiz armazena o valor mínimo absoluto.

### Representação Vetorial de Heaps:
Por ser uma árvore completa, um Heap dispensa ponteiros e é mapeado eficientemente em um array indexado em 0:
\`\`\`python
# Para um nó no índice i:
# Pai: (i - 1) // 2
# Filho Esquerdo: 2 * i + 1
# Filho Direito: 2 * i + 2
\`\`\`

### Complexidade das Operações de Heap:
- **Construção do Heap (Build-Heap / Heapify):** **O(n)** (ao contrário da intuição de O(n log n), a soma da série de alturas converge para O(n)).
- **Inserção de Elemento:** O(log n) (insere no fim do array e sobe com sift-up).
- **Extração do Máximo / Mínimo:** O(log n) (remove a raiz, coloca o último elemento na raiz e desce com sift-down).
- **Consulta ao Topo (peek):** O(1).

---

## 3. Árvores Binárias de Busca (BST) e Árvores AVL

Uma **Árvore Binária de Busca (BST)** satisfaz a propriedade: para qualquer nó x, todos os nós da subárvore esquerda têm chaves menores que x.key, e todos da subárvore direita têm chaves maiores.
- **Problema da BST Comum:** Se inserirmos dados em ordem crescente (1, 2, 3, 4, 5), a BST degenera para uma lista encadeada com altura h = n, degradando busca, inserção e remoção para **O(n)**.

### Árvores AVL: O Balanceamento Rigoroso
A Árvore AVL foi a primeira árvore de busca binária balanceada autoajustável.
- **Fator de Balanceamento (FB):** FB(nó) = Altura(Subárvore Esquerda) - Altura(Subárvore Direita).
- **Condição AVL:** Para todo nó, FB(nó) in {-1, 0, +1}.
- **Rotações:** Se após uma inserção ou remoção o |FB| > 1, aplica-se uma rotação:
  - *Rotação Simples à Direita (LL):* Quando o desbalanceamento ocorre na subárvore esquerda do filho esquerdo.
  - *Rotação Simples à Esquerda (RR):* Quando ocorre na subárvore direita do filho direito.
  - *Rotação Dupla (LR ou RL):* Quando o sinal do FB do nó e do seu filho são opostos.
- **Garantia AVL:** A altura da árvore é estritamente limitada a h < 1.44 * log_2(n), garantindo **O(log n)** no pior caso para busca, inserção e remoção!`,
        keyTakeaways: [
          'Tabelas Hash oferecem busca média O(1), mas pior caso O(n) se houver colisão maciça.',
          'Heaps binários são representados em arrays sem ponteiros: filhos em 2i+1 e 2i+2.',
          'Construir um Heap a partir de um vetor desordenado custa O(n).',
          'Árvores AVL mantêm o fator de balanceamento entre -1, 0 e +1 através de rotações simples e duplas.',
          'Em árvores AVL, as operações de busca, inserção e remoção garantem O(log n) no pior caso.'
        ],
        cesgranrioTraps: [
          'Acreditar que construir um heap binário (Build-Heap) custa O(n log n): o algoritmo de Floyd constrói em O(n).',
          'Afirmar que a busca em Tabela Hash é sempre O(1): no pior caso de colisões, a busca degenera para O(n).',
          'Dizer que uma Árvore Binária de Busca comum garante O(log n): sem balanceamento ela pode degenerar para O(n).'
        ],
        practiceQuestions: [
          {
            questionNumber: 1,
            statement: 'Em uma Tabela Hash que implementa tratamento de colisões por encadeamento separado (separate chaining), qual é a complexidade assintótica temporal de pior caso para buscar um elemento específico, caso a função de dispersão mapeie todas as n chaves para exatamente a mesma posição na tabela?',
            options: [
              'A) O(1)',
              'B) O(log n)',
              'C) O(n)',
              'D) O(n * log n)',
              'E) O(n²)'
            ],
            correctLetter: 'C',
            explanation: 'Se todas as chaves colidirem no mesmo índice da tabela, todos os elementos serão inseridos em uma única lista encadeada. Para buscar um elemento que se encontra no final da lista ou inexistente, será necessário percorrer todos os n elementos sequencialmente, degradando a busca para O(n).',
            cesgranrioTip: 'Tabela Hash: caso médio = O(1), pior caso = O(n).'
          },
          {
            questionNumber: 2,
            statement: 'Considere um vetor com n elementos arbitrários desordenados. O algoritmo clássico Build-Heap (algoritmo de Floyd para construção de heap) transforma esse vetor em um Max-Heap com complexidade de tempo de:',
            options: [
              'A) O(1)',
              'B) O(log n)',
              'C) O(n)',
              'D) O(n log n)',
              'E) O(n²)'
            ],
            correctLetter: 'C',
            explanation: 'A construção de um heap binário a partir de um vetor desordenado aplicando o procedimento sift-down (heapify) a partir do último nó pai até a raiz possui complexidade linear O(n). Embora inserir n elementos um a um custe O(n log n), o Build-Heap de baixo para cima explora o fato de que a maioria dos nós está nos níveis inferiores (com menor altura), resultando em soma que converge para O(n).',
            cesgranrioTip: 'Construir heap a partir de vetor (Build-Heap) = O(n). Inserções individuais = O(n log n).'
          },
          {
            questionNumber: 3,
            statement: 'Em uma Árvore AVL balanceada contendo 1.000.000 de registros, a altura da árvore h e a complexidade de tempo no pior caso para localizar uma chave específica são, respectivamente:',
            options: [
              'A) h = O(n) e tempo O(n).',
              'B) h = O(log n) e tempo O(log n).',
              'C) h = O(1) e tempo O(1).',
              'D) h = O(n log n) e tempo O(n).',
              'E) h = O(√n) e tempo O(√n).'
            ],
            correctLetter: 'B',
            explanation: 'Em uma árvore AVL, a propriedade de balanceamento (|FB| <= 1 para todo nó) garante que a altura máxima da árvore seja proporcional a 1.44 * log2(n). Como a busca percorre no máximo um ramo da raiz até a folha mais profunda, o número máximo de comparações é proporcional à altura, garantindo tempo O(log n) no pior caso.',
            cesgranrioTip: 'Árvore AVL = Altura O(log n) = Busca, Inserção e Remoção em O(log n).'
          },
          {
            questionNumber: 4,
            statement: 'Em um Heap Binário indexado a partir de 0 e armazenado em um vetor, os índices dos filhos esquerdo e direito e do nó pai de um nó posicionado no índice i são dados pelas expressões:',
            options: [
              'A) Filho esq: 2i; Filho dir: 2i + 1; Pai: i / 2.',
              'B) Filho esq: 2i + 1; Filho dir: 2i + 2; Pai: (i - 1) // 2.',
              'C) Filho esq: i + 1; Filho dir: i + 2; Pai: i - 1.',
              'D) Filho esq: i²; Filho dir: i² + 1; Pai: √i.',
              'E) Filho esq: 2i - 1; Filho dir: 2i; Pai: (i + 1) // 2.'
            ],
            correctLetter: 'B',
            explanation: 'Na convenção padrão de indexação baseada em zero (0-indexed) de linguagens como Python, C e Java: o filho esquerdo está em 2i + 1, o filho direito em 2i + 2 e o nó pai em (i - 1) // 2. Se a indexação fosse baseada em 1, os filhos estariam em 2i e 2i + 1.',
            cesgranrioTip: 'Índice 0: Filhos em 2i + 1 e 2i + 2. Pai em (i - 1) // 2.'
          },
          {
            questionNumber: 5,
            statement: 'Em uma Tabela Hash que utiliza encadeamento separado (separate chaining com listas encadeadas) para resolução de colisões, se a função de hash distribuir n chaves de forma perfeitamente uniforme entre m posições (slots), o fator de carga (load factor) alfa = n / m determina que o tempo médio esperado de uma busca com sucesso é de:',
            options: [
              'A) Theta(1 + alfa), sendo Theta(1) quando alfa for O(1).',
              'B) Theta(n²), devido à necessidade de ordenar os nós das listas.',
              'C) Theta(log m), pela busca binária nos buckets.',
              'D) Theta(m!), pela combinatória de slots.',
              'E) Theta(1 / n), decrescendo com o volume de dados.'
            ],
            correctLetter: 'A',
            explanation: 'Sob a hipótese de hashing uniforme simples, o tempo para computar o hash é O(1) e o comprimento médio de cada lista encadeada é alfa = n / m. Uma busca percorre em média 1 + alfa/2 elementos da lista correspondente, resultando em complexidade média Theta(1 + alfa). Mantendo alfa controlado (por redimensionamento dinâmico), a busca executa em tempo médio constante Theta(1).',
            cesgranrioTip: 'Tabela Hash com encadeamento: tempo médio de busca = Theta(1 + alfa), onde alfa = n / m é o fator de carga.'
          }
        ]
      }
    ],
    examChecklist: [
      'Saber a tabela de complexidade de Quicksort, Mergesort e Heapsort.',
      'Lembrar que o Mergesort é estável e consome O(n) de memória.',
      'Entender que Tabelas Hash têm complexidade média O(1) e pior caso O(n).',
      'Identificar o custo de Build-Heap como linear O(n).',
      'Reconhecer que Árvores AVL mantêm operações em O(log n) por meio de rotações.'
    ],
    practiceQuestions: [
      {
        questionNumber: 1,
        statement: 'Uma aplicação de telemetria precisa implementar uma fila de prioridade onde eventos de alarme com maior criticidade numérica devem ser processados primeiro. A estrutura de dados ideal que permite consultar o alarme mais prioritário em O(1) e extraí-lo em tempo logarítmico O(log n) é o:',
        options: [
          'A) Array circular simples.',
          'B) Lista duplamente encadeada não ordenada.',
          'C) Max-Heap binário.',
          'D) Tabela Hash com endereçamento aberto.',
          'E) Pilha (Stack LIFO).'
        ],
        correctLetter: 'C',
        explanation: 'Um Max-Heap binário mantém o maior elemento na raiz, permitindo consulta em O(1). A remoção desse elemento e reconstrução do heap (sift-down) executa em O(log n). É a base da implementação de filas de prioridade.',
        cesgranrioTip: 'Fila de prioridade = Heap binário (Min-Heap ou Max-Heap).'
      }
    ]
  },
  {
    id: 'livro-b2-pandas-engenharia',
    itemCode: 'B2-05',
    block: 'Bloco II',
    title: 'Manual de Engenharia & Manipulação de Dados com Python Pandas',
    subtitle: 'DataFrames, Indexação Avançada (.loc vs .iloc), Groupby, Merge e Séries Temporais',
    edition: 'Edição Especial Transpetro 2026',
    author: 'Equipe de Engenharia de Dados & Pipeline Analytics',
    pagesEquivalent: 230,
    readTimeEstimate: '3h 45min',
    badge: 'Prática de Programação',
    themeGradient: 'from-amber-600 via-yellow-600 to-emerald-700',
    borderAccent: 'border-amber-500/40',
    iconName: 'Table',
    overview: 'Dominando o Pandas para limpeza, agregação e transformação de telemetria industrial. Diferenças fundamentais entre Series e DataFrames, a armadilha do .loc (rótulos inclusivos) versus .iloc (posições inteiras semi-abertas), filtragem booleana composta com operadores bitwise (&, |, ~), agrupamentos com .groupby().agg(), junções com pd.merge() e pd.concat(), e processamento de séries temporais com .resample() e .rolling().',
    officialEditalTopics: [
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
    ],
    targetAudience: 'Desenvolvedores e analistas que manipularão os dados reais de oleodutos e navios.',
    chapters: [
      {
        id: 'cap-b2-pandas-loc',
        chapterNumber: 1,
        title: 'Indexação de Elite: A Distinção Vital entre .loc e .iloc',
        subtitle: 'Fatiamento por rótulo inclusivo versus índice numérico exclusivo e máscaras booleanas',
        readTimeEstimate: '45 min',
        summary: 'Detalhamento do comportamento de indexação no Pandas. Por que o .loc inclui o limite superior enquanto o .iloc o exclui. Sintaxe de filtragem booleana com parênteses obrigatórios e prevenção do SettingWithCopyWarning.',
        contentMarkdown: `## 1. .loc vs .iloc: A Regra de Ouro da Cesgranrio

O Pandas oferece dois indexadores primários com semânticas opostas que frequentemente geram pegadinhas de contagem de linhas em exames:

### 1. df.loc[linhas, colunas] (Baseado em Rótulos / Labels)
- Opera sobre os **nomes e rótulos** do índice (df.index) e das colunas (df.columns).
- **REGRA CAPITAL:** O fatiamento (slicing) com .loc é **INCLUSIVO EM AMBOS OS LIMITES** ([início, fim])!
- Se você executar df.loc[10:20] em um DataFrame cujo índice numérico vai de 0 a 100, ele retornará os índices 10, 11, 12, 13, 14, 15, 16, 17, 18, 19 e 20 (**11 linhas** no total!).

### 2. df.iloc[linhas, colunas] (Baseado em Posições Inteiras / Integer Position)
- Opera exclusivamente sobre a **posição ordinal numérica na memória** (de 0 a N - 1), exatamente como o fatiamento nativo do Python em listas e strings.
- **REGRA CAPITAL:** O fatiamento com .iloc é **EXCLUSIVO NO LIMITE SUPERIOR** ([início, fim))!
- Se você executar df.iloc[10:20], ele retornará as linhas nas posições 10, 11, 12, 13, 14, 15, 16, 17, 18 e 19 (**10 linhas** no total!).

\`\`\`python
# Exemplo Prático de Comparação:
import pandas as pd
df = pd.DataFrame({'pressao': range(100, 200)}, index=range(0, 100))

len(df.iloc[10:20])  # Retorna exatamente 10 linhas (índices 10 a 19)
len(df.loc[10:20])   # Retorna exatamente 11 linhas (índices 10 a 20 inclusive!)
\`\`\`

---

## 2. Filtragem Booleana Composta no Pandas

No Python nativo, avaliam-se condições usando as palavras reservadas and, or e not. No Pandas, **essas palavras-chave geram ValueError ou TypeError**, porque o Python tenta converter uma Series inteira de booleanos em um único valor verdade escalar!

### As Três Regras Obrigatórias de Filtros Booleanos:
1. **Operadores Bitwise:**
   - \`&\` para conjunção lógica (E).
   - \`|\` para disjunção lógica (OU).
   - \`~\` para negação lógica (NÃO).
2. **Parênteses Obrigatórios em Cada Condição:**
   Os operadores bitwise têm precedência matemática superior aos operadores relacionais (>, <, ==). Se os parênteses forem omitidos, o interpretador tentará avaliar primeiro 50 & df['vazao'], disparando erro.
3. **Sintaxe Correta:**
\`\`\`python
# CORRETO:
df_filtrado = df[(df['pressao'] > 50.0) & (df['temperatura'] <= 80.0)]

# ERRADO (gera erro de precedência):
df_filtrado = df[df['pressao'] > 50.0 & df['temperatura'] <= 80.0]

# ERRADO (gera ValueError):
df_filtrado = df[df['pressao'] > 50.0 and df['temperatura'] <= 80.0]
\`\`\`

---

## 3. O Perigo do SettingWithCopyWarning
Ao modificar dados em um DataFrame filtrado, como df[df['pressao'] > 50]['alerta'] = 1, o Pandas emite um SettingWithCopyWarning.
- **Causa:** O Pandas não pode garantir se a indexação encadeada retornou uma visão (view) da memória original ou uma cópia independente (copy).
- **Correção Elegante com .loc:**
\`\`\`python
# Maneira correta e segura de atribuir valores condicionalmente:
df.loc[df['pressao'] > 50, 'alerta'] = 1
\`\`\`

---

## 4. Acesso Escalar Ultrarrápido: .at e .iat
Quando se necessita acessar ou modificar um **único valor escalar** em um loop ou rotina de alto desempenho:
- df.at[rotulo_linha, rotulo_coluna] é até 10 vezes mais rápido que df.loc.
- df.iat[pos_linha, pos_coluna] é até 10 vezes mais rápido que df.iloc.`,
        keyTakeaways: [
          '.loc é inclusivo em ambos os limites [início, fim].',
          '.iloc é exclusivo no limite superior [início, fim).',
          'Filtros booleanos compostos exigem obrigatoriamente parênteses em cada comparação e operadores & ou |.',
          'Para evitar SettingWithCopyWarning, use df.loc[condição, coluna] = valor.'
        ],
        cesgranrioTraps: [
          'Questões que perguntam o número de linhas retornado por df.loc[0:10] em índice inteiro: são 11 linhas, e não 10!',
          'Utilizar "and" ou "or" em expressões de filtragem de DataFrames: causa erro de compilação em tempo de execução.',
          'Achar que .iloc aceita rótulos textuais de colunas: .iloc aceita estritamente inteiros ou fatiamentos numéricos.'
        ],
        practiceQuestions: [
          {
            questionNumber: 1,
            statement: 'Considere um DataFrame do Pandas denominado "telemetria" com 100 linhas indexadas numericamente de 0 a 99. Os comandos telemetria.iloc[10:20] e telemetria.loc[10:20] retornarão, respectivamente, quantas linhas?',
            options: [
              'A) 10 linhas e 11 linhas.',
              'B) 10 linhas e 10 linhas.',
              'C) 11 linhas e 10 linhas.',
              'D) 9 linhas e 10 linhas.',
              'E) 10 linhas e 9 linhas.'
            ],
            correctLetter: 'A',
            explanation: 'O método .iloc segue a convenção clássica de fatiamento do Python (limite superior exclusivo): 20 - 10 = 10 linhas (índices ordinais 10 a 19). Já o método .loc é baseado em rótulos e inclui AMBOS os extremos: inclui o rótulo 10 até o rótulo 20 inclusive, totalizando 20 - 10 + 1 = 11 linhas. Logo, a alternativa correta é 10 linhas e 11 linhas.',
            cesgranrioTip: 'Essa pegadinha clássica de contagem de linhas entre .loc e .iloc é um padrão histórico de provas de programação Python.'
          },
          {
            questionNumber: 2,
            statement: 'No Pandas, ao tentar filtrar um DataFrame "df" para selecionar registros onde a coluna "pressao" seja maior que 50 e a coluna "temperatura" seja menor que 80, um desenvolvedor escreveu: df[df["pressao"] > 50 and df["temperatura"] < 80]. Qual será o resultado da execução desse código?',
            options: [
              'A) O filtro será executado com sucesso e retornará o subconjunto correto de linhas.',
              'B) Será lançado um erro do tipo ValueError ou TypeError, pois a palavra-chave "and" avalia a verdade booleana de uma Series inteira.',
              'C) O comando retornará um DataFrame vazio silenciosamente.',
              'D) O Pandas converterá automaticamente o operador "and" em "or".',
              'E) O filtro retornará apenas a primeira linha que satisfizer a condição.'
            ],
            correctLetter: 'B',
            explanation: 'No Pandas, operadores lógicos Python nativos (and, or, not) tentam reduzir toda a Series booleana a um único booleano escalar, disparando ValueError ("The truth value of a Series is ambiguous"). É obrigatório utilizar os operadores bitwise (& para E, | para OU) e envolver cada condição entre parênteses devido à ordem de precedência: df[(df["pressao"] > 50) & (df["temperatura"] < 80)].',
            cesgranrioTip: 'Em filtros booleanos do Pandas: parênteses obrigatórios em cada condição + operador bitwise & ou |.'
          },
          {
            questionNumber: 3,
            statement: 'Para selecionar as primeiras 5 linhas e apenas as duas primeiras colunas de um DataFrame "df", utilizando exclusivamente posições numéricas inteiras ordinais, a sintaxe correta e idiomática do Pandas é:',
            options: [
              'A) df.loc[0:5, 0:2]',
              'B) df.iloc[0:5, 0:2]',
              'C) df.select(rows=5, cols=2)',
              'D) df.take[0:5, 0:2]',
              'E) df.slice(5, 2)'
            ],
            correctLetter: 'B',
            explanation: 'O método .iloc opera com indexação posicional de inteiros. O fatiamento 0:5 seleciona as posições 0, 1, 2, 3 e 4 (5 primeiras linhas) e 0:2 seleciona as posições de colunas 0 e 1 (2 primeiras colunas). O método .loc esperaria rótulos textuais de colunas e incluiria o índice 5.',
            cesgranrioTip: 'Posição inteira pura em linhas e colunas = .iloc[linhas, colunas].'
          },
          {
            questionNumber: 4,
            statement: 'Qual dos comandos a seguir atribui o valor "CRÍTICO" na coluna "status" para todas as linhas de um DataFrame onde "vibracao" > 9.5, sem disparar o aviso SettingWithCopyWarning?',
            options: [
              'A) df[df["vibracao"] > 9.5]["status"] = "CRÍTICO"',
              'B) df.loc[df["vibracao"] > 9.5, "status"] = "CRÍTICO"',
              'C) df.query("vibracao > 9.5")["status"] = "CRÍTICO"',
              'D) df["status"] = "CRÍTICO" if df["vibracao"] > 9.5 else None',
              'E) df.filter(lambda x: x["vibracao"] > 9.5)["status"] = "CRÍTICO"'
            ],
            correctLetter: 'B',
            explanation: 'A indexação encadeada (chained indexing) como em df[...]["status"] = ... gera o SettingWithCopyWarning porque o Pandas não pode garantir se modificou a visão original ou uma cópia descartável. O método seguro e recomendado pela documentação oficial é df.loc[filtro, "status"] = "CRÍTICO".',
            cesgranrioTip: 'Modificação condicional de coluna = sempre df.loc[condição, coluna] = valor.'
          },
          {
            questionNumber: 5,
            statement: 'Em um pipeline de engenharia de dados em Python, um analista precisa otimizar o uso de memória de um DataFrame do Pandas com 10 milhões de linhas. A coluna "tipo_oleo" possui apenas 4 valores de texto distintos repetidos ao longo de toda a tabela ("PESADO", "LEVE", "INTERMEDIARIO", "CONDENSADO"). A transformação mais eficaz para reduzir o consumo de memória dessa coluna em mais de 80% sem perder dados é:',
            options: [
              'A) Converter a coluna para o tipo categórico: df["tipo_oleo"] = df["tipo_oleo"].astype("category").',
              'B) Salvar o DataFrame como arquivo CSV com delimitador ponto e vírgula.',
              'C) Preencher valores nulos com zero via fillna(0).',
              'D) Aplicar str.upper() em todos os registros.',
              'E) Converter para datetime64 com fuso horário UTC.'
            ],
            correctLetter: 'A',
            explanation: 'Colunas de texto (object) no Pandas armazenam ponteiros Python para strings individuais. Ao converter para o tipo categórico ("category"), o Pandas mapeia os valores únicos para inteiros compactos de 8 bits (int8) associados a um dicionário interno de categorias, reduzindo drasticamente o consumo de memória RAM de gigabytes para megabytes.',
            cesgranrioTip: 'Colunas de texto com baixa cardinalidade no Pandas: converta para category (.astype("category")) para economia drástica de memória.'
          }
        ]
      },
      {
        id: 'cap-b2-pandas-groupby',
        chapterNumber: 2,
        title: 'Agrupamentos Avançados (.groupby) e Junções Relacionais (pd.merge)',
        subtitle: 'Agregações customizadas, transform versus agg, pd.merge, concat e séries temporais',
        readTimeEstimate: '50 min',
        summary: 'Padrão Split-Apply-Combine do groupby. Diferença fundamental entre .agg() (reduz a dimensão) e .transform() (mantém o mesmo número de linhas). Tipos de junções relacionais com pd.merge, concatenações e manipulação de séries temporais com resample e rolling.',
        contentMarkdown: `## 1. O Paradigma Split-Apply-Combine (.groupby)

O agrupamento no Pandas decompõe os dados em três etapas:
1. **Split (Divisão):** Os dados são divididos em grupos com base em uma ou mais chaves categóricas.
2. **Apply (Aplicação):** Uma função é aplicada de forma independente a cada grupo.
3. **Combine (Combinação):** Os resultados parciais são combinados em uma nova estrutura de dados.

### A Distinção Vital: .agg() vs .transform()
Esta é uma das distinções conceituais mais cobradas pela Cesgranrio:
- **.agg() (Agregação Redutora):**
  Aplica funções que condensam cada grupo em um **único valor escalar**. O resultado é um DataFrame com **uma única linha por grupo**.
  \`\`\`python
  df.groupby('terminal')['pressao'].agg(['mean', 'std', 'max'])
  \`\`\`
- **.transform() (Preservação Dimensional):**
  Aplica uma função agregadora ou transformadora, mas **transmite (propaga) o resultado de volta para cada linha individual do DataFrame original**. O resultado possui **o mesmo número exato de linhas e o mesmo índice** do DataFrame de entrada!
  \`\`\`python
  # Cria uma coluna com a média do respectivo terminal mantendo todas as linhas:
  df['media_terminal'] = df.groupby('terminal')['pressao'].transform('mean')
  # Permite calcular desvios relativos diretamente:
  df['desvio_da_media'] = df['pressao'] - df['media_terminal']
  \`\`\`

---

## 2. Junções Relacionais com pd.merge()

O pd.merge() implementa a álgebra relacional clássica de JOINs do SQL entre dois DataFrames (left e right):

| Tipo (how) | Comportamento Relacional | Linhas Sem Correspondência |
|---|---|---|
| **how='inner' (Padrão)** | Interseção das chaves em ambas as tabelas | São completamente descartadas |
| **how='left'** | Mantém todas as linhas da tabela esquerda | Recebem NaN nas colunas da direita |
| **how='right'** | Mantém todas as linhas da tabela direita | Recebem NaN nas colunas da esquerda |
| **how='outer'** | União completa de ambos os DataFrames | Preenchidas com NaN nas lacunas |
| **how='cross'** | Produto cartesiano (linhas_left * linhas_right) | Não utiliza chave de junção |

### Parâmetros Críticos:
- on='chave': Quando a coluna tem o mesmo nome em ambos os DataFrames.
- left_on='col_A', right_on='col_B': Quando as colunas de chave possuem nomes distintos.
- suffixes=('_duto', '_sensor'): Adiciona sufixos para resolver conflitos de colunas homônimas.
- indicator=True: Adiciona a coluna especial _merge indicando se o registro veio de left_only, right_only ou both.

---

## 3. Concatenação de Dados com pd.concat()
- **Ao longo das linhas (axis=0, padrão):** Empilha tabelas verticalmente (como o UNION ALL do SQL). Use ignore_index=True para redefinir o índice de 0 a N-1.
- **Ao longo das colunas (axis=1):** Justapõe tabelas horizontalmente lado a lado pelo índice.

---

## 4. Engenharia de Séries Temporais no Pandas
A telemetria de dutos e navios petroleiros opera estritamente sobre séries temporais:
1. **Conversão de Datas:** df['data'] = pd.to_datetime(df['data']).
2. **Definição de Índice Temporal:** df.set_index('data', inplace=True).
3. **Reamostragem (.resample()) - O groupby do tempo:**
   - df['vazao'].resample('1D').mean(): Calcula a média diária.
   - df['vazao'].resample('1h').max(): Calcula o pico horário.
4. **Janelas Móveis (.rolling()) - Médias e Volatilidades Móveis:**
   - df['media_movel_7d'] = df['pressao'].rolling(window=7).mean(): Suaviza ruídos calculando a média dos últimos 7 pontos.
5. **Criação de Variáveis com Lag (.shift()) para Machine Learning:**
   - df['pressao_anterior'] = df['pressao'].shift(1): Desloca o sinal em 1 período temporal para alimentar modelos preditivos autoregressivos.`,
        keyTakeaways: [
          '.agg() reduz para 1 linha por grupo; .transform() mantém exatamente o mesmo número de linhas do DataFrame original.',
          'pd.merge() usa how="inner" como padrão.',
          'pd.concat() com axis=0 empilha linhas; com axis=1 junta colunas.',
          'Séries temporais utilizam .resample() para agrupamento de frequência temporal e .rolling() para janelas móveis.'
        ],
        cesgranrioTraps: [
          'Confundir .transform() com .agg(): .transform() NUNCA reduz o número de linhas do DataFrame.',
          'Esquecer que o padrão de pd.merge() é inner join, descartando silenciosamente linhas órfãs.',
          'Tentar aplicar .resample() em DataFrame que não possui um DatetimeIndex definido.'
        ],
        practiceQuestions: [
          {
            questionNumber: 1,
            statement: 'Em um DataFrame do Pandas com 10.000 linhas de medições, deseja-se criar uma nova coluna que contenha a média de pressão do respectivo terminal de cada linha, mantendo rigorosamente as 10.000 linhas no DataFrame original. O método adequado a ser encadeado após groupby("terminal")["pressao"] é:',
            options: [
              'A) .agg("mean")',
              'B) .transform("mean")',
              'C) .reduce("mean")',
              'D) .apply(np.mean).drop_duplicates()',
              'E) .filter(lambda x: x.mean())'
            ],
            correctLetter: 'B',
            explanation: 'O método .transform() executa a função de agregação dentro de cada grupo e devolve um objeto com a mesma forma e índice do DataFrame original, transmitindo o resultado para cada uma das 10.000 linhas. O método .agg() reduziria o DataFrame para uma única linha por terminal.',
            cesgranrioTip: '.agg() reduz para 1 linha por grupo. .transform() devolve o mesmo número de linhas do DataFrame original.'
          },
          {
            questionNumber: 2,
            statement: 'Ao realizar a junção relacional entre dois DataFrames df_A (com 50 linhas) e df_B (com 30 linhas) através do comando pd.merge(df_A, df_B, on="id_duto"), sem especificar o parâmetro how, o tipo de junção executado e o limite máximo teórico de linhas resultantes são:',
            options: [
              'A) Outer join; no máximo 80 linhas.',
              'B) Inner join; no máximo 50 * 30 = 1.500 linhas (caso haja duplicatas da chave em ambos os lados).',
              'C) Left join; exatamente 50 linhas.',
              'D) Cross join; estritamente 0 linhas.',
              'E) Full join; exatamente 30 linhas.'
            ],
            correctLetter: 'B',
            explanation: 'Por padrão, o parâmetro how do pd.merge() é "inner". Um inner join retorna apenas as correspondências. Se houver duplicação da chave em ambos os lados, o resultado é o produto cartesiano das correspondências (no limite máximo, 50 * 30 = 1.500 linhas).',
            cesgranrioTip: 'Default do pd.merge() é how="inner".'
          },
          {
            questionNumber: 3,
            statement: 'Deseja-se calcular a média móvel de vazão de um oleoduto dos últimos 5 registros para suavizar ruídos de telemetria. O método apropriado do Pandas para criar essa janela deslizante de cálculo é:',
            options: [
              'A) df["vazao"].sliding(5).mean()',
              'B) df["vazao"].rolling(window=5).mean()',
              'C) df["vazao"].resample("5d").mean()',
              'D) df["vazao"].window(5).mean()',
              'E) df["vazao"].shift(5).mean()'
            ],
            correctLetter: 'B',
            explanation: 'O método .rolling(window=N) cria uma janela deslizante de tamanho N para aplicação de funções de agregação como mean(), std() ou sum(). O método .resample() é usado para agregar por períodos de tempo de calendário (ex: dias, horas), e .shift() desloca os dados para criar defasagens.',
            cesgranrioTip: 'Janela móvel / média móvel = .rolling(window=N).'
          },
          {
            questionNumber: 4,
            statement: 'Para criar uma variável defasada temporalmente (lag feature) em que cada linha contenha o valor da coluna "pressao" do registro imediatamente anterior (t - 1), utiliza-se o método:',
            options: [
              'A) df["pressao"].lag(1)',
              'B) df["pressao"].shift(1)',
              'C) df["pressao"].previous()',
              'D) df["pressao"].diff(1)',
              'E) df["pressao"].offset(-1)'
            ],
            correctLetter: 'B',
            explanation: 'O método .shift(1) desloca os índices ou valores em 1 período para frente, preenchendo a primeira posição com NaN. É a técnica padrão para criar variáveis defasadas em modelos de séries temporais. O método .diff(1) calcularia a diferença entre o valor atual e o anterior.',
            cesgranrioTip: 'Defasagem temporal (lag) no Pandas = .shift(1).'
          },
          {
            questionNumber: 5,
            statement: 'No Pandas, qual é a diferença operacional e de formato de retorno entre os métodos .apply() e .transform() aplicados sobre um objeto agrupado df.groupby("duto")["pressao"]?',
            options: [
              'A) O método .transform() exige que a função retorne uma série com o mesmo tamanho e índice do DataFrame original (permitindo adicionar o resultado diretamente como uma nova coluna), enquanto o .apply() aceita agregar dimensões reduzidas ou retornar formatos arbitrários.',
              'B) O método .transform() só aceita números inteiros, enquanto o .apply() só aceita strings.',
              'C) O método .transform() é exclusivo para séries temporais.',
              'D) O método .apply() é executado em paralelo na GPU, enquanto o .transform() é executado em disco rígido.',
              'E) Não há qualquer diferença funcional entre ambos.'
            ],
            correctLetter: 'A',
            explanation: 'O método .transform() alinha o resultado de volta ao índice original do DataFrame (mantendo exatamente a mesma quantidade de linhas), sendo perfeito para padronizações como centralização pela média do grupo: df["pressao"] - df.groupby("duto")["pressao"].transform("mean"). Já o .apply() é mais genérico e pode retornar formatos agregados de qualquer dimensão.',
            cesgranrioTip: '.transform() mantém o shape original do DataFrame (ideal para criar colunas normalizadas por grupo); .apply() é genérico e flexível.'
          }
        ]
      }
    ],
    examChecklist: [
      '.loc é inclusivo em ambos os lados; .iloc exclui o limite superior.',
      'Filtros múltiplos exigem parênteses e operadores bitwise & e |.',
      '.transform() preserva a quantidade de linhas original do DataFrame.',
      '.dropna(subset=["col"]) remove apenas quando a coluna especificada tem valor nulo.',
      'pd.merge() utiliza inner join por padrão.',
      '.rolling(window=N) calcula janelas móveis e .shift(1) gera lags temporais.'
    ],
    practiceQuestions: [
      {
        questionNumber: 1,
        statement: 'Deseja-se concatenar verticalmente dois DataFrames de telemetria df1 (500 linhas) e df2 (300 linhas) que possuem as mesmas colunas, garantindo que o índice do DataFrame final resultante seja uma sequência contínua de 0 a 799 sem índices duplicados. O comando correto é:',
        options: [
          'A) pd.concat([df1, df2], axis=1)',
          'B) pd.concat([df1, df2], ignore_index=True)',
          'C) pd.merge(df1, df2, how="all")',
          'D) df1.append(df2, reset_index=True)',
          'E) pd.join([df1, df2], axis=0)'
        ],
        correctLetter: 'B',
        explanation: 'O método pd.concat([df1, df2], axis=0) realiza o empilhamento vertical das linhas. Ao adicionar o parâmetro ignore_index=True, o Pandas descarta os índices originais e gera um novo RangeIndex de 0 a 799.',
        cesgranrioTip: 'Concatenação vertical com reinício de índice = pd.concat([...], ignore_index=True).'
      }
    ]
  },
  {
    id: 'livro-b2-bigdata-spark',
    itemCode: 'B2-06',
    block: 'Bloco II',
    title: 'Manual de Big Data, Ecossistema Hadoop, Apache Spark & Data Lakehouse',
    subtitle: 'HDFS, YARN, Spark RDDs, Shuffling, Otimizador Catalyst, Parquet e Delta Lake',
    edition: 'Edição Especial Transpetro 2026',
    author: 'Equipe de Arquitetura de Big Data & Engenharia Petrobras',
    pagesEquivalent: 240,
    readTimeEstimate: '3h 50min',
    badge: 'Arquitetura de Alta Escala',
    themeGradient: 'from-orange-600 via-amber-600 to-red-700',
    borderAccent: 'border-orange-500/40',
    iconName: 'Flame',
    overview: 'Arquiteturas distribuídas para processamento massivo de telemetria de dutos e frotas marinhas. Os 5 Vs de Big Data, tolerância a falhas no HDFS (NameNode vs DataNodes, fator de replicação), YARN, ecossistema Apache Spark (Driver, Executors, computação in-memory). Abstrações PySpark, avaliação preguiçosa (Lazy Evaluation), Transformações Narrow vs Wide (Shuffling), formatos colunares (Apache Parquet) e arquitetura Data Lakehouse com Delta Lake (transações ACID e Time Travel).',
    officialEditalTopics: [
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
    ],
    targetAudience: 'Engenheiros que projetarão pipelines de terabytes e petabytes de dados.',
    chapters: [
      {
        id: 'cap-b2-hadoop-hdfs',
        chapterNumber: 1,
        title: 'Ecossistema Hadoop: Arquitetura HDFS, YARN e Formatos de Arquivos',
        subtitle: 'Tolerância a falhas por replicação em blocos e formatos colunares Parquet',
        readTimeEstimate: '45 min',
        summary: 'Funcionamento do HDFS: papel do NameNode (metadados na RAM, fsimage e edits log) versus DataNodes (blocos em disco). Fator de replicação padrão (3x), orquestração YARN e comparativo técnico entre formatos orientados a linhas (CSV, Avro) e formatos colunares (Parquet, ORC).',
        contentMarkdown: `## 1. Arquitetura HDFS (Hadoop Distributed File System)

O HDFS foi projetado para operar sobre hardware convencional (commodity hardware), fundamentado na premissa da **Localidade dos Dados**: *"Mover o código da computação para o nó onde o dado reside é infinitamente mais barato do que transferir terabytes de dados através da rede"*.

### Os Componentes da Arquitetura HDFS:
1. **NameNode (Nó Mestre):**
   - Gerencia o namespace do sistema de arquivos e a árvore de diretórios.
   - Mantém os **metadados** (permissões, proprietários e o mapeamento de quais blocos residem em quais DataNodes) **exclusivamente na memória RAM** para resposta em microssegundos.
   - Persiste a integridade em disco através de dois arquivos:
     - **FsImage:** Snapshot consolidado do estado do sistema de arquivos em um ponto no tempo.
     - **Edits Log:** Log de transações com todas as alterações ocorridas desde a última FsImage.
   - O **Secondary NameNode** (ou Standby NameNode em clusters de Alta Disponibilidade) realiza o checkpointing, mesclando periodicamente o Edits Log com a FsImage para evitar crescimento indefinido do log.
2. **DataNodes (Nós Escravos / Workers):**
   - Armazenam os blocos de dados físicos nos seus discos rígidos locais.
   - Comunicam-se continuamente com o NameNode através de **Heartbeats** (a cada 3 segundos por padrão). Se um DataNode não enviar heartbeat em 10 minutos, o NameNode o declara morto e dispara a replicação dos seus blocos em outros nós.

### Estrutura de Blocos e Política de Rack (Rack Awareness):
- **Tamanho Padrão do Bloco:** **128 MB** no HDFS moderno (contra 4 KB de sistemas de arquivos convencionais). Blocos grandes minimizam o custo de busca no disco (disk seek time).
- **Fator de Replicação Padrão = 3:** Cada bloco é gravado 3 vezes:
  1. No DataNode local onde o cliente submeteu a escrita.
  2. Em um DataNode situado em um **rack diferente** (protege contra falha completa do switch de rede ou PDU do rack).
  3. Em outro DataNode situado no mesmo rack do segundo nó.

---

## 2. YARN (Yet Another Resource Negotiator)
O YARN dissociou a camada de gerenciamento de recursos da computação, permitindo que Spark, Flink e MapReduce compartilhem o mesmo cluster:
- **ResourceManager:** Árbitro central global que gerencia e aloca recursos de CPU e RAM no cluster.
- **NodeManager:** Agente por nó que monitora o uso de recursos dos **Contêineres YARN**.
- **ApplicationMaster:** Processo instanciado por aplicação/job que negocia contêineres com o ResourceManager e gerencia as tarefas operárias.

---

## 3. Comparativo de Formatos de Arquivos: Linha vs. Coluna

Na ingestão e armazenamento de Big Data, a escolha do formato define os custos de armazenamento e a velocidade das consultas analíticas:

| Característica | Formato em Linha (CSV, JSON, Avro) | Formato Colunar (Apache Parquet, ORC) |
|---|---|---|
| **Layout em Disco** | Registros completos gravados sequencialmente | Valores da mesma coluna gravados juntos em blocos |
| **Melhor Caso de Uso** | Gravação rápida de registros pontuais (OLTP, streaming) | Consultas analíticas agregadoras (OLAP, Data Lakes) |
| **Compressão** | Baixa a moderada (dados heterogêneos na linha) | **Altíssima** (dados do mesmo tipo comprimem muito mais) |
| **I/O em Consultas** | Lê todas as colunas do disco mesmo para SELECT col_A | **Lê apenas as colunas solicitadas** (Projection Pushdown) |
| **Predicate Pushdown** | Não suporta estatísticas de bloco | Pula blocos inteiros lendo min/max no metadata |

- **Apache Parquet:** Padrão ouro no ecossistema Spark e Delta Lake. Utiliza compressão Snappy, particionamento por diretórios e suporte nativo a esquemas fortemente tipados.`,
        keyTakeaways: [
          'NameNode gerencia metadados na memória RAM; DataNodes gravam blocos físicos no disco.',
          'Bloco padrão do HDFS é 128 MB e o fator de replicação padrão é 3.',
          'Formatos colunares (Parquet, ORC) reduzem o I/O em consultas OLAP através de Projection Pushdown e Predicate Pushdown.',
          'YARN gerencia recursos computacionais do cluster de forma desacoplada da execução.'
        ],
        cesgranrioTraps: [
          'Afirmar que o NameNode armazena os dados dos clientes: o NameNode armazena exclusivamente metadados.',
          'Dizer que um arquivo de 10 MB consome 128 MB no disco do DataNode: ele consome apenas seus 10 MB reais.',
          'Recomendar CSV para consultas analíticas em Data Lakes: Parquet é ordens de grandeza superior em velocidade e custo.'
        ],
        practiceQuestions: [
          {
            questionNumber: 1,
            statement: 'No sistema de arquivos distribuído HDFS (Hadoop Distributed File System), qual é a função primordial desempenhada pelo nó NameNode?',
            options: [
              'A) Executar tarefas de compilação em código nativo de transformações Spark.',
              'B) Armazenar os metadados do sistema de arquivos (árvore de diretórios, permissões e localização dos blocos nos DataNodes) inteiramente em memória RAM.',
              'C) Armazenar fisicamente todos os blocos de dados dos arquivos dos clientes em seus discos locais.',
              'D) Monitorar o consumo de energia elétrica das placas de vídeo dos nós workers.',
              'E) Substituir a necessidade de chaves primárias em bancos de dados relacionais.'
            ],
            correctLetter: 'B',
            explanation: 'O NameNode atua como o nó mestre do HDFS, mantendo a estrutura de diretórios, nomes de arquivos, permissões e o mapeamento de quais blocos estão alocados em cada DataNode. Para responder com baixa latência, todos os metadados são mantidos na memória RAM.',
            cesgranrioTip: 'NameNode = Apenas Metadados na RAM. DataNodes = Blocos de Dados reais no Disco.'
          },
          {
            questionNumber: 2,
            statement: 'Um arquivo de telemetria de 300 MB é gravado em um cluster HDFS configurado com tamanho de bloco padrão de 128 MB e fator de replicação igual a 3. Quantos blocos lógicos serão gerados e quantas réplicas físicas no total serão armazenadas nos DataNodes?',
            options: [
              'A) 3 blocos lógicos e 9 réplicas físicas no total.',
              'B) 2 blocos lógicos e 6 réplicas físicas no total.',
              'C) 300 blocos lógicos e 900 réplicas físicas no total.',
              'D) 1 bloco lógico e 3 réplicas físicas no total.',
              'E) 4 blocos lógicos e 12 réplicas físicas no total.'
            ],
            correctLetter: 'A',
            explanation: 'O arquivo de 300 MB será dividido em blocos de até 128 MB: Bloco 1 (128 MB), Bloco 2 (128 MB) e Bloco 3 (44 MB), totalizando 3 blocos lógicos. Com fator de replicação 3, cada bloco é copiado 3 vezes: 3 blocos * 3 réplicas = 9 réplicas físicas espalhadas pelos DataNodes.',
            cesgranrioTip: 'Cálculo de blocos HDFS: ceil(tamanho_arquivo / tamanho_bloco). Multiplique pelo fator de replicação para achar o total de réplicas.'
          },
          {
            questionNumber: 3,
            statement: 'Em um Data Lake corporativo, por que o formato Apache Parquet é amplamente preferido em relação ao formato CSV para armazenar grandes volumes de dados analíticos?',
            options: [
              'A) Porque o Parquet é baseado em texto puro legível diretamente em editores como Bloco de Notas.',
              'B) Porque o Parquet armazena dados de forma colunar, permitindo alta taxa de compressão e leitura seletiva apenas das colunas consultadas (Projection Pushdown).',
              'C) Porque o Parquet não suporta esquemas tipados, aceitando qualquer tipo de dado heterogêneo sem validação.',
              'D) Porque o Parquet elimina a necessidade de particionamento e de memória RAM nos nós de processamento.',
              'E) Porque o Parquet foi projetado exclusivamente para operações OLTP transacionais com locking de linha.'
            ],
            correctLetter: 'B',
            explanation: 'O formato Apache Parquet é colunar e binário. Em consultas analíticas que acessam poucas colunas de uma tabela larga (ex: SELECT AVG(pressao) FROM telemetria), o leitor do Parquet pula totalmente os dados das outras colunas no disco (Projection Pushdown). Além disso, dados do mesmo tipo agrupados colunarmente alcançam taxas de compressão muito superiores.',
            cesgranrioTip: 'Parquet = Formato Colunar + Alta Compressão + Projection Pushdown.'
          },
          {
            questionNumber: 4,
            statement: 'No YARN (Yet Another Resource Negotiator), qual entidade é responsável por monitorar o consumo de CPU e memória dos contêineres em cada máquina individual do cluster e reportar o status periodicamente ao ResourceManager?',
            options: [
              'A) ApplicationMaster.',
              'B) NameNode.',
              'C) NodeManager.',
              'D) DataNode.',
              'E) Spark Driver.'
            ],
            correctLetter: 'C',
            explanation: 'O NodeManager é o agente do YARN que roda em cada nó worker da infraestrutura, monitorando o uso de recursos dos contêineres que estão executando naquela máquina e reportando a disponibilidade ao ResourceManager.',
            cesgranrioTip: 'YARN: ResourceManager = Global. NodeManager = Por máquina. ApplicationMaster = Por aplicação.'
          },
          {
            questionNumber: 5,
            statement: 'No ecossistema de armazenamento distribuído para Big Data, a escolha do formato de arquivo Apache Parquet em vez de CSV ou JSON para armazenar tabelas de telemetria histórica no Data Lakehouse justifica-se prioritariamente porque o Parquet:',
            options: [
              'A) É um formato colunar (columnar storage) que implementa compressão eficiente (Snappy/Gzip) e permite saltar a leitura de colunas e blocos desnecessários (predicate pushdown e column pruning), reduzindo drasticamente o I/O de disco.',
              'B) Armazena dados exclusivamente em texto plano legível por editores simples de texto.',
              'C) Exige obrigatoriamente que todos os dados sejam chaves primárias inteiras.',
              'D) É proprietário e não suporta Apache Spark ou Apache Hive.',
              'E) Converte automaticamente consultas SQL em programas Java MapReduce legados.'
            ],
            correctLetter: 'A',
            explanation: 'O formato Apache Parquet armazena os dados organizados por colunas (e não por linhas como CSV/JSON). Isso permite ler apenas as colunas solicitadas na consulta SQL (Column Pruning) e pular blocos inteiros de arquivos avaliando estatísticas mínimas/máximas no cabeçalho do arquivo (Predicate Pushdown), economizando até 90% de tráfego de I/O em queries analíticas.',
            cesgranrioTip: 'Parquet: Formato colunar, alta compressão, Column Pruning e Predicate Pushdown para alta performance de leitura analítica.'
          }
        ]
      },
      {
        id: 'cap-b2-spark-engine',
        chapterNumber: 2,
        title: 'Apache Spark: Computação In-Memory, Lazy Evaluation e Shuffling',
        subtitle: 'Transformações Narrow vs Wide, Otimizador Catalyst, Broadcast Joins e Delta Lake',
        readTimeEstimate: '50 min',
        summary: 'Diferenças de arquitetura entre MapReduce (disco) e Spark (memória). O conceito de avaliação preguiçosa (Lazy Evaluation) com transformações e ações. Shuffling e custos de rede em Transformações Wide. Otimizador Catalyst e arquitetura Delta Lake com transações ACID.',
        contentMarkdown: `## 1. Por que o Apache Spark Superou o MapReduce?

O Hadoop MapReduce escreve todos os resultados intermediários no disco físico HDFS a cada etapa de Map e Reduce, gerando um gargalo monumental de I/O em algoritmos iterativos (como Machine Learning e Gradient Descent).
O Apache Spark introduziu a computação em **memória RAM compartilhada**, sendo até **100 vezes mais rápido** que o MapReduce!

### Arquitetura do Spark:
- **Driver Program:** Processo central que executa a função main(), cria a SparkSession, constrói o plano de execução e o Grafo Acíclico Dirigido (**DAG - Directed Acyclic Graph**).
- **Cluster Manager:** Aloca recursos (pode ser YARN, Kubernetes ou Spark Standalone).
- **Executors:** Processos operários nas máquinas worker que executam as tarefas (tasks) e armazenam partições em cache na memória.

---

## 2. Lazy Evaluation: Transformações vs. Ações

O Spark não processa os dados imediatamente quando você executa um comando:
1. **Transformações (Lazy / Preguiçosas):** Criam uma nova receita (novo RDD/DataFrame) a partir de um existente. Nada é computado até que uma ação seja chamada!
   - *Exemplos:* .map(), .filter(), .select(), .groupBy(), .join().
2. **Ações (Eager / Executáveis):** Disparam a compilação do DAG pelo Otimizador Catalyst e forçam a execução real de todas as transformações acumuladas, devolvendo um resultado ao Driver ou gravando no disco.
   - *Exemplos:* .count(), .collect(), .show(), .first(), .write.parquet().

---

## 3. Transformações Narrow vs. Wide (O Custo do Shuffle)

- **Narrow Transformations (Transformações Estreitas):**
  Cada partição do RDD/DataFrame filho depende de **apenas UMA** partição do RDD pai. O processamento ocorre localmente na memória do Executor sem transferência de dados pela rede!
  - *Exemplos:* filter(), map(), flatMap(), select().
- **Wide Transformations (Transformações Largas - O Shuffle):**
  Cada partição do DataFrame filho depende de dados distribuídos em **múltiplas partições** do pai. Os dados precisam ser reordenados, particionados e transmitidos através da rede para outros nós. Esse processo chama-se **Shuffle** e representa o maior gargalo de performance no Spark!
  - *Exemplos:* groupByKey(), reduceByKey(), distinct(), join(), repartition().

---

## 4. Otimizador Catalyst e Broadcast Hash Join
O Spark SQL conta com o **Catalyst Optimizer**, que compila expressões lógicas em código Java bytecode nativo (via Projeto Tungsten).
- **Broadcast Hash Join:** Quando fazemos o join de uma tabela massiva (ex: bilhões de leituras) com uma tabela dimensional pequena (ex: tabela de 100 terminais com menos de 10 MB), o Spark envia uma cópia da tabela pequena para a memória de cada Executor (broadcast(df_pequeno)).
- **Benefício:** Elimina completamente o Shuffle da tabela grande, acelerando a consulta em ordens de grandeza!

---

## 5. Arquitetura Data Lakehouse com Delta Lake
O modelo clássico de Data Lake sofria com falta de consistência transacional e corrupção por escritas concorrentes.
O **Delta Lake** (e Apache Iceberg) introduziu a camada Lakehouse com:
1. **Transações ACID:** Garantidas por um log de transações estruturado (Delta Log em JSON).
2. **Time Travel (Viagem no Tempo):** Capacidade de consultar versões anteriores dos dados: df = spark.read.format("delta").option("versionAsOf", 2).load("/path").
3. **Schema Enforcement e Schema Evolution:** Impede que dados com colunas mal formatadas corrompam as tabelas.`,
        keyTakeaways: [
          'Spark executa in-memory e usa Lazy Evaluation: transformações constroem o DAG e ações disparam a execução.',
          'Transformações Narrow operam sem transferência de rede; Transformações Wide exigem Shuffle pela rede.',
          'Broadcast Hash Join transmite tabelas pequenas para a memória dos nós para evitar Shuffle.',
          'Delta Lake adiciona transações ACID, Time Travel e governança de esquema sobre arquivos Parquet.'
        ],
        cesgranrioTraps: [
          'Achar que .filter() ou .map() executam imediatamente no Spark: são transformações lazy e só rodam quando uma ação é chamada.',
          'Confundir Narrow e Wide transformations: join e groupBy sempre geram Shuffle (Wide), enquanto map e filter são locais (Narrow).',
          'Executar .collect() em DataFrames gigantes: transfere todos os dados para a memória do Driver, provocando OutOfMemoryError.'
        ],
        practiceQuestions: [
          {
            questionNumber: 1,
            statement: 'No Apache Spark, qual é a principal distinção entre Transformações e Ações?',
            options: [
              'A) Transformações alteram arquivos no disco imediatamente, enquanto Ações modificam apenas a memória RAM.',
              'B) Transformações são avaliadas de forma preguiçosa (Lazy Evaluation) e constroem o grafo DAG; Ações disparam a computação real e retornam resultados ou gravam dados.',
              'C) Transformações só podem ser executadas em linguagem Scala, enquanto Ações operam exclusivamente em Python.',
              'D) Transformações requerem parada total do cluster Spark para alocação de contêineres YARN.',
              'E) Ações são executadas pelos Workers, enquanto Transformações rodam exclusivamente no nó NameNode.'
            ],
            correctLetter: 'B',
            explanation: 'No Spark, as transformações (como map, filter, select, join) são lazy: o Spark apenas registra a linhagem (lineage) no DAG. Somente quando uma ação (como count, collect, save, show) é invocada é que o otimizador Catalyst planeja e os executores realizam o processamento.',
            cesgranrioTip: 'Transformação = Lazy (constrói o DAG). Ação = Eager (dispara a execução real).'
          },
          {
            questionNumber: 2,
            statement: 'No processamento distribuído do Apache Spark, operações como groupByKey(), join() e distinct() são classificadas como Transformações Wide porque:',
            options: [
              'A) Operam sobre colunas do tipo string com grande número de caracteres.',
              'B) Exigem que os dados de múltiplas partições sejam redistribuídos e transmitidos através da rede entre os nós do cluster (operação de Shuffle).',
              'C) Podem ser executadas em uma única partição sem comunicação com outros executores.',
              'D) Gravam obrigatoriamente os dados em formato CSV antes de retornar o resultado.',
              'E) São executadas exclusivamente pela placa gráfica (GPU) dos servidores.'
            ],
            correctLetter: 'B',
            explanation: 'Transformações Wide (largas) dependem de dados de múltiplas partições para compor cada partição de saída. Isso força o Spark a redistribuir as chaves pela rede através do processo de Shuffle, que envolve escrita em disco local, transferência pela rede e ordenação no destino.',
            cesgranrioTip: 'Wide Transformation = Exige Shuffle pela rede (groupBy, join, distinct).'
          },
          {
            questionNumber: 3,
            statement: 'Em um pipeline Spark, deseja-se unir uma tabela de fatos com 500 milhões de linhas de telemetria com uma tabela de dimensões contendo apenas 50 registros de estações de bombeamento (ocupando 20 KB de memória). A técnica de otimização recomendada para acelerar essa junção eliminando a necessidade de Shuffle é o:',
            options: [
              'A) MapReduce Sort-Merge Join.',
              'B) Broadcast Hash Join (broadcast join da tabela pequena).',
              'C) Repartition da tabela de fatos em 1 única partição.',
              'D) Cross Join cartesiano completo sem índices.',
              'E) Caching da tabela de fatos no nó Driver.'
            ],
            correctLetter: 'B',
            explanation: 'Ao usar um Broadcast Hash Join (via broadcast(df_estacoes)), o Spark copia a tabela minúscula para a memória de cada executor. Assim, a junção com a partição local da tabela grande ocorre inteiramente em memória sem necessidade de mover os 500 milhões de registros pela rede.',
            cesgranrioTip: 'Tabela gigante + Tabela pequena = Broadcast Hash Join (elimina o Shuffle).'
          },
          {
            questionNumber: 4,
            statement: 'Em uma arquitetura moderna de Data Lakehouse, qual recurso fornecido por tecnologias como Delta Lake e Apache Iceberg permite consultar o estado exato de uma tabela em uma data ou versão anterior?',
            options: [
              'A) Projection Pushdown.',
              'B) Time Travel (Viagem no Tempo).',
              'C) Lazy Evaluation.',
              'D) Shuffle Partitioning.',
              'E) Dynamic Allocation.'
            ],
            correctLetter: 'B',
            explanation: 'O recurso de Time Travel do Delta Lake e Apache Iceberg permite consultar snapshots históricos da tabela através do log de transações ACID (usando opções como versionAsOf ou timestampAsOf), sendo ideal para auditoria, rollback de dados corrompidos e reprodutibilidade.',
            cesgranrioTip: 'Delta Lake: Transações ACID + Time Travel + Schema Enforcement.'
          },
          {
            questionNumber: 5,
            statement: 'No Apache Spark, qual é a distinção crucial entre Transformações Estreitas (Narrow Transformations) e Transformações Amplas (Wide Transformations) em termos de movimentação de dados na rede (shuffling)?',
            options: [
              'A) Narrow transformations (como .map() e .filter()) computam cada partição de saída a partir de uma única partição de entrada sem necessidade de comunicação na rede, enquanto Wide transformations (como .groupByKey(), .join() e .distinct()) exigem redistribuição de dados entre os nós executores através da rede (Shuffle).',
              'B) Narrow transformations são lentas e Wide transformations são instantâneas.',
              'C) Narrow transformations exigem salvamento obrigatório em disco SSD.',
              'D) Wide transformations nunca criam estágios (Stages) novos no plano de execução DAG.',
              'E) Narrow transformations são executadas unicamente no nó Driver.'
            ],
            correctLetter: 'A',
            explanation: 'As transformações estreitas (Narrow) operam de forma independente dentro de cada partição na mesma máquina, sem troca de dados pela rede (Shuffle). As transformações amplas (Wide) exigem reparticionar e agrupar registros distribuídos por todo o cluster, disparando o Shuffle (operação custosa que divide a DAG em múltiplos estágios).',
            cesgranrioTip: 'Narrow = sem shuffle (map, filter). Wide = com shuffle na rede (groupBy, join, reduceByKey).'
          }
        ]
      }
    ],
    examChecklist: [
      'NameNode guarda metadados na memória RAM; DataNodes guardam blocos no disco.',
      'Bloco padrão HDFS é 128 MB com replicação 3x.',
      'Parquet é formato colunar com alta compressão e Projection Pushdown.',
      'Spark opera in-memory com Lazy Evaluation (transformações constroem o DAG; ações executam).',
      'Wide transformations exigem Shuffle pela rede; Narrow transformations são locais.',
      'Broadcast Hash Join copia tabela pequena aos executores eliminando Shuffle.',
      'Delta Lake adiciona transações ACID e Time Travel sobre Parquet.'
    ],
    practiceQuestions: [
      {
        questionNumber: 1,
        statement: 'Qual dos seguintes comandos em PySpark representa uma Ação (Action) que força a execução física imediata do plano de processamento acumulado no DAG?',
        options: [
          'A) df.filter(df["pressao"] > 50)',
          'B) df.select("terminal", "vazao")',
          'C) df.withColumn("nova_coluna", df["vazao"] * 2)',
          'D) df.count()',
          'E) df.dropDuplicates(["id_duto"])'
        ],
        correctLetter: 'D',
        explanation: 'O método .count() é uma Ação (Action) do Spark que exige que todos os dados sejam processados para contar o número de registros, retornando um inteiro ao Driver. Os métodos filter, select, withColumn e dropDuplicates são transformações que apenas atualizam o plano de execução de forma preguiçosa.',
        cesgranrioTip: '.count(), .collect(), .show(), .take(), .save() = Ações. .filter(), .select(), .withColumn() = Transformações.'
      }
    ]
  },
  {
    id: 'livro-b2-devops-mlops',
    itemCode: 'B2-07',
    block: 'Bloco II',
    title: 'Manual de Containers (Docker), DevOps & Práticas Modernas de MLOps',
    subtitle: 'Kernel Linux (cgroups e namespaces), Dockerfiles, MLflow, Drift e CI/CD/CT',
    edition: 'Edição Especial Transpetro 2026',
    author: 'Equipe de Infraestrutura Cloud & MLOps Petrobras',
    pagesEquivalent: 225,
    readTimeEstimate: '3h 35min',
    badge: 'Produção & Engenharia',
    themeGradient: 'from-cyan-700 via-teal-600 to-emerald-800',
    borderAccent: 'border-cyan-500/40',
    iconName: 'Boxes',
    overview: 'Operacionalização de modelos de inteligência artificial em escala industrial. Arquitetura de containers Docker no kernel Linux (namespaces, cgroups, UnionFS/Overlay2), elaboração de Dockerfiles seguros e enxutos com multistage build. O ciclo completo de MLOps: rastreamento de experimentos com MLflow (Tracking, Model Registry), detecção de degradação preditiva (Data Drift vs Concept Drift com testes KS e PSI) e arquitetura de Continuous Training (CT).',
    officialEditalTopics: [
      'Conceito de virtualização em nível de SO (Containers) vs Virtualização completa (Hypervisor)',
      'Pilares do Kernel Linux no Docker: Namespaces (isolamento) e Control Groups - cgroups (recursos)',
      'Camadas de imagens Docker e sistema de arquivos UnionFS / Overlay2',
      'Instruções fundamentais de Dockerfile: FROM, RUN, COPY, ADD, WORKDIR, EXPOSE, ENV, CMD e ENTRYPOINT',
      'Boas práticas de Docker: Multistage builds, usuários não-root e redução de superfície de ataque',
      'Conceitos fundamentais de MLOps: automação, reprodutibilidade e governança de modelos',
      'Rastreamento de experimentos com MLflow: Parâmetros, Métricas, Tags e Artefatos',
      'Model Registry: estágios de modelos (Staging, Production, Archived)',
      'Degradação de modelos em produção: Data Drift (distribuição das features) vs Concept Drift (relação X e Y)',
      'Métricas estatísticas de Drift: Teste Kolmogorov-Smirnov (KS) e Population Stability Index (PSI)',
      'Pipelines de Retreinamento Contínuo (Continuous Training - CT) e monitoramento'
    ],
    targetAudience: 'Engenheiros que levarão algoritmos de Machine Learning do Jupyter para produção.',
    chapters: [
      {
        id: 'cap-b2-docker-kernel',
        chapterNumber: 1,
        title: 'Containers Docker: Arquitetura do Kernel Linux e Instruções de Dockerfile',
        subtitle: 'Namespaces, cgroups, camadas Overlay2 e a diferença entre CMD e ENTRYPOINT',
        readTimeEstimate: '45 min',
        summary: 'Fundamentos de containers no Linux. Como o Docker utiliza namespaces para isolamento de processos e cgroups para limitação de hardware. Camadas de imagem imutáveis e elaboração de Dockerfiles profissionais com multistage build.',
        contentMarkdown: `## 1. Containers vs. Máquinas Virtuais (VMs)

A distinção arquitetural entre VMs e Containers é tema consagrado em concursos de TI:
- **Máquinas Virtuais (Hypervisors Tipo 1 e 2):**
  Cada VM roda uma cópia completa de um Sistema Operacional convidado (Guest OS), incluindo kernel próprio, drivers e bibliotecas. O Hypervisor gerencia o hardware virtualizado.
  - *Desvantagem:* Consumo massivo de RAM e boot lento (minutos).
- **Containers Docker (Virtualização no Nível do Sistema Operacional):**
  Todos os containers compartilham o **mesmo Kernel do Host Linux**! Os containers são apenas processos Linux isolados com seu próprio espaço de usuário.
  - *Vantagem:* Inicialização instantânea (milissegundos) e sobrecarga mínima de CPU e memória.

---

## 2. Os Dois Pilares do Kernel Linux nos Containers
O Docker não é uma tecnologia mágica de baixo nível; ele é um orquestrador elegante de duas primitivas do kernel Linux:
1. **Namespaces (Isolamento de Visibilidade):**
   Garantem que um container veja apenas os seus próprios recursos, achando que é uma máquina dedicada:
   - pid namespace: Isolamento da árvore de processos (o processo principal no container é o PID 1).
   - net namespace: Interfaces de rede próprias, portas e tabelas de roteamento IP isoladas.
   - mnt namespace: Pontos de montagem de sistemas de arquivos isolados.
   - ipc namespace: Comunicação interprocessos (memória compartilhada).
   - uts namespace: Hostname isolado.
2. **Control Groups (cgroups - Limitação de Recursos):**
   Garantem que um container não monopolize os recursos da máquina hospedeira. Limitam e monitoram:
   - Uso de CPU (número de núcleos ou cotas de tempo).
   - Memória RAM máxima (evita Out-Of-Memory generalizado no host).
   - I/O de disco e largura de banda de rede.

---

## 3. Camadas de Imagem e UnionFS (Overlay2)
Uma imagem Docker é composta por uma pilha de **camadas somente-leitura (read-only layers)** geradas por cada instrução do Dockerfile.
Quando um container é iniciado, o Docker adiciona uma camada fina gravável no topo (**Container Layer / Read-Write Layer**).
- **Copy-on-Write (CoW):** Se o container precisa alterar um arquivo existente em uma camada inferior, ele faz uma cópia para a camada superior gravável antes de modificá-lo.

---

## 4. Instruções Fundamentais do Dockerfile
- **FROM <imagem>:** Define a imagem base.
- **RUN <comando>:** Executa comandos durante a **construção** da imagem (ex: apt-get install), criando uma nova camada read-only.
- **COPY vs ADD:** Prefira COPY para transferir arquivos locais para a imagem. ADD deve ser evitado (a menos que precise descompactar tarballs ou baixar URLs).
- **WORKDIR:** Define o diretório de trabalho corrente para instruções subsequentes.
- **CMD vs ENTRYPOINT (Pegadinha Clássica):**
  - **ENTRYPOINT:** Define o comando executável principal que o container **sempre executará** (ex: ENTRYPOINT ["python", "app.py"]).
  - **CMD:** Define os argumentos padrão fornecidos ao ENTRYPOINT. Podem ser facilmente sobrescritos na linha de comando (docker run imagem arg1).
- **Multistage Builds:**
  Utiliza múltiplas instruções FROM para compilar artefatos em uma imagem intermediária pesada e copiar apenas os binários compilados finais para uma imagem base mínima (ex: python:3.11-slim ou alpine), reduzindo a imagem de 1.5 GB para 80 MB e eliminando compiladores e vulnerabilidades de segurança.`,
        keyTakeaways: [
          'Containers compartilham o mesmo Kernel do host Linux; VMs exigem Guest OS completo.',
          'Namespaces garantem isolamento (o que o processo vê); cgroups garantem limitação de recursos (o que o processo gasta).',
          'Camadas de imagem Docker são somente-leitura e reutilizáveis via cache.',
          'ENTRYPOINT define o executável fixo; CMD define argumentos padrão sobrescrevíveis.',
          'Multistage builds reduzem radicalmente o tamanho da imagem final de produção.'
        ],
        cesgranrioTraps: [
          'Afirmar que cada container Docker possui seu próprio kernel do sistema operacional: containers compartilham o kernel do host.',
          'Confundir as funções de namespaces e cgroups: namespaces isolam a visão; cgroups limitam e medem o consumo de hardware.',
          'Achar que CMD e ENTRYPOINT são idênticos: se ambos forem usados, CMD atua como lista de argumentos padrão para o ENTRYPOINT.'
        ],
        practiceQuestions: [
          {
            questionNumber: 1,
            statement: 'No sistema operacional Linux, quais são as duas funcionalidades fundamentais do kernel que o Docker utiliza, respectivamente, para isolar a visibilidade de processos e recursos de rede e para limitar o consumo máximo de memória e CPU dos containers?',
            options: [
              'A) Hypervisors e BIOS virtualizada.',
              'B) Namespaces e Control Groups (cgroups).',
              'C) IPTables e Swappiness.',
              'D) Systemd e Cron jobs.',
              'E) Chroot e Seccomp.'
            ],
            correctLetter: 'B',
            explanation: 'O Docker se baseia em Namespaces para prover o isolamento de visão (processos, rede, pontos de montagem, IPC) e em Control Groups (cgroups) para restringir, monitorar e priorizar o uso de recursos de hardware como CPU, memória RAM e I/O de disco.',
            cesgranrioTip: 'Namespaces = Isolamento de visibilidade. cgroups = Limitação e medição de recursos de hardware.'
          },
          {
            questionNumber: 2,
            statement: 'Em relação às instruções de um Dockerfile, qual é a diferença crucial entre as diretivas ENTRYPOINT e CMD?',
            options: [
              'A) ENTRYPOINT só funciona em containers Windows, enquanto CMD opera exclusivamente em Linux.',
              'B) CMD define o comando fixo imutável do container, enquanto ENTRYPOINT define variáveis de ambiente.',
              'C) ENTRYPOINT define o executável principal padrão da aplicação no container, enquanto CMD define argumentos padrão que podem ser facilmente sobrescritos na execução via docker run.',
              'D) CMD é executado durante o build da imagem, enquanto ENTRYPOINT roda apenas na parada do container.',
              'E) Ambas são rigorosamente equivalentes e não possuem diferença semântica no Docker engine.'
            ],
            correctLetter: 'C',
            explanation: 'O ENTRYPOINT especifica o binário/executável principal que será chamado quando o container iniciar. O CMD fornece os parâmetros ou argumentos padrão para esse ENTRYPOINT. Se o usuário passar argumentos adicionais ao executar "docker run imagem arg1 arg2", o CMD é sobrescrito, mas o ENTRYPOINT é mantido.',
            cesgranrioTip: 'ENTRYPOINT = O executável principal. CMD = Argumentos padrão sobrescrevíveis.'
          },
          {
            questionNumber: 3,
            statement: 'Um engenheiro de MLOps precisa empacotar uma API de inferência de Machine Learning desenvolvida em Python. Para garantir máxima segurança e obter a menor imagem final possível em produção, a melhor prática arquitetural recomendada no Dockerfile é:',
            options: [
              'A) Utilizar a imagem base "ubuntu:latest" com todos os pacotes de compilação C++ instalados.',
              'B) Empregar Multistage Build (construção em múltiplos estágios) com uma imagem final enxuta (como python-slim ou distroless) e executar a aplicação com usuário não-root.',
              'C) Instalar todas as bibliotecas no container em tempo de execução através do comando CMD ["pip", "install", "-r", "requirements.txt"].',
              'D) Desabilitar os cgroups no host para que o container possa usar memória ilimitada.',
              'E) Copiar todos os dados de treino de 50 GB para dentro da imagem Docker.'
            ],
            correctLetter: 'B',
            explanation: 'O Multistage Build permite usar um estágio de compilação com compiladores para instalar dependências e depois copiar apenas os artefatos finais para uma imagem base mínima e limpa (como python-slim ou alpine). Combinado com um usuário sem privilégios de root, minimiza drasticamente a superfície de ataque e o tamanho da imagem.',
            cesgranrioTip: 'Boas práticas Docker: Multistage build + imagem base mínima + usuário não-root.'
          },
          {
            questionNumber: 4,
            statement: 'Qual instrução em um Dockerfile deve ser preferida para copiar arquivos de código-fonte locais para dentro do container, de acordo com as boas práticas oficiais do Docker, quando não há necessidade de descompactação de arquivos tar ou download via URLs?',
            options: [
              'A) ADD',
              'B) RUN cp',
              'C) COPY',
              'D) MOUNT',
              'E) PUSH'
            ],
            correctLetter: 'C',
            explanation: 'A diretiva COPY é mais transparente e segura para copiar arquivos e diretórios locais para a imagem. A diretiva ADD possui recursos automáticos extras (como descompactar tarballs ou buscar URLs) que podem introduzir vulnerabilidades e comportamento inesperado.',
            cesgranrioTip: 'Para cópia simples de arquivos locais no Dockerfile: use COPY, evite ADD.'
          },
          {
            questionNumber: 5,
            statement: 'Em ambientes de produção com contêineres Docker, o isolamento dos processos do contêiner perante os demais processos do sistema operacional host do Linux é garantido pelo kernel do Linux prioritariamente através da combinação de:',
            options: [
              'A) Namespaces (para isolamento de visibilidade de processos, rede e pontos de montagem) e Cgroups / Control Groups (para limitação e medição de recursos de hardware como CPU e memória RAM).',
              'B) Compilação de código binário exclusivo para a BIOS.',
              'C) Emulação completa de hardware por hipervisor Tipo 1 (bare-metal).',
              'D) Substituição do kernel Linux pelo microkernel Mach.',
              'E) Desativação de permissões de leitura no diretório /tmp.'
            ],
            correctLetter: 'A',
            explanation: 'Os contêineres não usam hipervisor; compartilham o mesmo kernel do sistema host. O isolamento de processos (PID), redes (NET), usuários (USER) e sistemas de arquivos (MNT) é fornecido pelos Namespaces do Linux. O controle de cotas de recursos de hardware (limites de CPU, RAM e I/O de disco) é exercido pelos Control Groups (Cgroups).',
            cesgranrioTip: 'Docker no Linux: Namespaces = Isolamento de visibilidade (PID, NET, MNT). Cgroups = Controle de cotas de recursos (CPU, RAM).'
          }
        ]
      },
      {
        id: 'cap-b2-mlops-lifecycle',
        chapterNumber: 2,
        title: 'Ciclo de MLOps: Rastreamento com MLflow e Detecção de Drift em Produção',
        subtitle: 'Tracking, Model Registry, Data Drift vs Concept Drift e Teste KS',
        readTimeEstimate: '50 min',
        summary: 'A transição de modelos experimentais para produção. O ecossistema MLflow (Tracking de métricas/parâmetros e Model Registry com estágios). Degradação preditiva em produção: Data Drift versus Concept Drift, métricas de detecção (Teste KS, PSI) e retreinamento contínuo (CT).',
        contentMarkdown: `## 1. O que é MLOps?

**MLOps (Machine Learning Operations)** é a interseção entre Ciência de Dados, Engenharia de Software e Práticas DevOps. Seu objetivo é unificar o desenvolvimento de modelos (ML) e a operação contínua em produção (Ops), garantindo automação, reprodutibilidade, governança e monitoramento contínuo.

### Os Três Pilares da Automação em MLOps:
1. **CI (Continuous Integration):** Testes automatizados de código, validação de pipelines de dados e testes unitários de funções de engenharia de atributos.
2. **CD (Continuous Delivery):** Entrega e deploy automatizado de serviços de inferência e modelos de predição.
3. **CT (Continuous Training):** Exclusivo de MLOps: retreinamento automático de modelos quando novos dados chegam ou quando a performance em produção se degrada.

---

## 2. MLflow: A Plataforma de Governança de Modelos

O MLflow é a biblioteca de código aberto padrão de mercado para gerenciar o ciclo de vida de Machine Learning:
- **MLflow Tracking:**
  Registra parâmetros (ex: learning_rate, max_depth), métricas em cada época (ex: loss, PR-AUC), tags de auditoria e artefatos (modelos serializados .pkl, gráficos de curva ROC, esquemas).
  \`\`\`python
  import mlflow

  with mlflow.start_run():
      mlflow.log_param("max_depth", 6)
      mlflow.log_metric("roc_auc", 0.942)
      mlflow.sklearn.log_model(model, "pipeline_modelo")
  \`\`\`
- **MLflow Model Registry (Registro Central de Modelos):**
  Repositório centralizado para gerenciar versões e estágios do ciclo de vida:
  - **Staging:** Modelo sob testes de carga e validação estatística.
  - **Production:** Modelo aprovado servindo previsões em tempo real.
  - **Archived:** Modelos desativados com histórico preservado para governança.

---

## 3. Degradação Silenciosa: Data Drift vs. Concept Drift

Ao contrário de softwares tradicionais (que falham com erros de código 500 ou quebras de sintaxe), sistemas de Machine Learning sofrem de **degradação silenciosa**: o serviço continua respondendo com código 200 HTTP, mas as previsões tornam-se completamente errôneas devido a mudanças no mundo real!

### 1. Data Drift (Covariate Shift - Mudança nos Dados de Entrada):
- Ocorre quando a **distribuição de probabilidade das variáveis de entrada muda**: P_treino(X) != P_producao(X), mas a relação entre X e a variável alvo Y permanece a mesma: P(Y | X) não muda.
- *Exemplo na Transpetro:* Durante uma tempestade severa, os sensores acústicos de pressão dos dutos passam a registrar valores médios de ruído mais elevados do que o visto no dataset de treino.

### 2. Concept Drift (Mudança no Conceito / Relação):
- Ocorre quando a **relação estatística entre as features e o alvo se altera**: P_treino(Y | X) != P_producao(Y | X). Mesmo que as entradas pareçam normais, o mesmo valor de X agora resulta em um comportamento diferente de Y.
- *Exemplo:* Uma mudança nas regulamentações ambientais da ANP altera os limites legais de emissão de gases; o mesmo nível de emissão que antes era "conforme" agora é classificado como "não-conforme".

---

## 4. Métricas Estatísticas de Detecção de Drift
1. **Teste Kolmogorov-Smirnov (Teste KS):**
   - Teste não paramétrico que compara as funções de distribuição acumulada (CDF) da feature no treino versus na produção.
   - Um p-valor abaixo do limiar (ex: p < 0.05) rejeita a hipótese nula de que os dados vêm da mesma distribuição, disparando alarme de Data Drift.
2. **PSI (Population Stability Index):**
   - Métrica quantitativa de estabilidade populacional amplamente utilizada em modelagem de risco:
     - PSI < 0.1: Estabilidade populacional mantida (sem drift).
     - 0.1 <= PSI <= 0.2: Mudança moderada; requer atenção e monitoramento.
     - **PSI > 0.2:** Mudança significativa na população; **exige retreinamento imediato do modelo**!`,
        keyTakeaways: [
          'MLOps une Ciência de Dados, DevOps e Continuous Training (CT).',
          'MLflow Tracking registra parâmetros, métricas e artefatos; Model Registry gerencia versões e estágios.',
          'Data Drift é a alteração em P(X); Concept Drift é a alteração na relação funcional P(Y | X).',
          'Teste KS avalia diferenças na distribuição acumulada e PSI > 0.2 indica necessidade de retreinamento.'
        ],
        cesgranrioTraps: [
          'Confundir Data Drift com Concept Drift: Data Drift é mudança na entrada X; Concept Drift é mudança na relação entre X e o alvo Y.',
          'Achar que CI/CD cobre todo o ciclo de ML: MLOps exige Continuous Training (CT) para lidar com degradação de modelos.',
          'Considerar PSI < 0.1 como indicador de drift severo: PSI < 0.1 indica estabilidade; PSI > 0.2 exige retreinamento.'
        ],
        practiceQuestions: [
          {
            questionNumber: 1,
            statement: 'Em um sistema de telemetria preditiva em produção na Transpetro, os sensores submarinos sofreram alterações de calibração que modificaram a distribuição estatística das variáveis de entrada P(X), embora a relação subjacente entre as variáveis e a ocorrência de vazamento P(Y | X) tenha se mantido inalterada. Esse fenômeno é tecnicamente denominado:',
            options: [
              'A) Concept Drift.',
              'B) Data Drift (ou Covariate Shift).',
              'C) Catastrophic Forgetting.',
              'D) Overfitting por vazamento de dados.',
              'E) Desbalanceamento de rótulos.'
            ],
            correctLetter: 'B',
            explanation: 'Quando a distribuição de probabilidade das features de entrada X se altera entre o ambiente de treino e a produção (P_treino(X) != P_producao(X)), mas a função que mapeia X em Y permanece idêntica (P(Y|X) constante), ocorre o Data Drift (também denominado Covariate Shift). Se a relação entre X e Y mudasse, seria Concept Drift.',
            cesgranrioTip: 'Mudança na distribuição de entrada X = Data Drift. Mudança na relação entre X e Y = Concept Drift.'
          },
          {
            questionNumber: 2,
            statement: 'No ecossistema de MLOps, a ferramenta de código aberto amplamente utilizada para rastrear parâmetros de hiperparâmetros, métricas de avaliação ao longo das épocas de treino e registrar versões de modelos em estágios de Staging e Production é o:',
            options: [
              'A) Apache Kafka.',
              'B) MLflow.',
              'C) Jenkins.',
              'D) HDFS.',
              'E) Kubernetes Kubelet.'
            ],
            correctLetter: 'B',
            explanation: 'O MLflow é a plataforma padrão de mercado para MLOps. O MLflow Tracking registra métricas, hiperparâmetros e artefatos; o MLflow Model Registry gerencia versões e transições entre estágios (Staging, Production, Archived).',
            cesgranrioTip: 'Rastreamento de experimentos e registro de estágios de modelos = MLflow.'
          },
          {
            questionNumber: 3,
            statement: 'O Population Stability Index (PSI) é uma métrica quantitativa empregada em monitoramento de modelos em produção. Um valor de PSI calculado superior a 0.2 (PSI > 0.2) indica:',
            options: [
              'A) Que o modelo atingiu acurácia máxima de 100%.',
              'B) Que a população de dados de entrada se manteve perfeitamente estável e não há necessidade de intervenção.',
              'C) Uma mudança populacional significativa (Drift severo), sinalizando que o modelo deve ser imediatamente retreinado ou reavaliado.',
              'D) Que o tamanho do arquivo do modelo foi reduzido em mais de 20%.',
              'E) Que o tempo de inferência por requisição caiu para zero microssegundos.'
            ],
            correctLetter: 'C',
            explanation: 'Na convenção clássica do PSI: valores abaixo de 0.1 indicam estabilidade; entre 0.1 e 0.2 indicam mudança moderada que requer monitoramento; e valores acima de 0.2 indicam deslocamento populacional substancial (Drift severo), exigindo retreinamento do modelo com dados recentes.',
            cesgranrioTip: 'PSI < 0.1 = Estável. 0.1 a 0.2 = Atenção. PSI > 0.2 = Drift significativo / Retreinar.'
          },
          {
            questionNumber: 4,
            statement: 'Qual pilar de automação diferencia de forma exclusiva a disciplina de MLOps em comparação com o ciclo tradicional de DevOps de software convencional?',
            options: [
              'A) Continuous Integration (CI).',
              'B) Continuous Delivery (CD).',
              'C) Continuous Training (CT - Retreinamento Contínuo).',
              'D) Controle de versão de código com Git.',
              'E) Testes unitários com PyTest.'
            ],
            correctLetter: 'C',
            explanation: 'Enquanto DevOps tradicional é centrado em CI (integração contínua de código) e CD (entrega contínua de software), MLOps adiciona o Continuous Training (CT): a capacidade de retreinar e revalidar modelos preditivos automaticamente à medida que novos dados são ingeridos ou quando métricas de drift são disparadas.',
            cesgranrioTip: 'O diferencial exclusivo de MLOps perante DevOps é o CT (Continuous Training).'
          },
          {
            questionNumber: 5,
            statement: 'Em monitoramento de modelos de Machine Learning em produção em plataformas de petróleo, quando as propriedades estatísticas das variáveis de entrada mudam ao longo do tempo (por exemplo, a distribuição de pressão e temperatura dos sensores P(X) se altera devido ao desgaste dos equipamentos), mas a relação condicional subjacente P(Y|X) permanece inalterada, o fenômeno denomina-se:',
            options: [
              'A) Data Drift (Desvio de Covariáveis / Covariate Shift).',
              'B) Concept Drift puro.',
              'C) Underfitting determinístico.',
              'D) Vazamento de dados em tempo real.',
              'E) Colapso do gradiente estocástico.'
            ],
            correctLetter: 'A',
            explanation: 'O Data Drift (ou Covariate Shift) refere-se à mudança na distribuição de probabilidade conjunta das features de entrada P(X), enquanto a relação entre as features e o alvo P(Y|X) não se modificou. Já o Concept Drift ocorre quando a própria relação funcional entre as features e a variável dependente P(Y|X) se altera.',
            cesgranrioTip: 'Mudança na distribuição das features P(X) = Data Drift (Covariate Shift). Mudança na relação com o alvo P(Y|X) = Concept Drift.'
          }
        ]
      }
    ],
    examChecklist: [
      'Containers compartilham o mesmo kernel do host; VMs exigem Guest OS.',
      'Namespaces garantem isolamento de visão; cgroups garantem limitação de hardware.',
      'ENTRYPOINT define o comando executável; CMD define argumentos padrão.',
      'MLflow Tracking monitora experimentos; Model Registry gerencia ciclos de vida de modelos.',
      'Data Drift é mudança em P(X); Concept Drift é mudança na relação funcional P(Y|X).',
      'PSI > 0.2 indica drift severo e necessidade mandatória de retreinamento (Continuous Training).'
    ],
    practiceQuestions: [
      {
        questionNumber: 1,
        statement: 'Em um Dockerfile para aplicação de dados, qual comando garante que o container não seja executado com privilégios de superusuário (root) no host hospedeiro?',
        options: [
          'A) SUDO OFF',
          'B) USER appuser',
          'C) NO-ROOT TRUE',
          'D) SECURITY HIGH',
          'E) PRIVILEGE MINIMAL'
        ],
        correctLetter: 'B',
        explanation: 'A instrução USER define o nome de usuário (ou UID) e grupo que serão usados para rodar os comandos seguintes e o processo de execução do container. Criar e alternar para um usuário sem privilégios (como "USER appuser") é uma regra cardeal de segurança em containers.',
        cesgranrioTip: 'Execução segura sem root no Dockerfile = instrução USER.'
      }
    ]
  },
  {
    id: 'livro-b2-sql-bancos',
    itemCode: 'B2-08',
    block: 'Bloco II',
    title: 'Manual de Bancos de Dados Relacionais, Modelagem & SQL Avançado',
    subtitle: 'Normalização (1FN, 2FN, 3FN), ACID, Níveis de Isolamento, Window Functions e CTEs',
    edition: 'Edição Especial Transpetro 2026',
    author: 'Equipe de Engenharia de Dados & Modelagem Relacional',
    pagesEquivalent: 235,
    readTimeEstimate: '3h 40min',
    badge: 'Cobrança Clássica em TI',
    themeGradient: 'from-blue-700 via-indigo-600 to-purple-800',
    borderAccent: 'border-blue-500/40',
    iconName: 'Database',
    overview: 'Dominando a persistência estruturada para sistemas de alta integridade. Projeto conceitual e lógico de banco de dados, anomalias de atualização, o rigor das Formas Normais (1FN: atomicidade; 2FN: dependência funcional total da chave composta; 3FN: ausência de dependência transitiva). Propriedades ACID e níveis de isolamento ANSI SQL. SQL analítico de elite: Window Functions (ROW_NUMBER, RANK, DENSE_RANK, LEAD, LAG) e Common Table Expressions (CTEs recursivas).',
    officialEditalTopics: [
      'Modelagem relacional e teoria de dependências funcionais',
      'Normalização de dados: 1FN, 2FN, 3FN e Forma Normal de Boyce-Codd (BCNF)',
      'Propriedades transacionais ACID: Atomicidade, Consistência, Isolamento e Durabilidade',
      'Fenômenos de leitura concorrente: Dirty Read, Non-Repeatable Read e Phantom Read',
      'Níveis de isolamento ANSI SQL: Read Uncommitted, Read Committed, Repeatable Read e Serializable',
      'SQL analítico: Cláusula OVER (PARTITION BY ... ORDER BY ... ROWS BETWEEN ...)',
      'Funções de ranqueamento: ROW_NUMBER(), RANK(), DENSE_RANK() e NTILE()',
      'Funções de deslocamento: LEAD() e LAG()',
      'Common Table Expressions (CTEs) simples e WITH RECURSIVE para grafos e hierarquias'
    ],
    targetAudience: 'Profissionais que necessitam extrair insights analíticos complexos com integridade estrita.',
    chapters: [
      {
        id: 'cap-b2-sql-norm-acid',
        chapterNumber: 1,
        title: 'Normalização Relacional (1FN, 2FN, 3FN) e as Propriedades ACID',
        subtitle: 'Anomalias de dados, formas normais e níveis de isolamento transacional',
        readTimeEstimate: '45 min',
        summary: 'Teoria da normalização relacional. Critérios objetivos para classificar tabelas em 1FN, 2FN e 3FN. As propriedades ACID e os níveis de isolamento transacional ANSI SQL com seus fenômenos de concorrência.',
        contentMarkdown: `## 1. Normalização Relacional e Dependências Funcionais

A normalização de dados é o processo formal de organização de atributos e tabelas para **eliminar redundâncias desnecessárias** e **prevenir anomalias de inserção, exclusão e alteração**.

### As Três Formas Normais Fundamentais:
1. **Primeira Forma Normal (1FN) - Atomicidade:**
   - Todos os atributos devem conter apenas **valores atômicos** (indivisíveis).
   - **Proibição estrita:** Não são permitidos atributos multivalorados (ex: uma coluna telefones contendo "11-999, 11-888"), nem atributos compostos, nem vetores/tabelas aninhadas.
   - Cada linha deve ser unicamente identificável por uma Chave Primária (PK).
2. **Segunda Forma Normal (2FN) - Dependência Funcional Total:**
   - A tabela deve estar na 1FN.
   - **REGRA DE OURO:** Todos os atributos não-chave devem depender da **totalidade da chave primária**, e não de apenas uma parte dela!
   - *Atenção:* A 2FN só é relevante quando a tabela possui uma **Chave Primária Composta**! Se a PK for simples (composta por apenas 1 coluna), a tabela que está na 1FN já está automaticamente na 2FN!
   - *Violação típica:* Em uma tabela com PK (id_duto, id_sensor), se houver uma coluna nome_duto, ela depende apenas de id_duto (dependência parcial). Para atingir a 2FN, dutos deve ser isolada em uma tabela própria.
3. **Terceira Forma Normal (3FN) - Ausência de Dependência Transitiva:**
   - A tabela deve estar na 2FN.
   - **REGRA DE OURO:** Nenhum atributo não-chave pode depender de outro atributo não-chave! Todos os atributos devem depender **direta e exclusivamente da Chave Primária**.
   - *Violação típica:* Em uma tabela com PK id_funcionario, se houver as colunas codigo_cargo e salario_base_cargo, onde salario_base_cargo é determinado por codigo_cargo, temos uma dependência transitiva (id_funcionario -> codigo_cargo -> salario_base_cargo). Para atingir a 3FN, cargos e salários devem migrar para uma tabela separada.

---

## 2. Propriedades ACID de Transações

Uma transação é uma unidade lógica de trabalho que deve garantir:
- **A (Atomicidade - Tudo ou Nada):** Todas as operações da transação são executadas com sucesso (COMMIT) ou nenhuma é gravada (ROLLBACK). Não existem transações parciais.
- **C (Consistência - Preservação de Regras):** A transação leva o banco de um estado válido a outro estado válido, respeitando todas as restrições de integridade (chaves estrangeiras, CHECK, NOT NULL).
- **I (Isolamento - Concorrência Segura):** A execução concorrente de múltiplas transações produz o mesmo resultado como se elas fossem executadas sequencialmente uma após a outra.
- **D (Durabilidade - Persistência Garantida):** Após o commit com sucesso, as alterações são permanentes em disco e sobrevivem a quedas de energia e falhas do servidor.

---

## 3. Níveis de Isolamento ANSI SQL e Fenômenos Concorrentes

O padrão SQL define 4 níveis de isolamento transacional, balanceando consistência e concorrência:

### Os Três Fenômenos de Concorrência:
- **Dirty Read (Leitura Suja):** Transação T1 lê dados alterados por T2 que ainda **não foram commitados**. Se T2 der rollback, T1 operou sobre dados que nunca existiram formalmente!
- **Non-Repeatable Read (Leitura Não-Repetível):** Transação T1 lê uma linha. T2 altera essa mesma linha e faz commit. T1 lê a linha novamente e encontra valores diferentes.
- **Phantom Read (Leitura Fantasma):** Transação T1 executa uma consulta com WHERE retornando 10 linhas. T2 insere uma nova linha que satisfaz o WHERE e faz commit. T1 reexecuta a mesma consulta e agora encontra 11 linhas!

### Matriz dos Níveis de Isolamento:
| Nível de Isolamento | Leitura Suja (Dirty Read) | Leitura Não-Repetível | Leitura Fantasma (Phantom Read) |
|---|---|---|---|
| **Read Uncommitted** | Permite | Permite | Permite |
| **Read Committed** (Padrão PostgreSQL/Oracle) | **Impossível** | Permite | Permite |
| **Repeatable Read** (Padrão MySQL InnoDB) | **Impossível** | **Impossível** | Permite (em ANSI puro) |
| **Serializable** (Consistência Estrita) | **Impossível** | **Impossível** | **Impossível** |`,
        keyTakeaways: [
          '1FN exige atomicidade e sem colunas multivaloradas.',
          '2FN exige que não haja dependência parcial de chave primária composta.',
          '3FN exige que não haja dependência transitiva entre atributos não-chave.',
          'Tabelas com chave primária simples na 1FN já estão automaticamente na 2FN.',
          'ACID: Atomicidade (tudo ou nada), Consistência (regras válidas), Isolamento (sem interferência mútua), Durabilidade (persistência permanente).',
          'Read Committed impede Dirty Read; Repeatable Read impede Leitura Não-Repetível; Serializable impede Leitura Fantasma.'
        ],
        cesgranrioTraps: [
          'Confundir dependência parcial (2FN) com transitiva (3FN): parcial envolve parte da chave primária composta; transitiva envolve dois atributos não-chave.',
          'Afirmar que a 2FN se aplica a tabelas com chave primária de coluna única: se a chave tem 1 coluna, a dependência parcial é impossível.',
          'Dizer que Read Committed impede leituras fantasmas: Read Committed impede apenas Leitura Suja.'
        ],
        practiceQuestions: [
          {
            questionNumber: 1,
            statement: 'Uma tabela de banco de dados relacional que se encontra na Primeira Forma Normal (1FN) possui como chave primária um único atributo identificador ("id_operacao"). Essa tabela está:',
            options: [
              'A) Obrigatoriamente na Segunda Forma Normal (2FN), pois é impossível haver dependência funcional parcial quando a chave primária é simples (não composta).',
              'B) Necessariamente violando a 2FN, exigindo a inclusão de uma chave estrangeira.',
              'C) Impedida de atingir a 3FN sob qualquer circunstância.',
              'D) Em desacordo com o modelo relacional de Codd.',
              'E) Sujeita a anomalias de deleção que forçam a migração imediata para NoSQL.'
            ],
            correctLetter: 'A',
            explanation: 'A Segunda Forma Normal (2FN) estabelece que nenhum atributo não-chave pode depender de parte da chave primária. Quando a chave primária é simples (formada por um único atributo), não existem "partes" da chave para gerarem dependência parcial. Logo, qualquer tabela na 1FN com chave primária simples está automaticamente na 2FN.',
            cesgranrioTip: 'Chave primária simples + 1FN = automaticamente 2FN.'
          },
          {
            questionNumber: 2,
            statement: 'Considere uma tabela de telemetria "Inspecoes" com a seguinte chave primária composta: (id_duto, data_inspecao). A tabela contém o atributo "diametro_duto", que é determinado exclusivamente pelo "id_duto". Essa tabela viola qual Forma Normal?',
            options: [
              'A) Primeira Forma Normal (1FN).',
              'B) Segunda Forma Normal (2FN).',
              'C) Terceira Forma Normal (3FN).',
              'D) Forma Normal de Boyce-Codd (BCNF).',
              'E) Quarta Forma Normal (4FN).'
            ],
            correctLetter: 'B',
            explanation: 'O atributo "diametro_duto" depende apenas de "id_duto", que é uma parte da chave primária composta (id_duto, data_inspecao). Essa é a clássica dependência funcional parcial, que viola diretamente a Segunda Forma Normal (2FN). Para corrigir, os atributos específicos do duto devem residir em uma tabela separada.',
            cesgranrioTip: 'Dependência de parte de chave composta = Violação de 2FN.'
          },
          {
            questionNumber: 3,
            statement: 'Qual propriedade transacional do modelo ACID garante que, caso ocorra uma falha de hardware ou queda de energia no meio da execução de uma transferência de óleo entre tanques, nenhuma operação parcial seja mantida, revertendo o banco ao seu estado original (tudo ou nada)?',
            options: [
              'A) Consistência.',
              'B) Atomicidade.',
              'C) Isolamento.',
              'D) Durabilidade.',
              'E) Escalabilidade.'
            ],
            correctLetter: 'B',
            explanation: 'A Atomicidade estabelece o princípio do "tudo ou nada": a transação é tratada como uma unidade atômica indivisível. Todas as suas operações são comitadas juntas com sucesso, ou, em caso de erro, sofrem rollback completo, não deixando estados intermediários parciais.',
            cesgranrioTip: 'Princípio do tudo ou nada = Atomicidade (ACID).'
          },
          {
            questionNumber: 4,
            statement: 'No padrão ANSI SQL, qual é o nível de isolamento transacional mais restritivo que impede simultaneamente Leitura Suja (Dirty Read), Leitura Não-Repetível (Non-Repeatable Read) e Leitura Fantasma (Phantom Read)?',
            options: [
              'A) Read Uncommitted.',
              'B) Read Committed.',
              'C) Repeatable Read.',
              'D) Serializable.',
              'E) Snapshot Isolation.'
            ],
            correctLetter: 'D',
            explanation: 'O nível de isolamento Serializable é o mais rigoroso e seguro definido pelo padrão ANSI SQL. Ele força a execução concorrente a se comportar como se as transações tivessem sido executadas serialmente (uma após a outra), eliminando totalmente Dirty Read, Non-Repeatable Read e Phantom Read.',
            cesgranrioTip: 'Nível que elimina todos os fenômenos de concorrência = Serializable.'
          },
          {
            questionNumber: 5,
            statement: 'Uma tabela de banco de dados relacional está na Segunda Forma Normal (2FN). Para que essa tabela atinja a Terceira Forma Normal (3FN), ela deve satisfazer à 2FN e adicionalmente:',
            options: [
              'A) Não possuir dependências funcionais transitivas entre atributos não-chave, ou seja, nenhum atributo não-chave pode depender funcionalmente de outro atributo não-chave.',
              'B) Permitir atributos multivalorados em colunas compostas.',
              'C) Conter chaves estrangeiras que apontem para si mesma.',
              'D) Estar desprovida de chave primária composta.',
              'E) Eliminar todos os índices do tipo B-Tree.'
            ],
            correctLetter: 'A',
            explanation: 'A 3FN elimina a dependência transitiva: se A -> B e B -> C, onde A é a chave primária e C é um atributo não-chave dependente de B (outro atributo não-chave), a tabela viola a 3FN. A resolução exige criar uma nova tabela para B e C.',
            cesgranrioTip: '1FN = Atributos atômicos (sem listas). 2FN = Sem dependência parcial da chave composta. 3FN = Sem dependência transitiva entre não-chaves.'
          }
        ]
      },
      {
        id: 'cap-b2-sql-window-cte',
        chapterNumber: 2,
        title: 'SQL Analítico: Window Functions (ROW_NUMBER, RANK, DENSE_RANK) e CTEs',
        subtitle: 'Cláusula OVER, funções de ranqueamento e Common Table Expressions recursivas',
        readTimeEstimate: '50 min',
        summary: 'Domínio de consultas analíticas avançadas. A cláusula OVER e suas divisões (PARTITION BY, ORDER BY, ROWS/RANGE BETWEEN). Diferença entre ROW_NUMBER, RANK e DENSE_RANK. Uso prático de LEAD, LAG e CTEs recursivas para estruturas hierárquicas.',
        contentMarkdown: `## 1. O que são Window Functions (Funções de Janela)?

Ao contrário do GROUP BY tradicional (que contrai e reduz múltiplas linhas a uma única linha por grupo), as **Window Functions realizam cálculos agregados ou analíticos sobre um conjunto de linhas preservando a identidade e o número de linhas original da tabela**!

### A Sintaxe Padrão da Cláusula OVER:
\`\`\`sql
SELECT 
    id_duto,
    terminal,
    pressao,
    AVG(pressao) OVER(PARTITION BY terminal) AS media_terminal,
    pressao - AVG(pressao) OVER(PARTITION BY terminal) AS desvio_relativo
FROM telemetria;
\`\`\`
- **PARTITION BY <coluna>:** Divide as linhas em partições lógicas para o cálculo (análogo a um agrupamento, sem colapsar as linhas).
- **ORDER BY <coluna>:** Define a ordem em que as linhas dentro da janela são avaliadas.
- **ROWS BETWEEN ... (Frame da Janela):** Limita o alcance das linhas consideradas no cálculo (ex: ROWS BETWEEN 2 PRECEDING AND CURRENT ROW para média móvel de 3 linhas).

---

## 2. As Três Funções de Ranqueamento: Onde a Cesgranrio Pega o Candidato

Considere três medições com a mesma pressão idêntica empatadas em 2º lugar:

| Função | Comportamento com Empates | Próximo Ranqueamento Após Empate | Exemplo com Empate na 2ª posição |
|---|---|---|---|
| **ROW_NUMBER()** | **Nunca empata** (atribui números sequenciais estritos 1, 2, 3...) | Não há lacuna | 1, 2, 3, 4 |
| **RANK()** | **Empata valores iguais** e **GERA LACUNAS (PULA NÚMEROS)** | Pula conforme o número de empates | 1, 2, 2, 4 (o número 3 foi pulado!) |
| **DENSE_RANK()** | **Empata valores iguais** e **NÃO GERA LACUNAS** | Próximo número sequencial consecutivo | 1, 2, 2, 3 (sem saltos!) |

### Exemplo em SQL:
\`\`\`sql
SELECT 
    nome_operador,
    produtividade,
    ROW_NUMBER() OVER(ORDER BY produtividade DESC) AS row_num,
    RANK() OVER(ORDER BY produtividade DESC) AS rnk,
    DENSE_RANK() OVER(ORDER BY produtividade DESC) AS dense_rnk
FROM operadores;
\`\`\`

---

## 3. Funções de Deslocamento Analítico: LAG() e LEAD()
Permitem comparar uma linha com linhas anteriores ou posteriores sem a necessidade de realizar auto-junções (SELF JOIN) custosas:
- **LAG(coluna, deslocamento, default):** Acessa o valor da linha **anterior** dentro da partição.
  - *Uso:* pressao - LAG(pressao, 1) OVER(PARTITION BY id_duto ORDER BY data_hora) calcula a variação imediata de pressão!
- **LEAD(coluna, deslocamento, default):** Acessa o valor da linha **posterior** (seguinte) dentro da partição.

---

## 4. Common Table Expressions (CTEs) e WITH RECURSIVE
Uma **CTE** (expressão de tabela comum) define um conjunto de resultados temporário nomeado com a cláusula WITH, melhorando a legibilidade e modularidade de subconsultas complexas:

\`\`\`sql
WITH MaioresPressao AS (
    SELECT 
        id_duto, 
        pressao,
        DENSE_RANK() OVER(PARTITION BY id_duto ORDER BY pressao DESC) as rank_pressao
    FROM telemetria
)
SELECT id_duto, pressao 
FROM MaioresPressao 
WHERE rank_pressao <= 3;
\`\`\`

### CTE Recursiva (WITH RECURSIVE):
Indispensável para consultar estruturas em árvore, redes de oleodutos ramificados e hierarquias organizacionais:
1. **Membro Âncora:** A consulta base inicial (ex: a refinaria central).
2. **UNION ALL:** Operador de fusão.
3. **Membro Recursivo:** Consulta que faz join com a própria CTE para descer ou subir na árvore de ramificações até que a condição de parada seja atingida.`,
        keyTakeaways: [
          'Window Functions realizam cálculos agregados sem reduzir o número de linhas da tabela.',
          'ROW_NUMBER gera sequência estrita (1, 2, 3, 4) sem empates.',
          'RANK gera empates com saltos na sequência (1, 2, 2, 4).',
          'DENSE_RANK gera empates sem saltos na sequência (1, 2, 2, 3).',
          'LAG acessa a linha anterior e LEAD acessa a linha posterior sem self-join.',
          'WITH RECURSIVE resolve estruturas hierárquicas e redes de dutos de forma elegante.'
        ],
        cesgranrioTraps: [
          'Confundir RANK com DENSE_RANK: se houver dois elementos empatados em segundo, o RANK pula para 4, enquanto o DENSE_RANK segue para 3.',
          'Tentar usar Window Functions na cláusula WHERE: é proibido no padrão SQL! Deve-se encapsular em uma CTE ou subconsulta e filtrar externamente.',
          'Achar que PARTITION BY agrupa linhas como o GROUP BY: PARTITION BY apenas delimita a janela de cálculo, mantendo todas as linhas visíveis.'
        ],
        practiceQuestions: [
          {
            questionNumber: 1,
            statement: 'Considere quatro registros com os seguintes valores na coluna "pontuacao": 100, 90, 90, 80. Se aplicarmos, respectivamente, as funções RANK() e DENSE_RANK() com ORDER BY pontuacao DESC, quais serão os valores gerados para os quatro registros?',
            options: [
              'A) RANK: 1, 2, 3, 4 | DENSE_RANK: 1, 2, 3, 4',
              'B) RANK: 1, 2, 2, 4 | DENSE_RANK: 1, 2, 2, 3',
              'C) RANK: 1, 2, 2, 3 | DENSE_RANK: 1, 2, 2, 4',
              'D) RANK: 1, 1, 2, 3 | DENSE_RANK: 1, 1, 2, 2',
              'E) RANK: 4, 3, 2, 1 | DENSE_RANK: 3, 2, 2, 1'
            ],
            correctLetter: 'B',
            explanation: 'O primeiro registro (100) recebe 1 em ambos. Os registros 2 e 3 empatam no valor 90, recebendo ranque 2 em ambos. Para o quarto registro (80): o RANK() pula a posição 3 devido ao empate duplo e atribui 4 (1, 2, 2, 4). O DENSE_RANK() não gera lacunas e atribui o próximo inteiro consecutivo 3 (1, 2, 2, 3).',
            cesgranrioTip: 'RANK() salta números após empate; DENSE_RANK() nunca salta números.'
          },
          {
            questionNumber: 2,
            statement: 'Em uma consulta SQL, deseja-se calcular para cada registro de telemetria a diferença entre a "pressao_atual" e a "pressao_anterior" da medição imediatamente prévia do mesmo duto, ordenada cronologicamente por "data_hora". A função analítica adequada para obter o valor da linha anterior é:',
            options: [
              'A) LEAD(pressao_atual, 1)',
              'B) LAG(pressao_atual, 1)',
              'C) PREV(pressao_atual, 1)',
              'D) PRIOR(pressao_atual, 1)',
              'E) BACK(pressao_atual, 1)'
            ],
            correctLetter: 'B',
            explanation: 'A função LAG(coluna, offset) acessa o valor de uma coluna da linha anterior (com offset 1 por padrão) dentro da partição especificada na cláusula OVER. A função LEAD acessaria a linha posterior.',
            cesgranrioTip: 'LAG = Linha anterior. LEAD = Linha posterior.'
          },
          {
            questionNumber: 3,
            statement: 'Um analista de dados tentou executar a seguinte consulta SQL: SELECT id_duto, pressao FROM telemetria WHERE ROW_NUMBER() OVER(ORDER BY pressao DESC) <= 5; O banco de dados retornará um erro porque:',
            options: [
              'A) A cláusula ORDER BY é proibida dentro do OVER com ROW_NUMBER().',
              'B) Funções de janela (Window Functions) não são permitidas diretamente na cláusula WHERE.',
              'C) A função ROW_NUMBER() só pode ser usada em conjunto com SUM().',
              'D) O operador "<=" não é aceito com funções analíticas.',
              'E) O SQL exige que a tabela contenha uma chave primária composta.'
            ],
            correctLetter: 'B',
            explanation: 'Na ordem de processamento lógico do SQL, a cláusula WHERE é avaliada antes das Window Functions. Por isso, é sintaticamente proibido colocar uma Window Function diretamente no WHERE. A solução canônica é usar uma Common Table Expression (CTE) ou subconsulta e filtrar a coluna ranqueada na consulta externa.',
            cesgranrioTip: 'Window Functions nunca podem ficar no WHERE. Use CTE (WITH) para filtrar o resultado.'
          },
          {
            questionNumber: 4,
            statement: 'Para consultar a árvore hierárquica completa de uma rede de oleodutos interligados com ramificações sucessivas partindo de uma estação central, a construção SQL padrão recomendada é:',
            options: [
              'A) SELECT DISTINCT com cláusula GROUPING SETS.',
              'B) Common Table Expression com a cláusula WITH RECURSIVE.',
              'C) CROSS JOIN com PIVOT.',
              'D) FULL OUTER JOIN sem cláusula ON.',
              'E) Subquery correlacionada com LIMIT 1.'
            ],
            correctLetter: 'B',
            explanation: 'A cláusula WITH RECURSIVE define uma CTE recursiva composta por um membro âncora (o nó raiz ou estação central) e um membro recursivo que itera sobre as conexões até exaurir todos os níveis da árvore ou grafo de ramificações.',
            cesgranrioTip: 'Estruturas em árvore e redes hierárquicas = WITH RECURSIVE.'
          },
          {
            questionNumber: 5,
            statement: 'Em uma consulta SQL analítica sobre registros de telemetria de dutos, ao utilizar a função de janela SUM(vazao) OVER (PARTITION BY id_duto ORDER BY data_hora ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW), a expressão computa:',
            options: [
              'A) A soma acumulada contínua (running total) da vazão ao longo do tempo para cada duto individualmente.',
              'B) A média global de todas as linhas da tabela combinadas.',
              'C) Apenas a vazão da primeira linha de cada partição descartando as demais.',
              'D) A diferença absoluta entre a vazão atual e a vazão média móvel de 7 dias.',
              'E) Um erro de sintaxe por ausência de GROUP BY obrigatório.'
            ],
            correctLetter: 'A',
            explanation: 'A cláusula ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW define que a janela de cálculo inicia no primeiro registro da partição e estende-se até a linha atual, gerando a soma acumulada progressiva (Running Total) ordenada cronologicamente.',
            cesgranrioTip: 'ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW com SUM() = Soma Acumulada (Running Total) particionada.'
          }
        ]
      }
    ],
    examChecklist: [
      '1FN: atomicidade e sem colunas multivaloradas.',
      '2FN: sem dependência parcial da chave composta.',
      '3FN: sem dependência transitiva entre atributos não-chave.',
      'ACID: Atomicidade (tudo ou nada), Consistência, Isolamento e Durabilidade.',
      'Read Committed impede Dirty Read; Serializable impede todos os fenômenos concorrentes.',
      'ROW_NUMBER gera sequência estrita (1, 2, 3, 4); RANK pula números (1, 2, 2, 4); DENSE_RANK não pula (1, 2, 2, 3).',
      'LAG acessa a linha anterior e LEAD acessa a linha posterior.',
      'Window functions são proibidas no WHERE (devem ser filtradas via CTE).'
    ],
    practiceQuestions: [
      {
        questionNumber: 1,
        statement: 'Deseja-se particionar 100 operadores em 4 quartis iguais de produtividade (1 a 4). A função de janela analítica do SQL que divide as linhas de uma partição em um número determinado de baldes (buckets) quase iguais é:',
        options: [
          'A) BUCKET(4)',
          'B) NTILE(4)',
          'C) QUARTILE(4)',
          'D) SPLIT(4)',
          'E) PART(4)'
        ],
        correctLetter: 'B',
        explanation: 'A função NTILE(n) divide as linhas ordenadas de uma partição em n baldes/grupos aproximadamente iguais e atribui a cada linha o número do balde ao qual ela pertence (de 1 a n).',
        cesgranrioTip: 'Divisão em quartis / decis / baldes iguais = NTILE(n).'
      }
    ]
  }
];
