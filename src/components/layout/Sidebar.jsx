import React from "react";
import { Link } from "react-router-dom";
import "../../styles/Sidebar.css";

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <nav className="sidebar-menu">
        <ul>
          <li>
            <Link to="/dashboard">메인 홈</Link>
          </li>
          <li>
            <Link to="/">공부 시간</Link>
          </li>
          <li>
            <Link to="/TopicInput">커리큘럼 생성</Link>
          </li>
          <li>
            <Link to="/CurriculumList">커리큘럼 목록</Link>
          </li>
          <li>
            <Link to="/">챗봇과의 대화</Link>
          </li>
        </ul>

        <div className="sidebar-subsection">상세 페이지</div>
        <ul>
          <li>
            <Link to="/">월간 플래너</Link>
          </li>
          <li>
            <Link to="/">to-do 리스트</Link>
          </li>
          <li>
            <Link to="/">그룹</Link>
          </li>
          <li>
            <Link to="/">나의 진행도</Link>
          </li>
          <li>
            <Link to="/">채팅</Link>
          </li>
        </ul>
      </nav>

      <div className="sidebar-section sidebar-bottom">
        <Link to="/">설정</Link>
        <Link to="/">로그아웃</Link>
      </div>
    </aside>
  );
};

export default Sidebar;
