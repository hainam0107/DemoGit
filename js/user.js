const loginForm = document.querySelector('#loginForm');
const registerForm = document.querySelector('#registerForm');
const formLoginResiger = document.querySelector('.form-login_register');
function validateRegisterForm() {
    // Lấy giá trị từ các trường input
    const fullName = document.getElementById('fullName');
    const email = document.getElementById('email');
    const username = document.getElementById('usernameDki');
    const password = document.getElementById('passwordDki');
    const confirmPassword = document.getElementById('confirmPassword');

    // Reset thông báo lỗi
    document.getElementById('fullNameError').innerText = '';
    document.getElementById('emailError').innerText = '';
    document.getElementById('usernameErrorDki').innerText = '';
    document.getElementById('passwordErrorDki').innerText = '';
    document.getElementById('confirmPasswordError').innerText = '';

    let isValid = true;

    // Kiểm tra điều kiện validate và hiển thị thông báo lỗi
    if (fullName.value.trim() === '') {
        document.getElementById('fullNameError').innerText = 'Vui lòng nhập họ và tên.';
        isValid = false;
    }

    if (email.value.trim() === '') {
        document.getElementById('emailError').innerText = 'Vui lòng nhập email.';
        isValid = false;
    }

    if (username.value.trim() === '') {
        document.getElementById('usernameErrorDki').innerText = 'Vui lòng nhập tên đăng nhập.';
        isValid = false;
    }

    if (password.value.trim() === '') {
        document.getElementById('passwordErrorDki').innerText = 'Vui lòng nhập mật khẩu.';
        isValid = false;
    }

    if (confirmPassword.value.trim() === '') {
        document.getElementById('confirmPasswordError').innerText = 'Vui lòng nhập lại mật khẩu.';
        isValid = false;
    } else if (password.value.trim() !== confirmPassword.value.trim()) {
        document.getElementById('confirmPasswordError').innerText = 'Mật khẩu không khớp.';
        isValid = false;
    }

    return isValid;
}
function validateLoginForm() {
    // Lấy giá trị từ các trường input
    const username = document.getElementById('username');
    const password = document.getElementById('password');

    let isValid = true;

    // Kiểm tra điều kiện validate và hiển thị thông báo lỗi
    if (username.value.trim() === '') {
        document.getElementById('usernameError').innerText = 'Vui lòng nhập tên đăng nhập.';
        isValid = false;
    }

    if (password.value.trim() === '') {
        document.getElementById('passwordError').innerText = 'Vui lòng nhập mật khẩu.';
        isValid = false;
    }

    return isValid;
}

// Xử lý sự kiện khi người dùng nhập vào ô input
document.getElementById('username').addEventListener('input', function () {
    document.getElementById('usernameError').innerText = '';
});

document.getElementById('password').addEventListener('input', function () {
    document.getElementById('passwordError').innerText = '';
});
// Xử lý sự kiện khi người dùng nhập vào ô input
document.getElementById('fullName').addEventListener('input', function () {
    document.getElementById('fullNameError').innerText = '';
});

document.getElementById('email').addEventListener('input', function () {
    document.getElementById('emailError').innerText = '';
});

document.getElementById('usernameDki').addEventListener('input', function () {
    document.getElementById('usernameErrorDki').innerText = '';
});

document.getElementById('passwordDki').addEventListener('input', function () {
    document.getElementById('passwordErrorDki').innerText = '';
});

document.getElementById('confirmPassword').addEventListener('input', function () {
    document.getElementById('confirmPasswordError').innerText = '';
});
// Đăng ký tài khoản
registerForm.addEventListener("submit", (e) => {
    e.preventDefault();
    if (!validateRegisterForm()) {
        return;
    }
    const url = "http://localhost:3000/user";
    const fullName = document.querySelector('#fullName').value;
    const email = document.querySelector('#email').value;
    const username = document.querySelector('#usernameDki').value;
    const password = document.querySelector('#passwordDki').value;

    const inf = {
        "full_name": fullName,
        "email": email,
        "user_name": username,
        "password": password,
       
    };

    const option = {
        method: "POST",
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(inf)
    };

    fetch(url, option)
        .then(res => res.json())
        .then(data => {
            console.log('Đăng ký thành công:', data);
            const user = {
                full_name: fullName,
                email: email,
                user_name: username,
                password: password,
               
            };
            const userData = JSON.parse(localStorage.getItem('user')) || [];
            userData.push(user);
            localStorage.setItem('user', JSON.stringify(userData));
        });
});
// Đăng nhập tài khoản
loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    if (!validateLoginForm()) {
        return;
    }
    const url = "http://localhost:3000/user";
    const username = document.querySelector('#username').value;
    const password = document.querySelector('#password').value;

    const userData = JSON.parse(localStorage.getItem('user')) || [];
    const loggedInUser = userData.find(user => user.user_name === username);

    if (!loggedInUser) {
        document.getElementById('usernameError').innerText = 'Tài khoản không tồn tại.';
        return;
    }

    if (loggedInUser.password === password) {
        console.log('Đăng nhập thành công:', loggedInUser);

        // Lưu thông tin người dùng vào Local Storage
        localStorage.setItem('loggedInUser', JSON.stringify(loggedInUser));

        const logginIn = document.querySelector(".logginIn");
        logginIn.innerHTML = `<p>Xin chào, <strong class="text-primary">${loggedInUser.full_name}</strong></p>
                                <div class="user-options" id="userOptions">
                                <ul>
                                    <li><a href="#" id="purchaseHistory">Lịch sử mua hàng</a></li>
                                    <li><a href="#" id="userInfo">Thông tin người dùng</a></li>
                                    <li class="logout"><a class="text-white" href="#" id="logout">Đăng xuất</a></li>    
                                </ul>
                            </div>`;
        const logginNot = document.querySelector(".logginNot");
        logginNot.style.display = "none";
        logginIn.style.display = "block";
        location.reload();
    } else {
        document.getElementById('passwordError').innerText = 'Mật khẩu không đúng';
    }
});

// Kiểm tra nếu có thông tin người dùng đã đăng nhập từ trước
document.addEventListener('DOMContentLoaded', () => {
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
    if (loggedInUser) {
        const logginIn = document.querySelector(".logginIn");
        logginIn.innerHTML = `<p>Xin chào, <strong class="text-primary">${loggedInUser.full_name}</strong></p>
                                <div class="user-options" id="userOptions">
                                <ul>
                                    <li><a href="#" id="purchaseHistory">Lịch sử mua hàng</a></li>
                                    <li><a href="#" id="userInfo">Thông tin người dùng</a></li>
                                    <li class="logout"><a class="text-white" href="#" id="logout">Đăng xuất</a></li>
                                </ul>
                            </div>`;
        const logginNot = document.querySelector(".logginNot");
        logginNot.style.display = "none";
        logginIn.style.display = "block";
    }
});