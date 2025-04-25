// import { useState } from "react";
// import axios from "axios";

// function App() {
//   const [query, setQuery] = useState("");
//   const [products, setProducts] = useState([]);

//   const handleSearch = async () => {
//     try {
//       const response = await axios.get(
//         "http://localhost:8000/api/products/search",
//         {
//           params: { query },
//         }
//       );
//       setProducts(response.data.products);
//     } catch (error) {
//       console.error("Error fetching search results:", error);
//     }
//   };

//   return (
//     <div className="container mx-auto p-4">
//       <h1 className="text-2xl font-bold mb-4">Product Search</h1>
//       <div className="mb-4">
//         <input
//           type="text"
//           value={query}
//           onChange={(e) => setQuery(e.target.value)}
//           placeholder="Search products..."
//           className="border p-2 rounded w-full"
//           onKeyPress={(e) => e.key === "Enter" && handleSearch()}
//         />
//       </div>
//       <div>
//         {products.length > 0 ? (
//           <ul className="space-y-2">
//             {products.map((product) => (
//               <li key={product.id} className="border p-4 rounded">
//                 <h3 className="font-bold">{product.name}</h3>
//                 <p>{product.description}</p>
//                 <p className="text-green-600">${product.price}</p>
//               </li>
//             ))}
//           </ul>
//         ) : (
//           <p>No products found.</p>
//         )}
//       </div>
//     </div>
//   );
// }

// export default App;

//
// import { useState, useEffect } from "react";
// import axios from "axios";

// function App() {
//   const [query, setQuery] = useState("");
//   const [tasks, setTasks] = useState([]);
//   const [page, setPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);
//   const [selectedTask, setSelectedTask] = useState(null);
//   const [token, setToken] = useState(localStorage.getItem("token") || "");
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [isLoggedIn, setIsLoggedIn] = useState(!!token);

//   // Thiết lập axios với token
//   axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
//   const handleLogin = async () => {
//     try {
//       const response = await axios.post("http://localhost:8000/api/login", {
//         username,
//         password,
//       });
//       const { token, user } = response.data;
//       setToken(token);
//       setIsLoggedIn(true);
//       localStorage.setItem("token", token);
//       axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
//       alert("Login successful!");
//     } catch (error) {
//       console.error("Login failed:", error);
//       alert("Invalid credentials");
//     }
//   };

//   const handleLogout = () => {
//     setToken("");
//     setIsLoggedIn(false);
//     localStorage.removeItem("token");
//     delete axios.defaults.headers.common["Authorization"];
//     setTasks([]);
//     setSelectedTask(null);
//   };

//   const fetchTasks = async () => {
//     if (!isLoggedIn) return;
//     try {
//       const response = await axios.get("http://localhost:8000/api/tasks", {
//         params: { page },
//       });
//       setTasks(response.data.tasks);
//       setTotalPages(response.data.last_page);
//     } catch (error) {
//       console.error("Error fetching tasks:", error);
//     }
//   };

//   const handleSearch = async () => {
//     if (!isLoggedIn) return;
//     try {
//       const response = await axios.get(
//         "http://localhost:8000/api/tasks/search",
//         {
//           params: { query },
//         }
//       );
//       setTasks(response.data.data.tasks);
//     } catch (error) {
//       console.error("Error fetching search results:", error);
//     }
//   };

//   const fetchTaskDetails = async (id) => {
//     if (!isLoggedIn) return;
//     try {
//       const response = await axios.get(`http://localhost:8000/api/tasks/${id}`);
//       setSelectedTask(response.data.task);
//     } catch (error) {
//       console.error("Error fetching task details:", error);
//     }
//   };

//   useEffect(() => {
//     fetchTasks();
//   }, [page, isLoggedIn]);

//   return (
//     <div className="container mx-auto p-4">
//       <h1 className="text-2xl font-bold mb-4">Task Management</h1>

//       {/* Login Form */}
//       {!isLoggedIn ? (
//         <div className="mb-4 p-4 border rounded">
//           <h2 className="text-xl font-semibold mb-2">Login</h2>
//           <input
//             type="text"
//             value={username}
//             onChange={(e) => setUsername(e.target.value)}
//             placeholder="Username"
//             className="border p-2 rounded w-full mb-2"
//           />
//           <input
//             type="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             placeholder="Password"
//             className="border p-2 rounded w-full mb-2"
//           />
//           <button
//             onClick={handleLogin}
//             className="bg-blue-500 text-white p-2 rounded"
//           >
//             Login
//           </button>
//         </div>
//       ) : (
//         <div className="mb-4">
//           <button
//             onClick={handleLogout}
//             className="bg-red-500 text-white p-2 rounded"
//           >
//             Logout
//           </button>
//         </div>
//       )}

//       {/* Search Bar */}
//       {isLoggedIn && (
//         <div className="mb-4">
//           <input
//             type="text"
//             value={query}
//             onChange={(e) => setQuery(e.target.value)}
//             placeholder="Search tasks..."
//             className="border p-2 rounded w-full"
//             onKeyPress={(e) => e.key === "Enter" && handleSearch()}
//           />
//         </div>
//       )}

//       {/* Task List */}
//       {isLoggedIn && (
//         <div className="mb-4">
//           <h2 className="text-xl font-semibold">Task List</h2>
//           <ul className="space-y-2">
//             {tasks.map((task) => (
//               <li
//                 key={task.id}
//                 className="border p-4 rounded cursor-pointer"
//                 onClick={() => fetchTaskDetails(task.id)}
//               >
//                 <h3 className="font-bold">{task.name}</h3>
//                 <p>Creator: {task.creator.name}</p>
//                 <p>Status: {task.status}</p>
//                 <p>Priority: {task.priority}</p>
//                 <p>Progress: {task.progress}%</p>
//               </li>
//             ))}
//           </ul>
//           <div className="mt-4">
//             <button
//               onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
//               disabled={page === 1}
//               className="mr-2 p-2 bg-gray-200 rounded"
//             >
//               Previous
//             </button>
//             <button
//               onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
//               disabled={page === totalPages}
//               className="p-2 bg-gray-200 rounded"
//             >
//               Next
//             </button>
//           </div>
//         </div>
//       )}

//       {/* Task Details */}
//       {isLoggedIn && selectedTask && (
//         <div className="border p-4 rounded">
//           <h2 className="text-xl font-semibold">{selectedTask.name}</h2>
//           <p>
//             <strong>Creator:</strong> {selectedTask.creator.name}
//           </p>
//           <p>
//             <strong>Project:</strong> {selectedTask.project?.name || "N/A"}
//           </p>
//           <p>
//             <strong>Priority:</strong> {selectedTask.priority}
//           </p>
//           <p>
//             <strong>Progress:</strong> {selectedTask.progress}%
//           </p>
//           <p>
//             <strong>Due Date:</strong>{" "}
//             {new Date(selectedTask.due_date).toLocaleDateString()}
//           </p>
//           <p>
//             <strong>Assignees:</strong>{" "}
//             {selectedTask.assignees
//               .map((a) => `${a.name} (${a.pivot.role})`)
//               .join(", ")}
//           </p>
//           <p>
//             <strong>Description:</strong> {selectedTask.description || "N/A"}
//           </p>
//           <h3 className="font-semibold mt-4">Files</h3>
//           <ul>
//             {(selectedTask.file_urls || []).map((url, index) => (
//               <li key={index}>
//                 <a href={url} target="_blank" rel="noopener noreferrer">
//                   File {index + 1}
//                 </a>
//               </li>
//             ))}
//           </ul>
//           <h3 className="font-semibold mt-4">Subtasks</h3>
//           <ul>
//             {selectedTask.subtasks.map((subtask) => (
//               <li key={subtask.id}>
//                 {subtask.name} - {subtask.status}
//                 <ul>
//                   {(subtask.file_urls || []).map((url, index) => (
//                     <li key={index}>
//                       <a href={url} target="_blank" rel="noopener noreferrer">
//                         Subtask File {index + 1}
//                       </a>
//                     </li>
//                   ))}
//                 </ul>
//               </li>
//             ))}
//           </ul>
//           <h3 className="font-semibold mt-4">Checklists</h3>
//           <ul>
//             {selectedTask.checklists.map((checklist) => (
//               <li key={checklist.id}>
//                 {checklist.content} -{" "}
//                 {checklist.is_completed ? "Completed" : "Pending"}
//               </li>
//             ))}
//           </ul>
//         </div>
//       )}
//     </div>
//   );
// }

// export default App;

import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);
  const [query, setQuery] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Kiểm tra trạng thái đăng nhập
  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  const handleLogin = async () => {
    try {
      const response = await axios.post("http://localhost:8000/api/login", {
        username,
        password,
      });
      const { token } = response.data;
      if (!token) {
        throw new Error("No token received");
      }
      localStorage.setItem("token", token);
      setIsLoggedIn(true);
      setUsername("");
      setPassword("");
    } catch (error) {
      console.error("Login error:", error.response?.data || error.message);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    setTasks([]);
    setSelectedTask(null);
    setQuery("");
    setPage(1);
    setTotalPages(1);
  };

  const fetchTasks = async () => {
    if (!isLoggedIn) return;
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `http://localhost:8000/api/tasks?page=${page}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setTasks(response.data.tasks);
      setTotalPages(response.data.last_page);
    } catch (error) {
      console.error(
        "Error fetching tasks:",
        error.response?.data || error.message
      );
    }
  };

  const handleSearch = async () => {
    if (!isLoggedIn) return;
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        "http://localhost:8000/api/tasks/search",
        {
          params: { query, page }, // Thêm page vào params
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setTasks(response.data.tasks);
      setTotalPages(response.data.last_page);
      setPage(response.data.current_page); // Đồng bộ page từ response
    } catch (error) {
      console.error(
        "Error fetching search results:",
        error.response?.data || error.message
      );
    }
  };

  const fetchTaskDetails = async (id) => {
    if (!isLoggedIn) return;
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `http://localhost:8000/api/tasks/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // Parse file_urls nếu là chuỗi JSON
      const task = response.data.task;
      task.file_urls =
        typeof task.file_urls === "string"
          ? JSON.parse(task.file_urls)
          : task.file_urls || [];
      task.subtasks = task.subtasks.map((subtask) => ({
        ...subtask,
        file_urls:
          typeof subtask.file_urls === "string"
            ? JSON.parse(subtask.file_urls)
            : subtask.file_urls || [],
      }));
      setSelectedTask(task);
    } catch (error) {
      console.error(
        "Error fetching task details:",
        error.response?.data || error.message
      );
    }
  };

  useEffect(() => {
    if (query) {
      handleSearch(); // Gọi lại search khi page thay đổi
    } else {
      fetchTasks(); // Gọi fetchTasks nếu không có query
    }
  }, [page, isLoggedIn, query]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Task Management</h1>

      {/* Login Form */}
      {!isLoggedIn ? (
        <div className="mb-4 p-4 border rounded">
          <h2 className="text-xl font-semibold mb-2">Login</h2>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
            className="border p-2 rounded w-full mb-2"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="border p-2 rounded w-full mb-2"
          />
          <button
            onClick={handleLogin}
            className="bg-blue-500 text-white p-2 rounded"
          >
            Login
          </button>
        </div>
      ) : (
        <div className="mb-4">
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white p-2 rounded"
          >
            Logout
          </button>
        </div>
      )}

      {/* Search Bar */}
      {isLoggedIn && (
        <div className="mb-4">
          <input
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setPage(1); // Reset page về 1 khi thay đổi query
            }}
            placeholder="Search tasks..."
            className="border p-2 rounded w-full"
            onKeyPress={(e) => e.key === "Enter" && handleSearch()}
          />
        </div>
      )}

      {/* Task List */}
      {isLoggedIn && (
        <div className="mb-4">
          <h2 className="text-xl font-semibold">Task List</h2>
          <ul className="space-y-2">
            {tasks.map((task) => (
              <li
                key={task.id}
                className="border p-4 rounded cursor-pointer"
                onClick={() => fetchTaskDetails(task.id)}
              >
                <h3 className="font-bold">{task.name}</h3>
                <p>Creator: {task.creator.name}</p>
                <p>Status: {task.status}</p>
                <p>Priority: {task.priority}</p>
                <p>Progress: {task.progress}%</p>
              </li>
            ))}
          </ul>
          <div className="mt-4">
            <button
              onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
              disabled={page === 1}
              className="mr-2 p-2 bg-gray-200 rounded"
            >
              Previous
            </button>
            <button
              onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={page === totalPages}
              className="p-2 bg-gray-200 rounded"
            >
              Next
            </button>
          </div>
        </div>
      )}

      {/* Task Details */}
      {isLoggedIn && selectedTask && (
        <div className="border p-4 rounded">
          <h2 className="text-xl font-semibold">{selectedTask.name}</h2>
          <p>
            <strong>Creator:</strong> {selectedTask.creator.name}
          </p>
          <p>
            <strong>Project:</strong> {selectedTask.project?.name || "N/A"}
          </p>
          <p>
            <strong>Priority:</strong> {selectedTask.priority}
          </p>
          <p>
            <strong>Progress:</strong> {selectedTask.progress}%
          </p>
          <p>
            <strong>Due Date:</strong>{" "}
            {new Date(selectedTask.due_date).toLocaleDateString()}
          </p>
          <p>
            <strong>Assignees:</strong>{" "}
            {selectedTask.assignees
              .map((a) => `${a.name} (${a.pivot.role})`)
              .join(", ")}
          </p>
          <p>
            <strong>Description:</strong> {selectedTask.description || "N/A"}
          </p>
          <h3 className="font-semibold mt-4">Files</h3>
          <ul>
            {selectedTask.file_urls.map((url, index) => (
              <li key={index}>
                <a href={url} target="_blank" rel="noopener noreferrer">
                  File {index + 1}
                </a>
              </li>
            ))}
          </ul>
          <h3 className="font-semibold mt-4">Subtasks</h3>
          <ul>
            {selectedTask.subtasks.map((subtask) => (
              <li key={subtask.id}>
                {subtask.name} - {subtask.status}
                <ul>
                  {subtask.file_urls.map((url, index) => (
                    <li key={index}>
                      <a href={url} target="_blank" rel="noopener noreferrer">
                        Subtask File {index + 1}
                      </a>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
          <h3 className="font-semibold mt-4">Checklists</h3>
          <ul>
            {selectedTask.checklists.map((checklist) => (
              <li key={checklist.id}>
                {checklist.content} -{" "}
                {checklist.is_completed ? "Completed" : "Pending"}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;
