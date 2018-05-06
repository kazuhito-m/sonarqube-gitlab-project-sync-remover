import GitlabProject from "./GitlabProject";

export default class GitlabProjects {
  private readonly projects: GitlabProject[];

  constructor(projects: GitlabProject[]) {
    this.projects = projects;
  }

  public validProjects(): GitlabProject[] {
    return this.projects
      .filter(p => p.mergeRequestsEnabled);
  }
}
