const sequilize = require('../db')
const {DataTypes} = require('sequelize')

const User = sequilize.define('user', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    nickname: {type: DataTypes.STRING, unique: true},
    password: {type: DataTypes.STRING},
    role: {type: DataTypes.STRING, defaultValue: "USER"},
    tournaments_played: {type: DataTypes.INTEGER, defaultValue: 0},
    total_wins: {type: DataTypes.INTEGER, defaultValue: 0},
})

const TournamentList = sequilize.define('tournament_list', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true},
    description: {type: DataTypes.STRING, defaultValue: "standart tournament"},
    published: {type: DataTypes.BOOLEAN, defaultValue: true},
    open: {type: DataTypes.BOOLEAN, defaultValue: true},
    size: {type: DataTypes.INTEGER},
    registeredUsers: {type: DataTypes.ARRAY(DataTypes.INTEGER)},
    date: {type: DataTypes.DATE},
    startTime: {type: DataTypes.TIME},
    endTime: {type: DataTypes.TIME},
    status: {type: DataTypes.STRING, defaultValue: "Upcoming"},
    winner: {type: DataTypes.STRING, defaultValue: "waiting for winner"}
})

TournamentList.hasMany(User)
User.belongsTo(TournamentList)

module.exports = {
    User,
    TournamentList
}