document.addEventListener("DOMContentLoaded", function() {
    const thanhTruotGia = document.getElementById("price-range");
    const giaHienTai = document.getElementById("price-value");
    const danhSachSanPham = document.querySelector(".loadCateProduct");

    // Cập nhật hiển thị giá trị khi thanh trượt thay đổi
    thanhTruotGia.addEventListener("input", function() {
        giaHienTai.textContent = parseFloat(thanhTruotGia.value).toLocaleString('vi-VN') +"đ";
        locSanPhamTheoGia();
    });

    // Lọc sản phẩm dựa trên khoảng giá
    function locSanPhamTheoGia() {
        const giaDuocChon = parseInt(thanhTruotGia.value);

        // Lặp qua từng sản phẩm
        const sanPhams = danhSachSanPham.querySelectorAll(".col-md-3");
        sanPhams.forEach(function(sanPham) {
            
            const giaSanPham = parseInt(sanPham.querySelector(".product-price").innerText.replace('đ', '').replace(',', ''));
            // Hiển thị hoặc ẩn sản phẩm dựa trên khoảng giá
            if (giaSanPham >= giaDuocChon) {
                sanPham.style.display = "block";
            } else {
                sanPham.style.display = "none";
            }
        });
    }

    // Gọi hàm ban đầu để hiển thị tất cả sản phẩm
    locSanPhamTheoGia();
});