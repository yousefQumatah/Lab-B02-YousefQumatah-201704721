//Todo 1.3 check the exam PDF for the requirement of this part
import OrderTrackerRepo from '../repository/item-tracker-repo.js'
class OrderTrackerService{
    async getOrders(req, res) {
        try {
            const orders = await OrderTrackerRepo.getOrders(req.query)
            res.status(200).json(orders)
        } catch (e) {
            res.status(500).json(e)
        }
    }
    async addOrder(req, res){
        try{
            const order = req.body;
            res.status(201).json(await OrderTrackerRepo.addOrder(order))
        }
        catch(e){
            res.status(500).json(e);
        }
    }

    async deleteOrder(req, res) {
        try {
            res.json(await OrderTrackerRepo.deleteOrder(req.params.orderType))
        } catch (e) {
            res.status(500).json(e)
        }

    }
    async getOrderItems(req, res) {
        try {
            const orderItem = req.params.orderId;
            res.json(await OrderTrackerRepo.getOrderItems(orderItem))
        } catch (e) {
            res.status(500).json(e)
        }
    }
    async addItem(req, res) {
        try {
            const item = req.params.body;
            res.json(await OrderTrackerRepo.addItem(item))
        } catch (e) {
            res.status(500).json(e)
        }
    }
    async updateItem(req, res) {
        try {
            const itemId = req.params.itemId;
            res.json(await OrderTrackerRepo.updateItem(itemId))
        } catch (e) {
            res.status(500).json(e)
        }
    }
    async deleteItem(req, res) {
        try {
            res.json(await OrderTrackerRepo.deleteItem(req.params.itemId))
        } catch (e) {
            res.status(500).json(e)
        }
    }
    async getItem(req, res) {
        try {
            const itemId = req.params.itemId;
            res.json(await OrderTrackerRepo.getItem(itemId))
        } catch (e) {
            res.status(500).json(e)
        }
    }
}

export default new OrderTrackerService()