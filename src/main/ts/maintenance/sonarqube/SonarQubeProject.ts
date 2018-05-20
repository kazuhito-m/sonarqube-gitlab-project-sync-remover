import ProjectApiResponse from "./api/ProjectApiResponse";

export default class SonarQubeProject {
  private readonly _id: string;
  private readonly _key: string;
  private readonly _name: string;
  private readonly _lastAnalysisDate: string;

  constructor(origin: ProjectApiResponse) {
    this._id = origin.id;
    this._key = origin.key;
    this._name = origin.name;
    this._lastAnalysisDate = origin.lastAnalysisDate;
  }

  public get id(): string {
    return this._id;
  }

  public get key(): string {
    return this._key;
  }

  public get name(): string {
    return this._name;
  }

  public get lastAnalysisDate(): string {
    return this._lastAnalysisDate;
  }

  public get branch():string {
    return "";
  }
}
