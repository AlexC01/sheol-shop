import Container from "../container/Container";
import Logo from "./Logo";
import Options from "./Options";
import Search from "./Search";
import UserMenu from "./UserMenu";

const Navbar = () => {
  return (
    <nav className="fixed w-full bg-white z-10 shadow-sm">
      <div className="h-20 border-b-[1px]">
        <Container>
          <div className="flex items-center gap-4 xl:gap-6 justify-between">
            <div className="md:flex-1 lg:flex-none">
              <Logo />
            </div>
            <div className="flex md:flex-1 items-center md:justify-between gap-2 lg:gap-0">
              <Options />
              <div className="flex items-center gap-4 justify-end lg:justify-between xl:justify-end">
                <Search />
                <UserMenu />
              </div>
            </div>
          </div>
        </Container>
      </div>
    </nav>
  );
};

export default Navbar;
