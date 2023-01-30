import { Wrapper, Status } from "@googlemaps/react-wrapper";
import { useEffect, useRef } from "react";

function MyMapComponent({ center, zoom, mapId }) {
  const ref = useRef();

  useEffect(() => {
    const map = new window.google.maps.Map(ref.current, {
      center,
      zoom,
      mapId,
    });

    // The location of atessouhaits
    const atessouhaits = { lat: 35.70909710361556, lng: 139.5907162404253 };
    const marker = new google.maps.marker.AdvancedMarkerView({
      position: atessouhaits,
      map: map,
      title: `A Tes Souhaits（アテスウェイ）`,
    });

    const infoWindow = new google.maps.InfoWindow();

    marker.addListener("click", ({ domEvent, latLng }) => {
      infoWindow.close();
      const testA = document.createElement("a");
      testA.href = "https://www.atessouhaits.biz/";
      testA.innerText = "A Tes Souhaits（アテスウェイ）";
      testA.target = "_blank";
      infoWindow.setContent(testA);
      infoWindow.open(marker.map, marker);
    });

    // The location of frenchpoundhouse
    const frenchpoundhouse = {
      lat: 35.73312900760636,
      lng: 139.74254952786094,
    };
    // The marker, positioned at frenchpoundhouse
    const marker_frenchpoundhouse = new google.maps.Marker({
      position: frenchpoundhouse,
      map: map,
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

const SweetsMap = () => (
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
    />
  </Wrapper>
);
export default SweetsMap;
