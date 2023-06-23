import * as mongoose from 'mongoose'

export interface MenuItem extends mongoose.Document{
    name: string,
    price: number
}

export interface Restaurant extends mongoose.Document{
    name: String,
    menu: MenuItem[]
} 

const menuSchema = new mongoose.Schema({
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
    restaurantId:{
        type: String,
        required: false
    }
})

const restSchema = new mongoose.Schema({
    name:{
        type: String,
        unique: true,
        required: true
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
        type: String,
        required: false
    },
    imagePath:{
        type: String,
        required: true
    },
    menu:{
        type: [menuSchema],
        required: true,
        select: false,
        default: []
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