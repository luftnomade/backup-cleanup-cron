const config = require("./config");
const { run } = require("./lib/cleanup.js")();
run(config.backupFiles);
