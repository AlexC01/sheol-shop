import Container from "./components/container/Container";
import Slider from "./components/slider/Slider";

export default function Home() {
  return (
    <div className="pt-40 md:pt-24">
      <header className="max-w-[1650px] mx-auto xl:px-32 md:px-10">
        <Slider
          images={[
            { url: "/images/home/slider_first.webp", route: "" },
            { url: "/images/home/slider_second.webp", route: "" }
          ]}
        />
      </header>
    </div>
  );
}
