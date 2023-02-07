import { useState } from "react";
import React from "react";
import Hamburger from "../public/icons/hamburger.svg";
import SweetsMap from "../components/map";
import Carousel from "../components/carousel";
// import { categoryNames } from "../../constant";

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
                  style={{ paddingInlineStart: 0 }}
                >
                  <li className="padding-top-10px padding-bottom-10px display-block dropdown--list width-100 height-100 padding-left-20">
                    <a
                      style={{
                        display: "block",
                        width: "100%",
                        height: "100%",
                      }}
                      href={`./categories/cake`}
                    >
                      ケーキ🍰
                    </a>
                  </li>

                  <li className="padding-top-10px padding-bottom-10px display-block dropdown--list width-100 height-100 padding-left-20">
                    <a
                      style={{
                        display: "block",
                        width: "100%",
                        height: "100%",
                      }}
                      href={`./categories/chocolate`}
                    >
                      チョコ🍫
                    </a>
                  </li>

                  <li className="padding-top-10px padding-bottom-10px display-block dropdown--list width-100 height-100 padding-left-20">
                    <a
                      style={{
                        display: "block",
                        width: "100%",
                        height: "100%",
                      }}
                      href={`./categories/pudding`}
                    >
                      プリン🍮
                    </a>
                  </li>
                  <li className="padding-top-10px padding-bottom-10px display-block dropdown--list width-100 height-100 padding-left-20">
                    <a
                      style={{
                        display: "block",
                        width: "100%",
                        height: "100%",
                      }}
                      href={`./categories/creamPuff`}
                    >
                      シュークリーム😉
                    </a>
                  </li>

                  <li className="padding-top-10px padding-bottom-10px display-block dropdown--list width-100 height-100 padding-left-20">
                    <a
                      style={{
                        display: "block",
                        width: "100%",
                        height: "100%",
                      }}
                      href={`./categories/doughnut`}
                    >
                      ドーナツ🍩
                    </a>
                  </li>
                </ul>
              )}
            </li>
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
      <div className="padding-left-40">
        <h1 className="margin-block-end-0">東京スイーツ　おススメMAP</h1>
        {/* <h1 className="margin-block-start-0"></h1> */}
        <div className="margin-bottom">
          <span className="margin-right-auto">
            筆者が実際に行ったことのあるお店を
          </span>
          写真付きで紹介しています♬　写真は一例ですので、カテゴリやMAPからぜひお気に入りを見つけてください♪
        </div>
      </div>
      <Carousel />
      <div className="margin-top margin-bottom">
        <span className="padding-left-40">
          下のMAPから気になるお店をクリックすると紹介ページに飛びます
        </span>
      </div>
      <SweetsMap />
    </div>
  );
}

// 地図上のピンの情報を設定する
// export async function getStaticProps({ params }) {
//   const text = fs.readFileSync(`./markdown/${params.shopName}.md`, "utf-8");
//   const mdxSource = await serialize(text, { parseFrontmatter: true });
//   // propsを通じてpostをページに渡す
//   return { props: { post: { shopName: params.shopName, mdx: mdxSource } } };
// }

// Object.entriesを使ってconstant.jsのkeyとvalueをarrayにする
// const object1 = {
//   a: 'somestring',
//   b: 42,
//   c: false
// };

// console.log(Object.entries(object1));
