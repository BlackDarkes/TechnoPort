import AccountView from "./AccountView";

class AccountController {
    #selectors = {
        loginBlock: "[data-account-login-block]",
        inputLogin: "[data-account-login-input]",
        buttonLogin: "[data-account-login-button]",
        listBuy: "[data-account-list]",
        profileBlock: "[data-account-profile-block]",
        profileList: "[data-account-profile-list]",
    }

    constructor() {
        this.view = new AccountView(this.#selectors);
        this.init();
    }

    init() {
        this.addEventListenerToLogin();
        this.view.hideUserLogin();
    }

    addEventListenerToLogin() {
        this.view.buttonLoginElement.addEventListener("click", () => {
            this.view.loginUser();
        })
    }
}

export default AccountController;