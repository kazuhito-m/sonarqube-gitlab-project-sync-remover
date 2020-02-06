import { AxiosStatic, AxiosInstance } from 'axios';
import GProjectApiResponse from './api/GProjectApiResponse';
import GBranchApiResponse from './api/GBranchApiResponse';
import Settings from '../../../domain/config/Settings';
import GitlabRepository from '../../../domain/gitlab/GitlabRepository';
import GitlabProjects from '../../../domain/gitlab/GitlabProjects';
import GitlabProject from '../../../domain/gitlab/GitlabProject';
import GitlabBranchs from '../../../domain/gitlab/GitlabBranches';
import GitlabBranch from '../../../domain/gitlab/GitlabBranch';

export default class GitlabRequester implements GitlabRepository {
  private readonly settings: Settings;
  private readonly axios: AxiosInstance;

  constructor(settings: Settings, axiosBase: AxiosStatic) {
    this.settings = settings;
    this.axios = axiosBase.create({
      baseURL: this.settings.gitlabUrl,
      responseType: 'json'
    });
  }

  public async getAllProjects(): Promise<GitlabProjects> {
    const token = this.settings.gitlabPrivateAccessToken;
    const uriBase = `/api/v4/projects?per_page=100&archived=false&private_token=${token}`;
    let resAllProjects: GProjectApiResponse[] = [];
    for (let page = 1; page < 100; page++) {
      const uri = `${uriBase}&page=${page}`      
      const response = await this.axios.get(uri);
      const resProjects: GProjectApiResponse[] = response.data;
      if (resProjects.length === 0) break;
      resAllProjects = resAllProjects.concat(resProjects);
    }
    const projects = resAllProjects.map(rp => this.createProject(rp));
    const withBranchProjects: GitlabProject[] = [];
    for (const project of projects) {
      if (!project.mergeRequestsEnabled) continue;
      const branchs = await this.getBranchsOf(project);
      withBranchProjects.push(project.with(branchs));
    }
    return new GitlabProjects(withBranchProjects);
  }

  private async getBranchsOf(project: GitlabProject): Promise<GitlabBranchs> {
    const token = this.settings.gitlabPrivateAccessToken;
    const uri = `/api/v4/projects/${project.id}/repository/branches?private_token=${token}`;
    let response = { data: [] };
    try {
      response = await this.axios.get(uri);
    } catch (e) {
      console.log(`gitからbranchが取得できませんでした。projectName:${project.name}, id:${project.id}`);
    }
    const resBranchs: GBranchApiResponse[] = response.data;
    const branchs = resBranchs.map(rb => new GitlabBranch(rb.name));
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
