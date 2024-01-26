import { CrossCircledIcon } from "@radix-ui/react-icons";
import { Link, useNavigate } from "react-router-dom";

const UserProfile = ({
  user,
  setShowAuth,
  setIsEditingProfile,
  showViewedUser,
  setShowViewedUser,
}) => {
  const navigate = useNavigate();

  let currentDate = new Date();
  let dateOfBirth = new Date(
    user.dob_year + "-" + user.dob_month + "-" + user.dob_day
  );
  let difference = Math.abs(currentDate - dateOfBirth);
  let result = Math.round(difference / (1000 * 3600 * 24 * 365));

  function handleClick() {
    setIsEditingProfile(true);
    setShowAuth(false);
    navigate("/onboarding");
  }

  return (
    <div className="absolute w-[400px] h-[600px] top-[100px] bg-[#0c0a09] rounded-md border flex flex-col p-5 gap-y-2">
      {showViewedUser ? (
        <button
          className="hover:text-black"
          onClick={() => setShowViewedUser(false)}
        >
          <CrossCircledIcon className="text-right h-6 w-6" />
        </button>
      ) : (
        <Link id="me-close-icon" className="text-right" href="/dashboard">
          Back to Dashboard →
        </Link>
      )}
      <div
        style={{ backgroundImage: "url(" + user.image_url + ")" }}
        className="bg-cover bg-center h-[600px]"
      />
      <div className="flex justify-between my-1.5">
        <div className="name-age">
          <h2>{user.firstname}, </h2>
          <h2>{result}</h2>
        </div>
        {!showViewedUser && <button onClick={handleClick}>Edit Profile</button>}
      </div>
      {user.show_gender && (
        <p id="p1">Gender Identity: {user.gender_identity}</p>
      )}
      {user.show_sexual_orientation && (
        <p id="p2">Sexual Orientation: {user.sexual_orientation}</p>
      )}
      <p id="p3">Gender Interest: {user.gender_interest}</p>
      <p id="p4">{user.bio}</p>
    </div>
  );
};
export default UserProfile;
