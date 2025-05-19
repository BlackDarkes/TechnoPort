import BreadcrumbsView from "./BreadcrumbsView";
import Helpers from "./helpers";

class BreadcrumbsController {
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
        this.breadcrumbsView = new BreadcrumbsView(this.#selectors);
        this.init();
    }

    async init() {
        this.#data = await this.helpers.getData();
        this.getBreadcrumbs();
    }

    getBreadcrumbs() {
        const product = this.#data.find((product => product.id == this.#id));

        this.breadcrumbsView.getCategory(product);
        this.breadcrumbsView.getType(product);
        this.breadcrumbsView.getName(product);
    }
}

export default BreadcrumbsController;