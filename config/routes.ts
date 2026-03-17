export default [
	{
		path: '/user',
		layout: false,
		routes: [
			{
				path: '/user/login',
				layout: false,
				name: 'login',
				component: './user/Login',
			},
			{
				path: '/user',
				redirect: '/user/login',
			},
		],
	},

	///////////////////////////////////
	// DEFAULT MENU
	{
		path: '/dashboard',
		name: 'Dashboard',
		component: './TrangChu',
		icon: 'HomeOutlined',
	},
	{
		path: '/products',
		name: 'Quản lý sản phẩm',
		icon: 'ShoppingOutlined',
		component: './products',
	  },
	  
	{
		path: '/gioi-thieu',
		name: 'About',
		component: './TienIch/GioiThieu',
		hideInMenu: true,
	},
	{
		path: '/random-user',
		name: 'RandomUser',
		component: './RandomUser',
		icon: 'ArrowsAltOutlined',
	},
	{
		path: '/todo-list',
		name: 'TodoList',
		icon: 'OrderedListOutlined',
		component: './TodoList',
	},

	// DANH MUC HE THONG
	// {
	// 	name: 'DanhMuc',
	// 	path: '/danh-muc',
	// 	icon: 'copy',
	// 	routes: [
	// 		{
	// 			name: 'ChucVu',
	// 			path: 'chuc-vu',
	// 			component: './DanhMuc/ChucVu',
	// 		},
	// 	],
	// },

	{
		path: '/notification',
		routes: [
			{
				path: './subscribe',
				exact: true,
				component: './ThongBao/Subscribe',
			},
			{
				path: './check',
				exact: true,
				component: './ThongBao/Check',
			},
			{
				path: './',
				exact: true,
				component: './ThongBao/NotifOneSignal',
			},
			
		],
		layout: false,
		hideInMenu: true,
	},
	{
		path: '/',
	},
	{
		path: '/403',
		component: './exception/403/403Page',
		layout: false,
	},
	{
		path: '/hold-on',
		component: './exception/DangCapNhat',
		layout: false,
	},
	{
		name: 'Trò chơi',
		path: '/th01',
		icon: 'TrophyOutlined',
		component: '@/pages/th01',
	},
	{
		name: 'Quản lý học tập',
		path: '/th02',
		icon: 'ReadOutlined',
		component: '@/pages/th02',
	},
	{
		path: '/th03',
		name: 'Oẳn Tù Tì',
		icon: 'ScissorOutlined',
		component: '@/pages/th03',
	},
	{
		path: '/th04',
		name: 'Ngân hàng câu hỏi',
		icon: 'DatabaseOutlined',
		component: '@/pages/th04',
    },
    {
		path: '/TH3',
		name: 'Đặt lịch dịch vụ',
		icon: 'calendar',
		component: '@/pages/TH3'
    },

	{
		component: './exception/404',
	},
];
