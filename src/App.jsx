import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        {/* /booking/:trainId — буде додано в Лаб. 10 */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
