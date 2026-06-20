import Navbar from "./_components/navbar";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-full font-[family-name:var(--font-poppins)]">
      <Navbar />
      <main>{children}</main>
    </div>
  );
};
export default Layout;
