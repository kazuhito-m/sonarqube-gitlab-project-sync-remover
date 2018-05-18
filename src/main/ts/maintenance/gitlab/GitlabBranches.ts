import GitlabBranch from "./GitlabBranch";

export default class GitlabBranchs {
  private readonly branchs: GitlabBranch[];

  constructor(branchs: GitlabBranch[]) {
    this.branchs = branchs;
  }

  public validBranchs(): GitlabBranch[] {
    return this.branchs;
  }
}
