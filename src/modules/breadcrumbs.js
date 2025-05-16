import BreadcrumbsManager from "./breadcrumbsManager";
import Helpers from "./helpers";

class Breadcrumbs {
    #data;
    #url = new URLSearchParams(document.location.search);
    #id = this.#url.get("id");
    #selectors = {
        breadcrumbsCategory: "[data-breadcrumbs-category]",
        breadcrumbsType: "[data-breadcrumbs-type]",
        breadcrumbsName: "[data-breadcrumbs-name]",
    };

    constructor() {
        this.helpers = new Helpers();
        this.breadcrumbsManager = new BreadcrumbsManager(this.#selectors);
        this.init();
    }

    async init() {
        this.#data = await this.helpers.getData();
        this.getBreadcrumbs();
    }

    getBreadcrumbs() {
        const product = this.#data.find((product => product.id == this.#id));

        this.breadcrumbsManager.getCategory(product);
        this.breadcrumbsManager.getType(product);
        this.breadcrumbsManager.getName(product);
    }
}

export default Breadcrumbs;