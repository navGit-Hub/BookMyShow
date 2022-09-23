export default (sequelize,{DataTypes})=>{
    return sequelize.define('Profile',({
          user_id:{
            type:DataTypes.INTEGER,
            unique:true,
            allowNull:false,
             primaryKey:true,
    
          },
          account_id:{
            type:DataTypes.INTEGER,
            unique:true,
            allowNull:false,
             primaryKey:true,
          },
         rewards:{
            type:DataTypes.STRING
         }

    }))
    
    
    }