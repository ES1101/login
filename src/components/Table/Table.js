import React from "react";
import "./Table.css";

const Table = ({
  userList,
  currentItems,
  checkItems,
  setCheckItems,
  handleCheckboxChange,
}) => {
  return (
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
              checked={checkItems.length === userList.length && userList.length > 0}
            />
          </th>
          <th>Id</th>
          <th>Password</th>
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
  );
};

export default Table;