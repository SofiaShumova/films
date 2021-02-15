exports.getMenu = (selected = 'Каталог') => {
    return {
        selected: selected,
        nav: [{
                title: 'Главная',
                path: '/',
            },
            {
                title: 'Каталог',
                path: '/catalogy',
            },
            {
                title: 'Избранное',
                path: '/favorite',
            },
            {
                title: 'Кабинет',
                path: '/login',
            },
            {
                title: 'О сервисе',
                path: '/',
            },
        ],
    };
};