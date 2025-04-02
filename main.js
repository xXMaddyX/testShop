import { FootData, Storage } from "./footData.js";
import PiepsSignals from "./PiepsSignals.js";
import Pizza from "./pizza.js";
import Schnitzel from "./schnitzel.js";
import ShopCard from "./shopCard.js";

customElements.define("pizza-item", Pizza);
customElements.define("schnitzel-item", Schnitzel);
customElements.define("shop-card", ShopCard);

const SignalNames = {
    addToCard: "addToCard",
    incraseCounter: "incraseCounter",
    decraseCounter: "decraseCounter",
};

const initSignals = () => {
    PiepsSignals.createSignal("addToCard");
    PiepsSignals.createSignal("incraseCounter");
    PiepsSignals.createSignal("decraseCounter");
};

document.addEventListener("DOMContentLoaded", () => {
    initSignals();
    FootData.Pizzas.forEach((item) => {
        let pizza = document.createElement("pizza-item");
        pizza.setAttribute("type", item.type);
        pizza.setAttribute("name", item.name);
        pizza.setAttribute("price", item.price.toFixed(2));
        document.querySelector(".pizzas").append(pizza);
    });

    FootData.Schnitzel.forEach((item) => {
        let schnitzel = document.createElement("schnitzel-item");
        schnitzel.setAttribute("type", item.type);
        schnitzel.setAttribute("name", item.name);
        schnitzel.setAttribute("price", item.price.toFixed(2));
        document.querySelector(".schnitzels").append(schnitzel);
    });

    let shopCard = document.createElement("shop-card");
    document.querySelector("#card").append(shopCard);
});

export {
    SignalNames
}