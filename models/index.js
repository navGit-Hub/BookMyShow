import {Sequelize} from "sequelize";
import dotenv from 'dotenv';
import {account_settings,profile,purchase_history,stream_libraries,user} from './account/index.js';
import {book,payment,ticket,timing} from './bookings/index.js'
import {general_events,movies,stream_movies,theater_movies} from './movies/index.js';
import {review} from './reviews/index.js';
import {screens,seats,theater} from './theater/index.js';



dotenv.config();


const sequelize=new Sequelize(process.env.DB, process.env.USER_NAME,process.env.PASSWORD,{
host:process.env.HOST,
dialect:process.env.dialect,
logging:false
});

const db_connect= async ()=>{
  
    try {

        await sequelize.authenticate();
        console.log("connected to the dataBase!!")
        
    } catch (error) {
         
        console.log("Error:",error);
    }
}


db_connect();


(async () => {
    try{
    await sequelize.sync({ force: true });
    console.log("Drop and Resync DB");
    }
    catch(ex){
        console.log("here", ex.message)
    }
  })();


const db={}

db.Sequelize=Sequelize;
db.sequelize=sequelize;

//account
db.account_settings=account_settings(sequelize,Sequelize);
db.profile=profile(sequelize,Sequelize);
db.purchase_history=purchase_history(sequelize,Sequelize);
db.stream_libraries=stream_libraries(sequelize,Sequelize);
db.user=user(sequelize,Sequelize);


//booking
db.book=book(sequelize,Sequelize);
db.payment=payment(sequelize,Sequelize);
db.ticket=ticket(sequelize,Sequelize);
db.timing=timing(sequelize,Sequelize);


//movies_events
db.general_events=general_events(sequelize,Sequelize);
db.movies=movies(sequelize,Sequelize);
db.stream_movies=stream_movies(sequelize,Sequelize);
db.theater_movies=theater_movies(sequelize,Sequelize);

//reviews
db.reviews=review(sequelize,Sequelize);


//theater
db.theater=theater(sequelize,Sequelize);
db.screens=screens(sequelize,Sequelize);
db.seats=seats(sequelize,Sequelize);


//relations







export  default db;











































