import Helpers from "./helpers";
import HtmlBuilderView from "./HtmlBuilderView";

class FavouritesController {
    #parent = "[data-favourites-list]";
    #selectors = {
        notFound: "[data-favourites-notFound]",
    }
    #data;
    #favourites = JSON.parse(localStorage.getItem("favourites"));

    constructor() {
        this.helpers = new Helpers();
        this.htmlBuilder = new HtmlBuilderView();
        this.parentElement = document.querySelector(this.#parent);
        this.notFoundElement = document.querySelector(this.#selectors.notFound);
        this.init();
    }

    async init() {
        this.#data = await this.helpers.getData();
        this.getProductHorizontal();
        this.helpers.addEventListenerToBuyButton("favourites-price", "favourites-price__buy");
        this.helpers.buttonStopPropagation("favourites-price__buy");
        this.helpers.addEventListenerToFavoritesButton("favourites-price", "favourites-price__favorit")
        this.helpers.buttonStopPropagation("favourites-price__favorit");
        this.helpers.getCountBasket();
        this.hideNotFound();
    }

    hideNotFound() {
        if (this.#favourites.length) {
            this.notFoundElement.style.display = "none";
        } 
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

        const li = this.htmlBuilder.createListItem("main-favourites__item", "data-favourites-id", id);
        const infoBlockElement = this.htmlBuilder.createBlock("favourites-info");
        const blockTexts = this.htmlBuilder.createBlock("favourites-info__texts");
        const priceBlockElement = this.htmlBuilder.createBlock("favourites-price");
        const aLink = this.htmlBuilder.createLinkBlock(`/TechnoPort/pages/product.html?id=${id}`, "main-favourites__link");
        const imageElement = this.htmlBuilder.createImage(product.mainImage, "favourites-info__image");
        const nameProduct = this.htmlBuilder.createNameProduct(product.name, "favourites-info__title");
        const feedbackElement = this.htmlBuilder.createFeedback(product.feedback, "favourites-info__feedback")
        const priceElement = this.htmlBuilder.createPrice(product.price, "favourites-price__price");
        const buttonBuy = this.htmlBuilder.createBuyButton("favourites-price__buy");
        const buttonFavourites = this.htmlBuilder.createFavoritButton("/images/favourites/redHeart.svg", "favourites-price__favorit");

        blockTexts.appendChild(nameProduct);
        blockTexts.appendChild(feedbackElement);
        
        infoBlockElement.appendChild(imageElement);
        infoBlockElement.appendChild(blockTexts);

        priceBlockElement.setAttribute("data-favourites-id", id);

        priceBlockElement.appendChild(priceElement);
        priceBlockElement.appendChild(buttonBuy);
        priceBlockElement.appendChild(buttonFavourites);

        aLink.appendChild(infoBlockElement);
        aLink.appendChild(priceBlockElement);
        li.appendChild(aLink);

        return li;
    }
}

export default FavouritesController;