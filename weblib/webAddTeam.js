document.getElementById('submitTeam').addEventListener('click', function(e) {
    e.preventDefault();

    let teamname = document.getElementById('teamname').value;
    if (teamname === '') return;

    let member1 = document.getElementById('member1').value;
    if (member1 === '') member1 = '';

    let member2 = document.getElementById('member2').value;
    if (member2 === '') member2 = '';

    let member3 = document.getElementById('member3').value;
    if (member3 === '') member3 = '';

    document.location.href = `/submitteam?teamname=${teamname}&member1=${member1}&member2=${member2}&member3=${member3}`;
});