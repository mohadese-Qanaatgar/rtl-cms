import React, { useState } from 'react';
import './AddNewProduct.css';
import { MdDriveFileRenameOutline } from 'react-icons/md';
import { IoBagOutline } from 'react-icons/io5';
import { AiOutlinePicture } from 'react-icons/ai';
import { PiCurrencyDollar } from 'react-icons/pi';

export default function AddNewProduct({ getAllProduct }) {
  const [newProductTitle, setNewProductTitle] = useState('');
  const [newProductPrice, setNewProductPrice] = useState('');
  const [newProductCount, setNewProductCount] = useState('');
  const [newProductPopularity, setNewProductPopularity] = useState('');
  const [newProductSale, setNewProductSale] = useState('');
  const [newProductColors, setNewProductColors] = useState('');
  const [newProductImg, setNewProductImg] = useState('');

  const addNewProduct = (event) => {
    event.preventDefault();
    const newProductInfos = {
      title: newProductTitle,
      price: newProductPrice,
      count: newProductCount,
      img: newProductImg,
      popularity: newProductPopularity,
      sale: newProductSale,
      colors: newProductColors,
    };

    fetch('http://localhost:8000/api/products', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(newProductInfos),
    })
      .then((res) => res.json())
      .then((result) => {
        getAllProduct();
      });
    emptyInputs();
  };

  const emptyInputs = () => {
    setNewProductTitle('');
    setNewProductPrice('');
    setNewProductCount('');
    setNewProductPopularity('');
    setNewProductSale('');
    setNewProductColors('');
    setNewProductImg('');
  };

  return (
    <div className="products-main">
      <h1 className="products-title">افزودن محصول جدید</h1>
      <form action="#" className="add-products-form">
        <div className="add-products-wrapper">
          <div className="add-products-form-wrap1">
            <div className="add-products-form-group">
              <MdDriveFileRenameOutline className="add-products-form-icon" />
              <input
                type="text"
                className="add-products-input"
                placeholder="اسم محصول را بنویسید"
                value={newProductTitle}
                onChange={(event) => setNewProductTitle(event.target.value)}
              />
            </div>
            <div className="add-products-form-group">
              <IoBagOutline className="add-products-form-icon" />
              <input
                type="text"
                className="add-products-input"
                placeholder="موجودی محصول را بنویسید"
                value={newProductCount}
                onChange={(event) => setNewProductCount(event.target.value)}
              />
            </div>
            <div className="add-products-form-group">
              <AiOutlinePicture className="add-products-form-icon" />
              <input
                type="text"
                className="add-products-input"
                placeholder="میزان محبوبیت محصول را بنویسید"
                value={newProductPopularity}
                onChange={(event) =>
                  setNewProductPopularity(event.target.value)
                }
              />
            </div>
            <div className="add-products-form-group">
              <AiOutlinePicture className="add-products-form-icon" />
              <input
                type="text"
                className="add-products-input"
                placeholder="تعداد رنگ بندی محصول را بنویسید"
                value={newProductColors}
                onChange={(event) => setNewProductColors(event.target.value)}
              />
            </div>
          </div>
          <div className="add-products-form-wrap2">
            <div className="add-products-form-group">
              <PiCurrencyDollar className="add-products-form-icon" />
              <input
                type="text"
                className="add-products-input"
                placeholder="قیمت محصول را بنویسید"
                value={newProductPrice}
                onChange={(event) => setNewProductPrice(event.target.value)}
              />
            </div>
            <div className="add-products-form-group">
              <AiOutlinePicture className="add-products-form-icon" />
              <input
                type="text"
                className="add-products-input"
                placeholder="آدرس عکس محصول را بنویسید"
                value={newProductImg}
                onChange={(event) => setNewProductImg(event.target.value)}
              />
            </div>
            <div className="add-products-form-group">
              <AiOutlinePicture className="add-products-form-icon" />
              <input
                type="text"
                className="add-products-input"
                placeholder="میزان فروش محصول را بنویسید"
                value={newProductSale}
                onChange={(event) => setNewProductSale(event.target.value)}
              />
            </div>
          </div>
        </div>
        <button className="add-product-submit" onClick={addNewProduct}>
          ثبت محصول
        </button>
      </form>
    </div>
  );
}
