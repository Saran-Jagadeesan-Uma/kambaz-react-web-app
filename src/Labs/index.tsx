import { Routes, Route } from "react-router";
import Lab1 from "./Lab1";
import Lab2 from "./Lab2";
import TOC from "./TOC";
import Lab3 from "./Lab3";

export default function Labs() {
  return (
    <div>
      <h1>Saran Jagadeesan Uma</h1>
      <h1>Labs</h1>
      <TOC />
      <Routes>
        <Route path="Lab1" element={<Lab1 />} />
        <Route path="Lab2" element={<Lab2 />} />
        <Route path="Lab3" element={<Lab3/>} />
      </Routes>
    </div>
  );
}