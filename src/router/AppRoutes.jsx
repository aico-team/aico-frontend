import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import App from "../App";
import LoginPage from "../pages/LoginPage"; // 예시

export default function AppRoutes() {
    return (
    <Router>
        <Routes>
        <Route path="/" element={<App />} />
        <Route path="/login" element={<LoginPage />} />
        {/* 다른 라우트들 */}
        </Routes>
    </Router>
    );
}
