import GitlabProjects from "./GitlabProjects";
import GitlabBranchs from "./GitlabBranches";

export default interface GitlabRepository {
  getAllProjects(): Promise<GitlabProjects>;
  getBranchsOf(projectId: number): Promise<GitlabBranchs>;
}
