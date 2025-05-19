class BasketView {
    constructor(selectors) {
        this.notPurchasesElement = document.querySelector(selectors.notPurchases);
    }

    hidePurchases(buy) {
        if (buy) {
            this.notPurchasesElement.style.display = "none";
        }
    }
}

export default BasketView;