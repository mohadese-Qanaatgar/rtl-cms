import React, { useEffect, useState } from 'react';
import './Comments.css';
import ErrorBox from '../ErrorBox/ErrorBox';
import DetailesModal from '../DetailesModal/DetailesModal';
import DeleteModal from '../DeleteModal/DeleteModal';
import EditModal from '../EditModal/EditModal';

export default function Comments() {
  const [allComments, setAllComments] = useState([]);
  const [isShowDetailesModal, setIsShowDetailesModal] = useState(false);
  const [isShowDeleteModal, setIsShowDeleteModal] = useState(false);
  const [isShowEditModal, setIsShowEditModal] = useState(false);
  const [isShowAcceptModal, setIsShowAcceptModal] = useState(false);
  const [isShowRejectModal, setIsShowRejectModal] = useState(false);
  const [mainCommentBody, setMainCommentBody] = useState('');
  const [commentId, setCommentId] = useState('');

  useEffect(() => {
    getAllComments();
  }, []);

  const getAllComments = () => {
    fetch('http://localhost:8000/api/comments/')
      .then((res) => res.json())
      .then((comment) => setAllComments(comment));
  };

  const closeDetailesModal = () => {
    setIsShowDetailesModal(false);
  };
  const closeDeleteModal = () => {
    setIsShowDeleteModal(false);
  };

  const CloseEditModal = () => {
    setIsShowEditModal(false);
  };

  const closeAcceptModal = () => {
    setIsShowAcceptModal(false);
  };

  const closeRejectModal = () => {
    setIsShowRejectModal(false);
  };
  const rejectComment = () => {
    fetch(`http://localhost:8000/api/comments/reject/${commentId}`, {
      method: 'POST',
    })
      .then((res) => res.json())
      .then((result) => {
        console.log('reject');
        setIsShowRejectModal(false);
        getAllComments();
      });
  };
  const acceptComment = () => {
    fetch(`http://localhost:8000/api/comments/accept/${commentId}`, {
      method: 'POST',
    })
      .then((res) => res.json())
      .then((result) => {
        console.log('accept');
        setIsShowAcceptModal(false);
        getAllComments();
      });
  };
  const updateComment = (event) => {
    event.preventDefault();
    fetch(`http://localhost:8000/api/comments/${commentId}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        body: mainCommentBody,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        setIsShowEditModal(false);
        getAllComments();
      });
  };
  const deleteAction = () => {
    fetch(`http://localhost:8000/api/comments/${commentId}`, {
      method: 'DELETE',
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        setIsShowDeleteModal(false);
        getAllComments();
      });

    console.log('کانت حذف شد');
  };

  return (
    <div className="cms-main">
      <h1 className="cms-title">کامنت ها</h1>
      {allComments.length ? (
        <table className="cms-table">
          <thead>
            <tr>
              <td>اسم کاربر</td>
              <td>محصول</td>
              <td>کامنت</td>
              <td>تاریخ</td>
              <td>ساعت</td>
            </tr>
          </thead>
          <tbody>
            {allComments.map((comment) => (
              <tr key={comment.id}>
                <td>{comment.userID}</td>
                <td>{comment.productID}</td>
                <td>
                  <button
                    className="discription-btn"
                    onClick={() => {
                      setMainCommentBody(comment.body);
                      setIsShowDetailesModal(true);
                    }}
                  >
                    دیدن متن
                  </button>
                </td>
                <td>{comment.date}</td>
                <td>{comment.hour}</td>
                <td>
                  <button
                    className="comment-btn"
                    onClick={() => {
                      setIsShowDeleteModal(true);
                      setCommentId(comment.id);
                    }}
                  >
                    حذف
                  </button>
                  <button
                    className="comment-btn"
                    onClick={() => {
                      setIsShowEditModal(true);
                      setMainCommentBody(comment.body);
                      setCommentId(comment.id);
                    }}
                  >
                    ویرایش
                  </button>
                  <button className="comment-btn">پاسخ</button>
                  {comment.isAccept === 0 ? (
                    <button
                      className="comment-btn"
                      onClick={() => {
                        setIsShowAcceptModal(true);
                        setCommentId(comment.id);
                      }}
                    >
                      تایید
                    </button>
                  ) : (
                    <button
                      className="comment-btn"
                      onClick={() => {
                        setIsShowRejectModal(true);
                        setCommentId(comment.id);
                      }}
                    >
                      ردکردن
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <ErrorBox message="هیج کامنتی وجود ندارد" />
      )}
      {isShowDetailesModal && (
        <DetailesModal onHide={closeDetailesModal}>
          <p className="text-modal">{mainCommentBody}</p>
          <button
            className="text-modal-close-btn"
            onClick={() => setIsShowDetailesModal(false)}
          >
            بستن
          </button>
        </DetailesModal>
      )}
      {isShowDeleteModal && (
        <DeleteModal
          title="آیا از حذف اطمینان دارید؟"
          cancelAction={closeDeleteModal}
          submitAction={deleteAction}
        />
      )}
      {isShowEditModal && (
        <EditModal onClose={CloseEditModal} onSubmit={updateComment}>
          <textarea
            value={mainCommentBody}
            onChange={(event) => setMainCommentBody(event.target.value)}
          ></textarea>
        </EditModal>
      )}
      {isShowAcceptModal && (
        <DeleteModal
          title="آیا از تایید اطمینان دارید؟"
          cancelAction={closeAcceptModal}
          submitAction={acceptComment}
        />
      )}
      {isShowRejectModal && (
        <DeleteModal
          title="آیا از رد کامنت اطمینان دارید؟"
          cancelAction={closeRejectModal}
          submitAction={rejectComment}
        />
      )}
    </div>
  );
}
