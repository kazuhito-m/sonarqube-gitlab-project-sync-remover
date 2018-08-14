import RemoveTargets from "../../../../main/ts/domain/maintenance/RemoveTargets";
import Aliases from '../../../../main/ts/domain/config/Aliases';
import SonarQubeProject from '../../../../main/ts/domain/sonarqube/SonarQubeProject';
import SonarQubeProjects from '../../../../main/ts/domain/sonarqube/SonarQubeProjects';
import GitlabProjects from '../../../../main/ts/domain/gitlab/GitlabProjects';
import GitlabProject from '../../../../main/ts/domain/gitlab/GitlabProject';
import GitlabBranchs from '../../../../main/ts/domain/gitlab/GitlabBranches';
import GitlabBranch from '../../../../main/ts/domain/gitlab/GitlabBranch';
jest.dontMock("../../../../main/ts/domain/maintenance/RemoveTargets");

const aliases: Aliases = new Aliases({
  "ContentsPrint(CP2)": "CP2",
  "gitproject_server": "gitproject",
  "gitproject_client": "gitproject"
});

function createSonarqubeProjectsByNames(projectNames: string[]): SonarQubeProjects {
  const projects = projectNames.map(name => new SonarQubeProject("", "", name, ""));
  return new SonarQubeProjects(projects);
}

function createGitlabProjectsByNameAndBranches(repositoryName: string, branchNames: string[]): GitlabProjects {
  const branchs = branchNames.map(name => new GitlabBranch(name));
  const project = new GitlabProject(1, "", repositoryName, "", true, new GitlabBranchs(branchs));
  return new GitlabProjects([project]);
}

describe("RemoveTargets.filterd() のテスト", () => {
  it("GitLabの1プロジェクトからSonarQube上2プロジェクトが生成されてれいる場合、branchを確認して削除対象にしない", () => {
    const sonarqube側のプロジェクト群 = createSonarqubeProjectsByNames([
      "gitproject_server master",
      "gitproject_client master",
      "gitproject_server branch_a",
      "gitproject_client branch_a",
      "gitproject_server branch_b",
      "gitproject_client branch_b"
    ]);
    const gitlab側のプロジェクト群 = createGitlabProjectsByNameAndBranches(
      "gitproject",
      ["master", "branch_b"]
    );
    const sut = new RemoveTargets(sonarqube側のプロジェクト群, gitlab側のプロジェクト群, aliases);

    const sonarqubeProjects = sut.filterd();

    const actual = sonarqubeProjects.validProjects()
      .map(project => project.name);
    expect(actual).toHaveLength(2);
    expect(actual).toContain("gitproject_client branch_a");
    expect(actual).toContain("gitproject_server branch_a");
  });
});
