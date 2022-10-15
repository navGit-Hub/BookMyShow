import es from '../../config/es.js';
import db from "../index.js";


const saveDocument= async (instance)=>{

  let include={model:db.movies};
  await instance.reload({include})

    return await es.create({
      index:"streamMovie",
      id:instance.dataValues.movie_id,
      body:{
        movie_id:instance.dataValues.movie_id,
        user_id:instance.dataValues.user_id,
        popularity:instance.dataValues.popularity,
        likes:instance.dataValues.likes,
        language:instance.dataValues.language,
          movie:instance.dataValues.Movie.dataValues
      }
    })


}


const deleteDocument= async (instance)=>{
  
   return es.delete({
   index:'streamMovie',
   id:instance.dataValues.movie_id
   })

   
}

export default (sequelize,{DataTypes})=>{
    return sequelize.define('StreamMovie',({
          user_id:{
            type:DataTypes.INTEGER,
            unique:true,
            allowNull:false,
            
    
          },
          movie_id:{
            type:DataTypes.INTEGER,
            unique:true,
            primaryKey:true,
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
}
    }),{
        timestamps: true,
  
        hooks: {
          afterCreate: saveDocument,
          afterUpdate: saveDocument,
          afterDestroy: deleteDocument,
        },
      })
    }