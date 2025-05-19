class SearchView {
    #SEARCH_URL = "/pages/catalog.html?type=search&search=";

    constructor(selectors) {
        this.inputElement = document.querySelector(selectors.input)
        this.inputMobileElement = document.querySelector(selectors.inputMobile);
        this.buttonSearchElement = document.querySelector(selectors.buttonSearch)
        this.buttonSearchMobileElement = document.querySelector(selectors.buttonSearchMobile)
    }

    bindSearchEvents() {
        this.buttonSearchElement.addEventListener("click", () => {
            this.#handleSearch(this.inputElement);
        })

        this.buttonSearchMobileElement.addEventListener("click", () => {
            this.#handleSearch(this.inputMobileElement);
        })

        this.inputElement.addEventListener("keypress", (e) => {
            if (e.key === "Enter") this.#handleKeyPress(this.inputElement);
        })

        this.inputMobileElement.addEventListener("keypress", (e) => {
            if (e.key === "Enter")this.#handleKeyPress(this.inputMobileElement);
        })
    }

    #getSanitizedQuery(input) {
        return input.value.trim().toLowerCase();
    }

    #handleSearch(inputElement) {
        const inputText = this.#getSanitizedQuery(inputElement);

        if (inputText) {
            window.location.href = `${this.#SEARCH_URL}${inputText}`;
        }
    }

    #handleKeyPress(inputElement) {
        return this.#handleSearch(inputElement)
    }
}

export default SearchView;