import BasketView from "./basketView";
import Helpers from "./helpers";
import HtmlBuilderView from "./HtmlBuilderView";

class BasketController {
    #PRODUCT_URL = "/pages/product.html?id=";
    #basketSelector = {
        notPurchases: "[data-basket-not-purchases]",
        products: "[data-busket-products]",
        productList: "[data-basket-product-list]",
        totalPrice: "[data-basket-totalPrice]",
        countProduct: "[data-basket-count]",
        createOrder: "[data-basket-createOrder]",
        clearAll: "[data-basket-clearAll]",
    }
    #buy = JSON.parse(localStorage.getItem("buy"));
    #data;

    constructor() {
        this.helpers = new Helpers();
        this.view = new BasketView(this.#basketSelector);
        this.htmlBuilder = new HtmlBuilderView();
        this.init();
    }

    async init() {
        this.#data = await this.helpers.getData();
        this.view.hidePurchases(this.#buy);
        this.getProductsInBusket();
        this.view.getTotalPrice(this.#data, this.#buy);
        this.view.getCountProducts();
        this.view.createOrder(this.#data, this.#buy);
        this.view.clearAll();
    }

    getProductsInBusket() {
        this.#buy.forEach((id) => {
            const product = this.#data.find((product) => product.id === id);

            this.view.productListElement.appendChild(this.createProductInBusket(product, id));
        })
    }

    createProductInBusket(product, id) {
        const li = this.htmlBuilder.createListItem("cart-items__item");
        const infoBlock = this.htmlBuilder.createBlock("cart-items__info");
        const mainImage = this.htmlBuilder.createImage(product.mainImage, "cart-items__image");
        const textsBlock = this.htmlBuilder.createBlock("cart-items__text");
        const linkName = this.htmlBuilder.createNameLinkProduct(`${this.#PRODUCT_URL}${id}`, product.name, "cart-items__title");
        const countBlock = this.htmlBuilder.createBlock("cart-items__count");
        const buttonPreview = this.htmlBuilder.createButton("-", "cart-items__mines");
        const counter = this.htmlBuilder.createText("p", "1", "cart-items__counter");
        const buttonNext = this.htmlBuilder.createButton("+", "cart-items__add");
        const mainPriceBlock = this.htmlBuilder.createBlock("cart-items__mainPrice");
        const mainPrice = this.htmlBuilder.createText("span", `${product.price} ₽ / шт`);

        const priceBlock = this.htmlBuilder.createBlock("cart-items__price");
        const cost = this.htmlBuilder.createPrice(product.price, "cart-items__cost");
        const buttonsBlock = this.htmlBuilder.createBlock("cart-items__buttons");
        const buyButton = this.htmlBuilder.createFavoritButton("/images/header/heart.svg", "cart-items__button");
        const deleteButton = this.htmlBuilder.createButtonWithImage("/images/basket/Trash.png", "cart-items__button");

        deleteButton.addEventListener("click", () => {
            this.view.deleteProductFromStorage(id);
        })

        buttonNext.addEventListener("click", () => {
            const currentCount = parseInt(counter.textContent);
            if (currentCount > 9) return;
            
            counter.textContent = currentCount + 1;
            this.view.getTotalPrice(this.#data, this.#buy);
            cost.textContent = this.view.getPrice(product.price);
            this.view.getCountProducts();
        })


        buttonPreview.addEventListener("click", () => {
            const currentCount = parseInt(counter.textContent);
            if (currentCount < 2) {
                this.view.deleteProductFromStorage(id);
                return;
            }
            
            counter.textContent = currentCount - 1;
            this.view.getTotalPrice(this.#data, this.#buy);
            cost.textContent = this.view.getPrice(product.price);
            this.view.getCountProducts();
        })
        
        buyButton.classList.add("cart-items__button--favorit");
        deleteButton.classList.add("cart-items__button--delete");

        buttonsBlock.appendChild(buyButton);
        buttonsBlock.appendChild(deleteButton);

        mainPriceBlock.appendChild(mainPrice);

        countBlock.appendChild(buttonPreview);
        countBlock.appendChild(counter);
        countBlock.appendChild(buttonNext);

        textsBlock.appendChild(linkName);
        textsBlock.appendChild(countBlock);
        textsBlock.appendChild(mainPriceBlock);

        infoBlock.appendChild(mainImage);
        infoBlock.appendChild(textsBlock);
        priceBlock.appendChild(cost);
        priceBlock.appendChild(buttonsBlock)

        li.appendChild(infoBlock);
        li.appendChild(priceBlock);

        return li;
    }
}

export default BasketController;