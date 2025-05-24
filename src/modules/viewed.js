import Helpers from "./helpers";
import ProductManager from "./productManager";
import HtmlBuilderView from "./HtmlBuilderView";

class Viewed {
    #visited = JSON.parse(localStorage.getItem("visited")) || [];
    #data;
    #parent = "[data-viewed-list]";

    constructor() {
        this.helpers = new Helpers();
        this.productManager = new ProductManager();
        this.htmlBuilder = new HtmlBuilderView();
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
        const buttonBuyElements = document.querySelectorAll("[data-viewed-buy-button]");

        buttonBuyElements.forEach((button) => {
            button.addEventListener("click", (e) => {
                e.preventDefault();
                e.stopPropagation();
            })
        })
    }

    addEventListenerToBuyButton() {
        const listItemElements = document.querySelectorAll(".main-viewed__item");

        this.#restoreBuyButtonsState(listItemElements);

        listItemElements.forEach((item) => {
            let buyItems = this.#getBuyItemsFromStorage();

            const button = item.querySelector(".viewed-product__buy");
            if (!button) return;

            const id = Number(button.dataset.viewedBuyButton || item.dataset.viewedItemId);
            if (isNaN(id)) return;

            if (buyItems.includes(id)) {
                this.#restoreBuyButtonsState(listItemElements);
                return;
            }

            button.addEventListener("click", () => {
                if (!buyItems.includes(id)) {
                    buyItems.push(id);
                    localStorage.setItem("buy", JSON.stringify(buyItems));
                    button.classList.add("buy");
                    location.reload();
                } else {
                    alert("Данный товар уже находится в корзине!");
                }
            });
        });
    }

    #restoreBuyButtonsState(listItemElements) {
        const buyItems = this.#getBuyItemsFromStorage();

        listItemElements.forEach((item) => {
            const button = item.querySelector(".viewed-product__buy");
            const id = Number(button.dataset.viewedBuyButton || item.dataset.viewedItemId);
            if (!isNaN(id) && buyItems.includes(id)) {
                item.classList.add("buy");
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

        const li = this.htmlBuilder.createListItem("main-viewed__item", "data-viewed-item-id", id);
        const aLink = this.htmlBuilder.createNameLinkProduct(`/pages/product.html?id=${id}`, "", "main-viewed__link");
        const productElement = this.htmlBuilder.createBlock("viewed-product");
        const image = this.htmlBuilder.createImage(product.mainImage, "viewed-product__image");
        const name = this.htmlBuilder.createNameProduct(product.name, "viewed-product__name");
        const feedback = this.htmlBuilder.createFeedback(product.feedback, "viewed-product__feedback");
        const price = this.htmlBuilder.createPrice(product.price, "viewed-product__price");
        const buttons = this.htmlBuilder.createButtonBlock("viewed-product__buttons", "viewed-product__buy", "viewed-product__favorit", "data-viewed-buy-button", id);

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