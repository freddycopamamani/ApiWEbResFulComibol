import jwt from 'jsonwebtoken';
import moment from 'moment';
import config from '../config';

export const ensureAuth = (req, res, next) => {
  if(!req.headers.authorization) {
    return res.status(403).send({ message: "La peticion no tiene cabecera de peticion"});
  }

  const token = req.headers.authorization.replace(/['"]+/g, "");

  try {
    var payload = jwt.decode(token, config.SECRET);

    if(payload.exp <= moment.unix()){
      return res.status(404).send({message: "El token a expirado."})
    }
  } catch (error) {
    //console.log(error);
    return res.status(404).send({message: "Token invalido."})
  }

  req.user = payload;
  next();
};
