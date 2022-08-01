const jwt = require('jsonwebtoken');
const { Token } = require('../models/user-token');



class TokenService{
    generateTokens(payload){
        const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_KEY, {expiresIn: '30m'});
        const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_KEY, {expiresIn: '30d'});
        return{
            accessToken: accessToken,
            refreshToken: refreshToken
        }
    }


    async saveToken(userId, refreshToken){
        const tokenData = await Token.findOne({where: {userId: userId}})
        if (tokenData){
            tokenData.refreshToken = refreshToken; //если мы нашли у этого юзера токен мы его перезаписываем
            return tokenData.save();
        }
        const token = await Token.create({refresh_token: refreshToken}); //если не наши этоо пользователя с токеном создаем для него новую запись
        return token;
    }
}

module.exports = new TokenService();
