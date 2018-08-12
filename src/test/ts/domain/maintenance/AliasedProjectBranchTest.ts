import ProjectAndBranch from "../../../../main/ts/domain/maintenance/ProjectAndBranch";
import AliasedProjectBranch from "../../../../main/ts/domain/maintenance/AliasedProjectBranch";
import Aliases from '../../../../main/ts/domain/config/Aliases';
jest.dontMock("../../../../main/ts/domain/maintenance/AliasedProjectBranch");

const aliases: Aliases = new Aliases({
  元の名前: "置き換えた名前",
  べつの名前: ""
});

describe("AliasedProjectBranch.projectName のテスト", () => {
  it("プロジェクト名がエイリアス辞書の中にあれば置き換える", () => {
    const origin: ProjectAndBranch = {
      projectName: "元の名前",
      branchName: ""
    };
    const sut = new AliasedProjectBranch(origin, aliases);
    expect(sut.projectName).toEqual("置き換えた名前");
  });

  it("プロジェクト名がエイリアス辞書の中になければ置き換えない", () => {
    const origin: ProjectAndBranch = {
      projectName: "全然違う名前",
      branchName: ""
    };
    const sut = new AliasedProjectBranch(origin, aliases);
    expect(sut.projectName).toEqual("全然違う名前");
  });
});
