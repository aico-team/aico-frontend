import React from "react";
import { Link } from "react-router-dom";
import "../../styles/Sidebar.css";
//아이콘
import { AiFillHome, AiFillSchedule } from "react-icons/ai";
import { MdAccessTimeFilled, MdLogout, MdQuiz } from "react-icons/md";
import { FcSettings } from "react-icons/fc";
import { RiAiGenerate } from "react-icons/ri";
import { IoMdList, IoIosChatboxes } from "react-icons/io";
import { FaListCheck } from "react-icons/fa6";
import { BiSolidNotepad } from "react-icons/bi";

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
            <Link to="/StudyTimeStat">
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
            <Link to="/QnaPage">
              <IoIosChatboxes />
              챗봇과의 대화
            </Link>
          </li>
        </ul>

        <div className="sidebar-subsection">상세 페이지</div>
        <ul>
          <li>
            <Link to="/Calendar">
              <AiFillSchedule />
              월간 플래너
            </Link>
          </li>
          <li>
            <Link to="/TodoList">
              <FaListCheck />
              to-do 리스트
            </Link>
          </li>
          <li>
            <Link to="/QuizPage">
              <MdQuiz />
              퀴즈
            </Link>
          </li>
          <li>
            <Link to="/ReviewNote">
              <BiSolidNotepad />
              오답노트
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
