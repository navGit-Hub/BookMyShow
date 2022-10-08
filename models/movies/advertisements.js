export default (sequelize,{DataTypes})=>{
    return sequelize.define('Advertisement',({
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
         image:{
            type:DataTypes.STRING
         },
      date:{
        type:DataTypes.DATE
      }
    }))
    
    
    }