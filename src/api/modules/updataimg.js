import axios from 'axios';

 let del = (data) => axios.post('/upload/delete', data);

 export default {
 	del,
 }
