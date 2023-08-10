import React, { useState } from "react";
import styles from "./PizzaCheckout.module.css";
import classNames from "classnames";
import cartImage from "../../assets/img/cart.png";
import { useDispatch, useSelector } from "react-redux";
import InputMask from "react-input-mask";

import {
  updateDeliveryMethod,
  updatePaymentMethod,
  setClientName,
  setClientPhone,
} from "../../redux/pizzaSlice";
import { Link } from "react-router-dom";

const Checkout: React.FC = () => {
  const dispatch = useDispatch();

  const deliveryMethods = ["Самовывоз", "Доставка"];

  const paymentMethods = [
    "Оплата картой онлайн",
    "Картой курьеру",
    "Наличными",
  ];

  const [nameValue, setNameValue] = useState("");

  const [textNameError, setTextNameError] = useState("");

  const [phoneValue, setPhoneValue] = useState("");

  const [textPhoneError, setTextPhoneError] = useState("");

  const productCart = useSelector((state) => state.pizza.productsCart);

  const storeDeliveryMethod = useSelector(
    (state) => state.pizza.deliveryMethod
  );

  const storePaymentMethod = useSelector((state) => state.pizza.paymentMethod);

  function validateName() {
    const isNameLengthValid = nameValue.length > 0;

    if (!isNameLengthValid) {
      setTextNameError("Введите имя!");
    } else {
      setTextNameError("");
      dispatch(setClientName(nameValue));
    }
  }

  function validatePhone() {
    const isPhoneValid = /^\+7\(\d{3}\)\d{3}-\d{2}-\d{2}$/.test(phoneValue);

    const isPhoneLengthValid = phoneValue.length === 16;

    if (!isPhoneValid && isPhoneLengthValid) {
      setTextPhoneError(
        "Введите корректный номер телефона! Пример: +7(960)111-11-11"
      );
    } else {
      setTextPhoneError("");
      dispatch(setClientPhone(phoneValue));
    }
  }

  function isActiveDeliveryMethod(deliveryMethod) {
    return deliveryMethod === storeDeliveryMethod;
  }

  function isActivePaymentMethod(paymentMethod) {
    return paymentMethod === storePaymentMethod;
  }

  function selectDelivery(index) {
    dispatch(updateDeliveryMethod(deliveryMethods[index]));
  }

  function selectPayment(index) {
    dispatch(updatePaymentMethod(paymentMethods[index]));
  }

  return (
    <>
      {productCart.length > 0 ? (
        <div className={styles.checkout}>
          <div className="container">
            <h1 className={styles.title}>Оформление заказа</h1>
            <div className="row">
              <div className="col-md-2">
                <div className="maskot">
                  <div className={styles.buble}>
                    <p>
                      Ещё чуть чуть и эта вкуснотища будет у тебя дома на столе!
                    </p>
                  </div>
                  <div className={styles.logo}>
                    <img src={cartImage} alt="" />
                  </div>
                </div>
              </div>
              <div className="col-md-10">
                <div className={styles.cart}>
                  <div className={styles.delivery}>
                    <form method="post" name="checkout">
                      <div className={styles.checkout__topFields}>
                        <p
                          className={classNames("form-row", styles.form)}
                          id="billing_phone_field"
                        >
                          <label htmlFor="billing_phone">
                            Телефон
                            <abbr
                              className={styles.required}
                              title="обязательно"
                            >
                              *
                            </abbr>
                          </label>
                          <span className={styles.error_input}>
                            {textPhoneError}
                          </span>
                          <span className={styles.inputWrapper}>
                            <InputMask
                              className={styles.inputText}
                              type="tel"
                              name="billing_phone"
                              id="billing_phone"
                              mask="+7(***)***-**-**"
                              placeholder="+7(___)___-__-__"
                              defaultValue={phoneValue}
                              onChange={(event) =>
                                setPhoneValue(event.target.value)
                              }
                              onBlur={validatePhone}
                            ></InputMask>
                          </span>
                        </p>
                        <p
                          className={classNames("form-row", styles.form)}
                          id="billing_first_name_field"
                        >
                          <label htmlFor="billing_first_name">
                            Имя
                            <abbr
                              className={styles.required}
                              title="обязательно"
                            >
                              *
                            </abbr>
                          </label>
                          {textNameError && (
                            <span className={styles.error_input}>
                              {textNameError}
                            </span>
                          )}
                          <span className={styles.inputWrapper}>
                            <input
                              type="text"
                              name="billing_first_name"
                              id="billing_first_name"
                              onBlur={validateName}
                              defaultValue={nameValue}
                              onChange={(event) =>
                                setNameValue(event.target.value)
                              }
                              className={styles.inputText}
                            />
                          </span>
                        </p>
                      </div>
                      <p
                        className={classNames("form-row", styles.form)}
                        id="billing_email_field"
                      >
                        <label htmlFor="billing_email">Email</label>
                        <span className={styles.inputWrapper}>
                          <input
                            type="email"
                            name="billing_email"
                            id="email"
                            className={styles.inputText}
                          />
                        </span>
                      </p>
                      <div className={styles.type_delivery}>
                        <ul className={styles.delivery_items}>
                          {deliveryMethods.map((delivery, index) => (
                            <li
                              key={delivery}
                              onClick={() => selectDelivery(index)}
                              className={classNames(
                                styles.delivery_item,
                                isActiveDeliveryMethod(deliveryMethods[index])
                                  ? styles.active
                                  : ""
                              )}
                            >
                              {delivery}
                            </li>
                          ))}
                        </ul>
                      </div>
                      {storeDeliveryMethod !== "Самовывоз" && (
                        <div>
                          <p
                            className={classNames("form-row", styles.form)}
                            id="billing_street_field"
                          >
                            <label htmlFor="billing_street">
                              Адрес доставки
                            </label>
                            <span className={styles.inputWrapper}>
                              <input
                                type="text"
                                name="billing_street"
                                id="street"
                                className={styles.inputText}
                              />
                            </span>
                          </p>
                          <div className="checkout__top-fields">
                            <p
                              className={classNames("form-row", styles.form)}
                              id="billing_home_field"
                            >
                              <label htmlFor="billing_home">Дом</label>
                              <span className={styles.inputWrapper}>
                                <input
                                  type="text"
                                  name="billing_home"
                                  id="home"
                                  className={styles.inputText}
                                />
                              </span>
                            </p>
                            <p
                              className={classNames("form-row", styles.form)}
                              id="billing_first_apartment_field"
                            >
                              <label htmlFor="billing_apartment">
                                Квартира
                              </label>
                              <span className={styles.inputWrapper}>
                                <input
                                  type="text"
                                  name="billing_apartment"
                                  id="apartment"
                                  className={styles.inputText}
                                />
                              </span>
                            </p>
                          </div>
                        </div>
                      )}
                      <div id={styles.order_review}>
                        <div id="payment">
                          <label>Способ оплаты</label>
                          <div className={styles.payment_methods_wrap}>
                            <ul className={styles.payment_methods}>
                              {paymentMethods.map((payment, index) => (
                                <li
                                  key={payment}
                                  onClick={() => selectPayment(index)}
                                  className={classNames(
                                    styles.delivery_item,
                                    isActivePaymentMethod(paymentMethods[index])
                                      ? styles.active
                                      : ""
                                  )}
                                >
                                  {payment}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                      <div className={styles.payment_total}>
                        <button
                          type="submit"
                          className={styles.checkout_button}
                          id="place_order"
                        >
                          Подтвердить заказ
                        </button>
                        <Link to="/portfolio/pizzas" className={styles.return}>
                          Вернуться в меню
                        </Link>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <Link
            to="/portfolio/pizzas"
            className={classNames("m-auto", "mt-5", styles.return)}
          >
            Вернуться в меню
          </Link>
        </div>
      )}
    </>
  );
};

export default Checkout;
