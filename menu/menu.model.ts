import * as mongoose from 'mongoose'
import { Restaurant } from '../restaurants/restaurants.model'

export interface MenuItem extends mongoose.Document{
    name: string,
    price: number
    imagePath: string
    description: string
    restaurant: mongoose.Types.ObjectId | Restaurant
}

export const menuItemSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    price:{
        type: Number,
        required: true
    },
    imagePath:{
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    restaurant:{
        type: mongoose.Schema.Types.ObjectId,
        required: true
    }
})


export const Menu = mongoose.model<MenuItem>('Menu', menuItemSchema)