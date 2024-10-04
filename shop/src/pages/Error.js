const Error = () => {
  return (
    <div>
      <h1>페이지를 찾을수 없습니다</h1>
      <img
        style={{ width: "100%" }}
        src={process.env.PUBLIC_URL + "/다람쥐2.jpg"}
      />
    </div>
  );
};

export default Error;
