class BreadcrumbsManager {
    constructor(selectors) {
        this.breadcrumbsCategoryElement = document.querySelector(selectors.breadcrumbsCategory);
        this.breadcrumbsTypeElement = document.querySelector(selectors.breadcrumbsType);
        this.breadcrumbsNameElement = document.querySelector(selectors.breadcrumbsName);
    }

    getCategory(product) {
        switch(product.category) {
            case("components"): {
                this.breadcrumbsCategoryElement.href = `./catalog.html?type=components`;
                return this.breadcrumbsCategoryElement.textContent = "Компоненты ПК";
            }
            case("other"): {
                this.breadcrumbsCategoryElement.href = `./catalog.html?type=other`;
                return this.breadcrumbsCategoryElement.textContent = "Другая техника";
            }
            case("accessories"): {
                this.breadcrumbsCategoryElement.href = `./catalog.html?type=accessories`;
                return this.breadcrumbsCategoryElement.textContent = "Аксессуары";
            }
        }
    }

    getType(product) {
        const text = String(product.tags[0]);
        const firstLetter = text.slice(0, 1).toUpperCase();
        const mostLetter = text.slice(1).toLowerCase();

        this.breadcrumbsTypeElement.href = `./catalog.html?type=search&search=${text}`;
        return this.breadcrumbsTypeElement.textContent = firstLetter + mostLetter;
    }

    getName(product) {
        return this.breadcrumbsNameElement.textContent = product.name;
    }
}

export default BreadcrumbsManager;