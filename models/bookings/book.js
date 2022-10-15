import { DATE } from "sequelize"

export default (sequelize,{DataTypes})=>{
    return sequelize.define('BookTicket',({
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
          user_id:{
            type:DataTypes.INTEGER,
            allowNull:false,
          },
          movie_name:{
            type:DataTypes.STRING,

            allowNull:false,
          },
          theater_name:{
            type:DataTypes.STRING,
            allowNull:false,
          },
theater_id:{
type:DataTypes.INTEGER,
allowNull:false

},

timing_id:{
   type:DataTypes.INTEGER,
   allowNull:false
}
,
time:{
type:DataTypes.TIME,
allowNull:false
},
number_of_tickets:{
   type:DataTypes.INTEGER,
   allowNull:false
},
seats:{
   type:DataTypes.STRING,
   allowNull:false
}
,
date:{
   type:DataTypes.DATEONLY,
   allowNull:false

},
screen_no:{
   type:DataTypes.INTEGER,
   allowNull:false
},
paid_amount:{
   type:DataTypes.INTEGER,
    allowNull:false,
   defaultValue:0
},
email:{
   type:DataTypes.STRING,
   allowNull:false
}
    }))
    }