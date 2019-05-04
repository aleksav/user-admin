
import crypto from 'crypto'
import bcrypt from 'bcrypt'
import randtoken from 'rand-token'
import mongoose, { Schema } from 'mongoose'
import mongooseKeywords from 'mongoose-keywords'
import { env } from '../../config'







export const roles = ['admin','manager','user']

const userSchema = new Schema(
  {
      
    email: {
      type: String,
      match: /^\S+@\S+\.\S+$/,
      trim: true,
      lowercase: true,
      unique: true
    }
,
    name: {
      type: String,
      
    }
,
        roles: [{
          type: String, 
          enum: ['admin','manager','user']
        }]
    ,
    username: {
      type: String,
      
    }
,
    password: {
      type: String,
      
    }
,
    verified: {
      type: String,
      
    }

  }, {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: (obj, ret) => { delete ret._id }
    }
  }
)

userSchema.plugin(mongooseKeywords, { paths: [ '_id', 'email', 'name', 'roles', 'username', 'password', 'verified'] })

userSchema.pre('save', function (next) {
  if (!this.isModified('password'))
    return next()

  const rounds = env === 'test' ? 1 : 9

  bcrypt.hash(this.password, rounds).then((hash) => {
    this.password = hash
    next()
  }).catch(next)
})

userSchema.methods = {
  authenticate(password) {
    return bcrypt.compare(password, this.password)
      .then((valid) => valid ? this : false)
  }
}

export const user_model = mongoose.model('user', userSchema)

export const schema = user_model.schema
