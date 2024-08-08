import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Manage.css";
import Modal from "../Modal/Modal";
import Table from "../Table/Table";

const Manage = () => {
  const [userList, setUserList] = useState([]);
  const [isModal, setIsModal] = useState(false);
  const [userToEdit, setUserToEdit] = useState(null);
  const [originalId, setOriginalId] = useState("");
  const [checkItems, setCheckItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const toggleModal = () => {
    setIsModal(!isModal);
  };

  const handleEdit = () => {
    const selectedUser = userList.find((user) => checkItems.includes(user.id));
    if (selectedUser) {
      setUserToEdit(selectedUser);
      setOriginalId(selectedUser.id);
      toggleModal();
    } else {
      alert("수정할 사용자를 선택해주세요.");
    }
  };

  const handleDelete = async () => {
    const selectedUsers = userList.filter((user) =>
      checkItems.includes(user.id)
    );
    if (selectedUsers.length > 0) {
      try {
        await Promise.all(
          selectedUsers.map((user) =>
            axios.delete(`http://localhost:3001/users/${user.id}`)
          )
        );
        setUserList((prevUserList) =>
          prevUserList.filter((user) => !checkItems.includes(user.id))
        );
        alert(`${selectedUsers.length}개의 데이터가 삭제되었습니다.`);
        setCheckItems([]);
      } catch (error) {
        alert("삭제 실패");
        console.error("삭제 실패", error);
      }
    } else {
      alert("삭제할 사용자를 선택해주세요.");
    }
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
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

  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(parseInt(e.target.value, 10));
    setCurrentPage(1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (userToEdit) {
      const updateUser = async () => {
        try {
          if (originalId !== userToEdit.id) {
            await axios.delete(`http://localhost:3001/users/${originalId}`);
            const response = await axios.post(
              "http://localhost:3001/users",
              userToEdit
            );
            alert("수정되었습니다.");
            setUserList((prevUserList) =>
              prevUserList.map((user) =>
                user.id === originalId ? response.data : user
              )
            );
          } else {
            const response = await axios.put(
              `http://localhost:3001/users/${userToEdit.id}`,
              userToEdit
            );
            alert("정보가 수정되었습니다.");
            setUserList((prevUserList) =>
              prevUserList.map((user) =>
                user.id === originalId ? response.data : user
              )
            );
          }
          setIsModal(false);
        } catch (error) {
          console.error("정보 수정 실패:", error);
        }
      };
      updateUser();
    }
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

  const totalPages = Math.ceil(userList.length / itemsPerPage);
  const currentItems = userList.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="Manage">
      <h4>사용자 아이디와 비밀번호</h4>
      <div className="buttonContainer">
        <button className="updateBt" onClick={handleEdit}>
          수정
        </button>
        <button className="deleteBt" onClick={handleDelete}>
          삭제
        </button>
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
        <Table
          userList={userList}
          currentItems={currentItems}
          checkItems={checkItems}
          setCheckItems={setCheckItems}
          handleCheckboxChange={handleCheckboxChange}
        />
      ) : (
        <p>사용자 정보가 없습니다.</p>
      )}

      <div className="pagination">
        <button
          className="prevBtn"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          &lt;
        </button>
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i + 1}
            onClick={() => handlePageChange(i + 1)}
            className={currentPage === i + 1 ? "active" : ""}
          >
            {i + 1}
          </button>
        ))}
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
            <div style={{ marginBottom: "10px", marginLeft: "5%" }}>
              <label>ID: </label>
              <input
                type="text"
                value={userToEdit?.id || ""}
                onChange={(e) =>
                  setUserToEdit({ ...userToEdit, id: e.target.value })
                }
              />
            </div>

            <div style={{ marginBottom: "10px", marginLeft: "5%" }}>
              <label>Password: </label>
              <input
                type="password"
                value={userToEdit?.pw || ""}
                onChange={(e) =>
                  setUserToEdit({ ...userToEdit, pw: e.target.value })
                }
              />
            </div>

            <div style={{ marginBottom: "10px", marginLeft: "5%" }}>
              <label>Name: </label>
              <input
                type="text"
                value={userToEdit?.name || ""}
                onChange={(e) =>
                  setUserToEdit({ ...userToEdit, name: e.target.value })
                }
              />
            </div>

            <div style={{ marginBottom: "10px", marginLeft: "5%" }}>
              <label>Email: </label>
              <input
                type="text"
                value={userToEdit?.email || ""}
                onChange={(e) =>
                  setUserToEdit({ ...userToEdit, email: e.target.value })
                }
              />
            </div>

            <div style={{ marginBottom: "10px", marginLeft: "5%" }}>
              <label>Phone: </label>
              <input
                type="text"
                value={userToEdit?.phone || ""}
                onChange={(e) =>
                  setUserToEdit({ ...userToEdit, phone: e.target.value })
                }
              />
            </div>

            <div style={{ display: "flex", justifyContent: "center" }}>
              <button type="submit">확인</button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
};

export default Manage;
