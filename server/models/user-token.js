const {DataTypes} = require('sequelize'); //импортим типы данных из секвалайза
const sequelize = require('../db') //мпотрим настройки БД
// ----------IMPORTS----------------------------


    const User = sequelize.define("user", {
        id: {type: DataTypes.INTEGER, primaryKey: true, unique: true, autoIncrement:true},
        email: { type: DataTypes.STRING, defaultValue: null, allowNull: false },
        password: { type: DataTypes.STRING, allowNull: false },
        is_activated: { type: DataTypes.STRING, defaultValue: false },
        activation_link: { type: DataTypes.STRING, defaultValue: null },
    });

    const Token = sequelize.define("token", {
        id: {type: DataTypes.INTEGER, primaryKey: true, unique: true, autoIncrement:true},
        refresh_token: { type: DataTypes.STRING, allowNull: false },
    });


    User.hasOne(Token);
    Token.belongsTo(User);

 
module.exports = { User, Token };