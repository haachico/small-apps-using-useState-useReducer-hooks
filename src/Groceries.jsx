import { useState } from "react";

const Groceries = () => {
  const [list, setList] = useState([]);
  const [item, setItem] = useState("");

  const [completedList, setCompletedList] = useState([]);

  const handleAddItem = () => {
    if (!item) return;

    setList((prevList) => [...prevList, item]);
    setItem("");
  };

  const handleCheck = (e) => {
    const checkedItem = e.target.value;
    const isChecked = e.target.checked;

    if (isChecked) {
      setCompletedList((prevState) => [...prevState, checkedItem]);
    } else {
      setCompletedList(completedList.filter((e) => e !== checkedItem));
    }
  };
  return (
    <div>
      <h1>Groceries list</h1>
      <label htmlFor="item">Add an item : </label>
      <input id="id" value={item} onChange={(e) => setItem(e.target.value)} />
      <button onClick={() => handleAddItem(item)}>Add</button>
      <ol style={{ textAlign: "left" }}>
        {list.map((item, i) => (
          <li key={i}>
            <input
              type="checkbox"
              value={item}
              onChange={(e) => handleCheck(e)}
            />
            {item}
          </li>
        ))}
      </ol>
      <h1>Completed List</h1>
      <ol style={{ textAlign: "left" }}>
        {completedList?.map((e) => (
          <li key={e}>{e}</li>
        ))}
      </ol>
    </div>
  );
};

export default Groceries;
