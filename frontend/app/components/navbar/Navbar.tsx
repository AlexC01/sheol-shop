import Container from "../container/Container";
import Logo from "./Logo";
import Options from "./Options";
import Search from "./Search";

const Navbar = () => {
  return (
    <nav className="fixed w-full bg-white z-10 shadow-sm">
      <div className="h-20 border-b-[1px]">
        <Container>
          <div className="flex items-center gap-6 justify-between">
            <Logo />
            <div className="flex flex-1 items-center justify-end md:justify-between">
              <Options />
              <div className="flex items-center gap-8">
                <Search />
                xd
              </div>
            </div>
          </div>
        </Container>
      </div>
    </nav>
  );
};

export default Navbar;
