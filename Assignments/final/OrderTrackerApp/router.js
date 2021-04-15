//Todo 1.4 check the exam PDF for the requirement of this part

import express from 'express'
import orderService from './sevice/item-tracker-service.js'
const router = express.Router();

router.route('/orders')
    .get(orderService.getOrders)
    .post(orderService.addOrder)
router.route('/orders/?orderType=')
    .delete(orderService.deleteOrder)
router.route('/orders/:orderId/items')
    .get(orderService.getOrderItems)
    .post(orderService.addItem)
router.route('/orders/:orderId/items/?itemId')
    .put(orderService.updateItem)
router.route('/orders/:orderId/items/?itemId=')
    .delete(orderService.deleteItem)
    .get(orderService.getItem)



export default router
