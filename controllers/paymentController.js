import dotenv from 'dotenv';
import db from '../models/index.js';

import Stripe from 'stripe';


dotenv.config();


//change payment status to true to confirm booking

const stripe=Stripe(process.env.STRIPE_SECRET_KEY)

const makePayment=async (req,res)=>{

try {

    const booking=await db.book.findOne({
        where:{
            user_id:req.body.user_id,
            theater_name:req.body.theater_name,
            movie_name:req.body.movie_name,
            date:req.body.date,
            time:req.body.time
             
        }
    })


//map seat logic with seat numbers

const amount=[];
console.log(booking)

const seats=booking.seats.split(" ")


for(const seat of seats)
{

   if(seat[seat.length-1]==="A")
        amount.push(60);
    else if(seat[seat.length-1]==="B")
         amount.push(80)
    else if(seat[seat.length-1]==="C")
         amount.push(100)
    else if(seat[seat.length-1]==="D")
         amount.push(120)
}
    
const total_amount=amount.reduce((prev,curr)=>prev+curr);



    const session=await stripe.checkout.sessions.create({
        payment_method_types:['card'],
        mode:'payment',
        success_url:`http://localhost:3000/payments/success/{CHECKOUT_SESSION_ID}?book_id=${booking.id}&paid_amount=${total_amount}`,
        cancel_url:`http://localhost:3000/payments/failed/{CHECKOUT_SESSION_ID}?book_id=${booking.id}`,
        line_items:amount.map((amt,index)=>{

          
     return  {
                price_data:{
                    currency:'inr',
                    product_data:{
                        name:`${booking.movie_name}, ${booking.theater_name}, Screen ${booking.screen_no}, Seat : ${seats[index]}
                                                       ${booking.date} ${booking.time}
                        `
                    },
                    unit_amount:amt*100
                },
                quantity:1
            }
        })

        })


res.json({url:session.url})


} catch (error) {
    
res.status(500).json({error:error.message})

}


}


//migrate database




const paymentSuccess=async (req,res)=>{
  try {

    const sessionId = req.params.id;

    console.log(req.query.paid_amount,req.query.book_id)

    const book=await db.book.findOne({
        where:{id:req.query["book_id"]}
      });
       
       await db.book.update({paid_amount:req.query["paid_amount"]},{
        where:{
            id:req.query["book_id"]
        }
       })

      await db.payment.update({payment_status:true},{
        where:{
            book_id:book.id
        }
    })
const book_update=await db.book.findOne({
    where:{
        id:req.query["book_id"]
    }
})
      //console.log(book_update)



      res.json(book_update);
    
  } catch (error) {
    
      res.status(500).send({msg:error.message})
   


  }
}


const paymentFail=async (req,res)=>{
    try {
  
      const sessionId = req.params.id;
  
       const book=await db.book.findOne({
          where:{id:req.query["book_id"]}
        });
  
        await db.payment.update({payment_status:false},{
          where:{
              book_id:book.id
          }
      })
    //   await db.book.destroy({where:{
    //     id:book.id
    //   }})
  
        res.send({msg:"The payment was not processed, your booking is on hold!!"});
      
    } catch (error) {
      
        res.status(500).send({msg:error.message})
     
  
  
    }
  }


export {makePayment,paymentSuccess,paymentFail};







