import SonarQubeProjects from "./SonarQubeProjects";

export default interface SonarQubeRepository {
  getAllProjects(): Promise<SonarQubeProjects>;
  removeProjects(projects: SonarQubeProjects):void;
}
