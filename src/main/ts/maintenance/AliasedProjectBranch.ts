import ProjectAndBranch from "./ProjectAndBranch";

export default class AliasedProjectBranch implements ProjectAndBranch {
  private readonly origin: ProjectAndBranch;
  private readonly aliases: { [key: string]: string };

  constructor(origin: ProjectAndBranch, aliases: { [key: string]: string }) {
    this.origin = origin;
    this.aliases = aliases;
  }

  private aliasedName(originName: string): string {
    if (originName in this.aliases) return this.aliases[originName];
    return originName;
  }

  public get projectName(): string {
    return this.aliasedName(this.origin.projectName);
  }

  public get branchName(): string {
    return this.origin.branchName;
  }
}
