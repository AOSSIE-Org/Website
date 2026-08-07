export interface ProjectRepo {
  name: string;
  url: string;
  description?: string;
}

export interface ProjectItem {
  id: string;
  name: string;
  category: string;
  src: string;
  description?: string;
  repositories: ProjectRepo[];
}
