import { DigitalBook } from '../../types';
import { CONHECIMENTOS_BASICOS_BOOKS } from './conhecimentosBasicos';
import { BLOCO_1_BOOKS } from './bloco1MachineLearning';
import { BLOCO_2_MATH_BOOKS } from './bloco2MatematicaEstatistica';
import { BLOCO_2_ENG_BOOKS } from './bloco2EngenhariaDados';
import { BLOCO_3_BOOKS } from './bloco3GovernancaLegislação';

export const ALL_DIGITAL_BOOKS: DigitalBook[] = [
  ...CONHECIMENTOS_BASICOS_BOOKS,
  ...BLOCO_1_BOOKS,
  ...BLOCO_2_MATH_BOOKS,
  ...BLOCO_2_ENG_BOOKS,
  ...BLOCO_3_BOOKS
];

export const DIGITAL_BOOKS_BY_BLOCK: Record<string, DigitalBook[]> = {
  'Conhecimentos Básicos': CONHECIMENTOS_BASICOS_BOOKS,
  'Bloco I': BLOCO_1_BOOKS,
  'Bloco II': [...BLOCO_2_MATH_BOOKS, ...BLOCO_2_ENG_BOOKS],
  'Bloco III': BLOCO_3_BOOKS
};

export const DIGITAL_BOOKS_STATS = {
  totalBooks: ALL_DIGITAL_BOOKS.length,
  totalChapters: ALL_DIGITAL_BOOKS.reduce((acc, b) => acc + b.chapters.length, 0),
  totalPracticeQuestions: ALL_DIGITAL_BOOKS.reduce(
    (acc, b) => acc + (b.practiceQuestions?.length || 0) + b.chapters.reduce((cAcc, c) => cAcc + (c.practiceQuestions?.length || 0), 0), 
    0
  ),
  totalPagesEquivalent: ALL_DIGITAL_BOOKS.reduce((acc, b) => acc + b.pagesEquivalent, 0)
};
