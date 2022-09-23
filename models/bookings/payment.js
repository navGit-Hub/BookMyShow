export default (sequelize,{DataTypes})=>{
    return sequelize.define('Payment',({
        id:{
            type:DataTypes.INTEGER,
            unique:true,
            allowNull:false,
             primaryKey:true,
             validate:{
                noEmpty:true,
             }
          },
          user_id:{
            type:DataTypes.INTEGER,
            unique:true,
            allowNull:false,
             primaryKey:true,
    
          },
       payment_method:{
        type:DataTypes.STRING,
       },
       saved_devices:{
        type:DataTypes.INTEGER
       }

    }))
    }