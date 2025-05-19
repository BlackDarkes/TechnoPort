import BasketView from "./basketView";
import Helpers from "./helpers";

class BasketController {
    #basketSelector = {
        notPurchases: "[data-basket-not-purchases]"
    }
    #buy = JSON.parse(localStorage.getItem("buy"));
    #data;

    constructor() {
        this.helpers = new Helpers();
        this.view = new BasketView(this.#basketSelector);
        this.init();
    }

    async init() {
        this.#data = await this.helpers.getData();
        this.view.hidePurchases(this.#buy);
    }


}

export default BasketController;