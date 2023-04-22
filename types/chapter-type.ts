import { SectionType } from "./section-type";

export interface ChapterType {
    chapter: number;
    sections: SectionType[];
    title: string;
}