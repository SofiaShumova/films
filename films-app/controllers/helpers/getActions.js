exports.getActions = (isAdmin = false) => {
    const actions = [{
            title: 'Сменить имя пользователя',
            route: '/account/username',
            method: '',
        },
        { title: 'Сменить email', route: '/account/email', method: '' },
        { title: 'Сменить пароль', route: '/account/password', method: '' },
        { title: 'Сменить изображение', route: '/account/image', method: '' },
        { title: 'Выход', route: '/account/logout', method: '' },
        { title: 'Сменить статус', route: '/account/admin', method: '' },
        { title: 'Удалить аккаунт', route: '/account/delete', method: '' },
    ];

    if (!isAdmin) return actions;
    actions.push({ title: 'Добавить фильм в каталог', route: '/film', method: '' }, { title: 'Удалить фильм из каталога', route: '/remove', method: '' });
    return actions;
};

exports.getAction = (title, path, inputs, script = null, method = 'post') => {
    return {
        title: title,
        path: '/account' + path,
        method: method,
        inputs: inputs,
        script: script,
    };
};

exports.getInput = (name, title, type = 'text') => {
    return { name: name, title: title, type: type };
};