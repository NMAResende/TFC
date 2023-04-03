import { ILeaderboard } from '../interfaces/ILeaderboard';
import { IMatches } from '../interfaces/IMatches';

const totalHomePoints = (matches: IMatches[]) => matches.reduce((acc: number, curr: IMatches) => {
  if (curr.homeTeamGoals > curr.awayTeamGoals) {
    return acc + 3;
  }
  if (curr.homeTeamGoals === curr.awayTeamGoals) {
    return acc + 1;
  }
  return acc;
}, 0);

const totalHomeVictories = (matches: IMatches[]) => matches
  .reduce((acc: number, curr: IMatches) => {
    if (curr.homeTeamGoals > curr.awayTeamGoals) {
      return acc + 1;
    } return acc;
  }, 0);

const totalHomeDrawns = (matches: IMatches[]) => matches.reduce((acc: number, curr: IMatches) => {
  if (curr.homeTeamGoals === curr.awayTeamGoals) {
    return acc + 1;
  } return acc;
}, 0);

const totalHomeLosses = (matches: IMatches[]) => matches.reduce((acc: number, curr: IMatches) => {
  if (curr.homeTeamGoals < curr.awayTeamGoals) {
    return acc + 1;
  } return acc;
}, 0);

export const homeTeams = (matches: IMatches[]) => {
  let goalsHome = 0;
  let goalsAway = 0;
  const arrTeams = matches.map((match) => {
    const points = {
      name: match.homeTeam.teamName,
      totalPoints: totalHomePoints(matches),
      totalGames: matches.length,
      totalVictories: totalHomeVictories(matches),
      totalDraws: totalHomeDrawns(matches),
      totalLosses: totalHomeLosses(matches),
      goalsFavor: goalsHome += match.homeTeamGoals,
      goalsOwn: goalsAway += match.awayTeamGoals,
      goalsBalance: goalsHome - goalsAway,
      efficiency: (((totalHomePoints(matches)) / (matches.length * 3)) * 100)
        .toFixed(2) };
    return points;
  });
  return arrTeams;
};

export const homeResult = (array: IMatches[]) => {
  let homeTeam: ILeaderboard[] = [];
  for (let i = 1; i <= 16; i += 1) {
    const match = array.filter((team) => team.homeTeamId === i);
    const result = homeTeams(match);
    // console.log(result);
    homeTeam = [...homeTeam, result[result.length - 1]];
  }
  return homeTeam;
};

export const homeSort = (array: ILeaderboard[]) => array.sort((b, a) => {
  if (a.totalPoints === b.totalPoints) {
    if (a.goalsBalance === b.goalsBalance) {
      return a.goalsFavor - b.goalsFavor;
    }
    return a.goalsBalance - b.goalsBalance;
  }
  return a.totalPoints - b.totalPoints;
});
