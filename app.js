
const menu = {
    'masala-chai': {
        order: 'Masala Chai',
        cost: 1
    }, 
    'black-coffee': {
        order: 'Black Coffee',
        cost: 0.5
    },
    'coffee-shake': {
        order: 'Coffee Shake',
        cost: 1
    },
    'green-tea': {
        order: 'Green Tea',
        cost: 0.5
    },
    'snacks-and-drinks': {
        order: 'Snacks and Drinks',
        cost: 1.25
    }
}

// function sendText(order, cost) {
//     // Send the text message.
//     client.messages.create({
//         to: '856-912-3795',
//         from: '856-912-3795',
//         body: 'Hello from Twilio!'
//     });
// }

function sendEmail(name){
    emailjs.init("user_6tWjYXKH7CNG8k5CyrOJ5");
    emailjs.send('service_y41aamj', 'template_tz1if4u', {name: name})
        .then(function(response) {
            console.log('SUCCESS!', response.status, response.text);
        }, function(error) {
            console.log('FAILED...', error);
        });
}


const form = document.getElementById("drink_form");

form.addEventListener("submit", () => {
    const drinkTypeEl = document.getElementById("type_of_drink");
    const amountEl = document.getElementById("amount");
    const nameEl = document.getElementById("order_by")
    // const phoneEl = document.getElementById("phone");

    const drinkType = drinkTypeEl.value;
    const amount = amountEl.value;
    const name = nameEl.value;
    // const phoneNumber = phoneEl.value;

    // console.log(drinkType);
    // console.log(amount);

    let costPerDrink = 0;

    switch(drinkType) {
        case 'masala-chai':
            costPerDrink = menu[drinkType].cost;
            break;
        case 'black-coffee':
            costPerDrink = menu[drinkType].cost;
            break;
        case 'coffee-shake':
            costPerDrink = menu[drinkType].cost;
            break;
        case 'green-tea':
            costPerDrink = menu[drinkType].cost;
            break;
        case 'snack-and-drinks':
            costPerDrink = menu[drinkType].cost;
            break;
        default:
            alert("Something went wrong. Please try again");
            throw error("Something went wrong");
    }

    function calculateCost(perDrink, amt) {
        return (perDrink * amt).toFixed(2);
    }    

    const totalCost = calculateCost(costPerDrink, amount);
    document.getElementById("cost_span").innerHTML = totalCost;

    sendEmail(`Name: ${name}. Type: ${drinkType}. Cost: $${totalCost}`);
    event.preventDefault();

    const returnButton = document.getElementById("return_home");
    returnButton.style.display = 'initial';
})