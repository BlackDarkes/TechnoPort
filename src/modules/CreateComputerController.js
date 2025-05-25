import CreateComputerView from "./CreateComputerView";
import HtmlBuilderView from "./HtmlBuilderView";
import Helpers from "./helpers";

class CreateComputerController {
    #createSelectors = {
        componentsList: "[data-create-components-list]",
        infoBlock: "[data-create-blockInfo]",
        imageProduct: "[data-create-image]",
    };
    #data;

    constructor() {
        this.htmlBuilder = new HtmlBuilderView();
        this.helpers = new Helpers();
        this.view = new CreateComputerView(this.#createSelectors);
        this.init();
    }

    async init() {
        this.#data = await this.helpers.getData();
        this.addOptionToList();
        this.view.addToBuy(this.#data);
        this.helpers.getCountBasket()
    }

    addOptionToList() {
        this.view.componentsListElement.forEach((component) => {
            this.#data.forEach((product) => {
                switch(component.id) {
                    case("processor"): {
                        this.setOption(product, component, "процессор");

                        break;
                    }
                    case ("motherboard"): {
                        this.setOption(product, component, "материнская плата");

                        break;
                    }
                    case("power"): {
                        this.setOption(product, component, "питание");

                        break;
                    }
                    case("corpus"): {
                        this.setOption(product, component, "корпус");

                        break;
                    }
                    case("card"): {
                        this.setOption(product, component, "видеокарта");

                        break;
                    }
                    case("cooling"): {
                        this.setOption(product, component, "кулер");

                        break;
                    }
                    case("ram"): {
                        this.setOption(product, component, "оперативная память");

                        break;
                    }
                    case("storage"): {
                        this.setOption(product, component, "накопитель");

                        break;
                    }
                }
            })
        })
    }

    setOption(product, component, type) {
        const name = product.tags[0] === type;

        if (name) {
            const productName = String(product.name);
            const productNameSlice = productName.slice(length);
            const option = this.htmlBuilder.createOption(productNameSlice);
            component.appendChild(option)
        }
    }
}

export default CreateComputerController;