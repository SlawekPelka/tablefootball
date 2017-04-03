const fs = require('fs');

module.exports =  {
    getHistoryOfTeam: teamname => {
        return new Promise((resolve, reject) => {
            fs.readFile(`${__dirname}/../assets/json/matchhistory.json`, 'utf8', (err, content) => {
                if (err) reject(err);

                let parsed = JSON.parse(content);
                let allMatchesPlayed = [];

                for (let timestamp in parsed) {
                    if (parsed[timestamp]['teamsPlayed'].includes(teamname)) allMatchesPlayed.push(parsed[timestamp]);
                }

                resolve(allMatchesPlayed.reverse());
            });
        });
    },
    getTeamsRankingList: () => {
        return new Promise((resolve, reject) => {
            fs.readFile(`${__dirname}/../assets/json/teamlist.json`, 'utf8', (err, content) => {
                if (err) reject(err);

                let parsedList = JSON.parse(content);
                let sorted_list = [];

                for (let name in parsedList) {
                    sorted_list.push({name: name, score: parsedList[name].win});
                }

                sorted_list.sort((a,b) => {return a.score - b.score}).reverse();

                resolve(sorted_list);
            });
        });
    },
    getPlayersRankingList: () => {
        return new Promise((resolve, reject) => {
            fs.readFile(`${__dirname}/../assets/json/players.json`, 'utf8', (err, content) => {
                if (err) reject(err);

                let parsedList = JSON.parse(content);
                let sorted_list = [];

                for (let player in parsedList) {
                    sorted_list.push({name: player, xp: parsedList[player].xp});
                }

                sorted_list.sort((a,b) => {return a.xp - b.xp}).reverse();

                resolve(sorted_list);
            });
        });
    }
}