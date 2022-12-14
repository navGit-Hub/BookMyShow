import db from "../models/index.js";


const addMovies=async (arr)=>{
    try {
        
       arr.forEach(async element => {
        
             await db.movies.create({
        ...element
             })
    
    console.log("")
    
       });
    } catch (error) {
        console.log(error.message);
    }
    
    }

    const addGeneralEvents=async (arr)=>{

        try {
        
        
             arr.forEach(async element => {
            
                await db.general_events.create({
                        ...element
                  })
        
             });
        } catch (error) {
            console.log(error.message);
        }
        
        
        
        
        }
        
        
        const addTheaters=async (arr)=>{
        
             try {
             
             
                 arr.forEach(async element => {
                 
                     await db.theater.create({
                             ...element
                       })
             
                  });
             
             
             } catch (error) {
                 console.log(error.message);
             }
             
             }
        
             const addScreens=async (arr)=>{
        
                  try {
                  
                  
                       arr.forEach(async element => {
                      
                          await db.screens.create({
                                  ...element
                            })
                  
                       });
                  
                  
                  
                  
                  } catch (error) {
                      console.log(error.message);
                  }
                  
                  }
        
        
                  const addTimings=async (arr)=>{
        
                       try {
                       
                       
                            arr.forEach(async element => {
                           
                               await db.timing.create({
                                       ...element
                                 })
                       
                            });
                       
                       } catch (error) {
                           console.log(error.message)
                       }
                       
                       }
                       const addSeats=async (arr)=>{
        
                        try {
                        
                        
                             arr.forEach(async element => {
                            
                                await db.seats.create({
                                        ...element
                                  })
                        
                             });
                        
                        } catch (error) {
                            console.log(error.message)
                        }
                        
                        }

const populateDB=()=>{


addGeneralEvents([

    {
    "online_outdoor":false,
    "event_outline":"Standup-Comedy",
    "location":"Chennai"
    },
    {
    
    "online_outdoor":false,
    "event_outline":"Standup-Comedy",
    "location":"Chennai",
    "image":"Default.jpeg"
    },
    {
    "online_outdoor":false,
    "event_outline":"Yuvan-concer",
    "location":"Chennai",
    "image":"Default.jpeg"
    },{
    "online_outdoor":false,
    "event_outline":"Anirudh-Concert",
    "location":"Chennai"
    },
    {
    "online_outdoor":false,
    "event_outline":"Dance-Show",
    "location":"Chennai"
    },
    {
    "online_outdoor":false,
    "event_outline":"Food-Expo",
    "location":"Chennai"
    },{
    "online_outdoor":false,
    "event_outline":"Photography",
    "location":"Chennai"
    },{
    "online_outdoor":false,
    "event_outline":"Bharatanatyam",
    "location":"Chennai"
    },
    {
    "online_outdoor":false,
    "event_outline":"Standup-Comedy",
    "location":"Super-Singer"
    },
    {
    "online_outdoor":false,
    "event_outline":"Music-Concert",
    "location":"Coimbatore"
    }
]);
addMovies([
    {
   "review_id":1,
   "title":"KingKong",
   "genre":"Science-Fiction",
   "duration":2,
   "rating":8,
   "certificate":"U/A",
    "language":"Tamil"
  },
  {
   "review_id":2,
   "title":"Kadhalum Kadanthu Pogum",
   "genre":"Romantic-Comedy",
   "duration":2,
   "rating":8,
   "certificate":"U/A",
   "language":"Tamil"
  },
  {
   "review_id":3,
   "title":"Vikram Vedha",
   "genre":"Action/ Crime/ Thriller",
   "duration":2,
   "rating":8,
   "certificate":"U/A",
    "language":"Tamil",
    "image":"https://assets-in.bmscdn.com/discovery-catalog/events/tr:w-400,h-600,bg-CCCCCC:w-400.0,h-660.0,cm-pad_resize,bg-000000,fo-top:oi-discovery-catalog@@icons@@heart_202006300400.png,ox-24,oy-617,ow-29:ote-ODclICA0MGsgdm90ZXM%3D,ots-29,otc-FFFFFF,oy-612,ox-70:q-80/et00319143-egauxbljnf-portrait.jpg"
  },{
   "review_id":4,
   "title":"Nane Varuven",
   "genre":"Action/ Psychological/ Thriller",
   "duration":2,
   "rating":8,
   "certificate":"U/A",
   "language":"Tamil",
   "image":"https://assets-in.bmscdn.com/discovery-catalog/events/tr:w-400,h-600,bg-CCCCCC:w-400.0,h-660.0,cm-pad_resize,bg-000000,fo-top:oi-discovery-catalog@@icons@@heart_202006300400.png,ox-24,oy-617,ow-29:ote-ODMlICAyMGsgdm90ZXM%3D,ots-29,otc-FFFFFF,oy-612,ox-70:q-80/et00304895-rphemrjuhc-portrait.jpg"
   
  },
  {
   "review_id":5,
   "title":"Ponniyin Selvan Part 1",
   "genre":"Actio/  Adventure/ Drama/ Historical",
   "duration":2,
   "rating":8,
   "certificate":"U/A",
    "language":"Tamil",
    "image":"https://assets-in.bmscdn.com/discovery-catalog/events/tr:w-400,h-600,bg-CCCCCC:w-400.0,h-660.0,cm-pad_resize,bg-000000,fo-top:oi-discovery-catalog@@icons@@heart_202006300400.png,ox-24,oy-617,ow-29:ote-ODclICAxMTNrIHZvdGVz,ots-29,otc-FFFFFF,oy-612,ox-70:q-80/et00323897-zvgjhaqnxq-portrait.jpg"
  }
      ]);
      addTheaters(

        [
           {
            "theater_name":"Kamala Cinemas",
            "location":"Chennai"
           },
           {
            "theater_name":"KG Cinemas",
            "location":"Coimbatore",
            
           },
           {
            "theater_name":"Rohini Silver Screens",
            "location":"Chennai"
           },
           {
            "theater_name":"Pvr VR",
            "location":"Chennai"
           },
           {
            "theater_name":"Krishnaveni Cinemas",
            "location":"Chennai"
           }
        ]
        );
addScreens(
[
   
{
    "theater_id":1,
    "movie_name":"Ponniyin Selvan Part-1",
    "screen_no":1
},
{
    "theater_id":1,
    "movie_name":"Nane Varuven",
    "screen_no":1
},

]
);

addTimings([
 
{
    "movie_name":"Ponniyin Selvan Part-1",
    "theater_id":1,
    "screen_no":1,
    "time_slot":"16:00:00",
    "date":"2022-10-14"
},
{
    "movie_name":"Nane Varuven",
    "theater_id":1,
    "screen_no":1,
    "time_slot":"20:00:00",
    "date":"2022-10-09"
},{
    "movie_name":"Ponniyin Selvan Part-1",
    "theater_id":1,
    "screen_no":1,
    "time_slot":"10:00:00",
    "date":"2022-10-10"
},
{
    "movie_name":"Nane Varuven",
    "theater_id":1,
    "screen_no":1,
    "time_slot":"08:00:00",
    "date":"2022-10-14"
}
]);

addSeats([

{
    "seat_id":1,
   "theater_id":1,
   "screen_no":1,
   "seat_no":"1A",
   "timing_id":1
},
{
    "seat_id":2,
    "theater_id":1,
    "screen_no":1,
    "seat_no":"2A",
    "timing_id":1
},
{
    "seat_id":3,
    "theater_id":1,
    "screen_no":1,
    "seat_no":"3A",
    "timing_id":1
},
{
    "seat_id":4,
    "theater_id":1,
    "screen_no":1,
    "seat_no":"4A",
    "timing_id":1
},
{
    "seat_id":5,
    "theater_id":1,
    "screen_no":1,
    "seat_no":"5A",
    "timing_id":1
},{
    "seat_id":1,
    "theater_id":1,
    "screen_no":1,
    "seat_no":"1A",
    "timing_id":2
 },
 {
     "seat_id":2,
     "theater_id":1,
     "screen_no":1,
     "seat_no":"2A",
     "timing_id":2
 },
 {
    "seat_id":3,
     "theater_id":1,
     "screen_no":1,
     "seat_no":"3A",
     "timing_id":2
 },
 {
     "seat_id":4,
     "theater_id":1,
     "screen_no":1,
     "seat_no":"4A",
     "timing_id":2
 },
 {
      "seat_id":5,
     "theater_id":1,
     "screen_no":1,
     "seat_no":"5A",
     "timing_id":2
 },
  {
    "seat_id":1,
    "theater_id":1,
    "screen_no":1,
    "seat_no":"1A",
    "timing_id":3
 },
 {
     "seat_id":2,
     "theater_id":1,
     "screen_no":1,
     "seat_no":"2A",
     "timing_id":3
 },
 {
    "seat_id":3,
     "theater_id":1,
     "screen_no":1,
     "seat_no":"3A",
     "timing_id":3
 },
 {
     "seat_id":4,
     "theater_id":1,
     "screen_no":1,
     "seat_no":"4A",
     "timing_id":3
 },
 {
      "seat_id":5,
     "theater_id":1,
     "screen_no":1,
     "seat_no":"5A",
     "timing_id":3
 },
 {
    "seat_id":1,
    "theater_id":1,
    "screen_no":1,
    "seat_no":"1A",
    "timing_id":4
 },
 {
     "seat_id":2,
     "theater_id":1,
     "screen_no":1,
     "seat_no":"2A",
     "timing_id":4
 },
 {
    "seat_id":3,
     "theater_id":1,
     "screen_no":1,
     "seat_no":"3A",
     "timing_id":4
 },
 {
     "seat_id":4,
     "theater_id":1,
     "screen_no":1,
     "seat_no":"4A",
     "timing_id":4
 },
 {
      "seat_id":5,
     "theater_id":1,
     "screen_no":1,
     "seat_no":"5A",
     "timing_id":4
 }

])




}


export {populateDB};