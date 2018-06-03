import { AxiosStatic, AxiosInstance } from "axios";
import GProjectApiResponse from "./api/GProjectApiResponse";
import GBranchApiResponse from "./api/GBranchApiResponse";
import Settings from "../../../domain/config/Settings";
import GitlabRepository from "../../../domain/gitlab/GitlabRepository";
import GitlabProjects from "../../../domain/gitlab/GitlabProjects";
import GitlabProject from "../../../domain/gitlab/GitlabProject";
import GitlabBranchs from "../../../domain/gitlab/GitlabBranches";
import GitlabBranch from "../../../domain/gitlab/GitlabBranch";

export default class GitlabRequester implements GitlabRepository {
  private readonly settings: Settings;
  private readonly axios: AxiosInstance;

  constructor(settings: Settings, axiosBase: AxiosStatic) {
    this.settings = settings;
    this.axios = axiosBase.create({
      baseURL: this.settings.gitlabUrl,
      responseType: "json"
    });
  }

  public async getAllProjects(): Promise<GitlabProjects> {
    const token = this.settings.gitlabPrivateAccessToken;
    const uri = `/api/v4/projects?per_page=100&private_token=${token}`;
    const response = await this.axios.get(uri);
    const resProjects: GProjectApiResponse[] = response.data;
    const projects = resProjects.map(rp => this.createProject(rp));
    const withBranchProjects: GitlabProject[] = [];
    for (const project of projects) {
      if (!project.mergeRequestsEnabled) continue;
      const branchs = await this.getBranchsOf(project.id);
      withBranchProjects.push(project.with(branchs));
    }
    return new GitlabProjects(withBranchProjects);
  }

  public async getBranchsOf(projectId: number): Promise<GitlabBranchs> {
    const token = this.settings.gitlabPrivateAccessToken;
    const uri = `/api/v4/projects/${projectId}/repository/branches?private_token=${token}`;
    const response = await this.axios.get(uri);
    const resBranchs: GBranchApiResponse[] = response.data;
    const branchs = resBranchs.map(rb => new GitlabBranch(rb));
    return new GitlabBranchs(branchs);
  }

  private createProject(origin: GProjectApiResponse): GitlabProject {
    return new GitlabProject(
      origin.id,
      origin.description,
      origin.name,
      origin.path_with_namespace,
      origin.merge_requests_enabled,
      new GitlabBranchs([])
    );
  }
}