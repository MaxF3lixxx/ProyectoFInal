import { useEffect, useMemo, useState } from 'react'
import {db} from '../Components/Data/db';

export const useCart = () => {
    const localCart = () => {
        const cartLocal = localStorage.getItem('cart');
        return cartLocal ? JSON.parse(cartLocal) : []
    }

    const [data] = useState(db);
    const [cart, setCart] = useState(localCart);
    const MAX_ITEMS = 5
    const MIN_ITEMS = 0

    useEffect(() => { localStorage.setItem('cart', JSON.stringify(cart)) }, [cart]);


    function adddToCart(item) {
        const itemExist = cart.findIndex((guitarra) => guitarra.id === item.id);
        if (itemExist >= 0) {
            const updateCart = [...cart]
            updateCart[itemExist].quantity++
            setCart(updateCart)
        } else {
            item.quantity = 1;
            setCart([...cart, item]);
        }


    }

    function removeFromCart(id) {
        setCart(prevCart => prevCart.filter(guitarra => guitarra.id !== id));
    }

    function increaseQuantity(id) {
        const updateCart = cart.map(item => {
            if (item.id == id && item.quantity < MAX_ITEMS) {
                return {
                    ...item,
                    quantity: item.quantity + 1
                }
            }
            return item;
        })
        setCart(updateCart)
    }

    function decreaseQuantity(id) {
        const updateCart = cart.map(item => {
            if (item.id == id && item.quantity > MIN_ITEMS) {
                return {
                    ...item,
                    quantity: item.quantity - 1
                }
            }
            return item;
        })
        setCart(updateCart)
    }

    function cleanCart() {
        setCart([])
    }
    //header
    const isEmpty =  useMemo(() => cart.length === 0, [cart]);
    const carTotal = useMemo(() => cart.reduce((total, item) => total + (item.quantity * item.price), 0 ), [cart]);



    return {
        data,
        cart,
        isEmpty,
        carTotal,
        adddToCart,
        removeFromCart,
        decreaseQuantity,
        increaseQuantity,
        cleanCart
    }
}
