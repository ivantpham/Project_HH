import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../assets/less/footer.css'; // Import your custom CSS file
import { Link } from 'react-router-dom';


function Footer() {
  const [productCount, setProductCount] = useState(0);

  useEffect(() => {
    const productsCart = JSON.parse(localStorage.getItem('ProductsCart')) || [];
    setProductCount(productsCart.length);

    const interval = setInterval(() => {
      const updatedProductsCart = JSON.parse(localStorage.getItem('ProductsCart')) || [];
      if (updatedProductsCart.length !== productCount) {
        setProductCount(updatedProductsCart.length);
      }
    }, 500);

    return () => clearInterval(interval);
  }, [productCount]);

  return (
    <div className="container">
      <footer className="footer">
        Footer
      </footer>


      <Link className="logo" to={'/cart'} >
        <div className="cart-container">
          <span style={{ color: 'yellow', fontSize: '30px' }}>{productCount}</span>

          {/* Icon giỏ hàng */}
          <svg xmlns="http://www.w3.org/2000/svg" width="32 " height="32" fill="white" className="bi bi-cart" viewBox="0 0 16 16">
            <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
          </svg>
        </div>
      </Link>



    </div>
  );

}

export default Footer;
