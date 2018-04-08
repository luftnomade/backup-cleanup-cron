const Lab = require("lab");
const lab = (exports.lab = Lab.script());
const { it, describe, beforeEach } = lab;
const { expect } = require("code");
const pquire = require("proxyquire").noPreserveCache();
const sinon = require("sinon");

describe("cleanup", () => {
  let stubs;
  let cleanup;

  beforeEach(() => {
    fsStub = {
      readdirAsync: sinon
        .stub()
        .resolves([
          "1516047687_2018_01_15_10.3.3_gitlab_backup.tar",
          "1516069409_2018_01_16_10.3.3_gitlab_backup.tar",
          "1516155816_2018_01_17_10.3.3_gitlab_backup.tar",
          "1516242224_2018_01_18_10.3.3_gitlab_backup.tar",
          "1516328615_2018_01_19_10.3.3_gitlab_backup.tar",
          "etc-gitlab-1516328619.tgz",
          "etc-gitlab-1516155822.tgz",
          "etc-gitlab-1516242229.tgz",
          "some-other"
        ]),
      unlinkAsync: sinon.stub().resolves()
    };
    stubs = {
      bluebird: {
        promisifyAll: () => {
          return fsStub;
        }
      }
    };
  });
  it("deletes all outdated files", async () => {
    cleanup = pquire("../lib/cleanup.js", stubs);
    await cleanup().run([
      { name: "gitlab_backup.tar", path: "/backups/gitlab/", keep: 3 },
      { name: "etc-gitlab", path: "/backups/gitlab-secrets/", keep: 2 },
      { name: "redmine_backup.tar.gz", path: "/backups/redmine/", keep: 3 }
    ]);
    expect(fsStub.unlinkAsync.args.length).to.equal(3);
    expect(fsStub.unlinkAsync.args[0][0]).to.equal(
      "/backups/gitlab/1516069409_2018_01_16_10.3.3_gitlab_backup.tar"
    );
    expect(fsStub.unlinkAsync.args[1][0]).to.equal(
      "/backups/gitlab/1516047687_2018_01_15_10.3.3_gitlab_backup.tar"
    );
    expect(fsStub.unlinkAsync.args[2][0]).to.equal(
      "/backups/gitlab-secrets/etc-gitlab-1516155822.tgz"
    );
  });
});
