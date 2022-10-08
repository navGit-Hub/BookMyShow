export default (sequelize,{DataTypes})=>{

// one screen can cast many movies in different time slots.
// so the screes_id has to be mapped with movie name


//theater and screens can have many to many

//many to many theater and screen


//screen timing can have manyToMany



    return sequelize.define('Screen',({
        id:{
            type:DataTypes.INTEGER,
            allowNull:false,
            primaryKey:true,
            autoIncrement:true,
             validate:{
                notEmpty:true,
             }
          },
          theater_id:{
            type:DataTypes.INTEGER,
            allowNull:false,
     
    
          },
          movie_name:{
            type:DataTypes.STRING,
            allowNull:false
        },
        //find the time slot in timing table through timings_id
         //  timings_id:{
         //    type:DataTypes.INTEGER,
         //    unique:true,
         //    allowNull:false,
       
         //  },
     isFree:{
        type:DataTypes.BOOLEAN,
        defaultValue:false
     },
     screen_no:{
      type:DataTypes.INTEGER,
      allowNull:false
     }

    }))
    
    
    }