import { menuData } from "./data.js"
const summary = document.querySelector("#summary")
renderFoodMenu()

let orderList = []

document.addEventListener ('click', function(e){
    
    if (e.target.dataset.add) {
        addOnOrder(e.target.dataset.add)
    }
    else if (e.target.dataset.remove) {
        hanldeRemoveBtn (e.target.dataset.remove)
    }
    else if (e.target.id === "completeOrder") {
        modalPopUp()
    }
    else if (e.target.id === "pay-btn") {
        e.preventDefault()        
        handlePayBtn ()
    }
        
})

function addOnOrder (itemId) {
    const targetMenuItem = menuData.filter(function(menuItem){
        return menuItem.uuid === itemId
    })[0]
    orderList.push(targetMenuItem)
    renderOrderHtml (orderList)
}

function hanldeRemoveBtn (itemId) {
    let revisedOrder = []
    orderList.forEach(orderItem => {
        if(orderItem.uuid != itemId) {
            revisedOrder.push(orderItem)
        }
    })
    orderList = revisedOrder
    renderOrderHtml (orderList)
}

function renderOrderHtml (arr) {
    if (arr.length > 0) {
        let orderHtml = renderOrderList (arr)
    
        let totalPrice = 0
        arr.forEach(orderItem => {
            totalPrice += orderItem.price 
        })

        let discount = 0
        const discountHtml = ``
        if (discount != 0) {
                        const discountHtml = `
                            <div class="total-order">
                                <h2>Total</h2>
                                <p class="price"><span>£</span>${totalPrice}</p>
                            </div>
                            <div class="discount">
                                <h2>Discount</h2>
                                <p><span class="ingredients">10%</span></p>
                                <p class="price"><span>£</span>${discount}</p>
                            </div>
                             `
        }
        
        const orderListTittle = `<h2 class="order-title">Your Order</h2>`
        let orderTotal = totalPrice - discount
        const orderTotalHtml = `
                    <div class="total-order">
                        <h2>Total Price</h2>
                        <p class="price"><span>£</span>${orderTotal}</p>
                    </div>
        `
        const completeOrderBtn = `
                    <button class="complete-order" id="completeOrder">Complete order</button>
        `
        summary.innerHTML = orderListTittle + orderHtml  + discountHtml + orderTotalHtml + completeOrderBtn
    }   
    else {
        summary.innerHTML = ``
    }
}

function renderOrderList (arr) {
    let orderListHtml = ``
    arr.forEach(orderItem => {
        orderListHtml += `
                <div class="order-item">
                    <h2>${orderItem.name}</h2>
                    <p><span class="remove-btn" data-remove="${orderItem.uuid}">remove</span></p>
                    <p class="price"><span>£</span>${orderItem.price}</p>
                </div>
                `
    }); 
    return orderListHtml
}
     

function modalPopUp () {
    document.querySelector(".modal").classList.toggle("display-none")
}

function handlePayBtn () {
    if (document.querySelector("#name").value && document.querySelector("#card-num").value && document.querySelector("#cvv").value) {
        renderMessage()
        document.querySelector(".modal").classList.toggle("display-none")
        orderList = []
    }
    else {
        alert("Please fill the form")
    }
    
}

function renderMessage() {
    summary.innerHTML = `
                            <div class="tahnk-you">
                                <h2>Thanks you! Your order will be delivered soon!</h2>
                                <div class="loading"><img src="images/loading.svg"></div>
                            </div>
                        `
    setTimeout(function (){
        summary.innerHTML = `
                            <div class="tahnk-you">
                                <h2>Enjoy your meal!</h2>

                            </div>
                        `
    }, 3000)
    
}


function renderFoodMenu () {
    let feedHrml = ``
    menuData.forEach(menuItem => {
        feedHrml += `
            <div class="food-item">
                <img class="item-img" src="${menuItem.image}" alt="">
                <div class="item-details">
                    <h2 id="${menuItem.name}">${menuItem.name}</h2>
                    <p class="ingredients">${menuItem.ingredients}</p>
                    <p class="price">£<span id="${menuItem.price}">${menuItem.price}</span></p>
                </div>
                <div class="add-btn" data-add="${menuItem.uuid}"></div>
            </div>
        `
    });
    document.querySelector(".food-menu").innerHTML = feedHrml
}

