import React from 'react';
import { useEffect, useState } from 'react';
import HeaderComponent from '../../component/HeaderComponent/HeaderComponent';
import '../BookingPage/Booking.css'
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { createBooking } from '../../services/BookingService';
import { useMutationHooks } from '../../hooks/useMutationHook';
import CustomerQuantity from '../../pattern/constructor';


const BookingPage = () => {

    const { id } = useParams(); 
    const [tourInfo, setTourInfo] = useState([]);

    const navigate = useNavigate();

    // Nhận thông tin tour từ API
    const getDetailTour = async () => {
        const { data } = await axios.get(`${process.env.REACT_APP_API_KEY}/tour/detail-tour/${id}`);
        setTourInfo(data?.tour);
    }

    // Chuyển imageTour từ object thành array
    const imgTour = tourInfo.imageTour;

    const imgTourArray = [];
    for (let key in imgTour) {
        if (imgTour.hasOwnProperty(key)) {
              
            imgTourArray.push(imgTour[key]);
        }
    }
    
    const imgTour1 = imgTourArray[0];

    useEffect(() => {
        if (id) 
            getDetailTour();
    }, [id]);

    // Tùy chỉnh số lượng khách
    let [adult, setAdult] = useState(1); 
    let [teen, setTeen] = useState(0); 
    let [children, setChildren] = useState(0); 
    let [infant, setInfant] = useState(0); 

    const [isAdult, setIsAdult] = useState(true)
    const [isTeen, setIsTeen] = useState(false)
    const [isChildren, setIsChildren] = useState(false)
    const [isInfant, setIsInfant] = useState(false)


    let totalPeople = adult + teen + children + infant;
    let totalPrice = (adult * tourInfo.adultPrice) + (teen * tourInfo.teenPrice) + (children * tourInfo.childrenPrice) + (infant * tourInfo.infantPrice);


    let [customers, setCustomers] = useState([]);
    const [customerName, setCustomerName] = useState([]); 
    const [customerPassport, setCustomerPassport] = useState([]);
    const [customerType, setCustomerType] = useState([]);
       
    const handleCustomer = () => {
        let newArray = Array(totalPeople).fill(null);
        setCustomers(newArray);
        setCustomerName(newArray);
        setCustomerPassport(newArray);
        setCustomerType(newArray)
    }

   // Nhập vào form mới sau khi thay đổi số lượng khách
    const handleOnChangeName = (e, index) => {
        setCustomerName((prevCustomerName) => {
            const newCustomerName = [...prevCustomerName];
            newCustomerName[index] = e.target.value;
            return newCustomerName;
        });
    }

    const handleOnChangePassport = (e, index) => {
        setCustomerPassport((prevCustomerPassport) => {
            const newCustomerPassport = [...prevCustomerPassport];
            newCustomerPassport[index] = e.target.value;
            return newCustomerPassport;
        });
    }

    const handleOnChangeType = (e, index) => {
        setCustomerType((prevCustomerType) => {
            const newCustomerType = [...prevCustomerType];
            if(isAdult) {
                newCustomerType[index] = 'Người lớn'
            } else if(isTeen) {
                newCustomerType[index] = 'Trẻ em'
            } else if(isChildren) {
                newCustomerType[index] = 'Trẻ nhỏ'
            } else if(isInfant) {
                newCustomerType[index] = 'Em bé'
            }
            return newCustomerType;
        });
    }

    // Khai báo và nhận giá trị input
    const [registerName, setRegisterName] = useState(''); 
    const [registerEmail, setRegisterEmail] = useState(''); 
    const [registerPhone, setRegisterPhone] = useState(''); 
    const [registerAddress, setRegisterAddress] = useState(''); 
    const [quantity, setQuantity] = useState(0);
    const [payPrice, setPayPrice] = useState(0);
    const [numberOfAdult, setNAdult] = useState(1);
    const [numberOfTeen, setNTeen] = useState(0);
    const [numberOfChildren, setNChildren] = useState(0);
    const [numberOfInfant, setNInfant] = useState(0);
    const [TourR, setTour] = useState(tourInfo._id);
    

    const handleRegisterName = (e) => {
        setRegisterName(e.target.value);
    }

    const handleRegisterEmail = (e) => {
        setRegisterEmail(e.target.value);
    }

    const handleRegisterPhone = (e) => {
        setRegisterPhone(e.target.value);
    }

    const handleRegisterAddress = (e) => {
        setRegisterAddress(e.target.value);
    }

    // Khi thay đổi state thì thay đổi kích thước mảng số lượng customer
    useEffect(() => {
        handleCustomer()
        setQuantity(totalPeople)
        setNAdult(adult)
        setNChildren(children)
        setNTeen(teen)
        setNInfant(infant)
    },[adult, teen, children, infant])

    useEffect(() => {
        setPayPrice(totalPrice)
    },[totalPrice])

    // Set state cho type
    useEffect(() => {
        setIsAdult(true);
        setIsTeen(false);
        setIsChildren(false);
        setIsInfant(false);
    },[adult])

    useEffect(() => {
        setIsAdult(false);
        setIsTeen(true);
        setIsChildren(false);
        setIsInfant(false);
    },[teen])

    useEffect(() => {
        setIsAdult(false);
        setIsTeen(false);
        setIsChildren(true);
        setIsInfant(false);
    },[children])

    useEffect(() => {
        setIsAdult(false);
        setIsTeen(false);
        setIsChildren(false);
        setIsInfant(true);
    },[infant])

    // Truyền data qua API
    const mutation = useMutationHooks (
        data => createBooking(data)
    )

    const handleCreateBooking = () => {
        mutation.mutate({
            TourR,
            registerName,
            registerEmail,
            registerPhone,
            registerAddress,
            quantity,
            payPrice,
            customerName,
            customerPassport,
            customerType,
            numberOfAdult,
            numberOfTeen,
            numberOfChildren,
            numberOfInfant
        })
    }

    const dataContainer = {
        TourR,
        registerName,
        registerEmail,
        registerPhone,
        registerAddress,
        quantity,
        payPrice,
        customerName,
        customerPassport,
        customerType,
        numberOfAdult,
        numberOfTeen,
        numberOfChildren,
        numberOfInfant
    };

    // Tạo booking mới và chuyển sang trang Payment
    const createBooking = async () => {
        const { data } = await axios.post(`${process.env.REACT_APP_API_KEY}/booking/create/${tourInfo._id}`, dataContainer);
        navigate(`/payment/${data?.newBooking?._id}`)
    }

    // Xử lí sau khi đã xác nhận data truyền vào
    const {isSuccess} = mutation;

    useEffect(() => {
        if(isSuccess) {
            alert("Đặt tour thành công")
        }
    },[isSuccess])

    return (
        <>
            <HeaderComponent/>

            <div className="booking-tour--body">
                <div className="input-information--section">
                    <p className="main-title">Nhập thông tin</p>
                    {/* User information */}
                    <div className="register-information--input">
                        <p className="title">Thông tin liên lạc</p>
                        <div className="input-form--container">
                            <div className="input-form--item">
                                <p className="name">Họ và tên</p>
                                <input type="text" className="name-input" onChange={handleRegisterName} required/>
                            </div>

                            <div className="input-form--item">
                                <p className="email">Email</p>
                                <input type="text" className="email-input" onChange={handleRegisterEmail} required/>
                            </div>

                            <div className="input-form--item">
                                <p className="phone">Số điện thoại</p>
                                <input type="text" className="phone-input" onChange={handleRegisterPhone} required/>
                            </div>

                            <div className="input-form--item">
                                <p className="address">Địa chỉ</p>
                                <input type="text" className="address-input" onChange={handleRegisterAddress}/>
                            </div>
                        </div>
                    </div>

                    {/* Tùy chỉnh số lượng hành khách */}
                    <div className="customer-count--container">
                        <p className="title">Hành khách</p>
                        <div className="customer-quantity--container">
                            

                            <CustomerQuantity
                                    adult={adult}
                                    children={children}
                                    teen={teen}
                                    infant={infant}
                                    onAdultChange={setAdult}
                                    onTeenChange={setTeen}
                                    onChildrenChange={setChildren}
                                    onInfantChange={setInfant}
                                />
                        </div>
                    </div>

                    <div className="customer-information--container">
                        <div className="title">Thông tin hành khách</div>
                        <div className="customer-information--item">
                            {customers.map((customer, index) => {
                                return (
                                    <>  
                                        <div className="customer-type">Thông tin hành khách #{index + 1}</div>
                                        <div className="form-information--container">
                                            <div className="infor-item first-name">
                                                <p className="infor-title">Họ và tên: </p>
                                                <input type="text" className="first-name--input" onChange={(event) => handleOnChangeName(event, index)}/>
                                            </div>

                                            <div className="infor-item last-name">
                                                <p className="infor-title">Passport: </p>
                                                <input type="text" className="last-name--input" onChange={(event) => handleOnChangePassport(event, index)}/>
                                            </div>

                                            <div className="infor-item last-name">
                                                <p className="infor-title">Loại khách: </p>
                                                <input type="text" className="customer-type--input" onChange={(event) => handleOnChangeType(event, index)} value={customerType[index]}/>
                                            </div>
                                        </div>
                                    </>
                                )
                            })}
                        </div>
                           
                    </div>
                </div>

                <div className="choosen-tour--section">
                    <div className="main-title">Tóm tắt chuyến đi</div>

                    <div className="tour-img" style={{
                                                backgroundImage: `url(${imgTour1})`
                                            }}></div>

                    <div className="tour-info--container">
                        <p className="tour-name">{tourInfo.nameTour}</p>

                        <div className="price-type--container">
                            <div className="price-item">
                                <p className="type">Người lớn</p>
                                <p className="price">{tourInfo?.adultPrice?.toLocaleString()} đ</p>    
                            </div>

                            <div className="price-item">
                                <p className="type">Trẻ em</p>
                                <p className="price">{tourInfo?.teenPrice?.toLocaleString()} đ</p>    
                            </div>

                            <div className="price-item">
                                <p className="type">Trẻ nhỏ</p>
                                <p className="price">{tourInfo?.childrenPrice?.toLocaleString()} đ</p>    
                            </div>

                            <div className="price-item">
                                <p className="type">Em bé</p>
                                <p className="price">{tourInfo?.infantPrice?.toLocaleString()} đ</p>    
                            </div>
                        </div>

                        <div className="count-people">
                            <p className="total-people">Tổng số người: </p>
                            <p className="total-number">{totalPeople} người</p>
                        </div>

                        <div className="total-price--container">
                            <p className="total-price">TỔNG CỘNG: </p>
                            <p className="total-price--number">{totalPrice?.toLocaleString()} đ</p>
                        </div>
                    </div>

                    <button className="payment-booking" onClick={handleCreateBooking}>ĐẶT NGAY</button>
                </div>
            </div>
        </>
    );
}

export default BookingPage