export default (sequelize,{DataTypes})=>{
    return sequelize.define('Payment',({
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
          book_id:{
            type:DataTypes.INTEGER,
            unique:true,
            allowNull:false,
    
          },
 
       payment_status:{
        type:DataTypes.BOOLEAN,
        defaultValue:false
       },


    }))
    }