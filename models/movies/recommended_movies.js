
import es from '../../config/es.js';
import db from "../index.js";


const saveDocument= async (instance)=>{

  let include={model:db.account};
  await instance.reload({include})

    return await es.create({
      index:"recommendedMovie",
      id:instance.dataValues.movie_id,
      body:{
          movie_id:instance.dataValues.movie_id,
          popularity:instance.dataValues.popularity,
          likes:instance.dataValues.likes,
          language:instance.dataValues.language,
          region:instance.dataValues.region,
          movie:instance.dataValues.Movie.dataValues
      }
    })

}

const deleteDocument= async (instance)=>{
  
   return es.delete({
   index:'recommendedMovie',
   id:instance.dataValues.movie_id
   })

   
}
//stream_movies and movie changed pk to movie_id



export default (sequelize,{DataTypes})=>{
    return sequelize.define('RecommendedMovie',({

          movie_id:{
            type:DataTypes.INTEGER,
            unique:true,
            allowNull:false,
            primaryKEy:true
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
    }),{
        timestamps: true,
  
        hooks: {
          afterCreate: saveDocument,
          afterUpdate: saveDocument,
          afterDestroy: deleteDocument,
        },
      })
    }