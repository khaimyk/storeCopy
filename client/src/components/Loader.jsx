const Loader = () => {
  const style = {
    width: "100%",
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };
  return (
    <div style={style}>
      <div animation="grow" variant="primary" />
    </div>
  );
};

export default Loader;
