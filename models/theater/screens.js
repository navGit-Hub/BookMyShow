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
          seat_id:{
            type:DataTypes.INTEGER,
            unique:true,
            allowNull:false,
             primaryKey:true,
          },
          theater_id:{
            type:DataTypes.INTEGER,
            unique:true,
            allowNull:false,
             primaryKey:true,
    
          },
          timings_id:{
            type:DataTypes.INTEGER,
            unique:true,
            allowNull:false,
             primaryKey:true,
          },
     movies:{
        type:DataTypes.STRING
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