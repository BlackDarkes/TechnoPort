class AccountView {
    constructor(selectors) {
        this.loginBlockElement = document.querySelector(selectors.loginBlock);
        this.inputLoginElement = document.querySelector(selectors.inputLogin);
        this.buttonLoginElement = document.querySelector(selectors.buttonLogin);
        this.listBuyElement = document.querySelector(selectors.listBuy);
        this.profileBlockElement = document.querySelector(selectors.profileBlock);
        this.profileListElement = document.querySelector(selectors.profileList);
    }

    loginUser() {
        const telephonUser = this.#validatePhone(this.inputLoginElement.value);

        if (telephonUser) {
            localStorage.setItem("login", telephonUser);
            location.reload();
        }
    }

    hideUserLogin() {
        if (localStorage.getItem("login")) {
            this.profileBlockElement.style.display = "block";
            this.loginBlockElement.style.display = "none";
        }
    }

    #validatePhone(phone) {
        const cleaned = phone.replace(/[^\d+]/g, '');
        const regex = /^(\+7|8|7)?[\d]{10}$/;

        if (cleaned.startsWith('+')) {
            return cleaned.length === 12 && /^\+7\d{10}$/.test(cleaned);
        } else if (/^[78]/.test(cleaned)) {
            return cleaned.length === 11 && /^[78]\d{10}$/.test(cleaned);
        } else {
            return cleaned.length === 10 && /^\d{10}$/.test(cleaned);
        }
    }
}

export default AccountView;