const fs = require('fs');

module.exports =  {
    getHistoryOfTeam: teamname => {
        return new Promise((resolve, reject) => {
            fs.readFile(`${__dirname}/../assets/json/matchhistory.json`, 'utf8', (err, content) => {
                if (err) {
                    reject(err);
                }

                let parsed = JSON.parse(content);
                let allMatchesPlayed = [];

                for (let timestamp in parsed) {
                    if (parsed[timestamp]['teamsPlayed'].includes(teamname)) allMatchesPlayed.push(parsed[timestamp]);
                }

                resolve(allMatchesPlayed);
            });
        });
    }
}