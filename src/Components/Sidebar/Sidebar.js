import React from 'react';
import './Sidebar.css';
import { IoHomeOutline } from 'react-icons/io5';
import { MdProductionQuantityLimits } from 'react-icons/md';
import { MdOutlineInsertComment } from 'react-icons/md';
import { FiUsers } from 'react-icons/fi';
import { IoBagCheckOutline } from 'react-icons/io5';
import { BiSolidOffer } from 'react-icons/bi';
import { Link, NavLink } from 'react-router-dom';

export default function Sidebar() {
  return (
    <div className="sidebar">
      <h1 className="sidebar-title">به داشبورد خوش آمدید</h1>
      <ul className="sidebar-links">
        <NavLink className="sidebar-links__item" to="/">
          <IoHomeOutline className="sidebar-links__icon" />
          صفحه اصلی
        </NavLink>
        <NavLink className="sidebar-links__item" to="/products">
          <MdProductionQuantityLimits className="sidebar-links__icon" />
          محصولات
        </NavLink>
        <NavLink className="sidebar-links__item" to="/comments">
          <MdOutlineInsertComment className="sidebar-links__icon" />
          کامنت ها
        </NavLink>
        <NavLink className="sidebar-links__item" to="/users">
          <FiUsers className="sidebar-links__icon" />
          کاربران
        </NavLink>
        <NavLink className="sidebar-links__item" to="/orders">
          <IoBagCheckOutline className="sidebar-links__icon" />
          سفارشات
        </NavLink>
        <NavLink className="sidebar-links__item" to="/offs">
          <BiSolidOffer className="sidebar-links__icon" />
          تخفیف ها
        </NavLink>
      </ul>
    </div>
  );
}
