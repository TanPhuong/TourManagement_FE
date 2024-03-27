import React, { useEffect, useState } from "react";
import * as TourService from '../../services/TourService'
import '../ListTourPage/ListTourPage.css'
import HeaderComponent from '../../component/HeaderComponent/HeaderComponent'
import Img from '../../Assets/Discount.png'
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { Navigate, useNavigate } from "react-router-dom";
import ReactPaginate from "react-paginate";

const ListTourPage = () => {

    const [tours, setTour] = useState([]);
    const navigate = useNavigate();
    const [page, setPage] = useState(1);
    const [totalPage, setTotalPage] = useState(0);
    const [totalTour, setTotalTour] = useState(0);
    const [search, setSearch] = useState('');

    const handleSearch = (e) => {
        setSearch(e.target.value)
        console.log(search)
    }

    const searchTour = async () => {
        const { data } = await axios.get(`${process.env.REACT_APP_API_KEY}/tour/search-tour?place=${search}`);
        setTour(data?.checkTour);
    }

    const handlePageClick = (e) => {
        getAllProduct(e.selected + 1);
    }

    // Nhận data từ API 
    const getAllProduct = async () => {
        const { data } = await axios.get(`${process.env.REACT_APP_API_KEY}/tour/list-tour?page=${page}`);
        setTour(data?.tour);
        setTotalPage(data?.totalPages);
        setTotalTour(data?.totalTour);
    }

    useEffect(() => {
        getAllProduct()
    },[]);


    return (
        <>
            <HeaderComponent/>

            <div className="list-tour--body">
                <div className="search-section">
                    <input type="text" placeholder="Nhập tên" onChange={handleSearch} value={search}/>
                    <button className="search-tour-management-btn" onClick={searchTour}>Tìm kiếm</button>
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
                </div>

                <div className="pagination">
                    <ReactPaginate
                        breakLabel="..."
                        nextLabel="next >"
                        onPageChange={handlePageClick}
                        pageRangeDisplayed={5}
                        pageCount={totalPage}
                        previousLabel="< previous"
                        pageClassName="page-item"
                        pageLinkClassName="page-link"
                        previousClassName="page-link"
                        nextClassName="page-item"
                        nextLinkClassName="page-link"
                        breakClassName="page-item"
                        breakLinkClassName="page-link"
                        containerClassName="pagination"
                        activeClassName="active"
                    />
                </div>
            </div>
        </>
    )
}

export default ListTourPage;