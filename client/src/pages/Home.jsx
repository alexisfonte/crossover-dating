import { useState } from "react";
import NavBar from "../components/NavBar";
import { cn } from "../lib/utils";
import { useNavigate } from "react-router-dom";
import AuthForm from "../components/AuthForm";

const Home = ({ user, setUser, showAuth, setShowAuth }) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const navigate = useNavigate();

  function onCreateAccount() {
    setIsSignUp(true);
    setShowAuth(true);
  }

  return (
    <>
      <div
        className={cn(showAuth ? "bg-black h-screen opacity-[50%] z-[1]" : "")}
      >
        <NavBar
          user={user}
          setUser={setUser}
          showAuth={showAuth}
          setShowAuth={setShowAuth}
          setIsSignUp={setIsSignUp}
        />
        <div className="overflow-hidden pt-14">
          <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
            <div className="hidden sm:mb-8 sm:flex sm:justify-center">
              <div className="relative rounded-full px-3 py-1 text-base leading-6 ring-1 ring-white/10 hover:ring-white/20">
                Create your own crossover episode.
              </div>
            </div>
            <div className="text-center">
              <h1 className="text-4xl font-bold sm:text-6xl">Swipe Right</h1>
              <p className="mt-6 text-base leading-8 text-gray-300">
                Match and chat with your favorite cartoon characters from the
                90's!
              </p>
              <div className="mt-10 flex items-center justify-center gap-x-6">
                <button
                  onClick={
                    user.id ? () => navigate("/dashboard") : onCreateAccount
                  }
                  className="rounded-md bg-[#f7f907] px-3.5 py-2.5 text-sm font-semibold text-black shadow-sm border-2 border-[#f7f907]  hover:border-[#20abc6] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-400"
                >
                  {user.id
                    ? `Welcome Back, ${user.firstname}`
                    : "Create Account"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {showAuth && (
        <AuthForm
          setShowAuth={setShowAuth}
          isSignUp={isSignUp}
          setUser={setUser}
          setIsSignUp={setIsSignUp}
        />
      )}
    </>
  );
};
export default Home;
