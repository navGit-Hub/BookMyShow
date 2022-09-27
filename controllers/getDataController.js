import db from "../models/index.js";

const getMovies=async (req,res)=>{
console.log(req.que)
try {
    
const movie=await db.movies.findAll({
    where:{
        genre:req.query["genre"]
    }
})
console.log(movie)

if(movie)
res.send(movie)

} catch (error) {
    res.status(500).send({msg:error.message})
}


}

const getGeneralEvents=async (req,res)=>{

    console.log(req.query)
    try {
     
        const general_events=await db.general_events.findAll({
            where:{
                event_outline:req.query["event_outline"]
            }
        })
        if(general_events)
        res.send(general_events)
        
        } catch (error) {
            res.status(500).send({msg:error.message})
        }
        




}


export {getMovies,getGeneralEvents}

