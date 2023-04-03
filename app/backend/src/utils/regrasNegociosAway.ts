import { ILeaderboard } from '../interfaces/ILeaderboard';
import { IMatches } from '../interfaces/IMatches';

const totalAwayPoints = (matches: IMatches[]) => matches.reduce((acc: number, curr: IMatches) => {
  if (curr.homeTeamGoals < curr.awayTeamGoals) {
    return acc + 3;
  }
  if (curr.homeTeamGoals === curr.awayTeamGoals) {
    return acc + 1;
  }
  return acc;
}, 0);

const totalAwayVictories = (matches: IMatches[]) => matches
  .reduce((acc: number, curr: IMatches) => {
    if (curr.homeTeamGoals < curr.awayTeamGoals) {
      return acc + 1;
    } return acc;
  }, 0);

const totalAwayDrawns = (matches: IMatches[]) => matches.reduce((acc: number, curr: IMatches) => {
  if (curr.homeTeamGoals === curr.awayTeamGoals) {
    return acc + 1;
  } return acc;
}, 0);

const totalAwayLosses = (matches: IMatches[]) => matches.reduce((acc: number, curr: IMatches) => {
  if (curr.homeTeamGoals > curr.awayTeamGoals) {
    return acc + 1;
  } return acc;
}, 0);

export const awayTeams = (matches: IMatches[]) => {
  let goalsHome = 0;
  let goalsAway = 0;
  const arrTeams = matches.map((match) => {
    const points = {
      name: match.awayTeam.teamName,
      totalPoints: totalAwayPoints(matches),
      totalGames: matches.length,
      totalVictories: totalAwayVictories(matches),
      totalDraws: totalAwayDrawns(matches),
      totalLosses: totalAwayLosses(matches),
      goalsFavor: goalsAway += match.awayTeamGoals,
      goalsOwn: goalsHome += match.homeTeamGoals,
      goalsBalance: goalsAway - goalsHome,
      efficiency: (((totalAwayPoints(matches)) / (matches.length * 3)) * 100)
        .toFixed(2) };
    return points;
  });
  return arrTeams;
};

export const awayResult = (array: IMatches[]) => {
  let awayTeam: ILeaderboard[] = [];
  for (let i = 1; i <= 16; i += 1) {
    const match = array.filter((team) => team.awayTeamId === i);
    const result = awayTeams(match);
    // console.log(result);
    awayTeam = [...awayTeam, result[result.length - 1]];
  }
  return awayTeam;
};

export const awaySort = (array: ILeaderboard[]) => array.sort((b, a) => {
  if (a.totalPoints === b.totalPoints) {
    if (a.goalsBalance === b.goalsBalance) {
      return a.goalsFavor - b.goalsFavor;
    }
    return a.goalsBalance - b.goalsBalance;
  }
  return a.totalPoints - b.totalPoints;
});
