import React, { useEffect, useState } from "react";
import { uid } from "uid";
import "./TodoList.css";
import { onValue, ref, remove, update, set } from "firebase/database";
import { db, auth } from "../../firebase";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { MdModeEditOutline } from "react-icons/md";
import { ImCheckboxChecked, ImCheckboxUnchecked } from "react-icons/im";

const TodoList = () => {
  const [item, setItem] = useState<string>("");
  const [items, setItems] = useState<any>([]);
  const [tempUid, setTempUid] = useState<string>("");
  const [isEditing, setIsEditing] = useState<boolean>(false);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        onValue(ref(db, `/${auth.currentUser?.uid}`), (snapshot) => {
          setItems([]);
          const data = snapshot.val();
          if (data !== null) {
            Object.values(data).map((item) => {
              setItems((prevState) => [...prevState, item]);
            });
          }
        });
      }
    });
  }, []);

  const addItem = () => {
    const uidd = uid();
    if (item === "") return;
    set(ref(db, `/${auth.currentUser?.uid}/${uidd}`), {
      todo: item,
      uidd: uidd,
      completed: false,
    });
    // setItems((prevState) => [...prevState, item]);
    setItem("");
  };

  const editItem = (item) => {
    setIsEditing(true);
    setItem(item.todo);
    setTempUid(item.uidd);
  };

  const deleteItem = (uid) => {
    remove(ref(db, `/${auth.currentUser?.uid}/${uid}`));
  };

  const confirmEditItem = () => {
    update(ref(db, `/${auth.currentUser?.uid}/${tempUid}`), {
      todo: item,
      uidd: tempUid,
      completed: false,
    });
    setIsEditing(false);
    setItem("");
  };

  const completeItem = (uid) => {
    update(ref(db, `/${auth.currentUser?.uid}/${uid}`), {
      completed: true,
    });
  };

  const unCompleteItem = (uid) => {
    update(ref(db, `/${auth.currentUser?.uid}/${uid}`), {
      completed: false,
    });
  };

  return (
    <div className="listContainer">
      <div>
        <div className="listInput">
          <input
            className="inputItem"
            type="text"
            placeholder="Add todo ..."
            value={item}
            onChange={(e) => setItem(e.target.value)}
          />
          {isEditing ? (
            <button className="inputButton" onClick={confirmEditItem}>
              CONFIRM
            </button>
          ) : (
            <button className="inputButton" onClick={addItem}>
              ADD
            </button>
          )}
        </div>
        {items.length ? (
          <ul className="listItems">
            {items.map((item, index) => (
              <li
                className={item.completed ? "listItemCompleted" : "listItem"}
                key={index}
              >
                <div className="todoElement">
                  {item.completed ? (
                    <ImCheckboxChecked
                      style={{ alignSelf: "center", paddingLeft: "20px" }}
                      onClick={() => unCompleteItem(item.uidd)}
                    />
                  ) : (
                    <ImCheckboxUnchecked
                      style={{ alignSelf: "center", paddingLeft: "20px" }}
                      onClick={() => completeItem(item.uidd)}
                    />
                  )}
                  <p className="item">{item.todo}</p>
                </div>
                <div className="buttons">
                  <MdModeEditOutline
                    onClick={() => editItem(item)}
                    size="25px"
                    style={{ cursor: "pointer", paddingRight: "20px" }}
                  />
                  <RiDeleteBin6Fill
                    onClick={() => deleteItem(item.uidd)}
                    size="25px"
                    color="red"
                    style={{ cursor: "pointer" }}
                  />
                </div>
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </div>
  );
};

export default TodoList;
