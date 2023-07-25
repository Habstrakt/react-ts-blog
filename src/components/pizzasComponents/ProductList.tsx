import React, { useState } from "react";
import styles from "./ProductList.module.css";
import classNames from "classnames";
import foodsData from "../../assets/foods.json";
import { useEffect } from "react";

const ProductList: React.FC = () => {
  const categoryProducts = ["Все", "Пицца", "Закуски", "Напитки"];
  const [selectedCategory, setSelectedCategory] = useState("Все");

  const [products, setProducts] = useState([]);

  function filterProducts(index) {
    const category = categoryProducts[index];

    console.log(products);

    const productsData = foodsData.products.reduce((acc, item) => {
      if (category === "Все" || item.category === category) {
        const selectedPrice = Array.isArray(item.price)
          ? item.price[0]
          : item.price;

        const selectedSize = Array.isArray(item.sizes)
          ? item.sizes[0]
          : item.sizes;

        return [
          ...acc,
          {
            ...item,
            selectedPrice,
            selectedSize,
          },
        ];
      }
      return acc;
    }, []);

    setProducts(productsData);

    if (category === "Все") {
      setSelectedCategory("Все");
    } else {
      setSelectedCategory(category);
    }
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
          {products.map((item) => (
            <div
              key={item}
              className={classNames(
                styles.productCard,
                "col-lg-3 col-md-4 col-sm-6"
              )}
            >
              <div className={styles.productImg}>
                <img className={styles.img} alt="" />
              </div>
              <div className="product-info">
                <span className={styles.productTitle}>{item.name}</span>
                <div className={styles.productDescription}>
                  {item.description}
                </div>
                <div className="mt-2">
                  {item.sizes?.map((size, index) => (
                    <button
                      type="button"
                      className="btn bg-warning position-relative me-3"
                      key={index}
                    >
                      {size}
                      <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                        1
                      </span>
                    </button>
                  ))}
                </div>
              </div>
              <div className={classNames(styles.productFooter, "mt-3")}>
                {item.prices?.map((price, index) => (
                  <div key={index} className="product-price">
                    {price}
                  </div>
                ))}
                <button
                  type="button"
                  className="btn btn-danger position-relative"
                >
                  + Добавить
                  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-warning">
                    10
                  </span>
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
