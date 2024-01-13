import React, { useState } from "react";

export default function Page5resultComposition() {
  const [loading, setLoading] = useState(true);
  return (
    <div style={{ marginLeft: "500px" }}>
      {loading ? <h1>Loading...</h1> : <div>결과!</div>}
    </div>
  );
}
