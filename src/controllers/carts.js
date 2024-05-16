import {request,response} from 'express';
import { addProductInCartService, deleteCartService, deleteProductsInCartService, getCartByIdService, setCartService, updateProductsInCartService } from '../services/carts.js';

export const getCartById = async (req=request, res=response) => {
    try{
        const { cid } = req.params;
        //const carrito = await cartModel.findById(cid);
        const carrito = await getCartByIdService(cid);
        
        if (carrito)
            return res.json({carrito});
        return res.status(404).json({msg: `El carrito id ${cid} no existe`});
    } catch(error){
        return res.status(500).json({msg:'Se ha producido un error, comuniquese con su administrador'});
    }
}

export const setCart = async (req=request, res=response) => {
    try{
        const carrito = await setCartService();
        return res.json({msg: 'Se creo el carrito', carrito});
    } catch(error){
        console.log('setCart -> ', error);
        return res.status(500).json({msg:'Se ha producido un error, comuniquese con su administrador'});
    }
}

export const addProductInCart = async (req=request, res=response) => {
    try{
        const {cid,pid} = req.params;
        const carrito = await addProductInCartService(cid, pid);

        if (!carrito)
            return res.status(404).json({msg: `El carrito id ${cid} no existe`});

        return res.json({ msg: 'Carrito actualizado', carrito});
    } catch(error){
        console.log('addProductInCart -> ', error);
        return res.status(500).json({msg:'Se ha producido un error, comuniquese con su administrador'});
    }
}

export const deleteProductsInCart = async (req=request, res=response) => {
    try {
        const {cid, pid} = req.params;
        const carrito = await deleteProductsInCartService(cid, pid);
        if (!carrito)
            return res.status(404).json({msg: 'No se pudo ejecutar la acción'});
        return res.json({msg: 'Producto eliminado', carrito});
    } catch (error) {
        console.log('deleteProductsInCart -> ', error);
        return res.status(500).json({msg:'Se ha producido un error, comuniquese con su administrador'});
    }
}

export const updateProductsInCart = async (req=request, res=response) => {
    try {
        const {cid, pid} = req.params;
        const {quantity} = req.body;

        if (!quantity || !Number.isInteger(quantity))
            return res.status(404).json({msg: 'El valor ingresado para quantity no corresponde'});

        const carrito = await updateProductsInCartService(cid, pid, quantity);

        if (!carrito)
            return res.status(404).json({msg: 'No se pudo ejecutar la acción'});
        return res.json({msg: 'Producto actualizado', carrito});
    } catch (error) {
        console.log('updateProductsInCart -> ', error);
        return res.status(500).json({msg:'Se ha producido un error, comuniquese con su administrador'});
    }
}

export const deleteCart = async (req=request, res=response) => {
    try {
        const {cid} = req.params;

        const carrito = await deleteCartService(cid);

        if (!carrito)
            return res.status(404).json({msg: 'No se pudo ejecutar la acción'});
        return res.json({msg: 'Producto actualizado', carrito});
    } catch (error) {
        console.log('deleteCart -> ', error);
        return res.status(500).json({msg:'Se ha producido un error, comuniquese con su administrador'});
    }
}
//