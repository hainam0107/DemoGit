function informationOrder() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    var result = "";
    var totalAllPrice = 0;
    var ship = "FreeShip";
    var disCount = 500000;
    var intoMoneyOrder = 0;

    if (cart.length > 0) {
        cart.forEach(item => {
            var parseInt_price = item.price_sale * 1;
            var totalPrive = parseInt_price * item.quantity;
            totalAllPrice += totalPrive;
            result += `<div class="row mt-3 align-items-center p-0 cartMini">
            <div class="col-md-3 p-0"><img src="img/product/${item.image_1}" width="90px" alt=""></div>
            <div class="col-md-6 p-0">
                <div class="row p-0"><p class="p-0">${item.name}</p></div>
                <div class="row p-0"><p class="p-0">Số lượng: ${item.quantity}</p></div>
            </div>
            <div class="col-md-3 p-0">
                <div class="row cart_price" style="font-size:14px;color: var(--grey-color);">${parseInt_price.toLocaleString('vi-VN')}đ</div>
            </div>
        </div>`;
        });

        intoMoneyOrder = totalAllPrice - disCount;
    } else {
        // Nếu giỏ hàng không tồn tại, đặt giảm giá và intoMoneyOrder là 0đ
        disCount = 0;
        intoMoneyOrder = 0;
    }

    document.querySelector('.ship').innerHTML = ship.toLocaleString('vi-VN');
    document.querySelector('.disCount').innerHTML = disCount.toLocaleString('vi-VN') + `đ`;
    document.querySelector('.totalAllPrice').innerHTML = totalAllPrice.toLocaleString('vi-VN') + `đ`;
    document.querySelector('.intoMoneyOrder').innerHTML = intoMoneyOrder.toLocaleString('vi-VN') + `đ`;
    document.querySelector('.infomationOrder').innerHTML = result;
}
informationOrder();
function validateForm() {
    var isValid = true;
    var fullname = document.querySelector("#fullnameOrder").value;
    var address = document.querySelector("#address").value;
    var email = document.querySelector("#email_order").value;
    var phone = document.querySelector("#phone").value;
    document.getElementById('fullnameErrorOrder').innerText = '';
    document.getElementById('addressError').innerText = '';
    document.getElementById('emailErrorOrder').innerText = '';
    document.getElementById('phoneError').innerText = '';

    if (fullname.trim() === '') {
        document.getElementById('fullnameErrorOrder').innerText = '*Vui lòng nhập họ và tên.';
        isValid = false;
    } else if (fullname.trim().length < 8) {
        document.getElementById('fullnameErrorOrder').innerText = '*Họ và tên ít nhất 8 ký tự.';
        isValid = false;
    }
    if (address.trim() === '') {
        document.getElementById('addressError').innerText = '*Vui lòng nhập địa chỉ nhận hàng.';
        isValid = false;
    } else if (address.trim().length < 10) {
        document.getElementById('addressError').innerText = '*Địa chỉ ít nhất 15 ký tự.';
        isValid = false;
    }
    if (email.trim() === '') {
        document.getElementById('emailErrorOrder').innerText = '*Vui lòng nhập địa chỉ email.';
        isValid = false;
    }
    if (phone.trim() === '') {
        document.getElementById('phoneError').innerText = '*Vui lòng nhập số điện thoại.';
        isValid = false;
    } else if (isNaN(phone.trim())) {
        document.getElementById('phoneError').innerText = '*Vui lòng nhập số điện thoại hợp lệ.';
        isValid = false;
    }
    return isValid;

}
document.getElementById('fullnameOrder').addEventListener('input', function () {
    document.getElementById('fullnameErrorOrder').innerText = '';
});
document.getElementById('address').addEventListener('input', function () {
    document.getElementById('addressError').innerText = '';
});

document.getElementById('email_order').addEventListener('input', function () {
    document.getElementById('emailErrorOrder').innerText = '';
});

document.getElementById('phone').addEventListener('input', function () {
    document.getElementById('phoneError').innerText = '';
});
document.querySelector('#btnOrder').onclick = function () {
    if (!validateForm()) {
        return;
    }

    let url = "http://localhost:3000/order";
    var fullname = document.querySelector("#fullnameOrder").value;
    var address = document.querySelector("#address").value;
    var email = document.querySelector("#email_order").value;
    var phone = document.querySelector("#phone").value;
    var orders = {
        "id": "",
        "customer_name": fullname,
        "customer_address": address,
        "customer_email": email,
        "customer_phone_number": phone,
        "created_date": new Date().toISOString().slice(0, 10),
        "status": "Waiting"
    }

    let option = {
        method: "POST",
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(orders)
    }

    fetch(url, option).then(res => res.json())
        .then(data => {
            order_id = data.id;
            orderDetail(order_id);
            console.log("order_id:", order_id);
            alert("Lấy thông tin thành công");
        })
        .catch(error => {
            console.error("Lỗi khi đặt hàng:", error);
            alert("Lỗi khi lấy thông tin");
        });
}
function orderDetail(order_id) {
    let url = "http://localhost:3000/order_details";
    alert("Gọi đến hàm orderDetail thành công")
    let cart = JSON.parse(localStorage.getItem("cart"));
    cart.forEach(pro => {
        let objpro = {
            "order_id": order_id,
            "product_id": pro.id,
            "quantity": pro.quantity,
            "unit_price": pro.price_sale
        }
        op = {
            method: "POST",
            body: JSON.stringify(objpro),
            headers: { "Content-type": "application/json" },

        }
        console.log("cart:", cart)
        console.log("objpro:", objpro)
        fetch(url, op).then(res => res.json())
            .then(data => {
                console.log("Đặt hàng thành công")
                cart = [];
                localStorage.setItem("cart", JSON.stringify(cart));
            })
            .catch(error => {
                console.error("Lỗi khi thêm chi tiết đơn hàng:", error);
                alert("Lỗi chi tiết đơn hàng");
            });
    })
}

document.addEventListener("DOMContentLoaded", function () {
    // Lấy tất cả các phần tử có lớp "Payon"
    var payonElements = document.querySelectorAll('.Payon');

    // Thêm lắng nghe sự kiện click cho từng phần tử "Payon"
    payonElements.forEach(function (payonElement) {
        payonElement.addEventListener('click', function () {
            // Xóa lớp "PayonActive" khỏi tất cả các phần tử
            payonElements.forEach(function (element) {
                element.classList.remove('PayonActive');
            });

            // Thêm lớp "PayonActive" vào phần tử đã được click
            payonElement.classList.add('PayonActive');
        });
    });
});

// const modalAnnouncement = document.querySelector('.modalAnnouncement');
// const openTabAc = document.querySelector('#btnOrder');
// const closeTabAc = document.querySelector('.btnCloseAc');

// openTabAc.addEventListener("click", () => {
//     bgMiniCart.style.display = "block"
//     modalAnnouncement.classList.add ('showModalAnnouncement');
// })

// closeTabAc.addEventListener("click", () => {
//     bgMiniCart.style.display = "none"
//     modalAnnouncement.classList.remove('showModalAnnouncement');
// })