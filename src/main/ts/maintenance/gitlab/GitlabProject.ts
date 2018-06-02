import GProjectApiResponse from "./api/GProjectApiResponse";
import GitlabBranchs from "./GitlabBranches";
import ProjectAndBranch from "../ProjectAndBranch";

export default class GitlabProject {
  private readonly _id: number;
  private readonly _description: string;
  private readonly _name: string;
  private readonly _pathWithNamespace: string;
  private readonly _mergeRequestsEnabled: boolean;

  private readonly _branches: GitlabBranchs;

  constructor(origin: GProjectApiResponse, branches: GitlabBranchs) {
    this._id = origin.id;
    this._description = origin.description;
    this._name = origin.name;
    this._pathWithNamespace = origin.path_with_namespace;
    this._mergeRequestsEnabled = origin.merge_requests_enabled;
    this._branches = branches;
  }

  public with(branches: GitlabBranchs): GitlabProject {
    const dummy: GProjectApiResponse = {
      id: this._id,
      description: this._description,
      name: this._name,
      path_with_namespace: this._pathWithNamespace,
      merge_requests_enabled: this._mergeRequestsEnabled
    };
    return new GitlabProject(dummy, branches);
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
