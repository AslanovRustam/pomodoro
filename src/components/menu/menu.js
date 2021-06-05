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
              <a
                className={s.menuLink}
                href="#header"
                onClick={() => setActive(false)}
              >
                Home
              </a>
            </li>
            <li className={s.menuItem}>
              <a
                className={s.menuLink}
                href="#task"
                onClick={() => setActive(false)}
              >
                Tasks
              </a>
            </li>
            <li className={s.menuItem}>
              <a
                className={s.menuLink}
                href="#statistics"
                onClick={() => setActive(false)}
              >
                Statistics
              </a>
            </li>
            <li className={s.menuItem}>
              <a
                className={s.menuLink}
                href="#settings"
                onClick={() => setActive(false)}
              >
                Settings
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
