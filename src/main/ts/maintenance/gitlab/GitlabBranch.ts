import GBranchApiResponse from "./api/GBranchApiResponse";
import ProjectAndBranch from "../ProjectAndBranch";

export default class GitlabProject {
  private readonly _name: string;

  constructor(origin: GBranchApiResponse) {
    this._name = origin.name;
  }

  public sameOf(otherBranch : ProjectAndBranch) {
    return this._name === otherBranch.branchName;
  }

  public get name(): string {
    return this._name;
  }
}
