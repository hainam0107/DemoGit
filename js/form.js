const $$ = document.querySelectorAll.bind(document)
const $ = document.querySelector.bind(document)
const tabs = $$(".tab-item");
const panes = $$(".tab-pane");
tabs.forEach((tab, index) => {
    const pane = panes[index];
    tab.onclick = function () {
        $(".tab-item.active").classList.remove("active");
        $(".tab-pane.active").classList.remove("active");
        this.classList.add("active");
        pane.classList.add("active");
    }
})

const closeForm = document.querySelector('.closeTab');
const showTabs = document.querySelector('.showTabs');

showTabs.addEventListener("click", () => {
    bgMiniCart.style.display = "block"
    formLoginResiger.classList.add('showform-login_register');
})
closeForm.addEventListener("click", () => {
    bgMiniCart.style.display = "none"
    formLoginResiger.classList.remove('showform-login_register');
})



