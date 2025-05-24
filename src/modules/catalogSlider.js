import ProductManager from "./productManager";
import Helpers from "./helpers";
import HtmlBuilderView from "./HtmlBuilderView";

class CatalogSlider {
    #parent = "[data-popular-list]";
    #data;

    constructor() {
        this.productManager = new ProductManager();
        this.helpers = new Helpers();
        this.htmlBuilder = new HtmlBuilderView();
        this.parantElement = document.querySelector(this.#parent);
        this.init();
    }

    async init() {
        this.#data = await this.helpers.getData();
        this.getProductPopular();
        this.addEventListenerToBuyButton();
        this.buttonBuyStopPropagation();
    }

    getProductPopular() {
        this.#data.forEach((product) => {
            if (product.feedback >= 4.9) {
                const li = this.#createProductListItem(product);
                this.parantElement.appendChild(li);
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
        const listItemElements = document.querySelectorAll(".main-popular__item");

        this.#restoreBuyButtonsState(listItemElements);

        listItemElements.forEach((item) => {
            let buyItems = this.#getBuyItemsFromStorage();

            const button = item.querySelector(".popular-product__buy");
            if (!button) return;

            const id = Number(button.dataset.popularBuyButton || item.dataset.popularItemId);
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
            const button = item.querySelector(".popular-product__buy");
            const id = Number(item.dataset.popularItemId || button?.dataset.popularBuyButton);
            if (!isNaN(id) && buyItems.includes(id)) {
                item.classList.add("buy");
                button.classList.add("buy")
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

        const li = this.htmlBuilder.createListItem("main-popular__item", "data-popular-item-id", id)
        const aLink = this.htmlBuilder.createNameLinkProduct(`/pages/product.html?id=${id}`, "", "main-popular__link");
        const productElement = this.htmlBuilder.createBlock("popular-product");
        const image = this.htmlBuilder.createImage(product.mainImage, "popular-product__image");
        const name = this.htmlBuilder.createNameProduct(product.name, "popular-product__name");
        const feedback = this.htmlBuilder.createFeedback(product.feedback, "popular-product__feedback");
        const price = this.htmlBuilder.createPrice(product.price, "popular-product__price");
        const buttons = this.htmlBuilder.createButtonBlock("popular-product__buttons", "popular-product__buy", "popular-product__favorit", "data-popular-buy-button", id);

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

export default CatalogSlider;