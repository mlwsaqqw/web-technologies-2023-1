function setToppingListeners() {

    const toppingSelector = '.pizza-order__topping';
    const activeToppingClass = 'pizza-order__topping_active';

    const toppings = document.querySelectorAll(toppingSelector);

    toppings.forEach(topping => topping.addEventListener('click', (e) => {
        e.currentTarget.classList.toggle(activeToppingClass);

        const isSelectedToppingActive = e.currentTarget.classList.contains(activeToppingClass);

        if (isSelectedToppingActive)
            pizza.addTopping(PizzaTopping[e.currentTarget.dataset.topping]);
        else
            pizza.removeTopping(PizzaTopping[e.currentTarget.dataset.topping]);

        updateOrderButton()
    }));
}

function setSizeListeners() {

    const sizeSelector = '.pizza-order__size';

    const size = [ ...document.querySelectorAll(sizeSelector) ][0].dataset.size;
    pizza.setSize(PizzaSize[size]);

    document.querySelectorAll(sizeSelector).forEach(size => {
        size.addEventListener('click', (e) => {

            const backgroundItem = document.querySelector('.background-item');
            const sizeItems = [...document.querySelectorAll('.pizza-order__size')];

            pizza.setSize(PizzaSize[e.currentTarget.dataset.size]);


            let left = sizeItems.slice(0, sizeItems.indexOf(e.target)).reduce((acc, sizeItem) => {
                return acc + sizeItem.offsetWidth
            }, 4);

            backgroundItem.setAttribute('style', 'left: ' + left + 'px; width: ' + e.target.offsetWidth + 'px');
            updateOrderButton();
            updateToppingsPrice();
        })
    })

}

function setTypeListeners() {
    const typeSelector = '.pizza-order__type';
    const activeTypeClass = 'pizza-order__type_active'
    const types = document.querySelectorAll(typeSelector);
    let isSelectedTypeActive = false;

    types.forEach(type =>
        type.addEventListener('click', (e) => {

            types.forEach(el => el !== e.currentTarget && el.classList.remove(activeTypeClass));

            e.currentTarget.classList.toggle(activeTypeClass);

            isSelectedTypeActive = e.currentTarget.classList.contains(activeTypeClass);

            pizza.setType(PizzaTypes[e.currentTarget.dataset.type]);
            document.querySelector('.pizza-order__disabled').style.display = isSelectedTypeActive ? 'none' : 'block';

            updateOrderButton(!isSelectedTypeActive);
        })
    );

    setSizeListeners(isSelectedTypeActive);
    setToppingListeners();
}

function initBackgroundItem() {
    const sizeItems = document.querySelectorAll('.pizza-order__size');
    const backgroundItem = document.querySelector('.background-item');
    backgroundItem.setAttribute('style', 'left: ' + 4 + 'px; width: ' + sizeItems[0].offsetWidth + 'px');
}

function updateOrderButton(isReset) {
    if (!isReset) {
        document.querySelector('.pizza-order__total-price').innerHTML = pizza.calculatePrice();
        document.querySelector('.pizza-order__total-calories').innerHTML = pizza.calculateCalories();
    } else {
        document.querySelector('.pizza-order__total-price').innerHTML = '0';
        document.querySelector('.pizza-order__total-calories').innerHTML = '0';
    }
}

function updateToppingsPrice() {
    document.querySelectorAll('.pizza-order__topping').forEach(topping => {
       topping.querySelector('.pizza-order__topping-price').innerHTML = PizzaTopping[topping.dataset.topping].info[pizza.getSize().id].price;
    });
}

const pizza = new Pizza(null, null, null);

initBackgroundItem();
setTypeListeners();






