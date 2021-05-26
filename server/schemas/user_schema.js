const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const Schema = mongoose.Schema

const UserSchema = new Schema({
    username: { type: String, require, trim: true },
    email: { type: String, require, trim: true, unique: true },
    password: { type: String, require },
    avatar: {type: String, default: ''},
    profilePicture: {type: String, default: ''}
}, { timestamps: true })

UserSchema.pre(
    'save',
    async function(next){
        console.log(this.password)
        const hash = await bcrypt.hash(this.password, 10)
        this.password = hash
        next()
    }
)

UserSchema.methods.isValidPassword = async function(password) {
    const user = this
    const compare = await bcrypt.compare(password, user.password)
    console.log(compare)
    return compare
  }

const User = mongoose.model('User', UserSchema)
module.exports = User