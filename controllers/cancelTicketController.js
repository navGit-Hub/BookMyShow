import book from "../models/bookings/book.js";
import db from "../models/index.js"





//cancel tickets within 20 minutes prior the show time 

//release seats remove bookings from user refund money

//50% refund

const cancelTicket=async (req,res)=>{

    try {

        const book=await db.book.findOne({where:{
            id:req.body.book_id
        }});

    //console.log(book)
         
   const value=book.dataValues.paid_amount;


//check the show time

// construct new Dates from book and current day and compare the
//current day and show time if between 20 minutes cancel the ticket 
//else  do not permit cancellation.



const date1=book.dataValues.date.split("-")

const time1=book.time.split(":")



const show_date=new Date(date1[0],date1[1]-1,date1[2],...time1);


const presentDayData=new Date().toLocaleString("en-US", {timeZone:"Asia/Kolkata"}).split(" ");


// console.log(presentDayData)

const today=Array.from(presentDayData[0].trim()).filter(elem=>{
  
  if(elem===',')
  return false;
  
  return true;
  
}).join("").split("/");
//console.log(today)

// console.log(presentDayData[1])
const todayTime=presentDayData[1].split(":");

// console.log(todayTime)

const present_day=new Date(today[2],today[0]-1,today[1],...todayTime);



// console.log(present_day)


const minutes=show_date-present_day

const minutes_remaining=Math.floor(minutes/60000);

console.log(minutes_remaining);


if(minutes_remaining<20)
{
      
    throw Error("The cancellation time has exceeded!!");


}


//console.log(value);

     const refund_amount=Math.floor(value/2);
      
if(!value)
    throw Error("The payment failed due to a technical error please try again!!") 

// free seats

const seats=book.dataValues.seats.split(" ");

for(const seat_no of seats)
{
     await db.seats.update({isBooked:false},{
        where:{
            seat_no,
            theater_id:book.dataValues.theater_id,
            screen_no:book.dataValues.screen_no,
            timing_id:book.dataValues.timing_id
        }     
      })
    //   console.log(            seat_no,
    //     book.dataValues.theater_id,
    //     book.dataValues.screen_no,
    //     book.dataValues.timing_id)

    //   await seat.update({isBooked:false});
      
}
 

await db.book.destroy({where:{
    id:req.body.book_id
}})

        res.status(200).send(`The refund of amount Rs.${refund_amount} was processed successfully!!`)
        
    } catch (error) {
        
        res.status(500).send({msg:error.message})
    }

}

export {cancelTicket}


