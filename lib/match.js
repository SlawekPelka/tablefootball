const fs = require('fs');

module.exports = {
    endMatch: (winner, loser, winscore, losescore) => {
        return new Promise((resolve, reject) => {
            fs.readFile(`${__dirname}/../assets/json/teamlist.json`, 'utf8', (err, content) => {
                if (err) {
                    reject(err);
                }

                let parsed = JSON.parse(content);
                parsed[winner].win++;
                parsed[loser].lose++;

                fs.writeFile(`${__dirname}/../assets/json/teamlist.json`, JSON.stringify(parsed, null, '\t'), err => {
                    if (err) {
                        reject(err);
                    }
                });
            });

            fs.readFile(`${__dirname}/../assets/json/matchhistory.json`, 'utf8', (err, content) => {
                if (err) {
                    reject(err);
                }

                let parsed = JSON.parse(content);
                let matchObject = {
                    "playedOn": Date.now(),
                    "winner": winner,
                    "loser": loser,
                    "scoreWin": winscore,
                    "scoreLose": losescore
                }
                parsed[Date.now()] = matchObject;

                fs.writeFile(`${__dirname}/../assets/json/matchhistory.json`, JSON.stringify(parsed, null, '\t'), err => {
                    if (err) {
                        reject(err);
                    }
                    resolve(`Winner is ${winner}!`)
                });
            });
        });
    }
}