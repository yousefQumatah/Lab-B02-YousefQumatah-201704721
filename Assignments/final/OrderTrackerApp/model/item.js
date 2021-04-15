//Todo 1.1 check the exam PDF for the requirement of this part
import mongoose from 'mongoose'
const Schema = mongoose.Schema


const itemSchema = new Schema({
    itemId: {
        _id: String,
    },
    weight:{
        type: Number,
        min: [1, 'cant be lower than 1'],
        max: [3,'can not be higher than 3'],
        required: [true, "please enter a number for weight"]
    },
    itemName:{
        type: String,
        enum: ['Playstation', 'Cellphone',"Book","Computer"],
        required: [true, "Please enter a valid item"]
    },
    orderId:{
      type: Schema.Types.ObjectId,
        ref: 'Order',
        required: [true, "orderId cannot be null"]
    }
})

export default mongoose.model('Item', itemSchema);