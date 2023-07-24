import React from "react";
import styles from "./ProductList.module.css";
import classNames from "classnames";

const ProductList: React.FC = () => {
  return (
    <div>
      <ul className={styles.ul}>
        <li className={classNames("menu-item", styles.li)}>
          <span>Меню</span>
        </li>
      </ul>
      <section className={styles.section}>
        <div className="row">
          <div
            className={classNames(
              styles.productCard,
              "col-lg-3 col-md-4 col-sm-6"
            )}
          >
            <div className={styles.productImg}>
              <img className={styles.img} alt="" />
            </div>
            <div className="product-info">
              <span className={styles.productTitle}>Пицца Маргарита</span>
              <div className={styles.productDescription}>Описание</div>
              <div className="mt-2">
                <button
                  type="button"
                  className="btn bg-warning position-relative me-3"
                >
                  13
                  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"></span>
                </button>
              </div>
            </div>
            <div className={classNames(styles.productFooter, "mt-3")}>
              <div className="product-price">200 рублей</div>
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
        </div>
      </section>
    </div>
  );
};

export default ProductList;
