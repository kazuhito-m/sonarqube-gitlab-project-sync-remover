import SonarQubeProject from "./SonarQubeProject";

export default class SonarQubeProjects {
  private readonly projects: SonarQubeProject[];

  constructor(projects: SonarQubeProject[]) {
    this.projects = projects;
  }

  public validProjects(): SonarQubeProject[] {
    return this.projects;
  }

  public joinedKeyes(): string {
    return this.projects.map(project => project.key).join(",");
  }

  public empty(): boolean {
    return this.validProjects().length === 0;
  }
}
