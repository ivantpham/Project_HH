import React, { useContext, useEffect, useState } from 'react';
import ProductsItem from '@Components/ProductsItem';
import '@Assets/less/products.less';
import Search from './Search';
import AppContext from '@/context/AppContext';
import { getDataProduct } from '../api/dataDrawFilter';

function Products({ title, children }) {
  const { theme, setTheme } = useContext(AppContext);
  const [products, setProducts] = useState(getDataProduct.products);
  const [search, setSearch] = useState('');

  const onSearchProduct = (value) => {
    const res = getDataProduct.products.filter((i) => {
      const r = i.title.toLowerCase().includes(value.toLowerCase())
      return r
    })
    setProducts(res)
  }

  return (
    <div className="mt-9">
      <div className="Product-list grid grid-cols-6 gap-6">
        {products && products.map((item) => (
          <div key={item.id}>
            <img src={item.thumbnail}></img>
            <p>{item.name}</p>
            <p>{item.title}</p>
            <p>{item.price}</p>
          </div>
        ))}
      </div>
      <div className="flex mb-4 w-full justify-between items-center">
        <div className="search-product">
          <h2>Tìm sản phẩm</h2>
          <Search onSearching={onSearchProduct} placeholder={'Nhập tên sản phẩm'} />
        </div>
        <span>số lượng: {products?.length || 0}</span>
      </div>
    </div>
  );
}

export default Products;
