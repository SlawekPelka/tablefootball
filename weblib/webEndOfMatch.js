document.getElementById('startmatch').addEventListener('click', function(e) {
    e.preventDefault();
    let team1 = document.getElementById('team1');
    let team2 = document.getElementById('team2');
    if (team1.options[team1.selectedIndex].value == team2.options[team2.selectedIndex].value) return;
    if (team2.options[team2.selectedIndex].value == team1.options[team1.selectedIndex].value) return;

    document.getElementById('selectphase').classList.add('hidden');
    document.getElementById('actualmatch').classList.remove('hidden');

    document.getElementById('team1name').innerHTML = team1.options[team1.selectedIndex].value;
    document.getElementById('team2name').innerHTML = team2.options[team2.selectedIndex].value;
});

document.getElementById('endmatch').addEventListener('click', function(e) {
    e.preventDefault();
    // Member 1
    let team1member1 = document.getElementById('team1member1score'),
        team1member1score = team1member1.options[team1member1.selectedIndex].value;
    // Member 2
    let team1member2 = document.getElementById('team1member2score'),
        team1member2score = team1member2.options[team1member2.selectedIndex].value;
    // Member 3
    let team1member3 = document.getElementById('team1member3score'),
        team1member3score = team1member3.options[team1member3.selectedIndex].value;
    // Member 4
    let team2member1 = document.getElementById('team2member1score'),
        team2member1score = team2member1.options[team2member1.selectedIndex].value;
    // Member 5
    let team2member2 = document.getElementById('team2member2score'),
        team2member2score = team2member2.options[team2member2.selectedIndex].value;
    // Member 6
    let team2member3 = document.getElementById('team2member3score'),
        team2member3score = team2member3.options[team2member3.selectedIndex].value;

    let team1totalscore = Math.floor(Number(team1member1score) + Number(team1member2score) + Number(team1member3score));
    let team2totalscore = Math.floor(Number(team2member1score) + Number(team2member2score) + Number(team2member3score));

    if (team1totalscore > 10) return;
    if (team2totalscore > 10) return;

    let team1name = document.getElementById('team1name').innerHTML;
    let team2name = document.getElementById('team2name').innerHTML;

    let redirectURL = '';

    if (team1totalscore > team2totalscore) {
        redirectURL = `/endmatch?winner=${team1name}&loser=${team2name}&winscore=${team1totalscore}&losescore=${team2totalscore}&member1score=${team1member1score}&member2score=${team1member2score}&member3score=${team1member3score}&member4score=${team2member1score}&member5score=${team2member2score}&member6score=${team2member3score}`;
    } else {
        redirectURL = `/endmatch?winner=${team2name}&loser=${team1name}&winscore=${team2totalscore}&losescore=${team1totalscore}&member1score=${team1member1score}&member2score=${team1member2score}&member3score=${team1member3score}&member4score=${team2member1score}&member5score=${team2member2score}&member6score=${team2member3score}`;
    }

    document.location.href = redirectURL;
});