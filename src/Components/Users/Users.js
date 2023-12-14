import React, { useEffect, useState } from 'react';
import './Users.css';
import ErrorBox from '../ErrorBox/ErrorBox';
import DeleteModal from '../DeleteModal/DeleteModal';
import EditModal from '../EditModal/EditModal';
import { AiOutlineDollarCircle } from 'react-icons/ai';
import DetailesModal from '../DetailesModal/DetailesModal';

export default function Users() {
  const [users, setUsers] = useState([]);
  const [isShowDeleteUser, setIsShowDeleteUser] = useState(false);
  const [isShowEditUser, setIsShowEditUser] = useState(false);
  const [isShowDetailesModal, setIsShowDetailesModal] = useState(false);
  const [userId, setUserId] = useState(null);
  const [mainUerInfos, setMainUerInfos] = useState({});

  const [userNewFirsname, setUserNewFirsname] = useState('');
  const [userNewLastname, setUserNewLastname] = useState('');
  const [userNewUsername, setUserNewUsername] = useState('');
  const [userNewPassword, setUserNewPassword] = useState('');
  const [userNewPhone, setUserNewPhone] = useState('');
  const [userNewCity, setUserNewCity] = useState('');
  const [userNewEmail, setUserNewEmail] = useState('');
  const [userNewAddress, setUserNewAddress] = useState('');
  const [userNewScore, setUserNewScore] = useState('');
  const [userNewBuy, setUserNewBuy] = useState('');

  useEffect(() => {
    getAllUsers();
  }, []);

  const getAllUsers = () => {
    fetch(`http://localhost:8000/api/users`)
      .then((res) => res.json())
      .then((users) => setUsers(users));
  };

  const closeDeleteUser = () => {
    setIsShowDeleteUser(false);
  };

  const closeEditModal = () => {
    setIsShowEditUser(false);
  };

  const updateUser = (event) => {
    const userUpdate = {
      firsname: userNewFirsname,
      lastname: userNewLastname,
      username: userNewUsername,
      password: userNewPassword,
      phone: userNewPhone,
      city: userNewCity,
      email: userNewEmail,
      address: userNewAddress,
      score: userNewScore,
      buy: userNewBuy,
    };
    event.preventDefault();
    fetch(`http://localhost:8000/api/users/${userId}`, {
      method: 'PUT',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(userUpdate),
    })
      .then((res) => res.json())
      .then((result) => {
        console.log('edit');
        setIsShowEditUser(false);
        getAllUsers();
      });
  };

  const removeUser = () => {
    fetch(`http://localhost:8000/api/users/${userId}`, {
      method: 'DELETE',
    })
      .then((res) => res.json())
      .then((result) => {
        setIsShowDeleteUser(false);
        getAllUsers();
      });
  };

  return (
    <div className="cms-main">
      <h1 className="cms-title">لیست کاربران</h1>
      {users.length ? (
        <table className="cms-table">
          <thead>
            <tr>
              <th>نام و نام خانوادگی</th>
              <th>نام کاربری</th>
              <th>رمزعبور</th>
              <th>شماره تماس</th>
              <th>ایمیل</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>
                  {user.firsname} {user.lastname}
                </td>
                <td>{user.username}</td>
                <td>{user.password}</td>
                <td>{user.phone}</td>
                <td>{user.email}</td>
                <td>
                  <button
                    className="users-btn"
                    onClick={() => {
                      setIsShowDeleteUser(true);
                      setUserId(user.id);
                    }}
                  >
                    حذف
                  </button>
                  <button
                    className="users-btn"
                    onClick={() => {
                      setMainUerInfos(user);
                      setIsShowDetailesModal(true);
                    }}
                  >
                    جزییات
                  </button>
                  <button
                    className="users-btn"
                    onClick={() => {
                      setIsShowEditUser(true);
                      setUserId(user.id);
                      setUserId(user.id);
                      setUserNewFirsname(user.firsname);
                      setUserNewLastname(user.lastname);
                      setUserNewAddress(user.address);
                      setUserNewBuy(user.buy);
                      setUserNewCity(user.city);
                      setUserNewEmail(user.email);
                      setUserNewPassword(user.password);
                      setUserNewPhone(user.phone);
                      setUserNewScore(user.score);
                      setUserNewUsername(user.username);
                    }}
                  >
                    ویرایش
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <ErrorBox message="هیچ کاربری یافت نشد" />
      )}
      {isShowDeleteUser && (
        <DeleteModal
          title="آیا از حذف کاربر اطمینان دارید؟"
          cancelAction={closeDeleteUser}
          submitAction={removeUser}
        />
      )}
      {isShowEditUser && (
        <EditModal onClose={closeEditModal} onSubmit={updateUser}>
          <div className="edit-user-group">
            <span>
              <AiOutlineDollarCircle />
            </span>
            <input
              type="text"
              className="edit-user-info"
              placeholder="مقدار جدید را وارد کنید"
              value={userNewFirsname}
              onChange={(event) => setUserNewFirsname(event.target.value)}
            />
          </div>
          <div className="edit-user-group">
            <span>
              <AiOutlineDollarCircle />
            </span>
            <input
              type="text"
              className="edit-user-info"
              placeholder="مقدار جدید را وارد کنید"
              value={userNewLastname}
              onChange={(event) => setUserNewLastname(event.target.value)}
            />
          </div>
          <div className="edit-user-group">
            <span>
              <AiOutlineDollarCircle />
            </span>
            <input
              type="text"
              className="edit-user-info"
              placeholder="مقدار جدید را وارد کنید"
              value={userNewUsername}
              onChange={(event) => setUserNewUsername(event.target.value)}
            />
          </div>
          <div className="edit-user-group">
            <span>
              <AiOutlineDollarCircle />
            </span>
            <input
              type="text"
              className="edit-user-info"
              placeholder="مقدار جدید را وارد کنید"
              value={userNewPassword}
              onChange={(event) => setUserNewPassword(event.target.value)}
            />
          </div>
          <div className="edit-user-group">
            <span>
              <AiOutlineDollarCircle />
            </span>
            <input
              type="text"
              className="edit-user-info"
              placeholder="مقدار جدید را وارد کنید"
              value={userNewPhone}
              onChange={(event) => setUserNewPhone(event.target.value)}
            />
          </div>
          <div className="edit-user-group">
            <span>
              <AiOutlineDollarCircle />
            </span>
            <input
              type="text"
              className="edit-user-info"
              placeholder="مقدار جدید را وارد کنید"
              value={userNewCity}
              onChange={(event) => setUserNewCity(event.target.value)}
            />
          </div>
          <div className="edit-user-group">
            <span>
              <AiOutlineDollarCircle />
            </span>
            <input
              type="text"
              className="edit-user-info"
              placeholder="مقدار جدید را وارد کنید"
              value={userNewEmail}
              onChange={(event) => setUserNewEmail(event.target.value)}
            />
          </div>
          <div className="edit-user-group">
            <span>
              <AiOutlineDollarCircle />
            </span>
            <textarea
              className="edit-user-info"
              placeholder="مقدار جدید را وارد کنید"
              value={userNewAddress}
              onChange={(event) => setUserNewAddress(event.target.value)}
            ></textarea>
          </div>
          <div className="edit-user-group">
            <span>
              <AiOutlineDollarCircle />
            </span>
            <input
              type="text"
              className="edit-user-info"
              placeholder="مقدار جدید را وارد کنید"
              value={userNewScore}
              onChange={(event) => setUserNewScore(event.target.value)}
            />
          </div>
          <div className="edit-user-group">
            <span>
              <AiOutlineDollarCircle />
            </span>
            <input
              type="text"
              className="edit-user-info"
              placeholder="مقدار جدید را وارد کنید"
              value={userNewBuy}
              onChange={(event) => setUserNewBuy(event.target.value)}
            />
          </div>
        </EditModal>
      )}
      {isShowDetailesModal && (
        <DetailesModal onHide={() => setIsShowDetailesModal(false)}>
          <table className="cms-table">
            <thead>
              <tr className="cms-table-tr">
                <th>شهر</th>
                <th>آدرس</th>
                <th>امتیاز</th>
                <th>میزان خرید</th>
              </tr>
            </thead>
            <tbody>
              <tr className="cms-table-tr">
                <td>{mainUerInfos.city}%</td>
                <td>{mainUerInfos.address}</td>
                <td>{mainUerInfos.score}</td>
                <td>{mainUerInfos.buy}</td>
              </tr>
            </tbody>
          </table>
        </DetailesModal>
      )}
    </div>
  );
}
