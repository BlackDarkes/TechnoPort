import Helpers from "./helpers";

class Catalog {
    #data;
    #selector = "[data-catalog-select]";
    #url = new URL(window.location.href);
    #type;
    #search;
    #option;

    constructor() {
        this.helpers = new Helpers();
        this.selectorElement = document.querySelector(this.#selector);
        this.init();
        
    }

    async init() {
        this.#data = await this.helpers.getData();
        this.handleUrlParams();
        
        this.getSelectedOption();
        console.log(this.#option);
        this.addEventListener();
    }

    getSelectedOption() {
        this.#option = this.selectorElement.value;
    }
    
    addEventListener() {
        this.selectorElement.addEventListener("change", () => {
            this.getSelectedOption();
            this.getCatalogProduct();
        })
    }

    getCatalogProduct() {
        this.#data.forEach((product) => {
            
        })
    }

    handleUrlParams() {
        const type = this.#url.searchParams.get("type");
        const search = this.#url.searchParams.get("search");

        if (type) {
            this.#type = type;
            this.getCatalogProduct();
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

    #createCatalogProduct(type) {

    }
}

export default Catalog;