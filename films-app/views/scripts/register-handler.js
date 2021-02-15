const sendRequest = (event) => {
    event.preventDefault();
    const reader = new FileReader();
    const file = image.files[0];
    const data = {
        name: username.value ? username.value : 'username',
        email: email.value,
        password: password.value,
        // isAdmin: false,
        image: null,
    };

    reader.onloadend = function() {
        const result = reader.result;
        data.image = result;
        postData('/register', data);
    };

    if (file) {
        reader.readAsDataURL(file);
    } else {
        postData('/register', data);
    }
};
async function postData(url = '', data = {}) {
    // const response = await fetch(url, {
    //     method: 'POST',
    //     headers: {
    //         'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify(data),
    // });

    const form = document.createElement('form');
    form.method = 'post';
    form.action = url;

    for (const key in data) {
        if (data.hasOwnProperty(key)) {
            const hiddenField = document.createElement('input');
            hiddenField.type = 'hidden';
            hiddenField.name = key;
            hiddenField.value = data[key];

            form.appendChild(hiddenField);
        }
    }

    document.body.appendChild(form);
    form.submit();

    //await response.ok();
    // return await response.status;
}