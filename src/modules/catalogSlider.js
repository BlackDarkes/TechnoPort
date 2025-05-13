import ProductManager from "./productManager";
import Helpers from "./helpers";

class CatalogSlider {
    #parent = "[data-popular-list]";
    #data;

    constructor() {
        this.productManager = new ProductManager();
        this.helpers = new Helpers();
        this.parantElement = document.querySelector(this.#parent);
        this.init();
    }

    async init() {
        this.#data = await this.helpers.getData();
        this.getProductPopular();
    }

    getProductPopular() {
        this.#data.forEach((product) => {
            if (product.feedback >= 4.9) {
                const li = this.#createProductListItem(product);
                this.parantElement.appendChild(li);
            }
        })
    }

    #createProductListItem(product) {
        const id = product.id;

        const li = document.createElement("li");
        const aLink = this.productManager.createLink("/pages/product.html", id, "main-popular__link");
        const productElement = this.productManager.createDiv("popular-product");
        const image = this.productManager.createImage(product.mainImage, "popular-product__image");
        const name = this.productManager.createName(product.name, "popular-product__name");
        const feedback = this.productManager.createFeedback(product.feedback, "popular-product__feedback", "popular-product__stars");
        const price = this.productManager.createPrice(product.price, "popular-product__price");
        const buttons = this.productManager.createButtonsBlock("popular-product__buttons", "popular-product__buy", "popular-product__favorit");

        li.setAttribute("data-popular-item-id", id);
        li.classList.add("main-popular__item");

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