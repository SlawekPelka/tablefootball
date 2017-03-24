const fs = require('fs');
const players = require('./player');

module.exports = {
    endMatch: matchStats => {
        return new Promise((resolve, reject) => {
            fs.readFile(`${__dirname}/../assets/json/teamlist.json`, 'utf8', (err, content) => {
                if (err) {
                    reject(err);
                }

                let parsedTeam = JSON.parse(content);
                parsedTeam[matchStats.winner].win += 1;
                parsedTeam[matchStats.loser].lose += 1;

                // write the match history
                fs.readFile(`${__dirname}/../assets/json/matchhistory.json`, 'utf8', (err, content) => {
                    if (err) {
                        reject(err);
                    }

                    let parsedHistory = JSON.parse(content);

                    let matchObject = {
                        "teamsPlayed": [matchStats.winner, matchStats.loser],
                        "playedOn": Date.now(),
                        "winner": matchStats.winner,
                        "loser": matchStats.loser,
                        "scoreWin": matchStats.winscore,
                        "scoreLose": matchStats.losescore,
                        "players": {
                            "winner": {

                            },
                            "loser": {

                            }
                        }
                    }
                    matchObject.players.winner[matchStats.winner1] = matchStats.winner1score;
                    matchObject.players.winner[matchStats.winner2] = matchStats.winner2score;
                    matchObject.players.winner[matchStats.winner3] = matchStats.winner3score;
                    
                    matchObject.players.loser[matchStats.loser1] = matchStats.loser1score;
                    matchObject.players.loser[matchStats.loser2] = matchStats.loser2score;
                    matchObject.players.loser[matchStats.loser3] = matchStats.loser3score;

                    parsedHistory[Date.now()] = matchObject;

                    fs.writeFile(`${__dirname}/../assets/json/matchhistory.json`, JSON.stringify(parsedHistory, null, '\t'), err => {
                        if (err) {
                            reject(err);
                        }
                        let playerArray = [matchStats.winner1, matchStats.winner2, matchStats.winner3, matchStats.loser1, matchStats.loser2, matchStats.loser3];
                        let goalsArray = [matchStats.winner1score, matchStats.winner2score, matchStats.winner3score, matchStats.loser1score, matchStats.loser2score, matchStats.loser3score];

                        players.setPlayersXP(playerArray, goalsArray).then(res => {
                            resolve(`"${matchStats.winner}" won!`)
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