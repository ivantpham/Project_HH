import React, { useEffect, useState } from 'react';
import { dataProduct } from '../api/datadraw';
import { useParams } from 'react-router-dom';
import { FaTruck } from 'react-icons/fa';

import styles from '../assets/css/ProductDetails.module.css'


function ProductDetails() {
    const [product, setProduct] = useState();
    const [varindex, setVarindex] = useState(0);
    const [variantSelected, setVariantSelected] = useState(null);
    const { id } = useParams();

    const handleChangeVarIndex = (index, item) => {
        setVarindex(index);
        setVariantSelected(item);
    };

    useEffect(() => {
        console.log('variant:', variantSelected);
    }, [variantSelected]);

    const findProduct = (id) => {
        const storedData = localStorage.getItem('ProductsTask');
        const products = JSON.parse(storedData) || []; // Parse the stored data or initialize an empty array

        const res = products.filter((i) => i.id == id);
        console.log('res', res);

        if (res.length > 0) {
            setProduct(res[0]);
            setVariantSelected(res[0].variants[0]); // Set the first variant as the default selected variant
        }
    };


    useEffect(() => {
        console.log('id', id);
        findProduct(id);
    }, [id]);

    if (!product) {
        return <h2>Not found product!</h2>;
    }

    return (
        <div className={styles.container}>
            <div className={styles.containPic}>
                <div className={styles.imgs}>
                    <img src={product.variants[varindex].url} alt='Product' />
                </div>
                <div className={styles.smav}>
                    {product.variants.map((item, index) => (
                        <div key={index}>
                            <div className={`${styles.smav - item} ${item.id === variantSelected.id ? 'active' : ''}`}>
                                <img
                                    checked={item.id === variantSelected.id}
                                    onClick={() => handleChangeVarIndex(index, item)}
                                    src={item.urlSmall}
                                    alt=''
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className={styles.titleInfo}>
                <FaTruck className={styles.icon} />
                <div className={styles.title}>Miễn phí vận chuyển toàn quốc</div>
                <div className={styles.info}>
                    <div className={styles.choice2}>Lựa chọn màu và xem địa chỉ còn hàng</div>
                    <div className={styles.input}>
                        {product.variants.map((item, index) => (
                            <div key={index}>
                                <div
                                    className={`${styles.selectLabel2} ${item.id === variantSelected.id ? 'active' : ''}`}
                                >
                                    <input
                                        checked={item.id === variantSelected.id}
                                        onClick={() => handleChangeVarIndex(index, item)}
                                        type='radio'
                                        name='c'
                                    />
                                    {item.name}
                                    <p>{item.price}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className={styles.Btn}>
                    <button className={styles.btn1}>Mua Ngay</button>
                    <button className={styles.btn2}>Thêm Giỏ Hàng</button>
                </div>
                <div className={styles.price}>
                    <p>{product.price}</p>
                </div>
            </div>
        </div>
    );
}

export default ProductDetails;
