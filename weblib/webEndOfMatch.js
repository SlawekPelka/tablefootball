document.getElementById('startmatch').addEventListener('click', function(e) {
    e.preventDefault();
    let team1 = document.getElementById('team1');
    let team2 = document.getElementById('team2');
    if (team1.options[team1.selectedIndex].value == team2.options[team2.selectedIndex].value) return;

    document.getElementById('selectphase').classList.add('hidden');
    document.getElementById('actualmatch').classList.remove('hidden');

    document.getElementById('team1name').innerHTML = team1.options[team1.selectedIndex].value;
    document.getElementById('team2name').innerHTML = team2.options[team2.selectedIndex].value;
});

document.getElementById('endmatch').addEventListener('click', function(e) {
    e.preventDefault();
    
    let redirectURL = '',
        x = {};

    // Get the names
    let team1name = document.getElementById('team1name').innerHTML,
        team2name = document.getElementById('team2name').innerHTML;

    // Member 1
    let team1member1El = document.getElementById('team1member1score'),
        team1member1 = team1member1El.dataset.name,
        team1member1score = team1member1El.options[team1member1El.selectedIndex].value;
    // Member 2
    let team1member2El = document.getElementById('team1member2score'),
        team1member2 = team1member2El.dataset.name,
        team1member2score = team1member2El.options[team1member2El.selectedIndex].value;
    // Member 3
    let team1member3El = document.getElementById('team1member3score'),
        team1member3 = team1member3El.dataset.name,
        team1member3score = team1member3El.options[team1member3El.selectedIndex].value;
    // Member 4
    let team2member1El = document.getElementById('team2member1score'),
        team2member1 = team2member1El.dataset.name,
        team2member1score = team2member1El.options[team2member1El.selectedIndex].value;
    // Member 5
    let team2member2El = document.getElementById('team2member2score'),
        team2member2 = team2member2El.dataset.name,
        team2member2score = team2member2El.options[team2member2El.selectedIndex].value;
    // Member 6
    let team2member3El = document.getElementById('team2member3score'),
        team2member3 = team2member3El.dataset.name,
        team2member3score = team2member3El.options[team2member3El.selectedIndex].value;

    // Calculate total scores
    let team1total = Math.floor(Number(team1member1score) + Number(team1member2score) + Number(team1member3score)),
        team2total = Math.floor(Number(team2member1score) + Number(team2member2score) + Number(team2member3score));

    if (team1total > team2total) {
        // Team 1 won
        x = {
            winner: team1name,
            loser: team2name,
            winscore: team1total.toString(),
            losescore: team2total.toString(),
            winners: [team1member1, team1member2, team1member3],
            losers: [team2member1, team2member2, team2member3],
            winscores: [team1member1score, team1member2score, team1member3score],
            losescores: [team2member1score, team2member2score, team2member3score]
        }
    } else {
        // Team 2 won
        x = {
            winner: team2name,
            loser: team1name,
            winscore: team2total.toString(),
            losescore: team1total.toString(),
            winners: [team2member1, team2member2, team2member3],
            losers: [team1member1, team1member2, team1member3],
            winscores: [team2member1score, team2member2score, team2member3score],
            losescores: [team1member1score, team1member2score, team1member3score]
        }
    }

    redirectURL = `/endmatch?winner=${x.winner}&loser=${x.loser}&winscore=${x.winscore}&losescore=${x.losescore}`;
    redirectURL += `&winner1=${x.winners[0]}&winner2=${x.winners[1]}&winner3=${x.winners[2]}`;
    redirectURL += `&loser1=${x.losers[0]}&loser2=${x.losers[1]}&loser3=${x.losers[2]}`;
    redirectURL += `&winner1score=${x.winscores[0]}&winner2score=${x.winscores[1]}&winner3score=${x.winscores[2]}`;
    redirectURL += `&loser1score=${x.losescores[0]}&loser2score=${x.losescores[1]}&loser3score=${x.losescores[2]}`;

    document.location.href = redirectURL;
});