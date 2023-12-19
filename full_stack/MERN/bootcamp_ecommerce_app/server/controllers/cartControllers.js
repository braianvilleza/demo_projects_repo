const Users = require('../models/Users.js');
const Products = require('../models/Products.js');

const auth = require('../auth.js');

module.exports.addToCart = (request, response)=>{
    const userAuth = auth.decodeToken(request.headers.authorization);
    const productId = request.params.productId;
    const admin = userAuth.isAdmin;
    const userId = userAuth.id;
    const quantity = request.body.quantity;

    // checks user level
    if(admin){
        return response.send('you are an admin');
    }else{
        // checks if the user is existing
        Users.findOne({_id: userId})
        .then(data => {
            if(data){
                Products.findById(productId)
                .then(prodResult => {
                    // return response.send(prodResult)
                    if(prodResult.isActive && prodResult.quantity > 0){
                        // return response.send(prodResult)
                        data.cart.push({
                            productId: productId,
                            quantity: quantity
                        })
                        data.save()
                        .then(save => response.send(true))
                        .catch(err => response.send(err));
                    }else{
                        return response.send('Product is unavailable')
                    }
                })
                .catch(err => response.send(err))
            }else{
                return response.send('Product not found')
            }
        })
        .catch(err => response.send(err))
    }
}

module.exports.viewCart = (request, response)=>{
    const userAuth = auth.decodeToken(request.headers.authorization);
    const userId = userAuth.id;
    const admin = userAuth.isAdmin;

    if(admin){
        return response.send('You are an admin!');
    }else{
        // return response.send(userId)
        
        Users.findById(userId)
        .then(result => {
            return response.send({
                _id: result._id,
                firstName: result.firstName,
                middleName: result.middleName,
                lastName: result.lastName,
                mobileNo: result.mobileNo,
                email: result.email,
                address: result.address,
                cart: result.cart
            })
        })
        .catch(err => response.send(err))
    }
}

module.exports.viewCartItemQuantity = (request, response)=>{
    const userAuth = auth.decodeToken(request.headers.authorization);
    const userId = userAuth.id;
    const productId = request.params.productId;

    Users.findOne({_id: userId})
    .then(result =>{
        if(result.isAdmin){
            return response.send(false)
        }else{
            const cartArr = result.cart;
            const index = cartArr.findIndex(cart => cart.productId == productId)
            if(index < 0){
                return response.send(false)
            }else{
                const currentQuantity = cartArr[index].quantity.toString();
                return response.send(currentQuantity)
            }
        }
    })
    .catch(err => response.send(false))
}

module.exports.deleteFromCart = (request, response) => {
    const userAuth = auth.decodeToken(request.headers.authorization);
    const cartId = request.body.cartId

    if(userAuth.isAdmin){
        return response.send(false)
    }else{
        Users.findById(userAuth.id)
        .then(result => {
            if(result){
                // declare a variable to hold the current item in the cart
                const cartArr = result.cart;
                // find the index number of the cartId
                const index = cartArr.findIndex(cart => cart._id == cartId);
                // remove the object from the current item in from the cart
                cartArr.splice(index, 1)

                if(index >= 0){
                    Users.findByIdAndUpdate(result._id,{cart: cartArr})
                    .then(update => {
                        return response.send(true)
                    })
                    .catch(err => response.send(false))
                }else{
                    return response.send(false)
                }
            }else{
                return response.send('item not found')
            }
        })
        .catch(err => response.send(err))
    }
}

const cartItem = (array_item, cart_id, update_option) => {
/*
    cartItem function
    array_item
        - cart array list
    cart_id
        - Object document id inside the cart array to be modified
    option:
        a. cartList - updated array list
        b. cartQuantity - update cart quantity
*/
    const index = array_item.findIndex(cart => cart._id == cart_id);

    if(update_option == 'cartList'){
        if(index < 0){
            return `item not found: ${index}`;
        }else{
            const toUpdate = array_item.splice(index, 1);
            return array_item;
        }
    }else if(update_option == 'cartQuantity'){
        if(index < 0){
            return `item not found: ${index}`;
        }else{
            const toUpdate = array_item.splice(index, 1);
            return index;
        }
    }
}

module.exports.updateCartQuantity = (request, response)=>{
    const userAuth = auth.decodeToken(request.headers.authorization);
    const admin = userAuth.isAdmin;
    const userId = userAuth.id;
    const cartId = request.body.cartId;
    const newQuantity = request.body.quantity;

    if(admin){
        return response.send('You are an admin');
    }else{
        Users.findOneAndUpdate(
            {_id:userId, "cart._id": cartId},
            {$set: {"cart.$.quantity": newQuantity}},
            {returnOriginal: false}
        )
        .then(result => {
            if(result){       
                const cartArr = result.cart         
                const index = cartArr.findIndex(cart => cart._id == cartId);
                const newQty = cartArr[index].quantity
                if(index < 0){
                    return response.send(false)
                }else{
                    return response.send(newQty.toString())
                }
            }else{
                return response.send(false)
            }
        })
        .catch(err => response.send(false))
    }
}

module.exports.checkCartItems = (request, response) => {
    const userAuth = auth.decodeToken(request.headers.authorization);
    const productId = request.params.productId;
    const admin = userAuth.isAdmin;
    const userId = userAuth.id;

    if(admin){
        return response.send('your an admin!')
    }else{
        // return response.send('your not an admin!')
        Users.findOne({_id: userId, 'cart.productId': productId})
        .then(result => {
            if(result){
                const cartArr = result.cart
                const index = cartArr.findIndex(cart => cart.productId == productId)
                if(index < 0){
                    return response.send(false)
                }else{
                    return response.send(cartArr[index]._id)
                }
            }else{
                return response.send(false)
            }
        })
        .catch(err => response.send(false))
    }
}

/*
module.exports.addToCart = (request, response)=>{
    const userAuth = auth.decodeToken(request.headers.authorization);
    const productId = request.params.productId;

    if(userAuth.isAdmin){
        return response.send('you are an admin');
    }else{
        // return response.send(userAuth.id)
        Products.findById(productId)
        .then(result => {
            // return response.send(result)
            if(result.isActive && result.quantity > 0){
                // return response.send(result)
                Carts.findOne({userId: userAuth.id})
                .then(data => {
                    // return response.send(data)
                    if(data){
                        // return response.send(data)
                        data.cart.push({
                            productId: productId,
                            productName: request.body.productName,
                            price: request.body.price,
                            quantity: request.body.quantity,
                            image: request.body.image
                        })
    
                        data.save()
                        .then(save => response.send(true))
                        .catch(err => response.send(false));
                    }else{
                        // return response.send('no products on cart yet!')
                        let newCart = new Carts({
                            userId: userAuth.id,
                            fullname: request.body.fullname,
                            mobileNo: request.body.mobileNo,
                            email: request.body.email,
                            address: request.body.address,
                            cart: request.body.cart
                        })
                        
                        newCart.save()
                        .then(save => response.send(true))
                        .catch(err => response.send(false));
                    }
                    
                })
                .catch(err => response.send(false))
            }else{
                return response.send(false)
            }
        })
        .catch(err => response.send(false))
    }
}
*/

/*
module.exports.viewCart = (request, response)=>{
    const userAuth = auth.decodeToken(request.headers.authorization);
    const userId = userAuth.id;
    const admin = userAuth.isAdmin;

    if(admin){
        return response.send('You are an admin!');
    }else{
        // return response.send(userId)
        
        Carts.findOne({userId: userId})
        .then(result => {
            return response.send(result)
        })
        .catch(err => response.send(err))
    }
}
*/