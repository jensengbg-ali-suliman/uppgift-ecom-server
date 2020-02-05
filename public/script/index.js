const prodContainer = document.querySelector('#prodContainer');
const notification = document.querySelector('#notification');
import addFunction from './modules/AddFunction.js';

const getButtons = () => {
    let arr = document.getElementsByClassName('addBtn');
    addFunction(arr, itemCount)
}

const createHmtlElement = data => {
    data.map(prod => {

        let prodDiv = document.createElement('div');
        prodDiv.setAttribute('class', 'product');
        prodDiv.setAttribute('id', prod.id);
        let prodImg = document.createElement('img')
        prodImg.setAttribute('src', prod.image)
        prodImg.setAttribute('class', 'prodImg');

        prodDiv.appendChild(prodImg)

        let article = document.createElement('article');
        let prodName = document.createElement('p');
        prodName.setAttribute('class', 'prodName');
        prodName.innerText = prod.product;
        let prodPrice = document.createElement('p');
        prodPrice.setAttribute('class', 'prodPrice');
        prodPrice.innerText = `${prod.price} kr.`;
        let addBtn = document.createElement('button');
        addBtn.setAttribute('class', 'addBtn');
        addBtn.innerText = 'ADD';

        article.appendChild(addBtn)
        article.appendChild(prodName);
        article.appendChild(prodPrice);

        prodDiv.appendChild(article);



        prodContainer.appendChild(prodDiv);

    });

    getButtons();
}

const getProductList = () => {
    let url = 'http://localhost:8000/products/getAll'
    fetch(url, { method: 'GET' })
        .then(response => response.json())
        .then(data => createHmtlElement(data))
        .catch(err => console.error('Error: ' + err));
}

getProductList();

// cart notification

function countFunc(data) {
    let num = 0;
    data.map(elem => {
        num += 1;
    })
    console.log(num)
    notification.innerText = num;
}

function itemCount() {
    let url = 'http://localhost:8000/cart/getAll'
    fetch(url, { method: 'GET' })
        .then(res => res.json())
        .then(data => countFunc(data))
        .catch(err => console.error(err))
}
itemCount()