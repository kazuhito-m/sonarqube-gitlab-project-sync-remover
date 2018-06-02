import GitlabProject from "./GitlabProject";
import ProjectAndBranch from "../ProjectAndBranch";

export default class GitlabProjects {
  private readonly projects: GitlabProject[];

  constructor(projects: GitlabProject[]) {
    this.projects = projects;
  }

  public exists(project: ProjectAndBranch): boolean {
    // TODO 実装。
    return true;
  }

  public validProjects(): GitlabProject[] {
    return this.projects.filter(p => p.mergeRequestsEnabled);
  }
}
