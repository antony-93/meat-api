import * as mongoose from 'mongoose'
import { Restaurant } from '../restaurants/restaurants.model'
import { User } from '../users/users.model'

export interface Review extends mongoose.Document{
    name: String,
    date: Date,
    rating: number,
    comments: true,
    restaurantId: mongoose.Types.ObjectId | Restaurant,
    userId: mongoose.Types.ObjectId | User
}

const reviewSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    date:{
        type: Date,
        required:true
    },
    rating:{
        type: Number,
        required: true
    },
    coments:{
        type: String,
        required: true,
        maxlength: 500
    },
    restaurantId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Restaurant',
        required: true
    },
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
})


export const Review = mongoose.model<Review>('Review', reviewSchema)
