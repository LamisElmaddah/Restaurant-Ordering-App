import {menuArray} from './data.js'
const orderArray = []

document.addEventListener('click', function(e){
    if(e.target.dataset.add){
        addItem(e.target.dataset.add)
    }else if(e.target.dataset.remove){
        handelRemoveBtn(e.target.dataset.remove)
    }else if(e.target.id === 'complete-btn'){
        renderPaymentModal()
    }
})
document.querySelector('.payment-form').addEventListener('submit', function(e){
    e.preventDefault()
    renderCompleteState()
})

function renderPaymentModal(){
    if(orderArray.length > 0){
        document.getElementById('payment-modal').style.display = 'block'
    }
}
function renderCompleteState(){
    document.getElementById('payment-modal').style.display = 'none'
    document.getElementById('your-order').style.display = 'none'
    const userName = document.getElementById('user-name').value
    document.getElementById('complete-state').innerHTML = `<h3 class="message">Thanks, ${userName}! Your order is on its way!</h3>`
    orderArray.length = 0
}

function handelRemoveBtn(itemId){
    const targetItem = orderArray.findIndex(function(item){
        return item.id === Number(itemId)
    })
    orderArray.splice(targetItem, 1)
    render()
}
function addItem(itemId){
    const targetItem = menuArray.find(function(item){
        return item.id === Number(itemId)
    })
    orderArray.push(targetItem)
    render()
}

function getOrderHtml(){
    const totalPrice = orderArray.reduce((total, item) => {
        return total + item.price
    },0)
    const orderHtml = orderArray.map(function(item){
        return `<div class="item">
        <p>${item.name}</p>
        <button class="remove" data-remove="${item.id}">remove</button>
        <p class="order-price">$${item.price}</p>
        </div>`
    }).join('')

    let yourOrder = `<div class="your-order" id="your-order">
            <h3>Your order</h3>
            ${orderHtml}
            <div class="total">
                <p>Total price:</p>
                <p>$${totalPrice}</p>
            </div>
            <button class="submit" id="complete-btn">Complete order</button>
        </div>`
    return yourOrder
    }
    

function getMenuHtml(){

    const menuHtml = menuArray.map(function(item){
        return  `<div class="menu-items">
            <div class="item-emoji">${item.emoji}</div>
            <div class="item-details">
                <h3 class="item-name">${item.name}</h3>
                <p class="item-ingredients">${item.ingredients}</p>
                <p class="item-price">$${item.price}</p>
            </div>
            <button class="add-btn" data-add="${item.id}">+</button>
        </div>`
    }).join('')
    return menuHtml
}
function render(){
    document.getElementById('container-menu').innerHTML = getMenuHtml()
    document.getElementById('container-order').innerHTML = getOrderHtml()
}

render()