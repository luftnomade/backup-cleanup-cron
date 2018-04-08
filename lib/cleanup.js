const Promise = require("bluebird");
const fs = Promise.promisifyAll(require("fs"));
const pino = require("pino");
const logger = pino();

module.exports = () => {
  const getFilesToDelete = async fileSpec => {
    return (await fs.readdirAsync(fileSpec.path))
      .reduce((acc, val) => {
        if (val.indexOf(fileSpec.name) !== -1) {
          acc.push(`${fileSpec.path}${val}`);
        }
        return acc;
      }, [])
      .sort()
      .reverse()
      .slice(fileSpec.keep);
  };

  const deleteFiles = async filesToDelete => {
    logger.info(filesToDelete, "files to delete");
    const deleteFunctions = filesToDelete.map(fileToDelete => {
      return fs.unlinkAsync(fileToDelete).then(() => {
        logger.info(fileToDelete, "deleted");
      });
    });
    return Promise.all(deleteFunctions);
  };

  return {
    run: async fileSpecs => {
      for (fileSpec of fileSpecs) {
        await deleteFiles(await getFilesToDelete(fileSpec));
      }
    }
  };
};
