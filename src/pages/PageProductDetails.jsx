// import React, { useEffect, useState } from 'react';
// import { dataProduct } from '../api/datadraw';
// import { useParams } from 'react-router-dom';
// import { FaTruck } from 'react-icons/fa';

// import '../assets/css/productDetailsShow.css'

// function PageProductDetails() {
//     const [product, setProduct] = useState();
//     const [varindex, setVarindex] = useState(0);
//     const [variantSelected, setVariantSelected] = useState(null);
//     const { id } = useParams();

//     const handleChangeVarIndex = (index, item) => {
//         setVarindex(index);
//         setVariantSelected(item);
//     };

//     useEffect(() => {
//         console.log('variant:', variantSelected);
//     }, [variantSelected]);

//     const findProduct = (id) => {
//         const storedData = localStorage.getItem('ProductsTask');
//         const products = JSON.parse(storedData) || []; // Parse the stored data or initialize an empty array

//         const res = products.filter((i) => i.id == id);
//         console.log('res', res);

//         if (res.length > 0) {
//             setProduct(res[0]);
//             setVariantSelected(res[0].variants[0]); // Set the first variant as the default selected variant
//         }
//     };


//     useEffect(() => {
//         console.log('id', id);
//         findProduct(id);
//     }, [id]);

//     if (!product) {
//         return <h2>Not found product!</h2>;
//     }

//     return (
//         <div className='container'>
//             <div className='contain-pic'>
//                 <div className='imgs'>
//                     <img src={product.variants[varindex].url} alt='Product' />
//                 </div>
//                 <div className='smav'>
//                     {product.variants.map((item, index) => (
//                         <div key={index}>
//                             <div className={`smav-item ${item.id === variantSelected.id ? 'active' : ''}`}>
//                                 <img
//                                     checked={item.id === variantSelected.id}
//                                     onClick={() => handleChangeVarIndex(index, item)}
//                                     src={item.urlSmall}
//                                     alt=''
//                                 />
//                             </div>
//                         </div>
//                     ))}
//                 </div>
//             </div>
//             <div className='title-info'>
//                 <FaTruck className='icon' />
//                 <div className='title'>Miễn phí vận chuyển toàn quốc</div>
//                 <div className='info'>
//                     <div className='choice2'>Lựa chọn màu và xem địa chỉ còn hàng</div>
//                     <div className='input'>
//                         {product.variants.map((item, index) => (
//                             <div key={index}>
//                                 <div
//                                     className={`select-label2 ${item.id === variantSelected.id ? 'active' : ''}`}
//                                 >
//                                     <input
//                                         checked={item.id === variantSelected.id}
//                                         onClick={() => handleChangeVarIndex(index, item)}
//                                         type='radio'
//                                         name='c'
//                                     />
//                                     {item.name}
//                                     <p>{item.price}</p>
//                                 </div>
//                             </div>
//                         ))}
//                     </div>
//                 </div>
//                 <div className='Btn'>
//                     <button className='btn-1'>Mua Ngay</button>
//                     <button className='btn-2'>Thêm Giỏ Hàng</button>
//                 </div>
//                 <div className='price'>
//                     <p>{product.price}</p>
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default PageProductDetails;
