import { LuCrown } from "react-icons/lu";
import './Logo.css'

function Logo() {
  return (
    <div className="logo">
      <LuCrown className="logoImg"/>
      <span className="logoName">Heirbnb</span>
    </div>
  )
}

export default Logo;