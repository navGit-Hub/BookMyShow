import db from "../models/index.js";


const checkSuperUser=async (req,res,next)=>{



   const bookings=await db.book.findAll({where:{
         email:req.body.email
    }})
   


if(bookings.length>=10)
{
      const user=await b.user.findOne({
        where:{
            email:req.body.email
        }
      })

    if(!user.superStar)
      {      await db.user.update({superStar:true},{
        where:{
             email:req.body.email
        }
      })}
}




    next();



}




export {checkSuperUser}










