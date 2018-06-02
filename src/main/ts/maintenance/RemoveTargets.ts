import SonarQubeProjects from "./sonarqube/SonarQubeProjects";
import SonarQubeProject from "./sonarqube/SonarQubeProject";
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
    // SonarQube側のプロジェクトを回しながら、Gitlab側にあれば無視、なければそれを貯める
    const gitlabNotFoundProjcets: SonarQubeProject[] = this.sonarQubeProjects
      .validProjects()
      .filter(sqProject => !this.gitlabProjects.exists(sqProject));

    // Debug
    console.log(this.aliases);

    return new SonarQubeProjects(gitlabNotFoundProjcets);
  }
}
