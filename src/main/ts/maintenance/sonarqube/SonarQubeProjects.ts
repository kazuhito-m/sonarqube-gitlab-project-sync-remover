import SonarQubeProject from "./SonarQubeProject";

export default class SonarQubeProjects {
  private readonly projects: SonarQubeProject[];

  constructor(projects: SonarQubeProject[]) {
    this.projects = projects;
  }

  public validProjects(): SonarQubeProject[] {
    return this.projects;
  }
}
