import * as mongoose from 'mongoose'

export interface Item extends mongoose.Document {
    quantity: String,
    menuId: String
}

export interface Orders extends mongoose.Document {
    name: string
    address: string,
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
    menuId: {
        type: String,
        required: true
    }
})

export const orderSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    address:{
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