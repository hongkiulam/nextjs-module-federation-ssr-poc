const Layout = ({ children }) => {
  return (
    <div>
      <header>
        <i>Header from _app -&gt; layout in shell</i>
      </header>
      {children}
    </div>
  );
};

export default Layout;
