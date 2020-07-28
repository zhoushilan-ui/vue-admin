import axios from 'axios';
//获取所有的文章
let list = (data) => axios.get('/article/list', { params: data });
//相当于
/* function list(data){
	return axios.get('/article/list', { params: data });
} */

//获取指定的id详情
let detail = (data) => axios.get('/article/detail', { params: data });

//添加一个文章
let add = (data) => axios.post('/article/add', data);

//编辑指定的id的文章
let edit=(data)=>axios.post('/article/edit',data);

//删除指定的文章列表
let remove=(data)=>axios.post('/article/delete',data);

export default {
	list,
	detail,
	add,
	edit,
	remove,
	
}
