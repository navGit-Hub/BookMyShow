export default (sequelize,{DataTypes})=>{
    return sequelize.define('Theater',({
        id:{
            type:DataTypes.INTEGER,
            unique:true,
            allowNull:false,
             primaryKey:true,
             validate:{
                noEmpty:true,
             }
          },
          screen_id:{
            type:DataTypes.INTEGER,
            unique:true,
            allowNull:false,
             primaryKey:true,
    
          },
          seats_id:{
            type:DataTypes.INTEGER,
            unique:true,
            allowNull:false,
             primaryKey:true,
          },
          theatrical_movies_id:{
            type:DataTypes.INTEGER,
            unique:true,
            allowNull:false,
             primaryKey:true,
    
          },
          timings_id:{
            type:DataTypes.INTEGER,
            unique:true,
            allowNull:false,
             primaryKey:true,
          },

location:{
    type:DataTypes.STRING
}
    }))
    }