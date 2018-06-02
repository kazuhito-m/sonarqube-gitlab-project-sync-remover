import Settings from "../config/Settings";
import SonarQubeRequester from "./sonarqube/SonarQubeRequester";
import GitlabRequester from "./gitlab/GitlabRequester";
import RemoveTargets from "./RemoveTargets";

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
    const sonarQubeProjects = await this.sonarQubeRequester.getAllProjects();
    const gitlabProjects = await this.gitlabRequester.getAllProjects();

    const removeTargets = new RemoveTargets(
      sonarQubeProjects,
      gitlabProjects,
      this.aliases
    );
    const removeProjects = removeTargets.filterd();

    //debug
    const prj = removeProjects.validProjects();
    prj.forEach(i =>
      console.log(`prj:${i.projectName} , branch:${i.branchName}`)
    );
    console.log("削除対象SonarQubeプロジェクト数 : " + prj.length);

    this.sonarQubeRequester.removeProjects(removeProjects);
  }
}
