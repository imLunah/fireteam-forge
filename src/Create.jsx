import {useState } from 'react';
import {Link} from 'react-router-dom';
import { supabase } from './client';

const Create = () => {

  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [classType, setClassType] = useState('');
  const [comment, setComment] = useState('');

  async function createGuardian() {
    try {
      const {data, error} = await supabase
      .from("guardians")
      .insert({
        name: name,           // lhs: column name in the table, rhs: variable name
        location: location,
        class: classType,
        comment: comment
      })
      .single();

      if(error) throw error;
      window.location.reload();
    } catch(error) {
      alert(error.message);
    }
  }

  return (
    <div>
      <h1>Create Guardian</h1>

      <form>
        <div >
          <label htmlFor="name">Username:</label>
          <input type="text" id="name" onChange={(e) => setName(e.target.value)} />
        </div>

        <div>
          <label htmlFor="Location">Location:</label>
          <input type="text" id="location" onChange={(e) => setLocation(e.target.value)} />
        </div>

        <div>
          <label htmlFor="class">Class:</label>
          <select id="class" name="class" onChange={(e) => setClassType(e.target.value)}>
            <option value=" "> Select </option>
            <option value="Titan">Titan</option>
            <option value="Hunter">Hunter</option>
            <option value="Warlock">Warlock</option>
          </select>
        </div>

        <div>
          <label htmlFor="Comments"> Comments </label>
          <textarea id="comments" name="comments" rows="4" cols="50" onChange={(e) => setComment(e.target.value)}> </textarea>
        </div>
      </form>

      <button className="create-button" onClick={() => createGuardian()}> Create Guardian </button>
      <button> <Link to="/" className="backhome-button"> Back to Home </Link> </button>
    </div>
  );
};

export default Create;
