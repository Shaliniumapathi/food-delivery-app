import { createContext, useState, useEffect } from "react";
import { food_list } from '../data/menu';
import api from '../services/api.js';

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
    const [cartItems, setCartItems] = useState({});
    const [token, setToken] = useState("");
    const [user, setUser] = useState(null);
    const [food_list_api, setFoodList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const url = "http://localhost:4000";

    const persistCart = (nextCart) => {
      localStorage.setItem("cartItems", JSON.stringify(nextCart));
    };

    const addToCart = async (itemId) => {
        const nextCart = cartItems[itemId]
            ? { ...cartItems, [itemId]: cartItems[itemId] + 1 }
            : { ...cartItems, [itemId]: 1 };
        setCartItems(nextCart);
        persistCart(nextCart);

        if (token) {
            await api.post("/cart/add", { itemId }, { headers: { token } });
        }
    };

    const removeFromCart = async (itemId) => {
        if (!cartItems[itemId]) return;
        const nextCount = cartItems[itemId] - 1;
        const nextCart = { ...cartItems, [itemId]: Math.max(nextCount, 0) };

        setCartItems(nextCart);
        persistCart(nextCart);

        if (token) {
            await api.post("/cart/remove", { itemId }, { headers: { token } });
        }
    };

    const getTotalCartAmount = () => {
        let totalAmount = 0;
        const dataSource = food_list_api.length ? food_list_api : food_list;
        for (const item in cartItems) {
            const quantity = cartItems[item] || 0;
            if (quantity > 0) {
                const product = dataSource.find((p) => (p._id || p.id).toString() === item);
                if (product) {
                    totalAmount += product.price * quantity;
                }
            }
        }
        return totalAmount;
    };

    const fetchFoodList = async () => {
        setLoading(true);
        try {
            const response = await api.get("/food/list");
            if (response.data.success) {
                setFoodList(response.data.data);
            } else {
                setFoodList([]);
            }
        } catch (err) {
            setError("Failed to load food list");
            setFoodList([]);
        } finally {
            setLoading(false);
        }
    };

    const loadCartData = async (authToken) => {
        try {
            const response = await api.post("/cart/get", {}, { headers: { token: authToken } });
            if (response.data.success) {
                setCartItems(response.data.cartData || {});
                persistCart(response.data.cartData || {});
            } else {
                setCartItems({});
            }
        } catch (err) {
            setCartItems({});
        }
    };

    const loadUser = async (authToken) => {
        try {
            const response = await api.get("/user/me", { headers: { token: authToken } });
            if (response.data.success) {
                setUser(response.data.user);
            } else {
                setUser(null);
            }
        } catch (err) {
            setUser(null);
        }
    };

    const logout = () => {
        setToken("");
        setUser(null);
        setCartItems({});
        localStorage.removeItem("token");
        localStorage.removeItem("cartItems");
    };

    useEffect(() => {
        async function init() {
            await fetchFoodList();

            const savedToken = localStorage.getItem("token");
            const savedCart = localStorage.getItem("cartItems");

            if (savedCart) {
                try {
                    setCartItems(JSON.parse(savedCart));
                } catch (e) {
                    setCartItems({});
                }
            }

            if (savedToken) {
                setToken(savedToken);
                await loadUser(savedToken);
                await loadCartData(savedToken);
            }
        }
        init();
    }, []);

    const contextValue = {
        food_list_api,
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart,
        getTotalCartAmount,
        url,
        token,
        setToken,
        user,
        setUser,
        loading,
        error,
        setError,
        logout,
    };

    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    );
};

export default StoreContextProvider;