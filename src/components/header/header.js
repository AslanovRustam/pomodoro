import React, { useState } from "react";

import s from "./header.module.css";
import Menu from "../menu/menu";

export default function Header() {
  const [menuActive, setMenuActive] = useState(false);
  return (
    <>
      <div id="header" className={s.burgerMenuContainer}>
        <nav>
          <div
            className={s.burgerBtn}
            onClick={() => setMenuActive(!menuActive)}
          >
            <span />
          </div>
        </nav>
        <Menu active={menuActive} setActive={setMenuActive} />
      </div>
    </>
  );
}
