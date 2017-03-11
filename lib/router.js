const express = require('express'),
    app = express();

const http = require('http').Server(app);

const teams = require('./team');
const match = require('./match');

let port = 80;

app.set('/v', `${__dirname}/../views`);
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
    match.endMatch(query.winner, query.loser, query.winscore, query.losescore, query.member1score, query.member2score, query.member3score, query.member4score, query.member5score, query.member6score).then(msg => {
        res.redirect(`/?msg=${msg}`);
    });
});