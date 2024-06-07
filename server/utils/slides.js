exports.createCarsSlide = (cars) => {
    const carsLength = cars.length;
    let index = 0;
    let carSlides = [];
    while (carsLength > index) {
        carSlides.push(cars[index]);
        if (index % 2 !== 0 ) {
            carSlides.push(null);
        }
        index++;
    }
    return carSlides;
}