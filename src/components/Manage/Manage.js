import React, { useEffect, useState } from "react";
import axios from "axios"; // http요청을 보내기 위해 사용하는 라이브러리
import "./Manage.css";
import Modal from "../Modal/Modal";

const Manage = () => {
  const [userList, setUserList] = useState([]); // userList 사용자 목록 관리하는 상태 변수
  const [isModal, setIsModal] = useState(false); // isModal 모달이 열려있는지 여부를 관리하는 상태 변수
  const [userToEdit, setUserToEdit] = useState(null); // userToEdit 수정할 사용자의 데이터를 관리하는 상태 변수
  const [originalId, setOriginalId] = useState(""); // originalId 수정 전 사용자의 ID 목록을 관리하는 상태 변수
  // const [sortOrder, setSortOrder] = useState({ key: null, order: "asc" });

  const [checkItems, setCheckItems] = useState([]); // checkItems 체크된 사용자의 ID목록을 관리하는 상태 변수

  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 번호를 관리하는 상태 변수
  const [itemsPerPage, setItemsPerPage] = useState(10); // 페이지당 항목 수를 관리하는 상태 변수

  const toggleModal = () => {
    setIsModal(!isModal);
  };

  const handleEdit = () => {
    // 선택 된 사용자가 있는지 확인
    // if (checkItems.length === 0) {
    //   alert("사용자를 선택해주세요.");
    //   return;
    // }
    const selectedUser = userList.find((user) => checkItems.includes(user.id));
    console.log("Selected User:", selectedUser);
    if (selectedUser) {
      setUserToEdit(selectedUser);
      setOriginalId(selectedUser.id);
      toggleModal();
    } else {
      alert("선택을 해주세요");
    }
  };
  // 체크된 사용자 중 첫 번째 사용자를 찾아 'userToEdit'와 'originalId'에 저장하고, 모달을

  const handleDelete = () => {
    setOriginalId("1234");
    setOriginalId(12345);

    const selectedUsers = userList.filter((user) =>
      checkItems.includes(user.id)
    );
    if (selectedUsers.length > 0) {
      selectedUsers.forEach((user) => {
        axios
          .delete(`http://localhost:3001/users/${user.id}`)
          .then(() => {
            alert("사용자 정보가 삭제되었습니다.");
            setUserList((prevUserList) =>
              prevUserList.filter((u) => user.id !== u.id)
            );
          })
          .catch((error) => {
            alert("삭제 실패");
            console.error("삭제 실패", error);
          });
      });
    } else {
      alert("선택을 해주세요");
    }
  };
  // const handleSort = (key) => {
  //   let order = "asc";
  //   if (sortOrder.key === key && sortOrder.order === "asc") {
  //     order = "desc";
  //   }

  //   const sortedList = [...userList].sort((a, b) => {
  //     if (a[key] < b[key]) return order === "asc" ? -1 : 1;
  //     if (a[key] > b[key]) return order === "asc" ? 1 : -1;
  //     return 0;
  //   });

  //   setUserList(sortedList);
  //   setSortOrder({ key, order });
  // };

  // 총 페이지 수 계산
  const totalPages = Math.ceil(userList.length / itemsPerPage);
  // 현재 페이지에 해당하는 데이터만 slice
  const currentItems = userList.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const renderPaginationButtons = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(
        <button
          style={{
            backgroundColor: currentPage === i ? "none" : "lightgray",
            color: currentPage === i ? "white" : "black",
            padding: "6px",
            margin: "0 7px",
            borderRadius: "5px",
            border: "none",
            cursor: "pointer",
          }}
          key={i}
          onClick={() => handlePageChange(i)}
          className={currentPage === i ? "active" : ""}
        >
          {i}
        </button>
      );
    }
    return pages;
  };

  const handleCheckboxChange = (id) => {
    setCheckItems((prevCheckItems) => {
      if (prevCheckItems.includes(id)) {
        return prevCheckItems.filter((item) => item !== id);
      } else {
        return [...prevCheckItems, id];
      }
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (userToEdit) {
      if (originalId !== userToEdit.id) {
        axios
          .delete(`http://localhost:3001/users/${originalId}`)
          .then(() => {
            return axios.post("http://localhost:3001/users", userToEdit);
          })
          .then((response) => {
            alert("수정되었습니다");
            setUserList((prevUserList) =>
              prevUserList.map((user) =>
                user.id === originalId ? response.data : user
              )
            );
            setIsModal(false);
          })
          .catch((error) => {
            console.error("실패:", error);
          });
      } else {
        axios
          .put(`http://localhost:3001/users/${userToEdit.id}`, userToEdit)
          .then((response) => {
            alert("정보가 수정되었습니다");
            setUserList((prevUserList) =>
              prevUserList.map((user) =>
                user.id === originalId ? response.data : user
              )
            );
            setIsModal(false);
          })
          .catch((error) => {
            console.error("정보 수정 실패:", error);
          });
      }
    }
  };

  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(parseInt(e.target.value, 10));
    setCurrentPage(1); // 페이지 수가 변경될 때 페이지를 첫 페이지로 초기화
  };

  useEffect(() => {
    axios
      .get("http://localhost:3001/users")
      .then((response) => {
        if (Array.isArray(response.data)) {
          setUserList(response.data);
        } else {
          console.error("응답 데이터는 배열이어야 합니다.", response.data);
          setUserList([]);
        }
      })
      .catch((error) => {
        console.error("에러", error);
      });
  }, []);

  return (
    <div className="Manage">
      <h4>사용자 아이디와 비밀번호</h4>
      <div className="buttonContainer">
        <button className="updateBt" onClick={() => handleEdit()}>
          수정
        </button>

        <button className="deleteBt" onClick={() => handleDelete()}>
          삭제
        </button>

        {/* 드롭다운 메뉴 추가 */}
        <select
          className="dropdown"
          onChange={handleItemsPerPageChange}
          value={itemsPerPage}
          style={{ marginLeft: "20px", padding: "5px" }}
        >
          <option value={10}>10개씩 보기</option>
          <option value={20}>20개씩 보기</option>
          <option value={30}>30개씩 보기</option>
        </select>
      </div>

      {currentItems.length > 0 ? (
        <table className="Table">
          <thead>
            <tr>
              <th></th>
              <th>
                <input
                  type="checkbox"
                  onChange={(e) => {
                    const isChecked = e.target.checked;
                    if (isChecked) {
                      setCheckItems(userList.map((user) => user.id));
                    } else {
                      setCheckItems([]);
                    }
                  }}
                  checked={
                    checkItems.length === userList.length && userList.length > 0
                  }
                />
              </th>
              {/* <th onClick={() => handleSort("id")}> */}
              <th>
                Id
                {/* {sortOrder.key === "id" &&
                  (sortOrder.order === "asc" ? "▲" : "▼")} */}
              </th>
              {/* <th onClick={() => handleSort("pw")}> */}
              <th>
                Password
                {/* {sortOrder.key === "pw" &&
                  (sortOrder.order === "asc" ? "▲" : "▼")} */}
              </th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((user, index) => (
              <tr
                key={index}
                style={{
                  backgroundColor: index % 2 === 0 ? "#f3f2f3" : "white",
                }}
              >
                <td style={{ backgroundColor: "#f3f2f3" }}>{index + 1}</td>
                <td style={{ backgroundColor: "#f3f2f3" }}>
                  <input
                    type="checkbox"
                    checked={checkItems.includes(user.id)}
                    onChange={() => handleCheckboxChange(user.id)}
                  />
                </td>
                <td>{user.id || "-"}</td>
                <td>{user.pw || "-"}</td>
                <td>{user.name || "-"}</td>
                <td>{user.email || "-"}</td>
                <td>{user.phone || "-"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>사용자 정보가 없습니다.</p>
      )}
      {/* 페이지네이션 버튼 렌더링 */}
      <div className="pagination">
        <button
          className="prevBtn"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          &lt;
        </button>
        {renderPaginationButtons()}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          &gt;
        </button>
      </div>

      {isModal && (
        <Modal onClose={toggleModal}>
          <form onSubmit={handleSubmit} style={{ width: "100%" }}>
            <label>
              ID:
              <input
                type="text"
                style={{
                  backgroundColor: "white",
                  margin: "0 1% 2% 3%",
                  width: "100px",
                }}
                value={userToEdit?.id || ""}
                onChange={(e) =>
                  setUserToEdit({ ...userToEdit, id: e.target.value })
                }
              />
            </label>
            <br />
            <label>
              Password:
              <input
                type="password"
                style={{
                  backgroundColor: "white",
                  margin: "0 1% 2% 3%",
                  width: "100px",
                }}
                value={userToEdit?.pw || ""}
                onChange={(e) =>
                  setUserToEdit({ ...userToEdit, pw: e.target.value })
                }
              />
            </label>
            <br />
            <label>
              Name:
              <input
                type="text"
                style={{
                  backgroundColor: "white",
                  margin: "0 1% 2% 3%",
                  width: "100px",
                }}
                value={userToEdit?.name || ""}
                onChange={(e) =>
                  setUserToEdit({ ...userToEdit, id: e.target.value })
                }
              />
            </label>
            <br />
            <label>
              Email:
              <input
                type="text"
                style={{
                  backgroundColor: "white",
                  margin: "0 1% 2% 3%",
                  width: "150px",
                }}
                value={userToEdit?.email || ""}
                onChange={(e) =>
                  setUserToEdit({ ...userToEdit, id: e.target.value })
                }
              />
            </label>
            <br />
            <label>
              Phone:
              <input
                type="text"
                style={{
                  backgroundColor: "white",
                  margin: "0 1% 2% 3%",
                  width: "150px",
                }}
                value={userToEdit?.phone || ""}
                onChange={(e) =>
                  setUserToEdit({ ...userToEdit, id: e.target.value })
                }
              />
            </label>
            <br />
            <button type="submit">확인</button>
          </form>
        </Modal>
      )}
    </div>
  );
};

export default Manage;
