import { NavLink } from "react-router-dom";
import s from "./menu.module.css";

export default function Menu({ active, setActive }) {
  return (
    <div
      className={active ? s.menuActive : s.menu}
      onClick={() => setActive(false)}
    >
      <div className={s.blur}>
        <div className={s.menuContent} onClick={(e) => e.stopPropagation()}>
          <div className={s.menuHeader}>Menu</div>
          <ul className={s.menuList}>
            <li className={s.menuItem}>
              <NavLink
                to="/"
                exact
                className={s.menuLink}
                onClick={() => setActive(false)}
              >
                {/* <a
                  className={s.menuLink}
                  href="#header"
                  onClick={() => setActive(false)}
                > */}
                Home
                {/* </a> */}
              </NavLink>
            </li>
            <li className={s.menuItem}>
              <NavLink
                to="/tasks"
                className={s.menuLink}
                onClick={() => setActive(false)}
              >
                {/* <a
                  className={s.menuLink}
                  href="#task"
                  onClick={() => setActive(false)}
                > */}
                Tasks
                {/* </a> */}
              </NavLink>
            </li>
            <li className={s.menuItem}>
              <NavLink
                to="/statistics"
                className={s.menuLink}
                onClick={() => setActive(false)}
              >
                {/* <a
                  className={s.menuLink}
                  href="#statistics"
                  onClick={() => setActive(false)}> */}{" "}
                Statistics
                {/* </a> */}
              </NavLink>
            </li>
            <li className={s.menuItem}>
              <NavLink
                to="settings"
                className={s.menuLink}
                onClick={() => setActive(false)}
              >
                {/* <a
                  className={s.menuLink}
                  href="#settings"
                  onClick={() => setActive(false)}
                > */}
                Settings
                {/* </a> */}
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
