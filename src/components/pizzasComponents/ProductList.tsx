import React, { useState } from "react";
import styles from "./ProductList.module.css";
import classNames from "classnames";
import foodsData from "../../assets/foods.json";
import { useEffect } from "react";

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
  const categoryProducts = ["Все", "Пицца", "Закуски", "Напитки"];

  const [selectedCategory, setSelectedCategory] = useState<string>("Все");
  const [products, setProducts] = useState<Product[]>([]);

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
    setSelectedCategory(category);
  }

  function handleSizeBtn(size, itemId) {
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
                  {item.sizes?.map((size, index) => (
                    <button
                      type="button"
                      className="btn bg-warning position-relative me-3"
                      key={size}
                      onClick={() => handleSizeBtn(size, item.id)}
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
                <div key={index} className="product-price">
                  <span>{item.selectedPrice} рублей</span>
                </div>
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
