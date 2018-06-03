import ProjectAndBranch from "../maintenance/ProjectAndBranch";

export default class GitlabProject {
  private readonly _name: string;

  constructor(name:string) {
    this._name = name;
  }

  public sameOf(otherBranch : ProjectAndBranch) {
    return this._name === otherBranch.branchName;
  }

  public get name(): string {
    return this._name;
  }
}
