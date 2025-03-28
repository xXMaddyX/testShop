import { Storage, FootData } from "./footData.js";
import PiepsSignals from "./PiepsSignals.js";
import { SignalNames } from "./main.js";

export default class Pizza extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode: "open"});
    };

    connectedCallback() {
        this.type = this.getAttribute("type");
        this.name = this.getAttribute("name");
        this.price = this.getAttribute("price");
        this.createPizza();
    };

    createPizza() {
        const PizzaContainer = document.createElement("div");
        PizzaContainer.classList.add("pizza");

        const PizzaName = document.createElement("h2");
        PizzaName.textContent = this.name;

        const Price = document.createElement("p");
        Price.textContent = `${this.price} €`;

        this.addToCardButton = document.createElement("button");
        this.addToCardButton.textContent = "Add to Card";
        this.addToCardButton.addEventListener("click", () => {
            let data = {
                itemType: this.type,
                itemName: this.name,
                itemPrice: Number(this.price)
            };
            PiepsSignals.emitSignal(SignalNames.addToCard, data);
        });

        PizzaContainer.append(PizzaName, Price, this.addToCardButton);
        this.shadowRoot.append(PizzaContainer);

        /**@type {HTMLElement} */
        const Pizza = this.shadowRoot.querySelector(".pizza")
        Pizza.style.border = "1px solid black";
        Pizza.style.padding = "20px";
        Pizza.style.marginTop = "10px";
    };
};