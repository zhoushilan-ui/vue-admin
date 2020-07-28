import axios from 'axios';
//获取子级分类
let subcate = (data) => axios.get('/category/sub', { params: data });

//获取所有的分类
let list=(data)=>axios.get('/category/list',{ params: data });
//添加分类
let insertnode=(data)=>axios.post('/category/add',data);

//编辑分类
let edit=(data)=>axios.post('/category/edit',data);

//删除分类
let remove=(data)=>axios.post('/category/delete',data);

export default {
	subcate,
	insertnode,
	edit,
	remove,
	list,
}
