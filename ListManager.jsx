import { useState, useEffect } from "react";
import axios from "axios";
import "./listmanager.css";

const ListManager = () => {
  const [list1, setList1] = useState([]);
  const [list2, setList2] = useState([]);
  const [list3, setList3] = useState([]);
  const [isError, setIsError] = useState("");
  const [isList3Visible, setIsList3Visible] = useState(false);

  const getMyPostData = async () => {
    try {
      const res = await axios.get("https://apis.ccbp.in/list-creation/lists");
      const { lists } = res.data;

      if (Array.isArray(lists)) {
        const filteredList1 = lists.filter((item) => item.list_number === 1);
        const filteredList2 = lists.filter((item) => item.list_number === 2);

        setList1(filteredList1);
        setList2(filteredList2);
        setList3([]);
      } else {
        throw new Error("Unexpected data format");
      }
    } catch (error) {
      setIsError(error.message);
    }
  };

  useEffect(() => {
    getMyPostData();
  }, []);

  const moveToList1 = (item) => {
    if (!list1.some((listItem) => listItem.id === item.id)) {
      const newList1 = [...list1, item];
      const newList3 = list3.filter((listItem) => listItem.id !== item.id);
      setList1(newList1);
      setList3(newList3);
    }
  };

  const moveToList2 = (item) => {
    if (!list2.some((listItem) => listItem.id === item.id)) {
      const newList2 = [...list2, item];
      const newList3 = list3.filter((listItem) => listItem.id !== item.id);
      setList2(newList2);
      setList3(newList3);
    }
  };

  const moveToList3 = (item, fromList) => {
    if (!list3.some((listItem) => listItem.id === item.id)) {
      const newList3 = [...list3, item];
      if (fromList === "list1") {
        const newList1 = list1.filter((listItem) => listItem.id !== item.id);
        setList1(newList1);
      } else if (fromList === "list2") {
        const newList2 = list2.filter((listItem) => listItem.id !== item.id);
        setList2(newList2);
      }
      setList3(newList3);
    }
  };

  const handleCreateNewList = () => {
    const list1Checkbox = document.getElementById("list1-checkbox").checked;
    const list2Checkbox = document.getElementById("list2-checkbox").checked;

    if (list1Checkbox && list2Checkbox) {
      setIsList3Visible(true);
    } else {
      alert("Please select all checkboxes to create a new list!");
    }
  };

  return (
    <div className="app-container">
      <button
        className="create-button"
        style={{
          margin: "1cm auto",
          padding: "15px 30px",
          backgroundColor: "blue",
          color: "white",
          fontSize: "18px",
          borderRadius: "20px",
          border: "none",
          cursor: "pointer",
          display: "block",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          transition: "transform 0.2s, box-shadow 0.2s",
        }}
        onMouseEnter={(e) => {
          e.target.style.transform = "scale(1.05)";
          e.target.style.boxShadow = "0 6px 10px rgba(0, 0, 0, 0.15)";
        }}
        onMouseLeave={(e) => {
          e.target.style.transform = "scale(1)";
          e.target.style.boxShadow = "0 4px 6px rgba(0, 0, 0, 0.1)";
        }}
        onClick={handleCreateNewList}
      >
        Create New List
      </button>

      {isError && <h2>Error: {isError}</h2>}

      <div className="main-container">
        <div
          id="main"
          style={{ display: "flex", justifyContent: "space-evenly", gap: "20px" }}
        >
          {/* List 1 */}
          <div className="list-container">
            <div className="list-header">
              <input type="checkbox" id="list1-checkbox" />
              <label htmlFor="list1-checkbox">List 1</label>
            </div>
            {list1.length > 0 ? (
              <ul className="scrollable-list">
                {list1.map(({ id, name, description }) => (
                  <li key={id} className="list-item">
                    <strong>{name}</strong>: {description}
                    {isList3Visible && (
                      <button
                        className="arrow"
                        onClick={() =>
                          moveToList3({ id, name, description }, "list1")
                        }
                      >
                        ➡️
                      </button>
                    )}
                  </li>
                ))}
              </ul>
            ) : (
              <p>No items found in List 1.</p>
            )}
          </div>

          {/* List 3 */}
          {isList3Visible && (
            <div className="list-container">
              <div className="list-header">
                <input type="checkbox" id="list3-checkbox" />
                <label htmlFor="list3-checkbox">List 3</label>
              </div>
              <ul className="scrollable-list">
                {list3.map((item) => {
                  if (!item) return null;

                  const { id, name, description } = item;
                  return (
                    <li key={id}>
                      <button onClick={() => moveToList1(item)}>⬅️</button>
                      <span>
                        <strong>{name}</strong>: {description}
                      </span>
                      <button onClick={() => moveToList2(item)}>➡️</button>
                    </li>
                  );
                })}
              </ul>
            </div>
          )}

          {/* List 2 */}
          <div className="list-container">
            <div className="list-header">
              <input type="checkbox" id="list2-checkbox" />
              <label htmlFor="list2-checkbox">List 2</label>
            </div>
            {list2.length > 0 ? (
              <ul className="scrollable-list">
                {list2.map(({ id, name, description }) => (
                  <li key={id} className="list-item">
                    <strong>{name}</strong>: {description}
                    {isList3Visible && (
                      <button
                        className="arrow22"
                        onClick={() =>
                          moveToList3({ id, name, description }, "list2")
                        }
                      >
                        ⬅️
                      </button>
                    )}
                  </li>
                ))}
              </ul>
            ) : (
              <p>No items found in List 2.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListManager;
