'use strict';

const bcrypt = require('bcrypt');
const helper = require('./../utilities/helper');
const faker = require('faker');

const {
    Customer,
} = require('./../models');



module.exports = {
    up: async (queryInterface, Sequelize) => {
        const now = new Date();

        // Create Dev Customers
        {
            const customer1 = {
                email: process.env.DEV_CUSTOMER_1_EMAIL ? process.env.DEV_CUSTOMER_1_EMAIL : 'customer1@gmail.com',
                password: process.env.DEV_CUSTOMER_1_PASS ? process.env.DEV_CUSTOMER_1_PASS : 'secret',
            };
            await Customer.create({
                role_id: 1,
                status: 1,
                name: "Customer 1",
                // username: null,
                email: customer1.email,
                password: await bcrypt.hash(customer1.password, 10),
                avatar: null,
                address: faker.address.streetAddress(),
                gender: 1,
                birth_date: faker.date.between('1970-01-25', '2000-01-25'),
                // auth_provider: 'email-pass',
                // email_token: null,
                // email_token_count: 0,
                created_at: now,
                updated_at: now,
            });
            try {
                // TODO: await JWT create customer with customer1.email and customer1.password
            } catch (err) {
                console.log(err.message);
            }

            const customer2 = {
                email: process.env.DEV_CUSTOMER_2_EMAIL ? process.env.DEV_CUSTOMER_2_EMAIL : 'customer2@gmail.com',
                password: process.env.DEV_CUSTOMER_2_PASS ? process.env.DEV_CUSTOMER_2_PASS : 'secret',
            };
            await Customer.create({
                role_id: 1,
                status: 1,
                name: "Customer 2",
                // username: null,
                email: customer2.email,
                password: await bcrypt.hash(customer2.password, 10),
                avatar: null,
                address: faker.address.streetAddress(),
                gender: 1,
                birth_date: faker.date.between('1970-01-25', '2000-01-25'),
                // auth_provider: 'email-pass',
                // email_token: null,
                // email_token_count: 0,
                created_at: now,
                updated_at: now,
            });
            try {
                // TODO: await JWT create customer with customer2.email and customer2.password
            } catch (err) {
                console.log(err.message);
            }
        }

        // Create random Customers
        const statuses = [ 0, 1, 2 ];
        let customer;
        let minDate = new Date('1970-01-01');
        let maxDate = new Date();

        for (let i = 1; i <= 5; i++)
        {
            customer = {
                email: `partner${i}@gmail.com`,
                password: 'secret',
            };

            await Customer.create({
                role_id: 1,
                status: faker.random.arrayElement(statuses),
                name: `Partner ${i}`,
                // username: null,
                email: customer.email,
                password: await bcrypt.hash(customer.password, 10),
                avatar: null,
                address: faker.address.streetAddress(),
                gender: 1,
                birth_date: helper.random_date(minDate, maxDate),
                // auth_provider: 'email-pass',
                // email_token: null,
                // email_token_count: 0,
                created_at: now,
                updated_at: now,
            });

            try {
                // TODO: await JWT create customer with customer.email and customer.password
            } catch (err) {
                console.log(err.message);
            }
        }
    },
    down: (queryInterface, Sequelize) => queryInterface.bulkDelete('customers', null, {}),
};
