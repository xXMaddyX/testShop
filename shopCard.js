import PiepsSignals from "./PiepsSignals.js";
import { SignalNames } from "./main.js";
import { Storage, CardPools } from "./footData.js";

export default class ShopCard extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode: "open"});
    };

    debugLogger() {
        console.clear();
        console.table(CardPools.pizzaPool);
        console.table(CardPools.schnitzelPool);
    };

    connectedCallback() {
        PiepsSignals.connectSignal(SignalNames.addToCard, (data) => {
            this.addItemToCardPool(data);
            //this.debugLogger();
            this.updateItemContainer();
            this.updateTotalPrice();
        });
        this.createCardContainer();
    };

    createCardContainer() {
        const cardContainer = document.createElement("div");
        cardContainer.classList.add("card-container");

        const cardTitel = document.createElement("h2");
        cardTitel.textContent = "Warenkorb";

        const itemContainer = document.createElement("div");
        itemContainer.classList.add("item-container");

        const totalPrice = document.createElement("h3");
        totalPrice.classList.add("total-price");
        totalPrice.textContent = "Total Price: 0€";

        cardContainer.append(cardTitel, itemContainer, totalPrice);

        const compnentCSS = document.createElement("style");
        compnentCSS.textContent = `
            .card-container {
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
            }   

            .item-container {
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
            }
            
            .foot-item {
                display: flex;
                color: white;
                text-shadow: 1px 1px 1px black;
                background-color: gray;
                flex-direction: row;
                align-items: center;
                justify-content: center;
                gap: 10px;
                padding: 10px;
                width: 100%;
                border: 1px solid black;
            }

        `

        this.shadowRoot.append(cardContainer, compnentCSS);
    };

    createItem(data) {
        const item = document.createElement("div");
        item.classList.add("foot-item");

        const itemName = document.createElement("h3");
        itemName.textContent = data[0].itemName;
        itemName.textContent = `${data[0].itemType}: ${data[0].itemName}`

        const itemPrice = document.createElement("h4");
        itemPrice.textContent = `${data[0].itemPrice.toFixed(2)}€`;

        const itemAmount = document.createElement("h4");
        itemAmount.textContent = `x${data.length}`;

        const buttonContainer = document.createElement("div");

        const addButton = document.createElement("button");
        addButton.textContent = "+";
        addButton.addEventListener("click", () => {
            console.clear();
            this.incraseItemAmount(data);
            this.updateItemContainer();
            this.updateTotalPrice();
        });

        const removeButton = document.createElement("button");
        removeButton.textContent = "-";
        removeButton.addEventListener("click", () => {
            this.decraseItemAmount(data);
            this.updateItemContainer();
            this.updateTotalPrice();
        });

        buttonContainer.append(addButton, removeButton);

        item.append(itemName, itemPrice, itemAmount, buttonContainer);

        return item;
    };

    updateItemContainer() {
        let itemContainer = this.shadowRoot.querySelector(".item-container");
        itemContainer.innerHTML = "";
        
        Object.values(CardPools).forEach(pool => {
            Object.keys(pool).forEach(item => {
                if (pool[item].length > 0) {
                    let itemElement = this.createItem(pool[item]);
                    itemContainer.append(itemElement);
                };
            });
        });
    };

    addItemToCardPool(data) {
        if (data.itemType == "pizza") {
            CardPools.pizzaPool[data.itemName].push(data);
        } else if (data.itemType == "schnitzel") {
            CardPools.schnitzelPool[data.itemName].push(data);
        };
    };

    incraseItemAmount(data) {
        if (data[0].itemType == "pizza") {
            CardPools.pizzaPool[data[0].itemName].push(data[0]);
        } else if (data[0].itemType == "schnitzel") {
            CardPools.schnitzelPool[data[0].itemName].push(data[0]);
        };
    };

    decraseItemAmount(data) {
        if (data[0].itemType == "pizza") {
            CardPools.pizzaPool[data[0].itemName].pop();
        } else if (data[0].itemType == "schnitzel") {
            CardPools.schnitzelPool[data[0].itemName].pop();
        };
    };

    removeItemFromCardPool(data) {
        if (data[0].itemType == "pizza") {
            CardPools.pizzaPool[data[data.length-1].itemName].pop();
        } else if (data[0].itemType == "schnitzel") {
            CardPools.schnitzelPool[data[data.length-1].itemName].pop();
        };
    };

    updateTotalPrice() {
        let totalPrice = 0;
        Object.values(CardPools).forEach(pool => {
            Object.values(pool).forEach(item => {
                if (item.length > 0) {
                    item.forEach(elem => {
                        totalPrice += Number(elem.itemPrice);
                    });
                };
            });
        });
        this.shadowRoot.querySelector(".total-price").textContent = `Total Price: ${totalPrice.toFixed(2)}€`;
    };
};