import * as querystring from "querystring";
import { AxiosStatic, AxiosInstance } from "axios";
import ProjectApiResponse from "./api/ProjectApiResponse";
import Settings from "../../../domain/config/Settings";
import SonarQubeRepository from "../../../domain/sonarqube/SonarQubeRepository";
import SonarQubeProjects from "../../../domain/sonarqube/SonarQubeProjects";
import SonarQubeProject from "../../../domain/sonarqube/SonarQubeProject";

export default class SonarQubeRequester implements SonarQubeRepository {
  private readonly settings: Settings;
  private readonly axios: AxiosInstance;

  constructor(settings: Settings, axiosBase: AxiosStatic) {
    this.axios = axiosBase.create({
      baseURL: settings.sonarqubeUrl,
      responseType: "json"
    });
    this.settings = settings;
  }

  public async getAllProjects(): Promise<SonarQubeProjects> {
    const uri = "/api/projects/search?ps=500";
    const response = await this.axios.get(uri, this.basicAuthConfig());
    const resProjects: ProjectApiResponse[] = response.data.components;
    const projects = resProjects.map(rp => new SonarQubeProject(rp));
    return new SonarQubeProjects(projects);
  }

  public async removeProjects(projects: SonarQubeProjects) {
    this.loggingRemoveProjects(projects);
    if (projects.empty()) return;
    const uri = "/api/projects/bulk_delete";
    const params = querystring.stringify({ projects: projects.joinedKeyes() });
    await this.axios.post(uri, params, this.basicAuthConfig());
  }

  private basicAuthConfig() {
    const settings = this.settings;
    return {
      auth: {
        username: settings.sonarqubeUserName,
        password: settings.sonarqubePassword
      }
    };
  }

  private loggingRemoveProjects(projects: SonarQubeProjects) {
    const names = projects.validProjects().map(project => project.name);
    console.log(`削除するSonarQubeProject(${names.length})`);
    names.forEach(name => console.log(`name:${name}`));
  }
}
