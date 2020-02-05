function addFunction(arr) {
    for (let i = 0; i < arr.length; i++) {
        arr[i].addEventListener('click', (e) => addToCart(e));
    }
}

function addToCart(e) {
    let target = e.target.parentNode.parentNode.id;
    let url = `http://localhost:8000/cart/add?id=${target}`;
    fetch(url, { method: 'POST' })
        .then(res => res.json())
        .then(data => console.log(data))
        .catch(err => console.error(err));
}



export default addFunction;