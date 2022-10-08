import {Sequelize} from "sequelize";
import dotenv from 'dotenv';
import {account_settings,profile,purchase_history,stream_libraries,user,purchased_movies} from './account/index.js';
import {book,payment,timing} from './bookings/index.js'
import {general_events,
    movies,stream_movies,
    recommended_movies,
    advertisements} from './movies/index.js';
import {review} from './reviews/index.js';
import {screens,seats,theater} from './theater/index.js';
import verify from './verification/verification.js'


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

//  (async () => {
//     try{
//     await sequelize.sync({ force: true });
//     console.log("Drop and Resync DB");
//     }
//     catch(ex){
//         console.log("here", ex.message)
//     }
//   })(); 



const db={}

db.Sequelize=Sequelize;
db.sequelize=sequelize;

//account
db.account_settings=account_settings(sequelize,Sequelize);
db.profile=profile(sequelize,Sequelize);
db.purchase_history=purchase_history(sequelize,Sequelize);
db.stream_libraries=stream_libraries(sequelize,Sequelize);
db.user=user(sequelize,Sequelize);
db.purchase_history=purchase_history(sequelize,Sequelize);
db.purchased_movies=purchased_movies(sequelize,Sequelize);


//booking
db.book=book(sequelize,Sequelize);
db.payment=payment(sequelize,Sequelize);
db.timing=timing(sequelize,Sequelize);


//movies_events
db.general_events=general_events(sequelize,Sequelize);
db.movies=movies(sequelize,Sequelize);
db.stream_movies=stream_movies(sequelize,Sequelize);
db.recommended_movies=recommended_movies(sequelize,Sequelize);
db.advertisements=advertisements(sequelize,Sequelize);

//reviews
db.reviews=review(sequelize,Sequelize);


//theater
db.theater=theater(sequelize,Sequelize);
db.screens=screens(sequelize,Sequelize);
db.seats=seats(sequelize,Sequelize);



//verification
db.verify=verify(sequelize,Sequelize);

//relations

//account_settings
db.account_settings.hasMany(db.user,{
    foreignKey:"user_id",
    onDelete:"CASCADE",
    onUpdate:"CASCADE"
})

db.user.belongsTo(db.account_settings,{
    foreignKey:"user_id",
    onDelete:"CASCADE",
    onUpdate:"CASCADE"
})
db.account_settings.hasMany(db.purchase_history,{
  foreignKey:"pur_id",
  onDelete:"CASCADE",
  onUpdate:"CASCADE"
})

db.purchase_history.belongsTo(db.account_settings,{
    foreignKey:"pur_id",
    onDelete:"CASCADE",
    onUpdate:"CASCADE"
})



//purchased_movies

db.purchased_movies.hasMany(db.user,{
    foreignKey:"user_id",
    onDelete:"CASCADE",
    onUpdate:"CASCADE"
})

db.user.belongsTo(db.purchased_movies,{
    foreignKey:"user_id",
    onDelete:"CASCADE",
    onUpdate:"CASCADE"
})




//book_tickets


  db.book.hasMany(db.user,{
    foreignKey:"user_id",
    onDelete:"CASCADE",
    onUpdate:"CASCADE"
  })
  
  db.user.belongsTo(db.book,{
      foreignKey:"user_id",
      onDelete:"CASCADE",
      onUpdate:"CASCADE"
  })


//profile

db.profile.hasMany(db.user,{
    foreignKey:"user_id",
    onDelete:"CASCADE",
    onUpdate:"CASCADE"
  })
  
  db.user.belongsTo(db.profile,{
      foreignKey:"user_id",
      onDelete:"CASCADE",
      onUpdate:"CASCADE"
  })


  db.profile.hasOne(db.account_settings,{
    foreignKey:"account_id",
    onDelete:"CASCADE",
    onUpdate:"CASCADE"
  })
  
  db.account_settings.belongsTo(db.profile,{
      foreignKey:"account_id",
      onDelete:"CASCADE",
      onUpdate:"CASCADE"
  })

  //stream_movies

  db.stream_movies.hasMany(db.user,{
    foreignKey:"user_id",
    onDelete:"CASCADE",
    onUpdate:"CASCADE"
  })

  db.user.belongsTo(db.stream_movies,{
    foreignKey:"user_id",
    onDelete:"CASCADE",
    onUpdate:"CASCADE"
  })

  db.stream_movies.hasOne(db.movies,{
    foreignKey:"movie_id",
    onDelete:"CASCADE",
    onUpdate:"CASCADE"
  })
  db.movies.belongsTo(db.stream_movies,{
    foreignKey:"movie_id",
    onDelete:"CASCADE",
    onUpdate:"CASCADE"
  })

//movies

db.movies.hasOne(db.reviews,{
    foreignKey:"review_id",
    onDelete:"CASCADE",
    onUpdate:"CASCADE"
  })

  db.reviews.belongsTo(db.movies,{
    foreignKey:"review_id",
    onDelete:"CASCADE",
    onUpdate:"CASCADE"
  })

//stream_libraries
db.stream_libraries.hasMany(db.user,{
    foreignKey:"user_id",
    onDelete:"CASCADE",
    onUpdate:"CASCADE"
})

db.user.belongsTo(db.user,{
    foreignKey:"user_id",
    onDelete:"CASCADE",
    onUpdate:"CASCADE"
})


db.stream_libraries.hasMany(db.stream_movies,{
    foreignKey:"lib_id",
    onDelete:"CASCADE",
    onUpdate:"CASCADE"
})

db.stream_movies.belongsTo(db.stream_libraries,{
    foreignKey:"lib_id",
    onDelete:"CASCADE",
    onUpdate:"CASCADE"
})

db.stream_libraries.hasMany(db.movies,{
    foreignKey:"movie_id",
    onDelete:"CASCADE",
    onUpdate:"CASCADE"
})

db.movies.belongsTo(db.stream_libraries,{
    foreignKey:"movie_id",
    onDelete:"CASCADE",
    onUpdate:"CASCADE"
})

//reviews

db.reviews.hasOne(db.user,{
    foreignKey:"review_id",
    onDelete:"CASCADE",
    onUpdate:"CASCADE"
})

db.user.belongsTo(db.reviews,{
    foreignKey:"review_id",
    onDelete:"CASCADE",
    onUpdate:"CASCADE"
})

//timings



db.timing.hasMany(db.theater,{
     foreignKey:"theater_id",
     onDelete:"CASCADE",
     OnUpdate:"CASCADE"
})

db.theater.belongsTo(db.timing,{
    foreignKey:"theater_id",
    onDelete:"CASCADE",
    onUpdate:"CASCADE"
})

db.timing.hasMany(db.screens,{
    foreignKey:"screen_id",
    onDelete:"CASCADE",
    OnUpdate:"CASCADE"
})

db.screens.belongsTo(db.timing,{
   foreignKey:"screen_id",
   onDelete:"CASCADE",
   onUpdate:"CASCADE"
})







//theater-screen relationship







db.theater.belongsToMany(db.screens,{through:"screen_movies"});
db.screens.belongsToMany(db.theater,{through:"screen_movies"});






//general_events

//none for now




//purchase_history

db.purchase_history.hasMany(db.user,{
    foreignKey:"user_id",
    onDelete:"CASCADE",
    onUpdate:"CASCADE"
})


db.user.belongsTo(db.purchase_history,{
    foreignKey:"user_id",
    onDelete:"CASCADE",
    onUpdate:"CASCADE"
})


//recommended_movies


db.recommended_movies.hasMany(db.movies,{
    foreignKey:"movie_id",
    onDelete:"CASCADE",
    onUpdate:"CASCADE"
})

db.movies.belongsTo(db.recommended_movies,{
    foreignKey:"movie_id",
    onDelete:"CASCADE",
    onUpdate:"CASCADE"
})

//payment

db.payment.hasOne(db.book,{
    foreignKey:"book_id",
    onDelete:"CASCADE",
    onUpdate:"CASCADE"
})

db.book.belongsTo(db.payment,{
    foreignKey:"book_id",
    onDelete:"CASCADE",
    onUpdate:"CASCADE"
})






//verify

db.verify.hasMany(db.user,{
    foreignKey:"user_id",
    onDelete:"CASCADE",
    onUpdate:"CASCADE" 
})

db.user.belongsTo(db.verify,{
    foreignKey:"user_id",
    onDelete:"CASCADE",
    onUpdate:"CASCADE" 
})

//screens



db.screens.hasOne(db.theater,{
    foreignKey:"theater_id",
    onDelete:"CASCADE",
    onUpdate:"CASCADE"
})


db.theater.belongsTo(db.screens,{
    foreignKey:"theater_id",
    onDelete:"CASCADE",
    onUpdate:"CASCADE"
})





//screen theater manyToMany through seats


// db.screens.belongsToMany(db.theater,{through:db.seats});
// db.theater.belongsToMany(db.screens,{through:db.seats});



//screen-timings can have manyToMany



//one screen can have various time slots and many time slots can have a single screen

db.screens.belongsToMany(db.timing,{through:"screen_timing"});
db.timing.belongsToMany(db.screens,{through:"screen_timing"});





// seats

db.seats.hasOne(db.screens,{
    foreignKey:"screen_id",
    onDelete:"CASCADE",
    onUpdate:"CASCADE"
})

db.screens.belongsTo(db.seats,{
    foreignKey:"screen_id",
    onDelete:"CASCADE",
    onUpdate:"CASCADE"
})

db.seats.hasOne(db.theater,{
    foreignKey:"theater_id",
    onDelete:"CASCADE",
    onUpdate:"CASCADE"
})


db.theater.belongsTo(db.seats,{
    foreignKey:"theater_id",
    onDelete:"CASCADE",
    onUpdate:"CASCADE"
})







export  default db;











































