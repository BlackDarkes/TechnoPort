class CityController {
    constructor() {
        this.citySelector = document.querySelector("[data-header-selector-city]");
        this.options = this.citySelector.querySelectorAll("option");
        this.getCity();
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
}

export default CityController;