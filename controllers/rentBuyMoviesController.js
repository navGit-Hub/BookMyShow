
import db from "../models/index.js"

const buyOrRentMovies=async (req,res)=>{


// req.movie_id   

// fetch movies and create purchase 

//req.body purchase=true

if(req.body.purchase)
{   
    await db.purchased_movies.create({

        user_id:req.body.user_id,
        movie_id:movie.id
    })
}
else{
      await db.purchased_movies.create({
        user_id:req.body.user_id,
        movie_id:req.body.movie_id,
        owned:false,
        rentedDate:new Date()
      })
}
}



export {buyOrRentMovies}