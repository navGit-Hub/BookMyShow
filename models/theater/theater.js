export default (sequelize,{DataTypes})=>{
    return sequelize.define('Theater',({
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
      theater_name:{
      type:DataTypes.STRING,
allowNull:false
      },
location:{
    type:DataTypes.STRING
}
    }))
    }