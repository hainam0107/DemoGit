var url = "http://localhost:3000/category";
fetch(url)
    .then(data => data.json())
    .then(category => {
        cat_arr = category.map(cat => {
            return `<div class="col img-category" onclick="arrCate(${cat.id}, '${cat.name}')">
            <img src="img/category/${cat.image}" width="90" alt="">
            <p>${cat.name}</p>
          </div>`;
        });
        const catHTML = cat_arr.join('');
        document.querySelector(".load-cate").innerHTML += catHTML;
    });

function arrCate(id, name) {
    localStorage.setItem('idCate', id);
    localStorage.setItem('nameCate', name)
    loadCateProduct();
    window.location = "product_cate.html";
}
function loadCateProduct() {
    var id = localStorage.getItem('idCate');
    var name = localStorage.getItem('nameCate');
   
    var url = "http://localhost:3000/product";
    fetch(url)
        .then(data => data.json())
        .then(product => {
            catePro_arr = product.map(product => {
                var percentSale = ((product.price - product.price_sale) / product.price * 100).toFixed(1);
                if (product.cate_id == id) {
                    return `<div class="col-md-3">
                    <div class="product">
                        <div class="product-heart">
                            <button onclick=\'savefavourite(\`${product}\`)\'><i class="fa-regular fa-heart"></i></button>
                    </div>
                    <div class="product-addCart">
                    <button onclick = "addCart(${product.id},'${product.name}','${product.image_1}','${product.image_2}','${product.image_3}','${product.image_4}','${product.image_5}','${product.price}',${product.price_sale})"><i class="fa-solid fa-cart-plus"></i></button>
                    </div>
                    <button onclick="showDetails(${product.id},'${product.name}','${product.cate_id}','${product.detail}','${product.image_1}','${product.image_2}','${product.image_3}','${product.image_4}','${product.image_5}','${product.price}',${product.price_sale})">
                            <div class="product-img">
                                <img src="img/product/${product.image_1}" alt="">
                            </div>
                            <div class="product-content">
                                <div class="product-category ">
                                    MacBook
                                </div>
                                <div class="product-name">
                                ${product.name}
                                </div>
                                <div class="product-price">
                                ${product.price_sale}đ
                                </div>
                                <div class="product-price-sale">
                                    <del class="pps">${product.price}đ</del>
                                    ${percentSale}%
                                </div>
                            </div>
                        </button>
                    </div>
                </div>`;
                
                } else {
                    return ''; 
                }
                
            }).join('');
            document.querySelector(".loadCateProduct").innerHTML += catePro_arr;
            document.querySelector('.loadCateName').innerHTML = name;
        })
}
var url = "http://localhost:3000/product";
fetch(url).then(data => data.json())
    .then(product => {
        product_arr = product.map(product => {
            var percentSale = ((product.price - product.price_sale) / product.price * 100).toFixed(1);
            return `<div class="col w-20">
        <div class="product">
            <div class="product-heart">
                <button onclick=\'savefavourite(\`${product}\`)\'><i class="fa-regular fa-heart"></i></button>
        </div>
        <div class="product-addCart">
        <button onclick = "addCart(${product.id},'${product.name}','${product.image_1}','${product.image_2}','${product.image_3}','${product.image_4}','${product.image_5}','${product.price}',${product.price_sale})"><i class="fa-solid fa-cart-plus"></i></button>
        </div>
        <button onclick="showDetails(${product.id},'${product.name}','${product.cate_id}','${product.detail}','${product.image_1}','${product.image_2}','${product.image_3}','${product.image_4}','${product.image_5}','${product.price}',${product.price_sale})">
                <div class="product-img">
                    <img src="img/product/${product.image_1}" alt="">
                </div>
                <div class="product-content">
                    <div class="product-category ">
                        MacBook
                    </div>
                    <div class="product-name">
                    ${product.name}
                    </div>
                    <div class="product-price">
                    ${product.price_sale.toLocaleString('vi-VN')}đ
                    </div>
                    <div class="product-price-sale">
                        <del class="pps">${product.price.toLocaleString('vi-VN')}đ</del>
                        ${percentSale}%
                       
                    </div>
                </div>
            </button>
        </div>
    </div>`;
        })
        const catProduct = product_arr.join('');
        document.querySelector(".load-product").innerHTML += catProduct;
    })
function addCart(id, name, image_1, image_2, image_3, image_4, image_5, price, price_sale) {
    // Lấy giỏ hàng từ localStorage
    var cart = JSON.parse(localStorage.getItem("cart")) || [];

    if (cart.length === 0) {
        // Giỏ hàng trống, thêm sản phẩm vào
        cart.push({ id, name, image_1, image_2, image_3, image_4, image_5, price, price_sale, quantity: 1 });
    } else {
        // Giỏ hàng có sản phẩm
        let item = cart.find(item => item.id === id);
        if (item) {
            // Sản phẩm đã tồn tại trong giỏ hàng, tăng số lượng
            item.quantity++;
        } else {
            // Sản phẩm chưa tồn tại trong giỏ hàng, thêm vào
            cart.push({ id, name, image_1, image_2, image_3, image_4, image_5, price, price_sale, quantity: 1 });
        }
    }

    // Cập nhật số lượng trong localStorage
    localStorage.setItem("cart", JSON.stringify(cart));

    // Cập nhật số lượng hiển thị trên trang
    updateCartNumber();
}
function updateCartNumber() {
    var cart = JSON.parse(localStorage.getItem("cart")) || [];
    var cartNumberElement = document.querySelector('.cartNumber');

    if (cartNumberElement) {
        // Tính tổng số loại sản phẩm trong giỏ hàng
        var totalProductTypes = cart.length;

        // Cập nhật số lượng trên trang
        cartNumberElement.textContent = `(${totalProductTypes})`;
    }
}
updateCartNumber();
function showDetails(id, name,cate_id,detail, image_1, image_2, image_3, image_4, image_5, price, price_sale) {
    var productDetails = {
        id: id,
        name: name,
        detail: detail,
        cate_id: cate_id,
        image_1: image_1,
        image_2: image_2,
        image_3: image_3,
        image_4: image_4,
        image_5: image_5,
        price: price,
        price_sale: price_sale
    };

    // Chuyển đối tượng thành một chuỗi JSON trước khi lưu vào localStorage
    window.localStorage.setItem("product", JSON.stringify(productDetails));
    localStorage.setItem('detail',detail);
    // Chuyển hướng đến trang details.html
    location.href = "details.html";

}
function loadProductRelate(cateId, currentProductId) {
    var url = "http://localhost:3000/product";
    fetch(url)
        .then(data => data.json())
        .then(products => {
            var relatedProducts = products.filter(product => {
                // Lọc ra các sản phẩm có cùng cate_id nhưng khác id
                return product.cate_id == cateId && product.id != currentProductId;
            });

            var relate_arr = relatedProducts.map(product => {
                var percentSale = ((product.price - product.price_sale) / product.price * 100).toFixed(1);
                return `<div class="col w-20">
                <div class="product">
                    <div class="product-heart">
                        <button onclick=\'savefavourite(\`${product}\`)\'><i class="fa-regular fa-heart"></i></button>
                </div>
                <div class="product-addCart">
                <button onclick = "addCart(${product.id},'${product.name}','${product.image_1}','${product.image_2}','${product.image_3}','${product.image_4}','${product.image_5}','${product.price}',${product.price_sale})"><i class="fa-solid fa-cart-plus"></i></button>
                </div>
                <button onclick="showDetails(${product.id},'${product.name}','${product.cate_id}','${product.detail}','${product.image_1}','${product.image_2}','${product.image_3}','${product.image_4}','${product.image_5}','${product.price}',${product.price_sale})">
                        <div class="product-img">
                            <img src="img/product/${product.image_1}" alt="">
                        </div>
                        <div class="product-content">
                            <div class="product-category ">
                                MacBook
                            </div>
                            <div class="product-name">
                            ${product.name}
                            </div>
                            <div class="product-price">
                            ${product.price_sale.toLocaleString('vi-VN')}đ
                            </div>
                            <div class="product-price-sale">
                                <del class="pps">${product.price.toLocaleString('vi-VN')}đ</del>
                                ${percentSale}%
                               
                            </div>
                        </div>
                    </button>
                </div>
            </div>`;
            }).join('');

            // Thêm sản phẩm liên quan vào giao diện
            document.querySelector(".load-related-products").innerHTML = relate_arr;
        })
}
function buyNow() {
    // Lấy giỏ hàng từ localStorage (đảm bảo rằng giỏ hàng đã được cập nhật)
    var cart = JSON.parse(localStorage.getItem("cart")) || [];

    // Lấy sản phẩm từ localStorage
    let product = JSON.parse(localStorage.getItem("product"));

    // Thêm sản phẩm vào giỏ hàng (nếu chưa tồn tại)
    let item = cart.find(item => item.id === product.id);
    if (item) {
        // Sản phẩm đã tồn tại trong giỏ hàng, tăng số lượng
        item.quantity++;
    } else {
        // Sản phẩm chưa tồn tại trong giỏ hàng, thêm vào
        cart.push({ id: product.id, name: product.name, image_1: product.image_1, image_2: product.image_2, image_3: product.image_3, image_4: product.image_4, image_5: product.image_5, price: product.price, price_sale: product.price_sale, quantity: 1 });
    }

    // Cập nhật giỏ hàng trong localStorage
    localStorage.setItem("cart", JSON.stringify(cart));

    // Chuyển hướng đến trang giỏ hàng
    location.href = "cart.html";
}
