const FootData = {
    Pizzas: [
        {
            type: "pizza",
            name: "Salami",
            price: 3.55
        },
        {
            type: "pizza",
            name: "Hawai",
            price: 2.99
        },
        {
            type: "pizza",
            name: "Schicken",
            price: 3.80
        }
    ],
    Schnitzel: [
        {
            type: "schnitzel",
            name: "Wiener",
            price: 4.99
        },
        {
            type: "schnitzel",
            name: "Hawai",
            price: 4.50
        },
        {
            type: "schnitzel",
            name: "Holland",
            price: 3.99
        }
    ],
};

const Storage = {
    CardCounters: {
        pizzas: 0,
        schnitzel: 0,   
    },
};

const CardPools = {
    pizzaPool: {
        Salami: [],
        Hawai: [],
        Schicken: [],
    },
    schnitzelPool: {
        Wiener: [],
        Hawai: [],
        Holland: [],
    },
};


export {
    FootData,
    Storage,
    CardPools
};