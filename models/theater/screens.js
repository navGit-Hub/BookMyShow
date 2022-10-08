export default (sequelize,{DataTypes})=>{
    return sequelize.define('Screen',({
        id:{
            type:DataTypes.INTEGER,
            autoIncrement: true,
            unique:true,
            allowNull:false,
             primaryKey:true,
             validate:{
                notEmpty:true,
             }
          },
          theater_id:{
            type:DataTypes.INTEGER,
            unique:true,
            allowNull:false,
     
    
          },
          movie_name:{
            type:DataTypes.STRING,
            allowNull:false
        },
        //find the time slot in timing table through timings_id
          timings_id:{
            type:DataTypes.INTEGER,
            unique:true,
            allowNull:false,
       
          },
     isFree:{
        type:DataTypes.BOOLEAN
     },
     screen_no:{
      type:DataTypes.INTEGER,
      allowNull:false
     }

    }))
    
    
    }