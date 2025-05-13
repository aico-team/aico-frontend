import React from "react";
import { Link } from "react-router-dom";
import "../../styles/Sidebar.css";
//아이콘
import { AiFillHome, AiFillSchedule } from "react-icons/ai";
import { MdAccessTimeFilled, MdGroups, MdLogout } from "react-icons/md";
import { FcSettings } from "react-icons/fc";
import { RiAiGenerate } from "react-icons/ri";
import { IoMdList, IoIosChatboxes } from "react-icons/io";
import { FaListCheck, FaBarsProgress } from "react-icons/fa6";
import { IoLogoWechat } from "react-icons/io5";

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <nav className="sidebar-menu">
        <ul>
          <li>
            <Link to="/dashboard">
              <AiFillHome />
              메인 홈
            </Link>
          </li>
          <li>
            <Link to="/">
              <MdAccessTimeFilled />
              공부 시간
            </Link>
          </li>
          <li>
            <Link to="/TopicInput">
              <RiAiGenerate />
              커리큘럼 생성
            </Link>
          </li>
          <li>
            <Link to="/CurriculumList">
              <IoMdList />
              커리큘럼 목록
            </Link>
          </li>
          <li>
            <Link to="/">
              <IoIosChatboxes />
              챗봇과의 대화
            </Link>
          </li>
        </ul>

        <div className="sidebar-subsection">상세 페이지</div>
        <ul>
          <li>
            <Link to="/">
              <AiFillSchedule />
              월간 플래너
            </Link>
          </li>
          <li>
            <Link to="/">
              <FaListCheck />
              to-do 리스트
            </Link>
          </li>
          <li>
            <Link to="/">
              <MdGroups />
              그룹
            </Link>
          </li>
          <li>
            <Link to="/">
              <FaBarsProgress />
              나의 진행도
            </Link>
          </li>
          <li>
            <Link to="/">
              <IoLogoWechat />
              채팅
            </Link>
          </li>
        </ul>
      </nav>

      <div className="sidebar-section sidebar-bottom">
        <Link to="/">
          <FcSettings />
          설정
        </Link>
        <Link to="/">
          <MdLogout />
          로그아웃
        </Link>
      </div>
    </aside>
  );
};

export default Sidebar;
