export default (sequelize,{DataTypes})=>{
    return sequelize.define('Timing',({
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

          //movie_name theater_name
movie_name:{
  type:DataTypes.STRING,
  allowNull:false
},

    theater_id:{
      type:DataTypes.INTEGER,
    },
      time_slots:{
        type:DataTypes.TIME
      }
    
    }))
    
    
    }