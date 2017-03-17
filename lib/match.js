const fs = require('fs');
const players = require('./player');

module.exports = {
    endMatch: (winner, loser, winscore, losescore, member1score, member2score, member3score, member4score, member5score, member6score) => {
        return new Promise((resolve, reject) => {
            fs.readFile(`${__dirname}/../assets/json/teamlist.json`, 'utf8', (err, content) => {
                if (err) {
                    reject(err);
                }

                let parsedTeam = JSON.parse(content);
                parsedTeam[winner].win += 1;
                parsedTeam[loser].lose += 1;

                // write the match history
                fs.readFile(`${__dirname}/../assets/json/matchhistory.json`, 'utf8', (err, content) => {
                    if (err) {
                        reject(err);
                    }

                    let parsedHistory = JSON.parse(content);

                    let member1name = parsedTeam[winner]['members'][0],
                        member2name = parsedTeam[winner]['members'][1],
                        member3name = parsedTeam[winner]['members'][2],
                        member4name = parsedTeam[loser]['members'][0],
                        member5name = parsedTeam[loser]['members'][1],
                        member6name = parsedTeam[loser]['members'][2]

                    let matchObject = {
                        "teamsPlayed": [winner, loser],
                        "playedOn": Date.now(),
                        "winner": winner,
                        "loser": loser,
                        "scoreWin": winscore,
                        "scoreLose": losescore,
                        "players": {}
                    }
                    matchObject.players[member1name] = member1score;
                    matchObject.players[member2name] = member2score;
                    matchObject.players[member3name] = member3score;
                    matchObject.players[member4name] = member4score;
                    matchObject.players[member5name] = member5score;
                    matchObject.players[member6name] = member6score;

                    parsedHistory[Date.now()] = matchObject;

                    fs.writeFile(`${__dirname}/../assets/json/matchhistory.json`, JSON.stringify(parsedHistory, null, '\t'), err => {
                        if (err) {
                            reject(err);
                        }
                        let playerArray = [member1name, member2name, member3name, member4name, member5name, member6name];
                        let goalsArray = [member1score, member2score, member3score, member4score, member5score, member6score];

                        players.setPlayersXP(playerArray, goalsArray).then(res => {
                            resolve(`"${winner}" won!`)
                        });
                    });
                });
                // end match history
                
                fs.writeFile(`${__dirname}/../assets/json/teamlist.json`, JSON.stringify(parsedTeam, null, '\t'), err => {
                    if (err) {
                        reject(err);
                    }
                });
            });
        });
    }
}