var url = "http://localhost:3000/category";
const addModalFormCate = document.querySelector('.form-category');
const editModalFormCate = document.querySelector('#modalEditCate .form');
fetch(url)
    .then(data => data.json())
    .then(category => {
        let counter = 1;
        let cat_arr = category.map(cat => {
            return `<tr data-id="${cat.id}">
      <td>${counter++}</td>
      <td style="text-align:center;width:250px"><img src="img/category/${cat.image}" alt="" width="100"></td>
      <td style="width:300px">${cat.name}</td>
      <td>
          <button class="btn btn-edit btn-primary"><i class="fa-solid fa-pen-to-square"></i></button>
          <button class="btn btn-delete btn-danger"><i class="fa-regular fa-trash-can"></i></button>
      </td>
      </tr>`;
        });
        document.querySelector(".load-category").innerHTML += cat_arr.join('');
        category.forEach(cat => {
            //DELETE SẢN PHẨM
            const btnDel = document.querySelector(`[data-id='${cat.id}'] .btn-delete`);
            btnDel.addEventListener('click', (e) => {
                console.log("delete", cat.id)
                fetch(`${url}/${cat.id}`, {
                    method: 'DELETE'
                })
                    .then(response => response.json())
                    .then(() => location.reload());
            })
            // Edit Product
            const btnEdit = document.querySelector(`[data-id='${cat.id}'] .btn-edit`);
            btnEdit.addEventListener('click', (e) => {
                e.preventDefault();
                id = cat.id;
                admin_form_edit.classList.add('show-admin-form');
                // editModalFormCate.image.value = cat.image;
                editModalFormCate.name.value = cat.name;
                console.log("Edit" + cat.name)
            })
        });
    });
// ADD MODAL FORM
addModalFormCate.addEventListener("submit", (e) => {
    e.preventDefault();
    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            image: addModalFormCate.image.value,
            name: addModalFormCate.name.value,
        })
    })
        .then(Response => Response.json())
        .then(dataCate => {
            const dataCateArr = [];
            dataCateArr.push(dataCate)
        })
})
// EDIT MODAL FORM
editModalFormCate.addEventListener("submit", (e) => {
    e.preventDefault();
    fetch(`${url}/${id}`, {
        method: 'PATCH',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify({
            // image: editModalFormCate.image.value,
            name: editModalFormCate.name.value
        })
    })
        .then(res => res.json())
        .then(() => location.reload());
})
