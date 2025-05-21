import HtmlBuilderView from "./HtmlBuilderView";

class AccountView {
    constructor(selectors) {
        this.loginBlockElement = document.querySelector(selectors.loginBlock);
        this.inputLoginElement = document.querySelector(selectors.inputLogin);
        this.buttonLoginElement = document.querySelector(selectors.buttonLogin);
        this.listBuyElement = document.querySelector(selectors.listBuy);
        this.profileBlockElement = document.querySelector(selectors.profileBlock);
        this.profileListElement = document.querySelector(selectors.profileList);

        this.htmlBuilder = new HtmlBuilderView();
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

    generateOrder(data) {
        const ordersArray = JSON.parse(localStorage.getItem("orders"));
        
        ordersArray.forEach((order) => {
            const idProduct = order[0];
            const totalPrice = order[1];
            const count = order[2];
            const li = this.htmlBuilder.createListItem("main-account__order-item", "", "");
            const button = this.htmlBuilder.createButton("Отмена", "main-account__cancel");

            let textOrder = `Вы купили: `;

            idProduct.forEach((id, index) => {
                const product = data.find((product) => product.id == id);
                button.setAttribute("data-account-profile-button-id", id);

                if (index === idProduct.length - 1) {
                    textOrder += product.name + ". ";
                } else {
                    textOrder += product.name + ", ";
                }
            })

            textOrder += `Итоговая сумма составила:  ${totalPrice}₽. `;
            textOrder += `Всего товаров: ${count}.`

            li.innerHTML = textOrder;
            li.appendChild(button);

            this.profileListElement.appendChild(li)
        })
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