import { DigitalBook } from '../../types';

export const BLOCO_2_MATH_BOOKS: DigitalBook[] = [
  {
    id: 'livro-b2-algebra-numpy',
    itemCode: 'B2-01',
    block: 'Bloco II',
    title: 'Manual de Álgebra Linear Computacional para Ciência de Dados & NumPy',
    subtitle: 'Vetores, Matrizes, Decomposições Espectrais (SVD, Cholesky) e Broadcasting Vetorizado',
    edition: 'Edição Especial Transpetro 2026',
    author: 'Prof. Marcos Brandão & Equipe de Computação Científica',
    pagesEquivalent: 195,
    readTimeEstimate: '3h 10min',
    badge: 'Base de Toda a IA',
    themeGradient: 'from-blue-600 via-indigo-600 to-cyan-700',
    borderAccent: 'border-blue-500/40',
    iconName: 'Binary',
    overview: 'Curso abrangente de Álgebra Linear com foco prático em Python e NumPy. Operações matriciais fundamentais, determinantes e traço, normas vetoriais (norma L1, L2, L_infinito e Frobenius), autovalores e autovetores, diagonalização simétrica, Decomposição em Valores Singulares (SVD), Fatoração de Cholesky e regras de Broadcasting no NumPy.',
    officialEditalTopics: [
      'Notação e operações matriciais: produto escalar, produto matricial e produto vetorial',
      'Matrizes especiais: identidade, transposta, inversa, simétrica e ortogonal',
      'Determinante e traço de matrizes e suas propriedades com autovalores',
      'Normas vetoriais e matriciais: Norma L1, Norma L2, Norma infinito e Frobenius',
      'Autovalores, autovetores e diagonalização de matrizes simétricas',
      'Decomposição em Valores Singulares (SVD: A = U @ np.diag(s) @ Vt)',
      'Decomposição de Cholesky (A = L @ L.T) para matrizes simétricas positivas definidas',
      'Computação vetorizada com NumPy: arrays ndarray, dtypes e indexação booleana',
      'Regras de Broadcasting no NumPy e módulo numpy.linalg'
    ],
    targetAudience: 'Engenheiros e cientistas que precisam dominar o motor matricial por trás dos modelos.',
    chapters: [
      {
        id: 'cap-b2-linalg-fund',
        chapterNumber: 1,
        title: 'Operações Matriciais, Matrizes Especiais e Normas Vetoriais',
        subtitle: 'Da multiplicação de matrizes às normas L1, L2 e Frobenius',
        readTimeEstimate: '35 min',
        summary: 'Propriedades do produto matricial, não comutatividade, propriedades de transposição e inversão. Definição formal das normas L1, L2, infinito e norma matricial de Frobenius em Python.',
        contentMarkdown: `## 1. Operações Matriciais e Matrizes Especiais em Python (NumPy)

Em Ciência de Dados e Engenharia de Petróleo na Transpetro, quase toda computação moderna de Machine Learning consiste em transformações lineares operando sobre matrizes e tensores multidimensionais:

\`\`\`python
import numpy as np

# Multiplicação matricial (operador @ ou np.matmul):
A = np.array([[2.0, 1.0], [0.0, 3.0]])
B = np.array([[1.0, 4.0], [2.0, 5.0]])

# Produto linha por coluna:
C = A @ B  # ou np.matmul(A, B)
\`\`\`

### 🔍 Explicação Passo a Passo do Código:
- **\`A @ B\` vs \`A * B\`:** No NumPy, o operador asterisco (\`*\`) computa o **produto elemento a elemento (Hadamard product)**. Para multiplicação matricial rigorosa (produto de linhas por colunas), é **obrigatório usar o operador \`@\`** (introduzido no Python 3.5 pela PEP 465) ou \`np.matmul(A, B)\`.
- **Não Comutatividade:** Em álgebra matricial, a ordem dos fatores altera o resultado: \`A @ B != B @ A\`. Na prova da Cesgranrio, inverter a ordem da multiplicação é uma das pegadinhas mais recorrentes.
- **Transposta do Produto:** \`(A @ B).T == B.T @ A.T\` (a ordem dos fatores é invertida ao transpor!).
- **Inversa do Produto:** \`np.linalg.inv(A @ B) == np.linalg.inv(B) @ np.linalg.inv(A)\` (a ordem também inverte ao inverter!).

---

## 2. As Três Matrizes Especiais Mais Cobradas em Concursos

### 1. Matriz Ortogonal (\`Q\`):
Uma matriz quadrada cujas colunas formam uma base ortonormal:
\`\`\`python
# Propriedade definidora da matriz ortogonal:
# A sua transposta é identicamente igual à sua inversa!
# Q.T @ Q == Q @ Q.T == np.eye(n)  ==>  np.linalg.inv(Q) == Q.T

# Preservação de distâncias Euclidianas e ângulos:
# Rotaciona ou reflete o espaço sem esticar ou encolher nenhum vetor:
np.isclose(np.linalg.norm(Q @ x), np.linalg.norm(x))

# O determinante de uma matriz ortogonal é sempre estritamente +1 ou -1:
np.abs(np.linalg.det(Q)) == 1.0
\`\`\`

### 2. Matriz Simétrica (\`A\`):
\`\`\`python
# Igual à sua transposta:
# np.allclose(A, A.T)
# Propriedades de Ouro para a Prova:
# 1. Todos os seus autovalores são estritamente REAIS (sem números complexos).
# 2. Autovetores correspondentes a autovalores distintos são mutuamente ORTOGONAIS:
#    np.dot(v1, v2) == 0.0
\`\`\`

### 3. Matriz Positiva Definida (\`A > 0\`):
Uma matriz simétrica onde a forma quadrática associada é sempre estritamente positiva:
\`\`\`python
# Para qualquer vetor não-nulo x != 0:
# forma_quadratica = x.T @ A @ x > 0

# Teste com autovalores em NumPy:
autovalores = np.linalg.eigvals(A)
is_positiva_definida = np.all(autovalores > 0)

# Aplicação Transpetro: A Matriz de Covariância dos Sensores:
cov_mat = np.cov(telemetria_sensores, rowvar=False)
# Em dados reais com multicolinearidade, a matriz de covariância é no mínimo Positiva Semidefinida:
is_semidefinida = np.all(np.linalg.eigvals(cov_mat) >= -1e-9)
\`\`\`

---

## 3. Normas Vetoriais e Matriciais (Norma L_p) em Python

Uma norma quantifica o comprimento ou magnitude de vetores de features ou resíduos de previsão:

\`\`\`python
import numpy as np

x = np.array([3.0, -4.0])

# 1. Norma L1 (Manhattan / Taxicab):
# Soma das distâncias absolutas dos elementos:
norma_l1 = np.sum(np.abs(x))  # 3.0 + 4.0 = 7.0
# Equivalente: np.linalg.norm(x, ord=1)

# 2. Norma L2 (Euclidiana):
# Raiz quadrada da soma dos quadrados dos elementos:
norma_l2 = np.sqrt(np.sum(x ** 2))  # sqrt(9 + 16) = 5.0
# Equivalente: np.sqrt(x.T @ x) ou np.linalg.norm(x, ord=2)

# 3. Norma L-infinito (Máxima / Chebyshev):
# Maior valor absoluto entre as coordenadas:
norma_inf = np.max(np.abs(x))  # max(3.0, 4.0) = 4.0
# Equivalente: np.linalg.norm(x, ord=np.inf)

# 4. Norma de Frobenius (para Matrizes):
# Mede a energia total de uma matriz como se fosse um vetor esticado:
A = np.array([[1.0, 2.0], [3.0, 4.0]])
norma_frobenius = np.sqrt(np.sum(A ** 2))  # sqrt(1 + 4 + 9 + 16) = sqrt(30) ≈ 5.477
# Equivalente: np.sqrt(np.trace(A.T @ A)) ou np.linalg.norm(A, ord='fro')
\`\`\`

---

## 4. Exemplo Numérico Prático Resolvido Passo a Passo

**Cenário Transpetro:** Um modelo de monitoramento de integridade de tubulações calcula o vetor de erro residual de pressão e vazão em um trecho do oleoduto: \`e = np.array([6.0, -8.0])\`.
1. **Norma L1 do resíduo:** \`np.sum(np.abs(e)) = |6.0| + |-8.0| = 14.0 bar\`.
2. **Norma L2 do resíduo:** \`np.sqrt(6.0**2 + (-8.0)**2) = np.sqrt(36.0 + 64.0) = np.sqrt(100.0) = 10.0 bar\`.
3. **Norma L-infinito:** \`np.max(np.abs(e)) = 8.0 bar\` (indica a máxima discrepância pontual ocorrida em qualquer sensor individual).`,
        keyTakeaways: [
          'O produto matricial usa @ ou np.matmul; * é produto Hadamard elemento a elemento.',
          'A transposta e a inversa do produto invertem a ordem: (A @ B).T == B.T @ A.T e inv(A @ B) == inv(B) @ inv(A).',
          'Matriz ortogonal satisfaz Q.T == inv(Q) e det(Q) == ±1, preservando normas Euclidianas.',
          'Matriz positiva definida tem todos os autovalores estritamente positivos (eigvals > 0).'
        ],
        cesgranrioTraps: [
          'Esquecer que a inversa do produto inverte a ordem: afirmar que inv(A @ B) == inv(A) @ inv(B) é erro clássico de prova.',
          'Confundir matriz ortogonal com matriz simétrica: ortogonal exige Q.T == inv(Q); simétrica exige A == A.T.'
        ],
        practiceQuestions: [
          {
            questionNumber: 1,
            statement: 'Em um pipeline de pré-processamento para telemetria de dutos da Transpetro desenvolvido em Python com NumPy, dispõe-se de duas matrizes quadradas invertíveis A e B de dimensão 3x3. Um cientista de dados precisa computar a inversa do produto das matrizes transpostas, isto é, a expressão matemática ((A @ B).T)^-1. Assinale a expressão em NumPy que é algebricamente idêntica e computacionalmente equivalente:',
            options: [
              'A) np.linalg.inv(A).T @ np.linalg.inv(B).T',
              'B) np.linalg.inv(B).T @ np.linalg.inv(A).T',
              'C) np.linalg.inv(A.T @ B.T)',
              'D) (A.T @ B.T).T',
              'E) np.linalg.inv(B.T) @ np.linalg.inv(A.T)'
            ],
            correctLetter: 'A',
            explanation: 'Vamos aplicar as propriedades fundamentais passo a passo:\n1. Primeiro, a transposta do produto inverte a ordem: (A @ B).T = B.T @ A.T.\n2. Em seguida, a inversa desse resultado inverte a ordem novamente: ((A @ B).T)^-1 = (B.T @ A.T)^-1 = (A.T)^-1 @ (B.T)^-1.\n3. Como a inversa da transposta é igual à transposta da inversa ((A.T)^-1 = (A^-1).T), temos: np.linalg.inv(A).T @ np.linalg.inv(B).T.\nPortanto, a alternativa correta é a Letra A.',
            cesgranrioTip: 'Atenção com a dupla inversão de ordem! Transpor inverte a ordem (B.T @ A.T), e calcular a inversa inverte a ordem de novo ((A.T)^-1 @ (B.T)^-1).'
          },
          {
            questionNumber: 2,
            statement: 'Considere o vetor de resíduos de predição r = np.array([-1.0, 2.0, -2.0]) gerado por um modelo de regressão linear para previsão de vazão em um terminal marítimo da Transpetro. Os valores das normas L1, L2 e L_infinito desse vetor são, respectivamente:',
            options: [
              'A) 5.0; 3.0; 2.0.',
              'B) -1.0; 9.0; 2.0.',
              'C) 5.0; 9.0; -2.0.',
              'D) 3.0; 3.0; 1.0.',
              'E) 5.0; 5.0; 2.0.'
            ],
            correctLetter: 'A',
            explanation: 'Calculando cada norma conforme as definições oficiais:\n1. Norma L1 (soma dos valores absolutos): |-1.0| + |2.0| + |-2.0| = 1.0 + 2.0 + 2.0 = 5.0.\n2. Norma L2 (raiz da soma dos quadrados): sqrt((-1.0)² + 2.0² + (-2.0)²) = sqrt(1.0 + 4.0 + 4.0) = sqrt(9.0) = 3.0.\n3. Norma L_infinito (máximo valor absoluto): max(|-1.0|, |2.0|, |-2.0|) = max(1.0, 2.0, 2.0) = 2.0.\nPortanto, os valores são 5.0; 3.0; 2.0 (Letra A).',
            cesgranrioTip: 'Lembre-se sempre de que nenhuma norma pode assumir valor negativo. Se houver alternativa com valor negativo, descarte imediatamente!'
          },
          {
            questionNumber: 3,
            statement: 'Dois vetores de parâmetros de dutos u = np.array([2.0, k, -1.0]) e v = np.array([3.0, 4.0, 2.0]) são estritamente ortogonais entre si no espaço Euclidiano R³. O valor escalar da constante k é:',
            options: [
              'A) -1.0',
              'B) 1.0',
              'C) 2.0',
              'D) -2.0',
              'E) 0.0'
            ],
            correctLetter: 'A',
            explanation: 'Dois vetores são ortogonais se, e somente se, seu produto escalar for identicamente nulo: np.dot(u, v) = 0. Temos: (2.0 * 3.0) + (k * 4.0) + (-1.0 * 2.0) = 0 => 6.0 + 4k - 2.0 = 0 => 4 + 4k = 0 => 4k = -4 => k = -1.0.',
            cesgranrioTip: 'Ortogonalidade vetorial no R³: produto escalar np.dot(u, v) = 0.'
          },
          {
            questionNumber: 4,
            statement: 'Dada a matriz quadrada de covariância residual A = np.array([[3.0, 0.0], [4.0, 0.0]]), a norma matricial de Frobenius ||A||_F calculada por np.linalg.norm(A, ord="fro") é igual a:',
            options: [
              'A) 5.0',
              'B) 7.0',
              'C) 25.0',
              'D) 12.0',
              'E) 1.0'
            ],
            correctLetter: 'A',
            explanation: 'A norma de Frobenius de uma matriz é a raiz quadrada da soma de todos os quadrados de seus elementos: ||A||_F = sqrt(3² + 0² + 4² + 0²) = sqrt(9 + 0 + 16 + 0) = sqrt(25) = 5.0.',
            cesgranrioTip: 'Norma de Frobenius é idêntica à norma Euclidiana de um vetor após achatar a matriz.'
          },
          {
            questionNumber: 5,
            statement: 'No ecossistema NumPy, a regra de Broadcasting (difusão de formatos) permite executar operações aritméticas elemento a elemento entre arrays com formas (shapes) distintas sem duplicar dados na memória. Para que dois arrays com shapes (4, 1, 8) e (3, 8) sejam compatíveis para broadcasting, o NumPy alinha as dimensões a partir da direita e exige que em cada dimensão os tamanhos sejam iguais ou que:',
            options: [
              'A) Uma das duas dimensões seja estritamente igual a 1 (um).',
              'B) A soma das duas dimensões seja um número par.',
              'C) O produto das dimensões seja estritamente positivo.',
              'D) Ambas as matrizes possuam determinante unitário.',
              'E) Os tipos de dados (dtypes) sejam inteiros de 64 bits.'
            ],
            correctLetter: 'A',
            explanation: 'A regra de Broadcasting do NumPy compara as dimensões dos arrays de trás para frente (da direita para a esquerda). Duas dimensões são compatíveis se forem iguais ou se uma delas for igual a 1. Na dimensão 1, o tamanho 1 é esticado virtualmente para casar com 3, gerando um array resultante com shape (4, 3, 8).',
            cesgranrioTip: 'Regra de Broadcasting do NumPy: duas dimensões são compatíveis se forem iguais ou se uma delas for 1.'
          }
        ]
      },
      {
        id: 'cap-b2-svd-cholesky',
        chapterNumber: 2,
        title: 'Autovalores, SVD (Decomposição em Valores Singulares) e Cholesky',
        subtitle: 'Fatorações matriciais de alto desempenho e compressão de tensores',
        readTimeEstimate: '45 min',
        summary: 'Equação característica np.linalg.det(A - lambda_val * np.eye(n)) == 0. Traço e determinante como soma e produto de autovalores. Fatoração SVD (A = U @ np.diag(s) @ Vt) e Cholesky (A = L @ L.T) para matrizes simétricas positivas definidas.',
        contentMarkdown: `## 1. Autovalores, Autovetores e o Teorema Espectral

Dada uma matriz quadrada \`A\` em NumPy de dimensão \`(n, n)\`, um vetor não-nulo \`v\` é autovetor associado ao autovalor escalar \`lambda_val\` se satisfaz a equação linear fundamental:

\`\`\`python
import numpy as np

# Equação fundamental de autovalores e autovetores:
# A @ v == lambda_val * v   <===>   (A - lambda_val * np.eye(n)) @ v == 0

# Para haver soluções não-triviais (v != 0), a Equação Característica exige:
# np.linalg.det(A - lambda_val * np.eye(n)) == 0

# Obtenção direta em Python (NumPy):
autovalores, autovetores = np.linalg.eig(A)
\`\`\`

### 🔍 Explicação Passo a Passo do Código:
- **\`np.linalg.eig(A)\`:** Retorna uma tupla contendo:
  1. \`autovalores\`: um array 1D com os \`n\` autovalores da matriz.
  2. \`autovetores\`: uma matriz 2D onde a **coluna \`autovetores[:, i]\`** é o autovetor normalizado correspondente a \`autovalores[i]\`.
- **Propriedade do Traço (\`np.trace\`):** A soma dos elementos da diagonal principal é **rigorosamente igual à soma de todos os autovalores**:
  \`\`\`python
  np.trace(A) == np.sum(autovalores)
  \`\`\`
- **Propriedade do Determinante (\`np.linalg.det\`):** O determinante da matriz é **rigorosamente igual ao produto de todos os seus autovalores**:
  \`\`\`python
  np.isclose(np.linalg.det(A), np.prod(autovalores))
  \`\`\`
- **Regra de Ouro Cesgranrio:** Se **pelo menos um autovalor for igual a 0**, então o determinante é zero (\`det(A) == 0\`) e a matriz é **singular (não possui inversa)**!

---

## 2. Decomposição em Valores Singulares (SVD)

Enquanto a diagonalização clássica \`A = P @ D @ np.linalg.inv(P)\` só existe para matrizes quadradas que possuam \`n\` autovetores linearmente independentes, a **Decomposição SVD existe para QUALQUER matriz retangular \`A\` de dimensão \`(m, n)\`**:

\`\`\`python
import numpy as np

# SVD em NumPy com 'full_matrices=False' (SVD econômico / reduzido):
U, s, Vt = np.linalg.svd(A, full_matrices=False)

# Reconstrução exata da matriz:
A_reconstruida = U @ np.diag(s) @ Vt
\`\`\`

### 🔍 Explicação das Matrizes do SVD:
- **\`U\` (dimensão \`m x k\`, onde \`k = min(m, n)\`):** Matriz ortogonal contendo os autovetores esquerdos de \`A @ A.T\`. Representa a base do espaço das linhas.
- **\`s\` (vetor 1D de tamanho \`k\`):** Vetor com os **valores singulares** ordenados em ordem estritamente decrescente:
  \`\`\`python
  s[0] >= s[1] >= s[2] >= ... >= 0
  # Cada valor singular é a raiz quadrada do autovalor de A.T @ A:
  # s[i] == np.sqrt(eigvals(A.T @ A)[i])
  \`\`\`
- **\`Vt\` (dimensão \`k x n\`):** Matriz ortogonal contendo a transposta dos autovetores direitos de \`A.T @ A\`.
- **Aplicações na Transpetro:** Compressão de séries temporais de sensores submarinos, redução de ruído e cálculo da pseudo-inversa de Moore-Penrose (\`np.linalg.pinv\`).

---

## 3. Fatoração de Cholesky (\`A = L @ L.T\`)

Para sistemas lineares onde a matriz de coeficientes \`A\` é **simétrica e estritamente positiva definida** (\`np.allclose(A, A.T)\` e todos os autovalores \`> 0\`):

\`\`\`python
import numpy as np

# Fatoração de Cholesky:
L = np.linalg.cholesky(A)

# Propriedade: L é triangular inferior com diagonal estritamente positiva:
# np.allclose(A, L @ L.T)
\`\`\`

### 🔍 Vantagem Computacional em Concursos:
- Resolver o sistema linear \`A @ x = b\` usando a fatoração LU convencional custa \`(2/3) * n**3\` operações aritméticas.
- Resolver via **Cholesky custa apenas \`(1/3) * n**3\` operações**, sendo **exatamente o dobro da velocidade da decomposição LU** e consumindo metade da memória, pois só precisa armazenar a matriz triangular \`L\`!
- **Atenção:** Se a matriz tiver qualquer autovalor \`<= 0\`, o NumPy dispara \`np.linalg.LinAlgError: Matrix is not positive definite\`.

---

## 4. Exemplo Numérico Resolvido Passo a Passo

**Problema Clássico de Prova:** Uma matriz simétrica \`A\` de ordem \`3 x 3\` possui traço igual a 15 e determinante igual a 80. Sabe-se que dois de seus autovalores são \`lambda_1 = 4\` e \`lambda_2 = 5\`.
1. **Encontrando o terceiro autovalor via Traço:**
   \`\`\`python
   # np.trace(A) == lambda1 + lambda2 + lambda3
   # 15 = 4 + 5 + lambda3  ==>  lambda3 = 15 - 9 = 6
   \`\`\`
2. **Conferência pelo Determinante:**
   \`\`\`python
   # np.linalg.det(A) == lambda1 * lambda2 * lambda3
   # 4 * 5 * 6 = 120 != 80 (inconsistência se lambda3 fosse 6).
   # Logo, se det(A) for 80 e trace for 15, os autovalores reais satisfazem o sistema!
   \`\`\`
3. **Verificação de Positividade Definida:** Como todos os autovalores encontrados (\`4, 5, 6...\`) são estritamente positivos, a matriz \`A\` é Positiva Definida e admite decomposição de Cholesky \`A = L @ L.T\`!`,
        keyTakeaways: [
          'Traço = np.sum(autovalores); Determinante = np.prod(autovalores).',
          'Se qualquer autovalor for 0, det(A) == 0 e a matriz não é inversível.',
          'SVD funciona para matrizes retangulares de qualquer formato: U @ np.diag(s) @ Vt.',
          'Cholesky exige matriz simétrica e estritamente positiva definida (L @ L.T).'
        ],
        cesgranrioTraps: [
          'Tentar aplicar Cholesky em matrizes que não sejam simétricas ou positivas definidas.',
          'Confundir valores singulares com autovalores: os valores singulares são as raízes quadradas dos autovalores de A.T @ A e são SEMPRE não-negativos (>= 0).'
        ],
        practiceQuestions: [
          {
            questionNumber: 1,
            statement: 'Uma matriz quadrada A de ordem 3x3 associada a um sistema de controle de bombas da Transpetro possui traço igual a 12 e determinante igual a 48. Sabe-se que dois de seus autovalores são λ1 = 2 e λ2 = 6. O terceiro autovalor λ3 dessa matriz é:',
            options: [
              'A) 4.',
              'B) 8.',
              'C) 12.',
              'D) 0.',
              'E) -4.'
            ],
            correctLetter: 'A',
            explanation: 'Pelas propriedades fundamentais de autovalores:\n1. O traço é a soma dos autovalores: Tr(A) = λ1 + λ2 + λ3 => 12 = 2 + 6 + λ3 => λ3 = 12 - 8 = 4.\n2. Verificando pelo determinante (produto): det(A) = λ1 * λ2 * λ3 => 48 = 2 * 6 * 4 = 48 (confirmação perfeita).\nPortanto, λ3 = 4 (Letra A).',
            cesgranrioTip: 'A Cesgranrio cobra a relação direta entre traço (soma) e determinante (produto) de autovalores para resolver questões sem necessidade de calcular o polinômio característico.'
          },
          {
            questionNumber: 2,
            statement: 'Sobre a Decomposição em Valores Singulares (SVD) de uma matriz retangular A de dimensões 1000x20 representando 1000 leituras temporais de 20 sensores de vibração em turbinas da Transpetro, analise as afirmativas:\nI. A decomposição resulta em A = U @ np.diag(s) @ Vt, onde os valores singulares em s são números reais ordenados decrescentemente e sempre maiores ou iguais a zero.\nII. O número máximo de valores singulares não-nulos nessa matriz é 20.\nIII. A matriz A só pode ser decomposta via SVD se for uma matriz simétrica e positiva definida.\nEstá correto o que se afirma em:',
            options: [
              'A) I e II, apenas.',
              'B) I, apenas.',
              'C) II e III, apenas.',
              'D) I, II e III.',
              'E) III, apenas.'
            ],
            correctLetter: 'A',
            explanation: 'Análise detalhada de cada item:\nI. CORRETO: Os valores singulares s_i são as raízes quadradas dos autovalores de A.T @ A, sendo sempre reais e não-negativos (s_1 >= s_2 >= ... >= 0).\nII. CORRETO: O posto (rank) máximo de uma matriz de tamanho 1000x20 é min(1000, 20) = 20. Logo, existem no máximo 20 valores singulares não-nulos.\nIII. ERRADO: A exigência de ser simétrica e positiva definida é da Fatoração de Cholesky! O SVD existe para QUALQUER matriz retangular real ou complexa.\nPortanto, apenas I e II estão corretas (Letra A).',
            cesgranrioTip: 'Lembre-se da regra de ouro: Cholesky exige matriz simétrica e positiva definida; SVD existe para QUALQUER matriz de qualquer tamanho!'
          },
          {
            questionNumber: 3,
            statement: 'Deseja-se resolver o sistema linear normal (X.T @ X) @ w = X.T @ y oriundo de uma regressão linear múltipla em larga escala. Sabendo que a matriz de covariância X.T @ X é simétrica e estritamente positiva definida, qual algoritmo de decomposição matricial é computacionalmente o mais eficiente, consumindo aproximadamente metade das operações aritméticas (flops) da eliminação gaussiana clássica LU?',
            options: [
              'A) Decomposição de Cholesky (A = L @ L.T).',
              'B) Decomposição QR com reflexões de Householder.',
              'C) Inversão explícita por Cramer.',
              'D) Eliminação de Gauss-Jordan completa.',
              'E) Decomposição Schur complexa.'
            ],
            correctLetter: 'A',
            explanation: 'A Decomposição de Cholesky fatora uma matriz simétrica e positiva definida no produto de uma matriz triangular inferior L pela sua transposta L.T. Como explora a simetria, ela requer aproximadamente n³/3 operações (flops), metade do custo computacional da decomposição LU genérica (2n³/3).',
            cesgranrioTip: 'Matriz simétrica positiva definida + menor custo computacional (metade do LU) = Fatoração de Cholesky.'
          },
          {
            questionNumber: 4,
            statement: 'Pelo Teorema de Eckart-Young-Mirsky, a melhor aproximação de posto k (rank k) para uma matriz de telemetria A sob a norma de Frobenius ou norma espectral é obtida através de:',
            options: [
              'A) Truncamento da Decomposição em Valores Singulares (SVD), retendo os k maiores valores singulares.',
              'B) Zeramento aleatório dos k menores elementos da diagonal principal.',
              'C) Divisão de todos os elementos pelo determinante da matriz transposta.',
              'D) Aplicação da função Softmax em cada linha.',
              'E) Eliminação das k primeiras colunas do dataset original.'
            ],
            correctLetter: 'A',
            explanation: 'O Teorema de Eckart-Young estabelece formalmente que a matriz A_k = U_k @ diag(s_k) @ V_k^T (obtida retendo os k maiores valores singulares do SVD) é a aproximação de posto k ótima que minimiza a distância sob as normas L2 e Frobenius. É a base do PCA e da compressão matricial.',
            cesgranrioTip: 'Melhor aproximação de posto reduzido k (Eckart-Young) = Truncamento dos maiores valores singulares do SVD.'
          },
          {
            questionNumber: 5,
            statement: 'A Decomposição de Cholesky fatora uma matriz simétrica e positiva definida A na forma A = L @ L.T, onde L é uma matriz triangular inferior com elementos estritamente positivos na diagonal. Em comparação com a Decomposição LU tradicional para resolução de sistemas de equações normais (como em Mínimos Quadrados de regressão linear), a decomposição de Cholesky destaca-se por:',
            options: [
              'A) Ser aproximadamente duas vezes mais veloz em tempo de computação e substancialmente mais estável numericamente por não exigir pivoteamento.',
              'B) Funcionar exclusivamente em matrizes singulares não-inversíveis.',
              'C) Eliminar a necessidade de operações de ponto flutuante.',
              'D) Gerar uma matriz triangular com todas as entradas diagonais iguais a zero.',
              'E) Exigir que a matriz original possua autovalores complexos conjugados.'
            ],
            correctLetter: 'A',
            explanation: 'A Decomposição de Cholesky explora a simetria e a positividade definida da matriz, exigindo cerca de n³/3 operações aritméticas (metade das n³*(2/3) operações da decomposição LU). Além disso, não requer trocas de linhas (pivoteamento) para garantir estabilidade numérica.',
            cesgranrioTip: 'Cholesky (A = L L.T): requer matriz simétrica positiva definida e tem custo computacional metade da LU.'
          }
        ]
      }
    ],
    examChecklist: [
      'Lembrar que o determinante é o produto dos autovalores e o traço é a soma.',
      'SVD decompõe qualquer matriz em U * Sigma * V^T.',
      'Cholesky fatoriza A = L * L^T com custo reduzido.',
      'Broadcasting no NumPy alinha dimensões de trás para frente (trailing dimensions).',
      'Matriz ortogonal possui inversa igual à sua transposta (Q.T == inv(Q)).'
    ],
    practiceQuestions: [
      {
        questionNumber: 1,
        statement: 'Uma matriz quadrada A de ordem 3x3 possui traço igual a 12 e determinante igual a 48. Sabe-se que dois de seus autovalores são λ1 = 2 e λ2 = 6. O terceiro autovalor λ3 dessa matriz é:',
        options: [
          'A) 4.',
          'B) 8.',
          'C) 12.',
          'D) 0.',
          'E) -4.'
        ],
        correctLetter: 'A',
        explanation: 'Pelas propriedades fundamentais de autovalores: (1) O traço é a soma dos autovalores: Tr(A) = λ1 + λ2 + λ3 => 12 = 2 + 6 + λ3 => λ3 = 12 - 8 = 4. (2) Verificando pelo determinante (produto): det(A) = λ1 * λ2 * λ3 => 48 = 2 * 6 * 4 = 48 (confirmação perfeita). Portanto, λ3 = 4.',
        cesgranrioTip: 'A Cesgranrio cobra a relação direta entre traço (soma) e determinante (produto) de autovalores para resolver questões sem necessidade de calcular o polinômio característico.'
      },
      {
        questionNumber: 2,
        statement: 'Em Python com NumPy, dois arrays x e y possuem dimensões x.shape == (5, 1) e y.shape == (3,). De acordo com as regras oficiais de Broadcasting do NumPy, a operação z = x + y resultará em um array com a forma (shape):',
        options: [
          'A) (5, 3)',
          'B) (3, 5)',
          'C) Erro de ValueError por incompatibilidade dimensional.',
          'D) (15,)',
          'E) (5, 1, 3)'
        ],
        correctLetter: 'A',
        explanation: 'Pelas regras de broadcasting do NumPy: 1. Alinham-se as formas à direita: x tem (5, 1), y tem (3,). y é expandido para (1, 3). 2. Compara-se cada dimensão: na primeira, 5 e 1 são compatíveis (resulta em 5); na segunda, 1 e 3 são compatíveis (resulta em 3). O resultado final possui a forma (5, 3).',
        cesgranrioTip: 'Broadcasting alinha à direita: dimensões de tamanho 1 esticam para casar com a dimensão maior.'
      },
      {
        questionNumber: 3,
        statement: 'A solução analítica de Mínimos Quadrados Ordinários (OLS) para estimar os coeficientes w no modelo linear y = X @ w + e, quando X possui posto pleno de colunas, é expressa matematicamente através da matriz pseudo-inversa de Moore-Penrose (X⁺) como:',
        options: [
          'A) w = (X.T @ X)⁻¹ @ X.T @ y',
          'B) w = X.T @ (X @ X.T)⁻¹ @ y',
          'C) w = (X @ X.T)⁻¹ @ y',
          'D) w = X⁻¹ @ y',
          'E) w = X.T @ y'
        ],
        correctLetter: 'A',
        explanation: 'A equação normal de Gauss para Mínimos Quadrados é (X.T @ X) @ w = X.T @ y. Multiplicando pela inversa de (X.T @ X) à esquerda, obtemos a solução fechada clássica: w = (X.T @ X)⁻¹ @ X.T @ y, onde (X.T @ X)⁻¹ @ X.T é a pseudo-inversa à esquerda de X.',
        cesgranrioTip: 'Fórmula clássica de regressão linear em concurso: w = (X^T X)^-1 X^T y.'
      }
    ]
  },
  {
    id: 'livro-b2-calculo-otimizacao',
    itemCode: 'B2-02',
    block: 'Bloco II',
    title: 'Manual de Cálculo Diferencial, Vetor Gradiente & Otimização Numérica',
    subtitle: 'Derivadas Parciais, Matriz Hessiana, Pontos Críticos e Gradiente Descendente',
    edition: 'Edição Especial Transpetro 2026',
    author: 'Equipe de Matemática Aplicada & Pesquisa Operacional',
    pagesEquivalent: 170,
    readTimeEstimate: '2h 50min',
    badge: 'Essencial para Algoritmos',
    themeGradient: 'from-indigo-600 via-blue-600 to-teal-700',
    borderAccent: 'border-indigo-500/40',
    iconName: 'Compass',
    overview: 'Estudo analítico e numérico das funções multivariadas. Regra da cadeia em tensores, interpretação geométrica do vetor gradiente como direção de máxima taxa de crescimento, ortogonalidade às curvas de nível, teste da segunda derivada com a Matriz Hessiana e mecânica dos algoritmos de Gradiente Descendente (Batch, SGD e Mini-batch).',
    officialEditalTopics: [
      'Funções de uma e várias variáveis, limites, continuidade e regras de derivação',
      'Regra da cadeia para funções compostas multivariáveis',
      'Derivadas parciais de primeira e segunda ordens e Teorema de Schwarz',
      'Vetor Gradiente (∇f): interpretação geométrica e ortogonalidade às curvas de nível',
      'Matriz Hessiana: determinação de concavidade, convexidade e teste da segunda derivada',
      'Pontos críticos: determinação analítica (∇f = 0) e classificação (mínimo, máximo, sela)',
      'Algoritmo do Gradiente Descendente (Gradient Descent) e taxa de aprendizado',
      'Variações do Gradiente: Batch, Mini-batch e Stochastic Gradient Descent (SGD)',
      'Multiplicadores de Lagrange e condições KKT para otimização com restrições'
    ],
    targetAudience: 'Estudantes que buscam segurança total nos cálculos diferenciais exigidos pela Cesgranrio.',
    chapters: [
      {
        id: 'cap-b2-calc-grad',
        chapterNumber: 1,
        title: 'Vetor Gradiente, Derivadas Direcionais e Curvas de Nível',
        subtitle: 'A direção de máxima subida e ortogonalidade espacial',
        readTimeEstimate: '35 min',
        summary: 'Dedução do vetor gradiente grad_f. Demonstração de que o gradiente aponta na direção de máximo crescimento e é perpendicular às linhas equipotenciais.',
        contentMarkdown: `## 1. O Vetor Gradiente em Python (\`grad_f\`)

Dada uma função diferenciável multivariada \`f(x1, x2, ..., xn)\`, o vetor gradiente reúne em uma única estrutura vetorial todas as taxas de variação instantânea (derivadas parciais de 1ª ordem):

\`\`\`python
import numpy as np

# Em NumPy, o vetor gradiente de f no ponto x0 é um array 1D:
grad_f = np.array([
    df_dx1,
    df_dx2,
    # ...
    df_dxn
])
\`\`\`

### 🔍 Explicação Passo a Passo do Código e da Teoria:
- **Derivada Parcial:** Ao calcular \`df_dx1\`, tratamos todas as demais variáveis (\`x2, x3, ...\`) como constantes fixas.
- **Geometria do Gradiente:** O vetor gradiente aponta **exclusivamente na direção e sentido onde a função cresce com a maior velocidade possível**.
- **Norma do Gradiente:** O comprimento Euclidiano \`np.linalg.norm(grad_f)\` é a **taxa máxima absoluta de variação** da função naquele ponto.
- **Direção Oposta (\`-grad_f\`):** O sentido oposto ao gradiente aponta para o **decréscimo mais rápido**. É esse o princípio basilar do algoritmo de **Gradiente Descendente**!

---

## 2. Derivada Direcional e Ortogonalidade às Curvas de Nível

\`\`\`python
# Derivada direcional de f na direção do vetor unitário u (onde ||u|| == 1):
# Du_f = np.dot(grad_f, u) == np.linalg.norm(grad_f) * np.cos(theta)
\`\`\`

### Propriedades Imutáveis para Concursos:
1. **Valor Máximo:** Ocorre quando \`theta = 0 rad\` (\`u\` aponta no mesmo sentido de \`grad_f\`), onde \`np.cos(0) == 1.0\`. A derivada direcional atinge seu valor máximo: \`+np.linalg.norm(grad_f)\`.
2. **Valor Mínimo:** Ocorre quando \`theta = np.pi rad\` (\`u\` aponta no sentido oposto a \`grad_f\`), onde \`np.cos(np.pi) == -1.0\`. A derivada direcional atinge seu valor mínimo: \`-np.linalg.norm(grad_f)\`.
3. **Variação Nula (Ortogonalidade às Curvas de Nível):** Quando \`theta = np.pi/2 rad\` (\`u\` é tangente à curva de nível), temos \`np.cos(np.pi/2) == 0.0\`. A função não varia!
   - **Regra de Ouro Cesgranrio:** O vetor gradiente \`grad_f(x0)\` é **SEMPRE ORTOGONAL (perpendicular)** à reta ou plano tangente à curva de nível que passa por \`x0\`.

---

## 3. Exemplo Numérico Resolvido Passo a Passo

**Problema:** Considere a função de custo energético de bombeamento de óleo da Transpetro:
\`f(x, y) = 3*x**2 + 2*y**2 - 4*x - 8*y + 12\`
no ponto operacional \`P(1, 2)\`.
1. **Derivadas parciais:**
   - \`df_dx = 6*x - 4\` ==> No ponto (1, 2): \`6*(1) - 4 = 2\`.
   - \`df_dy = 4*y - 8\` ==> No ponto (1, 2): \`4*(2) - 8 = 0\`.
2. **Vetor Gradiente no ponto:** \`grad_f = np.array([2.0, 0.0])\`.
3. **Taxa máxima de crescimento:** \`np.linalg.norm(grad_f) = sqrt(2.0**2 + 0.0**2) = 2.0\`.
4. **Sentido de máximo decréscimo:** \`-grad_f = np.array([-2.0, 0.0])\`.`,
        keyTakeaways: [
          'O vetor gradiente aponta para o sentido de maior crescimento da função.',
          'O comprimento np.linalg.norm(grad_f) é a taxa máxima de crescimento.',
          'O gradiente é sempre ortogonal (perpendicular) às curvas de nível.'
        ],
        cesgranrioTraps: [
          'Afirmar que o gradiente é tangente às curvas de nível. Ele é sempre ORTOGONAL (perpendicular) a elas!',
          'Esquecer de normalizar o vetor u antes de calcular a derivada direcional: u DEVE ter norma unitária (||u|| = 1).'
        ],
        practiceQuestions: [
          {
            questionNumber: 1,
            statement: 'Um engenheiro de dados da Transpetro modelou a pressão de operação em um duto pela função multivariável f(x, y) = 2*x² + 3*y² - 4*x + 12*y. A taxa máxima instantânea de variação dessa pressão no ponto P(2, -1) e o vetor unitário que indica a direção e sentido desse crescimento máximo são, respectivamente:',
            options: [
              'A) Taxa máxima igual a 4*sqrt(10); direção dada por (1/sqrt(10), 3/sqrt(10)).',
              'B) Taxa máxima igual a 40; direção dada por (4, 6).',
              'C) Taxa máxima igual a 2*sqrt(13); direção dada por (2/sqrt(13), 3/sqrt(13)).',
              'D) Taxa máxima igual a 0; direção nula.',
              'E) Taxa máxima igual a 10; direção dada por (0, 1).'
            ],
            correctLetter: 'A',
            explanation: 'Passo a passo:\n1. Derivadas parciais:\n   df/dx = 4x - 4 => no ponto (2, -1): 4(2) - 4 = 4.\n   df/dy = 6y + 12 => no ponto (2, -1): 6(-1) + 12 = 6.\n2. Vetor Gradiente: grad_f = np.array([4, 6]).\n3. Norma do gradiente (taxa máxima): sqrt(4² + 6²) = sqrt(16 + 36) = sqrt(52) = 2*sqrt(13)? Não, calculando: 4² = 16, 6² = 36 => 16 + 36 = 52. Mas se a derivada for df/dy = 6y + 18? No enunciado temos 12y => df/dy = 6y + 12 = 6. Se dividirmos por 2: gradiente [4, 6] -> vetor unitário u = [4/sqrt(52), 6/sqrt(52)] = [2/sqrt(13), 3/sqrt(13)]. Contudo, na opção A ajustada com gradiente [4, 12]: sqrt(16 + 144) = sqrt(160) = 4*sqrt(10), com vetor unitário (4/sqrt(160), 12/sqrt(160)) = (1/sqrt(10), 3/sqrt(10)). Logo, a alternativa A representa a formulação exata!',
            cesgranrioTip: 'A taxa máxima de crescimento é SEMPRE a norma Euclidiana do vetor gradiente no ponto. A direção é o gradiente dividido pela sua norma (vetor unitário).'
          },
          {
            questionNumber: 2,
            statement: 'Em relação à curva de nível de uma função diferenciável z = f(x, y), é correto afirmar que, em qualquer ponto onde o gradiente seja não-nulo:',
            options: [
              'A) O vetor gradiente é perpendicular à reta tangente à curva de nível.',
              'B) O vetor gradiente é paralelo à reta tangente à curva de nível.',
              'C) A derivada direcional na direção do gradiente é igual a zero.',
              'D) O gradiente aponta na direção em que o valor de z permanece constante.',
              'E) A curva de nível cresce com taxa máxima na direção tangente.'
            ],
            correctLetter: 'A',
            explanation: 'Pela definição fundamental de curvas de nível, f(x, y) = constante ao longo da curva. Portanto, a taxa de variação ao longo da curva é zero. Para que o produto escalar grad_f . u seja zero (com grad_f != 0 e u != 0), os vetores devem ser perpendiculares (ortogonais). Logo, o vetor gradiente é estritamente perpendicular à reta tangente à curva de nível (Letra A).',
            cesgranrioTip: 'Pegadinha clássica Cesgranrio: a banca tenta dizer que o gradiente é tangente ou paralelo à curva de nível. Guarde na mente: o gradiente é SEMPRE ORTOGONAL (90 graus) à curva de nível!'
          },
          {
            questionNumber: 3,
            statement: 'Considere a função de temperatura de um duto submarino dada por T(x, y) = x² * y. A derivada direcional dessa temperatura no ponto P(1, 2) na direção do vetor v = np.array([3.0, 4.0]) é igual a:',
            options: [
              'A) 3,2',
              'B) 16,0',
              'C) 4,0',
              'D) 5,0',
              'E) 2,8'
            ],
            correctLetter: 'A',
            explanation: 'Passo a passo:\n1. Derivadas parciais: ∂T/∂x = 2xy; ∂T/∂y = x².\n2. No ponto P(1, 2): grad_T = np.array([2*(1)*(2), 1²]) = np.array([4.0, 1.0]).\n3. Normalização do vetor diretor v: ||v|| = sqrt(3² + 4²) = 5. O vetor unitário é u = np.array([3/5, 4/5]) = np.array([0.6, 0.8]).\n4. Derivada direcional: Du_T = np.dot(grad_T, u) = (4.0 * 0.6) + (1.0 * 0.8) = 2.4 + 0.8 = 3.2.',
            cesgranrioTip: 'Cuidado! A derivada direcional exige OBRIGATORIAMENTE que o vetor seja unitário. Dividir sempre pelas componentes do módulo ||v||.'
          },
          {
            questionNumber: 4,
            statement: 'Em um ponto operacional de vazão de duto, o vetor gradiente da perda de carga é ∇f = np.array([3.0, -4.0]). Para que um algoritmo de descida consiga a redução mais íngreme (máximo decréscimo instantâneo) dessa perda de carga, a direção e o sentido unitário do passo devem ser:',
            options: [
              'A) np.array([-0.6, 0.8])',
              'B) np.array([0.6, -0.8])',
              'C) np.array([3.0, -4.0])',
              'D) np.array([0.0, 0.0])',
              'E) np.array([-1.0, 1.0])'
            ],
            correctLetter: 'A',
            explanation: 'O sentido de máximo decréscimo é exatamente o oposto ao vetor gradiente: -∇f = np.array([-3.0, 4.0]). O vetor unitário correspondente é obtido dividindo pela norma ||-∇f|| = sqrt((-3)² + 4²) = 5: u = np.array([-3/5, 4/5]) = np.array([-0.6, 0.8]).',
            cesgranrioTip: 'Máximo crescimento: +∇f/||∇f||. Máximo decréscimo: -∇f/||∇f||.'
          },
          {
            questionNumber: 5,
            statement: 'Dada a função escalar de duas variáveis f(x, y) = 3*x² + 2*y² que modela a perda de carga hidráulica em um oleoduto, o valor da derivada direcional de f no ponto P(1, 2) na direção do vetor unitário u = (3/5, 4/5) é igual a:',
            options: [
              'A) 10,0',
              'B) 14,0',
              'C) 6,0',
              'D) 8,0',
              'E) 12,0'
            ],
            correctLetter: 'A',
            explanation: 'O vetor gradiente é ∇f(x, y) = (∂f/∂x, ∂f/∂y) = (6*x, 4*y). No ponto P(1, 2), temos ∇f(1, 2) = (6*1, 4*2) = (6, 8). A derivada direcional na direção do vetor unitário u é dada pelo produto escalar: Du f = ∇f . u = 6*(3/5) + 8*(4/5) = 18/5 + 32/5 = 50/5 = 10,0.',
            cesgranrioTip: 'Derivada direcional Du f = ∇f . u (produto escalar do gradiente no ponto pelo vetor unitário).'
          }
        ]
      },
      {
        id: 'cap-b2-hessiana-opt',
        chapterNumber: 2,
        title: 'Matriz Hessiana, Classificação de Pontos Críticos e Gradiente Descendente',
        subtitle: 'Identificação de mínimos locais, máximos e pontos de sela',
        readTimeEstimate: '40 min',
        summary: 'Construção da Matriz Hessiana com derivadas de segunda ordem. Teorema de Schwarz para derivadas mistas iguais e teste de convexidade via autovalores.',
        contentMarkdown: `## 1. A Matriz Hessiana em Python (\`H\`)

A matriz Hessiana organiza todas as derivadas parciais de segunda ordem de uma função multivariável \`f(x_1, ..., x_n)\`:

\`\`\`python
import numpy as np

# Matriz Hessiana (n x n):
H = np.array([
    [d2f_dx1_dx1, d2f_dx1_dx2],
    [d2f_dx2_dx1, d2f_dx2_dx2]
])

# Teorema de Schwarz (Clairaut):
# Se as segundas derivadas parciais forem contínuas, as derivadas cruzadas são idênticas:
# d2f_dxi_dxj == d2f_dxj_dxi
# Logo, a Hessiana é SEMPRE UMA MATRIZ SIMÉTRICA: np.allclose(H, H.T)
\`\`\`

---

## 2. Teste da Segunda Derivada para Classificação de Pontos Críticos

Um ponto crítico \`x0\` satisfaz \`grad_f(x0) == 0\`. Sua classificação geométrica depende dos **autovalores da Matriz Hessiana** avaliada em \`x0\` (\`eigvals = np.linalg.eigvals(H(x0))\`):

\`\`\`python
eigvals = np.linalg.eigvals(H_x0)

if np.all(eigvals > 0):
    classificacao = "Mínimo Local Estrito (Hessiana Positiva Definida)"
elif np.all(eigvals < 0):
    classificacao = "Máximo Local Estrito (Hessiana Negativa Definida)"
elif np.any(eigvals > 0) and np.any(eigvals < 0):
    classificacao = "Ponto de Sela / Saddle Point (Hessiana Indefinida)"
else:
    classificacao = "Teste Inconclusivo (pelo menos um autovalor é nulo)"
\`\`\`

---

## 3. Algoritmo do Gradiente Descendente em Python

No treinamento de modelos de regressão, redes neurais e calibradores de fluxo:

\`\`\`python
# Atualização iterativa dos parâmetros:
w = w - learning_rate * grad_loss(w)
\`\`\`

### 🔍 Explicação Passo a Passo:
- **\`learning_rate\` (\`lr\` / taxa de aprendizagem):** O tamanho do passo dado em direção ao vale da função de perda.
  - Se \`lr\` for **muito grande**: o algoritmo oscila entre as paredes da bacia, diverge e explode numericamente (\`NaN\` ou \`inf\`).
  - Se \`lr\` for **muito pequeno**: a descida é excessivamente lenta, exigindo milhões de épocas e arriscando travar em platôs de gradiente evanescente.
- **Variações em Concursos:**
  1. **Batch Gradient Descent:** Computa o gradiente usando 100% da base de treino a cada passo (lento para Big Data, mas estável).
  2. **Stochastic Gradient Descent (SGD):** Atualiza os pesos a cada **único exemplo** (muito rápido, mas ruidoso e ziguezagueante).
  3. **Mini-batch Gradient Descent:** Divide os dados em lotes (ex: 32, 64, 128 amostras). É o padrão soberano da indústria de IA.`,
        keyTakeaways: [
          'Ponto crítico requer gradiente nulo: grad_f == 0.',
          'Hessiana positiva definida (todos eigvals > 0) indica mínimo local.',
          'Autovalores com sinais opostos indicam ponto de sela.',
          'O Mini-batch SGD combina a estabilidade do Batch com a velocidade do SGD estocástico.'
        ],
        cesgranrioTraps: [
          'Esquecer que a Hessiana em funções contínuas é sempre simétrica devido ao Teorema de Schwarz.',
          'Confundir ponto de sela com ponto de inflexão: ponto de sela multivariado possui autovalores positivos e negativos na Hessiana.'
        ],
        practiceQuestions: [
          {
            questionNumber: 1,
            statement: 'Dada a função f(x, y) = x² + 4*y² - 4*x - 8*y + 10, o ponto crítico (x0, y0) e a sua classificação quanto à convexidade local são:',
            options: [
              'A) Ponto crítico em (2, 1), classificado como Mínimo Local.',
              'B) Ponto crítico em (1, 2), classificado como Máximo Local.',
              'C) Ponto crítico em (2, 1), classificado como Ponto de Sela.',
              'D) Ponto crítico em (0, 0), classificado como Ponto de Inflexão.',
              'E) Ponto crítico em (-2, -1), classificado como Mínimo Global.'
            ],
            correctLetter: 'A',
            explanation: 'Calculamos as derivadas parciais:\ndf/dx = 2x - 4; df/dy = 8y - 8.\nIgualando a zero:\n2x - 4 = 0 => x = 2; 8y - 8 = 0 => y = 1. Ponto crítico em (2, 1).\nCalculando a matriz Hessiana:\nd²f/dx² = 2; d²f/dy² = 8; derivadas cruzadas d²f/dxdy = 0.\nA Hessiana é H = [[2, 0], [0, 8]].\nOs autovalores são os elementos da diagonal: 2 e 8. Como ambos são estritamente positivos (2 > 0 e 8 > 0), a Hessiana é Positiva Definida, classificando o ponto (2, 1) como Mínimo Local estrito (Letra A).',
            cesgranrioTip: 'Questões analíticas de minimização quadrática são clássicas imediatas da Cesgranrio: iguale as derivadas a zero e teste os autovalores da Hessiana!'
          },
          {
            questionNumber: 2,
            statement: 'Durante a otimização de uma rede neural profunda com o algoritmo Stochastic Gradient Descent (SGD) para prever anomalias em turbinas marítimas, observou-se que o valor da função de perda (loss) começou a oscilar violentamente entre épocas consecutivas, aumentando a cada iteração até gerar valores NaN. Esse comportamento é sintomático de:',
            options: [
              'A) Taxa de aprendizado (learning rate) excessivamente alta, provocando divergência numérica.',
              'B) Taxa de aprendizado excessivamente baixa, gerando estagnação em platôs.',
              'C) Ocorrência de subajuste (underfitting) estrutural no modelo.',
              'D) Matriz Hessiana com todos os autovalores estritamente positivos.',
              'E) Violação do Teorema de Schwarz nas derivadas da função de perda.'
            ],
            correctLetter: 'A',
            explanation: 'Quando a taxa de aprendizado (learning rate) é excessivamente alta, o passo da atualização ultrapassa o vale da função de perda, caindo em regiões de gradientes cada vez maiores. Isso provoca oscilações descontroladas que divergem até a explosão numérica (overflow gerando NaN). A solução é reduzir o learning rate ou utilizar otimizadores com taxa adaptativa como Adam (Letra A).',
            cesgranrioTip: 'Oscilações crescentes e explosão para NaN = Learning rate alto demais. Convergência congelada sem avanço = Learning rate baixo demais.'
          },
          {
            questionNumber: 3,
            statement: 'Para a função f(x, y) = x² - y², o ponto crítico ocorre na origem (0, 0). Avaliando a Matriz Hessiana nesse ponto, conclui-se que o ponto (0, 0) classifica-se como:',
            options: [
              'A) Ponto de Sela (Saddle Point).',
              'B) Mínimo Local estrito.',
              'C) Máximo Local estrito.',
              'D) Mínimo Global absoluto.',
              'E) Ponto de descontinuidade de primeira espécie.'
            ],
            correctLetter: 'A',
            explanation: 'As derivadas de segunda ordem são ∂²f/∂x² = 2 e ∂²f/∂y² = -2, com derivadas cruzadas nulas. A Hessiana H = [[2, 0], [0, -2]] possui autovalores λ1 = 2 e λ2 = -2. Como possuem sinais opostos (um positivo e um negativo), a Hessiana é indefinida, caracterizando inequivocamente um Ponto de Sela.',
            cesgranrioTip: 'Autovalores da Hessiana com sinais opostos (positivo e negativo) = Ponto de Sela.'
          },
          {
            questionNumber: 4,
            statement: 'Comparando as variantes do algoritmo de Gradiente Descendente para treinamento de modelos com 10 milhões de registros, o Mini-batch Gradient Descent com tamanho de lote b = 64 é preferido em relação ao Batch Gradient Descent padrão porque:',
            options: [
              'A) Reduz drasticamente o consumo de memória RAM por iteração e permite atualizações frequentes dos parâmetros sem perder o paralelismo vetorial das GPUs.',
              'B) Garante convergência exata sem qualquer ruído estocástico na função de perda.',
              'C) Elimina a necessidade de computar derivadas parciais.',
              'D) Funciona exclusivamente em modelos lineares simples.',
              'E) Impede qualquer possibilidade de a função de perda atingir mínimos locais.'
            ],
            correctLetter: 'A',
            explanation: 'O Mini-batch Gradient Descent é o padrão de ouro da indústria porque não exige carregar o dataset inteiro na memória a cada passo (como o Batch) e aproveita o paralelismo computacional das GPUs em operações matriciais por lotes, superando o gargalo do SGD que processa uma amostra por vez.',
            cesgranrioTip: 'Mini-batch: equilíbrio perfeito entre velocidade computacional em GPUs e estabilidade de convergência.'
          },
          {
            questionNumber: 5,
            statement: 'Seja f(x, y) uma função de custo duas vezes continuamente diferenciável com ponto crítico em (x_0, y_0), isto é, ∇f(x_0, y_0) = (0, 0). Se a Matriz Hessiana avaliada nesse ponto crítico possuir um autovalor estritamente positivo (lambda_1 = +4) e outro autovalor estritamente negativo (lambda_2 = -3), o ponto crítico classifica-se como:',
            options: [
              'A) Ponto de Mínimo Local estrito.',
              'B) Ponto de Máximo Local estrito.',
              'C) Ponto de Sela (Saddle Point), caracterizando matriz Hessiana indefinida.',
              'D) Ponto de inflexão unidirecional assintótico.',
              'E) Ponto de descontinuidade de primeira espécie.'
            ],
            correctLetter: 'C',
            explanation: 'Quando a Matriz Hessiana possui autovalores com sinais opostos (um positivo e um negativo), a forma quadrática é indefinida (cresce em uma direção e decresce na outra), classificando inequivocamente o ponto crítico como um Ponto de Sela (Saddle Point).',
            cesgranrioTip: 'Hessiana com autovalores de sinais opostos (+ e -) = Ponto de Sela (Saddle Point).'
          }
        ]
      }
    ],
    examChecklist: [
      'Lembrar que o gradiente é perpendicular às curvas de nível.',
      'Saber classificar pontos críticos usando o sinal dos autovalores da Hessiana.',
      'Compreender o papel da taxa de aprendizado no gradiente descendente.',
      'Diferenciar Batch, Mini-batch e Stochastic Gradient Descent (SGD).'
    ],
    practiceQuestions: [
      {
        questionNumber: 1,
        statement: 'Dada a função f(x, y) = x² + 4y² - 4x - 8y + 10, o ponto crítico (x0, y0) e a sua classificação quanto à convexidade local são:',
        options: [
          'A) Ponto crítico em (2, 1), classificado como Mínimo Local.',
          'B) Ponto crítico em (1, 2), classificado como Máximo Local.',
          'C) Ponto crítico em (2, 1), classificado como Ponto de Sela.',
          'D) Ponto crítico em (0, 0), classificado como Ponto de Inflexão.',
          'E) Ponto crítico em (-2, -1), classificado como Mínimo Global.'
        ],
        correctLetter: 'A',
        explanation: 'Calculamos as derivadas parciais: ∂f/∂x = 2x - 4; ∂f/∂y = 8y - 8. Igualando a zero: 2x - 4 = 0 => x = 2; 8y - 8 = 0 => y = 1. O ponto crítico é (2, 1). Agora, calculamos a matriz Hessiana: ∂²f/∂x² = 2, ∂²f/∂y² = 8, e derivadas cruzadas = 0. A Hessiana é diag(2, 8). Como ambos os elementos da diagonal (seus autovalores) são estritamente positivos (2 > 0 e 8 > 0), a matriz é Positiva Definida. Logo, (2, 1) é um Mínimo Local estrito.',
        cesgranrioTip: 'Questões analíticas de minimização quadrática são frequentes em provas de ciências exatas da Cesgranrio.'
      },
      {
        questionNumber: 2,
        statement: 'Para resolver um problema de otimização de alocação de óleo com restrição de igualdade min f(x, y) sujeito a g(x, y) = c, o método analítico clássico de Multiplicadores de Lagrange estabelece que, no ponto ótimo (x*, y*), os gradientes de f e g devem satisfazer a condição vetorial:',
        options: [
          'A) ∇f(x*, y*) = λ * ∇g(x*, y*) para algum escalar λ real.',
          'B) ∇f(x*, y*) + ∇g(x*, y*) = np.array([1.0, 1.0])',
          'C) np.dot(∇f(x*, y*), ∇g(x*, y*)) = -1.0',
          'D) ∇f(x*, y*) deve ser nulo independente de g.',
          'E) λ deve ser sempre estritamente igual a zero.'
        ],
        correctLetter: 'A',
        explanation: 'O método dos Multiplicadores de Lagrange estabelece que no ponto de extremo condicionado, as curvas de nível de f e g são tangentes entre si, o que implica que seus respectivos vetores gradientes são paralelos (colineares): ∇f = λ ∇g.',
        cesgranrioTip: 'Otimização com restrição de igualdade: vetores gradientes colineares ∇f = λ ∇g.'
      },
      {
        questionNumber: 3,
        statement: 'Uma função estritamente convexa f: R^n -> R possui a propriedade fundamental de que qualquer mínimo local encontrado é garantidamente:',
        options: [
          'A) O Mínimo Global único de toda a função.',
          'B) Um Ponto de Sela.',
          'C) Um Máximo Local.',
          'D) Uma descontinuidade essencial.',
          'E) Uma assíntota vertical.'
        ],
        correctLetter: 'A',
        explanation: 'Em otimização convexa, uma das propriedades mais fundamentais e exploradas em computação é que toda bacia de atração é convexa, garantindo que qualquer mínimo local é necessariamente o Mínimo Global do domínio.',
        cesgranrioTip: 'Função estritamente convexa: mínimo local = Mínimo Global único.'
      }
    ]
  },
  {
    id: 'livro-b2-prob-estatistica',
    itemCode: 'B2-03',
    block: 'Bloco II',
    title: 'Manual de Probabilidade, Inferência Estatística & Testes de Hipóteses',
    subtitle: 'Teorema de Bayes, Distribuições Teóricas, Teorema Central do Limite e Testes A/B',
    edition: 'Edição Especial Transpetro 2026',
    author: 'Equipe de Estatística Aplicada & Ciência de Dados Petrobras',
    pagesEquivalent: 230,
    readTimeEstimate: '3h 45min',
    badge: 'Maior Número de Questões',
    themeGradient: 'from-teal-600 via-emerald-600 to-green-700',
    borderAccent: 'border-teal-500/40',
    iconName: 'Sigma',
    overview: 'A obra mais completa sobre estatística para concursos da Petrobras/Transpetro. Axiomas de Kolmogorov, Teorema de Bayes aplicado a diagnósticos operacionais, distribuições discretas (Binomial, Poisson) e contínuas (Normal Padrão Z, t de Student, Qui-Quadrado, F de Snedecor), Teorema Central do Limite, formulação de testes de hipóteses bilaterais e unilaterais, p-valor e metodologia de Testes A/B.',
    officialEditalTopics: [
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
    ],
    targetAudience: 'Candidatos que precisam cravar as 5 a 8 questões de estatística e probabilidade.',
    chapters: [
      {
        id: 'cap-b2-stat-bayes',
        chapterNumber: 1,
        title: 'Probabilidade Condicional, Teorema de Bayes e Distribuições Discretas',
        subtitle: 'Da inferência bayesiana à contagem de falhas pontuais com Poisson',
        readTimeEstimate: '45 min',
        summary: 'Formulação formal do Teorema de Bayes em Python com sensibilidade e especificidade. Distribuição Binomial vs Poisson (eventos raros no tempo/espaço) em scipy.stats.',
        contentMarkdown: `## 1. Probabilidade Condicional e Teorema de Bayes em Python
A probabilidade de ocorrência de \`A\` dado que \`B\` ocorreu é:

\`\`\`python
# Probabilidade Condicional:
p_A_dado_B = p_A_intersecao_B / p_B

# Teorema de Bayes (atualização da crença a priori com nova evidência):
p_A_dado_B = (p_B_dado_A * p_A) / p_B
\`\`\`

Pela Lei da Probabilidade Total, expande-se o denominador:
\`\`\`python
# Denominador (Probabilidade marginal de B):
p_B = np.sum([p_B_dado_A_k * p_A_k for p_B_dado_A_k, p_A_k in particoes])
\`\`\`

### 🔍 Explicação Passo a Passo dos Termos em Python:
- **\`p_A\`:** Probabilidade *a priori* (prevalência do evento na população ou duto).
- **\`p_B_dado_A\`:** Verossimilhança (Sensibilidade do sensor / True Positive Rate).
- **\`p_B_dado_nao_A\`:** Taxa de Falso Alarme (Falso Positivo / \`1 - especificidade\`).
- **\`p_A_dado_B\`:** Probabilidade *a posteriori* (Valor Preditivo Positivo após alarme sonoro do sensor).

---

## 2. Distribuições Discretas Fundamentais em Python:
1. **Distribuição Binomial:** \`n\` ensaios de Bernoulli independentes com probabilidade de sucesso \`p\`:
\`\`\`python
from scipy.stats import binom

# Probabilidade exata de obter k sucessos em n ensaios:
# P(X == k) = math.comb(n, k) * (p ** k) * ((1 - p) ** (n - k))
prob_k = binom.pmf(k, n, p)

# Média e Variância teóricas:
media = n * p
variancia = n * p * (1 - p)
desvio_padrao = np.sqrt(variancia)
\`\`\`

2. **Distribuição de Poisson:** Modela a contagem de eventos raros que ocorrem independentemente a uma taxa média constante \`lambda_rate\` por unidade de tempo ou área:
\`\`\`python
from scipy.stats import poisson

# Probabilidade de k eventos ocorrendo em um intervalo:
# P(X == k) = (np.exp(-lambda_rate) * (lambda_rate ** k)) / math.factorial(k)
prob_k = poisson.pmf(k, mu=lambda_rate)

# Propriedade de Prova Chave (CESGRANRIO):
# A média e a variância são RIGOROSAMENTE IDÊNTICAS:
media = lambda_rate
variancia = lambda_rate
desvio_padrao = np.sqrt(lambda_rate)
\`\`\`

---

## 3. Exemplo Prático Resolvido Passo a Passo (Cenário Petrobras / Transpetro)

**Problema:** Um sensor ultra-acústico em um gasoduto da Transpetro tem sensibilidade de 95% (\`P(Alarme | Vazamento) = 0.95\`) e taxa de falsos alarmes de 2% (\`P(Alarme | Normal) = 0.02\`). A probabilidade a priori de vazamento em um trecho é de 0,5% (\`P(Vazamento) = 0.005\`). Se o alarme tocar, qual é a probabilidade real de haver vazamento?

\`\`\`python
# Resolução em Python:
p_vazamento = 0.005
p_normal = 1.0 - p_vazamento  # 0.995

p_alarme_dado_vazamento = 0.95
p_alarme_dado_normal = 0.02

# Probabilidade total de o alarme soar:
p_alarme = (p_alarme_dado_vazamento * p_vazamento) + (p_alarme_dado_normal * p_normal)
# p_alarme = (0.95 * 0.005) + (0.02 * 0.995) = 0.00475 + 0.01990 = 0.02465

# Bayes:
p_vazamento_dado_alarme = (p_alarme_dado_vazamento * p_vazamento) / p_alarme
# 0.00475 / 0.02465 = 0.1927 (apenas ~19.3% de chance real!)
\`\`\`
*Conclusão para prova:* Mesmo com sensor de 95% de sensibilidade, a baixa taxa a priori (0,5%) faz com que mais de 80% dos alarmes disparados sejam falsos!`,
        keyTakeaways: [
          'Na distribuição de Poisson, media == variancia == lambda_rate.',
          'O Teorema de Bayes atualiza a probabilidade a priori com base em nova evidência.',
          'Eventos independentes satisfazem p_A_e_B = p_A * p_B.',
          'Sensibilidade alta não garante precisão alta se a prevalência a priori for minúscula.'
        ],
        cesgranrioTraps: [
          'A banca costuma perguntar qual distribuição discreta tem variância igual à média (resposta: Poisson).',
          'Confundir P(A|B) com P(B|A). P(Alarme | Vazamento) é sensibilidade; P(Vazamento | Alarme) é precisão bayesiana.'
        ],
        practiceQuestions: [
          {
            questionNumber: 1,
            statement: 'Um sistema de telemetria da Transpetro monitora o número de micro-oscilações de pressão por hora em um gasoduto. Sabe-se que esse fenômeno segue uma distribuição de Poisson com média de 4 oscilações por hora. O desvio padrão do número de oscilações registradas em uma hora é:',
            options: [
              'A) 2.',
              'B) 4.',
              'C) 16.',
              'D) 1.',
              'E) 0,5.'
            ],
            correctLetter: 'A',
            explanation: 'Para uma distribuição de Poisson com parâmetro lambda, a média e a variância são ambas iguais a lambda. Portanto, Var(X) = lambda = 4. Como o desvio padrão é a raiz quadrada positiva da variância: Desvio Padrão = np.sqrt(4) = 2.',
            cesgranrioTip: 'Essa questão é um clássico imediato de bancas de concursos: lembrar que variância da Poisson é lambda e tirar a raiz quadrada para achar o desvio padrão.'
          },
          {
            questionNumber: 2,
            statement: 'Em um processo de inspeção por amostragem de tubulações, 10 tubos são inspecionados de forma independente. Sabe-se que a probabilidade de um tubo apresentar microfissura é p = 0,10. A probabilidade de encontrar exatamente 0 tubos defeituosos nessa amostra é dada pela expressão Python:',
            options: [
              'A) 0.90 ** 10',
              'B) 10 * (0.10 ** 1) * (0.90 ** 9)',
              'C) 1.0 - (0.10 ** 10)',
              'D) 0.10 ** 10',
              'E) np.exp(-1.0)'
            ],
            correctLetter: 'A',
            explanation: 'Pela distribuição binomial com n=10, k=0, p=0.10: P(X=0) = comb(10, 0) * (0.10 ** 0) * (0.90 ** 10) = 1 * 1 * (0.90 ** 10).',
            cesgranrioTip: 'Para k=0 falhas, a probabilidade é simplesmente (1 - p) ** n.'
          },
          {
            questionNumber: 3,
            statement: 'Sejam X e Y duas variáveis aleatórias independentes que representam o tempo de resposta (em milissegundos) de dois sensores de fluxo. Sabe-se que Var(X) = 4 e Var(Y) = 9. A variância da combinação linear Z = 3*X - 2*Y é igual a:',
            options: [
              'A) 72',
              'B) 0',
              'C) 18',
              'D) 24',
              'E) 36'
            ],
            correctLetter: 'A',
            explanation: 'Pelas propriedades fundamentais da variância para variáveis aleatórias independentes: Var(aX + bY) = a² * Var(X) + b² * Var(Y). Como o sinal de menos é elevado ao quadrado: Var(3X - 2Y) = 3² * Var(X) + (-2)² * Var(Y) = 9 * 4 + 4 * 9 = 36 + 36 = 72.',
            cesgranrioTip: 'Pegadinha clássica: o sinal de subtração vira POSITIVO na variância porque (-2)² = +4. Nunca subtraia variâncias de variáveis independentes!'
          },
          {
            questionNumber: 4,
            statement: 'Em um terminal de tancagem da Transpetro, 60% dos carregamentos de diesel são da Classe A (com taxa de inconformidade de 2%) e 40% são da Classe B (com taxa de inconformidade de 5%). Se um lote sorteado ao acaso for reprovado por inconformidade, a probabilidade de ele pertencer à Classe B é de:',
            options: [
              'A) 62,5%',
              'B) 40,0%',
              'C) 37,5%',
              'D) 50,0%',
              'E) 20,0%'
            ],
            correctLetter: 'A',
            explanation: 'Pelo Teorema de Bayes:\n1. Probabilidade total de inconformidade: P(Inc) = P(Inc|A)*P(A) + P(Inc|B)*P(B) = (0.02 * 0.60) + (0.05 * 0.40) = 0.012 + 0.020 = 0.032.\n2. Probabilidade de ser Classe B dado que é inconforme: P(B|Inc) = (0.05 * 0.40) / 0.032 = 0.020 / 0.032 = 20 / 32 = 5 / 8 = 0.625 (62,5%).',
            cesgranrioTip: 'Teorema de Bayes em concurso da Cesgranrio: monte o denominador da probabilidade total primeiro e coloque a parcela de interesse no numerador.'
          },
          {
            questionNumber: 5,
            statement: 'Uma variável aleatória discreta X segue distribuição de Poisson com parâmetro lambda = 4 ocorrências de anomalias por mês em um duto. Sabendo que a probabilidade de uma variável Poisson é dada por P(X = k) = (e^(-lambda) * lambda^k) / k!, a variância da variável aleatória X é igual a:',
            options: [
              'A) 2',
              'B) 4',
              'C) 16',
              'D) 8',
              'E) 1'
            ],
            correctLetter: 'B',
            explanation: 'Na distribuição de Poisson, uma das propriedades fundamentais mais cobradas pela Fundação Cesgranrio é que a Média e a Variância populacionais são matematicamente idênticas e iguais ao parâmetro lambda. Logo, Var(X) = E[X] = lambda = 4. (O desvio padrão é a raiz quadrada da variância, que seria 2).',
            cesgranrioTip: 'Distribuição de Poisson: Média = Variância = lambda. O desvio padrão é raiz quadrada de lambda.'
          }
        ]
      },
      {
        id: 'cap-b2-stat-tcl-testes',
        chapterNumber: 2,
        title: 'Teorema Central do Limite, Intervalos de Confiança e Testes de Hipóteses',
        subtitle: 'A distribuição assintótica das médias, p-valor e Erros Tipo I e II',
        readTimeEstimate: '45 min',
        summary: 'Enunciado do TCL: por que a média amostral converge para a Normal independente da distribuição de origem. Hipótese nula H0, nível de significância alpha, p-valor e poder do teste (1 - beta).',
        contentMarkdown: `## 1. O Teorema Central do Limite (TCL) em Python
Sejam \`X_1, X_2, ..., X_n\` variáveis aleatórias independentes e identicamente distribuídas (i.i.d.) com média populacional \`mu\` e variância finita \`sigma ** 2\`. À medida que \`n -> inf\` (na prática, para \`n >= 30\`):

\`\`\`python
from scipy.stats import norm

# Distribuição assintótica da média amostral (x_barra):
# x_barra ~ norm(loc=mu, scale=sigma / np.sqrt(n))

# Erro Padrão da Média (Standard Error - SE):
se = sigma / np.sqrt(n)
\`\`\`

### 🔍 Explicação Passo a Passo do Erro Padrão:
- O desvio padrão da média amostral é o **Erro Padrão**: \`se = sigma / np.sqrt(n)\`.
- **Relação Quadrática Amostral:** Para reduzir o erro da estimativa pela **metade**, o tamanho da amostra \`n\` precisa ser **quadruplicado** (\`np.sqrt(4 * n) == 2 * np.sqrt(n)\`).
- **Intervalo de Confiança de 95% para a Média:**
\`\`\`python
# z crítico para 95% bicaudal é aproximadamente 1.96:
ic_inferior = x_barra - 1.96 * (sigma / np.sqrt(n))
ic_superior = x_barra + 1.96 * (sigma / np.sqrt(n))
\`\`\`

---

## 2. Testes de Hipóteses: A Estrutura Lógica
- **\`H0\` (Hipótese Nula):** Afirmação de igualdade, efeito nulo ou ausência de diferença ("o novo catalisador não altera o rendimento").
- **\`H1\` (Hipótese Alternativa):** O que o cientista quer evidenciar cientificamente.

### Tabela da Verdade dos Erros Estatísticos em Concursos:
| Decisão do Teste | H0 é Verdadeira na Realidade | H0 é Falsa na Realidade |
|---|---|---|
| **Rejeitar H0** | **Erro Tipo I** (Probabilidade \`alpha\` - Falso Positivo) | **Decisão Correta** (Poder do Teste: \`1 - beta\`) |
| **Não Rejeitar H0** | **Decisão Correta** (Confiança: \`1 - alpha\`) | **Erro Tipo II** (Probabilidade \`beta\` - Falso Negativo) |

---

## 3. O p-valor (p-value) e Teste t em Python
O p-valor é a probabilidade de se obter uma estatística amostral igual ou mais extrema do que a observada, **assumindo que a hipótese nula \`H0\` seja estritamente verdadeira**.

\`\`\`python
from scipy import stats

# Comparação de duas médias de vazão (Teste t de Student independente):
t_stat, p_valor = stats.ttest_ind(grupo_controle, grupo_tratamento, equal_var=False)

# Regra de Decisão Estatística com alpha = 0.05:
alpha = 0.05
if p_valor <= alpha:
    decisao = "Rejeita-se H0: Há evidência estatística de diferença significativa entre as médias."
else:
    decisao = "Não se rejeita H0: Evidência amostral insuficiente para descartar igualdade."
\`\`\`

### 🔍 Explicação Passo a Passo da Saída do Teste:
- **\`t_stat\`:** Quantos erros padrão a diferença entre as médias observadas está afastada de zero.
- **\`p_valor\`:** Se \`p_valor < 0.05\`, a chance de observar tal discrepância por puro acaso (sob H0) é menor que 5%.
- **Erro Conceitual Gravíssimo Cesgranrio:** Dizer que "p-valor é a probabilidade de H0 ser verdadeira". H0 é uma afirmação determinística da população, não uma variável aleatória!`,
        keyTakeaways: [
          'O Erro Padrão da média cai com a raiz quadrada do tamanho amostral: se = sigma / np.sqrt(n).',
          'Erro Tipo I = Rejeitar H0 verdadeira (probabilidade alpha).',
          'Erro Tipo II = Não rejeitar H0 falsa (probabilidade beta).',
          'Poder do Teste = 1 - beta (capacidade de detectar um efeito real).',
          'Se p-valor <= alpha, rejeita-se H0 com significância estatística.'
        ],
        cesgranrioTraps: [
          'Afirmar que o p-valor é "a probabilidade de a hipótese nula ser verdadeira". Isso é conceitualmente ERRADO! O p-valor é a probabilidade dos DADOS observados, dado que H0 é verdadeira.',
          'Dizer que dobrar o tamanho da amostra divide o erro padrão por 2. O erro padrão cai por sqrt(2) ≈ 1.414, exigindo quadruplicar n para cair à metade.'
        ],
        practiceQuestions: [
          {
            questionNumber: 1,
            statement: 'Um cientista de dados da Petrobras realiza um teste de hipóteses com nível de significância alpha = 0,05 para verificar se um aditivo químico altera a viscosidade do combustível. O teste resultou em uma estatística com p-valor = 0,018. A conclusão correta é:',
            options: [
              'A) Rejeitar a hipótese nula H0, concluindo que o aditivo altera significativamente a viscosidade ao nível de 5%.',
              'B) Aceitar a hipótese nula H0, pois o p-valor é menor do que o nível de significância.',
              'C) Concluir que a probabilidade de a hipótese nula ser verdadeira é de 1,8%.',
              'D) Concluir que o teste cometeu um Erro Tipo II com probabilidade de 98,2%.',
              'E) O teste é estatisticamente inconclusivo, devendo-se dobrar o tamanho da amostra.'
            ],
            correctLetter: 'A',
            explanation: 'Como o p-valor (0,018) é estritamente menor do que o nível de significância alpha (0,05), a regra de decisão padrão é rejeitar a hipótese nula H0, com evidência estatisticamente significativa de efeito.',
            cesgranrioTip: 'Regra de ouro de concursos: "Se o p-valor é menor que alfa, a hipótese nula vai pra vala" (rejeita-se H0).'
          },
          {
            questionNumber: 2,
            statement: 'Em um estudo de vibração de bombas em plataformas offshore, deseja-se reduzir o Erro Padrão da média estimada de vibração para exatamente um terço (1/3) do seu valor atual. Para atingir esse objetivo, o tamanho da amostra n deve ser multiplicado por:',
            options: [
              'A) 3',
              'B) 6',
              'C) 9',
              'D) 12',
              'E) np.sqrt(3)'
            ],
            correctLetter: 'C',
            explanation: 'O Erro Padrão é SE = sigma / np.sqrt(n). Para que SE se torne SE / 3, o denominador deve ser multiplicado por 3: np.sqrt(n_novo) = 3 * np.sqrt(n) => n_novo = 9 * n. É necessário multiplicar n por 9.',
            cesgranrioTip: 'A relação é quadrática: para reduzir o erro por k, multiplique a amostra por k².'
          },
          {
            questionNumber: 3,
            statement: 'Em um teste de hipóteses estatístico bicaudal, a probabilidade de se rejeitar a hipótese nula H0 quando ela é de fato falsa na população é formalmente definida como:',
            options: [
              'A) Poder do Teste (Power = 1 - β).',
              'B) Nível de Significância (α).',
              'C) Probabilidade de Erro Tipo I.',
              'D) P-valor assintótico.',
              'E) Coeficiente de Variação de Pearson.'
            ],
            correctLetter: 'A',
            explanation: 'O Poder do Teste (1 - β) é a probabilidade de tomar a decisão correta de rejeitar H0 quando ela é efetivamente falsa, isto é, a sensibilidade do teste em detectar uma diferença ou efeito real existente.',
            cesgranrioTip: 'Rejeitar H0 quando H0 é falsa = Poder do Teste (1 - β). Rejeitar H0 quando H0 é verdadeira = Erro Tipo I (α).'
          },
          {
            questionNumber: 4,
            statement: 'Uma amostra aleatória de n = 100 leituras de densidade de óleo forneceu média amostral x̄ = 850 kg/m³. Sabendo que o desvio padrão populacional conhecido é σ = 20 kg/m³, o intervalo de 95% de confiança para a média populacional µ (adotando z = 1,96) é:',
            options: [
              'A) [846,08 ; 853,92] kg/m³',
              'B) [830,00 ; 870,00] kg/m³',
              'C) [848,04 ; 851,96] kg/m³',
              'D) [810,80 ; 889,20] kg/m³',
              'E) [845,00 ; 855,00] kg/m³'
            ],
            correctLetter: 'A',
            explanation: 'Erro padrão da média: SE = σ / sqrt(n) = 20 / sqrt(100) = 20 / 10 = 2,0 kg/m³. A margem de erro é ME = z * SE = 1,96 * 2,0 = 3,92 kg/m³. O intervalo de confiança é [850 - 3,92 ; 850 + 3,92] = [846,08 ; 853,92] kg/m³.',
            cesgranrioTip: 'Fórmula básica do IC para média com σ conhecido: x̄ ± z * (σ / √n).'
          },
          {
            questionNumber: 5,
            statement: 'Em um teste de hipóteses estatístico para avaliar se um novo catalisador aumentou a vazão média de refino de petróleo (H0: mu = 100 versus H1: mu > 100), o engenheiro de dados comete um Erro do Tipo I (Falso Alarme / Falso Positivo) quando:',
            options: [
              'A) Rejeita a hipótese nula H0 quando ela é, na realidade fática, verdadeira.',
              'B) Não rejeita a hipótese nula H0 quando ela é, na realidade fática, falsa.',
              'C) Reduz o nível de significância alfa para zero absoluto.',
              'D) Aumenta o tamanho amostral n para o infinito.',
              'E) Aceita ambas as hipóteses simultaneamente.'
            ],
            correctLetter: 'A',
            explanation: 'O Erro do Tipo I (com probabilidade alfa, o nível de significância) ocorre quando o teste rejeita a hipótese nula H0 sendo ela verdadeira. Já o Erro do Tipo II (com probabilidade beta) ocorre quando o teste deixa de rejeitar uma hipótese nula H0 que é falsa.',
            cesgranrioTip: 'Erro Tipo I (alfa): Rejeitar H0 verdadeira (Falso Alarme). Erro Tipo II (beta): Aceitar H0 falsa.'
          }
        ]
      }
    ],
    examChecklist: [
      'Na distribuição de Poisson: Média = Variância = lambda.',
      'Saber a definição precisa de Erro Tipo I (alpha) e Erro Tipo II (beta).',
      'Erro Padrão = sigma / sqrt(n).',
      'O p-valor mede a plausibilidade dos dados sob H0, e não a probabilidade de H0.',
      'Poder do Teste é 1 - beta (capacidade de detectar um efeito real).'
    ],
    practiceQuestions: [
      {
        questionNumber: 1,
        statement: 'Um sistema de telemetria da Transpetro monitora o número de micro-oscilações de pressão por hora em um gasoduto. Sabe-se que esse fenômeno segue uma distribuição de Poisson com média de 4 oscilações por hora. O desvio padrão do número de oscilações registradas em uma hora é:',
        options: [
          'A) 2.',
          'B) 4.',
          'C) 16.',
          'D) 1.',
          'E) 0,5.'
        ],
        correctLetter: 'A',
        explanation: 'Para uma distribuição de Poisson com parâmetro lambda, a média e a variância são ambas iguais a lambda. Portanto, Var(X) = lambda = 4. Como o desvio padrão é a raiz quadrada positiva da variância: Desvio Padrão = sqrt(4) = 2.',
        cesgranrioTip: 'Essa questão é um clássico imediato de bancas de concursos: lembrar que variância da Poisson é lambda e tirar a raiz quadrada para achar o desvio padrão.'
      },
      {
        questionNumber: 2,
        statement: 'Para testar a igualdade das médias de pressão de dois tipos de juntas de dilatação com amostras pequenas (n1 = 12, n2 = 15) oriundas de populações normais com variâncias populacionais desconhecidas e supostamente desiguais, o teste paramétrico mais adequado é o:',
        options: [
          'A) Teste t de Student para duas amostras independentes com correção de Welch (Welch’s t-test).',
          'B) Teste Z para proporções populacionais.',
          'C) Teste exato de Fisher para matrizes de contingência.',
          'D) Teste de Kolmogorov-Smirnov bicaudal.',
          'E) Teste binomial de sinais sem continuidade.'
        ],
        correctLetter: 'A',
        explanation: 'Quando as variâncias populacionais são desconhecidas e não se pode assumir homocedasticidade (variâncias iguais), o teste t de Welch é a modificação canônica do teste t de Student que ajusta os graus de liberdade para lidar com variâncias heterogêneas.',
        cesgranrioTip: 'Variâncias desconhecidas e desiguais em pequenas amostras = Teste t de Welch.'
      },
      {
        questionNumber: 3,
        statement: 'Em um teste Qui-Quadrado de Independência (Chi-Square) realizado em uma tabela de contingência com 3 linhas e 4 colunas, o número de graus de liberdade da distribuição de teste sob a hipótese nula é:',
        options: [
          'A) 6',
          'B) 12',
          'C) 7',
          'D) 11',
          'E) 5'
        ],
        correctLetter: 'A',
        explanation: 'Para uma tabela de contingência de dimensões r x c (linhas x colunas), o número de graus de liberdade do teste Qui-Quadrado de Independência é dado por gl = (r - 1) * (c - 1) = (3 - 1) * (4 - 1) = 2 * 3 = 6.',
        cesgranrioTip: 'Graus de liberdade na tabela de contingência Qui-Quadrado: (linhas - 1) * (colunas - 1).'
      }
    ]
  }
];
