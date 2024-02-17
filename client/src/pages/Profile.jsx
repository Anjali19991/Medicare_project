import{ useState, useEffect } from "react";
import { useAuth } from "../AuthContext";
import { PiUserCircleLight } from "react-icons/pi";

export const Profile = () => {
  const { user, token, setUser } = useAuth();
  console.log(user);
  console.log(token);
  const [photoUrl, setPhotoUrl] = useState("");

  const [newUser, setNewUser] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
    gender: user?.gender || "",
    bloodType: user?.bloodType || "",
  });

  useEffect(() => {
    const fetchPhoto = async () => {
      try {
        if (user && user.photo) {
          const imageData = new Uint8Array(user.photo.data.data);
          const blob = new Blob([imageData], { type: user.photo.contentType });

          const reader = new FileReader();

          reader.onload = () => {
            const base64Image = reader.result;
            // Ensure photoUrl is different before updating to avoid infinite loop
            if (base64Image !== photoUrl) {
              setPhotoUrl(base64Image);
              console.log(base64Image);
            }
          };

          reader.readAsDataURL(blob);
        }
      } catch (error) {
        console.error("Error fetching photo:", error);
      }
    };

    fetchPhoto();

    setNewUser({
      name: user?.name || "",
      email: user?.email || "",
      phone: user?.phone || "",
      gender: user?.gender || "",
      bloodType: user?.bloodType || "",
    });
  }, [user, token]);

  const handleInputChange = (e) => {
    const value = e.target.value;
    const name = e.target.name;
    setNewUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdateProfile = async () => {
    try {
      const response = await fetch("http://localhost:3000/user/updateprofile", {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
          "Content-type": "application/json",
        },
        body: JSON.stringify({ newUser }),
      });
      console.log(response);
      const data = await response.json();
      console.log(data);
      if (response.ok) {
        setUser((prevUser) => ({ ...prevUser, ...newUser }));
        alert("Updated User");
      } else {
        console.log("User Update Failed");
      }
      alert("Updated User");
    } catch (error) {
      console.log(error);
      console.log("User Update Failed");
    }
  };

  return (
    <div>
      <h1 className="text-center mt-4 text-3xl font-semibold">User Profile</h1>
      {user ? (
        <div className="mt-8 w-[75vw] min-h-[75vh] flex justify-center items-center">
          <div className="p-4 sm:w-[480px] w-full flex items-center flex-col gap-4 shadow-2xl">
            <span className="text-5xl mx-auto">
              {photoUrl ? (
                <img
                  src={photoUrl}
                  className="rounded-full w-24 h-24"
                  alt="profile-pic"
                />
              ) : (
                <PiUserCircleLight className="w-24 h-24" />
              )}
            </span>
            <div className="flex gap-4 items-center">
              <label htmlFor="name" className="text-lg">
                Username:
              </label>
              <input
                type="text"
                name="name"
                value={newUser.name}
                className="p-2 border-2 w-64"
                onChange={(e) => handleInputChange(e)}
              />
            </div>
            <div className="flex gap-[3.35rem] items-center">
              <label htmlFor="email" className="text-lg">
                Email:
              </label>
              <input
                type="text"
                name="email"
                value={newUser.email}
                className="p-2 border-2 w-64"
                onChange={(e) => handleInputChange(e)}
              />
            </div>
           
            <div className="flex gap-[2.9rem] items-center">
              <label htmlFor="phone" className="text-lg ">
                Phone:
              </label>
              <input
                type="text"
                name="phone"
                value={user.phone ? user.phone : newUser.phone}
                placeholder="Enter Your Phone Number"
                className="p-2 border-2 w-64"
                onChange={(e) => handleInputChange(e)}
              />
            </div>
            <div className="flex gap-[2.5rem] items-center">
              <label htmlFor="gender" className="text-lg">
                Gender:
              </label>
              <select
                name="gender"
                value={user.gender ? user.gender : newUser.gender}
                className="p-2 border-2 w-64"
                onChange={(e) => handleInputChange(e)}
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div className="flex gap-[3.3rem] items-center">
              <label htmlFor="bloodType" className="text-lg">
                Blood:
              </label>
              <select
                name="bloodType"
                value={user.bloodType ? user.bloodType : newUser.bloodType}
                className="p-2 border-2 w-64"
                onChange={(e) => handleInputChange(e)}
              >
                <option value="">Select Blood Group</option>
                <option value="A+">A+</option>
                <option value="A-">A-</option>
                <option value="B+">B+</option>
                <option value="B-">B-</option>
                <option value="AB+">AB+</option>
                <option value="AB-">AB-</option>
                <option value="O+">O+</option>
                <option value="O-">O-</option>
              </select>
            </div>
            <button
              className="my-4 bg-teal-500 text-white px-4 py-2 rounded-md"
              onClick={handleUpdateProfile}
            >
              Update Details
            </button>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};
