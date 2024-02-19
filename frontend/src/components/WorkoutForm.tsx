import { ChangeEvent, FormEvent, useContext, useState } from "react";
import { Form } from "react-bootstrap";
import { WorkoutContext } from "../context/WorkoutContext";
import { AuthContext } from "../context/AuthContext";

const WorkoutForm = () => {
  const {dispatch} = useContext(WorkoutContext)
  const {state: {user}} = useContext(AuthContext)
  const [title, setTitle] = useState<string | null>(null);
  const [reps, setReps] = useState<number | null>(null);
  const [load, setLoad] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if(!user){
      setError("You must be logged in")
      return
    }

    const workout = { title, reps, load };

    const response = await fetch("http://localhost:4000/api/workouts/", {
      method: "POST",
      body: JSON.stringify(workout),
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${user.token}`
      },
    });

    const json = await response.json();

    if (response.ok) {
      setTitle(null);
      setReps(null);
      setLoad(null);
      dispatch({type: "CREATE_WORKOUT", payload: json})
      setError(null);
    } else {
      setError(json.error);
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <Form.Group className="mb-3">
        <Form.Label>Title</Form.Label>
        <Form.Control
          type="text"
          placeholder="Title"
          value={title === null ? '' : title}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setTitle(e.target.value)
          }
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Reps</Form.Label>
        <Form.Control
          type="number"
          placeholder="Reps"
            value={reps === null ? '' : reps}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setReps(e.target.valueAsNumber)
          }
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Load</Form.Label>
        <Form.Control
          type="number"
          placeholder="Load"
            value={load === null ? '' : load}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setLoad(e.target.valueAsNumber)
          }
        />
      </Form.Group>

      <button type="submit">Submit</button>
      {error && <div>{error}</div>}
    </form>
  );
};

export default WorkoutForm;
