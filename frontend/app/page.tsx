import Container from "./components/container/Container";
import Slider from "./components/slider/Slider";

export default function Home() {
  return (
    <Container>
      <div className="pt-24">
        <header>
          <Slider
            images={[
              { url: "/images/home/slider_first.webp", route: "" },
              { url: "/images/home/slider_second.webp", route: "" }
            ]}
          />
        </header>
      </div>
    </Container>
  );
}
