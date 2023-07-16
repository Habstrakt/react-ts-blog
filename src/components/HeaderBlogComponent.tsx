import styles from "./HeaderBlog.module.css";
import { Link } from "react-router-dom";

const links = [
  { name: "Portfolio", url: "/portfolio" },
  { name: "About", url: "/about" },
];

const Header: React.FC = () => {
  return (
    <header>
      <div className="container">
        <div className="row">
          <div className="col-6">
            <a href="#">LOGO</a>
          </div>
          <div className="col-6">
            <nav>
              <ul className={styles.menu_items}>
                {links.map((link) => (
                  <li key={link.name}>
                    <Link className={styles.menu_item} to={link.url}>
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
