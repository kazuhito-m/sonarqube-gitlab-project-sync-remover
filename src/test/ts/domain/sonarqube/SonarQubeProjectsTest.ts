import SonarQubeProjects from "../../../../main/ts/domain/sonarqube/SonarQubeProjects";
import SonarQubeProject from "../../../../main/ts/domain/sonarqube/SonarQubeProject";
jest.dontMock("../../../../main/ts/domain/sonarqube/SonarQubeProjects");
jest.dontMock("../../../../main/ts/domain/sonarqube/SonarQubeProject");

describe("SonarQubeProjects.joinedKeyes のテスト", () => {
  it("キーをカンマ区切りで文字列連結できる", () => {
    const parameters = ["key1", "鍵2", "かぎ3"].map(s => createProject(s));
    const sut = new SonarQubeProjects(parameters);
    expect(sut.joinedKeyes()).toEqual("key1,鍵2,かぎ3");
  });
});

function createProject(key: string): SonarQubeProject {
  return new SonarQubeProject("", key, "", "");
}
