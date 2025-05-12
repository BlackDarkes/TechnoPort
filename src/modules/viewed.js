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

        const li = document.createElement("li");
        const aLink = this.productManager.createLink("/pages/product.html", id, "main-viewed__link");
        const productElement = this.productManager.createDiv("viewed-product");
        const image = this.productManager.createImage(product.mainImage, "viewed-product__image");
        const name = this.productManager.createName(product.name, "viewed-product__name");
        const feedback = this.productManager.createFeedback(product.feedback, "viewed-product__feedback", "viewed-product__stars");
        const price = this.productManager.createPrice(product.price, "viewed-product__price");
        const buttons = this.productManager.createButtonsBlock("viewed-product__buttons", "viewed-product__buy", "viewed-product__favorit");

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