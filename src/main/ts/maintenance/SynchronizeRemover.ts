import Settings from "../config/Settings";
import SonarQubeRequester from "./sonarqube/SonarQubeRequester";
import GitlabRequester from "./gitlab/GitlabRequester";
import RemoveTargets from "./RemoveTargets";
import { AxiosStatic } from "axios";

export default class SynchronizeRemover {
  private readonly sonarQubeRequester: SonarQubeRequester;
  private readonly gitlabRequester: GitlabRequester;
  private readonly aliases: { [key: string]: string };

  constructor(
    axiosBase: AxiosStatic,
    settings: Settings,
    aliases: { [key: string]: string }
  ) {
    this.sonarQubeRequester = new SonarQubeRequester(settings, axiosBase);
    this.gitlabRequester = new GitlabRequester(settings, axiosBase);
    this.aliases = aliases;
  }

  public async execute() {
    const sonarQubeProjects = await this.sonarQubeRequester.getAllProjects();
    const gitlabProjects = await this.gitlabRequester.getAllProjects();

    const removeTargets = new RemoveTargets(
      sonarQubeProjects,
      gitlabProjects,
      this.aliases
    );
    const removeProjects = removeTargets.filterd();

    this.sonarQubeRequester.removeProjects(removeProjects);
  }
}
