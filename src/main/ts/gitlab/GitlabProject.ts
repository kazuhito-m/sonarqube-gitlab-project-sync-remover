import GProjectApiResponse from "./api/GProjectApiResponse";
import GitlabRequester from "./GitlabRequester";
import GitlabBranchs from "./GitlabBranches";

export default class GitlabProject {
  private readonly _id: number;
  private readonly _description: string;
  private readonly _name: string;
  private readonly _pathWithNamespace: string;
  private readonly _mergeRequestsEnabled: boolean;

  private readonly requester: GitlabRequester;
  private branchLoaded: boolean = false;
  private _branches: GitlabBranchs = new GitlabBranchs([]);

  constructor(origin: GProjectApiResponse, requester: GitlabRequester) {
    this.requester = requester;

    this._id = origin.id;
    this._description = origin.description;
    this._name = origin.name;
    this._pathWithNamespace = origin.path_with_namespace;
    this._mergeRequestsEnabled = origin.merge_requests_enabled;
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

  public get mergeRequestsEnabled():boolean {
    return this._mergeRequestsEnabled;
  }

  public async branches(): Promise<GitlabBranchs> {
    if (this.branchLoaded) return this._branches;
    this._branches = await this.requester.getBranchsOf(this.id);
    this.branchLoaded = true;
    return this._branches;
  }
}
