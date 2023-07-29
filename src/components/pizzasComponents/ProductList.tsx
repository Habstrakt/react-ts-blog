import React, { useState } from "react";
import styles from "./ProductList.module.css";
import classNames from "classnames";
import foodsData from "../../assets/foods.json";
import { useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";
import { addProductToCart } from "../../redux/pizzaSlice";

interface Product {
  id: number;
  name: string;
  category: string;
  imageUrl: string;
  description: string;
  sizes: number[];
  prices: number[];
  selectedSize: number;
  selectedPrice: number;
}

const ProductList: React.FC = () => {
  const dispatch = useDispatch();

  const categoryProducts = ["Все", "Пицца", "Закуски", "Напитки"];

  const [selectedCategory, setSelectedCategory] = useState<string>("Все");

  const [products, setProducts] = useState<Product[]>([]);

  const [activeSizeIndex, setActiveSizeIndex] = useState<{
    [key: number]: number;
  }>({});

  const productCart = useSelector((state) => state.pizza.productsCart);

  function handleAddCart(item) {
    dispatch(
      addProductToCart({
        id: item.id,
        name: item.name,
        imageUrl: item.imageUrl,
        selectedSize: item.selectedSize,
        selectedPrice: item.selectedPrice,
        quantity: 1,
      })
    );
  }

  function filterProducts(index) {
    const category = categoryProducts[index];

    const productsData = foodsData.products.filter((item) => {
      return category === "Все" || item.category === category;
    });

    const updatedProducts = productsData.map((product) => ({
      ...product,
      selectedSize: product.sizes ? product.sizes[0] : 0,
      selectedPrice: product.prices[0],
    }));

    setProducts(updatedProducts);
    setActiveSizeIndex((prevIndexes) => {
      const updatedIndexes = { ...prevIndexes };
      updatedProducts.forEach((product) => {
        updatedIndexes[product.id] = 0;
      });
      return updatedIndexes;
    });
    setSelectedCategory(category);
  }

  function handleSizeBtn(size, itemId, sizeIndex) {
    const updatedProducts = products.map((product) => {
      if (product.id === itemId) {
        return {
          ...product,
          selectedSize: size,
          selectedPrice: product.prices[product.sizes.indexOf(size)],
        };
      }
      return product;
    });

    setProducts(updatedProducts);

    setActiveSizeIndex((prevIndexes) => ({
      ...prevIndexes,
      [itemId]: sizeIndex,
    }));
  }

  useEffect(() => {
    filterProducts(0);
  }, []);

  return (
    <div>
      <ul className={styles.ul}>
        {categoryProducts.map((item, index) => (
          <li
            key={item}
            className={classNames("menu-item", styles.li)}
            onClick={() => filterProducts(index)}
          >
            <span>{item}</span>
          </li>
        ))}
      </ul>
      <section className={styles.section}>
        <div className="row">
          {products.map((item, index) => (
            <div
              key={index}
              className={classNames(
                styles.productCard,
                "col-lg-3 col-md-4 col-sm-6"
              )}
            >
              <div className={styles.productImg}>
                <img className={styles.img} alt="" src={item.imageUrl} />
              </div>
              <div className="product-info">
                <span className={styles.productTitle}>{item.name}</span>
                <div className={styles.productDescription}>
                  {item.description}
                </div>
                <div className="mt-2">
                  {item.sizes?.map((size, sizeIndex) => {
                    const productInCart = productCart.find(
                      (product) =>
                        product.id === item.id && product.selectedSize === size
                    );
                    return (
                      <button
                        type="button"
                        className={classNames(
                          "btn bg-warning position-relative me-3",
                          { active: sizeIndex === activeSizeIndex[item.id] }
                        )}
                        key={size}
                        onClick={() => handleSizeBtn(size, item.id, sizeIndex)}
                      >
                        {size}
                        {productInCart && (
                          <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                            {productInCart.quantity}
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
              <div className={classNames(styles.productFooter, "mt-3")}>
                <div key={index} className="product-price">
                  <span>{item.selectedPrice} рублей</span>
                </div>
                <button
                  type="button"
                  className="btn btn-danger position-relative"
                  onClick={() => handleAddCart(item)}
                >
                  + Добавить
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default ProductList;
