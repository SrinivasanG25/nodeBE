const express = require('express');
const mongoose = require('mongoose');
const app = express()
const port = process.env.PORT || 3000
app.listen(port)
const Expense = require('./models/expense');
mongoose.connect('mongodb+srv://SrinivasanG:Srini_2502@cluster0.hm5os3y.mongodb.net/newdb?retryWrites=true&w=majority',{ useUnifiedTopology :true});

app.use(express.json());
app.get('/expenses',async (req,res)=>{
  // console.log(req.params)
  const result = await Expense.find();
  res.send(result);
})

// app.delete('/expenses/:id',async (req,res)=>{
//     try{
//       const id = req.params.id;
//   // console.log(req.params)
//   const result = await expense.findById(id);
//   if(result)
//     res.send(result);
//   else
//     res.send("No data");

//     }catch(err){
//       res.send(err);

//     }
 
 
  
// })

app.delete('/expenses/:id',async(req,res)=>{
  try{
    const id = req.params.id;
    console.log(id)
    const result = await Expense.findByIdAndDelete(id);
    if(result)
      res.send(result);
    else
      res.send("No Expense with that id");
  }catch(err){
    res.send(err);
  }
});


app.put('/expenses/:id', async(req, res) => {
    const id = req.params.id;
    const updateObject = req.body;
    const updatedObject = await Expense.findByIdAndUpdate(id,{$set : updateObject},{
      new:true
    })
    res.send(updatedObject);
  })
  
  
app.post('/expenses',async(req,res)=>{
  console.log(req.body)
  const newExpense = req.body;
    await Expense.create(newExpense);
    res.send('Created');


})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})