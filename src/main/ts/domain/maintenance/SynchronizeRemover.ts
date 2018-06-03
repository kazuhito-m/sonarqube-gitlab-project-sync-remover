import { AxiosStatic } from "axios";
import RemoveTargets from "./RemoveTargets";
import Settings from "../config/Settings";
import SonarQubeRepository from "../sonarqube/SonarQubeRepository";
import SonarQubeRequester from "../../infrastracture/datasource/maintenance/sonarqube/SonarQubeRequester";
import GitlabRequester from "../../infrastracture/datasource/maintenance/gitlab/GitlabRequester";
import GitlabRepository from "../gitlab/GitlabRepository";

export default class SynchronizeRemover {
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

  public async execute() {
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
