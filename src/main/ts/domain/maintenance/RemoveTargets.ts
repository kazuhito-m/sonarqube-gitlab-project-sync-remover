import AliasedProjectBranch from "./AliasedProjectBranch";
import ProjectAndBranch from "./ProjectAndBranch";
import SonarQubeProjects from "../sonarqube/SonarQubeProjects";
import GitlabProjects from "../gitlab/GitlabProjects";
import Aliases from '../config/Aliases';

export default class RemoveTargets {
  private readonly sonarQubeProjects: SonarQubeProjects;
  private readonly gitlabProjects: GitlabProjects;
  private readonly aliases: Aliases;;

  constructor(
    sonarQubeProjects: SonarQubeProjects,
    gitlabProjects: GitlabProjects,
    aliases: Aliases
  ) {
    this.aliases = aliases;
    this.sonarQubeProjects = sonarQubeProjects;
    this.gitlabProjects = gitlabProjects;
  }

  public filterd(): SonarQubeProjects {
    const gitlabProjects = this.gitlabProjects;
    const gitlabNotFoundProjcets = this.sonarQubeProjects
      .validProjects()
      .filter(sqPjBranch => gitlabProjects.notExists(this.aliased(sqPjBranch)));
    return new SonarQubeProjects(gitlabNotFoundProjcets);
  }

  private aliased(origin: ProjectAndBranch): ProjectAndBranch {
    return new AliasedProjectBranch(origin, this.aliases);
  }
}
