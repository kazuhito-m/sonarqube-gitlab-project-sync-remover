import ProjectApiResponse from "../../infrastracture/datasource/sonarqube/api/ProjectApiResponse";
import ProjectAndBranch from "../maintenance/ProjectAndBranch";

export default class SonarQubeProject implements ProjectAndBranch {
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

  private devideBranchName(name: string): string {
    const branch = name.replace(/.*\ /, "");
    if (name === branch) return "";
    return branch;
  }

  private devideProjectName(name: string): string {
    const branchNameLength = this.devideBranchName(name).length;
    if (branchNameLength === 0) return name;
    const projectNameLength = name.length - (branchNameLength + 1);
    return name.substring(0, projectNameLength);
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

  public get projectName(): string {
    return this.devideProjectName(this._name);
  }

  public get branchName(): string {
    return this.devideBranchName(this._name);
  }
}
