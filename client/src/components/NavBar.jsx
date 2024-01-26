import { Link, useNavigate } from "react-router-dom";
import logo from "../styles/images/Crossover-Large.png";

const NavBar = ({ user, setUser, showAuth, setShowAuth, setIsSignUp }) => {
  const navigate = useNavigate();

  function handleLogin() {
    setIsSignUp(false);
    setShowAuth(true);
  }

  function handleLogout() {
    fetch("/api/logout", {
      method: "DELETE",
    }).then(() => {
      setUser({});
      navigate("/");
    });
  }

  return (
    <>
      <header className="absolute inset-x-0 top-0 z-50 bg-black">
        <nav className="flex items-center justify-between p-3 lg:px-8">
          <div className="flex lg:flex-1">
            <Link href="/" className="-m-1.5 p-1.5">
              <span className="sr-only">Crossover Dating App</span>
              <img src={logo} alt="Crossover Logo" className="h-8 w-auto" />
            </Link>
          </div>
          <div className="flex flex-1 justify-end font-bold">
            {user.id ? (
              <button disabled={showAuth} onClick={handleLogout} className="border-b border-transparent hover:border-b-[#fe3d3b] tracking-wide">
                Logout
              </button>
            ) : (
              <button disabled={showAuth} onClick={handleLogin} className="border-b border-transparent hover:border-b-[#fe3d3b] hover:text-[#20abc6] tracking-wide">
                Log in
              </button>
            )}
          </div>
        </nav>
      </header>
    </>
  );
};
export default NavBar;
