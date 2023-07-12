import styles from "./Aside.module.css";
import avatar from "../assets/img/avatar.jpg";
import github from "../assets/img/github_icon.svg";


const Aside: React.FC = () => {
  return(
    <div className="col-lg-3">
      <aside>
        <img src={avatar} alt="avatar" />
        <p>戦え!</p>
        <div>
          <p>Repository and contacts</p>
          <a href="https://github.com/Habstrakt">
            <img className={styles.github_logo} src={github} alt="" />
          </a>
        </div>
      </aside>
    </div>
  )
}

export default Aside;
