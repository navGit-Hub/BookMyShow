export default (sequelize,{DataTypes})=>{
    return sequelize.define('Event',({
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
         online_outdoor:{
            type:DataTypes.BOOLEAN
         },
         event_outline:{
            type:DataTypes.STRING
         },
         location:{
            type:DataTypes.STRING
         },
         image:{
            type:DataTypes.STRING
         }

    }))
    
    

    
    }