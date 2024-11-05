import { useState, useEffect } from "react";
import { supabase } from "./client";
import { Link } from "react-router-dom";

const Gallery = () => {
  const [guardians, setGuardians] = useState([]);
  const [guardianId, setGuardianId] = useState(null);
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [classType, setClassType] = useState("");
  const [comment, setComment] = useState("");

  useEffect(() => {
    getGuardians();
  }, []);

  async function getGuardians() {
    try {
      const { data, error } = await supabase.from("guardians").select("*");

      if (error) throw error;
      if (data != null) {
        setGuardians(data);
      }
    } catch (error) {
      alert(error.message);
    }
  }

  async function updateGuardian(guardianId) {
    try {
      const { data, error } = await supabase
        .from("guardians")
        .update({
          name: name,
          location: location,
          class: classType,
          comment: comment,
        })
        .eq("id", guardianId); // Ensure only the specific guardian is updated

      if (error) throw error;
      setGuardianId(null); // Exit edit mode after updating
      getGuardians(); // Refresh the list
    } catch (error) {
      alert(error.message);
    }
  }

  async function deleteGuardian(guardianId) {
    try {
      const { data, error } = await supabase
        .from("guardians")
        .delete()
        .eq("id", guardianId); // Ensure only the specific guardian is deleted

      if (error) throw error;
      getGuardians(); // Refresh the list
    } catch (error) {
      alert(error.message);
    }
  }

  return (
    <div>
      <h1>Gallery</h1>

      <div className="gallery">
        {guardians.map((guardian) => (
          <div key={guardian.id} className="guardian-card">
            {guardianId === guardian.id ? (
              <div>
                <form>
                  <div>
                    <label htmlFor="name">Username:</label>
                    <input
                      type="text"
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>

                  <div>
                    <label htmlFor="Location">Location:</label>
                    <input
                      type="text"
                      id="location"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                    />
                  </div>

                  <div>
                    <label htmlFor="class">Class:</label>
                    <select
                      id="class"
                      name="class"
                      value={classType}
                      onChange={(e) => setClassType(e.target.value)}
                    >
                      <option value="Titan">Titan</option>
                      <option value="Hunter">Hunter</option>
                      <option value="Warlock">Warlock</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="Comments"> Comments </label>
                    <textarea
                      id="comments"
                      name="comments"
                      rows="4"
                      cols="50"
                      onChange={(e) => setComment(e.target.value)}
                    >
                      {" "}
                    </textarea>
                  </div>
                </form>
                <button
                  className="update-button"
                  onClick={() => updateGuardian(guardian.id)}
                >
                  {" "}
                  Update Guardian{" "}
                </button>
                <button onClick={() => setGuardianId(null)}>Cancel</button>
              </div>
            ) : (
              <>
                <Link
                  className="guardian-button"
                  to={`/guardian/${guardian.id}`}
                >
                  <h2>{guardian.name}</h2>
                  <p>Location: {guardian.location}</p>
                  <p>Class: {guardian.class}</p>
                  <i> Comment: {guardian.comment} </i>
                  <div className="e-d"></div>
                </Link>
                <button
                  onClick={() => {
                    setGuardianId(guardian.id);
                    setName(guardian.name);
                    setLocation(guardian.location);
                    setClassType(guardian.class);
                  }}
                >
                  {" "}
                  Edit Guardian{" "}
                </button>
                <button onClick={() => deleteGuardian(guardian.id)}>
                  {" "}
                  Delete Guardian{" "}
                </button>
              </>
            )}
          </div>
        ))}
      </div>

       <Link to="/" className="home-button">Back to Home</Link>
    </div>
  );
};

export default Gallery;
