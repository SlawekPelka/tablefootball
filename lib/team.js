const fs = require('fs');
const players = require('./player');

module.exports = {
    getAll: () => {
        return new Promise((resolve, reject) => {
            fs.readFile(`${__dirname}/../assets/json/teamlist.json`, 'utf8', (err, content) => {
                if (err) {
                    reject(err);
                }
                let parsed = JSON.parse(content);
                if (Object.keys(parsed).length === 0 && parsed.constructor === Object) resolve({"error": "No teams set yet!"});
                resolve(parsed);
            });
        });
    },
    getByTeamName: teamname => {
        return new Promise((resolve, reject) => {
            fs.readFile(`${__dirname}/../assets/json/teamlist.json`, 'utf8', (err, content) => {
                if (err) {
                    reject(err);
                }
                let parsed = JSON.parse(content);
                if (!Object.keys(parsed).includes(teamname)) resolve({"error": "No such team exists!"});
                resolve(parsed[teamname]);
            });
        });
    },
    getByTeamMember: teammember => {
        return new Promise((resolve, reject) => {
            fs.readFile(`${__dirname}/../assets/json/teamlist.json`, 'utf8', (err, content) => {
                if (err) {
                    reject(err);
                }
                let parsed = JSON.parse(content);
                let teamData = [];

                for (let teamname in parsed) {
                    if (parsed[teamname]['members'].includes(teammember)) teamData.push(parsed[teamname]);
                }

                if (teamData.length > 0) {
                    resolve(teamData[0]);
                } else {
                    resolve({"error": "No such team member exists!"});
                }
            });
        });
    },
    addTeam: (teamname, member1, member2, member3) => {
        return new Promise((resolve, reject) => {
            fs.readFile(`${__dirname}/../assets/json/teamlist.json`, 'utf8', (err, content) => {
                if (err) {
                    reject(err);
                }
                let parsedTeam = JSON.parse(content);
                let teamObject = {
                    "teamname": teamname,
                    "members": [member1, member2, member3],
                    "win": 0,
                    "lose": 0
                }
                parsedTeam[teamname] = teamObject;

                fs.writeFile(`${__dirname}/../assets/json/teamlist.json`, JSON.stringify(parsedTeam, null, '\t'), err => {
                    if (err) {
                        reject(err);
                    }
                    players.addPlayers(teamObject['members']).then(data => {
                        resolve(`Team "${teamname}" added`);
                    });
                });
            });
        });
    },
    removeTeam: teamname => {
        return new Promise((resolve, reject) => {
            fs.readFile(`${__dirname}/../assets/json/teamlist.json`, 'utf8', (err, content) => {
                if (err) {
                    reject(err);
                }
                let parsed = JSON.parse(content);

                delete parsed[teamname];

                fs.writeFile(`${__dirname}/../assets/json/teamlist.json`, JSON.stringify(parsed, null, '\t'), err => {
                    if (err) {
                        reject(err);
                    }
                    resolve(`Team "${teamname}" removed`);
                });
            });
        });
    },
    editTeam: () => {

    }
}