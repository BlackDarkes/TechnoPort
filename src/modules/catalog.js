import Helpers from "./helpers";
import ProductHorizontalManager from "./productHorizontalManager";

class Catalog {
    #data;
    #selectors = {
        selector: "[data-catalog-select]",
        parent: "[data-catalog-list]",
        title: "[data-catalog-name]",
    };
    #nameCatalog = {
        stocks: "Акции",
        popular: "Популярное",
        components: "Запчасти ПК",
        other: "Другая техника",
        accessories: "Аксессуары"
    }
    #url = new URL(window.location.href);
    #type;
    #search;
    #option;

    constructor() {
        this.helpers = new Helpers();
        this.productHorizontalManager = new ProductHorizontalManager();
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
        this.#data.forEach((product) => {
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

            this.titleElement.textContent = this.#nameCatalog[this.#type] || this.getSearchTitle();
        })
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

        const li = document.createElement("li");
        const aLink = this.productHorizontalManager.createLink("main-products__link", `../../pages/product.html?id=${id}`);
        const infoBlockElement = this.productHorizontalManager.createBlock("main-products__info");
        const imageElement = this.productHorizontalManager.createImage(product.mainImage, "main-products__image");
        const blockTexts = this.productHorizontalManager.createBlock("main-products__texts");
        const nameProduct = this.productHorizontalManager.createTitle(product.name, "main-products__title");
        const feedbackElement = this.productHorizontalManager.createText(`Отзывы ${product.feedback}`, "main-products__feedback");
        const priceBlockElement = this.productHorizontalManager.createBlock("main-products__price");
        const priceElement = this.productHorizontalManager.createPrice(product.price, "main-products__cost");
        const buttonBuy = this.productHorizontalManager.createBuyButton("", "main-products__buy");
        const buttonFavourites = this.productHorizontalManager.createFavoritButton("", "main-products__favorit");


        li.setAttribute("data-catalog-id", id);
        li.classList.add("main-products__item");

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

export default Catalog;