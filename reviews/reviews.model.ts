import * as mongoose from 'mongoose'
import { Restaurant } from '../restaurants/restaurants.model'
import { User } from '../users/users.model'

export interface Review extends mongoose.Document{
    date: Date,
    rating: number,
    comments: true,
    user: mongoose.Types.ObjectId | User
    restaurant: mongoose.Types.ObjectId | Restaurant
}

export interface ReviewModel extends mongoose.Model<Review> {
    findByIdUser(user: mongoose.Types.ObjectId): Promise<Review>
    findByIdRestaurant(restaurant: mongoose.Types.ObjectId): Promise<Review>
}

const reviewSchema = new mongoose.Schema({
    date:{
        type: Date,
        required:true
    },
    rating:{
        type: Number,
        required: true
    },
    comments:{
        type: String,
        required: true,
        maxlength: 500
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    restaurant:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Restaurant',
        required: true
    }
})

reviewSchema.statics.findByIdRestaurant = function (restaurant: mongoose.Types.ObjectId) {
    return this.findOne({ restaurant })
}

reviewSchema.statics.findByIdUser = function (user: mongoose.Types.ObjectId) {
    return this.findOne({ user })
}

export const Review = mongoose.model<Review, ReviewModel>('Review', reviewSchema)