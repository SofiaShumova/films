const sendRequest = (event) => {
    event.preventDefault();
    const reader = new FileReader();
    const file = image.files[0];
    const data = {
        name: filmname.value ? filmname.value : 'username',
        description: desc.value ? desc.value : 'Описание отсутствует!',
        video: video.value,
        image: null,
    };

    reader.onloadend = function() {
        const result = reader.result;
        data.image = result;
        postData('/film', data)
            .then((res) => {
                console.log(res);
            })
            .catch((e) => {
                console.log(e);
            });
    };

    if (file) {
        reader.readAsDataURL(file);
    } else {
        postData('/film', data)
            .then((res) => {
                console.log(res);
            })
            .catch((e) => {
                console.log(e);
            });
    }
};
async function postData(url = '', data = {}) {
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
    return await response.status;
}