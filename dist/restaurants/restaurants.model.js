"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const restSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    category: {
        type: String,
        required: true
    },
    deliveryEstimate: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: false
    },
    imagePath: {
        type: String,
        required: true
    },
    about: {
        type: String,
        required: true
    },
    hours: {
        type: String,
        required: true
    }
});
exports.Restaurant = mongoose.model('Restaurant', restSchema);
