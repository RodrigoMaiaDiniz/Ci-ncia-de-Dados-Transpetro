import React, { useState } from 'react';
import { Copy, Check, Highlighter, Code2, Terminal, Hash } from 'lucide-react';

interface CodeBlockHighlightProps {
  code: string;
  language?: string;
  inline?: boolean;
}

export const CodeBlockHighlight: React.FC<CodeBlockHighlightProps> = ({
  code,
  language = 'python',
  inline = false,
}) => {
  const [copied, setCopied] = useState(false);
  const [isHighlighted, setIsHighlighted] = useState(true);
  const [showLineNumbers, setShowLineNumbers] = useState(true);

  if (inline) {
    return (
      <code className="px-1.5 py-0.5 rounded-md bg-slate-900 border border-slate-800 text-emerald-300 font-mono text-[0.88em] font-medium tracking-tight">
        {code}
      </code>
    );
  }

  const cleanCode = code.replace(/\n$/, '');
  const lines = cleanCode.split('\n');

  const detectLanguage = (lang?: string, codeText: string = ''): string => {
    const l = (lang || '').toLowerCase().trim();
    if (l && l !== 'code' && l !== 'text') return l;
    if (/\b(?:SELECT|FROM|WHERE|JOIN|GROUP BY|ORDER BY|PARTITION BY|OVER|HAVING)\b/i.test(codeText)) return 'sql';
    if (/\b(?:spark|pyspark|withColumn|readStream|writeStream|SparkSession|DeltaTable)\b/i.test(codeText)) return 'pyspark';
    if (/\b(?:def |import |class |print\(|np\.|pd\.|plt\.|sklearn|fit_transform|train_test_split)\b/.test(codeText)) return 'python';
    if (/\b(?:docker|kubectl|pip install|npm install|git clone|bash|chmod)\b/.test(codeText)) return 'bash';
    return l || 'python';
  };

  const resolvedLanguage = detectLanguage(language, cleanCode);

  const handleCopy = () => {
    navigator.clipboard.writeText(cleanCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  const getLanguageLabel = (lang: string) => {
    const l = (lang || '').toLowerCase();
    if (l === 'python' || l === 'py') return 'PYTHON • DATA SCIENCE';
    if (l === 'pyspark' || l === 'spark') return 'PYSPARK • TRANSPETRO';
    if (l === 'sql' || l === 'postgresql' || l === 'mysql') return 'SQL • BANCA CESGRANRIO';
    if (l === 'bash' || l === 'sh' || l === 'shell') return 'TERMINAL / BASH';
    if (l === 'json') return 'JSON SCHEMA';
    if (l === 'javascript' || l === 'js' || l === 'ts' || l === 'typescript') return 'JAVASCRIPT / TYPESCRIPT';
    if (l === 'r') return 'R STATS';
    return l.toUpperCase() || 'CÓDIGO';
  };

  // Syntax highlighting tokenizer
  const renderHighlightedLine = (line: string) => {
    if (!isHighlighted) {
      return <span className="text-slate-200">{line}</span>;
    }

    // Comments check (Python #, SQL --, JS //)
    const commentMatch = line.match(/^(\s*)(#|--|\/\/)(.*)$/);
    if (commentMatch) {
      return (
        <>
          <span className="text-slate-400">{commentMatch[1]}</span>
          <span className="text-slate-500 italic">{commentMatch[2]}{commentMatch[3]}</span>
        </>
      );
    }

    // Token regex pattern
    const tokenRegex = /(".*?"|'.*?'|\b(?:def|class|return|import|from|as|if|elif|else|for|while|try|except|finally|with|in|is|not|and|or|lambda|yield|raise|pass|break|continue|SELECT|FROM|WHERE|JOIN|LEFT|RIGHT|INNER|ON|GROUP|BY|ORDER|HAVING|LIMIT|OVER|PARTITION|WINDOW|UNION|ALL|CASE|WHEN|THEN|END|CAST|DESC|ASC|AVG|SUM|COUNT|MIN|MAX)\b|\b(?:fit|predict|transform|fit_transform|score|evaluate|print|len|range|enumerate|zip|dict|list|set|tuple|withColumn|select|filter|groupBy|agg|col|lit|when|otherwise|Window|row_number|rank|dense_rank|readStream|writeStream|Pipeline|StandardScaler|train_test_split|RandomForestClassifier|XGBClassifier)\b|\b(?:True|False|None|NULL|null|true|false)\b|\b\d+(?:\.\d+)?\b|[=+\-*/%&|^~<>!]+|[()[\]{},:.]|\s+|[a-zA-Z_]\w*)/g;

    const parts = line.match(tokenRegex) || [line];

    return (
      <>
        {parts.map((token, i) => {
          // String literals
          if ((token.startsWith('"') && token.endsWith('"')) || (token.startsWith("'") && token.endsWith("'"))) {
            return <span key={i} className="text-amber-300 font-normal">{token}</span>;
          }

          // Reserved Keywords
          if (/^(?:def|class|return|import|from|as|if|elif|else|for|while|try|except|finally|with|in|is|not|and|or|lambda|yield|raise|pass|break|continue|SELECT|FROM|WHERE|JOIN|LEFT|RIGHT|INNER|ON|GROUP|BY|ORDER|HAVING|LIMIT|OVER|PARTITION|WINDOW|UNION|ALL|CASE|WHEN|THEN|END|CAST|DESC|ASC)$/i.test(token)) {
            return <span key={i} className="text-purple-400 font-bold">{token}</span>;
          }

          // Built-ins & High-priority Data Science / Spark methods
          if (/^(?:fit|predict|transform|fit_transform|score|evaluate|print|len|range|enumerate|zip|dict|list|set|tuple|withColumn|select|filter|groupBy|agg|col|lit|when|otherwise|Window|row_number|rank|dense_rank|readStream|writeStream|Pipeline|StandardScaler|train_test_split|RandomForestClassifier|XGBClassifier|AVG|SUM|COUNT|MIN|MAX)$/i.test(token)) {
            return <span key={i} className="text-cyan-300 font-semibold">{token}</span>;
          }

          // Booleans & Constants
          if (/^(?:True|False|None|NULL|null|true|false)$/.test(token)) {
            return <span key={i} className="text-rose-400 font-semibold">{token}</span>;
          }

          // Numbers
          if (/^\d+(?:\.\d+)?$/.test(token)) {
            return <span key={i} className="text-emerald-400 font-mono">{token}</span>;
          }

          // Operators
          if (/^[=+\-*/%&|^~<>!]+$/.test(token)) {
            return <span key={i} className="text-slate-400">{token}</span>;
          }

          // Default code identifier
          return <span key={i} className="text-slate-100">{token}</span>;
        })}
      </>
    );
  };

  return (
    <div 
      className={`my-3.5 rounded-xl overflow-hidden border transition-all duration-200 ${
        isHighlighted 
          ? 'border-emerald-500/40 bg-[#070b16] shadow-xl code-highlight-glow' 
          : 'border-slate-800 bg-slate-950 shadow-md'
      }`}
    >
      {/* Code Header Bar */}
      <div className="flex items-center justify-between px-3 sm:px-4 py-2 bg-slate-900/90 border-b border-slate-800 select-none">
        <div className="flex items-center gap-2.5">
          {/* macOS / Terminal style dots */}
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
            <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
          </div>

          {/* Language Tag */}
          <div className="flex items-center gap-1.5 pl-1.5 text-[11px] font-bold text-slate-300 tracking-wide font-mono">
            <Code2 className="w-3.5 h-3.5 text-emerald-400" />
            <span>{getLanguageLabel(resolvedLanguage)}</span>
            <span className="text-[10px] text-slate-500 font-normal hidden sm:inline">
              ({lines.length} {lines.length === 1 ? 'linha' : 'linhas'})
            </span>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-1.5">
          {/* Destacar Código Toggle */}
          <button
            type="button"
            onClick={() => setIsHighlighted(!isHighlighted)}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-bold transition active:scale-95 border ${
              isHighlighted
                ? 'bg-emerald-500/25 text-emerald-300 border-emerald-500/50 shadow-sm ring-1 ring-emerald-500/30'
                : 'bg-slate-800 hover:bg-slate-700 text-slate-400 border-slate-700 hover:text-slate-200'
            }`}
            title="Alternar realce e destaque visual de código com cores sintáticas (Python, SQL, PySpark)"
          >
            <Highlighter className="w-3.5 h-3.5 text-emerald-400" />
            <span>{isHighlighted ? 'Destacado' : 'Destacar Código'}</span>
          </button>

          {/* Line Numbers Toggle */}
          <button
            type="button"
            onClick={() => setShowLineNumbers(!showLineNumbers)}
            className={`flex items-center gap-1 px-2 py-1 rounded-lg text-[11px] font-semibold transition active:scale-95 border ${
              showLineNumbers
                ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40'
                : 'bg-slate-800 hover:bg-slate-700 text-slate-400 border-slate-700'
            }`}
            title="Exibir ou ocultar numeração de linhas"
          >
            <Hash className="w-3 h-3 text-cyan-400" />
            <span className="hidden sm:inline">Linhas</span>
          </button>

          {/* Copy Code Button */}
          <button
            type="button"
            onClick={handleCopy}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-[11px] font-bold transition active:scale-95 border shadow-sm ${
              copied
                ? 'bg-emerald-600 text-white border-emerald-500 ring-2 ring-emerald-400/50'
                : 'bg-emerald-950/70 hover:bg-emerald-900 border-emerald-500/50 text-emerald-300 hover:text-white'
            }`}
            title="Copiar código de programação para a área de transferência"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-white" />
                <span className="text-white font-extrabold">Copiado!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-emerald-400" />
                <span>Copiar</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Code Body with optional line numbering and syntax tokens */}
      <div className="relative group overflow-x-auto text-[13px] leading-relaxed font-mono p-3.5 bg-[#060a14]">
        <table className="w-full border-collapse">
          <tbody>
            {lines.map((line, idx) => (
              <tr key={idx} className="hover:bg-slate-900/60 transition-colors">
                {showLineNumbers && (
                  <td className="w-8 pr-3 text-right select-none text-[11px] font-mono text-slate-600 border-r border-slate-800/80 align-top">
                    {idx + 1}
                  </td>
                )}
                <td className={`${showLineNumbers ? 'pl-3' : 'pl-1'} whitespace-pre align-top`}>
                  {renderHighlightedLine(line)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Quick floating hover copy button */}
        <button
          type="button"
          onClick={handleCopy}
          className="absolute top-2.5 right-3 opacity-0 group-hover:opacity-100 transition-opacity p-1.5 rounded-lg bg-slate-800/90 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 text-[10px] font-semibold flex items-center gap-1 shadow-md"
          title="Copiar código"
        >
          {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3 text-slate-400" />}
          <span>{copied ? 'Copiado!' : 'Copiar'}</span>
        </button>
      </div>
    </div>
  );
};
