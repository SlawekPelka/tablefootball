const fs = require('fs');

module.exports = {
    addPlayers: playerNameArray => {
        return new Promise((resolve, reject) => {
            fs.readFile(`${__dirname}/../assets/json/players.json`, 'utf8', (err, content) => {
                if (err) reject(err);

                let parsedCurrentPlayers = JSON.parse(content);

                for (let i = 0; i < playerNameArray.length; i++) {
                    let newPlayerObject = {
                        "name": playerNameArray[i],
                        "xp": 0,
                        "level": 1,
                        "globalRank": "NaN"
                    }
                    parsedCurrentPlayers[playerNameArray[i]] = newPlayerObject;
                }

                fs.writeFile(`${__dirname}/../assets/json/players.json`, JSON.stringify(parsedCurrentPlayers, null, '\t'), err => {
                    if (err) reject(err);
                    resolve(true);
                });

            });
        });
    },
    editPlayerName: playername => {

    },
    setPlayersXP: (playerNameArray, goalsArray) => {
        return new Promise((resolve, reject) => {
            fs.readFile(`${__dirname}/../assets/json/players.json`, 'utf8', (err, content) => {
                if (err) reject(err);

                let parsedPlayers = JSON.parse(content);

                for (let i = 0; i < playerNameArray.length; i++) {
                    let addLevels = 0;
                    let calculatedXp = Math.floor(Number(goalsArray[i]) * 100 / 2 + 20);
                    let totalNewXp = Math.floor( calculatedXp + Number(parsedPlayers[playerNameArray[i]].xp) );

                    if (totalNewXp > 1000) {
                        addLevels++;
                        totalNewXp = Math.floor(totalNewXp - 1000);
                    }

                    let totalNewLevel = Math.floor(Number(parsedPlayers[playerNameArray[i]].level) + addLevels);

                   
                    parsedPlayers[playerNameArray[i]]['level'] = totalNewLevel;
                    parsedPlayers[playerNameArray[i]]['xp'] = totalNewXp;
                    
                }

                fs.writeFile(`${__dirname}/../assets/json/players.json`, JSON.stringify(parsedPlayers, null, '\t'), err => {
                    if (err) reject(err);
                    resolve(true);
                });
            });
        });
    },
    getPlayerStatistics: playername => {
        return new Promise((resolve, reject) => {
            fs.readFile(`${__dirname}/../assets/json/players.json`, 'utf8', (err, content) => {
                if (err) reject(err);

                let parsedPlayers = JSON.parse(content);
                let chosenPlayerData = parsedPlayers[playername];
                resolve(chosenPlayerData);
            });
        });
    }
}