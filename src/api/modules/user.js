import axios from 'axios';
//获取用户列表
let list=(data)=>axios.get(`/user/list`,data);

//删除用户的信息
let remove=(id)=>axios.delete(`/user/${id}`);

//编辑个人用户
let edit=(id,data)=>axios.put(`/user/${id}`,data);

//获取个人资料
let info=(data)=>axios.get(`/user/`,{params:data});

export default{
	list,
	remove,
	edit,
	info,
}