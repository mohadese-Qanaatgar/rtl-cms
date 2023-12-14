import React, { useEffect, useState } from 'react';
import './ProductsTable.css';
import DeleteModal from '../DeleteModal/DeleteModal';
import DetailesModal from '../DetailesModal/DetailesModal';
import EditModal from '../EditModal/EditModal';
import { AiOutlineDollarCircle } from 'react-icons/ai';
import ErrorBox from '../ErrorBox/ErrorBox';

export default function ProductsTable({ allProducts, getAllProduct }) {
  const [isShowDeleteModal, setIsShowDeleteModal] = useState(false);
  const [isShowِDetailesModal, setIsShowِDetailesModal] = useState(false);
  const [isShowِEditModal, setIsShowِEditModal] = useState(false);
  const [productId, setProductId] = useState(null);
  const [mainProductInfos, setMainProductInfos] = useState({});

  const [productNewTitle, setProductNewTitle] = useState('');
  const [productNewPrice, setProductNewPrice] = useState('');
  const [productNewCount, setProductNewCount] = useState('');
  const [productNewImg, setProductNewImg] = useState('');
  const [productNewPopularity, setProductNewPopularity] = useState('');
  const [productNewSale, setProductNewSale] = useState('');
  const [productNewColors, setProductNewColors] = useState('');

  const deleteModalCancelAction = () => {
    setIsShowDeleteModal(false);
  };
  const deleteModalAcceptAction = () => {
    fetch(`http://localhost:8000/api/products/${productId}`, {
      method: 'DELETE',
    })
      .then((res) => res.json())
      .then((data) => {
        setIsShowDeleteModal(false);
        getAllProduct();
      });
    console.log('تایید شد');
  };

  const closeDetailesModal = () => {
    setIsShowِDetailesModal(false);
  };

  const updateProductInfos = (event) => {
    event.preventDefault();
    const productsNewInfos = {
      title: productNewTitle,
      price: productNewPrice,
      count: productNewCount,
      img: productNewImg,
      popularity: productNewPopularity,
      sale: productNewSale,
      colors: productNewColors,
    };

    fetch(`http://localhost:8000/api/products/${productId}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(productsNewInfos),
    })
      .then((res) => res.json())
      .then((result) => {
        getAllProduct();
        setIsShowِEditModal(false);
      });

    console.log('edit');
  };

  return (
    <>
      {allProducts.length ? (
        <div className="products-table">
          <table className="table">
            <thead>
              <tr className="table-heading-tr">
                <th>عکس </th>
                <th>اسم</th>
                <th>قیمت</th>
                <th>موجودی</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {allProducts.map((product) => (
                <tr key={product.id} className="table-data-tr">
                  <td>
                    <img
                      src={product.img}
                      className="product-table-img"
                      alt="product photo"
                    />
                  </td>
                  <td>{product.title}</td>
                  <td>{product.price}تومان</td>
                  <td>{product.count}</td>
                  <td>
                    <button
                      className="product-table-btn"
                      onClick={() => {
                        setIsShowِDetailesModal(true);
                        setMainProductInfos(product);
                      }}
                    >
                      جزییات
                    </button>
                    <button
                      className="product-table-btn"
                      onClick={() => {
                        setIsShowDeleteModal(true);
                        setProductId(product.id);
                      }}
                    >
                      حذف
                    </button>
                    <button
                      className="product-table-btn"
                      onClick={() => {
                        setIsShowِEditModal(true);
                        setProductId(product.id);
                        setProductNewTitle(product.title);
                        setProductNewColors(product.colors);
                        setProductNewCount(product.count);
                        setProductNewImg(product.img);
                        setProductNewPopularity(product.popularity);
                        setProductNewPrice(product.price);
                        setProductNewSale(product.sale);
                      }}
                    >
                      ویرایش
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <ErrorBox message="هیچ محصولی یافت نشد." />
      )}

      {isShowDeleteModal && (
        <DeleteModal
          title="آیا از حذف اطمینان دارید؟"
          cancelAction={deleteModalCancelAction}
          submitAction={deleteModalAcceptAction}
        />
      )}
      {isShowِDetailesModal && (
        <DetailesModal onHide={closeDetailesModal}>
          <table className="cms-table">
            <thead>
              <tr className="cms-table-tr">
                <th>محبوبیت</th>
                <th>فروش</th>
                <th>رنگبندی</th>
              </tr>
            </thead>
            <tbody>
              <tr className="cms-table-tr">
                <td>{mainProductInfos.popularity}%</td>
                <td>{mainProductInfos.sale}</td>
                <td>{mainProductInfos.colors}</td>
              </tr>
            </tbody>
          </table>
        </DetailesModal>
      )}
      {isShowِEditModal && (
        <EditModal
          onClose={() => setIsShowِEditModal(false)}
          onSubmit={updateProductInfos}
        >
          <div className="edit-products-form-group">
            <span>
              <AiOutlineDollarCircle />
            </span>
            <input
              type="text"
              placeholder=" عنوان جدید را وارد کنید"
              className="edit-products-input"
              value={productNewTitle}
              onChange={(event) => setProductNewTitle(event.target.value)}
            />
          </div>
          <div className="edit-products-form-group">
            <span>
              <AiOutlineDollarCircle />
            </span>
            <input
              type="text"
              placeholder=" قیمت جدید را وارد کنید"
              className="edit-products-input"
              value={productNewPrice}
              onChange={(event) => setProductNewPrice(event.target.value)}
            />
          </div>
          <div className="edit-products-form-group">
            <span>
              <AiOutlineDollarCircle />
            </span>
            <input
              type="text"
              placeholder=" موجودی جدید را وارد کنید"
              className="edit-products-input"
              value={productNewCount}
              onChange={(event) => setProductNewCount(event.target.value)}
            />
          </div>
          <div className="edit-products-form-group">
            <span>
              <AiOutlineDollarCircle />
            </span>
            <input
              type="text"
              placeholder=" آدرس کاور جدید را وارد کنید"
              className="edit-products-input"
              value={productNewImg}
              onChange={(event) => setProductNewImg(event.target.value)}
            />
          </div>
          <div className="edit-products-form-group">
            <span>
              <AiOutlineDollarCircle />
            </span>
            <input
              type="text"
              placeholder=" محبوبیت جدید را وارد کنید"
              className="edit-products-input"
              value={productNewPopularity}
              onChange={(event) => setProductNewPopularity(event.target.value)}
            />
          </div>
          <div className="edit-products-form-group">
            <span>
              <AiOutlineDollarCircle />
            </span>
            <input
              type="text"
              placeholder=" میزان فروش جدید را وارد کنید"
              className="edit-products-input"
              value={productNewSale}
              onChange={(event) => setProductNewSale(event.target.value)}
            />
          </div>
          <div className="edit-products-form-group">
            <span>
              <AiOutlineDollarCircle />
            </span>
            <input
              type="text"
              placeholder=" رنگبندی جدید را وارد کنید"
              className="edit-products-input"
              value={productNewColors}
              onChange={(event) => setProductNewColors(event.target.value)}
            />
          </div>
        </EditModal>
      )}
    </>
  );
}
