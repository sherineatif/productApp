 
const express = require('express');
const debug = require('debug')('app:adminRouter');
const { MongoClient } = require('mongodb'); 

const adminRouter = express.Router();


const products=require('../Data/products.json'); 

adminRouter.route('/').get((req, res) => {
    const url ='mongodb+srv://sherineatif:ITS%40sh29@globalmantics.x13nyf2.mongodb.net?retryWrites=true&w=majority';
    const dbName = 'globalmantics';

    (async function mongo() {
      let client;
      try {
        client = await MongoClient.connect(url);
        debug('Connected to the mongo DB');
  
        const db = client.db(dbName);
  
        const response = await db.collection('products').insertMany(products);
        res.json(response);
      } catch (error) {
        debug(error.stack);
      }
   
      client.close();
    })();
  });
  
  module.exports = adminRouter;
