import SonarQubeProjects from "./sonarqube/SonarQubeProjects";
import GitlabProjects from "./gitlab/GitlabProjects";

export default class RemoveTargets {
  private readonly sonarQubeProjects: SonarQubeProjects;
  private readonly gitlabProjects: GitlabProjects;
  private readonly aliases: { [key: string]: string };

  constructor(
    sonarQubeProjects: SonarQubeProjects,
    gitlabProjects: GitlabProjects,
    aliases: { [key: string]: string }
  ) {
    this.aliases = aliases;
    this.sonarQubeProjects = sonarQubeProjects;
    this.gitlabProjects = gitlabProjects;
  }

  public filterd(): SonarQubeProjects {
    // TODO 実装
    console.log("RemoveTargets.filted");
    console.log(this.sonarQubeProjects);
    console.log(this.gitlabProjects);
    console.log(this.aliases);
    return new SonarQubeProjects([]);
  }
}
