import React from "react";

const UserTable = ({ list }) => {
  return (
    <div className="users-table">
      <table>
        <thead>
          <tr>
            <th>UserID</th>
            <th>Email</th>
            <th>Name</th>
            <th>LibID</th>
            <th>Library Name</th>
          </tr>
        </thead>
        <tbody>
          {list?.map((l) => {
            return (
              <tr key={l?.id}>
                <td>{l?.id}</td>
                <td>{l?.email}</td>
                <td>{l?.name || "NA"}</td>
                <td>{l?.libId}</td>
                <td>{l?.Library?.name}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;
