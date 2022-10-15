//check whether the movies rented period is over

import db from "../models/index.js"


//rent and fix a rental expiry date


//buy --> add the movie to purchased history


// rentedDate


const checkRentedMovies=async (req,res,next)=>{

   //check purchased_movies


   //calculate the rented period and remove the movie accordingly
  
   const user=await db.user.findOne({
    where:{
        email:req.body.email
    }
   })

   const purchased_movies=await db.purchased_movies.findAll({
    where:{
         user_id:user.id
    }
   })

    for(const movie of purchased_movies)
    {
   if(!movie.dataValues.owned)     
{        const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
const currentDay= new Date();
const  rented_day= movie.dataValues.rentedDate;

const diffDays = Math.round(Math.abs((currentDay - rented_day)/ oneDay));

  if(diffDays>2)
{     await db.purchased_movies.destroy({
        where:{
            id:movie.dataValues.id
        }
     })}


console.log(diffDays)}

    }

}


export {checkRentedMovies}
