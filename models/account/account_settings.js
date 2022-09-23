export default (sequelize,{DataTypes})=>{
return sequelize.define('Account_setting',({
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
      purchase_id:{
        type:DataTypes.INTEGER,
        unique:true,
        allowNull:false,
         primaryKey:true,
      },
}))


}