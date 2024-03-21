import React, { useEffect, useState } from "react";
import * as TourService from '../../services/TourService'
import '../ListTourPage/ListTourPage.css'
import HeaderComponent from '../../component/HeaderComponent/HeaderComponent'
import Img from '../../Assets/Discount.png'
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { Navigate, useNavigate } from "react-router-dom";

const ListTourPage = () => {

    const [tours, setTour] = useState([]);
    const navigate = useNavigate();

    const [search, setSearch] = useState('');

    const handleSearch = (e) => {
        setSearch(e.target.value)
        console.log(search)
    }

    const searchTour = async () => {
        const { data } = await axios.get(`${process.env.REACT_APP_API_KEY}/tour/search-tour?place=${search}`);
        setTour(data?.checkTour);
    }

    // Nhận data từ API 
    const getAllProduct = async () => {
        const { data } = await axios.get(`${process.env.REACT_APP_API_KEY}/tour/list-tour`);
        setTour(data?.allTour);
    }

    useEffect(() => {
        getAllProduct()
    },[]);


    return (
        <>
            <HeaderComponent/>

            <div className="list-tour--body">
                <div className="filter-section">
                    <h6>Lọc kết quả</h6>
                    <div className="row">
                        <div className="col-lg-3 mt-4">
                            <label className="form-label text-uppercase fw-bold">Loại hình tour</label>
                            <select className="d-block border-2 w-100" aria-label="Default select example">
                                <option selected>--Tất cả--</option>
                            </select>
                        </div>
                        <div className="col-lg-3 mt-4">
                            <label className="form-label text-uppercase fw-bold">Điểm đi</label>
                            <select className="d-block border-2 w-100" aria-label="Default select example">
                                <option selected>--Tất cả--</option>
                            </select>
                        </div>
                        <div className="col-lg-3 mt-4">
                            <label className="form-label text-uppercase fw-bold">Điểm đến</label>
                            <select className="d-block border-2 w-100" aria-label="Default select example">
                                <option selected>--Tất cả--</option>
                            </select>
                        </div>
                        <div className="col-lg-3 mt-4">
                            <label className="form-label text-uppercase fw-bold">Số người</label>
                            <input type="number" className="d-block border border-2 border-dark bg-white w-100"/>
                        </div>
                        <div className="col-lg-3 mt-4">
                            <label className="form-label text-uppercase fw-bold">Ngày đi</label>
                            <input type="number" className="d-block border border-2 border-dark bg-white w-100" />
                            
                        </div>
                        <div className="col-lg-3 mt-4">
                            <label className="form-label text-uppercase fw-bold">Số ngày</label>
                            <div className="form-check">
                                <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1"/>
                                <label className="form-check-label" for="flexRadioDefault1">
                                    3-4 ngày
                                </label>
                            </div>
                            <div className="form-check">
                                <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2"/>
                                <label className="form-check-label" for="flexRadioDefault2">
                                    4-8 ngày
                                </label>
                            </div>
                            <div className="form-check">
                                <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault3"/>
                                <label className="form-check-label" for="flexRadioDefault3">
                                    8-13 ngày
                                </label>
                            </div>
                        </div>
                        <div className="col-lg-3 mt-4">
                            <label className="form-label text-uppercase fw-bold">Dòng tour</label>
                            <div className="form-check">
                                <input className="form-check-input" type="radio" name="tour" id="tour1"/>
                                <label className="form-check-label" for="tour1">
                                    Tiêu chuẩn
                                </label>
                            </div>
                            <div className="form-check">
                                <input className="form-check-input" type="radio" name="tour" id="tour2" />
                                <label className="form-check-label" for="tour2">
                                    Cao cấp
                                </label>
                            </div>
                            <div className="form-check">
                                <input className="form-check-input" type="radio" name="tour" id="tour3" />
                                <label className="form-check-label" for="tour3">
                                    Giá tốt
                                </label>
                            </div>
                        </div>
                        <div className="col-lg-3 mt-4">
                            <label className="form-label text-uppercase fw-bold">Phương tiện vận chuyển</label>
                            <div className="form-check">
                                <input className="form-check-input" type="radio" name="pt" id="pt1"/>
                                <label className="form-check-label" for="pt1">
                                    Máy bay
                                </label>
                            </div>
                            <div className="form-check">
                                <input className="form-check-input" type="radio" name="pt" id="pt2" />
                                <label className="form-check-label" for="pt2">
                                    Xe
                                </label>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="search-section">
                    <input type="text" placeholder="Nhập email" onChange={handleSearch} value={search}/>
                    <button className="search-booking-management-btn" onClick={searchTour}>Tìm kiếm</button>
                </div>

                <div className="tour-list--section">
                    {tours?.map((p) => {
                        const price = p.adultPrice.toLocaleString();
                        const afterSale = (p.adultPrice - (p.adultPrice * p.salePercent / 100)).toLocaleString();
                        console.log(price);
                        return (
                                <div className="tour-list--item">
                                <div 
                                    className="tour-place--img"
                                    style={{
                                        backgroundImage: `url(${p.imageTour[0]})`
                                    }}
                                    
                                >
                                    <div className="tour-type--container">
                                        <div className="clock-icon"></div>
                                            <div className="tour-type--name">
                                                <p>{p.typeTour}</p>
                                            </div>
                                    </div>

                                    <div className="rating-numb--container">
                                        <p className="rating-numb">8.5</p>
                                    </div>
                                </div>

                                <div className="tour-place--content"> 
                                    <p className="depart-date">{p.departureDate} - {p.travelDate}</p>
                                    <p className="name-tour">{p.nameTour}</p>
                                    <p className="id-tour">Mã tour: {p._id}</p>
                                    <p className="depart-place">Nơi khởi hành: {p.departurePlace}</p>
                                    <div className="price--sale-container">
                                        <div className="price-container">
                                            <p className="price--pre-sale">Giá: {price} đ</p>
                                            <p className="price--after-sale">{afterSale} đ</p>
                                        </div>

                                        <div className="sale-percent">
                                            <p className="sale-percent--numb">{p.salePercent}% giảm</p>
                                        </div>
                                    </div>

                                <div className="button--container">
                                        <button className="booking-tour" onClick={() => {navigate(`/booking/${p._id}`)}}>
                                            Đặt ngay
                                        </button>

                                        <button className="tour-detail" onClick={() => {navigate(`/detail-tour/${p._id}`)}}>
                                            Xem chi tiết
                                        </button>
                                </div>

                                <p className="count-in-stock">Số chỗ còn nhận: 
                                        <span>{p.quantity}</span>
                                </p>
                                </div>
                            </div>
                        )
                    })}
                    {/* <div className="tour-list--item">
                        <div 
                            className="tour-place--img"
                            style={{
                                //backgroundImage: `url(${Img})`
                            }}
                        >
                            <div className="tour-type--container">
                                <div className="clock-icon"></div>
                                    <div className="tour-type--name">
                                        <p>Giờ chót</p>
                                    </div>
                            </div>

                            <div className="rating-numb--container">
                                <p className="rating-numb">8.5</p>
                            </div>
                        </div>

                        <div className="tour-place--content"> 
                            <p className="depart-date">10/10/2023 - 4 ngày</p>
                            <p className="name-tour">Đà Nẵng - Huế - Cầu Vàng - Sơn Trà - Hội An (Khách sạn 4 * Trọn Tour )</p>
                            <p className="id-tour">Mã tour: </p>
                            <p className="depart-place">Nơi khởi hành: TP.Hồ Chí Minh</p>
                            <div className="price--sale-container">
                                <div className="price-container">
                                    <p className="price--pre-sale">Giá: 5,500,000 đ</p>
                                    <p className="price--after-sale">5,300,000 đ</p>
                                </div>

                                <div className="sale-percent">
                                    <p className="sale-percent--numb">4% giảm</p>
                                </div>
                            </div>

                           <div className="button--container">
                                <button className="booking-tour">
                                    Đặt ngay
                                </button>

                                <button className="tour-detail">
                                    Xem chi tiết
                                </button>
                           </div>

                           <p className="count-in-stock">Số chỗ còn nhận: 
                                <span>3</span>
                           </p>
                        </div>
                    </div> */}
                </div>
            </div>
        </>
    )
}

export default ListTourPage;