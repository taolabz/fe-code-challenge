import { Route, Routes } from "react-router-dom";
import Country from "../pages/Country";
import CountryDetail from "../pages/Country/Detail";

function IndexRoutes() {
  return (
    <Routes>
      <Route path="/:id" element={<CountryDetail />}></Route>
      <Route path="/" element={<Country />}></Route>
    </Routes>
  );
}

export default IndexRoutes;
