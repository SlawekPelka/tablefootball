const fs = require('fs');

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
    addTeam: (teamname, member1, member2, member3) => {
        return new Promise((resolve, reject) => {
            fs.readFile(`${__dirname}/../assets/json/teamlist.json`, 'utf8', (err, content) => {
                if (err) {
                    reject(err);
                }
                let parsed = JSON.parse(content);
                let teamObject = {
                    "teamname": teamname,
                    "members": [member1, member2, member3],
                    "win": 0,
                    "lose": 0
                }
                parsed[teamname] = teamObject;

                fs.writeFile(`${__dirname}/../assets/json/teamlist.json`, JSON.stringify(parsed, null, '\t'), err => {
                    if (err) {
                        reject(err);
                    }
                    resolve(`Team ${teamname} added`);
                });
            });
        });
    },
    removeTeam: (teamname) => {
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
                    resolve(`Team ${teamname} removed`);
                });
            });
        });
    },
    editTeam: () => {

    }
}