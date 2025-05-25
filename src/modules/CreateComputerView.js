class CreateComputerView {
    constructor(selectors) {
        this.componentsListElement = document.querySelectorAll(selectors.componentsList);
    }

    addToBuy(data) {
        const buyButton = document.querySelector("[data-create-buy-button]");
        const inputElements = document.querySelectorAll(".createComputer__input");
        const errorElement = document.querySelector("[data-create-error]");
        let buyIndex = 0;
        

        inputElements.forEach((input) => {
            input.addEventListener("change", () => {
                if (input.value) {
                    buyIndex++;
                    console.log(buyIndex)
                } else {
                    buyIndex--;
                }
            })
        })
        
        buyButton.addEventListener("click", () => {
            localStorage.setItem("buy", JSON.stringify([]));

            inputElements.forEach((input) => {
                if (buyIndex !== 8) {
                    return errorElement.textContent = "Не все компоненты выбраны!";
                } else {
                    const buy = JSON.parse(localStorage.getItem("buy"));
                    const product = data.find((product) => product.name == input.value);
                    
                    buy.push(product.id);
                    
                    localStorage.setItem("buy", JSON.stringify(buy));
                    location.href  = "/pages/basket.html";
                    return errorElement.innerHTML = "";
                }
            })
        })
    }
}

export default CreateComputerView;