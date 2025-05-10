import CatalogManager from "./catalogManager";

class Catalog {
    #parant = "[data-popular-list]";
    #data;

    constructor(data) {
        this.#data = data;
        this.calalogManager = new CatalogManager;
        this.parantElement = document.querySelector(this.#parant);
        this.getProduct();
    }

    getProduct() {
        this.#data.forEach((product) => {
            if (product.feedback >= 4.9) {
                const id = product.id;

                const li = document.createElement("li");
                const aLink = this.calalogManager.createLink("/pages/product.html", id, "main-popular__link");
                const productElement = this.calalogManager.createDiv("popular-product");
                const image = this.calalogManager.createImage(product.mainImage, "popular-product__image");
                const name = this.calalogManager.createName(product.name, "popular-product__name");
                const feedback = this.calalogManager.createFeedback(product.feedback, "popular-product__feedback", "popular-product__stars");
                const price = this.calalogManager.createPrice(product.price, "popular-product__price");
                const buttons = this.calalogManager.createButtonsBlock("popular-product__buttons", "popular-product__buy", "popular-product__favorit");

                li.setAttribute("data-popular-item-id", id);
                li.classList.add("main-popular__item");

                aLink.append(productElement);
                aLink.append(image);
                aLink.append(name);
                aLink.append(feedback);
                aLink.append(price);
                aLink.append(buttons);
                li.appendChild(aLink);
                
                this.parantElement.appendChild(li);
            }
        })
    }
}

export default Catalog;