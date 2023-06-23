"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const menuSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    imagePath: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    restaurantId: {
        type: String,
        required: false
    }
});
const restSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: true
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
        type: String,
        required: false
    },
    imagePath: {
        type: String,
        required: true
    },
    menu: {
        type: [menuSchema],
        required: true,
        select: false,
        default: []
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
