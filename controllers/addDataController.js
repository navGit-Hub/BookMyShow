import db from "../models/index.js";




const addMovies=async (req,res)=>{
try {
    
   req.body.arr.forEach(async element => {
    
         await db.movies.create({
    ...element
         })



   });
res.send({message:"Movies added"})


} catch (error) {
    res.send({err:error.message})
}

}
const addGeneralEvents=async (req,res)=>{

try {


     req.body.arr.forEach(async element => {
    
        await db.general_events.create({
                ...element
          })

     });

res.send({message:"The events were added successfully!!"})


} catch (error) {
    res.status(500).send({message:error.message})
}




}


































export {addMovies,addGeneralEvents};