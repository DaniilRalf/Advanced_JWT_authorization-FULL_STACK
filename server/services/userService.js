const { User } = require('../models/user-token');
const bcrypt = require('bcryptjs');
const uuid = require('uuid');

const mailService = require('./mailService');
const tokenService = require('./tokenService');





class UserService{
    async registration(email, password){
        const candidate = User.findOne({where: {email: email}});
        if (candidate){
            // throw new Error('Пользователь с таким эмейлом уже есть');
            console.log('yzhe est')
        }

        const activateLink = await uuid.v4(); //создаем ссылку для активации пользователя
        const passwordHash = await bcrypt.hash(password, 7); //хешируем пароль
        const user = await User.create({email: email, password: passwordHash, activation_link: activateLink}); //создаем пользователя

        const payload = {
            email: user.email,
            id: user.id,
            is_activated: user.is_activated,
        }


        // await mailService.sendActivationMail(email, activateLink);
        const tokens = tokenService.generateTokens(payload);  //ененрируем 2 токена
        await tokenService.saveToken(payload.id, tokens.refreshToken);  //сораняем рефреш токен в БД

        return{
            refreshToken: tokens.refreshToken,
            accessToken: tokens.accessToken,
            user: payload
        }
    }
}

module.exports = new UserService();
