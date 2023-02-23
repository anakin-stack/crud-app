const express = require("express");
const router = express.Router();
const tech = require("../models/tech");

router.get("/", async (req, res) => {
  console.log("got  request")
  try {
    const Tech = await tech.find();
    res.json(Tech) 

  } catch (err) {
    res.send("Error" + err);
  }
});

router.post('/create',  async(req, res) => {
  const tec =  new tech({
    taskName: req.body.title,
    is_completed: req.body.is_completed,

  })
  console.log(tec)
  console.log("this is the request body", req.body);

  try{
    console.log("trying to save in database")
      const a1 =   await tec.save();
      console.log("saved in database")
      res.send(200);
  }catch (err) {
      res.send("Error")
}
})

router.patch('/:id', async (req, res) => {
  try {
    const tec =  await tech.findById(req.params.id)
    tec.is_completed = req.body.is_completed
    console.log("hii")
    const a1 = await tec.save()
    res.send(200);
  } catch (err) {
    res.send('error')
  }
})


router.post('/Del',  async (req, res) => {
  try {
   
   console.log(req.body.id);
    const tec = await tech.findByIdAndRemove(req.body.id, function (err, data) {
      console.log("Error while deleting task: ", err);
    });
    
    
  } catch (err) {
    res.send('error')
  }
});



router.post('/edit',  async (req, res, next) => {
  console.log("Hitting Api")
  try {
      
      console.log("This is the rq body ", req.body)
      const id = req.body.id;
      const taskName = req.body.newTaskName;
      const is_completed = req.body.is_completed;

      console.log("taskname",taskName)

      const tec = await tech.findById({
          _id: id
      });       

      console.log("updating now!")
      tec.update({ taskName: taskName, is_completed: is_completed })
      .then(output => {
        console.log("Log after updating:", output);
      });
      console.log("updating done!")

      console.log("Validating ID", taskName, is_completed);

      // Employee does not exist
      if(!tec) {
          return next();
      }

      const tecH = await tech.updateOne({
          _id: id,
          }, {  
          $set: {a:2} },
          { upsert: true }
      );

      res.send(200);
  } catch(error) {
      next(error);
  }
});


module.exports = router;
