import axiosBase from "axios";
import Parameters from "./Parameters";
import SynchronizeRemover from "./domain/maintenance/SynchronizeRemover";

export default class ConoleApplication {
  public async run(argv: string[]) {
    const parameters = new Parameters(argv);
    parameters.analyzeArgs();
    const settings = parameters.loadSettings();
    const aliases = parameters.loadAliases();

    const syncRemover = new SynchronizeRemover(axiosBase, settings, aliases);
    syncRemover.execute();
  }
}
