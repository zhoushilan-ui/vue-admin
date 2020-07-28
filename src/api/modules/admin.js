import axios from "axios";

//登录 data数据
let login = (data) => axios.post('/admin/login', data);

//注册
let register = (data) => axios.post('/admin/register', data);


//获取用户列表信息
let list = (data) => axios.get('/admin/list', { params: data });

//管理员的个人资料
let info = (data) => axios.get('/admin/info', { params: data });

//编辑管理员的信息
let edit = (data) => axios.post('/admin/info', data);


//删除账户
let remove = (data) => axios.post('/admin/delete', data);

//删除数据库图片
let removeimg = (data) => axios.post('/upload/delete', data);

//把数据送出去
export default {
	login,
	register,
	info,
	list,
	edit,
	remove,
	removeimg,
}
