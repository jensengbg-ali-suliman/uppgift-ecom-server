function getTarget(arr) {
    for (let i = 0; i < arr.length; i++) {
        arr[i].addEventListener('click', e => addFunc(e));
    }
}

function addFunc(e) {
    let target = e.target.parentNode.id;
    let url = `http://localhost:8000/cart/delete?id=${target}`;

    fetch(url, { method: 'DELETE' })
        .then(res => res.json())
        .then(data => console.log(data))
        .catch(err => console.error(err))

    location.reload();
}

export default getTarget;