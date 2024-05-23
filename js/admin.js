const addModalForm = document.querySelector('#addModalForm');
const editModalForm = document.querySelector('#myEditModal #addModalForm');
let id = '';
let btnAdd = document.querySelector('.btnAdd');
let btnClose = document.querySelector('.btnClose');
let btnCloseEdit = document.querySelector('.btnCloseEdit');
let admin_form = document.querySelector('.admin_form');
let admin_form_edit = document.querySelector('.admin_form_edit');
let bg_form = document.querySelector('.bg-form-add');

btnAdd.addEventListener("click", function () {
    admin_form.classList.add('show-admin-form');
    bg_form.style.display = "block"
})

btnClose.addEventListener("click", function () {
    admin_form.classList.remove('show-admin-form');
    bg_form.style.display = "none"
})
btnCloseEdit.addEventListener("click", function () {
    admin_form_edit.classList.remove('show-admin-form');
    bg_form.style.display = "none"
})
var url = "http://localhost:3000/product";
fetch(url)
    .then(data => data.json())
    .then(products => {
        let counter = 1;
        let product_arr = products.map(product => {
            return `<tr data-id="${product.id}">
            <td>${counter++}</td>
            <td style="text-align:center"><img src="img/product/${product.image_1}" alt="" width="100"></td>
            <td style="width:300px">${product.name}</td>
            <td style="text-align: center;">${product.quantity}</td>
            <td>${product.price.toLocaleString('vi-VN')}đ</td>
            <td>${product.price_sale.toLocaleString('vi-VN')}đ</td>
            <td>
                <button class="btn btn-edit btn-primary"><i class="fa-solid fa-pen-to-square"></i></button>
                <button class="btn btn-delete btn-danger"><i class="fa-regular fa-trash-can"></i></button>
            </td>
            </tr>`
                ;

        });

        document.querySelector(".load-pro").innerHTML += product_arr.join('');
        products.forEach(product => {
            // Edit Product
            const btnEdit = document.querySelector(`[data-id='${product.id}'] .btn-edit`);
            btnEdit.addEventListener('click', (e) => {
                e.preventDefault();
                id = product.id;
                admin_form_edit.classList.add('show-admin-form');
                // editModalForm.image_1.value = product.image_1;
                // editModalForm.image_2.value = product.image_2;
                // editModalForm.image_3.value = product.image_3;
                // editModalForm.image_4.value = product.image_4;
                // editModalForm.image_5.value = product.image_5;
                editModalForm.name.value = product.name;
                editModalForm.quantity.value = product.quantity;
                editModalForm.price.value = product.price;
                editModalForm.price_sale.value = product.price_sale;

            })
            // Delete product
            const btndel = document.querySelector(`[data-id='${product.id}'] .btn-delete`);
            btndel.addEventListener("click", (e) => {
                console.log("delete")
                fetch(`${url}/${product.id}`, {
                    method: 'DELETE'
                })
                    .then(response => response.json())
                // .then(() => location.reload());
            });
        });
    })


// Add product
addModalForm.addEventListener("submit", (e) => {
    e.preventDefault();
    fetch(url, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify({
            image_1: addModalForm.image_1.value,
            image_2: addModalForm.image_2.value,
            image_3: addModalForm.image_3.value,
            image_4: addModalForm.image_4.value,
            image_5: addModalForm.image_5.value,
            name: addModalForm.name.value,
            quantity: addModalForm.quantity.value,
            price: addModalForm.price.value,
            price_sale: addModalForm.price_sale.value
        })
    })
        .then(res => res.json())
        .then(data => {
            const dataArr = [];
            dataArr.push;
        })
})

//Edit Modal
editModalForm.addEventListener("submit", (e) => {
    e.preventDefault();
    fetch(`${url}/${id}`, {
        method: 'PATCH',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify({
            // image_1: addModalForm.image_1.value,
            // image_2: addModalForm.image_2.value,
            // image_3: addModalForm.image_3.value,
            // image_4: addModalForm.image_4.value,
            // image_5: addModalForm.image_5.value,
            name: editModalForm.name.value,
            quantity: editModalForm.quantity.value,
            price: editModalForm.price.value,
            price_sale: editModalForm.price_sale.value
        })
    })
        .then(res => res.json())
        .then(() => location.reload());
})
