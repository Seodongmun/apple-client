import { Routes, Route, Link, useNavigate, Outlet } from "react-router-dom";

function EventPage() {
  return (
    <>
      {" "}
      <div>
        <h1>오늘의 이벤트</h1>
        <Outlet></Outlet>
      </div>
    </>
  );
}

export default EventPage;
