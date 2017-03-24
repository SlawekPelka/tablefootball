const express = require('express'),
    app = express();

const http = require('http').Server(app);

const teams = require('./team');
const match = require('./match');
const history = require('./history');
const player = require('./player');

let port = 80;

app.set('/v', `${__dirname}/../views`);
app.set('/p', `${__dirname}/../views`);
app.set('/u', `${__dirname}/../views`);
app.set('/assets', `${__dirname}/../assets`);

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.use(express.static(`${__dirname}/..`));

http.listen(port, () => {
    console.log(`Listening on port: ${port}`);
});

// =========================================

module.exports = () => {
    app.get('/', (req, res) => {
        let query = require('url').parse(req.url,true).query;
        teams.getAll().then(data => {
            res.render('dashboard.html', {teamData: data, message: query.msg});
        });
    });
}

// =========================================

app.get('/v/add', (req, res) => {
    res.render('addteam.html');
});

app.get('/v/edit/:teamname', (req, res) => {
    
});

app.get('/v/delete/:teamname', (req, res) => {
    res.render('deleteteam.html', {teamname: req.params.teamname});
});

app.get('/v/match', (req, res) => {
    teams.getAll().then(data => {
        res.render('match.html', {teamData: data});
    });
});

app.get('/p/:teamname', (req, res) => {
    teams.getByTeamName(req.params.teamname).then(teamdata => {
        history.getHistoryOfTeam(req.params.teamname).then(teamhistorydata => {
            res.render('teamprofile.html', {teamData: teamdata, teamHistory: teamhistorydata});
        });
    });
});

app.get('/u/:membername', (req, res) => {
    teams.getByTeamMember(req.params.membername).then(userdata => {
        history.getHistoryOfTeam(userdata.teamname).then(teamhistorydata => {
            player.getPlayerStatistics(req.params.membername).then(playerstatistics => {
                res.render('playerprofile.html', {memberData: userdata, matchHistory: teamhistorydata, playerstats: playerstatistics});
            });
        });
    });
});

// =========================================

app.get('/submitteam', (req, res) => {
    let query = require('url').parse(req.url,true).query;
    teams.addTeam(query.teamname, query.member1, query.member2, query.member3).then(msg => {
        res.redirect(`/?msg=${msg}`);
    });
});

app.get('/editteam', (req, res) => {

});

app.get('/deleteteam', (req, res) => {
    let query = require('url').parse(req.url,true).query;
    teams.removeTeam(query.teamname).then(msg => {
        res.redirect(`/?msg=${msg}`);
    });
});

app.get('/endmatch', (req, res) => {
    let query = require('url').parse(req.url,true).query;
    match.endMatch(query).then(msg => {
        res.redirect(`/?msg=${msg}`);
    });
});