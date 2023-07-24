import React from "react";
import styles from "./PizaaPage.module.css";

import Header from "../../components/pizzasComponents/PizzaHeader";
import ProductList from "../../components/pizzasComponents/ProductList";

const Pizza: React.FC = () => {
  return (
    <>
      <Header />
      <div className="col-md-12">
        <section className={styles.mainStyle}>
          <ProductList />
        </section>
      </div>
    </>
  );
};

export default Pizza;
