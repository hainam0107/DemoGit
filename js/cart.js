let showCart = document.querySelector('.icon_miniCart');
let cart = document.querySelector('.minicart');
let closeCart = document.querySelector('.btn-close');
let bgMiniCart = document.querySelector('.bg-miniCart');
showCart.addEventListener("click", () => {
    cart.classList.add('showCart');
    bgMiniCart.style.display = "block"
    displayCartItems();
});

closeCart.addEventListener("click", () => {
    cart.classList.remove('showCart');
    bgMiniCart.style.display = "none"
});

document.addEventListener("DOMContentLoaded", function () {
    displayCartItems();
    displayCart();
});

function displayCartItems() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    // Hiển thị sản phẩm trong giỏ hàng
    var resultMiniCart = ""
    cart.forEach(item => {
        var parseInt_price = item.price * 1
        resultMiniCart += ` <div class="row mt-3 align-items-center p-0 cartMini">
        <div class="col-md-3 p-0"><img src="img/product/${item.image_1}" width="90px" alt=""></div>
        <div class="col-md-6 p-0">
            <div class="row p-0"><p class="p-0">${item.name}</p></div>
            <div class="row p-0"><p class="p-0">Số lượng: ${item.quantity}</p></div>
            
        </div>
        <div class="col-md-3 p-0">
            <div class="row"></div>
            <div class="row cart_price">${parseInt_price.toLocaleString('vi-VN')}đ</div>
        </div>
    </div>
    
        `
    });
    document.querySelector('.producMiniCart').innerHTML = resultMiniCart;
}

function displayCart() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    var resultCart = "";
    var totalAllPrice = 0;

    cart.forEach((item, index) => {
        var parseInt_price = item.price_sale * 1;
        var totalPrive = parseInt_price * item.quantity;
        totalAllPrice += totalPrive;
        intoMoney = totalAllPrice
        resultCart += `<tr>
            <th>${index + 1}</th>
            <th style="text-align:center"><img src="img/product/${item.image_1}" alt="" width="90"></th>
            <th style="width:300px">${item.name}</th>
            <th>${parseInt_price.toLocaleString('vi-VN')}đ</th>
            <th>
                <div class=" quantityMPus">
                    <button onclick="changeQuantity(${index}, 'minus')">-</button>
                    <input type="text" id="quantity-${index}" value="${item.quantity}"  updateQuantity(${index}, this.value);  oninput="validateInput(this)">
                    <button onclick="changeQuantity(${index}, 'plus')">+</button>
                </div>
            </th>
            <th>${totalPrive.toLocaleString('vi-VN')}đ</th>
            <th><button onclick="removeItem(${index})"><i class="fa-solid fa-trash"></i></button></th>
        </tr>`;
    });

    // Hiển thị tổng tạm tính
    document.querySelector('.totalAllPrice').innerHTML = (totalAllPrice.toLocaleString('vi-VN')) + `đ`;
    document.querySelector('.intoMoney').innerHTML = (intoMoney.toLocaleString('vi-VN')) + `đ`;

    // Hiển thị chi tiết giỏ hàng
    document.querySelector('.resultCart').innerHTML = resultCart;
}
function changeQuantity(index, action) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let quantityInput = document.getElementById(`quantity-${index}`);
    let currentQuantity = parseInt(quantityInput.value);

    if (action === 'minus' && currentQuantity > 1) {
        currentQuantity--;
    } else if (action === 'plus') {
        currentQuantity++;
    }

    quantityInput.value = currentQuantity;
    updateQuantity(index, currentQuantity);

    displayCart(); // Cập nhật lại hiển thị giỏ hàng
}

function updateQuantity(index, newQuantity) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart[index].quantity = newQuantity;
    localStorage.setItem("cart", JSON.stringify(cart));
    displayCart(); // Cập nhật lại hiển thị giỏ hàng
}
function validateInput(input) {
    // Xóa mọi ký tự không phải là số từ giá trị nhập vào
    input.value = input.value.replace(/[^0-9]/g, '');
    var numericValue = parseInt(input.value, 10);
    if (isNaN(numericValue) || numericValue < 0) {
        input.value = '1';
    }
}
function removeItem(index) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    if (index >= 0 && index < cart.length) {
        cart.splice(index, 1);

        // Cập nhật lại giỏ hàng trong localStorage
        localStorage.setItem("cart", JSON.stringify(cart));

        // Hiển thị lại giỏ hàng
        displayCart();
        updateCartNumber();
    }
}
document.querySelector('#btnCheckout').onclick=function(){
    document.location="checkout.html";
}