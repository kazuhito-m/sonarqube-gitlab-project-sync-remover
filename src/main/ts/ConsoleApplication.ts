import Settings from "./config/Settings";
import Parameters from "./Parameters";
import SonarQubeRequester from "./sonarqube/SonarQubeRequester";
import axiosBase from "axios";
import GitlabRequester from "./gitlab/GitlabRequester";

export default class ConoleApplication {
  public async run(argv: string[]) {
    const parameters = new Parameters(argv);
    parameters.analyzeArgs();
    const settings: Settings = parameters.loadSettings();
    const aliases = parameters.loadAliases();

    const sonarQubeRequester = new SonarQubeRequester(settings, axiosBase);
    const sonarQubeAllProjects = await sonarQubeRequester.getAllProjects();

    const gitlabRequester = new GitlabRequester(settings, axiosBase);
    const gitlabAllProjects = await gitlabRequester.getAllProjects();

    // debug
    console.log(sonarQubeAllProjects);
    const vp = gitlabAllProjects.validProjects();
    console.log(vp);
    console.log(vp.length);
    console.log(aliases["project1"]);

  }
}
