/**
 * Utilitário de formatação de expressões matemáticas e estatísticas
 * no padrão oficial de Python das provas de Ciência de Dados da Petrobras e Transpetro (Cesgranrio / Cebraspe).
 * 
 * Converte qualquer código ou resquício de sintaxe LaTeX em código/expressões Python idiomáticas 
 * (com NumPy, Pandas e operadores Python) exatamente como cobrado nos cadernos de prova.
 */
export function cleanCesgranrioExamNotation(text: string): string {
  if (!text || typeof text !== 'string') return text || '';

  let res = text;

  // Substituir blocos de código TeX com display math $$ ... $$ por bloco de código Python
  res = res.replace(/\$\$([\s\S]*?)\$\$/g, (_, inner) => {
    const pythonExpr = convertLatexToPython(inner).trim();
    if (pythonExpr.includes('\n') || pythonExpr.length > 40) {
      return `\n\`\`\`python\n# Notação oficial de prova Petrobras/Transpetro:\n${pythonExpr}\n\`\`\`\n`;
    }
    return ` \`${pythonExpr}\` `;
  });

  // Substituir inline math $ ... $ (assegurando que não seja preço monetário como $ 10 ou US$ 50)
  res = res.replace(/\$([^\$\n]+?)\$/g, (_, inner) => {
    // Ignorar se for valor monetário ex: $ 500,00 ou $100
    if (/^\s*\d+([.,]\d+)?\s*$/.test(inner)) {
      return `$${inner}$`;
    }
    const converted = convertLatexToPython(inner);
    return `\`${converted}\``;
  });

  // Limpeza de comandos LaTeX soltos que possam ter ficado no texto sem delimitadores $
  res = convertLatexToPython(res, true);

  return res;
}

export function convertLatexToPython(content: string, isTextPass = false): string {
  let c = content;

  // Limpeza de marcações de texto e caixas TeX
  c = c.replace(/\\underbrace\{([^{}]+)\}_\{([^{}]+)\}/g, '$1 /* $2 */');
  c = c.replace(/\\overbrace\{([^{}]+)\}_\{([^{}]+)\}/g, '$1 /* $2 */');
  c = c.replace(/\\text\{([^{}]+)\}/g, '$1');
  c = c.replace(/\\mathrm\{([^{}]+)\}/g, '$1');
  c = c.replace(/\\mathbf\{([^{}]+)\}/g, '$1');
  c = c.replace(/\\mathcal\{([^{}]+)\}/g, '$1');
  c = c.replace(/\\mathbb\{([^{}]+)\}/g, '$1');
  c = c.replace(/\\boldsymbol\{([^{}]+)\}/g, '$1');

  // Matrizes em LaTeX -> representação NumPy np.array(...)
  c = c.replace(/\\begin\{bmatrix\}([\s\S]*?)\\end\{bmatrix\}/g, (_, matrixBody) => {
    const rows = matrixBody
      .trim()
      .split('\\\\')
      .map((row: string) => `[${row.trim().replace(/&/g, ', ')}]`)
      .join(', ');
    return `np.array([${rows}])`;
  });

  // Frações: \frac{a}{b} -> (a) / (b)
  // Repetir para pegar frações aninhadas
  for (let i = 0; i < 3; i++) {
    c = c.replace(/\\frac\{([^{}]+)\}\{([^{}]+)\}/g, '($1) / ($2)');
    c = c.replace(/\\dfrac\{([^{}]+)\}\{([^{}]+)\}/g, '($1) / ($2)');
  }

  // Raízes quadradas e n-ésimas: \sqrt{x} -> np.sqrt(x)
  c = c.replace(/\\sqrt\{([^{}]+)\}/g, 'np.sqrt($1)');
  c = c.replace(/\\sqrt\[([^{}]+)\]\{([^{}]+)\}/g, '($2) ** (1 / ($1))');

  // Normas vetoriais e matriciais
  c = c.replace(/\|\|([^{}]+)\|\|_2\^2/g, 'np.sum(($1) ** 2)');
  c = c.replace(/\|\|([^{}]+)\|\|\^2/g, 'np.sum(($1) ** 2)');
  c = c.replace(/\|\|([^{}]+)\|\|_1/g, 'np.sum(np.abs($1))');
  c = c.replace(/\|\|([^{}]+)\|\|/g, 'np.linalg.norm($1)');

  // Somatórios e Produtórios -> np.sum / np.prod
  c = c.replace(/\\sum_\{[^}]+\}\^\{[^}]+\}\s*/g, 'np.sum');
  c = c.replace(/\\sum_\{[^}]+\}\s*/g, 'np.sum');
  c = c.replace(/\\sum\b\s*/g, 'np.sum');
  c = c.replace(/\\prod_\{[^}]+\}\^\{[^}]+\}\s*/g, 'np.prod');
  c = c.replace(/\\prod_\{[^}]+\}\s*/g, 'np.prod');
  c = c.replace(/\\prod\b\s*/g, 'np.prod');

  // Funções matemáticas canônicas do NumPy / Python
  c = c.replace(/\\exp\b/g, 'np.exp');
  c = c.replace(/\\log_2\b/g, 'np.log2');
  c = c.replace(/\\log_\{2\}\b/g, 'np.log2');
  c = c.replace(/\\log_\{10\}\b/g, 'np.log10');
  c = c.replace(/\\log\b/g, 'np.log');
  c = c.replace(/\\ln\b/g, 'np.log');
  c = c.replace(/\\sin\b/g, 'np.sin');
  c = c.replace(/\\cos\b/g, 'np.cos');
  c = c.replace(/\\tan\b/g, 'np.tan');
  c = c.replace(/\\tanh\b/g, 'np.tanh');
  c = c.replace(/\\min\b/g, 'min');
  c = c.replace(/\\max\b/g, 'max');
  c = c.replace(/\\det\b/g, 'np.linalg.det');
  c = c.replace(/\\Tr\b/g, 'np.trace');
  c = c.replace(/\\nabla\b/g, 'grad_');

  // Letras gregas como identificadores Python
  c = c.replace(/\\alpha\b/g, 'alpha');
  c = c.replace(/\\beta\b/g, 'beta');
  c = c.replace(/\\gamma\b/g, 'gamma');
  c = c.replace(/\\delta\b/g, 'delta');
  c = c.replace(/\\epsilon\b|\\varepsilon\b/g, 'epsilon');
  c = c.replace(/\\theta\b/g, 'theta');
  c = c.replace(/\\lambda\b/g, 'lambda_param');
  c = c.replace(/\\mu\b/g, 'mu');
  c = c.replace(/\\sigma\b/g, 'sigma');
  c = c.replace(/\\rho\b/g, 'rho');
  c = c.replace(/\\tau\b/g, 'tau');
  c = c.replace(/\\phi\b/g, 'phi');
  c = c.replace(/\\chi\b/g, 'chi');
  c = c.replace(/\\psi\b/g, 'psi');
  c = c.replace(/\\omega\b/g, 'omega');
  c = c.replace(/\\eta\b/g, 'learning_rate');
  c = c.replace(/\\xi\b/g, 'xi');
  c = c.replace(/\\Sigma\b/g, 'cov_matrix');
  c = c.replace(/\\Delta\b/g, 'delta_');
  c = c.replace(/\\Omega\b/g, 'omega');
  c = c.replace(/\\Lambda\b/g, 'lambda_matrix');

  // Potências e expoentes para operador Python **
  c = c.replace(/\^2\b/g, ' ** 2');
  c = c.replace(/\^3\b/g, ' ** 3');
  c = c.replace(/\^T\b/g, '.T');
  c = c.replace(/\^\{-1\}/g, '_inv');
  c = c.replace(/\^\{2\}/g, ' ** 2');
  c = c.replace(/\^\{3\}/g, ' ** 3');
  c = c.replace(/\^\{([^}]+)\}/g, ' ** ($1)');
  c = c.replace(/\^([0-9a-zA-Z])/g, ' ** $1');

  // Operadores e relações em Python
  c = c.replace(/\\le\b|\\leq\b/g, ' <= ');
  c = c.replace(/\\ge\b|\\geq\b/g, ' >= ');
  c = c.replace(/\\ne\b|\\neq\b/g, ' != ');
  c = c.replace(/\\approx\b/g, ' ~= ');
  c = c.replace(/\\pm\b/g, ' +- ');
  c = c.replace(/\\times\b|\\cdot\b/g, ' * ');
  c = c.replace(/\\div\b/g, ' / ');
  c = c.replace(/\\in\b/g, ' in ');
  c = c.replace(/\\notin\b/g, ' not in ');
  c = c.replace(/\\to\b|\\rightarrow\b/g, ' -> ');
  c = c.replace(/\\Rightarrow\b/g, ' => ');
  c = c.replace(/\\iff\b/g, ' <==> ');
  c = c.replace(/\\forall\b/g, 'para todo');
  c = c.replace(/\\partial\b/g, 'd_');

  // Notações típicas de ML e Estatística em Python
  c = c.replace(/\\hat\{y\}/g, 'y_pred');
  c = c.replace(/\\hat\s*y/g, 'y_pred');
  c = c.replace(/\\hat\{w\}/g, 'w_estimado');
  c = c.replace(/\\hat\{f\}/g, 'f_modelo');
  c = c.replace(/\\bar\{X\}_n/g, 'x_barra');
  c = c.replace(/\\bar\{x\}/g, 'x_medio');
  c = c.replace(/\\bar\s*x/g, 'x_medio');
  c = c.replace(/\\vec\{v\}_([a-zA-Z0-9]+)/g, 'vetor_$1');

  // Ajustes de parênteses e delimitadores TeX
  c = c.replace(/\\left\(/g, '(');
  c = c.replace(/\\right\)/g, ')');
  c = c.replace(/\\left\[/g, '[');
  c = c.replace(/\\right\]/g, ']');
  c = c.replace(/\\left\\{/g, '{');
  c = c.replace(/\\right\\}/g, '}');
  c = c.replace(/\\left\|/g, '|');
  c = c.replace(/\\right\|/g, '|');
  c = c.replace(/\\left\\lfloor\s*/g, 'np.floor(');
  c = c.replace(/\\right\\rfloor/g, ')');
  c = c.replace(/\\Big\(/g, '(');
  c = c.replace(/\\Big\)/g, ')');
  c = c.replace(/\\big\(/g, '(');
  c = c.replace(/\\big\)/g, ')');

  // Espaçamentos TeX
  c = c.replace(/\\[,;:!]/g, ' ');
  c = c.replace(/\\quad\b|\\qquad\b/g, '  ');

  // Se não estiver em passagem de texto livre, remover barras invertidas remanescentes de escapes
  if (!isTextPass) {
    c = c.replace(/\\/g, '');
  }

  // Normalizar múltiplos espaços
  c = c.replace(/[ \t]{2,}/g, ' ');

  return c;
}

