export default (sequelize,{DataTypes})=>{
    return sequelize.define('RecommendedMovie',({
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
          movie_id:{
            type:DataTypes.INTEGER,
            unique:true,
            allowNull:false,
          },
popularity:{
    type:DataTypes.INTEGER
},
likes:{
    type:DataTypes.INTEGER
},
language:{
    type:DataTypes.STRING
},
region:{
    type:DataTypes.STRING
}
    }))
    }