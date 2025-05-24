import HtmlBuilderView from "./HtmlBuilderView";

class BasketView {
    constructor(selectors) {
        this.notPurchasesElement = document.querySelector(selectors.notPurchases);
        this.productsElement = document.querySelector(selectors.products);
        this.productListElement = document.querySelector(selectors.productList);
        this.totalPriceElement = document.querySelector(selectors.totalPrice);
        this.countProductElement = document.querySelector(selectors.countProduct);
        this.createOrderElement = document.querySelector(selectors.createOrder);
        this.clearAllButtonElement = document.querySelector(selectors.clearAll);

        this.htmlBuilder = new HtmlBuilderView();
    }

    hidePurchases(buy) {
        if (buy.length) {
            this.notPurchasesElement.style.display = "none";
            this.clearAllButtonElement.style.display = "block"
        } else {
            this.productsElement.style.display = "none"
            this.clearAllButtonElement.style.display = "none";
        }
    }

    getTotalPrice(data, buy) {
        this.totalPriceElement.textContent = this.totalPrice(data, buy) + " ₽";
    }

    totalPrice(data, buy) {
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

        return totalPrice;
    }

    updateTotalPrice(data, buy) {
        this.getTotalPrice(data, buy);
    }

    getPrice(price) {
        const count = document.querySelector(".cart-items__counter");

        return price * count.textContent + " ₽";
    }

    getCountProducts() {
        this.countProductElement.textContent = this.countProduct();
    }

    countProduct() {
        const counterElements = document.querySelectorAll(".cart-items__counter");
        let count = 0;

        counterElements.forEach((counter) => {
            count = count + parseInt(counter.textContent);
        })

        return count;
    }

    deleteProductFromStorage(id) {
        let buyItems = JSON.parse(localStorage.getItem("buy"));
        buyItems = buyItems.filter((idStor) => idStor != id);

        localStorage.setItem("buy", JSON.stringify(buyItems));

        location.reload();
    }

    createOrder(data, buy) {
        this.createOrderElement.addEventListener("click", () => {
            if (localStorage.getItem("login")) {
                let orderStorage = localStorage.getItem("orders");
                const order = [buy, this.totalPrice(data, buy), this.countProduct()];

                if (orderStorage) {
                    const orderArray = JSON.parse(orderStorage);
                    orderArray.push(order)

                    localStorage.setItem("orders", JSON.stringify(orderArray))
                } else {
                    localStorage.setItem("orders", JSON.stringify([order]));
                }

                alert("Ваш заказ вы можете увидеть у себя в аккаунте!")
                localStorage.setItem("buy", JSON.stringify([]));
                console.log(this.productListElement);
                location.reload();
            } else {
                alert("Сначало авторизуйтесь, чтобы оформить заказ!")
            }
        })
    }

    clearAll() {
        this.clearAllButtonElement.addEventListener("click", () => {
            localStorage.setItem("buy", JSON.stringify([]));
            location.reload(); 
        })
    }
}

export default BasketView;