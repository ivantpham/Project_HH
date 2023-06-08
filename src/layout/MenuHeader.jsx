import React, { useState, useEffect, useRef, createContext, useContext } from "react";
import { signOut } from "firebase/auth";
import { Link, useLocation } from 'react-router-dom';
import { Dropdown } from 'react-bootstrap';
import "../assets/less/header.css";
import { getDataProduct } from '../api/dataDrawFilter';
import Search from '../components/Search';

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from "../firebase/fire";
import AllProducts from "../components/AllProducts";

// Tạo Context
export const ValueContext = createContext();

export default function MenuHeader() {
  const location = useLocation();

  // State lưu product
  const [apiProducts, setApiProducts] = useState(getDataProduct().products);

  // State lưu product
  const [user, setUser] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [rememberUser, setRememberUser] = useState('');
  const [isLoggedOut, setIsLoggedOut] = useState(false);

  const dropdownRef = useRef(null);

  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [formData, setFormData] = useState({
    id: '',
    title: '',
    price: '',
    category: '',
    brand: '',
    thumbnail: '',
  });

  const handleDropdownToggle2 = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  const handleClosePopup = () => {
    setFormData({
      id: '',
      title: '',
      price: '',
      category: '',
      brand: '',
      thumbnail: '',
    });
    setIsPopupOpen(false);
    onSearchProduct(''); // Đặt lại giá trị tìm kiếm
    setIsBoxSearchVisible(false); // Ẩn div box-search
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    // Thực hiện các xử lý lưu dữ liệu từ form
    // Ví dụ: gửi dữ liệu đến server, lưu vào cơ sở dữ liệu, vv.

    // Sau khi lưu thành công, đặt lại giá trị form và đóng popup
    setFormData({
      id: '',
      title: '',
      price: '',
      category: '',
      brand: '',
      thumbnail: '',
    });
    setIsPopupOpen(false);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    setIsLoggedIn(!!user?.email);
  }, [user]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        setUser({});
        setRememberUser('');
        setIsLoggedOut(true);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const isHoangHaEmail = user?.email?.includes('@hoangha.com');
  console.log("isHoangHaEmail", isHoangHaEmail);

  // Kiểm tra đường dẫn hiện tại
  const isSignInPage = location.pathname === '/sign-in';
  const isSignUpPage = location.pathname === '/sign-up';

  // Hàm SEARCH
  const storedProducts = localStorage.getItem('ProductsTask');
  const initialProducts = storedProducts ? JSON.parse(storedProducts) : [];

  const [products, setProducts] = useState(initialProducts);
  const [isSearchEmpty, setIsSearchEmpty] = useState(true);
  const [isBoxSearchVisible, setIsBoxSearchVisible] = useState(false);

  const onSearchProduct = (value) => {
    console.log("hihi", value);
    const ProductsTask = JSON.parse(localStorage.getItem('ProductsTask')) || [];
    const res = ProductsTask.filter((i) => {
      const r = i.title.toLowerCase().includes(value.toLowerCase()) || i.brand.toLowerCase().includes(value.toLowerCase());
      return r;
    });
    console.log('res', res);
    setProducts(res);
    setIsSearchEmpty(value === ''); // Kiểm tra xem giá trị tìm kiếm có rỗng không
    setIsBoxSearchVisible(value !== ''); // Kiểm tra xem có dữ liệu tìm kiếm hay không
  };

  // Hàm SEARCH


  // HÀM UPLOAD ẢNH ĐẠI DIỆN
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setSelectedImage(reader.result);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleClosePopupPopup = () => {
    setIsPopupOpen(false);
  };

  const handleImageUpdate = () => {
    // Cập nhật và thay thế ảnh
    // Ví dụ:
    const newImage = "https://example.com/new-image.jpg";
    setSelectedImage(newImage);
    setIsPopupOpen(false);
  };

  // HÀM UPLOAD ẢNH ĐẠI DIỆN

  return (
    <>
      <header className={`headers ${isLoggedIn && !isLoggedOut ? 'fixed-header' : ''}`}>
        <nav className="nav">
          <Link className="logo" to={''} >
            <img src="https://hoanghamobile.com/Content/web/img/logo-text.png" alt="" className="logo" />
          </Link>
          <ul className="nav_items">
            <li className="nav_item">
              <Search onSearching={onSearchProduct} placeholder={'Nhập tên sản phẩm'} />
              <a href="#" className="nav_link">Bảo Hành</a>
              <a href="#" className="nav_link">Tra Cứu Đơn Hàng</a>
            </li>
          </ul>
          {isLoggedIn && !isLoggedOut ? (
            <>
              <Dropdown>
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                  <button type="button" className="d-flex align-items-center ">
                    <div className="success_sign d-flex justify-content-around ">
                      <div className="image_account">
                        <img src={selectedImage ? selectedImage : "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"} alt="" className="img-acc" />
                      </div>
                      <div className="name_account" >{user?.email}</div>
                    </div>
                  </button>
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item>
                    <li>
                      <button onClick={handleLogout}>Sign Out</button>
                    </li>
                  </Dropdown.Item>
                  <Dropdown.Item>
                    <li>
                      <button onClick={handleDropdownToggle2}>Thay Đổi Ảnh Đại Diện</button>
                    </li>
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </>
          ) : (
            <Link className="signin-signup" to={'/sign-in'} >
              <button className="button-login" id='form-open'>Đăng Nhập</button>
            </Link>
          )}
        </nav>
      </header>

      {isBoxSearchVisible && (
        <div className="box-search">
          <div className="Product-search-list d-flex flex-column mb-3">
            <div
              className="btn-close"
              onClick={() => {
                setIsBoxSearchVisible(false); // Ẩn div box-search
                onSearchProduct(''); // Đặt lại giá trị tìm kiếm
              }}
            ></div>
            {products.length > 0 ? (
              products.map((item) => (
                <div key={item.id} className="box-items d-flex justify-content-between align-items-center">
                  <img src={item.thumbnail} alt="Product Thumbnail" />

                  <p>{item.name}</p>
                  <p>{item.title}</p>
                  <p>{item.price}</p>
                </div>
              ))
            ) : (
              <div className="no-items">
                Không có sản phẩm cần tìm, hãy nhập từ khoá mới
              </div>
            )}
          </div>
        </div>
      )}

      <div className="overlay" style={isPopupOpen ? { display: "block" } : { display: "none" }}>
        <div className="popup">
          <div className="upLoadBox">
            <h3>Thay Đổi Ảnh Đại Diện</h3>
            <div className="upLoadIMG">
              <input type="file" accept="image/*" onChange={handleImageChange} />
            </div>
            {selectedImage && <img src={selectedImage} alt="Selected" />}

          </div>
          <div className="buttons">
            <button onClick={handleClosePopupPopup}>Hoàn Tất</button>
          </div>
        </div>
      </div>

      {!isSearchEmpty && !isSignInPage && !isSignUpPage && (
        <ValueContext.Provider value={apiProducts}>
          <div className="containers">
            {/* <AllProducts /> */}
          </div>
        </ValueContext.Provider>
      )}
    </>
  );
}

