import React, { useEffect, useState } from 'react';
import { getDataProduct } from '../api/dataDrawFilter';
import '../assets/less/AllProducts.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const AllProducts = () => {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [formData, setFormData] = useState({
        id: '',
        title: '',
        price: '',
        brand: '',
        category: '',
        thumbnail: '',
    });

    useEffect(() => {
        const storedTask = localStorage.getItem('task');
        if (storedTask) {
            setProducts(JSON.parse(storedTask));
        } else {
            const data = getDataProduct();
            setProducts(data.products);
            localStorage.setItem('task', JSON.stringify(data.products));
        }
    }, []);

    useEffect(() => {
        setFilteredProducts(products);
    }, [products]);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const newProduct = {
            id: formData.id,
            title: formData.title,
            price: formData.price,
            brand: formData.brand,
            category: formData.category,
            thumbnail: formData.thumbnail,
        };
        const updatedProducts = [...products, newProduct];
        setProducts(updatedProducts);
        localStorage.setItem('task', JSON.stringify(updatedProducts));
        setFormData({
            id: '',
            title: '',
            price: '',
            brand: '',
            category: '',
            thumbnail: '',
        });
    };

    const handleFilterCategory = (category) => {
        if (category === 'all') {
            setFilteredProducts(products);
        } else {
            const filtered = products.filter((product) => product.category === category);
            setFilteredProducts(filtered);
        }
    };

    const handleFilterBrand = (brand) => {
        if (brand === 'all') {
            setFilteredProducts(products);
        } else {
            const filtered = products.filter((product) => product.brand === brand);
            setFilteredProducts(filtered);
        }
    };

    const allCategories = ['all', 'smartphones', 'tablets'];
    const allBrands = [...new Set(products.map((product) => product.brand))];

    const handleFilterBrandCategory = (brand, category) => {
        if (brand === 'all' && category === 'all') {
            setFilteredProducts(products);
        } else if (brand === 'all') {
            const filtered = products.filter((product) => product.category === category);
            setFilteredProducts(filtered);
        } else if (category === 'all') {
            const filtered = products.filter((product) => product.brand === brand);
            setFilteredProducts(filtered);
        } else {
            const filtered = products.filter(
                (product) => product.brand === brand && product.category === category
            );
            setFilteredProducts(filtered);
        }
    };

    const filterButtons = (
        <div className="filters">
            {allCategories.map((category) => (
                <button
                    key={category}
                    onClick={() => handleFilterBrandCategory('all', category)}
                    className="btn btn-secondary"
                >
                    {category === 'tablets' ? 'Tablet' : category === 'smartphones' ? 'Điện Thoại' : category === 'all' ? 'Tất Cả Sản Phẩm' : category}
                </button>
            ))}
        </div>
    );

    const filteredBrandProducts = [...new Set(filteredProducts.map((product) => product.brand))];
    const filteredCategoryProducts = [
        ...new Set(filteredProducts.map((product) => product.category)),
    ];

    const brandButtons = (
        <div className="filters">
            {filteredBrandProducts.map((brand) => (
                <button
                    key={brand}
                    onClick={() => handleFilterBrandCategory(brand, 'all')}
                    className="btn btn-secondary"
                >
                    {brand === 'smartphones' ? 'Điện Thoại' : brand}
                </button>
            ))}
        </div>
    );

    return (
        <div className="container">
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">ID</label>
                    <input
                        type="text"
                        name="id"
                        value={formData.id}
                        onChange={handleInputChange}
                        placeholder="ID"
                        className="form-control"
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Title</label>
                    <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleInputChange}
                        placeholder="Title"
                        className="form-control"
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Price</label>
                    <input
                        type="text"
                        name="price"
                        value={formData.price}
                        onChange={handleInputChange}
                        placeholder="Price"
                        className="form-control"
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Brand</label>
                    <input
                        type="text"
                        name="brand"
                        value={formData.brand}
                        onChange={handleInputChange}
                        placeholder="Brand"
                        className="form-control"
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Category</label>
                    <input
                        type="text"
                        name="category"
                        value={formData.category}
                        onChange={handleInputChange}
                        placeholder="Category"
                        className="form-control"
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Thumbnail</label>
                    <input
                        type="text"
                        name="thumbnail"
                        value={formData.thumbnail}
                        onChange={handleInputChange}
                        placeholder="Thumbnail"
                        className="form-control"
                    />
                </div>
                <button type="submit" className="btn btn-primary">
                    Submit
                </button>
            </form>

            {filterButtons}
            {brandButtons}

            <div className="product-list">
                {filteredProducts.map((product) => (
                    <div key={product.id}>
                        <h3>{product.title}</h3>
                        <img src={product.thumbnail} alt={product.title} />
                        <p>Price: {product.price}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AllProducts;
