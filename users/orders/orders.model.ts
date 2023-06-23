import * as mongoose from 'mongoose'

const itemsSchema = new mongoose.Schema({
    quantity:{
        type: String,
        required: true
    },
    menuId: {
        type: String,
        required: true
    }
})


export const Orders = mongoose.model<Orders>('Restaurant', orderSchema)