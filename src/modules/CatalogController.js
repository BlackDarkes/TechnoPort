import Helpers from "./helpers";
import HtmlBuilderView from "./HtmlBuilderView";

class CatalogController {
    #data;
    #selectors = {
        selector: "[data-catalog-select]",
        parent: "[data-catalog-list]",
        title: "[data-catalog-name]",
    };
    #nameCatalog = {
        stocks: "Акции",
        popular: "Популярное",
        components: "Компоненты ПК",
        other: "Другая техника",
        accessories: "Аксессуары"
    }
    #url = new URL(window.location.href);
    #type;
    #search;
    #option;

    constructor() {
        this.helpers = new Helpers();
        this.htmlBuilder = new HtmlBuilderView();
        this.selectorElement = document.querySelector(this.#selectors.selector);
        this.parentElement = document.querySelector(this.#selectors.parent);
        this.titleElement = document.querySelector(this.#selectors.title);
        this.init();
    }

    async init() {
        this.#data = await this.helpers.getData();
        this.handleUrlParams();
        this.getCatalogProduct();
        this.getSelectedOption();
        this.addEventListener();
        this.helpers.addEventListenerToBuyButton("main-products__item", "main-products__buy")
        this.helpers.buttonStopPropagation("main-products__buy");
        this.helpers.addEventListenerToFavoritesButton("main-products__item", "main-products__favorit")
        this.helpers.buttonStopPropagation("main-products__favorit");
        this.helpers.getCountBasket();
    }

    getSelectedOption() {
        this.#option = this.selectorElement.value;
    }
    
    addEventListener() {
        this.selectorElement.addEventListener("change", () => {
            this.getSelectedOption();
            this.parentElement.innerHTML = "";
            this.getCatalogProduct()

            console.log(this.#option);
        })
    }

    getCatalogProduct() {
        this.parentElement.innerHTML = "";

        let filterProducts = this.#data;

        filterProducts = filterProducts.sort((a, b) => b.feedback - a.feedback);

        if (this.#option === "popular") {
            filterProducts = filterProducts.sort((a, b) => b.feedback - a.feedback);
        }

        if (this.#option === "low-price") {
            filterProducts = filterProducts.sort((a, b) => a.price - b.price);
        } else if (this.#option === "more-price") {
            filterProducts = filterProducts.sort((a, b) => b.price - a.price);
        }

        filterProducts.forEach((product) => {
            if (this.#type === "search") {
                product.tags.forEach((tag) => {
                    if (tag === this.#search) {
                        const li = this.#createCatalogProduct(product);
                        this.parentElement.appendChild(li);
                    }
                })
            }

            if (product.category === this.#type && this.#type !== "stocks" && this.#type !== "popular") {
                const li = this.#createCatalogProduct(product);
                this.parentElement.appendChild(li);
            }
            

            if (product.discount && this.#type === "stocks") {
                const li = this.#createCatalogProduct(product);
                this.parentElement.appendChild(li)
            }

            if (product.feedback >= 4.9 && this.#type === "popular") {
                const li = this.#createCatalogProduct(product);
                this.parentElement.appendChild(li)
            }
        })

        this.titleElement.textContent = this.#nameCatalog[this.#type] || this.getSearchTitle();
    }

    getSearchTitle() {
        const text = String(this.#search);
        const firstLetter = text.slice(0, 1).toUpperCase();
        const letters = text.slice(1, text.length).toLowerCase();

        return firstLetter + letters;
    }

    handleUrlParams() {
        const type = this.#url.searchParams.get("type");
        const search = this.#url.searchParams.get("search");

        if (type) {
            this.#type = type;
        }

        if (search) {
            this.#search = search;
        }
    }

    getTypeParamUrl() {
        return this.#url.searchParams.get("type");
    }

    getSerchParam() {
        return this.#url.searchParams.get("search") || null;
    }

    #createCatalogProduct(product) {
        const id = product.id;

        const li = this.htmlBuilder.createListItem("main-products__item", "data-catalog-id", id);
        const aLink = this.htmlBuilder.createLinkBlock(`../../pages/product.html?id=${id}`, "main-products__link");
        const infoBlockElement = this.htmlBuilder.createBlock("main-products__info");
        const imageElement = this.htmlBuilder.createImage(product.mainImage, "main-products__image");
        const blockTexts = this.htmlBuilder.createBlock("main-products__texts");
        const nameProduct = this.htmlBuilder.createNameProduct(product.name, "main-products__title");
        const feedbackElement = this.htmlBuilder.createFeedback(product.feedback, "main-products__feedback");
        const priceBlockElement = this.htmlBuilder.createBlock("main-products__price");
        const priceElement = this.htmlBuilder.createPrice(product.price, "main-products__cost");
        const buttonBuy = this.htmlBuilder.createBuyButton("main-products__buy");
        const buttonFavourites = this.htmlBuilder.createButtonFavorit("main-products__favorit");

        blockTexts.appendChild(nameProduct);
        blockTexts.appendChild(feedbackElement);
        
        infoBlockElement.appendChild(imageElement);
        infoBlockElement.appendChild(blockTexts);

        priceBlockElement.appendChild(priceElement);
        priceBlockElement.appendChild(buttonBuy);
        priceBlockElement.appendChild(buttonFavourites);

        aLink.appendChild(infoBlockElement);
        aLink.appendChild(priceBlockElement);
        li.appendChild(aLink);

        return li;
    }
}

export default CatalogController;