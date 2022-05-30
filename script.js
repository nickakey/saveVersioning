const fs = require("fs-extra");
resolve = require("path").resolve;

const prompt = require("prompt");

prompt.start();

const goUpOneLevel = (path) => path.split("/").slice(1, -1).join("/");

const main = async () => {
    prompt.get(
        //pathToFolder E.G. /Users/nakey/Code/Users/nakey/Desktop/saves - ABSOLUTE Path
        //intervalsInMinutes E.G. 5
        ["pathToFolder", "intervalInMinutes"],
        async (err, result) => {
            if (err) {
                return console.log(err);
            }
            const pathToFolder = result.pathToFolder;
            const intervalInMinutes = result.intervalInMinutes;

            const newFolderName = new Date().toLocaleTimeString();
            const newFolderPath = `/${goUpOneLevel(pathToFolder)}/${newFolderName}`;

            setTimeout(async () => {
                try {
                    await fs.mkdir(newFolderPath);
                    await fs.copy(pathToFolder, newFolderPath);
                    console.log(`backup ${newFolderPath} created`);
                } catch (err) {
                    console.log(`aborted ERROR ${err}`);
                }
            }, intervalInMinutes * 60);
        }
    );
};

main();