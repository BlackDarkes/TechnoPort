import Helpers from "./helpers";
import HtmlBuilderView from "./HtmlBuilderView";

class CatalogSlider {
    #parent = "[data-popular-list]";
    #data;

    constructor() {
        this.helpers = new Helpers();
        this.htmlBuilder = new HtmlBuilderView();
        this.parantElement = document.querySelector(this.#parent);
        this.init();
    }

    async init() {
        this.#data = await this.helpers.getData();
        this.getProductPopular();
        this.helpers.addEventListenerToBuyButton("main-popular__item", "popular-product__buy");
        this.helpers.buttonStopPropagation("popular-product__buy");
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