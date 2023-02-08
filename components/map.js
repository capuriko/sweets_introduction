// map(), getStaticPaths, getStaticPropsを使って書き直し
import { Wrapper, Status } from "@googlemaps/react-wrapper";
import { useEffect, useRef } from "react";

function MyMapComponent({ center, zoom, mapId, shops }) {
  const ref = useRef();

  useEffect(() => {
    const map = new window.google.maps.Map(ref.current, {
      center,
      zoom,
      mapId,
    });

    // 今回はmap()ではなくforEachを使う（map()の返り値はarrayだが、今回はarray型にして返す必要がないため）
    shops.forEach((element) => {
      // The location of shop
      const location = { lat: element.latitude, lng: element.longitude };
      const marker = new google.maps.marker.AdvancedMarkerView({
        position: location,
        map: map,
        title: element.shopName,
      });

      const infoWindow = new google.maps.InfoWindow();

      marker.addListener("click", ({ domEvent, latLng }) => {
        infoWindow.close();
        const testA = document.createElement("a");
        testA.href = `/posts/${element.articleName}`;
        testA.innerText = element.shopName;
        infoWindow.setContent(testA);
        infoWindow.open(marker.map, marker);
      });
    });
  });

  return (
    <div
      ref={ref}
      id="map"
      style={{
        height: "400px",
        width: "100%",
        margin: "20px",
        width: "75%",
        margin: "auto",
      }}
    />
  );
}

const render = (status) => {
  switch (status) {
    case Status.LOADING:
      return "ロード中です...";
    case Status.FAILURE:
      return "Google Mapsのロードに失敗しました";
    default:
      return null;
  }
};

// 東京都23区の全体地図なのでlatとlngいじらない
const SweetsMap = ({ shops }) => (
  <Wrapper
    apiKey="AIzaSyDd9ur2drqy2LpApy_U60CqhQ6k5KsByyQ"
    render={render}
    libraries={["marker"]}
    version="beta"
  >
    <MyMapComponent
      center={{ lat: 35.6762, lng: 139.6503 }}
      zoom={11}
      mapId="c9ba981c2ac40fd0"
      shops={shops}
    />
  </Wrapper>
);
export default SweetsMap;

// ★やりたいこと整理
// map画面から店舗紹介画面に移動する流れ

// １. getStaticProps()でmdnファイルすべて（1店舗ずつの情報）を取得
// ２．「店名」と「経度と緯度」情報を抽出する。
// shops.push({
//   articleName: fileName.replace(".md", ""),
// });

// ３. MyMapComponent()とSweetsMap()の中に、getStaticProps()で取得した情報をmap()で
//   elem.articleNameのような形で設定する

// 必要な情報
// // mdnファイルすべて（1店舗ずつの情報）の下記の情報
//   // 緯度lat:mdxSource.frontmatter.latitude
//   // 経度lng:mdxSource.frontmatter.longitude

//   // 店舗紹介画面に移動するURL＝.mdを取り除いたファイル名
//   // <a
//   //         href={`/posts/${elem.articleName}`}
//   //         style={{ textDecoration: "none" }}
//   // >

/////////////////////////////////////////////////////////////////////
// // 修正前コード
// import { Wrapper, Status } from "@googlemaps/react-wrapper";
// import { useEffect, useRef } from "react";

// function MyMapComponent({ center, zoom, mapId }) {
//   const ref = useRef();

//   useEffect(() => {
//     const map = new window.google.maps.Map(ref.current, {
//       center,
//       zoom,
//       mapId,
//     });
//     // The location of atessouhaits
//     const atessouhaits = { lat: 35.70909710361556, lng: 139.5907162404253 };
//     const marker = new google.maps.marker.AdvancedMarkerView({
//       position: atessouhaits,
//       map: map,
//       title: `A Tes Souhaits（アテスウェイ）`,
//     });

//     const infoWindow = new google.maps.InfoWindow();

//     marker.addListener("click", ({ domEvent, latLng }) => {
//       infoWindow.close();
//       const testA = document.createElement("a");
//       testA.href = "/posts/a-tes-souhaits";
//       testA.innerText = "A Tes Souhaits（アテスウェイ）";
//       testA.target = "_blank";
//       infoWindow.setContent(testA);
//       infoWindow.open(marker.map, marker);
//     });

//     // The location of frenchpoundhouse
//     const frenchpoundhouse = {
//       lat: 35.73312900760636,
//       lng: 139.74254952786094,
//     };
//     // The marker, positioned at frenchpoundhouse
//     const marker_frenchpoundhouse = new google.maps.Marker({
//       position: frenchpoundhouse,
//       map: map,
//     });
//   });

//   return (
//     <div
//       ref={ref}
//       id="map"
//       style={{
//         height: "400px",
//         width: "100%",
//         margin: "20px",
//         width: "75%",
//         margin: "auto",
//       }}
//     />
//   );
// }

// const render = (status) => {
//   switch (status) {
//     case Status.LOADING:
//       return "ロード中です...";
//     case Status.FAILURE:
//       return "Google Mapsのロードに失敗しました";
//     default:
//       return null;
//   }
// };

// const SweetsMap = () => (
//   <Wrapper
//     apiKey="AIzaSyDd9ur2drqy2LpApy_U60CqhQ6k5KsByyQ"
//     render={render}
//     libraries={["marker"]}
//     version="beta"
//   >
//     <MyMapComponent
//       // latとlngを変数にし、mdファイルから受け取ったlatitudeとlongitudeを設定
//       center={{ lat: 35.6762, lng: 139.6503 }}
//       zoom={11}
//       mapId="c9ba981c2ac40fd0"
//     />
//   </Wrapper>
// );
// export default SweetsMap;
