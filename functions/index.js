const functions = require('firebase-functions');
const express = require('express');
const faker = require('faker');
const cors = require('cors')({ origin: true });

exports.getData = functions.https.onRequest((request, response) => {
    return cors(request, response, () => {
        const arr = [];
        for (let i = 0; i <= 49; i++) {
            const idx = i;
            const firstName = faker.name.firstName();
            const lastName = faker.name.lastName();
            const phoneNumber = faker.phone.phoneNumber();
            const street = faker.address.streetAddress();
            const city = faker.address.city();
            const state = faker.address.stateAbbr();
            const zipCode = faker.address.zipCode();
            const data = {
                firstName: firstName,
                lastName: lastName,
                phoneNumber: phoneNumber,
                street: street,
                city: city,
                state: state,
                zipCode: zipCode
            };
            arr.push(data);
            if (i === 49) {
                //   const beginning = +req.params. * +req.params.pageNumber - +req.params.pageSize;
                //   const ending = +req.params.pageSize * +req.params.pageNumber;
                //   const section = arr.slice(beginning, ending);
                response.send(arr);
            }
        }
    })
})
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
