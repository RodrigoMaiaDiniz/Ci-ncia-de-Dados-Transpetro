import jsPDF from 'jspdf';
import { OfficialSyllabusTopic, RequestedSubject, Question } from '../types';
import { INITIAL_QUESTIONS } from '../data/initialData';
import { OFFICIAL_EDITAL_ENFASE_8 } from '../data/officialEditalEnfase8';

// ==========================================
// PALETA DE CORES EDITORIAIS TRANSPETRO
// ==========================================
const COLORS = {
  primaryNavy: [15, 23, 42] as [number, number, number], // #0f172a
  transpetroGreen: [5, 150, 105] as [number, number, number], // #059669
  transpetroDarkGreen: [4, 120, 87] as [number, number, number], // #047857
  accentBlue: [37, 99, 235] as [number, number, number], // #2563eb
  amberWarning: [217, 119, 6] as [number, number, number], // #d97706
  slateDark: [51, 65, 85] as [number, number, number], // #334155
  slateMuted: [100, 116, 139] as [number, number, number], // #64748b
  slateLight: [241, 245, 249] as [number, number, number], // #f1f5f9
  borderLight: [226, 232, 240] as [number, number, number], // #e2e8f0
  white: [255, 255, 255] as [number, number, number],
  amberLight: [254, 243, 199] as [number, number, number],
  amberBorder: [245, 158, 11] as [number, number, number],
  greenLight: [236, 253, 245] as [number, number, number],
  greenBorder: [110, 231, 183] as [number, number, number],
};

const PAGE_CONFIG = {
  margin: 16,
  pageWidth: 210,
  pageHeight: 297,
  usableWidth: 178,
  maxY: 272,
};

// ==========================================
// FUNÇÕES AUXILIARES DE RENDERIZAÇÃO
// ==========================================

function sanitizeText(text: string): string {
  if (!text) return '';
  // Substitui caracteres especiais problemáticos no jsPDF padrão se houver
  return text
    .replace(/[\u2018\u2019]/g, "'")
    .replace(/[\u201C\u201D]/g, '"')
    .replace(/[\u2013\u2014]/g, '-')
    .replace(/[\t]/g, '   ');
}

class PDFContext {
  doc: jsPDF;
  currentY: number;
  topicTitle: string;
  topicCode: string;

  constructor(doc: jsPDF, topicTitle: string = 'Transpetro Edital', topicCode: string = '') {
    this.doc = doc;
    this.currentY = PAGE_CONFIG.margin;
    this.topicTitle = topicTitle;
    this.topicCode = topicCode;
  }

  checkPageBreak(neededHeight: number): boolean {
    if (this.currentY + neededHeight > PAGE_CONFIG.maxY) {
      this.doc.addPage();
      this.currentY = 22;
      this.drawRunningHeader();
      return true;
    }
    return false;
  }

  drawRunningHeader() {
    this.doc.saveGraphicsState();
    this.doc.setDrawColor(...COLORS.borderLight);
    this.doc.setLineWidth(0.3);
    this.doc.line(PAGE_CONFIG.margin, 15, PAGE_CONFIG.pageWidth - PAGE_CONFIG.margin, 15);

    this.doc.setFont('helvetica', 'bold');
    this.doc.setFontSize(7.5);
    this.doc.setTextColor(...COLORS.transpetroGreen);
    this.doc.text('TRANSPETRO • CONCURSO PÚBLICO', PAGE_CONFIG.margin, 12);

    this.doc.setFont('helvetica', 'normal');
    this.doc.setFontSize(7);
    this.doc.setTextColor(...COLORS.slateMuted);
    const rightText = `${this.topicCode ? `[${this.topicCode}] ` : ''}${this.topicTitle}`.substring(0, 75);
    this.doc.text(rightText, PAGE_CONFIG.pageWidth - PAGE_CONFIG.margin, 12, { align: 'right' });
    this.doc.restoreGraphicsState();
  }

  addVerticalSpace(space: number) {
    this.currentY += space;
    this.checkPageBreak(0);
  }

  drawSectionTitle(title: string, badge?: string) {
    this.checkPageBreak(16);
    this.addVerticalSpace(4);

    // Barra lateral colorida de destaque
    this.doc.setFillColor(...COLORS.transpetroGreen);
    this.doc.roundedRect(PAGE_CONFIG.margin, this.currentY, 3, 11, 1, 1, 'F');

    this.doc.setFont('helvetica', 'bold');
    this.doc.setFontSize(11);
    this.doc.setTextColor(...COLORS.primaryNavy);
    this.doc.text(title.toUpperCase(), PAGE_CONFIG.margin + 6, this.currentY + 8);

    if (badge) {
      this.doc.setFontSize(7.5);
      this.doc.setFont('helvetica', 'bold');
      this.doc.setTextColor(...COLORS.transpetroDarkGreen);
      this.doc.setFillColor(...COLORS.greenLight);
      const badgeWidth = this.doc.getTextWidth(badge) + 6;
      const badgeX = PAGE_CONFIG.pageWidth - PAGE_CONFIG.margin - badgeWidth;
      this.doc.roundedRect(badgeX, this.currentY + 1.5, badgeWidth, 6.5, 2, 2, 'F');
      this.doc.text(badge, badgeX + 3, this.currentY + 6);
    }

    this.currentY += 14;
  }

  drawParagraph(text: string, options: { 
    fontSize?: number; 
    textColor?: [number, number, number]; 
    fontStyle?: 'normal' | 'bold' | 'italic';
    indent?: number;
    lineSpacing?: number;
  } = {}) {
    const fontSize = options.fontSize || 9;
    const textColor = options.textColor || COLORS.slateDark;
    const fontStyle = options.fontStyle || 'normal';
    const indent = options.indent || 0;
    const lineSpacing = options.lineSpacing || 4.2;

    this.doc.setFont('helvetica', fontStyle);
    this.doc.setFontSize(fontSize);
    this.doc.setTextColor(...textColor);

    const maxWidth = PAGE_CONFIG.usableWidth - indent;
    const lines = this.doc.splitTextToSize(sanitizeText(text), maxWidth);

    for (const line of lines) {
      this.checkPageBreak(lineSpacing);
      this.doc.text(line, PAGE_CONFIG.margin + indent, this.currentY);
      this.currentY += lineSpacing;
    }
  }

  drawBulletItem(bulletSymbol: string, text: string, boldPrefix?: string) {
    const fontSize = 8.5;
    const lineSpacing = 4.1;
    this.doc.setFontSize(fontSize);

    const indent = 8;
    const maxWidth = PAGE_CONFIG.usableWidth - indent;
    const fullText = boldPrefix ? `${boldPrefix}: ${text}` : text;
    const lines = this.doc.splitTextToSize(sanitizeText(fullText), maxWidth);

    this.checkPageBreak(lines.length * lineSpacing + 2);

    // Bullet indicator
    this.doc.setFont('helvetica', 'bold');
    this.doc.setTextColor(...COLORS.transpetroGreen);
    this.doc.text(bulletSymbol, PAGE_CONFIG.margin + 1, this.currentY);

    // Text content
    let startLine = 0;
    if (boldPrefix && lines.length > 0) {
      this.doc.setFont('helvetica', 'bold');
      this.doc.setTextColor(...COLORS.primaryNavy);
      const prefixText = `${boldPrefix}: `;
      this.doc.text(prefixText, PAGE_CONFIG.margin + indent, this.currentY);
      const prefixWidth = this.doc.getTextWidth(prefixText);

      this.doc.setFont('helvetica', 'normal');
      this.doc.setTextColor(...COLORS.slateDark);
      const restFirstLine = lines[0].substring(prefixText.length);
      this.doc.text(restFirstLine, PAGE_CONFIG.margin + indent + prefixWidth, this.currentY);
      this.currentY += lineSpacing;
      startLine = 1;
    }

    this.doc.setFont('helvetica', 'normal');
    this.doc.setTextColor(...COLORS.slateDark);
    for (let i = startLine; i < lines.length; i++) {
      this.checkPageBreak(lineSpacing);
      this.doc.text(lines[i], PAGE_CONFIG.margin + indent, this.currentY);
      this.currentY += lineSpacing;
    }
    this.currentY += 1.5;
  }

  drawBox(title: string, content: string | string[], options: {
    bgColor?: [number, number, number];
    borderColor?: [number, number, number];
    titleColor?: [number, number, number];
    icon?: string;
  } = {}) {
    const bgColor = options.bgColor || COLORS.slateLight;
    const borderColor = options.borderColor || COLORS.borderLight;
    const titleColor = options.titleColor || COLORS.primaryNavy;

    const contentLines: string[] = [];
    this.doc.setFontSize(8);
    const maxContentWidth = PAGE_CONFIG.usableWidth - 8;

    if (Array.isArray(content)) {
      content.forEach(c => {
        const lines = this.doc.splitTextToSize(sanitizeText(c), maxContentWidth);
        contentLines.push(...lines);
      });
    } else {
      const lines = this.doc.splitTextToSize(sanitizeText(content), maxContentWidth);
      contentLines.push(...lines);
    }

    const boxHeight = 11 + (contentLines.length * 3.8) + 4;
    this.checkPageBreak(boxHeight);

    // Draw box background & border
    this.doc.setFillColor(...bgColor);
    this.doc.setDrawColor(...borderColor);
    this.doc.setLineWidth(0.4);
    this.doc.roundedRect(PAGE_CONFIG.margin, this.currentY, PAGE_CONFIG.usableWidth, boxHeight, 2, 2, 'FD');

    // Box header
    this.doc.setFont('helvetica', 'bold');
    this.doc.setFontSize(8.5);
    this.doc.setTextColor(...titleColor);
    const headerTitle = options.icon ? `${options.icon}  ${title}` : title;
    this.doc.text(headerTitle, PAGE_CONFIG.margin + 4, this.currentY + 6.5);

    // Box content
    this.doc.setFont('helvetica', 'normal');
    this.doc.setFontSize(7.8);
    this.doc.setTextColor(...COLORS.slateDark);

    let textY = this.currentY + 11.5;
    for (const line of contentLines) {
      this.doc.text(line, PAGE_CONFIG.margin + 4, textY);
      textY += 3.8;
    }

    this.currentY += boxHeight + 4;
  }

  drawCodeBox(label: string, code: string) {
    const codeLines = this.doc.splitTextToSize(sanitizeText(code), PAGE_CONFIG.usableWidth - 8);
    const boxHeight = 7 + (codeLines.length * 3.6) + 4;
    this.checkPageBreak(boxHeight + 5);

    this.doc.setFont('helvetica', 'bold');
    this.doc.setFontSize(7.5);
    this.doc.setTextColor(...COLORS.transpetroDarkGreen);
    this.doc.text(`Fórmula / Código / Notação: ${label}`, PAGE_CONFIG.margin, this.currentY);
    this.currentY += 3.5;

    this.doc.setFillColor(...COLORS.slateLight);
    this.doc.setDrawColor(...COLORS.borderLight);
    this.doc.setLineWidth(0.3);
    this.doc.roundedRect(PAGE_CONFIG.margin, this.currentY, PAGE_CONFIG.usableWidth, boxHeight, 1.5, 1.5, 'FD');

    this.doc.setFont('courier', 'bold');
    this.doc.setFontSize(7.5);
    this.doc.setTextColor(15, 23, 42);

    let cy = this.currentY + 5;
    for (const line of codeLines) {
      this.doc.text(line, PAGE_CONFIG.margin + 4, cy);
      cy += 3.6;
    }

    this.currentY += boxHeight + 3.5;
  }
}

// Finaliza adicionando rodapés em todas as páginas
function finalizeDocumentWithFooters(doc: jsPDF) {
  const totalPages = doc.getNumberOfPages();
  const today = new Date().toLocaleDateString('pt-BR');

  for (let i = 1; i <= totalPages; i++) {
    doc.setPage(i);
    doc.saveGraphicsState();

    // Linha divisória do rodapé
    doc.setDrawColor(...COLORS.borderLight);
    doc.setLineWidth(0.3);
    doc.line(PAGE_CONFIG.margin, PAGE_CONFIG.pageHeight - 12, PAGE_CONFIG.pageWidth - PAGE_CONFIG.margin, PAGE_CONFIG.pageHeight - 12);

    // Texto do rodapé
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7);
    doc.setTextColor(...COLORS.slateMuted);
    
    // Esquerda
    doc.text(
      `Concurso Transpetro • Ênfase 8: Ciência de Dados • Banca Cesgranrio (Gerado em ${today})`, 
      PAGE_CONFIG.margin, 
      PAGE_CONFIG.pageHeight - 8
    );

    // Direita
    doc.setFont('helvetica', 'bold');
    doc.text(
      `Página ${i} de ${totalPages}`, 
      PAGE_CONFIG.pageWidth - PAGE_CONFIG.margin, 
      PAGE_CONFIG.pageHeight - 8, 
      { align: 'right' }
    );

    doc.restoreGraphicsState();
  }
}

// Encontra questões relacionadas ao tópico
function findQuestionsForTopic(topic: OfficialSyllabusTopic): Question[] {
  const normalizedTitle = topic.title.toLowerCase();
  const normalizedArea = topic.area.toLowerCase();

  return INITIAL_QUESTIONS.filter(q => {
    const qTopic = q.topic.toLowerCase();
    const qSub = q.subtopic.toLowerCase();
    const qStmt = q.statement.toLowerCase();

    // Match direto por área ou tópico
    if (normalizedArea.includes(qTopic) || qTopic.includes(normalizedArea)) return true;
    if (normalizedTitle.includes(qTopic) || qTopic.includes(normalizedTitle)) return true;
    
    // Match por subtópicos
    return topic.subtopics.some(sub => {
      const s = sub.toLowerCase();
      return qSub.includes(s) || qStmt.includes(s) || s.includes(qSub);
    });
  }).slice(0, 3); // Até 3 questões representativas
}

// ==========================================
// 1. GERADOR DE PDF DE UM TÓPICO INDIVIDUAL DO EDITAL
// ==========================================
export function generateTopicPDF(topic: OfficialSyllabusTopic): jsPDF {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const ctx = new PDFContext(doc, topic.title, topic.itemCode);

  // ----------------------------------------
  // CABEÇALHO DO DOCUMENTO
  // ----------------------------------------
  // Barra superior verde Transpetro
  doc.setFillColor(...COLORS.transpetroGreen);
  doc.rect(0, 0, PAGE_CONFIG.pageWidth, 6, 'F');

  ctx.currentY = 14;

  // Header institucional
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(...COLORS.transpetroGreen);
  doc.text('PETROBRAS TRANSPORTE S.A. — TRANSPETRO', PAGE_CONFIG.margin, ctx.currentY);
  ctx.currentY += 4;

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.5);
  doc.setTextColor(...COLORS.slateMuted);
  doc.text('CONCURSO PÚBLICO • EDITAL CESGRANRIO • CARGO: PROFISSIONAL DE NÍVEL SUPERIOR', PAGE_CONFIG.margin, ctx.currentY);
  ctx.currentY += 3.5;

  doc.text('ÊNFASE 8: CIÊNCIA DE DADOS / ENGENHARIA DE DADOS', PAGE_CONFIG.margin, ctx.currentY);
  ctx.currentY += 6;

  // Badges da Matéria
  doc.setFillColor(...COLORS.slateDark);
  doc.roundedRect(PAGE_CONFIG.margin, ctx.currentY, 20, 6, 1.5, 1.5, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(...COLORS.white);
  doc.text(topic.itemCode, PAGE_CONFIG.margin + 3.5, ctx.currentY + 4.2);

  doc.setFillColor(...COLORS.greenLight);
  doc.roundedRect(PAGE_CONFIG.margin + 23, ctx.currentY, 35, 6, 1.5, 1.5, 'F');
  doc.setTextColor(...COLORS.transpetroDarkGreen);
  doc.text(topic.block, PAGE_CONFIG.margin + 26, ctx.currentY + 4.2);

  doc.setFillColor(...COLORS.slateLight);
  doc.roundedRect(PAGE_CONFIG.margin + 61, ctx.currentY, 40, 6, 1.5, 1.5, 'F');
  doc.setTextColor(...COLORS.slateDark);
  doc.text(`Área: ${topic.area}`, PAGE_CONFIG.margin + 64, ctx.currentY + 4.2);

  const relBadge = `Incidência: ${topic.relevance}`;
  doc.setFillColor(254, 242, 242);
  doc.roundedRect(PAGE_CONFIG.margin + 104, ctx.currentY, 36, 6, 1.5, 1.5, 'F');
  doc.setTextColor(185, 28, 28);
  doc.text(relBadge, PAGE_CONFIG.margin + 107, ctx.currentY + 4.2);

  ctx.currentY += 12;

  // Título do Tópico
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(15);
  doc.setTextColor(...COLORS.primaryNavy);
  const titleLines = doc.splitTextToSize(sanitizeText(topic.title), PAGE_CONFIG.usableWidth);
  for (const line of titleLines) {
    doc.text(line, PAGE_CONFIG.margin, ctx.currentY);
    ctx.currentY += 6.5;
  }
  ctx.currentY += 2;

  // Linha horizontal decorativa
  doc.setDrawColor(...COLORS.transpetroGreen);
  doc.setLineWidth(0.8);
  doc.line(PAGE_CONFIG.margin, ctx.currentY, PAGE_CONFIG.margin + 35, ctx.currentY);
  doc.setDrawColor(...COLORS.borderLight);
  doc.setLineWidth(0.3);
  doc.line(PAGE_CONFIG.margin + 35, ctx.currentY, PAGE_CONFIG.pageWidth - PAGE_CONFIG.margin, ctx.currentY);
  ctx.currentY += 6;

  // Ementa Oficial do Edital
  ctx.drawBox(
    'TEXTO OFICIAL DO EDITAL (BANCA CESGRANRIO)',
    topic.officialWording,
    {
      bgColor: COLORS.greenLight,
      borderColor: COLORS.greenBorder,
      titleColor: COLORS.transpetroDarkGreen,
      icon: '§'
    }
  );

  // ----------------------------------------
  // SEÇÃO 1: ROTEIRO PEDAGÓGICO DE CONTEÚDO (SUBTÓPICOS)
  // ----------------------------------------
  ctx.drawSectionTitle('1. Roteiro Pedagógico e Subtópicos Exigidos', `${topic.subtopics.length} Itens`);
  ctx.drawParagraph(
    'Abaixo estão discriminados todos os pontos específicos exigidos para este tópico segundo a bibliografia de referência e as últimas provas da Fundação Cesgranrio. Utilize os campos de checagem [ ] para controlar seus estudos.',
    { fontSize: 8.2, textColor: COLORS.slateMuted }
  );
  ctx.addVerticalSpace(2);

  topic.subtopics.forEach((sub, idx) => {
    ctx.drawBulletItem(`[  ] ${idx + 1}.`, sub);
  });

  // ----------------------------------------
  // SEÇÃO 2: CONCEITOS CENTRAIS, FÓRMULAS E CÓDIGO
  // ----------------------------------------
  if (topic.keyConceptsAndFormulas.length > 0) {
    ctx.drawSectionTitle('2. Conceitos Centrais, Fórmulas & Notações Técnicas');
    ctx.drawParagraph(
      'Definições matemáticas, algoritmos e sintaxes de alta cobrança que costumam ser exigidas tanto nas questões de múltipla escolha quanto na prova discursiva.',
      { fontSize: 8.2, textColor: COLORS.slateMuted }
    );
    ctx.addVerticalSpace(2);

    topic.keyConceptsAndFormulas.forEach(item => {
      ctx.drawParagraph(item.name, { fontSize: 9.5, fontStyle: 'bold', textColor: COLORS.primaryNavy });
      ctx.drawParagraph(item.description, { fontSize: 8.3, textColor: COLORS.slateDark, lineSpacing: 4 });
      if (item.formulaOrCode) {
        ctx.drawCodeBox(item.name, item.formulaOrCode);
      } else {
        ctx.addVerticalSpace(2);
      }
    });
  }

  // ----------------------------------------
  // SEÇÃO 3: PEGADINHAS DA BANCA CESGRANRIO
  // ----------------------------------------
  if (topic.cesgranrioExamTraps.length > 0) {
    ctx.drawSectionTitle('3. Armadilhas e Pegadinhas Clássicas da Cesgranrio');
    
    ctx.drawBox(
      'ATENÇÃO TOTAL DO CANDIDATO — DISTRATORES RECORRENTES DA BANCA',
      topic.cesgranrioExamTraps.map(trap => `• ${trap}`),
      {
        bgColor: COLORS.amberLight,
        borderColor: COLORS.amberBorder,
        titleColor: COLORS.amberWarning,
        icon: '!'
      }
    );
  }

  // ----------------------------------------
  // SEÇÃO 4: CONTEXTO PRÁTICO NA TRANSPETRO
  // ----------------------------------------
  ctx.drawSectionTitle('4. Aplicação Prática Operacional na Transpetro');
  ctx.drawParagraph(
    'A Cesgranrio valoriza a contextualização de problemas industriais, marítimos e de logística de combustíveis. Este tópico se aplica diretamente aos seguintes desafios corporativos da Transpetro:',
    { fontSize: 8.2, textColor: COLORS.slateMuted }
  );
  ctx.addVerticalSpace(2);
  ctx.drawBox(
    'CASO DE USO NO SETOR DE ENGENHARIA DE PETRÓLEO, GÁS & LOGÍSTICA',
    topic.transpetroPracticalContext,
    {
      bgColor: COLORS.slateLight,
      borderColor: COLORS.borderLight,
      titleColor: COLORS.primaryNavy,
      icon: '⚓'
    }
  );

  // ----------------------------------------
  // SEÇÃO 5: ESTRATÉGIA PEDAGÓGICA DE ESTUDO
  // ----------------------------------------
  ctx.drawSectionTitle('5. Plano de Fixação e Recomendações de Estudo');
  topic.recommendedStudyStrategy.forEach((step, sIdx) => {
    ctx.drawBulletItem(`Passo ${sIdx + 1}:`, step);
  });

  // ----------------------------------------
  // SEÇÃO 6: QUESTÕES DE FIXAÇÃO SELECIONADAS DA BANCA
  // ----------------------------------------
  const relatedQuestions = findQuestionsForTopic(topic);
  if (relatedQuestions.length > 0) {
    ctx.drawSectionTitle('6. Questões de Fixação e Treino da Banca Cesgranrio', `${relatedQuestions.length} Questões`);
    ctx.drawParagraph(
      'Exercite os conceitos estudados resolvendo os itens a seguir com seus respectivos gabaritos e análises de distratores:',
      { fontSize: 8.2, textColor: COLORS.slateMuted }
    );
    ctx.addVerticalSpace(3);

    relatedQuestions.forEach((q, qIdx) => {
      ctx.checkPageBreak(30);
      ctx.drawParagraph(`Questão ${qIdx + 1} • ${q.subtopic} (${q.difficulty})`, {
        fontSize: 9,
        fontStyle: 'bold',
        textColor: COLORS.transpetroDarkGreen,
      });

      ctx.drawParagraph(q.statement, { fontSize: 8.2, textColor: COLORS.primaryNavy, lineSpacing: 4 });
      ctx.addVerticalSpace(2);

      q.options.forEach(opt => {
        const isCorrect = opt.letter === q.correctAnswer;
        ctx.drawParagraph(
          `${opt.letter}) ${opt.text}`,
          {
            fontSize: 7.8,
            textColor: isCorrect ? COLORS.transpetroDarkGreen : COLORS.slateDark,
            fontStyle: isCorrect ? 'bold' : 'normal',
            indent: 4,
            lineSpacing: 3.8
          }
        );
      });

      ctx.addVerticalSpace(2);
      ctx.drawBox(
        `GABARITO: LETRA ${q.correctAnswer} — COMENTÁRIO DO PROFESSOR`,
        q.explanationCorrect,
        {
          bgColor: COLORS.greenLight,
          borderColor: COLORS.greenBorder,
          titleColor: COLORS.transpetroDarkGreen,
        }
      );

      if (q.cesgranrioTip) {
        ctx.drawParagraph(`Dica Cesgranrio: ${q.cesgranrioTip}`, {
          fontSize: 7.5,
          fontStyle: 'italic',
          textColor: COLORS.amberWarning,
          indent: 2
        });
      }

      ctx.addVerticalSpace(4);
    });
  }

  // ----------------------------------------
  // SEÇÃO 7: CAMPO DE ANOTAÇÕES DO CANDIDATO
  // ----------------------------------------
  ctx.checkPageBreak(35);
  ctx.drawSectionTitle('7. Anotações Pessoais & Fórmulas Próprias do Candidato');
  ctx.drawParagraph(
    'Utilize este espaço para registrar mnemônicos, pontos de dúvida para revisar e sínteses individuais:',
    { fontSize: 7.8, textColor: COLORS.slateMuted }
  );
  ctx.addVerticalSpace(3);

  // Linhas pautadas para anotações
  for (let l = 0; l < 5; l++) {
    ctx.checkPageBreak(7);
    doc.setDrawColor(...COLORS.borderLight);
    doc.setLineWidth(0.3);
    doc.line(PAGE_CONFIG.margin, ctx.currentY, PAGE_CONFIG.pageWidth - PAGE_CONFIG.margin, ctx.currentY);
    ctx.currentY += 6.5;
  }

  // Aplica rodapés em todas as páginas
  finalizeDocumentWithFooters(doc);

  return doc;
}

// ==========================================
// 2. GERADOR DE PDF DE ASSUNTO CONSULTADO NO AGENTE / HISTÓRICO
// ==========================================
export function generateRequestedSubjectPDF(subject: RequestedSubject): jsPDF {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const ctx = new PDFContext(doc, subject.title, subject.block);

  // Header Transpetro
  doc.setFillColor(...COLORS.transpetroGreen);
  doc.rect(0, 0, PAGE_CONFIG.pageWidth, 6, 'F');
  ctx.currentY = 14;

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(...COLORS.transpetroGreen);
  doc.text('PETROBRAS TRANSPORTE S.A. — CADERNO DE CONSULTA DO AGENTE IA', PAGE_CONFIG.margin, ctx.currentY);
  ctx.currentY += 4;

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.5);
  doc.setTextColor(...COLORS.slateMuted);
  doc.text(`REGISTRO DE ESTUDO • DATA: ${subject.timestamp || new Date().toLocaleDateString('pt-BR')} • MODO: ${subject.mode?.toUpperCase() || 'TUTOR'}`, PAGE_CONFIG.margin, ctx.currentY);
  ctx.currentY += 6;

  // Badges
  doc.setFillColor(...COLORS.slateDark);
  doc.roundedRect(PAGE_CONFIG.margin, ctx.currentY, 26, 6, 1.5, 1.5, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.5);
  doc.setTextColor(...COLORS.white);
  doc.text(subject.block, PAGE_CONFIG.margin + 3, ctx.currentY + 4.2);

  doc.setFillColor(...COLORS.slateLight);
  doc.roundedRect(PAGE_CONFIG.margin + 29, ctx.currentY, 40, 6, 1.5, 1.5, 'F');
  doc.setTextColor(...COLORS.slateDark);
  doc.text(subject.category, PAGE_CONFIG.margin + 32, ctx.currentY + 4.2);

  ctx.currentY += 11;

  // Título
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(14);
  doc.setTextColor(...COLORS.primaryNavy);
  const titleLines = doc.splitTextToSize(sanitizeText(subject.title), PAGE_CONFIG.usableWidth);
  for (const line of titleLines) {
    doc.text(line, PAGE_CONFIG.margin, ctx.currentY);
    ctx.currentY += 6;
  }
  ctx.currentY += 2;

  // Linha horizontal
  doc.setDrawColor(...COLORS.transpetroGreen);
  doc.setLineWidth(0.6);
  doc.line(PAGE_CONFIG.margin, ctx.currentY, PAGE_CONFIG.pageWidth - PAGE_CONFIG.margin, ctx.currentY);
  ctx.currentY += 5;

  // Pergunta / Prompt Solicitado
  ctx.drawBox(
    'PROMPT OU DÚVIDA SOLICITADA PELO CANDIDATO',
    subject.userQuery,
    {
      bgColor: COLORS.slateLight,
      borderColor: COLORS.borderLight,
      titleColor: COLORS.primaryNavy,
      icon: '?'
    }
  );

  // Resposta Completa do Agente
  ctx.drawSectionTitle('Resposta Pedagógica Completa do Agente Especialista');

  // Limpa markdown básico para texto corrido no PDF
  const cleanResponse = subject.agentResponse
    .replace(/^#+\s/gm, '')
    .replace(/\*\*(.*?)\*\*/g, '$1')
    .replace(/\*(.*?)\*/g, '$1')
    .replace(/```[\w]*\n/g, '')
    .replace(/```/g, '');

  const paragraphs = cleanResponse.split('\n\n');
  paragraphs.forEach(p => {
    if (!p.trim()) return;
    if (p.trim().startsWith('- ') || p.trim().startsWith('* ')) {
      const items = p.split('\n');
      items.forEach(it => {
        const clean = it.replace(/^[-*]\s*/, '').trim();
        if (clean) ctx.drawBulletItem('•', clean);
      });
    } else {
      ctx.drawParagraph(p.trim(), { fontSize: 8.5, lineSpacing: 4.1 });
      ctx.addVerticalSpace(2);
    }
  });

  // Anotações pessoais se houver
  if (subject.notes) {
    ctx.drawSectionTitle('Anotações Salvas pelo Estudante');
    ctx.drawBox(
      'OBSERVAÇÕES DO HISTÓRICO',
      subject.notes,
      {
        bgColor: COLORS.amberLight,
        borderColor: COLORS.amberBorder,
        titleColor: COLORS.amberWarning,
        icon: '✎'
      }
    );
  }

  finalizeDocumentWithFooters(doc);
  return doc;
}

// ==========================================
// 3. GERADOR DA APOSTILA COMPLETA EM PDF (TODOS OS TÓPICOS UNIFICADOS)
// ==========================================
export function generateAllTopicsCombinedPDF(topics: OfficialSyllabusTopic[] = OFFICIAL_EDITAL_ENFASE_8): jsPDF {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  // ----------------------------------------
  // CAPA DA APOSTILA COMPLETA
  // ----------------------------------------
  // Fundo do topo da capa
  doc.setFillColor(...COLORS.primaryNavy);
  doc.rect(0, 0, PAGE_CONFIG.pageWidth, 120, 'F');

  // Faixa verde Transpetro
  doc.setFillColor(...COLORS.transpetroGreen);
  doc.rect(0, 116, PAGE_CONFIG.pageWidth, 8, 'F');

  // Título e identificação na capa
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(...COLORS.transpetroGreen);
  doc.text('PETROBRAS TRANSPORTE S.A. — TRANSPETRO', PAGE_CONFIG.margin, 35);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(22);
  doc.setTextColor(...COLORS.white);
  doc.text('GUIA DEFINITIVO DE ESTUDOS', PAGE_CONFIG.margin, 52);

  doc.setFontSize(15);
  doc.setTextColor(226, 232, 240);
  doc.text('COMPÊNDIO COMPLETO POR TÓPICOS DO EDITAL', PAGE_CONFIG.margin, 62);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.setTextColor(148, 163, 184);
  doc.text('CARGO: PROFISSIONAL TRANSPETRO DE NÍVEL SUPERIOR', PAGE_CONFIG.margin, 76);
  doc.text('ÊNFASE 8: CIÊNCIA DE DADOS & ENGENHARIA DE DADOS', PAGE_CONFIG.margin, 82);
  doc.text('BANCA EXAMINADORA: FUNDAÇÃO CESGRANRIO', PAGE_CONFIG.margin, 88);

  // Metadados na parte inferior da capa
  let yCover = 145;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.setTextColor(...COLORS.primaryNavy);
  doc.text('ESTRUTURA DO MATERIAL DE ENSINO:', PAGE_CONFIG.margin, yCover);
  yCover += 9;

  const coverBullets = [
    '• 100% dos Tópicos Oficiais dos Conhecimentos Básicos e Específicos (Blocos I, II e III)',
    '• Ementas oficiais com todas as diretrizes publicadas pela Banca Cesgranrio',
    '• Conceitos essenciais, formulações matemáticas, código Python e SQL',
    '• Caderno de "Pegadinhas" clássicas da Cesgranrio mapeadas por tópico',
    '• Contextualização operacional real em dutos, terminais aquaviários e frota Transpetro',
    '• Questões de fixação comentadas alternativa por alternativa com distratores',
    '• Checklists interativos de acompanhamento de estudos'
  ];

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9.5);
  doc.setTextColor(...COLORS.slateDark);
  for (const b of coverBullets) {
    doc.text(b, PAGE_CONFIG.margin, yCover);
    yCover += 6.5;
  }

  yCover += 15;
  doc.setFillColor(...COLORS.slateLight);
  doc.setDrawColor(...COLORS.borderLight);
  doc.roundedRect(PAGE_CONFIG.margin, yCover, PAGE_CONFIG.usableWidth, 22, 2, 2, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(...COLORS.transpetroDarkGreen);
  doc.text('CERTIFICADO DE COMPILAÇÃO OFICIAL', PAGE_CONFIG.margin + 5, yCover + 7);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(...COLORS.slateMuted);
  doc.text(`Total de Tópicos Estruturados: ${topics.length} matérias completas.`, PAGE_CONFIG.margin + 5, yCover + 12);
  doc.text(`Gerado em: ${new Date().toLocaleDateString('pt-BR')} às ${new Date().toLocaleTimeString('pt-BR')}.`, PAGE_CONFIG.margin + 5, yCover + 17);

  // ----------------------------------------
  // PÁGINA 2: SUMÁRIO GERAL DOS TÓPICOS
  // ----------------------------------------
  doc.addPage();
  const summaryCtx = new PDFContext(doc, 'Sumário do Edital', 'SUMÁRIO');
  summaryCtx.drawSectionTitle('Sumário Geral dos Tópicos do Edital');

  topics.forEach((t, i) => {
    summaryCtx.checkPageBreak(8);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8.5);
    doc.setTextColor(...COLORS.transpetroDarkGreen);
    doc.text(`${t.itemCode}`, PAGE_CONFIG.margin, summaryCtx.currentY);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.5);
    doc.setTextColor(...COLORS.primaryNavy);
    doc.text(`${t.title} (${t.block})`, PAGE_CONFIG.margin + 18, summaryCtx.currentY);

    doc.setFontSize(7.5);
    doc.setTextColor(...COLORS.slateMuted);
    doc.text(`${t.subtopics.length} subtópicos`, PAGE_CONFIG.pageWidth - PAGE_CONFIG.margin, summaryCtx.currentY, { align: 'right' });

    summaryCtx.currentY += 6;
  });

  // ----------------------------------------
  // CORPO: CADA TÓPICO SEQUENCIALMENTE
  // ----------------------------------------
  topics.forEach((topic) => {
    doc.addPage();
    const ctx = new PDFContext(doc, topic.title, topic.itemCode);
    ctx.drawRunningHeader();
    ctx.currentY = 22;

    // Header do Tópico
    doc.setFillColor(...COLORS.slateDark);
    doc.roundedRect(PAGE_CONFIG.margin, ctx.currentY, 18, 5.5, 1, 1, 'F');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7.5);
    doc.setTextColor(...COLORS.white);
    doc.text(topic.itemCode, PAGE_CONFIG.margin + 3, ctx.currentY + 4);

    doc.setFillColor(...COLORS.greenLight);
    doc.roundedRect(PAGE_CONFIG.margin + 20, ctx.currentY, 32, 5.5, 1, 1, 'F');
    doc.setTextColor(...COLORS.transpetroDarkGreen);
    doc.text(topic.block, PAGE_CONFIG.margin + 22, ctx.currentY + 4);

    ctx.currentY += 8;

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(13);
    doc.setTextColor(...COLORS.primaryNavy);
    const tLines = doc.splitTextToSize(sanitizeText(topic.title), PAGE_CONFIG.usableWidth);
    for (const tl of tLines) {
      doc.text(tl, PAGE_CONFIG.margin, ctx.currentY);
      ctx.currentY += 5.5;
    }
    ctx.currentY += 2;

    // Ementa Oficial
    ctx.drawBox(
      'EMENTA OFICIAL CESGRANRIO',
      topic.officialWording,
      {
        bgColor: COLORS.greenLight,
        borderColor: COLORS.greenBorder,
        titleColor: COLORS.transpetroDarkGreen
      }
    );

    // Subtópicos
    ctx.drawSectionTitle('Subtópicos Exigidos em Prova');
    topic.subtopics.forEach((sub, sIdx) => {
      ctx.drawBulletItem(`[  ] ${sIdx + 1}.`, sub);
    });

    // Conceitos e Fórmulas
    if (topic.keyConceptsAndFormulas.length > 0) {
      ctx.drawSectionTitle('Conceitos Teóricos Centrais & Fórmulas');
      topic.keyConceptsAndFormulas.forEach(item => {
        ctx.drawParagraph(item.name, { fontSize: 8.8, fontStyle: 'bold', textColor: COLORS.primaryNavy });
        ctx.drawParagraph(item.description, { fontSize: 8, textColor: COLORS.slateDark });
        if (item.formulaOrCode) {
          ctx.drawCodeBox(item.name, item.formulaOrCode);
        } else {
          ctx.addVerticalSpace(2);
        }
      });
    }

    // Pegadinhas Cesgranrio
    if (topic.cesgranrioExamTraps.length > 0) {
      ctx.drawSectionTitle('Pegadinhas da Banca Cesgranrio');
      ctx.drawBox(
        'ALERTA PARA A PROVA',
        topic.cesgranrioExamTraps.map(trap => `• ${trap}`),
        {
          bgColor: COLORS.amberLight,
          borderColor: COLORS.amberBorder,
          titleColor: COLORS.amberWarning
        }
      );
    }

    // Contexto Transpetro
    ctx.drawSectionTitle('Aplicação Prática Transpetro');
    ctx.drawBox(
      'CASO OPERACIONAL',
      topic.transpetroPracticalContext,
      {
        bgColor: COLORS.slateLight,
        borderColor: COLORS.borderLight,
        titleColor: COLORS.primaryNavy
      }
    );

    // Estratégia de estudo
    ctx.drawSectionTitle('Estratégia Recomendada de Estudo');
    topic.recommendedStudyStrategy.forEach((strat, idx) => {
      ctx.drawBulletItem(`Etapa ${idx + 1}:`, strat);
    });
  });

  finalizeDocumentWithFooters(doc);
  return doc;
}

export function generateHistoryCompilationPDF(subjects: RequestedSubject[]): jsPDF {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  // Capa do Histórico
  doc.setFillColor(...COLORS.primaryNavy);
  doc.rect(0, 0, PAGE_CONFIG.pageWidth, 110, 'F');

  doc.setFillColor(...COLORS.transpetroGreen);
  doc.rect(0, 110, PAGE_CONFIG.pageWidth, 5, 'F');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(...COLORS.transpetroGreen);
  doc.text('PETROBRAS TRANSPORTE S.A. — TRANSPETRO', PAGE_CONFIG.margin, 35);

  doc.setFontSize(20);
  doc.setTextColor(255, 255, 255);
  doc.text('CADERNO DE HISTÓRICO DE ESTUDOS', PAGE_CONFIG.margin, 52);

  doc.setFontSize(13);
  doc.setTextColor(226, 232, 240);
  doc.text('TODAS AS CONSULTAS E AULAS SOLICITADAS AO AGENTE', PAGE_CONFIG.margin, 62);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.setTextColor(148, 163, 184);
  doc.text('CARGO: PROFISSIONAL TRANSPETRO DE NÍVEL SUPERIOR', PAGE_CONFIG.margin, 76);
  doc.text('ÊNFASE 8: CIÊNCIA DE DADOS • BANCA CESGRANRIO', PAGE_CONFIG.margin, 82);

  let yCover = 145;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(...COLORS.primaryNavy);
  doc.text('CONTEÚDO DO CADERNO:', PAGE_CONFIG.margin, yCover);
  yCover += 8;

  const coverBullets = [
    `• Total de registros de consultas compilados: ${subjects.length} assuntos`,
    '• Pergunta e dúvida original formulada pelo candidato',
    '• Explicação detalhada e resolução pedagógica elaborada pelo Agente',
    '• Códigos de machine learning, algoritmos e consultas SQL analisadas',
    '• Anotações de estudo personalizadas e fórmulas de revisão registradas'
  ];

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9.5);
  doc.setTextColor(...COLORS.slateDark);
  for (const b of coverBullets) {
    doc.text(b, PAGE_CONFIG.margin, yCover);
    yCover += 6.5;
  }

  // Seções para cada assunto
  subjects.forEach((subject, idx) => {
    doc.addPage();
    const ctx = new PDFContext(doc, `Consulta #${idx + 1}: ${subject.title}`, subject.block);

    ctx.drawSectionTitle(`Registro de Estudo #${idx + 1} — ${subject.title}`, `${subject.block} • ${subject.category}`);

    ctx.drawBox(
      'PERGUNTA / PROMPT SOLICITADO AO AGENTE',
      `"${subject.userQuery}"`,
      {
        bgColor: COLORS.slateLight,
        borderColor: COLORS.borderLight,
        titleColor: COLORS.primaryNavy
      }
    );

    if (subject.agentResponse) {
      ctx.drawSectionTitle('Explicação & Resposta Didática da IA');
      ctx.drawParagraph(subject.agentResponse, {
        fontSize: 8.5,
        textColor: COLORS.slateDark,
        lineSpacing: 4.2
      });
    }

    if (subject.notes) {
      ctx.drawBox(
        'ANOTAÇÕES DO CANDIDATO',
        subject.notes,
        {
          bgColor: COLORS.amberLight,
          borderColor: COLORS.amberBorder,
          titleColor: COLORS.amberWarning
        }
      );
    }
  });

  finalizeDocumentWithFooters(doc);
  return doc;
}

// ==========================================
// FUNÇÕES DISPARADORAS DE DOWNLOAD NO NAVEGADOR
// ==========================================
export function downloadTopicPDF(topic: OfficialSyllabusTopic) {
  const doc = generateTopicPDF(topic);
  const sanitizedFilename = `Transpetro_${topic.itemCode}_${topic.title.replace(/[^a-zA-Z0-9]/g, '_')}.pdf`;
  doc.save(sanitizedFilename);
}

export function downloadRequestedSubjectPDF(subject: RequestedSubject) {
  const doc = generateRequestedSubjectPDF(subject);
  const sanitizedFilename = `Transpetro_Estudo_${subject.title.replace(/[^a-zA-Z0-9]/g, '_').substring(0, 35)}.pdf`;
  doc.save(sanitizedFilename);
}

export function downloadHistoryCompilationPDF(subjects: RequestedSubject[]) {
  const doc = generateHistoryCompilationPDF(subjects);
  doc.save(`Transpetro_Historico_Assuntos_Estudados_${new Date().toISOString().slice(0, 10)}.pdf`);
}

export function downloadAllTopicsCompendiumPDF(topics: OfficialSyllabusTopic[] = OFFICIAL_EDITAL_ENFASE_8) {
  const doc = generateAllTopicsCombinedPDF(topics);
  doc.save('Transpetro_2026_Apostila_Completa_Edital_Enfase8.pdf');
}
