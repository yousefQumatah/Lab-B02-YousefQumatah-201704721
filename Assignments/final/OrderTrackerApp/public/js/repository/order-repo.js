//Todo 1.6 check the exam PDF for the requirement of this part
//client side repository
const baseUrl = '/api/orders'

export default class OrderRepository {
    async getOrders() {
        let url = '/api/orders';
        const response = await fetch(url);
        return response.json();
    }

    async addOrder(order) {
        return await fetch('/api/orders',
            {
                method: 'POST',
                headers: {'Content-Type': "application/json",},
                body: JSON.stringify(order)
            });
    }

    async deleteOrder(orderType) {
        return await fetch(`/api/orders/?${orderType}`, {method: 'delete'});
    }

    async getOrderItems(orderId) {
        return await fetch(`/api/orders/${orderId}/items`)
    }

    async addItem(orderId, item) {
        return await fetch(`/api/orders/${orderId}/items`,{
            method: 'POST',
            headers: {'Content-Type': "application/json",},
            body: JSON.stringify(item)
        })
    }

    async updateItem(orderId, itemId, itemUpdates) {
        return await fetch(`/api/orders/${orderId}/items/?itemId=${itemId}`,
            {
                method: 'PUT',
                headers: {'Content-Type': "application/json",},
                body: JSON.stringify(itemUpdates)
            });
    }

    async getItem(orderId, itemId) {
        const response = fetch(`/api/orders/${orderId}/items/?itemId=${itemId}`);
        return response.json();
    }

    async deleteItem(orderId,itemId) {
        return await fetch(`/api/orders/${orderId}/items/?itemId=${itemId}`, {method: 'delete'});
    }
}

