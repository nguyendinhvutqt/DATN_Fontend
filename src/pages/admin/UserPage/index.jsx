import classNames from "classnames/bind";
import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";

import styles from "./style.module.scss";
import * as userService from "../../../services/userService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock, faUnlock } from "@fortawesome/free-solid-svg-icons";
import Paginate from "../../../components/Paginate";

const cx = classNames.bind(styles);

const UserAdminPage = () => {
  const [users, setUsers] = useState([]);
  // phân trang
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);

  const fetchApi = async (currentPage) => {
    try {
      const result = await userService.getUsers(currentPage);
      if (result.status === 200) {
        setUsers(result.data.data);
        setTotalPage(result.data.totalPage);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchApi(currentPage);
  }, [currentPage]);

  const handleBlockUser = async (userId) => {
    try {
      const result = await userService.blockUser(userId);

      if (result.status === 200) {
        setUsers((prev) => {
          return prev.map((user) => {
            if (user._id === result.data.data._id) {
              return result.data.data;
            }
            return user;
          });
        });
        toast.success("Khoá người dùng thành công");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleUnBlockUser = async (userId) => {
    try {
      const result = await userService.unBlockUser(userId);

      if (result.status === 200) {
        setUsers((prev) => {
          return prev.map((user) => {
            if (user._id === result.data.data._id) {
              return result.data.data;
            }
            return user;
          });
        });
        toast.success("Mở khoá người dùng thành công");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handlePageClick = (e) => {
    setCurrentPage(e.selected + 1);
  };
  return (
    <div className={cx("wrapper")}>
      <h2>DANH SÁCH NGƯỜI DÙNG</h2>
      <div className={cx("users-list")}>
        <table className={cx("users-table")}>
          <thead>
            <tr>
              <th className={cx("th-id")}>ID</th>
              <th className={cx("th-name")}>Tên</th>
              <th className={cx("th-image")}>Hình ảnh</th>
              <th className={cx("th-status")}>Trạng thái</th>
              <th className={cx("th-action")}></th>
            </tr>
          </thead>
          <tbody>
            {users &&
              users.map((user) => (
                <tr key={user._id} className={cx("")}>
                  <td>{user._id}</td>
                  <td>{user.name}</td>
                  <td className={cx("td-thumbnail")}>
                    {user?.googleId ? (
                      <img
                        className={cx("thumbnail")}
                        src={`${user.avatar}`}
                        alt="hình ảnh"
                      />
                    ) : (
                      <img
                        className={cx("thumbnail")}
                        src={`${process.env.REACT_APP_API_BASE + user.avatar}`}
                        alt="hình ảnh"
                      />
                    )}
                  </td>
                  <td>{user.status}</td>
                  <td>
                    <div className={cx("box-icon-lock")}>
                      {user.status === "Hoạt động" && (
                        <div
                          className={cx("icon-unlock")}
                          onClick={() => handleBlockUser(user._id)}
                        >
                          <FontAwesomeIcon icon={faLock} color="#fff" />
                        </div>
                      )}
                      {user.status === "Đã khoá" && (
                        <div
                          className={cx("icon-lock")}
                          onClick={() => handleUnBlockUser(user._id)}
                        >
                          <FontAwesomeIcon icon={faUnlock} color="#fff" />
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
        <Paginate onClickPage={handlePageClick} totalPage={totalPage} />
      </div>
      <ToastContainer />
    </div>
  );
};

export default UserAdminPage;
