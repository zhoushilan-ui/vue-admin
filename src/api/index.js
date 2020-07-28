import Admin from './modules/admin.js';
import Article from './modules/article'; //把在arti.js中export出来的组成一个模块，再export出去
import User from './modules/user';
import Role from './modules/role';
// import Customer from './modules/customer';

import Upload from './modules/updataimg.js';

import Category from './modules/category.js';

export {
	Admin,
	Article,
	User,
	Role,
	Upload ,
	Category,
}