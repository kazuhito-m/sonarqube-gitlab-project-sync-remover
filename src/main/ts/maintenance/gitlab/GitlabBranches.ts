import GitlabBranch from "./GitlabBranch";
import ProjectAndBranch from "../ProjectAndBranch";

export default class GitlabBranchs {
  private readonly branchs: GitlabBranch[];

  constructor(branchs: GitlabBranch[]) {
    this.branchs = branchs;
  }

  public exists(otherBranch: ProjectAndBranch): boolean {
    return this.validBranchs().some(selfBranch =>
      selfBranch.sameOf(otherBranch)
    );
  }

  public validBranchs(): GitlabBranch[] {
    return this.branchs;
  }
}
