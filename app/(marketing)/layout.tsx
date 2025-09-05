import Navbar from "./_components/navbar";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-full relative">
      <Navbar />
      <main className="">{children}</main>
    </div>
  );
};
export default Layout;
