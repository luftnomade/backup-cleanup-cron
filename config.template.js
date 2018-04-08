module.exports = require("rc")("cleanup", {
  backupFiles: [
    { name: "gitlab_backup.tar", path: "/backups/gitlab/", keep: 3 },
    { name: "etc-gitlab", path: "/backups/gitlab/", keep: 3 },
    { name: "rancher-dump", path: "/backups/rancher/", keep: 3 },
    { name: "ninja-dump", path: "/backups/invoiceninja/", keep: 3 },
    { name: "app-storage", path: "/backups/invoiceninja/", keep: 3 },
    { name: "public-logo", path: "/backups/invoiceninja/", keep: 3 }
  ]
});
