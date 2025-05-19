import SearchView from "./SearchView";

class SearchController {
    #searchSelectors = {
        input: "[data-header-search-input]",
        inputMobile: "[data-header-search-input-mobile]",
        buttonSearch: "[data-header-search-button]",
        buttonSearchMobile: "[data-header-mobile-button-search]",
    }

    constructor() {
        this.view = new SearchView(this.#searchSelectors);
        this.setupSearchHandlers();
    }

    setupSearchHandlers() {
        this.view.bindSearchEvents();
    }
}

export default SearchController;