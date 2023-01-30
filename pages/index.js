import { useState } from "react";
import React from "react";
import Hamburger from "../public/icons/hamburger.svg";
import SweetsMap from "../components/map";
import Carousel from "../components/carousel";

const Navbar = () => {
  // ハンバーガーアイコン押したときのナビバー表示
  const [showNavbar, setShowNav] = useState(false);
  // カテゴリから探すを押したときのアコーディオン表示
  const [showSweetsCategory, setShowSweetsCategory] = useState(false);

  const toggleNavItems = () => {
    setShowNav(!showNavbar);
  };

  const toggleSweetsCategory = () => {
    setShowSweetsCategory(!showSweetsCategory);
  };

  return (
    <nav className="navbar" style={{ zIndex: 999 }}>
      <div className="container">
        <div className="menu-icon" onClick={toggleNavItems}>
          <Hamburger width="2em" height="2em" />
        </div>

        <div className={`nav-elements  ${showNavbar && "active"}`}>
          <ul>
            <li className="nav-home">ホーム</li>
            <li>プロフィール</li>
            <li
              onMouseEnter={toggleSweetsCategory}
              onMouseLeave={toggleSweetsCategory}
            >
              <div onClick={toggleSweetsCategory}>▼カテゴリから探す♪</div>

              {showSweetsCategory && (
                <ul
                  className={`sweets-category ${
                    showSweetsCategory && "active"
                  } `}
                >
                  <li>ケーキ🍰</li>
                  <li>チョコ🍫</li>
                  <li>タルト😊</li>
                  <li>プリン🍮</li>
                  <li>シュークリーム😉</li>
                  <li>ドーナツ🍩</li>
                  <li>焼菓子🍪</li>
                </ul>
              )}
            </li>

            <li>マップから探す♪</li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default function HomePage() {
  return (
    <div>
      <Navbar />
      <div className="title-introduction">
        <h1 className="margin-block-end-0">東京スイーツ</h1>
        <h1 className="margin-block-start-0">おススメMAP</h1>
        <div className="margin-bottom">
          <span className="margin-right-auto">
            筆者が実際に行ったことのあるお店を
          </span>
          写真付きで紹介しています♬
        </div>
      </div>
      <Carousel />
      <SweetsMap />
    </div>
  );
}
