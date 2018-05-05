import Settings from "./config/Settings";
import Parameters from "./Parameters";

export default class ConoleApplication {
  public run(argv: string[]) {
    const parameters= new Parameters(argv);
    parameters.analyzeArgs();
    const settings: Settings = parameters.loadSettings();
    const aliases = parameters.loadAliases();

    console.log(settings.gitlabUrl);
    console.log(aliases["project1"]);
  }
}
