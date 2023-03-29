import { BOOLEAN, INTEGER, Model, STRING } from 'sequelize';
import db from '.';
import Teams from './TeamsModel';
// import OtherModel from './OtherModel';

class Matches extends Model {
  declare id: number;
  declare homeTeamId: number;
  declare homeTeamGoals: number;
  declare awayTeamId: number;
  declare awayTeamGoals: number;
  declare inProgress: boolean;
}

Matches.init({
  id: {
    type: INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  homeTeamId: {
    allowNull: false,
    type: STRING,
    field: 'home_team_id',
  },
  homeTeamGoals: {
    allowNull: false,
    type: STRING,
    field: 'home_team_goals',
  },
  awayTeamId: {
    allowNull: false,
    type: STRING,
    field: 'away_team_id',
  },
  awayTeamGoals: {
    allowNull: false,
    type: STRING,
    field: 'away_team_goals',
  },
  inProgress: {
    allowNull: false,
    type: BOOLEAN,
    field: 'in_progress',
  },
}, {
  // ... Outras configs
  underscored: true,
  sequelize: db,
  tableName: 'matches',
  timestamps: false,
});

/**
  * `Workaround` para aplicar as associations em TS:
  * Associations 1:N devem ficar em uma das instâncias de modelo
  * */

Matches.belongsTo(Teams, { foreignKey: 'homeTeamId', as: 'homeTeamId' });
Matches.belongsTo(Teams, { foreignKey: 'homeTeamId', as: 'homeTeamId' });

export default Matches;
