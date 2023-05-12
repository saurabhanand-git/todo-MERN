import React, { useState , useEffect} from "react";
import "./App.css";

function App() {
  const [names, setNames] = useState([]);

  const [userName, setUserName] = useState("");

  useEffect(() => {
    async function fetchNames() {
      const response = await fetch('http://localhost:3000/');
      const data = await response.json();
      setNames(data);
    }

    fetchNames();
  },[names]);



  const handleInputChange = (event) => {
    setUserName(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // send the entered data to the server
    fetch("http://localhost:3000/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: userName }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        console.log("Name saved successfully!");
      })
      .catch((error) => {
        console.error("Error saving name:", error);
      });

    // clear the input field
    setUserName("");
  };



  async function handleDelete(id) {
    await fetch(`http://localhost:3000/delete/${id}`, { method: 'POST' });
    setNames(names.filter(name => name._id !== id));
  }

  return (
    <div className="App">
      <h1>Welcome</h1>
      <form method="POST" onSubmit={handleSubmit}>
        <input
          type="text"
          name="userName"
          id="userName"
          value={userName}
          placeholder="Enter your ToDo Item"
          onChange={handleInputChange}
        />
        <button type="submit">Submit</button>
      </form>

      <div>
      <h1>Your ToDo List:</h1>
      <ul>
        {names.map(name => (
          <li key={name._id}>
            {name.name}{' '}
            <button onClick={() => handleDelete(name._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
    </div>
  );
}

export default App;
