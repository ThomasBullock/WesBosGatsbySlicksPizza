import { useState, useContext } from "react";
import OrderContext from "../components/OrderContext";
import attachNamesAndPrices from "./attachNamesAndPrices";
import calculateOrderTotal from "./calculateOrderPrice";
import formatMoney from "./formatMoney";

export default function usePizza({ pizzas, values }) {
    // 1. create some state to hold our order

    // We got rid of this line because we moved useState up to the provider
    // const [order, setOrder] = useState([]);
    // Now we acces both our state and our updater function (setOrder) via context

    const [order, setOrder] = useContext(OrderContext);
    const [error, setError] = useState();
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    const silly = useContext(OrderContext);
    // 2 Make a function to add things to order
    function addToOrder(orderedPizza) {
        setOrder([...order, orderedPizza]);
    }
    // 3. Make a function remove things from orders
    function removeFromOrder(index) {
        setOrder([
            // everything before the item we want to remove
            ...order.slice(0, index),
            // everything after the item we want to remove
            ...order.slice(index + 1),
        ]);
    }

    // function run on submit order
    async function submitOrder(e) {
        e.preventDefault();
        console.log(e);
        setLoading(true);
        setError(null);

        const body = {
            order: attachNamesAndPrices(order, pizzas),
            total: formatMoney(calculateOrderTotal(order, pizzas)),
            name: values.name,
            email: values.email,
            mapleSyrup: values.mapleSyrup,
        };
        console.log(body);

        // 4. Send this data the a serverless function when they check out
        const res = await fetch(`${process.env.GATSBY_SERVERLESS_BASE}/placeOrder`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
        });
        const text = JSON.parse(await res.text());

        // check if everything worked
        if (res.status >= 400 && res.status < 600) {
            setLoading(false); // turn off loading
            setError(text.message);
        } else {
            setLoading(false);
            setMessage("Success! Come get yo pizza!");
        }
    }

    // TODO

    return {
        order,
        addToOrder,
        removeFromOrder,
        error,
        loading,
        message,
        submitOrder,
    };
}
