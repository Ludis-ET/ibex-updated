import { Route, Routes } from "react-router-dom"
import { Home } from "../pages"

export const Main = () => {
  return (
    <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/contact" element={<Contact />} /> */}
    </Routes>
  )
}
