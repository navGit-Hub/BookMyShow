import {Client} from '@elastic/elasticsearch';

import dotenv from 'dotenv';

dotenv.config();

export default new Client({
cloud:{
id:process.env.ELASTIC_CLOUDID,
},
auth:{
    username:process.env.ELASTIC_USERNAME,
    password:process.env.ELASTIC_PASSWORD
}
})
