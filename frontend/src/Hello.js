import React, { useEffect, useState } from "react";

function Hello() {

  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("http://127.0.0.1:8000/hello/udhayavanan")
      .then((res) => res.json())
      .then((data) => setMessage(data.message))
      .catch((err) => setMessage("Error fetching message"));
  }, []);

  return (
    <h2>{message}</h2>
  );
}

export default Hello;