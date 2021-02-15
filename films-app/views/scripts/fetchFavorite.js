async function handlerLink(event) {
    const link = event.path[0];
    link.classList.toggle('catalogy__fav-link_selected');

    const response = await query('/favorite/' + link.id);

    if (!response) {
        link.classList.toggle('catalogy__fav-link_selected');
    }

    return false;
}

async function query(url, data = {}) {
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
    return response.ok;
}