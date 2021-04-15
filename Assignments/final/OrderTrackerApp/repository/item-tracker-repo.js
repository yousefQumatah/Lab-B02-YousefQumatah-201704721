//Todo 1.2 check the exam PDF for the requirement of this part
import Order from '../model/order.js'
import Item from '../model/item.js'

class OrderTrackerRepo{
    async getOrders(){
        return Order.find();
    }
    async addOrder(order){
        return Order.create(order);
    }
    async deleteOrder(orderType){
        return Order.deleteOne({orderType: orderType});
    }
    async getOrderItems(orderId){
        return Order.find(Item.find({orderId: orderId}))
    }
    async addItem(item){
        return Item.create(item);
    }
    async updateItem(itemId, itemUpdates){
        return Item.findByIdAndUpdate(itemId._id, itemUpdates);
    }
    async deleteItem(itemId){
        return Item.deleteOne({itemId: itemId})
    }
    async getItem(itemId){
        return Item.find({itemId: itemId})
    }
}

export default new OrderTrackerRepo();