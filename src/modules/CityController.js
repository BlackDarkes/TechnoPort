class CityController {
    constructor() {
        this.citySelector = document.querySelector("[data-header-selector-city]");
        this.citySelectorMobile = document.querySelector("[data-header-mobile-selector-city]");
        this.options = this.citySelector.querySelectorAll("option");
        this.optionsMobile = this.citySelectorMobile.querySelectorAll("option")
        this.getCity();
        this.getCityMobile();
    }

    getCity() {
        if (localStorage.getItem("city")) {
            const cityStorage = localStorage.getItem("city");
            this.options.forEach((city) => {
                city.selected = city.value === cityStorage;
            })
        }
        
        this.citySelector.addEventListener("change", () => {
            const selecredCity = this.citySelector.value;
            localStorage.setItem("city", selecredCity);
        })
    }

    getCityMobile() {
        if (localStorage.getItem("city")) {
            const cityStorage = localStorage.getItem("city");
            this.optionsMobile.forEach((city) => {
                city.selected = city.value === cityStorage;
            })
        }
        
        this.citySelectorMobile.addEventListener("change", () => {
            const selecredCity = this.citySelectorMobile.value;
            localStorage.setItem("city", selecredCity);
        })
    }
}

export default CityController;