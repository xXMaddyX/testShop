import PiepsSignals from "./PiepsSignals.js";
import { SignalNames } from "./main.js";

export default class Schnitzel extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode: "open"});
    };

    connectedCallback() {
        this.type = this.getAttribute("type");
        this.name = this.getAttribute("name");
        this.price = this.getAttribute("price");
        this.createSchnitzel();
    };

    createSchnitzel() {
        const schnutzelContainer = document.createElement("div");
        schnutzelContainer.classList.add("schnitzel");

        const SchnitzelName = document.createElement("h2");
        SchnitzelName.textContent = this.name;

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

        schnutzelContainer.append(SchnitzelName, Price, this.addToCardButton);
        this.shadowRoot.append(schnutzelContainer);

        /**@type {HTMLElement} */
        const schnitzel = this.shadowRoot.querySelector(".schnitzel")
        schnitzel.style.border = "1px solid black";
        schnitzel.style.padding = "20px";
        schnitzel.style.marginTop = "10px";
    };
};