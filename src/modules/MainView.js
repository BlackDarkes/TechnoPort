class MainView {
    constructor(selectors) {
        this.loginNameElements = document.querySelectorAll(selectors.nameLogin);
    }

    renameButton() {
        if (localStorage.getItem("login")) {
            this.loginNameElements.forEach((loginName) => {
                loginName.textContent = "Аккаунт";
            })
        }
    }

    createBuy() {
        if (localStorage.getItem("buy")) {
            return;
        } else {
            localStorage.setItem("buy", JSON.stringify([]));
        }
    }

    // createProductListItem() {

    // }
}

export default MainView;