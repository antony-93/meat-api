"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const reviewSchema = new mongoose.Schema({
    date: {
        type: Date,
        required: true
    },
    rating: {
        type: Number,
        required: true
    },
    comments: {
        type: String,
        required: true,
        maxlength: 500
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    restaurant: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Restaurant',
        required: true
    }
});
reviewSchema.statics.findByIdRestaurant = function (restaurant) {
    return this.findOne({ restaurant });
};
reviewSchema.statics.findByIdUser = function (user) {
    return this.findOne({ user });
};
exports.Review = mongoose.model('Review', reviewSchema);
