import fs, { exists } from 'fs';
import path from 'path';
import { query } from 'express';
import User from '../models/User';
import bcrypt, { hash } from 'bcryptjs';

export const getUsers =  (req, res) => {
  User.find().then(users => {
    if(!users) {
      res.status(404).send({message: "No se ha encontrado ningun usuario."});
    } else {
      res.status(200).send({ users });
    }
  })
}


export const getUsersActive = (req, res) => {

  const query = req.query;

  User.find({active: query.active }). then(users => {
    if(!users) {
      res.status(404).send({message: "No se ha encontrado ningun usuario"});
    }
    else {
      res.status(200).send({users})
    }
  });
}

export const getUsuarioById  = async(req, res) => {
  const { id } = req.params;
  const UsuarioById = await User.findById(id)
  res.status(200).json({UsuarioById});
}

export const updateUser = (req, res) => {
  const userData = req.body;
  const params = req.params;

  User.findByIdAndUpdate({_id : params.id}, userData, (err, userUpdate) => {
    if(err) {
      res.status(500).send({ message: "Error del servidor."});
    } else {
      if(!userUpdate) {
        res.status(404).send({message: "No se ha encontrado ningun usuario."});
      } else {
        res.status(200).send({message: "Usuario actualizado correctamente"});
      }
    }
  })
}


export const activateUser = (req, res ) => {
  const { id } = req.params;
  const { active } = req.body;

  User.findByIdAndUpdate(id, { active }, (err, userStored) => {
    if(err) {
      res.status(500).send({message: "Error del servidor"});
    } else {
      if(!userStored) {
        res.status(404).send({message: "No se ha encontrado al uaurio."});
      } else {
        if(active === true) {
          res.status(200).send({message: "Usuario activado correctamente"});
        } else {
          res.status(200).send({message: "Usuario desactivado correctamente."});
        }
      }
    }
  })
}

export const deleteUser = (req, res) => {
  const { id } = req.params;

  User.findByIdAndRemove(id, (err, userDeleted) => {
    if(err) {
      res.status(500).send({message: "Error del servidor"});
    } else {
      if(!userDeleted) {
        res.status(404).send({message:"Usuario no encontrado."})
      } else {
        res.status(200).send({message: "El usuario ha sido eliminado correctamente."});
      }
    }
  })
}

export const crearUserAdmin = async(req, res) => {
  const user = new User();

  const { name, lastname, email, role, password, repeatPassword } = req.body;

  user.name = name;
  user.lastname = lastname;
  user.email = email;
  user.role = role;
  user.active = true;

  if(password!==repeatPassword) {
    res.status(500).send({code: 500, message: "La contraseñas no coinciden"});
  } else {
    const salt = await bcrypt.genSalt(10)
    bcrypt.hash(password, salt, (err, hash) => {
      if(err) {
        res.status(500).send({code: 500, message: "Error al encriptar la contraseña."});
      }else {
        user.password = hash;

        user.save((err, userStored) => {
          if(err) {
            res.status(500).send({ code: 500, message: "El usuario ya existe."});
          } else {
            if(!userStored) {
              res.status(500).send({ code: 500, message: "Error al crear el nuevo usuario."});
            } else {
              //res.status(200).send({ user: userStored})
              res.status(200).send({ code: 200, message: "Usuario creado correctamente"});
            }
          }
        })
      }
    })
  }
}


export const uploadAvatar = (req, res) => {
  const params = req.params;
  
  User.findById({ _id: params.id }, (err, userData) => {
    if(err) {
      res.status(500).send({ message: "Error del servidor." });
    } else {
      if(!userData){
        res.status(404).send({ message: "No se ha encontrado ningun usuario." });
      } else {
        let user = userData
        
        if(req.files) {
          let filePath =req.files.avatar.path
          let fileSplit = filePath.split("\\");
          let fileName = fileSplit[3];

          let extSplit = fileName.split(".");
          let fileExt = extSplit[1];

          if(fileExt !== "png" && fileExt !== "jpg") {
            res.status(400).send({ message: "La extension de la imagen no es valida. (Extensiones permitidas: .png y .jpg)"});
          } else {
            user.avatar = fileName;
            User.findByIdAndUpdate(
              {_id: params.id},
              user,
              (err, userResult) => {
                if(err) {
                  res.status(500).send({ message:"Error del servidor."});
                } else{
                  if(!userResult) {
                    res.status(404).send({ message: "No se ha encontrado ningun usuario."});
                  } else {
                    res.status(200).send({user: userResult});
                  }
                }
              }
            )
          }
        }
      }
    }
  })
}

export const getAvatar = (req, res) => {
  const avatarName = req.params.avatarName;
  const filePath = "./src/uploads/avatar/" + avatarName;
 
  fs.exists(filePath, exists => {
    if(!exists) {
      res.status(404).send({ message: "El avatar que buscas no existe."});
    } else {
      res.sendFile(path.resolve(filePath));
    }
  })
}
 