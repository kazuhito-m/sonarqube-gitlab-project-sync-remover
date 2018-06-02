import GitlabBranchs from "./GitlabBranches";
import ProjectAndBranch from "../ProjectAndBranch";

export default class GitlabProject {
  private readonly _id: number;
  private readonly _description: string;
  private readonly _name: string;
  private readonly _pathWithNamespace: string;
  private readonly _mergeRequestsEnabled: boolean;

  private readonly _branches: GitlabBranchs;

  constructor(
    id: number,
    description: string,
    name: string,
    pathWithNamespace: string,
    mergeRequestsEnabled: boolean,
    branches: GitlabBranchs
  ) {
    this._id = id;
    this._description = description;
    this._name = name;
    this._pathWithNamespace = pathWithNamespace;
    this._mergeRequestsEnabled = mergeRequestsEnabled;
    this._branches = branches;
  }

  public with(branches: GitlabBranchs): GitlabProject {
    return new GitlabProject(
      this._id,
      this._description,
      this._name,
      this._pathWithNamespace,
      this._mergeRequestsEnabled,
      branches
    );
  }

  public exists(branch: ProjectAndBranch): boolean {
    if (this._name !== branch.projectName) return false;
    return this.branches.exists(branch);
  }

  public get id(): number {
    return this._id;
  }

  public get description(): string {
    return this._description;
  }

  public get name(): string {
    return this._name;
  }

  public get pathWithNamespace(): string {
    return this._pathWithNamespace;
  }

  public get mergeRequestsEnabled(): boolean {
    return this._mergeRequestsEnabled;
  }

  public get branches(): GitlabBranchs {
    return this._branches;
  }
}
