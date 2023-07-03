import * as mongoose from 'mongoose'

export interface Restaurant extends mongoose.Document{
    name: String,
    category: String,
    deliveryEstimate: String,
    rating: Number,
    imagePath: String,
    about: String,
    hours: String
} 

const restSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        unique: true
    },
    category:{
        type: String,
        required: true
    },
    deliveryEstimate:{
        type: String,
        required: true
    },
    rating:{
        type: Number,
        required: false
    },
    imagePath:{
        type: String,
        required: true
    },
    about:{
        type: String,
        required: true   
    },
    hours:{
        type: String,
        required: true
    }
})

export const Restaurant = mongoose.model<Restaurant>('Restaurant', restSchema)