import { decodedToken, createAccessToken } from '../services/jwt';
import moment from 'moment'
import User from '../models/User';


const willExpireToken = (token) => {
  const { exp } = decodedToken(token);
  const currentDate = moment().unix();


  if(currentDate > exp ) {
    return true;
  }

  return false;
}

const refreshAccessToken = (req, res) => {
  const { refreshToken } = req.body;
  const isTokenExpired = willExpireToken(refreshToken);

  if(isTokenExpired) {
    res.status(404).send({ message: "El refreshToken ha Expirado"});
  } else {
    const { id } = decodedToken(refreshToken);

    User.findOne({_id : id}, (err, userStored) => {
      if(err) {
        res.status(500).send({ message: "Error el servidor"});
      } else {
        if(!userStored) {
          res.status(404).send({ message: "Usuario no encontrado"});
        } else {
          res.status(200).send({
            accessToken: createAccessToken(userStored),
            refreshToken: refreshToken
          })
        }
      }
    })
  }
}

export default {
  refreshAccessToken
}
