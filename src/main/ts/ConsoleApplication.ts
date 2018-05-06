import Settings from "./config/Settings";
import Parameters from "./Parameters";
import SonarQubeRequester from "./sonarqube/SonarQubeRequester";
import axiosBase from 'axios';

export default class ConoleApplication {
  public async run(argv: string[]) {
    const parameters = new Parameters(argv);
    parameters.analyzeArgs();
    const settings: Settings = parameters.loadSettings();
    const aliases = parameters.loadAliases();

    const sonarQubeRequester = new SonarQubeRequester(settings , axiosBase);
    const sonarQubeAllProjects = await sonarQubeRequester.getAllProjects();

    console.log(sonarQubeAllProjects);
    console.log(aliases["project1"]);
  }
}
