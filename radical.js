class Supercar {
    constructor(brand, model, year, horsepower, topSpeed, acceleration, price) {
      this.brand = brand;
      this.model = model;
      this.year = year;
      this.horsepower = horsepower;
      this.topSpeed = topSpeed;
      this.acceleration = acceleration;
      this.price = price;
    }
  }
  class SupercarDatabase {
    constructor() {
      this.supercars = [];
    }
    addSupercar(brand, model, year, horsepower, topSpeed, acceleration, price) {
      const supercar = new Supercar(brand, model, year, horsepower, topSpeed, acceleration, price);
      this.supercars.push(supercar);
    }
    findHighestHorsepower() {
      return this.supercars.reduce((max, car) => car.horsepower > max.horsepower ? car : max, this.supercars[0]);
    }
    findFastestTopSpeed() {
      return this.supercars.reduce((max, car) => car.topSpeed > max.topSpeed ? car : max, this.supercars[0]);
    }
    findFastestAcceleration() {
      return this.supercars.reduce((min, car) => car.acceleration < min.acceleration ? car : min, this.supercars[0]);
    }
    filterByBrand(brand) {
      return this.supercars.filter(car => car.brand.toLowerCase() === brand.toLowerCase());
    }
    filterByYear(year) {
      return this.supercars.filter(car => car.year === year);
    }
    carsWithinPriceRange(minPrice, maxPrice) {
      return this.supercars.filter(car => car.price >= minPrice && car.price <= maxPrice);
    }
    sortByPrice(direction = 'asc') {
      return this.supercars.sort((a, b) => {
        return direction === 'asc' ? a.price - b.price : b.price - a.price;
      });
    }
    averageHorsepower() {
      const totalHorsepower = this.supercars.reduce((total, car) => total + car.horsepower, 0);
      return totalHorsepower / this.supercars.length;
    }
  }
  const supercarDB = new SupercarDatabase();
  supercarDB.addSupercar('Ferrari', 'LaFerrari', 2017, 950, 217, 2.4, 7000000);
  supercarDB.addSupercar('Bugatti', 'Chiron', 2019, 1500, 261, 2.4, 3000000);
  supercarDB.addSupercar('Lamborghini', 'Aventador SVJ', 2020, 770, 217, 2.8, 517000);
  supercarDB.addSupercar('McLaren', 'P1', 2015, 903, 217, 2.8, 1200000);
  supercarDB.addSupercar('Porsche', '918 Spyder', 2015, 887, 211, 2.6, 845000);
  console.log('Highest Horsepower:', supercarDB.findHighestHorsepower());
  console.log('Fastest Top Speed:', supercarDB.findFastestTopSpeed());
  console.log('Fastest Acceleration:', supercarDB.findFastestAcceleration());
  console.log('Ferrari Models:', supercarDB.filterByBrand('Ferrari'));
  console.log('Cars from 2015:', supercarDB.filterByYear(2015));
  console.log('Cars within price range $500,000 - $1,000,000:', supercarDB.carsWithinPriceRange(500000, 1000000));
  console.log('Supercars sorted by price (ascending):', supercarDB.sortByPrice());
  console.log('Average Horsepower:', supercarDB.averageHorsepower());
  