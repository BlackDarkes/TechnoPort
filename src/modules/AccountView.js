import HtmlBuilderView from "./HtmlBuilderView";

class AccountView {
    #PRODUCT_URL = "/pages/product.html?id=";

    constructor(selectors) {
        this.loginBlockElement = document.querySelector(selectors.loginBlock);
        this.inputLoginElement = document.querySelector(selectors.inputLogin);
        this.buttonLoginElement = document.querySelector(selectors.buttonLogin);
        this.listBuyElement = document.querySelector(selectors.listBuy);
        this.profileBlockElement = document.querySelector(selectors.profileBlock);
        this.profileListElement = document.querySelector(selectors.profileList);
        this.logoutButtonElement = document.querySelector(selectors.logoutButton);
        this.notorderElement = document.querySelector(selectors.notorder);

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

    logout() {
        this.logoutButtonElement.addEventListener("click", () => {
            const logout = confirm("Вы точно хотите выйти?");

            if (logout) {
                localStorage.removeItem("login");
                location.reload();
            }
        })
    }

    generateOrder(data) {
        const ordersArray = JSON.parse(localStorage.getItem("orders"));
        
        if (ordersArray && ordersArray.length) {
            this.notorderElement.style.display = "none";

            const tableContainer = this.htmlBuilder.createListItem("main-account__orders-table", "", "");
            
            const tableHeader = this.htmlBuilder.createBlock("main-account__orders-header");
            tableHeader.innerHTML = `
                <div class="main-account__orders-cell">Наименование товаров</div>
                <div class="main-account__orders-cell">Общая цена</div>
                <div class="main-account__orders-cell">Количество</div>
                <div class="main-account__orders-cell">Действие</div>
            `;
            tableContainer.appendChild(tableHeader);

            ordersArray.forEach((order) => {
                const idProduct = order[0];
                const totalPrice = order[1];
                const count = order[2];
                let buttonId;
                
                const row = this.htmlBuilder.createBlock("main-account__orders-row");
                
                const productsCell = this.htmlBuilder.createBlock("main-account__orders-cell");
                const productsList = this.htmlBuilder.createBlock("main-account__products-list");
                
                idProduct.forEach((id, index) => {
                    const product = data.find((product) => product.id == id);
                    if (product) {
                        const productLink = this.htmlBuilder.createNameLinkProduct(
                            `${this.#PRODUCT_URL}${id}`,
                            product.name,
                            "main-account__product"
                        );
                        productsList.appendChild(productLink);
                        if (index !== idProduct.length - 1) {
                            productsList.appendChild(document.createTextNode(' '));
                        }
                    }
                });
                
                productsCell.appendChild(productsList);
                row.appendChild(productsCell);
                
                const priceCell = this.htmlBuilder.createBlock("main-account__orders-cell");
                priceCell.textContent = `${totalPrice}₽`;
                row.appendChild(priceCell);
                
                const countCell = this.htmlBuilder.createBlock("main-account__orders-cell");
                countCell.textContent = count;
                row.appendChild(countCell);
                
                const actionCell = this.htmlBuilder.createBlock("main-account__orders-cell");
                const button = this.htmlBuilder.createButton("Отмена", "main-account__cancel");

                button.setAttribute('data-order-id', JSON.stringify(idProduct));
                actionCell.appendChild(button);
                row.appendChild(actionCell);
                
                tableContainer.appendChild(row);
            });

            this.profileListElement.innerHTML = '';
            this.profileListElement.appendChild(tableContainer);
        }
    }

    canselOrder() {
        const canselButton = document.querySelectorAll(".main-account__cancel");

        canselButton.forEach((button, index) => {
            button.addEventListener("click", () => {
                const orderArray = JSON.parse(localStorage.getItem("orders"));
                orderArray.splice(index, 1);

                console.log(orderArray);

                localStorage.setItem("orders", JSON.stringify(orderArray));

                location.reload();
            })
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