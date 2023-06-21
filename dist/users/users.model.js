"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const validators_1 = require("../common/validators");
const bcrypt = require("bcrypt");
const environment_1 = require("../common/environment");
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        maxlength: 80,
        minlength: 3
    },
    email: {
        type: String,
        unique: true,
        match: /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
        required: true
    },
    password: {
        type: String,
        select: false,
        required: true
    },
    gender: {
        type: String,
        required: false,
        enum: ['Male', 'Female']
    },
    cpf: {
        type: String,
        required: true,
        validate: {
            validator: validators_1.validateCPF,
            message: '{PATH}:Invalid CPF ({VALUE})'
        }
    },
    profiles: {
        type: [String],
        required: false
    }
});
userSchema.statics.findByEmail = function (email, projection) {
    return this.findOne({ email }, projection); //{email: email}
};
userSchema.methods.matches = function (password) {
    /*console.log(bcrypt.compareSync(password, this.password))
    return bcrypt.compareSync(password, this.password)*/
    if (password === this.password) {
        return true;
    }
    else {
        return false;
    }
};
userSchema.methods.hasAny = function (...profiles) {
    return profiles.some(profile => this.profiles.indexOf(profiles) !== -1);
};
const hashPassword = (obj, next) => {
    bcrypt.hash(obj.password, environment_1.environment.security.saltRounds)
        .then(hash => {
        obj.password = hash;
        next();
    }).catch(next);
};
const saveMiddleware = function (next) {
    const user = this;
    if (!user.isModified('password')) {
        next();
    }
    else {
        hashPassword(user, next());
    }
};
const updateMiddleware = function (next) {
    if (!this.getUpdate().password) {
        next();
    }
    else {
        hashPassword(this.update(), next());
    }
};
userSchema.pre('save', saveMiddleware);
userSchema.pre('findOneAndUpdate', updateMiddleware);
userSchema.pre('update', updateMiddleware);
exports.User = mongoose.model('User', userSchema);
