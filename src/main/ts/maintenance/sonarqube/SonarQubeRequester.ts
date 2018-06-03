import Settings from "../../config/Settings";
import SonarQubeProjects from "./SonarQubeProjects";
import ProjectApiResponse from "./api/ProjectApiResponse";
import SonarQubeProject from "./SonarQubeProject";
import * as querystring from "querystring";

export default class SonarQubeRequester {
  private readonly settings: Settings;
  private readonly axios: any;

  constructor(settings: Settings, axiosBase: any) {
    this.settings = settings;
    this.axios = axiosBase.create({
      baseURL: this.settings.sonarqubeUrl,
      responseType: "json"
    });
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
    const list = projects.validProjects();
    console.log(`削除するSonarQubeProject(${list.length})`);
    list.forEach(p => console.log(`name:${p.name}`));
  }
}
