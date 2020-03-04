/** MongoDB Driver **/

/* const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

const url = 'mongodb://localhost:27017';

const dbName = 'fruitsDB';

const client = new MongoClient(url, {useUnifiedTopology: true});

client.connect(function(err) {
  assert.equal(null, err);
  console.log("Connected successfully to server");

  const db = client.db(dbName);
  
  db.collection('fruits').insertMany([{name: 'Apple', score: 8, review: 'Great fruit'}, {name: 'Orange', score: 6, review: 'Kinda sour'}], function(err, r) {
    assert.equal(null, err);
    assert.equal(2, r.insertedCount);
  });
  
  db.collection('fruits').find({}).toArray(function(err, fruits) {
    assert.equal(null, err);
    assert.equal(2, fruits.length);
    client.close();
  });
}); */

/** Mongoose **/

const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/fruitsDB', {useNewUrlParser: true, useUnifiedTopology: true});

const fruitSchema  = new mongoose.Schema ({
  name: {
    type: String,
    required: [true, 'Please check your data entry no name specified']
  },
  rating: {
    type: Number,
    min: 1,
    max: 10
  },
  review: String
});

const Fruit = mongoose.model('Fruit', fruitSchema);

const fruit = new Fruit({
  name: 'Apple',
  rating: 7,
  review: 'Pretty solid as a fruit'
});

fruit.save();

const personSchema = new mongoose.Schema ({
  name: String,
  age: Number,
  favoriteFruit: fruitSchema
});

const Person = mongoose.model('Person', personSchema);

const pineapple = new Fruit({
  name: 'Pineapple',
  score: 9,
  review: 'Great fruit'
});

pineapple.save();

const person = new Person({
  name: 'Amy',
  age: 12,
  favoriteFruit: pineapple
});

person.save();

const kiwi = new Fruit({
  name: 'Kiwi',
  rating: 10,
  review: 'The best fruit'
});

const orange = new Fruit({
  name: 'Orange',
  rating: 4,
  review: 'Too sour for me'
});

const banana = new Fruit({
  name: 'Banana',
  rating: 3,
  review: 'Weird texture'
});

Fruit.insertMany([kiwi, orange, banana], function(err) {
  if (err) {
    console.log(err);
  }
  else {
    console.log('Successfully saved all the fruits to fruitsDB');
  }
});

const peach = new Fruit({
  rating: 10,
  review: 'Peaches are so yummy'
});

peach.save();

Fruit.find(function(err, fruits) {
  if (err) {
    console.log(err);
  }
  else {
    mongoose.connection.close();
    fruits.forEach(function(fruit) {
      console.log(fruit.name);
    });
  }
});

Fruit.updateOne({_id: '5e5f57653eae65138c257fce'}, {name: 'Peach'}, function(err) {
  if (err) {
    console.log(err);
  }
  else {
    console.log('Successfully updated the document');
  }
});

Fruit.deleteOne({name: 'Peach'}, function(err) {
  if (err) {
    console.log(err);
  }
  else {
    console.log('Successfully deleted the document');
  }
});
