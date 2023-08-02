import React from "react";
import cartImage from "../../assets/img/cart.png";
import styles from "./PizzaCart.module.css";
import classNames from "classnames";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { incrementQuantity, decrementQuantity } from "../../redux/pizzaSlice";

const Cart: React.FC = () => {
  const dispatch = useDispatch();
  const productCart = useSelector((state) => state.pizza.productsCart);

  function addItem(productId) {
    dispatch(incrementQuantity(productId));
  }

  function removeItem(productId) {
    dispatch(decrementQuantity(productId));
  }

  console.log(productCart);
  return (
    <>
      <div className="col-md-2 mt-5">
        <h1 className={styles.cartTitle}>Корзина</h1>
        <div className="maskot">
          <div className={styles.buble}>
            Проверь свой заказ и не забудь добавить вкусности!
          </div>
          <div className="logo">
            <img className={styles.logoImg} src={cartImage} alt="" />
          </div>
        </div>
      </div>
      {productCart.length > 0 ? (
        <div className="col-md-10 mt-5">
          <div className={styles.zakaz}>Состав заказа</div>
          <div className="cart_wrapper">
            <div className={styles.cartContent}>
              {productCart.map((product, index) => (
                <div
                  key={index}
                  className={classNames("d-flex", styles.cartItem)}
                >
                  <div className={styles.img}>
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      width="100"
                      height="100"
                    />
                  </div>
                  <div className={styles.meta}>
                    <div className={classNames("d-flex", styles.productName)}>
                      {product.name} -{" "}
                      {product.selectedSize ? product.selectedSize : ""}
                    </div>
                  </div>
                  <div className={classNames("d-flex", styles.quantity)}>
                    <div
                      onClick={() => removeItem(product.id)}
                      className={classNames(
                        "btn btn-danger d-flex",
                        styles.minus
                      )}
                    >
                      -
                    </div>
                    <div className="quantity">
                      <p className={styles.count}>{product.quantity}</p>
                    </div>
                    <div
                      onClick={() => addItem(product.id)}
                      className={classNames(
                        "btn btn-danger d-flex",
                        styles.plus
                      )}
                    >
                      +
                    </div>
                  </div>
                  <div className={styles.price}>
                    <span>888 ₽</span>
                  </div>
                </div>
              ))}
            </div>
            <div className={classNames("d-flex", styles.returnWrap)}>
              <Link to="/portfolio/pizzas" className={styles.return}>
                Вернуться в меню
              </Link>
            </div>
            <div className="checkout">
              <div className={styles.checkoutItem}>
                <div className={classNames("d-flex", styles.buttons)}>
                  <div className={styles.summ}>
                    К оплате:
                    <strong className={styles.totalPrice}> 88888 ₽</strong>
                  </div>
                  <a className={styles.checkoutCart}>Перейти к оформлению</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="col-md-10 mt-5">
          <p className={styles.emptyCart}>Ваша корзина пока пуста.</p>
          <Link
            to="/portfolio/pizzas"
            className={classNames("mx-auto", styles.return)}
          >
            Вернуться в меню
          </Link>
        </div>
      )}
    </>
  );
};

export default Cart;
