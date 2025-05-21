import AccountView from "./AccountView";
import Helpers from "./helpers";

class AccountController {
    #selectors = {
        loginBlock: "[data-account-login-block]",
        inputLogin: "[data-account-login-input]",
        buttonLogin: "[data-account-login-button]",
        listBuy: "[data-account-list]",
        profileBlock: "[data-account-profile-block]",
        profileList: "[data-account-profile-list]",
    };
    #data;

    constructor() {
        this.helpers = new Helpers();
        this.view = new AccountView(this.#selectors);
        this.init();
    }

    async init() {
        this.#data = await this.helpers.getData();
        this.addEventListenerToLogin();
        this.view.hideUserLogin();
        this.view.generateOrder(this.#data);
    }

    addEventListenerToLogin() {
        this.view.buttonLoginElement.addEventListener("click", () => {
            this.view.loginUser();
        })
    }
}

export default AccountController;