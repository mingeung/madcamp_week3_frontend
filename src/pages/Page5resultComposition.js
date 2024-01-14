import React, { useState } from "react";
import "./Page5resultComposition.css";

export default function Page5resultComposition() {
  const [loading, setLoading] = useState(true);
  return (
    <div className="container">
      {loading ? <h1>Loading...</h1> : <div>결과!</div>}
    </div>
  );
}
