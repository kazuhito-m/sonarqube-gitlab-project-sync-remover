import { AxiosStatic } from "axios";
import SonarQubeRepository from "../../domain/sonarqube/SonarQubeRepository";
import GitlabRepository from "../../domain/gitlab/GitlabRepository";
import Settings from "../../domain/config/Settings";
import SonarQubeRequester from "../../infrastracture/datasource/sonarqube/SonarQubeRequester";
import GitlabRequester from "../../infrastracture/datasource/gitlab/GitlabRequester";
import RemoveTargets from "../../domain/maintenance/RemoveTargets";

export default class SynchronizeRemoveService {
  private readonly sonarQubeRepository: SonarQubeRepository;
  private readonly gitlabRepository: GitlabRepository;
  private readonly aliases: { [key: string]: string };

  constructor(
    axiosBase: AxiosStatic,
    settings: Settings,
    aliases: { [key: string]: string }
  ) {
    this.sonarQubeRepository = new SonarQubeRequester(settings, axiosBase);
    this.gitlabRepository = new GitlabRequester(settings, axiosBase);
    this.aliases = aliases;
  }

  public async synchronizeRemove() {
    const sonarQubeProjects = await this.sonarQubeRepository.getAllProjects();
    const gitlabProjects = await this.gitlabRepository.getAllProjects();

    const removeTargets = new RemoveTargets(
      sonarQubeProjects,
      gitlabProjects,
      this.aliases
    );
    const removeProjects = removeTargets.filterd();

    this.sonarQubeRepository.removeProjects(removeProjects);
  }
}
