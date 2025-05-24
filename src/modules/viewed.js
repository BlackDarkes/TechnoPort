import Helpers from "./helpers";
import HtmlBuilderView from "./HtmlBuilderView";

class Viewed {
    #visited = JSON.parse(localStorage.getItem("visited")) || [];
    #data;
    #parent = "[data-viewed-list]";

    constructor() {
        this.helpers = new Helpers();
        this.htmlBuilder = new HtmlBuilderView();
        this.parentElement = document.querySelector(this.#parent);
        this.init();
    }

    async init() {
        this.#data = await this.helpers.getData();
        this.getProductViewed();
        this.helpers.addEventListenerToBuyButton("main-viewed__item", "viewed-product__buy")
        this.helpers.buttonStopPropagation("main-viewed__item");
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