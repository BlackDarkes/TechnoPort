class BasketView {
    constructor(selectors) {
        this.notPurchasesElement = document.querySelector(selectors.notPurchases);
        this.productsElement = document.querySelector(selectors.products);
        this.productListElement = document.querySelector(selectors.productList);
        this.totalPriceElement = document.querySelector(selectors.totalPrice);
        this.countProductElement = document.querySelector(selectors.countProduct);
    }

    hidePurchases(buy) {
        if (buy.length) {
            this.notPurchasesElement.style.display = "none";
        } else {
            this.productsElement.style.display = "none"
        }
    }

    getTotalPrice(data, buy) {
        let totalPrice = 0;

        const counters = document.querySelectorAll(".cart-items__counter");
        const products = document.querySelectorAll(".cart-items__item");
        
        products.forEach((product, index) => {
            const id = buy[index]; 
            const productData = data.find(item => item.id === id);
            if (productData) {
                const count = parseInt(counters[index].textContent);
                totalPrice += productData.price * count;
            }
        });

        this.totalPriceElement.textContent = totalPrice + " ₽";
    }

    updateTotalPrice(data, buy) {
        this.getTotalPrice(data, buy);
    }

    getPrice(price) {
        const count = document.querySelector(".cart-items__counter");

        return price * count.textContent + " ₽";
    }

    getCountProducts() {
        const counterElements = document.querySelectorAll(".cart-items__counter");
        let count = 0;

        counterElements.forEach((counter) => {
            count = count + parseInt(counter.textContent);
        })

        this.countProductElement.textContent = count;
    }

    deleteProductFromStorage(id) {
        let buyItems = JSON.parse(localStorage.getItem("buy"));
        buyItems = buyItems.filter((idStor) => idStor != id);

        localStorage.setItem("buy", JSON.stringify(buyItems));

        location.reload();
    }
}

export default BasketView;