import ProjectAndBranch from "./ProjectAndBranch";
import Aliases from '../config/Aliases';

export default class AliasedProjectBranch implements ProjectAndBranch {
  private readonly origin: ProjectAndBranch;
  private readonly aliases: Aliases;

  constructor(origin: ProjectAndBranch, aliases: Aliases) {
    this.origin = origin;
    this.aliases = aliases;
  }

  private aliasedName(originName: string): string {
    return this.aliases.aliasName(originName);
  }

  public get projectName(): string {
    return this.aliasedName(this.origin.projectName);
  }

  public get branchName(): string {
    return this.origin.branchName;
  }
}
