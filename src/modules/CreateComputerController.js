import CreateComputerView from "./CreateComputerView";
import HtmlBuilderView from "./HtmlBuilderView";
import Helpers from "./helpers";

class CreateComputerController {
    #createSelectors = {
        componentsList: "[data-create-components-list]",
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
    }

    addOptionToList() {
        this.view.componentsListElement.forEach((component) => {
            this.#data.forEach((product) => {
                switch(component.id) {
                    case("processor"): {
                        this.setOption(product, component, "процессор", "процессор");

                        break;
                    }
                    case ("motherboard"): {
                        this.setOption(product, component, "материнская плата", "материнская плата");

                        break;
                    }
                    case("power"): {
                        this.setOption(product, component, "питание", "блок питания");

                        break;
                    }
                    case("corpus"): {
                        this.setOption(product, component, "корпус", "корпус");

                        break;
                    }
                    case("card"): {
                        this.setOption(product, component, "видеокарта", "видеокарта");

                        break;
                    }
                    case("cooling"): {
                        this.setOption(product, component, "кулер", "Кулер для процессора");

                        break;
                    }
                    case("ram"): {
                        this.setOption(product, component, "оперативная память", "оперативная память");

                        break;
                    }
                    case("storage"): {
                        this.setOption(product, component, "накопитель", "");

                        break;
                    }
                }
            })
        })
    }

    setOption(product, component, type, text) {
        const name = product.tags[0] === type;
        const length = text.split("").length + 1;

        if (name) {
            const productName = String(product.name);
            const productNameSlice = productName.slice(length);
            const option = this.htmlBuilder.createOption(productNameSlice);
            component.appendChild(option)
        }
    }
}

export default CreateComputerController;