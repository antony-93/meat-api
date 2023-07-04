import * as mongoose from 'mongoose'
import { MenuItem } from '../menu/menu.model'

export interface Item extends mongoose.Document {
    quantity: String
    menu:  mongoose.Types.ObjectId | MenuItem
}

export interface Orders extends mongoose.Document {
    address: string,
    user: string,
    number: string,
    optionalAddress: string,
    paymentOptions: string,
    orderItems: Item
}

const ItemSchema = new mongoose.Schema({
    quantity:{
        type: String,
        required: true
    },
    menu:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Menu',
        required: true
    }
})

export const orderSchema = new mongoose.Schema({
    address:{
        type: String,
        required: true
    },
    user:{
        type: String,
        required: true
    },
    number: {
        type: String,
        required: true
    },
    optionalAddress: {
        type: String,
        required: false
    },
    paymentOptions: {
        type: String,
        required: true
    },
    orderItems: {
        type: [ItemSchema],
        required: true
    }
})

export const Orders = mongoose.model<Orders>('Orders', orderSchema)