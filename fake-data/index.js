const express = require('express');
const faker = require('faker');
const cors = require('cors');

const app = express();
app.use(cors());
app.get('/:dataSize/:pageSize/:pageNumber', (req, res) => {
  const arr = [];
  for (let i = 0; i <= req.params.dataSize; i++) {
    const idx = i;
    const firstName = faker.name.firstName();
    const lastName = faker.name.lastName();
    const phoneNumber = faker.phone.phoneNumber();
    const street = faker.address.streetAddress();
    const city = faker.address.city();
    const state = faker.address.stateAbbr();
    const zipCode = faker.address.zipCode();
    const data = {
      idx: idx,
      firstName: firstName,
      lastName: lastName,
      phoneNumber: phoneNumber,
      street: street,
      city: city,
      state: state,
      zipCode: zipCode
    };
  arr.push(data);
  if (i === +req.params.dataSize) {
    const beginning = +req.params.pageSize * +req.params.pageNumber - +req.params.pageSize;
    const ending = +req.params.pageSize * +req.params.pageNumber;
    const section = arr.slice(beginning, ending);
    res.send(section);
  }
  }
});

app.listen('3000', () => console.log('Listening on port 3000'));