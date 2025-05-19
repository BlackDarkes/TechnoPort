import Helpers from "./helpers";
import ProductManager from "./productManager";

class Viewed {
    #visited = JSON.parse(localStorage.getItem("visited")) || [];
    #data;
    #parent = "[data-viewed-list]";

    constructor() {
        this.helpers = new Helpers();
        this.productManager = new ProductManager();
        this.parentElement = document.querySelector(this.#parent);
        this.init();
    }

    async init() {
        this.#data = await this.helpers.getData();
        this.getProductViewed();
        this.buttonBuyStopPropagation()
        this.addEventListenerToBuyButton();
    }

    getProductViewed() {
        this.#visited.forEach((id) => {
            const product = this.#data.find((product) => product.id === id);

            if (product) {
                const li = this.#createProductListItem(product);
                this.parentElement.appendChild(li);
            }
        })
    }

    buttonBuyStopPropagation() {
        const buttonBuyElements = document.querySelectorAll("[data-popular-buy-button]");

        buttonBuyElements.forEach((button) => {
            button.addEventListener("click", (e) => {
                e.preventDefault();
                e.stopPropagation();
            })
        })
    }

    addEventListenerToBuyButton() {
        const buttonBuyElements = document.querySelectorAll("[data-popular-buy-button]");

        this.#restoreBuyButtonsState(buttonBuyElements);

        buttonBuyElements.forEach((button) => {
            const id = Number(button.dataset.popularBuyButton);

            button.addEventListener("click", () => {
                let buyItems = this.#getBuyItemsFromStorage();

                if (!buyItems.includes(id)) {
                    buyItems.push(id);
                    localStorage.setItem("buy", JSON.stringify(buyItems));
                    button.classList.add("buy");
                } else {
                    alert("Данный товар уже находится в корзине!");
                }
            });
        });
    }

    #restoreBuyButtonsState(buttonBuyElements) {
        const buyItems = this.#getBuyItemsFromStorage();

        buttonBuyElements.forEach((button) => {
            const id = Number(button.dataset.popularBuyButton);
            if (buyItems.includes(id)) {
                button.classList.add("buy");
            }
        });
    }

    #getBuyItemsFromStorage() {
        let buyItems = [];
    
        if (localStorage.getItem("buy")) {
            try {
                buyItems = JSON.parse(localStorage.getItem("buy"));
                if (!Array.isArray(buyItems)) {
                    buyItems = [];
                }
            } catch(error) {
                buyItems = [];
            }
        }
        
        return buyItems;
    }
 
    #createProductListItem(product) {
        const id = product.id;

        const li = document.createElement("li");
        const aLink = this.productManager.createLink("/pages/product.html", id, "main-viewed__link");
        const productElement = this.productManager.createDiv("viewed-product");
        const image = this.productManager.createImage(product.mainImage, "viewed-product__image");
        const name = this.productManager.createName(product.name, "viewed-product__name");
        const feedback = this.productManager.createFeedback(product.feedback, "viewed-product__feedback", "viewed-product__stars");
        const price = this.productManager.createPrice(product.price, "viewed-product__price");
        const buttons = this.productManager.createButtonsBlock("viewed-product__buttons", "viewed-product__buy", "viewed-product__favorit", id);

        li.setAttribute("data-viewed-item-id", id);
        li.classList.add("main-viewed__item");

        aLink.append(productElement);
        aLink.append(image);
        aLink.append(name);
        aLink.append(feedback);
        aLink.append(price);
        aLink.append(buttons);
        li.appendChild(aLink);

        return li;
    }
}

export default Viewed;