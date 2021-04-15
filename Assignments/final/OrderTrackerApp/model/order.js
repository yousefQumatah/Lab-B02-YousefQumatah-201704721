//Todo 1.1 check the exam PDF for the requirement of this part
//Todo 1.1 check the exam PDF for the requirement of this part
import mongoose from 'mongoose'
const Schema = mongoose.Schema

const orderSchema = new Schema({
    orderId: {
        _id: String
    },
    orderType:{
        type: String,
        enum: ["Internal", "External"],
        required: [true, " please enter a type for order"]
    },
    date:{
        type: Date,
        required:[true, "please enter date"]
    }
})

export default mongoose.model('Order', orderSchema);