import Helpers from "./helpers";
import MainView from "./MainView";

class MainController {
    #mainSelectors = {
        nameLogin: "[data-header-login-name]",
    };

    constructor() {
        this.view = new MainView(this.#mainSelectors);
        this.helpers = new Helpers()
        this.view.renameButton();
        this.view.createBuy();
        this.helpers.getCountBasket();
    }
}

export default MainController;