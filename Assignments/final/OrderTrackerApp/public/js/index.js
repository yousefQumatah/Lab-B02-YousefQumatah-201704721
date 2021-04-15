import OrderRepo from './repository/order-repo.js'
//we need to do this because we are using module
window.onload = async () => {
    window.deleteOrder = deleteOrder
    window.loadItemEditorForm = loadItemEditorForm
    window.displayOrders = displayOrders
    window.deleteItem = deleteItem

    await displayOrders()
}

const ordersElement = document.querySelector('#orders')
const mainContent = document.querySelector('#main-content')
const newOrderBtn = document.querySelector('#new-order-btn')
const deleteOrdersBtn = document.querySelector('#delete-orders-btn')

deleteOrdersBtn.addEventListener('click', deleteOrder)


//database
const orderRepo = new OrderRepo()

newOrderBtn.addEventListener('click', loadOrderEditorForm)

async function displayOrders() {
    const orders = await orderRepo.getOrders()
    for (const order of orders) {
        order.items = await orderRepo.getOrderItems(order._id)
    }
    console.log(orders)
    const ordersHTML = orders.map(order => `
        <div class="split">
        <div class="order-desc">
            <h1>Order No - ${order._id.split('').reverse().join('').match(/.{1,3}/g).map(function (x) {
        return x.split('').reverse().join('').split(',').join('')
    }).reverse().join('-')} </h1>
            <hr width="100%">
            <h2>Date   : ${order.date}</h2>
            <h2>Item Type  : ${order.orderType}</h2>
<!--            <button class="btn btn&#45;&#45;delete" onclick="deleteOrder('${order._id}')">Cancel Order</button>-->
        </div>
         <div id="item-cards" class="cards">
             ${order.items.map(item => itemToHTMLCard(item, order._id))}
        </div>
        </div>
        </div>
        <button id="add-item" class="btn btn--add" onclick="loadItemEditorForm('${order._id}')"> + Add item</button>
        <hr>`).join('')
    ordersElement.innerHTML = ordersHTML
}

function itemToHTMLCard(item, orderId) {
    console.log(item.itemName)
    return `<li class="cards__item">
        <div class="card">
            <img class="card__image" src="images/${item.itemName}.jpeg" alt="">
            <div class="card__content">
                <div class="card__title">${item.itemName} - Weight ${item.weight}</div>
           
                <div class="btn--options">
                    <button class="btn btn--update" onclick="loadItemEditorForm('${orderId}','${item._id}')">Update</button>
                    <button class="btn btn--delete" onclick="deleteItem('${orderId}','${item._id}')">Remove</button>
                </div>
            </div>
        </div>
    </li>`
}

async function loadPage(pageName) {
    const pageContent = await fetch(`partial-views/${pageName}`)
    mainContent.innerHTML = await pageContent.text()
}

async function loadOrderEditorForm() {
    await loadPage('order-editor.html')
    const form = document.querySelector('#order-editor-form')
    form.addEventListener('submit', async (event) => {
        event.preventDefault();
        const form = event.target
        if (!form.checkValidity()) return

        const order = form2Object(form)
        console.log(order)
        const message = await orderRepo.addOrder(order)
        window.location.href = 'index.html'
    })
}

async function loadItemEditorForm(orderId, itemId) {

    await loadPage('item-editor.html')
    const form = document.querySelector('#item-editor-form')
    document.querySelector('#order-id').innerHTML = `Order Id-${orderId}`

    if (itemId) {
        //we are editing a item info,
        const item = await orderRepo.getItem(orderId,itemId)

        document.querySelector('#page-title').innerText = "Update item"
        document.querySelector('#weight').value = item.weight
        document.querySelector('#itemName').value = item.itemName
    }

    //when they submit the item we send the order id and item id
    //to tell the saveitem method, whether it is edit or add new
    form.onsubmit = (event) => saveItem(event, orderId, itemId)
}

async function saveItem(event, orderId, itemId) {

    event.preventDefault();
    const form = event.target

    if (!form.checkValidity()) return

    console.log("order id ", orderId, "item id", itemId)
    const itemUpdates = form2Object(form)


    if (itemId) {
        await orderRepo.updateItem(orderId, itemId, itemUpdates)
    } else
        await orderRepo.addItem(orderId, itemUpdates)
    await displayOrders()
    window.location.href = 'index.html'
}

async function deleteOrder(orderId) {
    const orderType = document.querySelector('#orderType')
    if (confirm(`Are you sure you want to delete all the orders of type ${orderType.value}`)) {
        const message = await orderRepo.deleteOrder(orderType.value)
        await displayOrders()
    }
}

async function deleteItem(orderId, itemId) {
    if (confirm(`Are you sure you want to remove the item from the order ${orderId}?`)) {
        await orderRepo.deleteItem(orderId,itemId)
        await displayOrders()
    }
}

function form2Object(form) {
    const formData = new FormData(form)
    const data = {}
    for (const [key, value] of formData)
        data[key] = value

    return data
}


