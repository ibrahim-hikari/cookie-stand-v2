`use strict`;

var hours = ['6am', '7am', '8am', '9am', '10am', '11am', '12pm', '1pm', '2pm', '3pm', '4pm', '5pm', '6pm', '7pm'];

$('#cookies').html('<table></table>')
let tableRwo = $(`<tr></tr>`);
let tableHeader = $(`<th></th>`);
let tableCell = $(`<td></td>`);

function Cities(name, min, max, avg) {
    this.name = name;
    this.min = min;
    this.max = max;
    this.avg = avg;

    this.hoursSalesArr = [];
    this.cookiesArr = [];
    this.cookiesSalesTotal = 0;
    this.assignRandomCookies();
    this.generateHourlySales();
}

Cities.prototype.assignRandomCookies = function () {
    for (let i = 0; i < hours.length; i++) {
        var randomCookies = Math.ceil(Math.random() * (this.max - this.min) + this.min);
        this.cookiesArr.push(randomCookies);
    }
}

Cities.prototype.generateHourlySales = function () {
    for (let i = 0; i < hours.length; i++) {
        var hourCookies = Math.ceil(this.cookiesArr[i] * this.avg);
        this.hoursSalesArr.push(hourCookies);
        this.cookiesSalesTotal += hourCookies;
    }
}

Cities.prototype.row = function () {
    $('table').append($(`<tr id= "${this.name}"><td>${this.name}</td></tr>`));

    for (let i = 0; i < this.hoursSalesArr.length; i++) {
        $(`#${this.name}`).append($(`<td>${this.hoursSalesArr[i]}</td>`))
    }

    $(`#${this.name}`).append($(`<td>${this.cookiesSalesTotal}</td>`))

}


//////////////////// Tables's Header \\\\\\\\\\\\\\\\\\\\

function headerRow() {
    $('table').append(tableRwo.append(tableHeader.text('***')));

    for (let i = 0; i < hours.length; i++) {
        $('tr').append($(`<th>${hours[i]}</th>`));
    }

    $('tr').append($(`<th>Daily Location Total</th>`));
};

//////////////////// Tables's Body \\\\\\\\\\\\\\\\\\\\

Cities.prototype.render = function () {

    $('table').append($(`<tr class= "${this.name}"><td>${this.name}</td></tr>`));

    for (let i = 0; i < this.hoursSalesArr.length; i++) {
        $(`.${this.name}`).append($(`<td>${this.hoursSalesArr[i]}</td>`))
    }

    $(`.${this.name}`).append($(`<td>${this.cookiesSalesTotal}</td>`))

}

//////////////////// Tables's Footer \\\\\\\\\\\\\\\\\\\\

function footerRow() {

    $('table').append($(`<tr class="foot"><td>Total</td></tr>`));

    let grandTotal = 0;

    for (let i = 0; i < hours.length; i++) {

        var hourlyTotal = 0;
        for (let j = 0; j < cities.length; j++) {
            hourlyTotal += cities[j].hoursSalesArr[i]
        }

        $(`.foot`).append($(`<td>${hourlyTotal}</td>`))

        grandTotal += hourlyTotal
    }

    $(`.foot`).append($(`<td>${grandTotal}</td>`))
};

var cities = []
cities.push(new Cities('Seattle', 23, 65, 6.3));
cities.push(new Cities('Tokyo', 3, 24, 1.2));
cities.push(new Cities('Dubai', 11, 38, 3.7));
cities.push(new Cities('Paris', 20, 38, 2.8));
cities.push(new Cities('Lima', 2, 16, 4.6));

headerRow()

for (let i = 0; i < cities.length; i++) {
    let oneCity = cities[i];
    oneCity.render()
}

footerRow();

let existName = {};

$('#newC').submit(function (e) {
    e.preventDefault();

    let name = event.target.cityName.value;
    let min = parseInt(event.target.minNum.value);
    let max = parseInt(event.target.maxNum.value);
    let avg = parseFloat(event.target.avgNum.value);

    let newC = new Cities(name, min, max, avg);

    cities.push(newC);
    console.log('cityName', name);
    console.log('hello', existName);


    if (!existName[name]) {
        existName[name] = true;
        $('.foot').remove();
        newC.row();
        footerRow();
    } else {
        alert('you already have this city!!!')
    }
});