import Container from "./components/container/Container";
import Image from "next/image";
import Slider from "./components/slider/Slider";

export default function Home() {
  return (
    <Container>
      <div className="pt-24">
        <header>
          <Slider images={["/images/home/slider_first.webp", "/images/home/slider_second.webp"]} />
        </header>
      </div>
    </Container>
  );
}
