import * as mongoose from 'mongoose'
import { Restaurant } from '../restaurants/restaurants.model'

export interface MenuItem extends mongoose.Document{
    name: string,
    price: number
    imagePath: string
    description: string
    restaurant: mongoose.Types.ObjectId | Restaurant
}

export interface MenuModel extends mongoose.Model<MenuItem> {
    findByIdRestaurant(restaurant: mongoose.Types.ObjectId): Promise<MenuItem>
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

menuItemSchema.statics.findByIdRestaurant = function (restaurant: mongoose.Types.ObjectId) {
    return this.findOne({ restaurant })
}

export const Menu = mongoose.model<MenuItem, MenuModel>('Menu', menuItemSchema)