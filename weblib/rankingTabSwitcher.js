let teamRankingButton = document.getElementById('team-ranking-tab');
let playerRankingButton = document.getElementById('player-ranking-tab');
let teamRankingList = document.getElementById('team-ranking-ranks');
let playerRankingList = document.getElementById('player-ranking-ranks');

teamRankingButton.addEventListener('click', function() {
    playerRankingButton.classList.remove('active');
    teamRankingButton.classList.add('active');

    teamRankingList.classList.remove('hidden');
    playerRankingList.classList.add('hidden');
});

playerRankingButton.addEventListener('click', function() {
    teamRankingButton.classList.remove('active');
    playerRankingButton.classList.add('active');

    playerRankingList.classList.remove('hidden');
    teamRankingList.classList.add('hidden');
});