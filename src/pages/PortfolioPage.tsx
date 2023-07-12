import React from "react";
import styles from "./PortfolioPage.module.css";
import { Link } from "react-router-dom";

type Portfolios = {
  title: string;
  url: string;
  text: string;
  instruments: string;
};

const portfolios: Portfolios[] = [
  {
    title: "Счетчик",
    url: "/portfolio/counter",
    text: "Обычный счетчик (counter).",
    instruments: "react typescript",
  },
  {
    title: "Список задач",
    url: "/",
    text: "Список задач, в котором пользователь может добавлять, удалять и редактировать записи",
    instruments: "vue3",
  },
  {
    title: "Веб-приложение для погоды",
    url: "/",
    text: "Приложение, которое показывает текущую погоду в различных городах",
    instruments: "vue3? API",
  },
  {
    title: "Сайт доставки пиццы",
    url: "/",
    text: "Сайт пиццерии. Страница продуктов, а так же корзина",
    instruments: "vue3 pinia",
  },
];

const Portfolio: React.FC = () => {
  return (
    <>
      <div className="col-lg-9">
        <div className={`${styles.cardGroup} card-group`}>
          <div className="row justify-content-evenly">
            {portfolios.map((item) => (
              <div className="card col-md-5 mb-4">
                <div className="card-body">
                  <h5 className="card-title">{item.title}</h5>
                  <p className={`${styles.cardText} class-text`}>{item.text}</p>
                  <span className="card-text">Использовал:</span>
                  <span> {item.instruments}</span>
                </div>
                <div className={`${styles.cardFooter} card-footer`}>
                  <Link className="btn btn-primary" to={item.url}>
                    <small className="text-body-secondary">Перейти</small>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Portfolio;
