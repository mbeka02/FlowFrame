const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col h-full items-center justify-center">
      {children}
    </div>
  );
};

export default AuthLayout;
