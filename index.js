const express = require('express');
const mongoose = require('mongoose');
const app = express()
const port = 3000
const expense = require('./models/expense');
mongoose.connect('mongodb://localhost:27017/Expense-tracker',{ useUnifiedTopology :true});

app.get('/expenses',async (req,res)=>{
  // console.log(req.params)
  const result = await expense.find();
  res.send(result);
})

app.get('/expenses/:id',async (req,res)=>{
    try{
      const id = req.params.id;
  // console.log(req.params)
  const result = await expense.findById(id);
  if(result)
    res.send(result);
  else
    res.send("No data");

    }catch(err){
      res.send(err);

    }
 
 
  
})

// app.get('/expenses', (req, res) => {
//   res.send('Hello World!')
// })
app.post('/expenses', (req, res) => {
    res.send('hi World!')
  })

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})