import User from '../models/User'
import {createAccessToken, createRefreshToken} from '../services/jwt';
import bcrypt from 'bcryptjs';

export const signUp = async (req, res) => {
  const user = new User();

  const { name, lastname, email, password, repeatPassword } = req.body;
  user.name = name;
  user.lastname = lastname;
  user.email = email;
  user.role = "admin";
  user.active = false;

  if (!password || !repeatPassword) {
    res.status(404).send({ message: "Las contraseñas son obligatorias." });
  } else {
    if (password !== repeatPassword) {
      res.status(404).send({ message: "Las contraseñas no son iguales." });
    } else {
      const salt = await bcrypt.genSalt(10)
      bcrypt.hash(password, salt, function(err, hash) {
        if (err) {
          res
            .status(500)
            .send({ message: "Error al encriptar la contraseña." });
        } else {
          user.password = hash;

          user.save((err, userStored) => {
            if (err) {
              res.status(500).send({ message: "El usuario ya existe." });
            } else {
              if (!userStored) {
                res.status(404).send({ message: "Error al crear el usuario." });
              } else {
                res.status(200).send({ user: userStored });
              }
            }
          });
        }
      });
    }
  }
} 


export const signIn = (req, res) => {
    const {email, password} = req.body;
    User.findOne({email}, (err, userStored) => {
        if(err) {
            res.status(500).send({message: "Error del servidor."});
        } else {
            if(!userStored){
                res.status(404).send({message: "No existe el correo electronico"})
            } else {
                bcrypt.compare(password, userStored.password, (err, check) =>{
                    if(err){
                        res.status(500).send({message: "Error del servidor."})
                    } else if(!check) {
                      res.status(404).send({message: "Email o contraseña invalido."})
                    }else {
                        if(!userStored.active){
                            res.status(200).send({code: 200, message: "el usuario no esta activado"})
                        } else {
                          res.status(200).send({
                            accessToken: createAccessToken(userStored),
                            refreshToken: createRefreshToken(userStored)
                          })
                        }
                    }
                })
            }
        }
    })
}

/* const signUp = async(req, res) => {
  const {name, lastname, username, email, password, roles} = req.body;

  const newUser = new User({
      name,
      lastname,
      username,
      email,
      password: await User.encryptPassword(password)
      
  })

  if(roles){
      const foundRoles = await Role.find({name: {$in: roles}})
      newUser.roles = foundRoles.map(role => role._id)
  } else {
      const role = await Role.findOne({name: "user"})
      newUser.roles = [role._id];
  }

  const savedUser = await newUser.save(); 
  //console.log(savedUser)
  const token = jwt.sign({id: savedUser._id}, config.SECRET, {
      expiresIn: 86400 //24 horas
  })

  res.status(200).json({token})
}


export const signin = async(req, res) => {
    const userFound = await User.findOne({email: req.body.email}).populate("roles");

    if(!userFound) return res.status(400).json({message: "Usuario no encontrado"})

    const matchPassword = await User.comparePassword(req.body.password, userFound.password)

    if(!matchPassword) return res.status(401).json({token: null, message:'Contraseña invalido'})
    const token =jwt.sign({id: userFound._id}, config.SECRET, {
        expiresIn: 86400
    });

    res.json({token})
};*/
