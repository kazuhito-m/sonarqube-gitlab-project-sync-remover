import axiosBase from "axios";
import Parameters from "./infrastracture/datasource/config/Parameters";
import SynchronizeRemoveService from "./application/maintenance/SynchronizeRemoveService";

export default class ConsoleApplication {
  public async run(argv: string[]) {
    const parameters = new Parameters(argv);
    parameters.analyzeArgs();
    const settings = parameters.loadSettings();
    const aliases = parameters.loadAliases();

    const syncRemover = new SynchronizeRemoveService(axiosBase, settings, aliases);
    syncRemover.synchronizeRemove();
  }
}
