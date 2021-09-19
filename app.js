const menu = {
    'masala-chai': {
        order: 'Masala Chai',
        cost: 0.95,
        etd: [5, 10]
    }, 
    'black-coffee': {
        order: 'Black Coffee',
        cost: 0.75,
        etd: [1, 3]
    },
    'coffee-shake': {
        order: 'Coffee Shake',
        cost: 0.9,
        etd: [2, 5]
    },
    'green-tea': {
        order: 'Green Tea',
        cost: 0.75,
        etd: [1, 3]
    },
    'beer': {
        order: 'Beer',
        cost: 1.15,
        etd: [1, 3]
    },
    'scotch': {
        order: 'Scotch',
        cost: 1.25, 
        etd: [2, 5]
    },
    'milk-coffee': {
        order: 'Milk Coffee',
        cost: 0.80,
        etd: [2, 5]
    },
    'coke': {
        order: 'Coke',
        cost: 0.50,
        etd: [1, 3]
    },
    'fbi': {
        order: 'Fried Banana Ice Cream',
        cost: 4,
        etd: [30, 45]
    },
    'mango-lassi': {
        order: 'Mango Lassi',
        cost: 0.9,
        etd: [2, 5]
    },
    'specialty-tea': {
        order: 'Specialty Tea',
        cost: 0.8,
        etd: [1, 3]
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
const drinkTypeEl = document.getElementById("type_of_drink");


drinkTypeEl.addEventListener('change', (e) => {
    const specialTeasClass = document.getElementsByClassName('type_of_special_tea');
    const specialTeasArray = Array.from(specialTeasClass);
    if(e.target.value === 'specialty-tea') {        
        specialTeasArray.forEach(el => { el.style.display = 'initial' });
    } else {
        specialTeasArray.forEach(el => { el.style.display = 'none' });
    }
    // specialTeasEl.style.display = 'initial';
})


form.addEventListener("submit", (event) => {
    // const drinkTypeEl = document.getElementById("type_of_drink");
    const amountEl = document.getElementById("amount");
    const nameEl = document.getElementById("order_by");
    const tipEl = document.getElementById("tip");
    const instructionsEl = document.getElementById("additional_instructions");
    const specialTeasEl = document.getElementById("type_of_special_tea");

    const drinkType = drinkTypeEl.value;
    const amount = amountEl.value;
    const name = nameEl.value;
    const instructions = instructionsEl.value;
    const tip = !tipEl.value ? 0 : tipEl.value / 100;

    //Limited ediition
    const specialTeaType = specialTeasEl.value;
    

    if(drinkType == 'blank') {
        alert("Please choose a drink.");
        event.preventDefault();
    }

    const costPerDrink = menu[drinkType].cost;
    const etd = menu[drinkType].etd;

    function calculateCost(perDrink, amt, tip) {
        const preTip = perDrink * amt;
        const total = preTip * (1 + tip);
        return total.toFixed(2);
    }

    const totalCost = calculateCost(costPerDrink, amount, tip);
    document.getElementById("cost_span").innerHTML = totalCost;

    sendEmail(`
    Name: ${name}. Type: ${drinkType}. Extra Type: ${specialTeaType}. Amount: ${amount}. Cost: $${totalCost}.
    Added Instructions: ${instructions}.
    `);

    const returnButton = document.getElementById("return_home");
    returnButton.style.display = 'initial';

    alert(`You placed your order! Drink: ${menu[drinkType].order}. Amount ${amount}. Cost: $${totalCost}. 
        Estimated delivery time: ${etd[0]}-${etd[1]}min or more depending on quantity.`);
    event.preventDefault();
})