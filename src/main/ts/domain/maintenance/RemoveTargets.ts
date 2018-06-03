import AliasedProjectBranch from "./AliasedProjectBranch";
import ProjectAndBranch from "./ProjectAndBranch";
import SonarQubeProjects from "../sonarqube/SonarQubeProjects";
import GitlabProjects from "../gitlab/GitlabProjects";

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
    const gitlabProjects: GitlabProjects = this.gitlabProjects;
    const gitlabNotFoundProjcets = this.sonarQubeProjects
      .validProjects()
      .filter(sqPjBranch => gitlabProjects.notExists(this.aliased(sqPjBranch)));
    return new SonarQubeProjects(gitlabNotFoundProjcets);
  }

  private aliased(origin: ProjectAndBranch): ProjectAndBranch {
    return new AliasedProjectBranch(origin, this.aliases);
  }
}
