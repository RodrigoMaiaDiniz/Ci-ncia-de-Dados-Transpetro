import { DigitalBook } from '../../types';

export const BLOCO_3_BOOKS: DigitalBook[] = [
  {
    id: 'livro-b3-governanca-dmbok',
    itemCode: 'B3-01',
    block: 'Bloco III',
    title: 'Manual de Governança de Dados Corporativa, DAMA-DMBOK & Qualidade de Dados',
    subtitle: 'A Roda do DMBOK2, Metadados, Data Stewardship e as 6 Dimensões de Data Quality',
    edition: 'Edição Especial Transpetro 2026',
    author: 'Dra. Vanessa Cavalcanti & Especialistas em Governança Corporativa Petrobras',
    pagesEquivalent: 210,
    readTimeEstimate: '3h 30min',
    badge: 'Peso Estratégico',
    themeGradient: 'from-amber-600 via-orange-600 to-red-800',
    borderAccent: 'border-amber-500/40',
    iconName: 'ShieldCheck',
    overview: 'Curso definitivo sobre Governança de Dados para estatais e operadoras de infraestrutura crítica. A Roda do DAMA-DMBOK 2ª edição com a Governança de Dados no centro motor, papéis e responsabilidades organizacionais (Data Owner, Data Steward, Data Custodian), gerenciamento de metadados técnicos e de negócios, Linhagem de Dados (Data Lineage) e as 6 dimensões universais de qualidade de dados (Acurácia, Completude, Consistência, Tempestividade, Validade e Unicidade).',
    officialEditalTopics: [
      'Conceitos fundamentais de Governança de Dados corporativa e valor do ativo de dados',
      'Estrutura do DAMA-DMBOK (2ª edição) e a Roda de Áreas de Conhecimento',
      'Papéis organizacionais: Data Owner, Data Steward e Data Custodian',
      'Gestão de Metadados: técnicos, de negócios e operacionais',
      'Rastreabilidade e Linhagem de Dados (Data Lineage) ponta a ponta',
      'As 6 Dimensões de Qualidade de Dados: acurácia, completude, consistência, tempestividade, validade e unicidade',
      'Gestão de Dados Mestres (MDM - Master Data Management) e Golden Record',
      'Arquitetura de Dados corporativa e conformidade regulatória (ANP, CVM e SOX)'
    ],
    targetAudience: 'Candidatos que precisam garantir a pontuação máxima no bloco de Governança e Qualidade.',
    chapters: [
      {
        id: 'cap-b3-dmbok-roles',
        chapterNumber: 1,
        title: 'A Estrutura do DAMA-DMBOK2 e os Papéis de Governança de Dados',
        subtitle: 'A Roda do DMBOK e a tríade Owner, Steward e Custodian',
        readTimeEstimate: '45 min',
        summary: 'A anatomia do framework DAMA-DMBOK2. Por que a Governança de Dados ocupa o núcleo da Roda gerenciando as outras 10 disciplinas. A distinção formal de responsabilidades entre quem decide o negócio (Owner), quem zela pelas regras (Steward) e quem opera a infraestrutura (Custodian).',
        contentMarkdown: `## 1. O Framework DAMA-DMBOK (2ª Edição)

O DAMA-DMBOK (Data Management Body of Knowledge) define o gerenciamento de dados como o desenvolvimento, execução e supervisão de planos, políticas, programas e práticas que fornecem, controlam, protegem e aprimoram o valor dos ativos de dados e informações ao longo de todo o seu ciclo de vida.

### A Roda do DAMA-DMBOK (DAMA Wheel):
No diagrama da Roda do DMBOK2, a Governança de Dados (Data Governance) localiza-se estritamente no CENTRO (o cubo da roda), atuando como disciplina integradora e orientadora das outras 10 áreas de conhecimento periféricas:
1. Arquitetura de Dados: Estruturação dos modelos globais de dados e fluxos corporativos.
2. Modelagem e Design de Dados: Esquemas conceituais, lógicos e físicos de bancos de dados.
3. Armazenamento e Operações de Dados: Administração de bancos de dados (DBA), retenção e suporte operacional.
4. Segurança de Dados: Autenticação, autorização, criptografia, privacidade e conformidade legal.
5. Integração e Interoperabilidade de Dados: Pipelines ETL e ELT, mensageria e barramentos de serviços.
6. Gestão de Documentos e Conteúdo: Dados não estruturados, arquivos técnicos e registros contratuais.
7. Gestão de Dados Mestres e de Referência (MDM): Padronização de entidades críticas e identificadores canônicos.
8. Data Warehousing e Business Intelligence (DW/BI): Modelagem dimensional, cubos analíticos e relatórios gerenciais.
9. Gestão de Metadados: Catálogos de dados, dicionários, linhagem técnica e semântica de negócios.
10. Qualidade de Dados (Data Quality): Monitoramento, perfilamento e correção de falhas em atributos de dados.

---

## 2. A Tríade de Papéis de Governança na Prática

A Fundação Cesgranrio cobra reiteradamente a distinção precisa entre os três principais papéis organizacionais de governança:

### 1. Data Owner (Proprietário dos Dados):
- É um gestor executivo ou líder da área de NEGÓCIOS (não da equipe técnica de tecnologia).
- Possui autoridade formal delegada para aprovar políticas de acesso e classificar a criticidade de seu domínio de dados (por exemplo, Gerente Geral de Operações de Dutos).
- Assume a responsabilidade final e prestação de contas (accountability) perante órgãos de auditoria e conformidade regulatória.

### 2. Data Steward (Curador ou Zelador dos Dados):
- Atua como a ponte de articulação contínua entre a área de Negócios e a equipe de Tecnologia da Informação.
- É o especialista no assunto (Subject Matter Expert).
- Define e atualiza as regras de negócio dos atributos, aprova os termos do glossário de negócios corporativo e monitora as métricas diárias de qualidade dos dados.

### 3. Data Custodian (Custodiante dos Dados):
- Papel técnico exercido pelas equipes de Engenharia de Dados, Infraestrutura, Cloud e Administradores de Bancos de Dados (DBAs).
- Responsável pela integridade física do armazenamento, rotinas automatizadas de backup e recuperação, desempenho de consultas, replicação geográfica e execução técnica dos privilégios de acesso definidos pelo Data Owner.

---

## 3. Rastreabilidade e Linhagem de Dados (Data Lineage)

O Data Lineage documenta a trajetória completa dos dados de ponta a ponta:
- Mapeia o ponto de origem (como sensores SCADA em plataformas marítimas), as sucessivas camadas de transformação (camadas Bronze, Silver e Gold em Lakehouses) até o destino final em painéis executivos ou modelos preditivos de inteligência artificial.
- Permite executar Análise de Impacto (avaliar o que será quebrado em relatórios posteriores se uma coluna for renomeada na origem) e Auditoria Regulatória (comprovar perante a ANP ou CVM a exatidão das fórmulas empregadas).`,
        keyTakeaways: [
          'Governança de Dados ocupa o centro do diagrama da roda do DAMA-DMBOK2.',
          'Data Owner pertence à área de negócio e detém autoridade formal e responsabilidade legal.',
          'Data Steward atua como curador de regras de negócio, glossário e métricas de qualidade.',
          'Data Custodian pertence à área de TI e cuida da infraestrutura física, backups e armazenamento.',
          'Data Lineage garante rastreabilidade e auditoria de ponta a ponta desde a origem até o consumo.'
        ],
        cesgranrioTraps: [
          'Afirmar que o Data Owner é o administrador de banco de dados (DBA) da TI: o Owner é sempre uma liderança de negócio.',
          'Confundir Steward com Custodian: o Steward cuida da semântica e regras; o Custodian cuida da tecnologia e infraestrutura.'
        ],
        practiceQuestions: [
          {
            questionNumber: 1,
            statement: 'No âmbito do framework DAMA-DMBOK 2, qual agente possui a autoridade formal para tomar decisões finais sobre a classificação de criticidade, aprovação de acessos e regras de negócio dos dados de um determinado domínio empresarial?',
            options: [
              'A) Data Custodian (Custodiante dos Dados).',
              'B) Data Owner (Proprietário dos Dados).',
              'C) DBA (Administrador de Banco de Dados).',
              'D) Desenvolvedor Full-Stack.',
              'E) Operador de Datacenter.'
            ],
            correctLetter: 'B',
            explanation: 'Segundo o DMBOK2, o Data Owner (Proprietário dos Dados) é um líder ou gestor da área de negócios que possui a autoridade executiva e a responsabilidade formal pela tomada de decisões sobre os dados do seu domínio corporativo. O Custodian atua na parte técnica de infraestrutura.',
            cesgranrioTip: 'Data Owner = Gestor da área de NEGÓCIO (decisão final). Data Custodian = Especialista de TI (infraestrutura).'
          },
          {
            questionNumber: 2,
            statement: 'Na representação gráfica da "Roda do DAMA-DMBOK 2" (DAMA Wheel), qual função de gestão de dados está posicionada no centro geométrico, articulando e direcionando todas as outras 10 áreas de conhecimento periféricas?',
            options: [
              'A) Arquitetura de Dados.',
              'B) Governança de Dados.',
              'C) Segurança de Dados.',
              'D) Qualidade de Dados.',
              'E) Armazenamento e Operações de Banco de Dados.'
            ],
            correctLetter: 'B',
            explanation: 'Na DAMA Wheel do DMBOK2, a Governança de Dados ocupa exatamente o centro da roda, exercendo autoridade e controle sobre o planejamento, monitoramento e execução de todas as demais disciplinas de gestão de dados.',
            cesgranrioTip: 'No centro da roda do DMBOK está a GOVERNANÇA DE DADOS.'
          },
          {
            questionNumber: 3,
            statement: 'Um analista de sistemas precisa rastrear o ciclo de vida completo de uma métrica de vazão de duto, desde sua captura bruta pelo sensor SCADA na plataforma offshore, passando por transformações em tabelas staging no Data Lake, até sua agregação final no relatório executivo do Power BI. A capacidade de governança de dados que mapeia essa trajetória e suas transformações sucessivas denomina-se:',
            options: [
              'A) Data Profiling (Perfilamento de Dados).',
              'B) Data Lineage (Linhagem / Rastreabilidade de Dados).',
              'C) Data Masking (Mascaramento de Dados).',
              'D) Sharding Horizontal de Banco Relacional.',
              'E) Normalização para a Terceira Forma Normal.'
            ],
            correctLetter: 'B',
            explanation: 'O Data Lineage (Linhagem ou Rastreabilidade de Dados) é a disciplina que documenta a origem, movimentação, transformações e destino dos dados ao longo de todo o pipeline de ponta a ponta. É essencial para auditorias e análise de impacto de mudanças.',
            cesgranrioTip: 'Origem, fluxo, transformações e destino de ponta a ponta = Data Lineage (Linhagem de Dados).'
          },
          {
            questionNumber: 4,
            statement: 'No gerenciamento de metadados corporativos preconizado pelo DAMA-DMBOK, a descrição que define o significado semântico de um termo ("Barril Equivalente de Petróleo - BOE"), suas regras de cálculo contábil e as áreas de negócio responsáveis qualifica-se como:',
            options: [
              'A) Metadado Técnico (como tipo de dados VARCHAR ou nome de índice).',
              'B) Metadado de Negócio (Business Metadata).',
              'C) Metadado Operacional (como tempo de execução do job de carga).',
              'D) Metadado de Infraestrutura (como tamanho do bloco de disco).',
              'E) Metadado de Log de Auditoria.'
            ],
            correctLetter: 'B',
            explanation: 'Os Metadados de Negócio (Business Metadata) englobam definições do glossário corporativo, regras de negócio, propriedade de dados (ownership) e significado semântico, facilitando o entendimento pelos usuários de negócios. Metadados técnicos tratam de schemas, tipos de dados e tabelas.',
            cesgranrioTip: 'Glossário, semântica e regras de cálculo = Metadado de Negócio. Nomes de colunas, chaves e tipos SQL = Metadado Técnico.'
          },
          {
            questionNumber: 5,
            statement: 'Na implementação prática de um programa corporativo de governança de dados em uma operadora logística de dutos e terminais, a realização de uma "Análise de Impacto" para estimar quais relatórios regulatórios da ANP serão afetados caso uma tabela de telemetria seja modificada decorre diretamente do uso de:',
            options: [
              'A) Metadados de Linhagem de Dados (Data Lineage).',
              'B) Algoritmos de clustering K-Means.',
              'C) Indexação por B-Tree invertida.',
              'D) Tokenização de textos para modelos de linguagem.',
              'E) Normalização estrita para a Forma Normal de Boyce-Codd.'
            ],
            correctLetter: 'A',
            explanation: 'A análise de impacto depende dos metadados de Data Lineage, pois somente o mapeamento das dependências entre as fontes primárias e os artefatos downstream permite antecipar quebras em relatórios e painéis antes da realização de alterações técnicas.',
            cesgranrioTip: 'Análise de impacto de mudanças em tabelas e esquemas fundamenta-se na Linhagem de Dados (Data Lineage).'
          }
        ],
        transpetroApplication: 'Estruturação do comitê de governança corporativa de dados de telemetria e ativos de transporte marítimo e dutoviário.'
      },
      {
        id: 'cap-b3-data-quality',
        chapterNumber: 2,
        title: 'As 6 Dimensões Universais de Qualidade de Dados (Data Quality)',
        subtitle: 'Acurácia, Completude, Consistência, Tempestividade, Validade e Unicidade',
        readTimeEstimate: '45 min',
        summary: 'Apresentação detalhada das métricas objetivas para avaliar dados. Exemplos práticos no contexto de medição de vazão e faturas da Transpetro com questões resolvidas.',
        contentMarkdown: `## 1. As 6 Dimensões Universais de Qualidade de Dados (Padrão DAMA)

A qualidade de dados é a aptidão dos dados para o uso pretendido por operações, tomadas de decisão e planejamento. O DAMA-DMBOK consagrou seis dimensões fundamentais:

1. Acurácia (Accuracy / Exatidão):
   - Avalia se o dado registrado reflete com veracidade e exatidão a realidade física do mundo real.
   - Exemplo na Transpetro: Se um sensor submarino registra a pressão de um gasoduto como 120 bar, mas a pressão real no interior do tubo é de 75 bar devido a uma descalibração mecânica, temos uma violação severa de Acurácia. Note que o número 120 é sintaticamente aceitável, mas é factualmente inverídico.

2. Completude (Completeness):
   - Avalia se todos os valores obrigatórios e necessários foram devidamente preenchidos, sem ausências injustificadas de dados (valores nulos em atributos mandatórios).
   - Exemplo: Um registro de descarga de petroleiro em que o campo de volume transferido ou a data de conclusão esteja em branco viola a dimensão de Completude.

3. Consistência (Consistency):
   - Avalia se os dados não entram em contradição lógica quando cruzados entre diferentes tabelas, sistemas corporativos ou bases analíticas.
   - Exemplo: Se o sistema de faturamento portuário aponta a movimentação de 800.000 barris de diesel, mas o sistema de telemetria de tanques acusa o recebimento de apenas 600.000 barris sem refugo, há quebra explícita de Consistência.

4. Tempestividade (Timeliness / Atualidade):
   - Avalia se o dado está disponível no momento adequado para suportar a decisão operacional necessária.
   - Exemplo: Um relatório de alerta de desvio térmico em bomba de condensado que chega com 8 horas de atraso à sala de controle é inútil para prevenir uma quebra mecânica, violando a Tempestividade.

5. Validade (Validity / Conformidade de Formato):
   - Avalia se o dado respeita rigorosamente as regras de sintaxe, tipos de dados, máscaras de preenchimento e faixas de domínio permitidas.
   - Exemplo: Uma data de manutenção cadastrada como 31/02/2026 ou uma sigla de unidade da federação preenchida com três caracteres violam a Validade.

6. Unicidade (Uniqueness / Ausência de Duplicidade):
   - Avalia se cada entidade do mundo real possui apenas uma representação única e exclusiva no banco de dados corporativo.
   - Exemplo: Um mesmo fornecedor de válvulas industriais cadastrado sob múltiplos IDs com pequenas variações ortográficas viola a Unicidade, exigindo Gestão de Dados Mestres (Master Data Management - MDM) para consolidar o Registro de Ouro (Golden Record).

---

## 2. A Distinção Vital: Acurácia versus Validade

A armadilha clássica da Fundação Cesgranrio em concursos consiste em induzir o candidato a confundir Acurácia com Validade:
- Validade: Avalia conformidade sintática interna. Um valor de temperatura de 45°C é perfeitamente válido (é numérico e situa-se na faixa plausível do instrumento).
- Acurácia: Avalia conformidade com o mundo real. Se a temperatura real da tubulação naquele momento for de 12°C, o dado de 45°C é inválido? Não, ele é válido sintaticamente, mas é INACURADO (falso perante a realidade factual).`,
        keyTakeaways: [
          'Acurácia mede conformidade com a realidade do mundo real.',
          'Validade mede respeito a formatos, tipos e faixas sintáticas permitidas.',
          'Consistência mede ausência de contradições entre diferentes sistemas.',
          'Tempestividade mede disponibilidade do dado no tempo útil para a ação.',
          'Completude mede preenchimento de todos os atributos obrigatórios sem valores nulos indevidos.',
          'Unicidade combate registros duplicados da mesma entidade no banco corporativo.'
        ],
        cesgranrioTraps: [
          'Confundir Acurácia com Validade: um dado pode ser válido sintaticamente e completamente inacurado perante a realidade.',
          'Confundir Consistência com Completude: dados podem estar completos e ser inconsistentes entre sistemas distintos.'
        ],
        practiceQuestions: [
          {
            questionNumber: 1,
            statement: 'No sistema de supervisão e aquisição de dados (SCADA) da Transpetro, uma válvula inteligente enviou a leitura de status "OPERACIONAL_NORMAL". No entanto, uma inspeção física presencial de campo constatou que a válvula estava completamente travada e inoperante. Do ponto de vista das dimensões de qualidade de dados preconizadas pelo DAMA-DMBOK, a leitura armazenada no banco violou diretamente a dimensão de:',
            options: [
              'A) Validade.',
              'B) Tempestividade.',
              'C) Acurácia.',
              'D) Unicidade.',
              'E) Atomicidade.'
            ],
            correctLetter: 'C',
            explanation: 'A Acurácia (Accuracy) mede se a informação registrada no banco de dados reflete a realidade física do mundo real. Como a válvula estava travada mas o sistema registrou operacional normal, a informação é falsa/inverídica, violando a acurácia. A validade não foi violada porque "OPERACIONAL_NORMAL" é um valor de texto sintaticamente permitido pelo domínio do campo.',
            cesgranrioTip: 'Falso/não bate com o mundo real = Inacurácia. Formato errado/data 31 de fevereiro = Invalidade.'
          },
          {
            questionNumber: 2,
            statement: 'Em uma base cadastral de dutos, o campo "data_instalacao" de uma tubulação foi preenchido com o texto "31/04/2024" (dia 31 em mês de 30 dias). Do ponto de vista de qualidade de dados, qual dimensão foi violada de imediato?',
            options: [
              'A) Validade (Validity)',
              'B) Tempestividade (Timeliness)',
              'C) Completude (Completeness)',
              'D) Unicidade (Uniqueness)',
              'E) Volatilidade (Volatility)'
            ],
            correctLetter: 'A',
            explanation: 'A dimensão da Validade avalia a conformidade dos dados com regras sintáticas, formatos esperados e faixas de valores de domínio permitidas. O dia 31 no mês de abril não existe no calendário gregoriano, violando as regras sintáticas e lógicas de formato de data válida.',
            cesgranrioTip: 'Data inexistente ou sigla inválida = Violação de Validade.'
          },
          {
            questionNumber: 3,
            statement: 'Durante a conferência fiscal do carregamento de um navio aliviador, o sistema de automação dos tanques terrestres reportou a saída de 450.000 barris de petróleo bruto, enquanto o manifesto de bordo integrado reportou o recebimento de exatamente 400.000 barris do mesmo lote sem refugo técnico. Essa divergência flagrante entre duas bases corporativas da mesma companhia indica comprometimento de:',
            options: [
              'A) Consistência (Consistency).',
              'B) Validade (Validity).',
              'C) Unicidade (Uniqueness).',
              'D) Portabilidade (Portability).',
              'E) Conectividade (Connectivity).'
            ],
            correctLetter: 'A',
            explanation: 'A dimensão da Consistência avalia se os dados não entram em conflito entre diferentes sistemas, tabelas ou representações da mesma informação. Quando dois sistemas que deveriam concordar apresentam valores divergentes, há quebra de consistência.',
            cesgranrioTip: 'Divergência de valores entre sistemas diferentes = Quebra de Consistência.'
          },
          {
            questionNumber: 4,
            statement: 'Um sistema de monitoramento de vibração mecânica de turbogeradores gera relatórios de anomalia com atraso médio de 12 horas. Para a equipe de engenharia de manutenção preditiva em tempo real, esse atraso impossibilita manobras de emergência antes do travamento do eixo. A dimensão de qualidade de dados prejudicada é:',
            options: [
              'A) Tempestividade (Timeliness).',
              'B) Unicidade (Uniqueness).',
              'C) Acurácia (Accuracy).',
              'D) Validade (Validity).',
              'E) Escalonabilidade (Scalability).'
            ],
            correctLetter: 'A',
            explanation: 'A Tempestividade (Timeliness) refere-se ao grau em que os dados estão disponíveis no momento exato e apropriado para sua utilização esperada. Dados que chegam tarde demais perdem seu valor decisório.',
            cesgranrioTip: 'Dado que chega com atraso e perde a janela da decisão = Violação de Tempestividade.'
          },
          {
            questionNumber: 5,
            statement: 'Em um projeto de Gestão de Dados Mestres (Master Data Management - MDM) para a cadeia de suprimentos da Transpetro, foi identificado que a mesma empresa fornecedora de tubulações de aço possui registros cadastrais divergentes em quatro sistemas legados com pequenas variações de grafia e CNPJs desatualizados. A consolidação desses registros em uma única visão canônica confiável ("Golden Record") soluciona prioritariamente a dimensão de qualidade de:',
            options: [
              'A) Unicidade (Uniqueness).',
              'B) Volatilidade (Volatility).',
              'C) Elasticidade (Elasticity).',
              'D) Concorrência ACID.',
              'E) Particionamento Lógico.'
            ],
            correctLetter: 'A',
            explanation: 'O objetivo do MDM e da criação do "Golden Record" é eliminar duplicatas redundantes e garantir que cada entidade do mundo real esteja representada de forma única e unívoca no ecossistema de dados, atendendo à dimensão da Unicidade.',
            cesgranrioTip: 'MDM e Golden Record (registro de ouro) = Dimensão de Unicidade.'
          }
        ],
        transpetroApplication: 'Auditoria de dados de vazão em oleodutos para conformidade com as portarias conjuntas da ANP e Inmetro.'
      }
    ],
    examChecklist: [
      'Saber que a Governança de Dados ocupa o centro do DAMA-DMBOK2.',
      'Identificar o Data Owner como líder do negócio e o Data Custodian como responsável técnico pela infraestrutura.',
      'Memorizar as 6 dimensões de qualidade: Acurácia, Completude, Consistência, Tempestividade, Validade e Unicidade.',
      'Diferenciar claramente Acurácia de Validade.',
      'Compreender o papel do Data Lineage na rastreabilidade ponta a ponta.'
    ],
    practiceQuestions: []
  },
  {
    id: 'livro-b3-lgpd-seguranca',
    itemCode: 'B3-02',
    block: 'Bloco III',
    title: 'Manual de Legislação Aplicada, LGPD (Lei 13.709/2018) & Segurança da Informação',
    subtitle: 'Bases Legais, Princípios, Direitos do Titular, DPO, ANPD e Sanções Administrativas',
    edition: 'Edição Especial Transpetro 2026',
    author: 'Equipe de Direito Digital & Compliance Regulatório',
    pagesEquivalent: 215,
    readTimeEstimate: '3h 35min',
    badge: 'Lei Federal Obrigatória',
    themeGradient: 'from-red-600 via-rose-700 to-amber-800',
    borderAccent: 'border-red-500/40',
    iconName: 'Scale',
    overview: 'Tratado completo sobre a Lei Geral de Proteção de Dados Pessoais (LGPD - Lei nº 13.709/2018) direcionado para concursos públicos e empresas estatais. Os 10 princípios fundamentais (Finalidade, Adequação, Necessidade, etc.), os conceitos de Dado Pessoal, Dado Pessoal Sensível e Anonimização. As 10 bases legais para tratamento de dados pessoais (com foco em Cumprimento de Obrigação Legal, Execução de Políticas Públicas e Legítimo Interesse). Papéis do Controlador, Operador e Encarregado (DPO). Incidentes de segurança, relatórios de impacto (RIPD/DPIA) e atuação da Autoridade Nacional de Proteção de Dados (ANPD).',
    officialEditalTopics: [
      'Âmbito de aplicação e princípios fundamentais da LGPD (Lei nº 13.709/2018)',
      'Definições: dado pessoal, dado pessoal sensível, dado anonimizado e pseudonimizado',
      'As 10 Bases Legais para tratamento de dados pessoais (artigo 7º da LGPD)',
      'Tratamento de dados pessoais sensíveis (artigo 11 da LGPD) e restrições',
      'Agentes de tratamento: Controlador vs Operador e regime de responsabilidade solidária',
      'O Encarregado de Proteção de Dados (DPO - Data Protection Officer): atribuições',
      'Direitos fundamentais do titular de dados e mecanismos de atendimento',
      'Relatório de Impacto à Proteção de Dados Pessoais (RIPD / DPIA)',
      'A Autoridade Nacional de Proteção de Dados (ANPD) e sanções administrativas'
    ],
    targetAudience: 'Todos os candidatos que farão a prova da Transpetro/Petrobras (disciplina obrigatória de Bloco III).',
    chapters: [
      {
        id: 'cap-b3-lgpd-principios',
        chapterNumber: 1,
        title: 'Princípios da LGPD, Conceitos Fundamentais e Bases Legais',
        subtitle: 'Finalidade, necessidade (minimização) e as hipóteses autorizadoras do Artigo 7º',
        readTimeEstimate: '45 min',
        summary: 'Os 10 princípios expressos no Art. 6º da LGPD. Diferença jurídica e técnica entre anonimização (irreversível) e pseudonimização. As 10 bases legais: por que o consentimento NÃO é a única base e como a Transpetro trata dados para execução de contratos e obrigações legais.',
        contentMarkdown: `## 1. Conceitos Fundamentais da LGPD (Artigo 5º)

A Lei nº 13.709/2018 estabelece definições rigorosas que balizam todo o tratamento jurídico e computacional de informações:
- Dado Pessoal: Informação relacionada a pessoa natural identificada ou identificável (por exemplo, nome completo, CPF, endereço IP corporativo dinâmico associado a usuário, e-mail institucional nominal).
- Dado Pessoal Sensível: Dado pessoal sobre origem racial ou étnica, convicção religiosa, opinião política, filiação a sindicato ou a organização de caráter religioso, filosófico ou político, dado referente à saúde ou à vida sexual, dado genético ou biométrico, quando vinculado a uma pessoa natural. O rol do Artigo 11 é mais restritivo.
- Dado Anonimizado: Dado relativo a titular que não possa ser identificado, considerando a utilização de meios técnicos razoáveis e disponíveis na ocasião de seu tratamento. Conforme o Artigo 12, a LGPD NÃO SE APLICA a dados anonimizados irreversíveis.
- Dado Pseudonimizado: Dado que passa por processo de descaracterização, mas onde a associação a um indivíduo ainda é viável mediante o uso de chave ou informação adicional mantida separadamente em ambiente seguro. A LGPD APLICA-SE integralmente a dados pseudonimizados.

---

## 2. Os 10 Princípios da LGPD (Artigo 6º)

As atividades de tratamento de dados devem observar a boa-fé e os princípios fundamentais:
1. Finalidade: Realização do tratamento para propósitos legítimos, específicos, explícitos e informados ao titular, sem possibilidade de tratamento posterior de forma incompatível com essas finalidades.
2. Adequação: Compatibilidade do tratamento com as finalidades informadas ao titular.
3. Necessidade (Minimização): Limitação do tratamento ao mínimo necessário para a realização de suas finalidades, com abrangência dos dados pertinentes, proporcionais e não excessivos.
4. Livre Acesso: Garantia aos titulares de consulta facilitada e gratuita sobre a forma e duração do tratamento e a integridade de seus dados.
5. Qualidade dos Dados: Garantia de exatidão, clareza, relevância e atualização contínua dos dados.
6. Transparência: Garantia de informações claras, precisas e facilmente acessíveis sobre os critérios e agentes de tratamento.
7. Segurança: Utilização de medidas técnicas e administrativas aptas a proteger os dados de acessos não autorizados e de incidentes de destruição, perda ou alteração.
8. Prevenção: Adoção antecipada de medidas para evitar a ocorrência de danos em virtude do tratamento de dados.
9. Não Discriminação: Impossibilidade absoluta de realização do tratamento para fins discriminatórios ilícitos ou abusivos.
10. Responsabilização e Prestação de Contas: Demonstração, pelo agente, da adoção de medidas eficazes e capazes de comprovar a observância e o cumprimento das normas de proteção de dados.

---

## 3. As 10 Bases Legais do Artigo 7º da LGPD

A pegadinha número um da Fundação Cesgranrio é afirmar que todo tratamento de dados pessoais depende de autorização ou consentimento assinado do titular. O consentimento é apenas UMA entre DEZ bases legais de idêntica hierarquia:
1. Mediante o fornecimento de consentimento pelo titular.
2. Para o cumprimento de obrigação legal ou regulatória pelo controlador (por exemplo, envio de dados trabalhistas pela Transpetro à Receita Federal e ao e-Social).
3. Pela administração pública, para o tratamento e uso compartilhado de dados necessários à execução de políticas públicas.
4. Para a realização de estudos por órgão de pesquisa, garantida, sempre que possível, a anonimização dos dados.
5. Quando necessário para a execução de contrato ou de procedimentos preliminares a pedido do titular.
6. Para o exercício regular de direitos em processo judicial, administrativo ou arbitral.
7. Para a proteção da vida ou da incolumidade física do titular ou de terceiro.
8. Para a tutela da saúde, exclusivamente em procedimento realizado por profissionais de saúde ou entidades sanitárias.
9. Quando necessário para atender aos interesses legítimos do controlador ou de terceiro (Legítimo Interesse), exceto no caso de prevalecerem direitos e liberdades fundamentais do titular.
10. Para a proteção do crédito.`,
        keyTakeaways: [
          'A LGPD não se aplica a dados anonimizados irreversíveis; dados pseudonimizados continuam protegidos pela lei.',
          'Consentimento é apenas uma entre 10 bases legais de mesma hierarquia.',
          'O princípio da Necessidade (Minimização) proíbe a coleta de dados excessivos para finalidades genéricas.',
          'Dados pessoais sensíveis possuem rol taxativo no Artigo 11 com vedações mais severas.'
        ],
        cesgranrioTraps: [
          'Afirmar que a empresa estatal não pode tratar dados sem consentimento: obrigações legais e execução de contratos dispensam consentimento.',
          'Dizer que a pseudonimização retira o dado da incidência da LGPD: apenas a anonimização irreversível faz isso.'
        ],
        practiceQuestions: [
          {
            questionNumber: 1,
            statement: 'Um engenheiro da Transpetro necessita armazenar dados telemétricos e registros funcionais de operadores de plataforma para auditoria de segurança industrial. Para cumprir os princípios de Necessidade (Minimização) e Adequação da LGPD (Lei nº 13.709/2018), qual procedimento deve ser adotado?',
            options: [
              'A) Coletar o maior volume possível de dados preventivamente para qualquer uso futuro indefinido.',
              'B) Limitar a coleta apenas aos atributos estritamente pertinentes e proporcionais às finalidades declaradas de segurança.',
              'C) Exigir consentimento prévio e presencial com firma reconhecida para cada linha gravada no banco de dados.',
              'D) Eliminar todos os logs após 24 horas, mesmo violando normas regulatórias da ANP.',
              'E) Tratar os dados como dados pessoais sensíveis sem necessidade de justificativa legal.'
            ],
            correctLetter: 'B',
            explanation: 'O princípio da Necessidade (art. 6º, III) impõe a limitação do tratamento ao mínimo necessário para a realização de suas finalidades, com abrangência dos dados pertinentes, proporcionais e não excessivos em relação às finalidades informadas.',
            cesgranrioTip: 'Necessidade = Minimização: coletar apenas o estritamente necessário para a finalidade pretendida.'
          },
          {
            questionNumber: 2,
            statement: 'Ao descaracterizar dados de colaboradores em uma base de analytics de RH, a equipe substituiu os nomes e CPFs por hashes criptográficos (ID_HASH). Porém, a tabela de mapeamento que correlaciona o ID_HASH ao CPF original foi armazenada em servidor seguro sob controle da empresa. De acordo com a LGPD, essa base de dados:',
            options: [
              'A) Tornou-se anonimizada, deixando de submeter-se às normas da LGPD.',
              'B) Encontra-se pseudonimizada e, portanto, continua integralmente sujeita ao regime da LGPD.',
              'C) Perdeu qualquer valor probatório em juízo por adulteração de documentos.',
              'D) Não requer qualquer medida de segurança da informação por não conter dados legíveis.',
              'E) É considerada dado pessoal sensível por definição legal expressa.'
            ],
            correctLetter: 'B',
            explanation: 'A pseudonimização é o tratamento por meio do qual um dado perde a possibilidade de associação, direta ou indireta, a um indivíduo, senão pelo uso de informação adicional mantida separadamente. Como a chave de reversão existe, o dado continua sendo pessoal e sob a égide da LGPD.',
            cesgranrioTip: 'Anonimização irreversível = fora da LGPD. Pseudonimização (reversível com chave) = dentro da LGPD.'
          },
          {
            questionNumber: 3,
            statement: 'Um hospital marítimo conveniado à Transpetro armazena prontuários médicos e exames toxicológicos admissionais de tripulantes de petroleiros. De acordo com o Artigo 11 da LGPD, os dados referentes à saúde enquadram-se como dados pessoais sensíveis. Em regra geral, o tratamento desses dados sem o consentimento do titular é admitido quando indispensável para:',
            options: [
              'A) Apenas para campanhas publicitárias de planos de saúde privados.',
              'B) Cumprimento de obrigação legal ou regulatória pelo controlador ou tutela da saúde em procedimento por profissionais da área.',
              'C) Venda das informações para laboratórios farmacêuticos parceiros.',
              'D) Treinamento irrestrito de modelos públicos de IA sem comitê de ética.',
              'E) Divulgação pública em mural corporativo de acesso geral.'
            ],
            correctLetter: 'B',
            explanation: 'O Art. 11, II da LGPD elenca as hipóteses legais estritas em que dados pessoais sensíveis podem ser tratados sem o consentimento do titular, destacando-se o cumprimento de obrigação legal ou regulatória pelo controlador, tutela da saúde e proteção da vida.',
            cesgranrioTip: 'Dados sensíveis (saúde, biometria, filiação sindical): rol taxativo no Artigo 11 com regras mais restritivas que o Artigo 7º.'
          },
          {
            questionNumber: 4,
            statement: 'O princípio da Segurança da LGPD (Art. 6º, VII) impõe o emprego de medidas técnicas e administrativas aptas a proteger os dados pessoais de acessos não autorizados. No caso de ocorrência de um incidente de segurança cibernética que possa acarretar risco ou dano relevante aos titulares, o controlador deverá:',
            options: [
              'A) Ocultar o incidente por 12 meses até a conclusão de sindicância interna sigilosa.',
              'B) Comunicar à ANPD e aos titulares em prazo razoável, prestando informações sobre a natureza dos dados e medidas de mitigação.',
              'C) Excluir imediatamente todos os logs de auditoria do firewall para evitar vazamento adicional.',
              'D) Responsabilizar exclusivamente o estagiário de redes em juízo arbitral.',
              'E) Suspender indefinidamente o pagamento de salários de toda a diretoria de TI.'
            ],
            correctLetter: 'B',
            explanation: 'Conforme o Art. 48 da LGPD, o controlador deve comunicar à Autoridade Nacional e aos titulares a ocorrência de incidente de segurança que possa acarretar risco ou dano relevante aos titulares, em prazo razoável, descrevendo a gravidade e medidas adotadas.',
            cesgranrioTip: 'Incidente com risco relevante = comunicação obrigatória à ANPD e aos titulares em prazo razoável.'
          },
          {
            questionNumber: 5,
            statement: 'A Transpetro precisou enviar a relação de dados cadastrais, remunerações e contribuições previdenciárias de seus empregados públicos para o sistema informatizado federal e-Social, em cumprimento estrito a determinações da legislação tributária e trabalhista brasileira. Um colaborador exigiu a revogação imediata do tratamento alegando que não assinou termo de consentimento prévio para esse envio. De acordo com a LGPD (Lei nº 13.709/2018), a conduta da empresa:',
            options: [
              'A) É ilícita, pois o consentimento expresso e irrevogável do titular é requisito indispensável para qualquer modalidade de tratamento.',
              'B) É plenamente legítima, fundamentada na base legal de cumprimento de obrigação legal ou regulatória pelo controlador, que independe de consentimento.',
              'C) Só seria lícita se a empresa tivesse obtido autorização prévia por escrito da ANPD.',
              'D) Configura infração gravíssima sujeita à multa de 2% do faturamento por violação do princípio da finalidade.',
              'E) Exige a anonimização irreversível imediata do nome e do CPF do colaborador antes do envio ao Fisco.'
            ],
            correctLetter: 'B',
            explanation: 'O Artigo 7º, inciso II, da LGPD autoriza expressamente o tratamento de dados pessoais para o cumprimento de obrigação legal ou regulatória pelo controlador. Essa é uma base legal autônoma que independe do consentimento do titular de dados. O colaborador não pode revogar nem se opor ao repasse de dados fiscais e previdenciários legalmente exigidos pela legislação.',
            cesgranrioTip: 'A Cesgranrio explora situações práticas em que órgãos e empresas públicas tratam dados sem consentimento amparados em obrigações legais ou execução de políticas públicas.'
          }
        ],
        transpetroApplication: 'Gestão de conformidade no tratamento de dados funcionais e de tripulantes de petroleiros perante a Capitania dos Portos e a ANPD.'
      },
      {
        id: 'cap-b3-lgpd-agentes',
        chapterNumber: 2,
        title: 'Agentes de Tratamento (Controlador vs Operador), o DPO e Sanções da ANPD',
        subtitle: 'Atribuições do Encarregado de Dados e limites das multas administrativas',
        readTimeEstimate: '45 min',
        summary: 'A divisão de papéis: Controlador (quem decide) e Operador (quem executa em nome do controlador). A função do Encarregado (DPO) e a dosimetria das sanções aplicadas pela ANPD.',
        contentMarkdown: `## 1. Agentes de Tratamento de Dados

A LGPD distingue com precisão os dois agentes de tratamento:
- Controlador: Pessoa natural ou jurídica, de direito público ou privado, a quem competem as decisões referentes ao tratamento de dados pessoais (por exemplo, a Transpetro ao admitir funcionários ou selecionar fornecedores). É quem define a finalidade e a base legal.
- Operador: Pessoa natural ou jurídica, de direito público ou privado, que realiza o tratamento de dados pessoais em nome do controlador (por exemplo, uma empresa provedora de nuvem contratada para hospedar a folha de pagamento). O operador segue estritamente as instruções lícitas do controlador.

---

## 2. O Encarregado pelo Tratamento de Dados Pessoais (DPO)

O Encarregado (Data Protection Officer) é a pessoa indicada pelo controlador e operador para atuar como canal oficial de comunicação entre o controlador, os titulares dos dados e a Autoridade Nacional de Proteção de Dados (ANPD).

### Atribuições Legais do DPO (Artigo 41, § 2º):
1. Aceitar reclamações e comunicações dos titulares, prestar esclarecimentos e adotar providências cabíveis.
2. Receber comunicações da Autoridade Nacional (ANPD) e adotar providências regulatórias.
3. Orientar os funcionários e os contratados da entidade a respeito das práticas a serem tomadas em relação à proteção de dados pessoais.
4. Executar as demais atribuições determinadas pelo controlador ou fixadas em normas complementares da ANPD.
- Observação de prova: A LGPD não exige que o Encarregado seja advogado nem exige registro em conselho profissional de classe.

---

## 3. Sanções Administrativas da ANPD (Artigo 52)

Em caso de infração às normas da LGPD, a ANPD pode aplicar as seguintes sanções administrativas após processo administrativo com ampla defesa:
1. Advertência com indicação de prazo para adoção de medidas corretivas.
2. Multa simples de até 2% (dois por cento) do faturamento da pessoa jurídica de direito privado, grupo ou conglomerado no Brasil no seu último exercício, excluídos os tributos, limitada a R$ 50.000.000,00 (cinquenta milhões de reais) por infração.
3. Multa diária, observado o limite total de cinquenta milhões de reais.
4. Publicização da infração após devidamente apurada e confirmada a sua ocorrência.
5. Bloqueio dos dados pessoais a que se refere a infração até a sua regularização.
6. Eliminação dos dados pessoais a que se refere a infração.
7. Suspensão parcial do funcionamento do banco de dados por até 6 meses, prorrogável.
8. Proibição parcial ou total do exercício de atividades relacionadas a tratamento de dados.`,
        keyTakeaways: [
          'Controlador decide as finalidades do tratamento; Operador executa em nome do controlador.',
          'DPO atua como canal de comunicação entre Titulares, Controlador e ANPD.',
          'Multa da ANPD atinge até 2 por cento do faturamento, com teto de 50 milhões de reais por infração individual.',
          'O Operador responde solidariamente pelos danos se descumprir a LGPD ou violar instruções lícitas do Controlador.'
        ],
        cesgranrioTraps: [
          'Afirmar que a multa de 50 milhões de reais é o teto anual global: o limite legal é POR INFRAÇÃO.',
          'Dizer que o DPO deve ter obrigatoriamente formação em Direito com inscrição na OAB.'
        ],
        practiceQuestions: [
          {
            questionNumber: 1,
            statement: 'Qual é o limite máximo estabelecido pelo Art. 52 da LGPD para aplicação de multa simples pela Autoridade Nacional de Proteção de Dados (ANPD) em caso de infração cometida por pessoa jurídica de direito privado?',
            options: [
              'A) Até 10% do faturamento líquido, sem teto fixo.',
              'B) Até 2% do faturamento da empresa, grupo ou conglomerado no Brasil no seu último exercício, excluídos os tributos, limitada a R$ 50.000.000,00 por infração.',
              'C) Até R$ 10.000.000,00 por ano de exercício fiscal.',
              'D) Valor arbitrado discricionariamente pelo Ministério Público Federal.',
              'E) 5% do patrimônio líquido apurado no balanço patrimonial.'
            ],
            correctLetter: 'B',
            explanation: 'Conforme expressamente estipulado no Art. 52, inciso II da LGPD, a multa simples pode atingir até 2% do faturamento da empresa no Brasil no último exercício, limitada a R$ 50.000.000,00 (cinquenta milhões de reais) por infração individual.',
            cesgranrioTip: 'Dois números sagrados para a prova: 2% do faturamento e teto de 50 milhões de reais por infração.'
          },
          {
            questionNumber: 2,
            statement: 'A Transpetro contratou uma empresa de processamento em nuvem para hospedar seus sistemas de folha de pagamento e gestão de benefícios. Nesse cenário, perante a LGPD, a Transpetro e a prestadora de serviços em nuvem qualificam-se juridicamente, respectivamente, como:',
            options: [
              'A) Operadora e Controladora.',
              'B) Controladora e Operadora.',
              'C) Encarregada e Custodiante.',
              'D) Titular e Controladora.',
              'E) Operadora e Titular.'
            ],
            correctLetter: 'B',
            explanation: 'A Transpetro é a Controladora porque a ela competem as decisões sobre as finalidades e meios de tratamento dos dados de seus empregados. A prestadora do serviço em nuvem é a Operadora, pois realiza o tratamento em nome e sob as instruções da Controladora.',
            cesgranrioTip: 'Quem manda/decide = Controlador. Quem executa a mando = Operador.'
          },
          {
            questionNumber: 3,
            statement: 'Em matéria de responsabilidade civil por danos causados a titulares de dados (Art. 42 da LGPD), o Operador responde solidariamente aos danos causados pelo tratamento quando:',
            options: [
              'A) Em qualquer hipótese, mesmo quando tiver agido em estrito acordo com a lei e sob ordens do controlador.',
              'B) Descumprir as obrigações da legislação de proteção de dados ou quando não tiver seguido as instruções lícitas do controlador.',
              'C) Apenas se o valor da indenização for inferior a R$ 10.000,00.',
              'D) Somente se for uma empresa estrangeira sem sede no Brasil.',
              'E) O controlador for declarado insolvente pelo Banco Central.'
            ],
            correctLetter: 'B',
            explanation: 'O Art. 42, § 1º, I da LGPD estabelece que o operador responde solidariamente pelos danos causados pelo tratamento quando descumprir as obrigações da legislação de proteção de dados ou quando não tiver seguido as instruções lícitas do controlador.',
            cesgranrioTip: 'Operador responde solidário se descumprir a lei ou descumprir ordens lícitas do controlador.'
          },
          {
            questionNumber: 4,
            statement: 'O documento elaborado pelo controlador que descreve os processos de tratamento de dados pessoais que podem gerar riscos às liberdades civis e aos direitos fundamentais, bem como medidas e mecanismos de mitigação de risco, é denominado:',
            options: [
              'A) Termo de Posse de Cargo Público.',
              'B) Relatório de Impacto à Proteção de Dados Pessoais (RIPD / DPIA).',
              'C) Certificado Digital SSL/TLS.',
              'D) Ata de Reunião da Diretoria Executiva.',
              'E) Balanço Social Anual.'
            ],
            correctLetter: 'B',
            explanation: 'O Relatório de Impacto à Proteção de Dados Pessoais (RIPD) é o documento formal previsto no Art. 5º, XVII da LGPD que analisa a necessidade, proporcionalidade e riscos do tratamento, propondo medidas mitigatórias.',
            cesgranrioTip: 'Análise de risco de tratamento aos direitos e garantias = RIPD (Relatório de Impacto).'
          },
          {
            questionNumber: 5,
            statement: 'Um cidadão solicitou formalmente à Transpetro a confirmação da existência de tratamento e o acesso aos seus dados pessoais constantes nos registros de visitantes de um terminal de regaseificação de GNL. Com base no Artigo 19 da LGPD, o controlador deve fornecer a declaração clara e completa em formato eletrônico ou impresso no prazo de até:',
            options: [
              'A) 24 horas improrrogáveis.',
              'B) 15 (quinze) dias, contado da data do requerimento do titular.',
              'C) 6 meses mediante pagamento de taxa administrativa.',
              'D) 5 anos de acordo com o prazo decadencial tributário.',
              'E) Prazo indeterminado fixado a critério do Encarregado.'
            ],
            correctLetter: 'B',
            explanation: 'Conforme o Art. 19, II da LGPD, a resposta completa que fornece a declaração clara e completa dos dados, origem e critérios utilizados deve ser prestada no prazo de até 15 (quinze) dias a contar do requerimento do titular.',
            cesgranrioTip: 'Prazo da resposta completa de acesso aos dados na LGPD = 15 dias.'
          }
        ],
        transpetroApplication: 'Auditoria de contratos de prestação de serviços de computação em nuvem e definição de cláusulas de proteção e responsabilidade de operadores terceirizados.'
      }
    ],
    examChecklist: [
      'Dados anonimizados não sofrem incidência da LGPD (pseudonimizados sofrem).',
      'Consentimento é apenas uma entre 10 bases legais de mesma hierarquia.',
      'Saber a diferença entre Controlador (decide) e Operador (executa sob ordens).',
      'Multa máxima da ANPD: 2% do faturamento limitada a R$ 50 milhões por infração.',
      'DPO atua como canal oficial de comunicação entre Titular, Controlador e ANPD.'
    ],
    practiceQuestions: []
  },
  {
    id: 'livro-b3-etica-xai',
    itemCode: 'B3-03',
    block: 'Bloco III',
    title: 'Manual de Ética em Inteligência Artificial, Explicabilidade (XAI) & Governança Algorítmica',
    subtitle: 'Interpretabilidade de Modelos Caixa-Preta com SHAP, LIME e Mitigação de Viés Algorítmico',
    edition: 'Edição Especial Transpetro 2026',
    author: 'Equipe de IA Responsável & Engenharia Ética Petrobras',
    pagesEquivalent: 195,
    readTimeEstimate: '3h 15min',
    badge: 'Vanguarda em Concursos',
    themeGradient: 'from-purple-700 via-pink-700 to-rose-800',
    borderAccent: 'border-purple-500/40',
    iconName: 'Sparkles',
    overview: 'Compreensão aprofundada dos pilares éticos e metodológicos de Inteligência Artificial Responsável. Princípios da OCDE e da UNESCO para IA confiável (transparência, justiça, equidade e responsabilidade). Mitigação de viés algorítmico e métricas de equidade (Disparate Impact, Demographic Parity, Equalized Odds). Técnicas de Explicabilidade de Modelos de IA (XAI - Explainable AI): LIME (aproximação linear local independente de modelo) e SHAP (Shapley Additive Explanations fundamentado na Teoria dos Jogos cooperativos).',
    officialEditalTopics: [
      'Princípios de Ética em Inteligência Artificial (transparência, equidade, não-discriminação e auditabilidade)',
      'Viés algorítmico (Algorithmic Bias) e amplificação de injustiças históricas nos dados',
      'Métricas de equidade (Fairness): Paridade Demográfica e Igualdade de Oportunidades',
      'O dilema entre Acurácia Preditiva e Interpretabilidade de Modelos',
      'Modelos Intrinsecamente Interpretáveis vs Modelos Caixa-Preta (Black-Box)',
      'Explicabilidade Pós-Hoc (Post-hoc Explainability) e Explicabilidade Local vs Global',
      'Método LIME (Local Interpretable Model-agnostic Explanations)',
      'Método SHAP (SHapley Additive exPlanations) e os valores de Shapley da Teoria dos Jogos',
      'Governança Algorítmica e conformidade com o marco regulatório de IA'
    ],
    targetAudience: 'Cientistas de dados que precisam auditar modelos preditivos e justificar decisões para órgãos de controle.',
    chapters: [
      {
        id: 'cap-b3-xai-fund',
        chapterNumber: 1,
        title: 'Interpretabilidade vs Explicabilidade e os Métodos LIME e SHAP',
        subtitle: 'Da Teoria dos Jogos de Lloyd Shapley aos substitutos lineares locais',
        readTimeEstimate: '45 min',
        summary: 'Classificação de modelos transparentes (Regressão Linear, Árvores Rasas) versus caixas-pretas (Deep Learning, Ensembles). Matemática dos Shapley Values e como LIME constrói perturbações locais.',
        contentMarkdown: `## 1. O Trade-Off entre Desempenho e Interpretabilidade

Historicamente, quanto maior a capacidade e a flexibilidade não linear de um modelo preditivo, menor tende a ser a sua interpretabilidade natural:
- Modelos Intrinsecamente Interpretáveis (Glass-Box): Regressão Linear com coeficientes diretos, Regressão Logística com Odds Ratios e Árvores de Decisão rasas com regras transparentes se-então.
- Modelos Caixa-Preta (Black-Box): Redes Neurais Profundas (Deep Learning) com milhões de parâmetros e Ensembles Complexos (XGBoost, Random Forests com 500 árvores). É humanamente inviável inspecionar a fórmula fechada da decisão.
- Em infraestruturas críticas da Transpetro (diagnóstico de fadiga de oleodutos, autorização de manobras de navios) ou decisões com impacto em direitos humanos, a adoção de caixas-pretas exige Explicabilidade Pós-Hoc (Post-hoc Explainability).

---

## 2. Método LIME (Local Interpretable Model-agnostic Explanations)

O LIME explica predições individuais de qualquer classificador ou regressor de forma agnóstica ao modelo:
- Premissa Teórica: Embora a fronteira de decisão global de um modelo caixa-preta seja excessivamente não linear e complexa, se dermos um zoom local na vizinhança imediata de uma observação específica, essa fronteira local comporta-se como um plano aproximadamente linear!
- Algoritmo Passo a Passo do LIME:
  1. Seleciona a instância de teste a ser explicada.
  2. Gera perturbações aleatórias nos atributos dessa instância, criando uma vizinhança sintética ao redor dela.
  3. Consulta o modelo caixa-preta para obter as predições de cada uma dessas instâncias perturbadas.
  4. Atribui pesos a cada ponto perturbado inversamente proporcionais à sua distância geométrica até a instância original (usando um kernel exponencial).
  5. Treina um modelo linear explicador simples (como regressão Ridge ou Lasso ponderada) sobre as instâncias locais, cujos coeficientes representam a explicação local dos atributos.

---

## 3. Método SHAP (SHapley Additive exPlanations)

O SHAP é fundamentado formalmente nos Valores de Shapley (Shapley Values) da Teoria dos Jogos Cooperativos desenvolvida pelo matemático Lloyd Shapley em 1953:
- Metáfora Teórica: Pense em cada variável explicativa como um jogador e na previsão final do modelo como o pagamento total do jogo. Qual é a contribuição justa de cada jogador para o prêmio final?
- Propriedade da Eficiência Aditiva (Local Accuracy): A soma dos valores SHAP de todas as variáveis de uma observação mais o valor base médio esperado do modelo é estritamente igual à previsão final do modelo: soma(phi_i) = f(x) - E[f(x)].
- TreeSHAP: Algoritmo especializado para modelos de árvores (XGBoost, LightGBM, Random Forest) que calcula os valores de Shapley exatos em tempo polinomial, superando a lentidão exponencial do cálculo combinatório tradicional.`,
        keyTakeaways: [
          'XAI permite auditar e justificar decisões de modelos caixa-preta em aplicações críticas.',
          'LIME treina um modelo linear local sobre amostras perturbadas ao redor da instância.',
          'SHAP é fundamentado na Teoria dos Jogos Cooperativos (Valores de Shapley).',
          'A Eficiência Aditiva do SHAP garante que a soma das contribuições fecha exatamente na predição final.',
          'TreeSHAP calcula valores SHAP exatos em tempo polinomial para modelos de árvore.'
        ],
        cesgranrioTraps: [
          'Afirmar que o LIME fornece uma explicação global de todo o modelo: o LIME é estritamente LOCAL.',
          'Dizer que os valores SHAP são aproximações aleatórias: SHAP possui fundamentação axiomática com garantias matemáticas de consistência.'
        ],
        practiceQuestions: [
          {
            questionNumber: 1,
            statement: 'Para auditar uma predição isolada de risco de falha em uma turbina gerada por uma floresta aleatória, um cientista de dados treina um modelo substituto linear simples sobre amostras perturbadas no entorno da observação de interesse, ponderando essas amostras pela proximidade geométrica. Essa técnica de XAI corresponde a:',
            options: [
              'A) LIME (Local Interpretable Model-agnostic Explanations).',
              'B) PCA (Principal Component Analysis).',
              'C) Backpropagation com Dropout.',
              'D) SHAP Kernel sem perturbação.',
              'E) Matriz de Confusão Ponderada.'
            ],
            correctLetter: 'A',
            explanation: 'O LIME aproxima a fronteira de decisão localmente criando uma vizinhança sintética por perturbações e ajustando um modelo interpretável (como regressão linear ponderada) em torno do ponto a ser explicado.',
            cesgranrioTip: 'Aproximação linear local por amostras perturbadas = LIME.'
          },
          {
            questionNumber: 2,
            statement: 'A propriedade fundamental do SHAP que garante que a soma de todos os valores de Shapley atribuídos às variáveis de uma observação mais a previsão média esperada do modelo é exatamente igual à predição final f(x) denomina-se:',
            options: [
              'A) Eficiência Aditiva (Local Accuracy / Additivity).',
              'B) Monotonicidade Bayesiana.',
              'C) Estacionariedade Fraca.',
              'D) Ortogonalidade de Graham-Schmidt.',
              'E) Invariância de Escala.'
            ],
            correctLetter: 'A',
            explanation: 'A propriedade da Eficiência (ou Local Accuracy / Aditividade) dos Shapley Values garante que a soma das contribuições de todos os atributos somada ao valor esperado da base é rigorosamente igual à predição do modelo para aquela instância: sum(phi_i) = f(x) - E[f(x)].',
            cesgranrioTip: 'Soma dos valores SHAP soma a diferença até a previsão final: Propriedade da Eficiência Aditiva.'
          },
          {
            questionNumber: 3,
            statement: 'No ecossistema de explicabilidade com SHAP, o algoritmo TreeSHAP destaca-se por permitir o cálculo exato dos valores de Shapley para modelos baseados em árvores (como XGBoost e LightGBM) em tempo polinomial. Isso representa uma enorme vantagem operacional sobre o KernelSHAP genérico porque este último possui complexidade:',
            options: [
              'A) Linear O(N).',
              'B) Exponencial no número de atributos da base.',
              'C) Constante O(1).',
              'D) Logarítmica O(log M).',
              'E) Quadrática apenas no número de linhas de teste.'
            ],
            correctLetter: 'B',
            explanation: 'O cálculo exato tradicional de valores de Shapley exige avaliar todas as 2^M possíveis coalizões de atributos, tornando o KernelSHAP proibitivamente lento para datasets com muitas colunas. O TreeSHAP explora a estrutura interna das árvores para calcular os valores exatos em tempo polinomial.',
            cesgranrioTip: 'KernelSHAP genérico é exponencial O(2^M); TreeSHAP é otimizado em tempo polinomial para modelos de árvore.'
          },
          {
            questionNumber: 4,
            statement: 'Ao gerar um gráfico SHAP Summary Plot (Beeswarm) para analisar globalmente um modelo de detecção de vazamentos em dutos, cada ponto representa uma observação do dataset. Se pontos vermelhos (alto valor da feature "pressao_duto") se concentram à direita do eixo zero (valores SHAP positivos), isso indica que:',
            options: [
              'A) Altas pressões diminuem a probabilidade prevista de vazamento.',
              'B) Altas pressões aumentam a probabilidade prevista de vazamento pelo modelo.',
              'C) A variável pressão não possui qualquer impacto na decisão do classificador.',
              'D) O modelo está com sobreajuste (overfitting) severo.',
              'E) A acurácia do modelo é necessariamente inferior a 50%.'
            ],
            correctLetter: 'B',
            explanation: 'No SHAP Summary Plot, o eixo horizontal representa o valor SHAP (impacto na saída do modelo). Valores SHAP positivos empurram a predição para a classe positiva (vazamento). Como a cor vermelha indica valor alto da variável e está no lado positivo, valores altos de pressão aumentam a probabilidade prevista de vazamento.',
            cesgranrioTip: 'SHAP > 0: empurra a predição para cima (aumenta risco/probabilidade). Cor vermelha: valor alto da feature.'
          },
          {
            questionNumber: 5,
            statement: 'Durante uma auditoria externa de conformidade em um algoritmo de triagem de fornecedores da Transpetro, os auditores constataram que o modelo adotado é uma rede neural profunda considerada "caixa-preta". Para explicar a decisão individual que desqualificou um fornecedor específico, a equipe utilizou um método fundamentado na Teoria dos Jogos Cooperativos que calcula a contribuição marginal média de cada variável sobre todas as coalizões possíveis de atributos. O método de explicabilidade utilizado é o:',
            options: [
              'A) LIME (Local Interpretable Model-agnostic Explanations).',
              'B) SHAP (SHapley Additive exPlanations).',
              'C) K-Means com regularização L1.',
              'D) PCA supervisionado com Scree Plot.',
              'E) Gradient Boosting com Leaf-wise split.'
            ],
            correctLetter: 'B',
            explanation: 'O método SHAP (SHapley Additive exPlanations) é a técnica canônica de explicabilidade (XAI) derivada diretamente da Teoria dos Jogos Cooperativos de Lloyd Shapley. O SHAP decompõe a predição do modelo calculando os valores de Shapley, que representam a contribuição marginal média de cada atributo sobre todas as combinações possíveis de atributos.',
            cesgranrioTip: 'Palavras-chave como "Teoria dos Jogos", "contribuição marginal" e "coalizões de atributos" em questões de XAI referem-se inequivocamente ao método SHAP.'
          }
        ],
        transpetroApplication: 'Explicabilidade de modelos de manutenção preditiva para atender a auditorias de segurança operacional da Marinha e ANP.'
      },
      {
        id: 'cap-b3-fairness-etica',
        chapterNumber: 2,
        title: 'Métricas de Equidade (Fairness) e Mitigação de Viés Algorítmico',
        subtitle: 'Paridade Demográfica, Igualdade de Oportunidades e Auditoria de IA',
        readTimeEstimate: '45 min',
        summary: 'Como o preconceito humano e a amostragem desbalanceada infectam modelos de aprendizado. Métricas matemáticas de fairness: Demographic Parity e Equal Opportunity.',
        contentMarkdown: `## 1. Origens do Viés Algorítmico (Algorithmic Bias)

Os algoritmos de aprendizado de máquina não possuem intencionalidade ou preconceito intrínseco; são otimizadores matemáticos que reproduzem e amplificam padrões estatísticos presentes nas bases históricas de treino:
- Viés Histórico: As desigualdades e preconceitos humanos do passado encontram-se codificados nos dados brutos históricos.
- Viés de Amostragem ou Representação: Determinados grupos minoritários ou eventos raros contam com poucas amostras na base de treino, fazendo com que o algoritmo minimize o erro global às custas desses grupos.
- Variáveis Proxy: A simples remoção de uma coluna sensível protegida (como etnia ou gênero) não impede a discriminação, porque outros atributos correlacionados (como CEP de residência, histórico escolar ou palavras no currículo) servem como proxies substitutos quase perfeitos.

---

## 2. Métricas Formais de Equidade (Fairness Metrics)

A literatura científica e os editais de concurso destacam duas formulações matemáticas principais:

### 1. Paridade Demográfica (Demographic Parity / Statistical Parity):
- Exige que a probabilidade de um indivíduo receber um resultado positivo (por exemplo, aprovação de crédito ou concessão de benefício) seja rigorosamente idêntica entre os grupos protegidos e majoritários: P(y_pred = 1 | Grupo = 0) = P(y_pred = 1 | Grupo = 1).
- Ponto Crítico de Concurso: A Paridade Demográfica ignora o mérito real e as qualificações intrínsecas das pessoas (ela compara apenas o desfecho final).

### 2. Igualdade de Oportunidades (Equal Opportunity):
- Exige que a Taxa de Verdadeiros Positivos (Recall / True Positive Rate - TPR) seja idêntica entre os grupos, avaliando apenas aqueles candidatos que são comprovadamente qualificados no mundo real (y_true = 1): P(y_pred = 1 | Grupo = 0, y_true = 1) = P(y_pred = 1 | Grupo = 1, y_true = 1).
- Ou seja: se dois indivíduos são qualificados na realidade, ambos devem possuir a mesma probabilidade matemática de serem aprovados pelo modelo.

### 3. A Regra dos 80% (Disparate Impact):
- Utilizada amplamente por agências reguladoras (como a EEOC): se a taxa de seleção do grupo protegido for inferior a quatro quintos (80%) da taxa de seleção do grupo com maior aprovação, presume-se a existência de Impacto Desproporcional Adverso (Disparate Impact), demandando auditoria mandatória.`,
        keyTakeaways: [
          'Remover atributos protegidos não resolve o viés quando há variáveis proxy redundantes.',
          'Paridade Demográfica exige taxas iguais de seleção geral entre os grupos.',
          'Igualdade de Oportunidades exige taxas iguais de Recall (aprovação dos qualificados).',
          'A regra prática dos 80% (quatro quintos) sinaliza indício forte de impacto adverso desproporcional.'
        ],
        cesgranrioTraps: [
          'Afirmar que a eliminação da variável sensível torna o modelo imune ao viés: variáveis proxy restabelecem a discriminação.',
          'Confundir Igualdade de Oportunidades (que exige apenas TPR/Recall igual) com Probabilidades Igualadas (que exige TPR e FPR iguais simultaneamente).'
        ],
        practiceQuestions: [
          {
            questionNumber: 1,
            statement: 'Um cientista de dados avalia a equidade de um modelo de concessão de bolsas de capacitação técnica. Ao calcular a métrica de Igualdade de Oportunidades (Equal Opportunity), qual condição probabilística deve ser satisfeita entre o grupo protegido A e o grupo majoritário B?',
            options: [
              'A) P(y_pred = 1 | Grupo = A) = P(y_pred = 1 | Grupo = B)',
              'B) P(y_pred = 1 | Grupo = A, y_true = 1) = P(y_pred = 1 | Grupo = B, y_true = 1)',
              'C) P(y_pred = 0 | Grupo = A) = 1.0',
              'D) Acurácia global de A deve ser igual à precisão de B.',
              'E) F1-Score idêntico a 0.5 em ambos os grupos.'
            ],
            correctLetter: 'B',
            explanation: 'A Igualdade de Oportunidades (Equal Opportunity) exige igualdade de Taxa de Verdadeiros Positivos (Recall / TPR) entre os grupos para instâncias comprovadamente qualificadas no mundo real (y_true = 1).',
            cesgranrioTip: 'Paridade Demográfica compara a taxa geral P(y_pred=1). Igualdade de Oportunidades condiciona a y_true=1 (Recall igual).'
          },
          {
            questionNumber: 2,
            statement: 'Ao eliminar a coluna explícita "gênero" de um dataset de concessão de crédito, observou-se que o algoritmo manteve a mesma discrepância desfavorável contra o grupo protegido. Esse fenômeno ocorre predominantemente pela presença de:',
            options: [
              'A) Variáveis Proxy (atributos indiretamente correlacionados com o atributo sensível).',
              'B) Falha de hardware na GPU de treinamento.',
              'C) Ausência de regularização Ridge.',
              'D) Concorrência em operações de I/O no banco relacional.',
              'E) Violação da Primeira Forma Normal (1FN).'
            ],
            correctLetter: 'A',
            explanation: 'Variáveis proxy são atributos que possuem forte correlação estatística com a variável sensível protegida (como profissão, faixa de renda, histórico de consumo ou CEP), permitindo ao modelo reconstruir indiretamente o viés.',
            cesgranrioTip: 'Remover a coluna protegida não resolve o problema quando há variáveis proxy redundantes.'
          },
          {
            questionNumber: 3,
            statement: 'A métrica de equidade algorítmica denominada "Probabilidades Igualadas" (Equalized Odds) é mais rigorosa do que a Igualdade de Oportunidades (Equal Opportunity) porque exige que os grupos protegidos e não protegidos apresentem valores idênticos para:',
            options: [
              'A) Apenas a Acurácia global da matriz de confusão.',
              'B) Tanto a Taxa de Verdadeiros Positivos (TPR / Recall) quanto a Taxa de Falsos Positivos (FPR).',
              'C) O tempo de compilação do modelo na GPU.',
              'D) A quantidade total de registros em cada classe.',
              'E) O valor da constante de aprendizagem (learning rate).'
            ],
            correctLetter: 'B',
            explanation: 'Equalized Odds impõe paridade tanto para os qualificados (mesmo TPR) quanto para os não qualificados (mesmo FPR), garantindo que as taxas de erro e acerto sejam balanceadas entre todos os grupos.',
            cesgranrioTip: 'Equal Opportunity = Apenas TPR (Recall) igual. Equalized Odds = Tanto TPR quanto FPR iguais.'
          },
          {
            questionNumber: 4,
            statement: 'Na análise regulatória de impacto adverso de modelos automatizados (Disparate Impact), a regra prática amplamente adotada pelas cortes de justiça trabalhista e órgãos reguladores internacionais (como a EEOC dos EUA) estipula que há indício forte de viés discriminatório se a taxa de seleção do grupo protegido for inferior a:',
            options: [
              'A) 10% da taxa do grupo com maior índice de aprovação.',
              'B) 80% (quatro quintos) da taxa de seleção do grupo com maior aprovação.',
              'C) 50% exatos da média amostral.',
              'D) 99% da variância amostral.',
              'E) Zero, exigindo discriminação absoluta de 100% dos indivíduos.'
            ],
            correctLetter: 'B',
            explanation: 'A "Regra dos 4/5" ou "Regra dos 80%" (Four-Fifths Rule) define que se a taxa de aprovação do grupo protegido for inferior a 80% (quatro quintos) da taxa do grupo majoritário, presume-se a existência de impacto desproporcional adverso (Disparate Impact).',
            cesgranrioTip: 'Disparate Impact: Regra dos 80% (4/5) da taxa do grupo com maior aprovação.'
          },
          {
            questionNumber: 5,
            statement: 'O Artigo 20 da LGPD assegura ao titular o direito de solicitar a revisão de decisões tomadas unicamente com base em tratamento automatizado de dados pessoais que afetem seus interesses. Ao atender a essa requisição, o controlador deve fornecer:',
            options: [
              'A) O código-fonte integral e os pesos das matrizes binárias sem qualquer restrição de confidencialidade.',
              'B) Informações claras e adequadas a respeito dos critérios e dos procedimentos utilizados para a decisão automatizada, observados os segredos comercial e industrial.',
              'C) Apenas a data e o horário da compilação do modelo no servidor.',
              'D) Uma cópia do contrato de trabalho de todos os programadores envolvidos.',
              'E) Isenção total de tributos federais pelo período de cinco anos.'
            ],
            correctLetter: 'B',
            explanation: 'O Artigo 20, § 1º da LGPD estabelece que o controlador deve fornecer informações claras e adequadas sobre os critérios e procedimentos utilizados para a decisão automatizada, resguardados os segredos comercial e industrial.',
            cesgranrioTip: 'Revisão de decisão automatizada: critérios e procedimentos claros, respeitados segredos comercial e industrial.'
          }
        ],
        transpetroApplication: 'Auditoria de algoritmos de ranqueamento e contratação corporativa para mitigar riscos de discriminação e litígios trabalhistas.'
      }
    ],
    examChecklist: [
      'SHAP baseia-se na Teoria dos Jogos Cooperativos (Lloyd Shapley).',
      'LIME cria aproximações lineares locais para explicar modelos caixa-preta.',
      'Paridade Demográfica foca na proporção geral de desfecho positivo; Igualdade de Oportunidades foca no Recall dos qualificados.',
      'A soma dos valores SHAP soma a diferença entre a predição da instância e a média base.',
      'TreeSHAP calcula valores SHAP em tempo polinomial para modelos de árvore.'
    ],
    practiceQuestions: []
  }
];
