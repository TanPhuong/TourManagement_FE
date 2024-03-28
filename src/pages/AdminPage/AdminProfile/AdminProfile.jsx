import React, { useContext, useEffect, useState } from "react";
import HeaderComponent from "../../../component/HeaderComponent/HeaderComponent";
import '../AdminProfile/AdminProfile.css'
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../pattern/context";

const AdminProfilePage = () => {

    const {user, logout} = useContext(AuthContext);

    const [username, setUsername] = useState(user.data.name)
    const [email, setEmail] = useState(user.data.email);
    const [phone, setPhone] = useState('');

    const navigate = useNavigate(); 

    const handleOnChangeName = (e) => {
        setUsername(e.target.value);
    }

    const handleOnChangePhone = (e) => {
        setPhone(e.target.value);
    }   

    const handleLogOut = () => {
        logout();
        navigate('/home');
    }

    const handleTourManagement = () => {
        navigate('/admin/tour-management')
    }

    const handleBookingManagement = () => {
        navigate('/admin/booking-management')
    }

    const handleStatistic = () => {
        navigate('/admin/statistic');
    }

    return (
        <>
            <HeaderComponent/>
            <div className="admin-profile--body">
                <div className="admin-profile--nav">
                    <button className="admin-info">Thông tin cá nhân</button>
                    <button className="tour-management" onClick={handleTourManagement}>Quản lý tour</button>
                    <button className="booking-management" onClick={handleBookingManagement}>Quản lý booking</button>
                    <button className="statistic" onClick={handleStatistic}>Thống kê</button>
                    <button className="logout" onClick={handleLogOut}>Đăng xuất</button>
                </div>

                <div className="admin-profile--info">
                    <p className="title">HỒ SƠ CỦA TÔI</p>
                    <p className="description">Quản lý thông tin hồ sơ để bảo mật tài khoản</p>

                    <div className="admin-info--container">
                        <div className="admin-info--item">
                            <p className="admin-name">Họ và tên</p>
                            <input type="text" className="username-input" value={username} onChange={handleOnChangeName}/>
                        </div>

                        <div className="admin-info--item">
                            <p className="email">Email</p>
                            <input type="email" className="email-input" value={email}/>
                        </div>

                        <div className="admin-info--item">
                            <p className="phone">Số điện thoại</p>
                            <input type="text" className="phone-input" value={phone} onChange={handleOnChangePhone}/>
                        </div>

                        <div className="admin-info--item">
                            <button className="update-info">LƯU</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AdminProfilePage;