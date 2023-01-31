import MultiCarousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const sweetsCarouselList = [
  {
    src: "/images/a-tes-souhaits.jpg",
    alt: "アテスウェイのケーキ",
  },
  {
    src: "/images/lechocolat-alainducasse.jpg",
    alt: "アランデュカスのチョコレート",
  },
  {
    src: "/images/setagaya_totoro.jpg",
    alt: "トトロ型のシュークリーム",
  },
  {
    src: "/images/milano_pudding.jpg",
    alt: "ミラノプリン",
  },
];

export default function Carousel() {
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };
  return (
    <div className="carousel">
      <MultiCarousel responsive={responsive}>
        {sweetsCarouselList.map((elem, index) => (
          <div className="card" key={`sweets-${index}`}>
            <img
              className={`sweet${index + 1}-image`}
              src={elem.src}
              alt={elem.alt}
              style={{
                width: "75%",
                objectFit: "contain",
              }}
            />
          </div>
        ))}
      </MultiCarousel>
      ;
    </div>
  );
}
