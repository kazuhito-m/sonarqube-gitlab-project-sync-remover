import GitlabProject from "./GitlabProject";
import ProjectAndBranch from "../ProjectAndBranch";

export default class GitlabProjects {
  private readonly projects: GitlabProject[];

  constructor(projects: GitlabProject[]) {
    this.projects = projects;
  }

  public validProjects(): GitlabProject[] {
    return this.projects.filter(p => p.mergeRequestsEnabled);
  }

  public exists(branch: ProjectAndBranch): boolean {
    return this.projects.some(selfProject => selfProject.exists(branch));
  }

  public notExists(branch: ProjectAndBranch): boolean  {
    return  !this.exists(branch);
  }
}
