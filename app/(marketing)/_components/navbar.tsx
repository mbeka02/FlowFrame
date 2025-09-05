import Logo from "../../../components/logo";

const Navbar = () => {
  return (
    <div
      className=" items-center  absolute 
    top-0    w-full flex py-6 px-4 "
    >
      <div className="md:max-w-screen-2xl mx-auto flex items-center w-full justify-between">
        <Logo />
      </div>
    </div>
  );
};

export default Navbar;
