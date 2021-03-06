import React, {useEffect, useState} from "react";
import {commerce} from "./lib/commerce";
import {Products, NavBar, Cart, Checkout} from "./components";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";


const App = () => {
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState({})
    const fetchProducts = async () => {
        commerce.products.list().then(({data}) => {

            setProducts(data);
        })

    }
    const fetchCart = async () => {
        setCart(await commerce.cart.retrieve())
    }

    const handleAddToCart = async (productId, quantity) => {
        const {cart} = await commerce.cart.add(productId, quantity);
        setCart(cart)
    }

    const handleUpdateCartQty = async (productId, quantity) => {
        const {cart} = await commerce.cart.update(productId, {quantity});
        setCart(cart)
    }

    const handleRemoveFromCart = async (productId) => {
        const {cart} = await commerce.cart.remove(productId);
        setCart(cart)
    }

    const handleEmptyCart = async () => {
        const {cart} = await commerce.cart.empty();
        setCart(cart);
    }

    useEffect(() => {
        fetchProducts();
        fetchCart();
    }, []);


    return (
        <>
        <Router>
            <div>
                <NavBar totalItems={cart.total_items}/>

                    <Routes>
                        <Route path={"/"} element={<Products products={products} onAddToCart={handleAddToCart}/>}/>
                        <Route path={"/cart"} element={<Cart cart={cart} handleUpdateCartQty={handleUpdateCartQty}
                                                             handleRemoveFromCart={handleRemoveFromCart}
                                                             handleEmptyCart={handleEmptyCart}/>}/>
                        <Route path={"/checkout"} element={<Checkout />}/>


                    </Routes>

            </div>
        </Router>
        </>
    );
}

export default App;