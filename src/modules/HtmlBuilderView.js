import Helpers from "./helpers";
import heart from "/images/header/heart.svg";

class HtmlBuilderView {
    constructor() {
        this.helper = new Helpers();
    }

    createListItem(className, dataAttrName, dataAttrValue) {
        const li = document.createElement("li");
        li.classList.add(className);

        if (dataAttrName && dataAttrValue) {
            li.setAttribute(dataAttrName, dataAttrValue);
        }

        return li;
    }

    createLinkBlock(href, className) {
        const a = document.createElement("a");
        a.href = href;
        a.classList.add(className);

        return a;
    }
    
    createBlock(className) {
        const div = document.createElement("div");
        div.classList.add(className);

        return div;
    }

    createImage(src, className) {
        const img = document.createElement("img");
        img.src = src;
        img.classList.add(className);

        return img;
    }

    createNameProduct(text, className) {
        return this.createText("h2", text, className)
    }

    createNameLinkProduct(href, text, className) {
        const a = this.createText("a", text, className);
        a.href = href;

        return a;
    }

    createFeedback(text, className) {
        return this.createText("p", `Отзывы ${text}`, className);
    }

    createPrice(text, className) {
        return this.createText("p", `${text} ₽`, className);
    }

    createBuyButton(className) {
        return this.createButtonWithImage("/images/category/shoppingCartWhite.svg", className)
    }

    createFavoritButton(src, className) {
        return this.createButtonWithImage(src, className)
    }

    createButton(text, className) {
        const button = document.createElement("button");
        button.textContent = text;
        button.classList.add(className);

        return button;
    }

    createText(tag, text, className) {
        const element = document.createElement(tag)
        element.textContent = text;
        element.classList.add(className);

        return element;
    }

    createButtonWithImage(src, className) {
        const button = this.createButton("", className);
        const img = this.createImage(src);
        img.classList.add("image")
        
        button.appendChild(img);

        return button;
    }

    createButtonFavorit(className) {
        const buttonfFavorit = this.createButton("", className);

        this.helper.loadSvg(heart).then(svgElement => {
            svgElement.classList.add("viewed-product__svg")
            buttonfFavorit.appendChild(svgElement);
        });

        return buttonfFavorit;
    }

    createOption(text) {
        const option = document.createElement("option");
        option.value = text;

        return option;
    }

    createButtonBlock(blockName, buyName, favoritName, dataAttr, id) {
        const div = this.createBlock(blockName)
        const buttonBuy = this.createButton("", buyName);
        const buttonfFavorit = this.createButtonFavorit(favoritName);
        const imageBuy = this.createImage("/images/category/shoppingCartWhite.svg", "image");

        buttonBuy.setAttribute(dataAttr, id);

        buttonBuy.appendChild(imageBuy);
        div.appendChild(buttonBuy);
        div.appendChild(buttonfFavorit);

        return div;
    }
}

export default HtmlBuilderView;