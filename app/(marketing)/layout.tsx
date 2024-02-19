import Navbar from "./_components/navbar";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full bg-slate-100">
      {/*Navbar*/}
      <Navbar />
      {/*Main section*/}
      <main className="pt-40 pb-20">{children}</main>
      {/*Footer*/}
    </div>
  );
};
export default Layout;
