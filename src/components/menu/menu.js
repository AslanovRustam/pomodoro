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
                Home
              </NavLink>
            </li>
            <li className={s.menuItem}>
              <NavLink
                to="/tasks"
                exact
                className={s.menuLink}
                onClick={() => setActive(false)}
              >
                Tasks
              </NavLink>
            </li>
            <li className={s.menuItem}>
              <NavLink
                to="/addtask"
                className={s.menuLink}
                onClick={() => setActive(false)}
              >
                Add new Task
              </NavLink>
            </li>
            <li className={s.menuItem}>
              <NavLink
                to="/settings"
                className={s.menuLink}
                onClick={() => setActive(false)}
              >
                Settings
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
