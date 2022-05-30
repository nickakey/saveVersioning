const fs = require("fs-extra");
resolve = require("path").resolve;
const path = require('path');

const prompt = require("prompt");

prompt.start();

const goUpOneLevel = (path) => "/" + path.split("/").slice(1, -1).join("/");

const main = async () => {
    prompt.get(
        //pathToFolder E.G. /Users/nakey/Code/Users/nakey/Desktop/saves - ABSOLUTE Path
        //intervalsInMinutes E.G. 5
        ["pathToFolder", "intervalInMinutes"],
        async (err, result) => {
            if (err) {
                return console.log(err);
            }
            const pathToFolder = "/Program Files (x86)/Steam/steamapps/common/Subnautica/SNAppData/SavedGames";
            const intervalInMinutes = result.intervalInMinutes;

            setInterval(async () => {

                console.log({pathToFolder, upOneLevel: goUpOneLevel(pathToFolder)})

                const newFolderName = new Date().toLocaleTimeString().replaceAll(":", "-");
                const newFolderPath = path.join(
                    goUpOneLevel(pathToFolder), `${newFolderName}`);

                
                console.log({pathToFolder})
                console.log({newFolderPath})
                try {
                    await fs.mkdir(newFolderPath);
                    await fs.copy(pathToFolder, newFolderPath);
                    console.log(`backup ${newFolderPath} created`);
                } catch (err) {
                    console.log(`aborted ERROR ${err}`);
                }
            }, intervalInMinutes * 1000 * 60);
        }
    );
};

main();

///Program Files (x86)/Steam/steamapps/common/Subnautica/SNAppData/SavedGames
