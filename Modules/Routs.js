module.exports = (app, db) => {

    // Getting objects 

    const getObj = obj => {
        let objToFind = { id: obj.id }
        let objToAdd = db.get('products').find(objToFind).value();

        return objToAdd;
    }

    const getObjFromCart = obj => {
        let objToFind = { id: obj.id }
        let objToAdd = db.get('cart').find(objToFind).value();

        return objToAdd;
    }

    // Adding to cart

    const addToCart = (obj, res) => {
        let value = db.get('cart').find({ product: obj.product, id: obj.id }).value();
        let errorMssg = {
            status: 'Error',
            message: 'Object already in shopping cart'
        }
        let successMssg = {
            status: 'Success',
            message: 'Object added to shopping cart'
        }

        if (value != undefined) {
            res.end(JSON.stringify(errorMssg));
            console.log(errorMssg)
        } else {
            db.get('cart').push(obj).write();
            res.send(successMssg);
            console.log(successMssg)
        }

    }

    // Deleting from cart

    const deleteFromCart = (obj, res) => {
        let errorMssg = {
            status: 'Error',
            message: 'Object is not found in shopping cart'
        }
        let successMssg = {
            status: 'Success',
            message: 'Object deleted to shopping cart'
        }

        if (obj != undefined) {
            db.get('cart').remove(obj).write();
            res.send(successMssg);
            console.log(successMssg)
        } else {
            res.end(JSON.stringify(errorMssg));
            console.log(errorMssg)
        }
    }

    // get all products from cart 

    const getAllFromCart = res => {
        let data = db.get('cart').value();
        res.send(data);
    }

    // get all products 

    const getAllProducts = res => {
        let data = db.get('products').value();
        res.send(data);
    }

    // === ROUTS === //

    app.post('/cart/add', (req, res) => {
        let objToSend = req.query;
        addToCart(getObj(objToSend), res);
    });

    app.delete('/cart/delete', (req, res) => {
        let objToDelete = req.query;
        deleteFromCart(getObjFromCart(objToDelete), res);
    });

    app.get('/cart/getAll', (req, res) => {
        getAllFromCart(res);
    });

    app.get('/products/getAll', (req, res) => {
        getAllProducts(res)
    });

}
