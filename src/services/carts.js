import { cartModel } from "../dao/models/carts.js";

export const getCartByIdService = async (cid) => {
    try{
        return await cartModel.findById(cid).populate('products.id');
    } catch(error){
        console.log('getCartByIdService -> ', error);
        throw error;
    }
}

export const setCartService = async () => {
    try{
        return await cartModel.create({});
    } catch(error){
        console.log('setCartService -> ', error);
        throw error;
    }
}

export const addProductInCartService = async (cid, pid) => {
    try{
        const carrito = await cartModel.findById(cid);

        if (!carrito)
            return null;

        const productInCart = carrito.products.find(p => p.id.toString() === pid);

        if (productInCart)
            productInCart.quantity++;
        else
            carrito.products.push({ id: pid, quantity: 1 });

        carrito.save();
        return carrito;
    }
    catch(error){
        console.log('addProductInCartService -> ', error);
        throw error;
    }
}

export const deleteProductsInCartService = async (cid, pid) => {
    try{
        return await cartModel.findByIdAndUpdate(cid, {$pull: {'products': {id: pid}}}, {new: true});
    } catch(error){
        console.log('deleteProductsInCartService -> ', error);
        throw error;
    }
}

export const updateProductsInCartService = async (cid, pid, quantity) => {
    try{
        return await cartModel.findOneAndUpdate(
            { _id: cid, 'products.id': pid },
            { $set: {'products.$.quantity': quantity} },
            { new: true}
        );
    } catch(error){
        console.log('updateProductsInCartService -> ', error);
        throw error;
    }
}

export const deleteCartService = async (cid) => {
    try{
        return await cartModel.findByIdAndUpdate(cid, {$set: {'products': []}}, {new: true});
        //return await cartModel.findByIdAndDelete(cid);
    } catch(error){
        console.log('deleteCartService -> ', error);
        throw error;
    }
}