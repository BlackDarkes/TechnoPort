import MainView from "./MainView";

class MainController {
    #mainSelectors = {
        nameLogin: "[data-header-login-name]",
    };

    constructor() {
        this.view = new MainView(this.#mainSelectors);
        this.view.renameButton();
        this.view.createBuy();
    }
}

export default MainController;