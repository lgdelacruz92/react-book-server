import { ChapterType } from "../types/chapter-type";
import { SectionType } from "../types/section-type";

const findSection = (sections: SectionType[], fileName: string): SectionType | null => {
  for (let i = 0; i < sections.length; i++) {
    if (sections[i].fileName === fileName) {
      return sections[i];
    }
  }
  return null;
};

export const findInChapter = (chapters: ChapterType[], fileName: string): SectionType | null => {
  for (let i = 0; i < chapters.length; i++) {
    if (!chapters[i].sections) continue;
    const foundSection = findSection(chapters[i].sections, fileName);
    if (foundSection) {
      return foundSection;
    }
  }
  return null;
};
