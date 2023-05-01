import { useContext, useState } from "react";
import Modal from "../UI/Modal";
import CartItem from "./CartItem";
import classes from "./Cart.module.css";
import Checkout from "../Meals/Checkout";

import CartContext from "../../store/cart-context";
import getNumber from "../util/get-number";

const Cart = (props) => {
  const [isOrder, setIsOrder] = useState(false);
  const cartCtx = useContext(CartContext);
  const [httpError, setHttpError] = useState(null);

  const totalAmount = getNumber(cartCtx.totalAmount);
  const hasItems = cartCtx.items.length > 0;

  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };

  const cartItemAddHandler = (item) => {
    cartCtx.addItem(item);
  };

  const cartItems = (
    <ul className={classes["cart-items"]}>
      {cartCtx.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          onAdd={cartItemAddHandler.bind(null, item)}
        />
      ))}
    </ul>
  );

  // order 버튼 눌렀을때
  const orderHandler = () => {
    setIsOrder(true);
  };
  // checkout에서 cancel 버튼 눌렀을때
  const orderCancelHandler = () => {
    setIsOrder(false);
  };

  async function orderConfirmHandler(orderMeal) {
    // console.log("orderMeal data = ",orderMeal);
    // console.log("cartCtx.items = ", cartCtx.items);
    let newOrderMeal = { ...orderMeal };

    cartCtx.items.map((item) => (newOrderMeal = { ...newOrderMeal, item }));
    // console.log("newOrderMeal = ", newOrderMeal);

    try {
      const response = await fetch(
        "https://react-http-b8ea6-default-rtdb.firebaseio.com/orders.json",
        {
          method: "POST", //메소드 지정
          headers: {
            "Content-Type": "application/json; charset=utf-8",
          },
          body: JSON.stringify({
            user: orderMeal,
            orderedItems: cartCtx.items,
          }), //실제 데이터 파싱하여 body에 저장
        }
      )
        .then((res) => res.json()) // 리턴값이 있으면 리턴값에 맞는 req 지정
        .then((res) => {
          console.log(res); // 리턴값에 대한 처리
        });
      cartCtx.clearCart();
      console.log("cartCtx.items = ", cartCtx.items);
      setIsOrder(false);

      const data = await response.json();
      // console.log(data);
      if (!response.ok) {
        throw new Error("Post error");
      }
    } catch (error) {
      setHttpError(error.message);
    }
  }

  return (
    <Modal onClose={props.onClose}>
      {cartItems}
      <div className={classes.total}>
        <span>합게</span>
        <span>{totalAmount}<span style={{"font-size": '19px', "color":'#b0133d'}}>원</span></span>
      </div>
      {isOrder && (
        <Checkout
          onCancelCheckout={orderCancelHandler}
          onConfirmCheckout={orderConfirmHandler}
        />
      )}
      {!isOrder && (
        <div className={classes.actions}>
          <button className={classes["button--alt"]} onClick={props.onClose}>
            Close
          </button>
          {hasItems && (
            <button className={classes.button} onClick={orderHandler}>
              Order
            </button>
          )}
        </div>
      )}
    </Modal>
  );
};

export default Cart;
