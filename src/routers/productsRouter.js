
const express=require('express');
const productsRouter=express.Router();
const debug = require('debug')('app:productsRouter');
const { MongoClient, ObjectId } = require('mongodb');
const speakerService=require('../services/speakerServices');
const products=require('../Data/products.json');
productsRouter.use((req,res, next)=>{
  if(req.user){
    next();
  }else{
    res.redirect('/auth/signIn');
  }
});

productsRouter.route('/').get((req, res) => {
    const url ='mongodb+srv://sherineatif:ITS%40sh29@globalmantics.x13nyf2.mongodb.net?retryWrites=true&w=majority';
    const dbName = 'globalmantics';

    (async function mongo() {
        let client;
        try {
          client = await MongoClient.connect(url);
          debug('Connected to the mongo DB');
    
          const db = client.db(dbName);
    
          const products = await db.collection('products').find().toArray();
          debug(products);
    
          res.render('products', { products });
        } catch (error) {
          debug(error.stack);
        }
        client.close();
      })();
  });
  
productsRouter.route('/:id').get((req, res) => {
    const id= req.params.id
    const url ='mongodb+srv://sherineatif:ITS%40sh29@globalmantics.x13nyf2.mongodb.net?retryWrites=true&w=majority';
    const dbName = 'globalmantics';

    
  (async function mongo() {
    let client;
    try {
      client = await MongoClient.connect(url);
      debug('Connected to the mongo DB');

      const db = client.db(dbName);

      const product = await db
        .collection('products')
        .findOne({ _id: new ObjectId(id) });
const speaker= await speakerService.getSpeakerById(product.sponsor[0].id);
product.sponsor=speaker.data
      res.render('product', {
        product,
      });
    } catch (error) {
      debug(error.stack);
    }
    client.close();
  })();
  });
  

module.exports=productsRouter;