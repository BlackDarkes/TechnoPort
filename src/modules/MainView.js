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
}

export default MainView;