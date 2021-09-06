const menu = {
    'masala-chai': {
        order: 'Masala Chai',
        cost: 0.75
    }, 
    'black-coffee': {
        order: 'Black Coffee',
        cost: 0.5
    },
    'coffee-shake': {
        order: 'Coffee Shake',
        cost: 0.75
    },
    'green-tea': {
        order: 'Green Tea',
        cost: 0.5
    },
    'beer': {
        order: 'Beer',
        cost: 1.25
    },
    'scotch': {
        order: 'Scotch',
        cost: 1.5
    },
    'milk-coffee': {
        order: 'Milk Coffee',
        cost: 0.6
    },
    'coke': {
        order: 'Coke',
        cost: 0.4
    },
    'fbi': {
        order: 'Fried Banana Ice Cream',
        cost: 4
    }
}

function sendEmail(body){
    emailjs.init("user_6tWjYXKH7CNG8k5CyrOJ5");
    emailjs.send('service_y41aamj', 'template_tz1if4u', {name: body})
        .then(function(response) {
            console.log('SUCCESS!', response.status, response.text);
        }, function(error) {
            console.log('FAILED...', error);
        });
}


const form = document.getElementById("drink_form");

form.addEventListener("submit", (event) => {
    const drinkTypeEl = document.getElementById("type_of_drink");
    const amountEl = document.getElementById("amount");
    const nameEl = document.getElementById("order_by");
    const tipEl = document.getElementById("tip");
    const instructionsEl = document.getElementById("additional_instructions");

    const drinkType = drinkTypeEl.value;
    const amount = amountEl.value;
    const name = nameEl.value;
    const instructions = instructionsEl.value;
    const tip = !tipEl.value ? 0 : tipEl.value / 100;

    if(drinkType == 'blank') {
        alert("Please choose a drink.");
        event.preventDefault();
    }

    const costPerDrink = menu[drinkType].cost;

    function calculateCost(perDrink, amt, tip) {
        const preTip = perDrink * amt;
        const total = preTip * (1 + tip);
        return total.toFixed(2);
    }    

    const totalCost = calculateCost(costPerDrink, amount, tip);
    document.getElementById("cost_span").innerHTML = totalCost;

    sendEmail(`
    Name: ${name}. Type: ${drinkType}. Amount: ${amount}. Cost: $${totalCost}.
    Added Instructions: ${instructions}.
    `);

    const returnButton = document.getElementById("return_home");
    returnButton.style.display = 'initial';

    alert(`You placed your order! Drink: ${menu[drinkType].order}. Amount ${amount}. Cost: $${totalCost}.`);
    event.preventDefault();
})