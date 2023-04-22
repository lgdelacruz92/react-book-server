import type { ChapterType} from './chapter-type';
export type ChapterSlugType = Omit<ChapterType, 'content'>;