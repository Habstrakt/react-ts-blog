import React from "react";
import styles from "./PortfolioPage.module.css";

const Portfolio: React.FC = () => {
  return (
    <>
      <div className="col-lg-9">
        <div className={`${styles.cardGroup} card-group`}>
          <div className="row justify-content-evenly">
            <div className="card col">
              <div className="card-body">
                <h5 className="card-title">asdasdasd</h5>
                <p className={`${styles.cardText} class-text`}>asdasdasd</p>
                <span className="card-text">Использовал: </span>
                <span>asdasd</span>
              </div>
              <div className={`${styles.cardFooter} card-footer`}>
                <a className="btn btn-primary">
                  <small className="text-body-secondary">Перейти</small>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Portfolio;
