class Helpers {
    async getData() {
        try {
            const res = await fetch("/TechnoPort/data/data.json");

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

    getCountBasket() {
        const basket = document.querySelector(".header-nav__link--basket");
        const basketMobile = document.querySelector(".header-mobile__link--basket");

        const buyData = localStorage.getItem("buy");
        const arrayItems = buyData ? JSON.parse(buyData) : [];
        const length = arrayItems.length;

        basket.style.setProperty("--count", `"${length}"`);
        basketMobile.style.setProperty("--count", `"${length}"`);
    }

    addEventListenerToBuyButton(itemsName, buttonName) {
        const listItemElements = document.querySelectorAll(`.${itemsName}`);

        this.#restoreBuyButtonsState(listItemElements, buttonName);

        listItemElements.forEach((item) => {
            const button = item.querySelector(`.${buttonName}`);
            if (!button) return;
            
            
            const id = Number(item.dataset.popularItemId || item.dataset.viewedItemId || item.dataset.catalogId || item.dataset.productId || item.dataset.favouritesId);
            if (isNaN(id)) return;
            
            
            button.addEventListener("click", () => {
                let buyItems = this.#getBuyItemsFromStorage("buy");

                if (!buyItems.includes(id)) {
                    buyItems.push(id);
                    localStorage.setItem("buy", JSON.stringify(buyItems));
                    button.classList.add("buy");

                    const buttonImage = button.querySelector(".image");
                    if (buttonImage) {
                        buttonImage.src = "/TechnoPort/images/header/Check.svg";
                    }

                    location.reload();
                } else {
                    alert("Данный товар уже находится в корзине!");
                }
            });
        });
    }

    #restoreBuyButtonsState(listItemElements, buttonName) {
        const buyItems = this.#getBuyItemsFromStorage("buy");

        listItemElements.forEach((item) => {
            const button = item.querySelector(`.${buttonName}`);
            const id = Number(item.dataset.popularItemId || item.dataset.viewedItemId || item.dataset.catalogId || item.dataset.productId || item.dataset.favouritesId);
            if (!isNaN(id) && buyItems.includes(id)) {
                const buttonImage = button.querySelector(".image")

                item.classList.add("buy");
                button.classList.add("buy");

                buttonImage.src = "/TechnoPort/images/header/Check.svg"
            }
        });
    }

    addEventListenerToFavoritesButton(itemsName, buttonName) {
        this.#createFavorit();

        const listItemElements = document.querySelectorAll(`.${itemsName}`);

        this.#restoreFavoritButtonsState(listItemElements, buttonName);

        listItemElements.forEach((item) => {
            const button = item.querySelector(`.${buttonName}`);
            if (!button) return;

            const id = Number(item.dataset.popularItemId ||
                item.dataset.viewedItemId || 
                item.dataset.catalogId || 
                item.dataset.productId || 
                item.dataset.favouritesId || 
                item.dataset.deleteId);
            if (isNaN(id)) return;

            
            button.addEventListener("click", () => {
                let favouriteItems = this.#getBuyItemsFromStorage("favourites");

                if (!favouriteItems.includes(id)) {
                    favouriteItems.push(id);
                    button.classList.add("favorit");

                    this.loadSvg("/TechnoPort/images/favourites/redHeart.svg").then((image) => {
                        button.innerHTML = "";
                        button.appendChild(image);
                    })
                } else {
                    favouriteItems = favouriteItems.filter((itemId) => itemId !== id);
                    button.classList.remove("favorit");

                    this.loadSvg("/TechnoPort/images/header/heart.svg").then((image) => {
                        button.innerHTML = "";
                        button.appendChild(image);
                    })
                }

                localStorage.setItem("favourites", JSON.stringify(favouriteItems));

                if (location.href.endsWith("/index.html") || location.href.endsWith("/favourites.html")) {
                    location.reload();
                }
            });
        });
    }

    #restoreFavoritButtonsState(listItemElements, buttonName) {
        const favoritItems = localStorage.getItem("favourites");

        listItemElements.forEach((item) => {
            const button = item.querySelector(`.${buttonName}`);
            const id = Number(item.dataset.popularItemId || 
                item.dataset.viewedItemId || 
                item.dataset.catalogId || 
                item.dataset.productId || 
                item.dataset.favouritesId || 
                item.dataset.deleteId);
            if (!isNaN(id) && favoritItems.includes(id)) {
                item.classList.add("favorit");
                button.classList.add("favorit");
                this.loadSvg("/TechnoPort/images/favourites/redHeart.svg").then((image) => {
                    button.innerHTML = "";
                    button.appendChild(image);
                })
            }
        });
    }

    #getBuyItemsFromStorage(type) {
        let items = [];
    
        if (localStorage.getItem(type)) {
            try {
                items = JSON.parse(localStorage.getItem(type));
                if (!Array.isArray(items)) {
                    items = [];
                }
            } catch(error) {
                items = [];
            }
        }
        
        return items;
    }

    #createFavorit() {
        if (localStorage.getItem("favourites")) {
            return;
        } else {
            localStorage.setItem("favourites", JSON.stringify([]));
        }
    }
}

export default Helpers;