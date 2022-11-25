import { menuArray } from "./data.js"

const totalPriceEl = document.getElementById('total-price-el')
const mainEl = document.getElementById('main-el')
const orderEl = document.getElementById('order-el')
const completeOrderEl = document.getElementById('complete-order-el')
const totalEl = document.getElementById('total-el')
const modal = document.getElementById('modal')
const modalCloseBtn = document.getElementById('modal-close-btn')
const name = document.getElementById('name')
const cardNumber = document.getElementById('card-number')
const cvv = document.getElementById('cvv')
let orderArray = []
let totalPrice = 0

orderEl.classList.add('hidden')
completeOrderEl.classList.add('hidden')
totalEl.classList.add('hidden')
totalPriceEl.classList.add('hidden')

document.addEventListener('click', function(e){
    if (e.target.dataset.id) {
        handleAddClick(e.target.dataset.id)
    }
    else if (e.target.dataset.remove) {
        handleRemoveClick(e.target.dataset.remove)
    }
    else if (e.target.id === 'complete-order-btn') {
        completeOrder()
    } 
    else if (e.target.id === 'submit-btn') {
        submitOrder()
    }
})

modalCloseBtn.addEventListener('click', function() {
    modal.style.display = "none"
})

function handleAddClick(itemId) {
    let targetObject = menuArray.filter(function(item) {
        return itemId == item.id
    })[0]
    
    if (!orderArray.includes(targetObject)) {
        orderArray.push(targetObject)
        targetObject.quantity = 1
    }
    else {
        targetObject.quantity++
    }
    
    totalPrice += targetObject.price
    totalPriceEl.textContent = `${totalPrice}`
    
    if (orderArray.length > 0) {
        orderEl.classList.remove('hidden')
        totalEl.classList.remove('hidden')
    }
    
    orderEl.classList.remove('hidden')
    totalEl.classList.remove('hidden')
    completeOrderEl.classList.remove('hidden')
    totalPriceEl.classList.remove('hidden')
    
    render()
}

function handleRemoveClick(item) {
    let targetObject = orderArray.filter(function(removeItem) {
        return item == removeItem.id
    })[0]
    
    if (targetObject.quantity > 1) {
        targetObject.quantity--
    }
    else {
        let itemIndex = orderArray.indexOf(targetObject)
        orderArray.splice(itemIndex, 1)
    }
    
    totalPrice -= targetObject.price
    totalPriceEl.textContent = `${totalPrice}`
    
    if (orderArray.length < 1) {
        completeOrderEl.classList.add('hidden')
        orderEl.classList.add('hidden')
        totalEl.classList.add('hidden')
        totalPriceEl.classList.add('hidden')
    }
    
    render()
}

function completeOrder() {
    modal.style.display = 'block'
}

function submitOrder() {
    if (name.value && cardNumber.value && cvv.value) {
        modal.style.display = "none"
        document.getElementById('total-order').innerHTML = `<h3>Thank you, ${name.value}, for your order😀</h3>`
        
    } else {
        document.getElementById('error-msg').textContent = `Please complete the form.`
    }
    
    render()
}

function getHtml() {
    let feedHtml = ``
    
    menuArray.forEach((item) => {
        
        feedHtml += `
            <div class="menu-item" id="menu-item">
                <div class="image">
                    <p class="emoji">${item.emoji}</p>
                </div>
                <div class="details">
                    <p class="name">${item.name}</p>
                    <p class="ingredients">${item.ingredients}</p>
                    <p class="price">$${item.price}</p>
                </div>
                <div class="add-items">
                    <i class="fa-duotone fa-plus add" data-id="${item.id}"></i>
                </div>
            </div>
        `  
    })
    return feedHtml   
}

function getOrderHtml() {
    let orderHtml = ``
    
    orderArray.forEach((item) => {
        
        orderHtml += `
        <div class="order-wrapper">
            <div class="order-items">
                <div class="item">
                    <p>${item.name}</p>
                    <button class="remove-btn" id="remove-btn" data-remove="${item.id}">Remove</button>
                    <p>${item.quantity}</p>
                    <p>${item.price * item.quantity}</p>
                </div>
            </div>
        </div>
        
        `
    })
    return orderHtml
}

function render() {
    mainEl.innerHTML = getHtml()
    orderEl.innerHTML = getOrderHtml()
}

render()
