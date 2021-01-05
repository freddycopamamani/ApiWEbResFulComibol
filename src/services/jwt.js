import jwt from 'jsonwebtoken';
import moment, { unix } from 'moment';
import config from '../config'

export const createAccessToken = (user) => {
    const payload = {
        id: user._id,
        name: user.name,
        lastname: user.lastname,
        email: user.email,
        role: user.role,
        
    };

    return jwt.sign(payload, config.SECRET, {
      expiresIn: 86400
    })
}

export const createRefreshToken = (user) => {
    const payload = {
        id: user._id,
    };

    return jwt.sign(payload, config.SECRET, {
      expiresIn: 86400
    });
};

export const decodedToken = (token) => {
    return jwt.decode(token, config.SECRET, false);
}
