import Helpers from "./helpers";
import ProductHorizontalManager from "./productHorizontalManager";

class Favourites {
    #parent = "[data-favourites-list]";
    #data;
    #favourites = JSON.parse(localStorage.getItem("favourites"));

    constructor() {
        this.helpers = new Helpers();
        this.productHorizontalManager = new ProductHorizontalManager();
        this.parentElement = document.querySelector(this.#parent);
        this.init();
    }

    async init() {
        this.#data = await this.helpers.getData();
        this.getProductHorizontal();
    }

    getProductHorizontal() {
        this.#favourites.forEach((id) => {
            const product = this.#data.find(product => product.id === id);

            if (product) {
                const li = this.#createProductHorizontal(product);
                this.parentElement.appendChild(li);
            }
        })
    }

    #createProductHorizontal(product) {
        const id = product.id;

        const li = document.createElement("li");
        const aLink = this.productHorizontalManager.createLink("main-favourites__link", `../../pages/product.html?id=${id}`);
        const infoBlockElement = this.productHorizontalManager.createBlock("favourites-info");
        const imageElement = this.productHorizontalManager.createImage(product.mainImage, "favourites-info__image");
        const blockTexts = this.productHorizontalManager.createBlock("favourites-info__texts");
        const nameProduct = this.productHorizontalManager.createTitle(product.name, "favourites-info__title");
        const feedbackElement = this.productHorizontalManager.createText(`Отзывы ${product.feedback}`, "favourites-info__feedback")
        const priceBlockElement = this.productHorizontalManager.createBlock("favourites-price");
        const priceElement = this.productHorizontalManager.createPrice(product.price, "favourites-price__price");


        li.setAttribute("data-favourites-id", id);
        li.classList.add("main-favourites__item");

        blockTexts.appendChild(nameProduct);
        blockTexts.appendChild(feedbackElement);
        
        infoBlockElement.appendChild(imageElement);
        infoBlockElement.appendChild(blockTexts);

        priceBlockElement.appendChild(priceElement)

        aLink.appendChild(infoBlockElement);
        aLink.appendChild(priceBlockElement);
        li.appendChild(aLink);

        return li;
    }
}

export default Favourites;