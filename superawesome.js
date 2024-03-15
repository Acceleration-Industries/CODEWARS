class AdvancedDealership extends Dealership {
    constructor() {
        super();
        this.loadInventory();
    }
    saveInventory() {
        localStorage.setItem('carInventory', JSON.stringify(this.inventory));
    }
    loadInventory() {
        const savedInventory = JSON.parse(localStorage.getItem('carInventory'));
        if (savedInventory) {
            this.inventory = savedInventory.map(car => new Car(car.id, car.brand, car.model, car.year, car.price));
            this.nextId = this.inventory.length ? Math.max(...this.inventory.map(car => car.id)) + 1 : 1;
            this.displayInventory();
        }
    }
    detailedSearch(options) {
        return this.inventory.filter(car => {
            return Object.keys(options).every(option => {
                if (typeof options[option] === 'number') {
                    return car[option] === options[option];
                } else if (typeof options[option] === 'string') {
                    return car[option].toLowerCase().includes(options[option].toLowerCase());
                } else if (Array.isArray(options[option]) && options[option].length === 2) {
                    return car[option] >= options[option][0] && car[option] <= options[option][1];
                }
                return true;
            });
        });
    }
    addEventListeners() {
        document.getElementById('search-form').addEventListener('submit', event => {
            event.preventDefault();
            const brand = event.target.elements['search-brand'].value;
            const model = event.target.elements['search-model'].value;
            const year = event.target.elements['search-year'].value ? parseInt(event.target.elements['search-year'].value, 10) : null;
            const priceMin = event.target.elements['search-price-min'].value ? parseFloat(event.target.elements['search-price-min'].value) : null;
            const priceMax = event.target.elements['search-price-max'].value ? parseFloat(event.target.elements['search-price-max'].value) : null;
            const searchOptions = {};
            if (brand) searchOptions.brand = brand;
            if (model) searchOptions.model = model;
            if (year) searchOptions.year = year;
            if (priceMin !== null && priceMax !== null) searchOptions.price = [priceMin, priceMax];
            const results = this.detailedSearch(searchOptions);
            this.displayInventory(results);
        });
        document.getElementById('save-inventory').addEventListener('click', () => {
            this.saveInventory();
            alert('Inventory saved successfully!');
        });
        document.getElementById('load-inventory').addEventListener('click', () => {
            this.loadInventory();
            alert('Inventory loaded successfully!');
        });
    }
}
const advancedDealership = new AdvancedDealership();
advancedDealership.addEventListeners();
function generateFilterOptions() {
    const brands = [...new Set(advancedDealership.inventory.map(car => car.brand))];
    const brandSelect = document.getElementById('search-brand');
    brandSelect.innerHTML = '<option value="">Any Brand</option>';
    brands.forEach(brand => {
        const option = document.createElement('option');
        option.value = brand;
        option.textContent = brand;
        brandSelect.appendChild(option);
    });
}
generateFilterOptions();
document.getElementById('sort-select').addEventListener('change', function() {
    const [criteria, order] = this.value.split('-');
    const sortedInventory = advancedDealership.sortInventory(criteria, order);
    advancedDealership.displayInventory(sortedInventory);
});
