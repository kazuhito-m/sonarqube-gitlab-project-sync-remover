import Settings from "./config/Settings";
import Parameters from "./Parameters";
import axiosBase from "axios";
import SynchronizeRemover from "./maintenance/SynchronizeRemover";

export default class ConoleApplication {
  public async run(argv: string[]) {
    const parameters = new Parameters(argv);
    parameters.analyzeArgs();
    const settings: Settings = parameters.loadSettings();
    const aliases = parameters.loadAliases();

    const syncRemover = new SynchronizeRemover(axiosBase, settings, aliases);
    syncRemover.execute();
  }
}
