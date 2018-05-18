import GBranchApiResponse from "./api/GBranchApiResponse";

export default class GitlabProject {
  private readonly _name: string;

  constructor(origin: GBranchApiResponse) {
    this._name = origin.name;
  }

  public get name(): string {
    return this._name;
  }
}
