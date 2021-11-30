'use strict';

const appConfigs = require('./../config/app');
const faker = require('faker');

module.exports = {
    is_natural: (n) => {
        n = n.toString(); // force the value in case it is not
        let n1 = Math.abs(n),
            n2 = parseInt(n, 10);

        return !isNaN(n1) && n2 === n1 && n1.toString() === n;
    },
    random_date: (start, end) => {
        // const start = new Date(2001, 0, 1)
        // const end = new Date()

        return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
    },
    random_string: (length) => {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        const charactersLength = characters.length;
        let result = '';

        for (let i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }

        return result;
    },
    numbersIntervals: (intervalsMaxCount, from, max) => {
        const numbersArray = [];
        for (let i = from; i <= max; i++) {
            numbersArray.push(i);
        }
        const intervalsCount = Math.floor(Math.random() * intervalsMaxCount);
        const numbersCount = 2 * intervalsCount;
        const randomNumbers = faker.random.arrayElements(numbersArray, numbersCount);

        const numbersIntervals = [];
        for (let j = 0; j < numbersCount - 1; j += 2) {
            numbersIntervals.push({
                start: randomNumbers[j],
                end: randomNumbers[j + 1],
            });
        }

        return numbersIntervals;
    },
    addZeroes: (num, count) => {
        const dec = num.split('.')[1]
        const len = dec && dec.length > count ? dec.length : count
        return Number(num).toFixed(len)
    },
    getRandomInRange: (from = -90, to = 90, fixed = 6) => {
        return (Math.random() * (to - from) + from).toFixed(fixed) * 1;
        // .toFixed() returns string, so ' * 1' is a trick to convert to number
    },
    randomGeoPoint: (center, radius) => {
        const x0 = center.lng;
        const y0 = center.lat;

        const rd = radius / 111300; // Convert Radius from meters to degrees

        const u = Math.random();
        const v = Math.random();

        const w = rd * Math.sqrt(u);
        const t = 2 * Math.PI * v;
        const x = w * Math.cos(t);
        const y = w * Math.sin(t);

        const xp = x / Math.cos(y0);

        return {
            lat: y + y0,
            lng: xp + x0
        };
    },
};
