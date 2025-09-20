import React, { useEffect, useState } from "react";
import { fetchUsersWithMessages } from "../../services/messageService";
import { useMessageStore } from "../../store/useMessageStore";

const MessageList = () => {
  const [users, setUsers] = useState([]);
  const { selectedUser, setSelectedUser } = useMessageStore();

  useEffect(() => {
    fetchUsersWithMessages().then(setUsers);
  }, []);

  return (
    <div className="w-full md:w-1/3 border-r bg-white dark:bg-gray-900">
      <h2 className="text-xl p-4 font-semibold">Users</h2>
      <ul>
        {users.map((user) => (
          <li
            key={user._id}
            onClick={() => setSelectedUser(user)}
            className={`p-4 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 ${
              selectedUser?._id === user._id ? "bg-gray-200 dark:bg-gray-700" : ""
            }`}
          >
            <p className="font-medium">{user.name}</p>
            <p className="text-sm text-gray-500">{user.email}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MessageList;
