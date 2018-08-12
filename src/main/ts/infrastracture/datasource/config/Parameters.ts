import * as fs from "fs";
import * as program from "commander";
import Settings from "../../../domain/config/Settings";
import Aliases from '../../../domain/config/Aliases';

export default class Parameters {
  constructor(args: string[]) {
    program
      .option("-s, --settings <path>", "設定ファイルのPath。")
      .option("-a, --aliases <path>", "ProjectNameのエイリアスファイルのPath。")
      .parse(args);
  }

  public analyzeArgs() {
    if (program.settings === undefined)
      throw new Error("パラメータ「設定ファイル」を指定してください。");
    return program;
  }

  public loadSettings(): Settings {
    const settingFilePath: string = program.settings;
    return this.loadJsonFileToObject(settingFilePath);
  }

  public loadAliases(): Aliases {
    const aliasesFilePath: string = program.aliases;
    if (aliasesFilePath === undefined) return Aliases.empty();
    const json = this.loadJsonFileToObject(aliasesFilePath);
    return new Aliases(json);
  }

  private loadJsonFileToObject(filePath: string) {
    const jsonText = fs.readFileSync(filePath, "utf8");
    return JSON.parse(jsonText);
  }
}