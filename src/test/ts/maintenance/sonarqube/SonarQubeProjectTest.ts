import SonarQubeProject from "../../../../main/ts/maintenance/sonarqube/SonarQubeProject";
import ProjectApiResponse from "../../../../main/ts/maintenance/sonarqube/api/ProjectApiResponse";
jest.dontMock("../../../../main/ts/maintenance/sonarqube/SonarQubeProject");

describe("SonarQubeProject.branchName のテスト", () => {
  it("代表名をからブランチ名を割り出せる", () => {
    const sut = createSut("project_name branch_name");
    expect(sut.branchName).toEqual("branch_name");
  });

  it("代表名に区切り文字が無かった場合、空文字をブランチ名とする", () => {
    const sut = createSut("project_name_only");
    expect(sut.branchName).toEqual("");
  });

  it("代表名に区切り文字が複数会った場合、最後の空文字以降をブランチ名とする", () => {
    const sut = createSut("a b c d last");
    expect(sut.branchName).toEqual("last");
  });
});

describe("SonarQubeProject.projectName のテスト", () => {
  it("代表名をからプロジェクト名を割り出せる", () => {
    const sut = createSut("project_name branch_name");
    expect(sut.projectName).toEqual("project_name");
  });

  it("代表名に区切り文字が無かった場合、すべての文字をプロジェクト名とする", () => {
    const sut = createSut("project_name_only");
    expect(sut.projectName).toEqual("project_name_only");
  });

  it("代表名に区切り文字が複数会った場合、最後の空文字以降をブランチ名とする", () => {
    const sut = createSut("a b c d last");
    expect(sut.projectName).toEqual("a b c d");
  });
});

// Utsils

function createSut(projectName: string): SonarQubeProject {
  const apiItem: ProjectApiResponse = {
    id: "1",
    key: "",
    name: projectName,
    lastAnalysisDate: ""
  };
  return new SonarQubeProject(apiItem);
}
