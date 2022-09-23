export default (sequelize,{DataTypes})=>{
    return sequelize.define('Event',({
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
          book_id:{
            type:DataTypes.INTEGER,
            unique:true,
            allowNull:false,
             primaryKey:true,
          },
         online_outdoor:{
            type:DataTypes.BOOLEAN
         },
         event_outline:{
            type:DataTypes.STRING
         },
         location:{
            type:DataTypes.STRING
         }

    }))
    
    
    }