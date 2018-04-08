# Backup-cleanup-cron

Tis project is a basic script to cleanup old backup files. It can be run as cron job.

# Prerequisites

The script assumes that the files can be sorted with the native JavaScript `sort` function of arrays.

# Installation

```
npm i
```

# Configuration

The repository contains a template configuration which can be copied and adapted

```
cp config.template.js config.js
```

Here is a sample configuration:

```
module.exports = require("rc")("cleanup", {
  backupFiles: [
    { name: "gitlab_backup.tar", path: "/backups/gitlab/", keep: 3 },
    { name: "etc-gitlab", path: "/backups/gitlab/", keep: 4 }
  ]
});
```

* `name` search for files with this substring
* `path` search for files in this path
* `keep` keep the x newest files

With this configuration the script would search for files in the directory `/backups/gitlab/` which contain the substring `etc-gitlab`. It would match files like:

* `2018-02-02_etc-gitlab.tar.gz`
* `etc-gitlab.tar.gz_2018_02_02.tar.gz`

It would then sort the files matching the pattern and delete all the files except the 3 with the newest dates.

It would also search for files in the same directory `backups/gitlab/` and search for files matching `etc-gitlab`. It would keep the newest 4 files.

# Run

```
npm start
```

# Build as Dockerfile

To build a docker image out of the script run
for example the command

It assumes, that a config.js file already exists (see configuration).

```
docker build . -t my-scleanup-script:latest
```
