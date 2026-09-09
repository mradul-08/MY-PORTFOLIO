import { Projects } from "@/types/type";
import CodeVerseImage from "../../public/images/elysian/codeverse-interface.png";
import GenWebImage from "../../public/images/oracle/genweb-interface.png";

// Keep project data in one place so new projects can be added without changing UI components.
export const allProjects: Projects[] = [
  {
    id: 0,
    title: "CodeVerse",
    year: "",
    roles: [],
    technologies: [],
    description1: [],
    description2: [],
    website: "https://interviewlattice.duckdns.org/",
    mainImage: CodeVerseImage,
    introImage: CodeVerseImage,
    imagesPortrait: [],
    imagesLandscape: [],
  },
  {
    id: 1,
    title: "GenWeb.ai",
    year: "",
    roles: [],
    technologies: [],
    description1: [],
    description2: [],
    website: "https://genweb-ai-delta.vercel.app/",
    mainImage: GenWebImage,
    introImage: GenWebImage,
    imagesPortrait: [],
    imagesLandscape: [],
  },
];
