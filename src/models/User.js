import { Schema, model } from 'mongoose';
import bcrypt from 'bcryptjs';


const userSchema = new Schema({
    name: { type: String},
    lastname: {type: String},
    email: {type: String, unique:true},
    password: {type: String, required:true},
    role: String,
    active: Boolean
},
{
    timestamps:true,
    versionKey: false
});

/*userSchema.statics.encryptPassword  = async (password) => {
    const salt = await bcrypt.genSalt(10)
    return await bcrypt.hash(password, salt)
}*/


export default model("User", userSchema);
