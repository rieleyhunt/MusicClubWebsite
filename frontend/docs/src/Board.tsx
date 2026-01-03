// Board.tsx
import React, { useState, useEffect } from "react";
import TopBar from "./TopBar";
import Footer from "./Footer";
import "./Board.css";
import { authFetch } from "./authFetch";
import { useAuth  } from "./AuthContext";

type Exec = {
  _id?: string;
  img: string;
  name: string;
  role: string;
};

interface BoardProps {
  API: string
}

const Board: React.FC<BoardProps> = ({ API }) => {
  const [execs, setExecs] = useState<Exec[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [name, setNewName] = useState("");
  const [role, setNewRole] = useState("");
  const [execImageUrl, setExecImageUrl] = useState("");

  const { logout, isLoggedIn } = useAuth();

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const file = files[0];

    const formData = new FormData();
    formData.append("file", file);

    const res = await authFetch(
        `${API}/upload`,
      {
        method: "POST",
        body: formData
      },
      logout,
    );

    const data = await res.json();

    if (data.url) {
      setExecImageUrl(data.url);
      console.log("Uploaded image URL:", data.url);
    }
  };
  
  async function saveExec() {
    console.log(name, role, execImageUrl);
    if (!name || !role || !execImageUrl) {
      alert("Fill all fields and upload an image first!");
      return;
    }

    const body = {
      name: name,
      role: role,
      img: execImageUrl
    };
    
    try {
      const res = await authFetch(
        `${API}/execs`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body)
        },
        logout,
      );

      if (!res.ok) {
        alert("Error saving executive");
        return;
      }

      const savedExec = await res.json();

      // Add to UI
      setExecs((prev) => [...prev, savedExec]);

      // Close modal & clear form
      setShowModal(false);
      setNewName("");
      setNewRole("");
      setExecImageUrl("");
    } catch(err) {
      console.error(err);
    }
  }

  async function handleDeleteExec(execName: string) {

    try {
      const res = await authFetch(
          `${API}/execs`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: execName,
          }),
        },
        logout
      );

      if (res.ok) {
        console.log("backend responded, with execName", execName);
      }
      if (!res.ok) {
        console.error(`Failed to delete exec ${execName}`);
      }
    } catch(err) {
      console.error(err);
    }
  } 

  useEffect(() => {
    const fetchExecs = async () => {
      try {
        const response = await fetch(`${API}/execs`);
        if (response.ok) {
          const data = await response.json();
          setExecs(data);
        } else {
          console.error('Failed to fetch execs:', response.status);
        }
      } catch (error) {
        console.error('Error fetching execs:', error);
      }
    };

    fetchExecs();
  }, [API]);

  return (
    <>
      <div className="app-container">
        {/*Add the nav bar*/}
        <TopBar />

        {/* Main page */}
        <div className="board-page">
          <div className="board-content">
            <h1>Executive Board</h1>
            <div className="board-grid">
              {execs.map((exec) => (
                <div key={exec._id || exec.name} className="exec">
                  {isLoggedIn && (
                    <div className="exec-delete">
                      <button className="exec-delete-button" onClick={() => handleDeleteExec(exec.name)}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#f00c0c" className="size-6">
                          <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-1.72 6.97a.75.75 0 1 0-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 1 0 1.06 1.06L12 13.06l1.72 1.72a.75.75 0 1 0 1.06-1.06L13.06 12l1.72-1.72a.75.75 0 1 0-1.06-1.06L12 10.94l-1.72-1.72Z" clipRule="evenodd" />
                        </svg>
                      </button>
                    </div>
                  )}
                  <div 
                    className="exec-photo"
                    style={{
                      backgroundImage: `url(${exec.img || '/profilephoto.jpg'})`
                    }}
                  ></div>
                  <div className="exec-text">
                    <div className="exec-name"><h1>{exec.name}</h1></div>
                    <div className="exec-role"><h2>{exec.role}</h2></div>
                  </div>
                </div>
                ))}
            </div>
            {isLoggedIn && (
              <button
                className="add-event-button"
                onClick={() => setShowModal(true)}
              >
                Add Exec
              </button>
            )}
            {showModal && (
              <div className="modal-backdrop">
                <div className="modal">
                  <h2 className="add-executive">Add Executive</h2>
                  <input
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setNewName(e.target.value)}
                  />
                  <input
                    placeholder="Role"
                    value={role}
                    onChange={(e) => setNewRole(e.target.value)}
                  />
                  <input type="file" accept="image/*" onChange={handleFileChange} />
                <div className="modal-buttons">
                  <button onClick={() => setShowModal(false)}>Cancel</button>
                  <button onClick={saveExec}>Save</button>
                </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Board;