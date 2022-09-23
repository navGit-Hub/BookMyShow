export default (sequelize,{DataTypes})=>{
    return sequelize.define('Timing',({
        id:{
            type:DataTypes.INTEGER,
            unique:true,
            allowNull:false,
             primaryKey:true,
             validate:{
                noEmpty:true,
             }
          },
          screen_id:{
            type:DataTypes.INTEGER,
            unique:true,
            allowNull:false,
             primaryKey:true,
    
          },
          movie_id:{
            type:DataTypes.INTEGER,
            unique:true,
            allowNull:false,
             primaryKey:true,
          },
      allotedTime:{
        type:DataTypes.TIME
      },
      available_time:{
        type:DataTypes.TIME
      }
    

    }))
    
    
    }