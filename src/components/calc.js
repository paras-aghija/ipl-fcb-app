const calc = (team, stats, prun, pwicket) => {
  const players = team.map(player => Number(player));
  //   console.log(team);
  //   console.log(stats);
  //   console.log(prun);
  //   console.log(pwicket);
  let ans = 0;

  stats.forEach(inning => {
    inning.scorecard.battingStats.forEach(player => {
      if (players.includes(player.playerId)) {
        ans = ans + player.r * prun;
      }
    });
    inning.scorecard.bowlingStats.forEach(player => {
      if (players.includes(player.playerId)) {
        ans = ans + player.w * pwicket;
      }
    });
  });
  return ans;
};

export default calc;
