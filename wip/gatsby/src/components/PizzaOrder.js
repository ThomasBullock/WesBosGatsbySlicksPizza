import React from "react";
import MenuItemStyles from "../styles/MenuItemStyles";
import Img from "gatsby-image";
import calculatePizzaPrice from "../utils/calculatePizzaPrice";
import formatMoney from "../utils/formatMoney";

export default function PizzaOrder({ order, pizzas, removeFromOrder }) {
    return (
        <>
            {order.map((singleOrder, index) => {
                const pizza = pizzas.find((item) => item.id === singleOrder.id);
                return (
                    <MenuItemStyles key={singleOrder.id + index}>
                        <Img fluid={pizza.image.asset.fluid}></Img>
                        <h2>{pizza.name}</h2>
                        <p>
                            {formatMoney(calculatePizzaPrice(pizza.price, singleOrder.size))}
                            <button
                                className="remove"
                                type="button"
                                title={`Remove ${singleOrder.size} ${pizza.size} from Order`}
                                onClick={() => removeFromOrder(index)}
                            >
                                &times;
                            </button>
                        </p>
                    </MenuItemStyles>
                );
            })}
        </>
    );
}
