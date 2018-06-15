import GitlabProjects from "./GitlabProjects";

export default interface GitlabRepository {
  getAllProjects(): Promise<GitlabProjects>;
}
