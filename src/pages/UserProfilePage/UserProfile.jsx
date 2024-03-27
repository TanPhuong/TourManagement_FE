import React, { useContext, useEffect, useState } from "react";
import HeaderComponent from "../../component/HeaderComponent/HeaderComponent"
import FooterComponent from "../../component/FooterComponent/FooterComponent"
import '../UserProfilePage/UserProfile.css'
import { useNavigate } from "react-router-dom";
import * as UserService from "../../services/UserService"
import { useMutationHooks } from "../../hooks/useMutationHook";
import { AuthContext } from "../../pattern/context";

const UserProfilePage = () => {

    const {user, logout} = useContext(AuthContext);
    const [username, setUsername] = useState(user.username);
    const [email, setEmail] = useState(user.email);
    const [phone, setPhone] = useState(user.phone);


    const navigate = useNavigate(); 

    // Nhận giá trị input
    const handleOnChangeName = (e) => {
        setUsername(e.target.value);
    }

    const handleOnChangePhone = (e) => {
        setPhone(e.target.value);
    }


    // Chuyển hướng trang
    const handleLogOut = () => {
        sessionStorage.removeItem('UserInfo');
        navigate('/home');
    }

    const handleBookedTour = () => {
        navigate('/user/my-tour')
    }


    // Cập nhật data mới từ user
    const id = user.id;

    const mutation = useMutationHooks(
        data => UserService.updateUser(id, data)
    );

    const handleUpdateUser = () => {
        mutation.mutate({
            username,
            email,
            phone
        })
        console.log(username, email, phone);
    }

     // Xử lí sau khi đã xác nhận data mới
    const {isSuccess, isError} = mutation;

    useEffect(() => {
        if(isSuccess) {
            alert("Cập nhật thành công")
        } else if(isError) {
            alert("Hiện tại đang xảy ra trục trặc! Xin quý khách hàng thông cảm.")
        }
    }, [isSuccess, isError])

    return (
        <>
            <HeaderComponent/>
            <div className="user-profile--body">
                <div className="user-profile--nav">
                    <button className="user-info">Thông tin cá nhân</button>
                    <button className="booked-tour" onClick={handleBookedTour}>Tour đã đặt</button>
                    <button className="logout" onClick={handleLogOut}>Đăng xuất</button>
                </div>

                <div className="user-profile--info">
                    <p className="title">HỒ SƠ CỦA TÔI</p>
                    <p className="description">Quản lý thông tin hồ sơ để bảo mật tài khoản</p>

                    <div className="user-info--container">
                        <div className="user-info--item">
                            <p className="user-name">Họ và tên</p>
                            <input type="text" className="username-input" value={username} onChange={handleOnChangeName}/>
                        </div>

                        <div className="user-info--item">
                            <p className="email">Email</p>
                            <input type="email" className="email-input" value={email}/>
                        </div>

                        <div className="user-info--item">
                            <p className="phone">Số điện thoại</p>
                            <input type="text" className="phone-input" value={phone} onChange={handleOnChangePhone}/>
                        </div>

                        <div className="user-info--item">
                            <button className="update-info" onClick={handleUpdateUser}>LƯU</button>
                        </div>
                    </div>
                </div>
            </div>
            <FooterComponent/>
        </>
    )
}

export default UserProfilePage; 