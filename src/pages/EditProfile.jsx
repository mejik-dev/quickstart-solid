import { createSignal, createEffect } from "solid-js";
import { useNavigate } from "@solidjs/router";
import { microgen } from "../lib/microgen";

const EditProfile = () => {
  const navigate = useNavigate();
  const [firstName, setFirstName] = createSignal("");
  const [lastName, setLastName] = createSignal("");
  const [phoneNumber, setPhoneNumber] = createSignal("");
  const [username, setUsername] = createSignal("");
  const [profileId, setProfileId] = createSignal("");
  const [image, setImage] = createSignal("");
  const [company, setCompany] = createSignal("");
  const [position, setPosition] = createSignal("");
  const [location, setLocation] = createSignal("");
  const [website, setWebsite] = createSignal("");
  const [loading, setLoading] = createSignal(false);

  createEffect(() => {
    (async () => {
      const { user, error } = await microgen.auth.user({
        lookup: "*",
      });

      if (error) {
        console.log(error);
        return;
      }

      const profile = user?.profile?.[0];

      setFirstName(user?.firstName);
      setLastName(user?.lastName);
      setPhoneNumber(user?.phoneNumber);
      setUsername(user?.username);
      setProfileId(profile?._id);
      setImage(profile?.image);
      setCompany(profile?.company);
      setLocation(profile?.location);
      setPosition(profile?.position);
      setWebsite(profile?.website);
    })();
  }, []);

  const handleViewProfile = () => {
    navigate(`/${username()}`);
  };

  const handleLogout = async () => {
    const { error } = await microgen.auth.logout();

    if (error) {
      console.log(error);
      return;
    }

    navigate("/");
  };

  const handleChangeImage = async (e) => {
    setLoading(true);

    const file = e.target.files[0];
    const { data, error: uploadError } = await microgen.storage.upload(file);
    const { error: updateError } = await microgen
      .service("profile")
      .updateById(profileId(), {
        image: data?.url,
      });

    if (uploadError || updateError) {
      alert("Failed to change image profile");
      return;
    }

    setImage(data?.url);
    setLoading(false);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    const { error: userError } = await microgen.auth.update({
      firstName: firstName(),
      lastName: lastName(),
      phoneNumber: phoneNumber(),
    });
    const { error: profileError } = await microgen
      .service("profile")
      .updateById(profileId(), {
        company: company(),
        location: location(),
        position: position(),
        website: website(),
      });

    if (userError || profileError) {
      alert("Failed to update profile");
    } else {
      alert("Profile updated!");
    }
  };

  return (
    <div className="profile-page">
      <div className="button-top">
        <button onClick={handleViewProfile}>View Profile</button>
        <button onClick={handleLogout}>Logout</button>
      </div>
      <div className="profile-wrapper">
        <div className="profile-header">
          <label className="label-file" htmlFor="file">
            <img
              className="image-avatar"
              width={90}
              height={90}
              src={image() ? image() : "https://via.placeholder.com/90"}
              alt="image-profile"
            />
            <span>{loading() ? "Uploading..." : "Change Image"}</span>
          </label>
          <input onChange={handleChangeImage} id="file" type="file" />
        </div>
        <div className="card">
          <form onSubmit={handleUpdate}>
            <div className="card-field">
              <label>First Name</label>
              <input
                type="text"
                value={firstName()}
                onChange={(e) => setFirstName(e.target.value) || ""}
              />
            </div>
            <div className="card-field">
              <label>Last Name</label>
              <input
                type="text"
                value={lastName()}
                onChange={(e) => setLastName(e.target.value) || ""}
              />
            </div>
            <div className="card-field">
              <label>Phone Number</label>
              <input
                type="text"
                value={phoneNumber() || ""}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </div>
            <div className="card-field">
              <label>Company</label>
              <input
                type="text"
                value={company() || ""}
                onChange={(e) => setCompany(e.target.value)}
              />
            </div>
            <div className="card-field">
              <label>Position</label>
              <input
                type="text"
                value={position() || ""}
                onChange={(e) => setPosition(e.target.value)}
              />
            </div>
            <div className="card-field">
              <label>Location</label>
              <input
                type="text"
                value={location() || ""}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>

            <div className="card-field">
              <label>Website</label>
              <input
                type="url"
                value={website() || ""}
                onChange={(e) => setWebsite(e.target.value)}
              />
            </div>
            <div className="form-button">
              <button type="submit" className="button button-primary">
                Update
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
