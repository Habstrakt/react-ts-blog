import React from "react";
import styles from "./PortfolioPage.module.css";
import { Link } from "react-router-dom";
import classNames from "classnames";

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
    instruments: "React, TypeScript",
  },
  {
    title: "Список задач",
    url: "/portfolio/todo",
    text: "Список задач, в котором пользователь может добавлять, удалять и редактировать записи",
    instruments: "React, TypeScript",
  },
  {
    title: "Веб-приложение для погоды",
    url: "/portfolio/weather",
    text: "Приложение, которое показывает текущую погоду в различных городах",
    instruments: "React, TypeScript, API",
  },
  {
    title: "Сайт доставки пиццы",
    url: "/portfolio/pizzas",
    text: "Сайт пиццерии. Страница продуктов, а так же корзина",
    instruments: "React, TypeScript, Redux toolkit",
  },
];

const Portfolio: React.FC = () => {
  return (
    <>
      <div className="col-lg-9">
        <div className={classNames(styles.cardGroup, "card-group")}>
          <div className="row justify-content-evenly">
            {portfolios.map((item) => (
              <div className="card col-md-5 mb-4" key={item.title}>
                <div className="card-body">
                  <h5 className="card-title">{item.title}</h5>
                  <p className={classNames(styles.cardText, "class-text")}>
                    {item.text}
                  </p>
                  <span className="card-text">Использовал:</span>
                  <span> {item.instruments}</span>
                </div>
                <div className={classNames(styles.cardFooter, "card-footer")}>
                  <Link className="btn btn-primary" to={item.url}>
                    <small>Перейти</small>
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
