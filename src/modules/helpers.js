class Helpers {
    async getData() {
        try {
            const res = await fetch("/data/data.json");

            if (!res.ok) {
                throw new Error("Не удалось получить данные!");
            }

            const data = await res.json();

            return data;
        } catch(error) {
            console.error(error);
            return [];
        }
    }

    async loadSvg(url) {
        const res = await fetch(url);

        if (!res.ok) {
            throw new Error("Не удалось загрузить SVG");
        }

        const svgText = await res.text();
        const div = document.createElement("div");

        div.innerHTML = svgText;

        return div.firstChild;
    }

    buttonStopPropagation(attr) {
        const buttonElements = document.querySelectorAll(`.${attr}`);

        buttonElements.forEach((button) => {
            button.addEventListener("click", (e) => {
                e.preventDefault();
                e.stopPropagation();
            })
        })
    }

    addEventListenerToBuyButton(itemsName, buttonName) {
        const listItemElements = document.querySelectorAll(`.${itemsName}`);

        this.#restoreBuyButtonsState(listItemElements, buttonName);

        listItemElements.forEach((item) => {
            let buyItems = this.#getBuyItemsFromStorage();

            const button = item.querySelector(`.${buttonName}`);
            if (!button) return;

            
            const id = Number(item.dataset.popularItemId || item.dataset.viewedItemId || item.dataset.catalogId || item.dataset.productId || item.dataset.favouritesId);
            if (isNaN(id)) return;
            
            if (buyItems.includes(id)) {
                this.#restoreBuyButtonsState(listItemElements, buttonName);
                return;
            }

            button.addEventListener("click", () => {
                if (!buyItems.includes(id)) {
                    buyItems.push(id);
                    localStorage.setItem("buy", JSON.stringify(buyItems));
                    button.classList.add("buy");
                    location.reload();
                } else {
                    alert("Данный товар уже находится в корзине!");
                }
            });
        });
    }

    #restoreBuyButtonsState(listItemElements, buttonName) {
        const buyItems = this.#getBuyItemsFromStorage();

        listItemElements.forEach((item) => {
            const button = item.querySelector(`.${buttonName}`);
            const id = Number(item.dataset.popularItemId || button?.dataset.popularBuyButton || item.dataset.viewedItemId || item.dataset.catalogId);
            if (!isNaN(id) && buyItems.includes(id)) {
                const buttonImage = button.querySelector(".image")

                item.classList.add("buy");
                button.classList.add("buy");

                buttonImage.src = "/images/header/Check.svg"
            }
        });
    }

    #getBuyItemsFromStorage() {
        let buyItems = [];
    
        if (localStorage.getItem("buy")) {
            try {
                buyItems = JSON.parse(localStorage.getItem("buy"));
                if (!Array.isArray(buyItems)) {
                    buyItems = [];
                }
            } catch(error) {
                buyItems = [];
            }
        }
        
        return buyItems;
    }
}

export default Helpers;