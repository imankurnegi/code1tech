import React, { useEffect, useState } from "react";

function App() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5000/api/homepage", {
      method: "GET",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        // Agar API auth ya token chahiye to Authorization header add karo
        // "Authorization": "Bearer YOUR_TOKEN",
      }
    })
      .then(res => res.json())
      .then(result => setData('hhhh'))
      .catch(err => console.log("Fetch error:", err));
  }, []);

  return (
    <div>
      <h1>WordPress API Data:</h1>
      <pre>{data ? JSON.stringify(data, null, 2) : "Loading..."}</pre>
    </div>
  );
}

export default App;
