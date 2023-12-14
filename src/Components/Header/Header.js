import React from 'react';
import { FaRegBell } from 'react-icons/fa';
import { MdOutlineLightMode } from 'react-icons/md';
import './Header.css';

export default function Header() {
  return (
    <div className="header">
      <div className="admin-profile">
        <img
          src="/img/sara.jpg"
          alt="admin photo"
          className="admin-profile__img"
        />
        <div className="admin-profile__information">
          <h1 className="admin-profile__name">سارا محمدی</h1>
          <h3 className="admin-profile__role">برنامه نویس فرانت اند</h3>
        </div>
      </div>
      <div className="header-left">
        <div className="search-box">
          <input
            type="text"
            className="search-box__input"
            placeholder="جستجو کنید..."
          />
          <button className="search-box__btn">جستجو</button>
        </div>
        <button className="header-left__icon">
          <FaRegBell />
        </button>
        <button className="header-left__icon">
          <MdOutlineLightMode />
        </button>
      </div>
    </div>
  );
}
