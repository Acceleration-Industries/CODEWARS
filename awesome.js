const carInventory = [
    { id: 1, brand: "Ferrari", model: "488 Spider", year: 2020, price: 350000 },
    { id: 2, brand: "Lamborghini", model: "Huracan Evo", year: 2021, price: 260000 },
    { id: 3, brand: "Porsche", model: "911 Turbo S", year: 2022, price: 203500 },
];
function displayCars(inventory) {
    const carsContainer = document.getElementById('cars-container');
    carsContainer.innerHTML = '';

    inventory.forEach(car => {
        const carElement = document.createElement('div');
        carElement.className = 'car';
        carElement.innerHTML = `
            <h2>${car.brand} ${car.model}</h2>
            <p>Year: ${car.year}</p>
            <p>Price: $${car.price.toLocaleString()}</p>
        `;
        carsContainer.appendChild(carElement);
    });
}
function filterCarsByBrand(brand) {
    const filteredInventory = carInventory.filter(car => car.brand.toLowerCase() === brand.toLowerCase());
    displayCars(filteredInventory);
}
displayCars(carInventory);
document.getElementById('brand-select').addEventListener('change', function() {
    const selectedBrand = this.value;
    if (selectedBrand === 'All') {
        displayCars(carInventory);
    } else {
        filterCarsByBrand(selectedBrand);
    }
});
class Car {
    constructor(id, brand, model, year, price) {
        this.id = id;
        this.brand = brand;
        this.model = model;
        this.year = year;
        this.price = price;
    }
}
class Dealership {
    constructor() {
        this.inventory = [];
        this.nextId = 1;
    }
    addCar(brand, model, year, price) {
        const car = new Car(this.nextId++, brand, model, year, price);
        this.inventory.push(car);
        this.displayInventory();
    }
    editCar(id, brand, model, year, price) {
        const carIndex = this.inventory.findIndex(car => car.id === id);
        if (carIndex !== -1) {
            this.inventory[carIndex].brand = brand;
            this.inventory[carIndex].model = model;
            this.inventory[carIndex].year = year;
            this.inventory[carIndex].price = price;
            this.displayInventory();
        }
    }
    deleteCar(id) {
        this.inventory = this.inventory.filter(car => car.id !== id);
        this.displayInventory();
    }
    filterInventory(criteria) {
        if (!criteria) return this.inventory;
        return this.inventory.filter(car => {
            return Object.keys(criteria).every(key => {
                return car[key] === criteria[key];
            });
        });
    }
    sortInventory(by, order = 'asc') {
        return this.inventory.sort((a, b) => {
            if (order === 'asc') {
                return a[by] > b[by] ? 1 : -1;
            } else {
                return a[by] < b[by] ? 1 : -1;
            }
        });
    }
    displayInventory(filteredInventory = this.inventory) {
        const carsContainer = document.getElementById('cars-container');
        carsContainer.innerHTML = '';
        filteredInventory.forEach(car => {
            const carElement = document.createElement('div');
            carElement.className = 'car';
            carElement.innerHTML = `
                <h2>${car.brand} ${car.model}</h2>
                <p>Year: ${car.year}</p>
                <p>Price: $${car.price.toLocaleString()}</p>
                <button onclick="dealership.editCarPrompt(${car.id})">Edit</button>
                <button onclick="dealership.deleteCar(${car.id})">Delete</button>
            `;
            carsContainer.appendChild(carElement);
        });
    }
    editCarPrompt(id) {
        const car = this.inventory.find(car => car.id === id);
        if (car) {
            const brand = prompt('Enter new brand:', car.brand);
            const model = prompt('Enter new model:', car.model);
            const year = parseInt(prompt('Enter new year:', car.year), 10);
            const price = parseFloat(prompt('Enter new price:', car.price));
            this.editCar(id, brand, model, year, price);
        }
    }
}
const dealership = new Dealership();
dealership.addCar('Ferrari', '488 Spider', 2020, 350000);
dealership.addCar('Lamborghini', 'Huracan Evo', 2021, 260000);
document.getElementById('add-car-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const brand = this.elements['brand'].value;
    const model = this.elements['model'].value;
    const year = parseInt(this.elements['year'].value, 10);
    const price = parseFloat(this.elements['price'].value);
    dealership.addCar(brand, model, year, price);
});
document.getElementById('filter-brand').addEventListener('change', function() {
    const brand = this.value;
    if (brand === 'All') {
        dealership.displayInventory();
    } else {
        const filteredInventory = dealership.filterInventory({ brand });
        dealership.displayInventory(filteredInventory);
    }
});
document.getElementById('sort-price').addEventListener('click', function() {
    const sortedInventory = dealership.sortInventory('price');
    dealership.displayInventory(sortedInventory);
});

