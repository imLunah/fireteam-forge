import { supabase } from "./client";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const GuardianCard = () => {
  const { id } = useParams();
  const [guardian, setGuardian] = useState(null);

  useEffect(() => {
    async function getGuardian() {
      try {
        const { data, error } = await supabase
          .from("guardians")
          .select("*")
          .eq("id", id)
          .single();

        if (error) throw error;
        console.log("Fetched guardian data:", data);
        setGuardian(data);
      } catch (error) {
        alert(error.message);
      }
    }
    getGuardian();
  }, [id]);

  if (!guardian) {
    return <p>Loading...</p>;
  }

  return (
    <div className="info">
      <div>
        <h2>{guardian.name}</h2>
        <p>Location: {guardian.location}</p>
        <p>Class: {guardian.class}</p>
        <i> Comment: {guardian.comment} </i>
      </div>

      <button> <Link to="/Gallery">Back to Gallery</Link> </button>
    </div>
  );
};

export default GuardianCard;
