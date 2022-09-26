export default (sequelize,{DataTypes})=>{
    return sequelize.define('Screen',({
        id:{
            type:DataTypes.INTEGER,
            unique:true,
            allowNull:false,
             primaryKey:true,
             validate:{
                notEmpty:true,
             }
          },
     movies:{
        type:DataTypes.STRING
     },
     isFree:{
        type:DataTypes.BOOLEAN
     }

    }))
    
    
    }