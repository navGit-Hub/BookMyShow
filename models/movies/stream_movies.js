export default (sequelize,{DataTypes})=>{
    return sequelize.define('StreamMovie',({
        id:{
            type:DataTypes.INTEGER,
            unique:true,
            allowNull:false,
             primaryKey:true,
             validate:{
                notEmpty:true,
             }
          },
          user_id:{
            type:DataTypes.INTEGER,
            unique:true,
            allowNull:false,
             primaryKey:true,
    
          },
          movie_id:{
            type:DataTypes.INTEGER,
            unique:true,
            allowNull:false,
             primaryKey:true,
          },
popularity:{
    type:DataTypes.INTEGER
},
likes:{
    type:DataTypes.INTEGER
},
language:{
    type:DataTypes.STRING
}
    }))
    }