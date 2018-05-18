import Settings from "../config/Settings";
import SonarQubeRequester from "./sonarqube/SonarQubeRequester";
import GitlabRequester from "./gitlab/GitlabRequester";

export default class SynchronizeRemover {
  private readonly sonarQubeRequester: SonarQubeRequester;
  private readonly gitlabRequester: GitlabRequester;
  private readonly aliases: { [key: string]: string };

  constructor(
    axiosBase: any,
    settings: Settings,
    aliases: { [key: string]: string }
  ) {
    this.sonarQubeRequester = new SonarQubeRequester(settings, axiosBase);
    this.gitlabRequester = new GitlabRequester(settings, axiosBase);
    this.aliases = aliases;
  }

  public async execute() {
    const sonarQubeAllProjects = await this.sonarQubeRequester.getAllProjects();
    const gitlabAllProjects = await this.gitlabRequester.getAllProjects();

    // debug
    console.log(sonarQubeAllProjects);
    const vp = gitlabAllProjects.validProjects();
    console.log(vp);
    console.log(vp.length);
    console.log(this.aliases["project1"]);
  }
}
