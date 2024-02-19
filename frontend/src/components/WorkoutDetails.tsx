import { useContext, useState } from "react";
import { Button, Card } from "react-bootstrap";
import { WorkoutContext } from "../context/WorkoutContext";
import { AuthContext } from "../context/AuthContext";
import Modal from "./Modal";
interface WorkoutDetailsProps {
  workout: {
    _id: string;
    title: string;
    reps: number;
    load: number;
    createdAt: string;
  };
  styles?: any;
}

const WorkoutDetails = ({ workout, styles }: WorkoutDetailsProps) => {
  const { dispatch } = useContext(WorkoutContext);
  const {
    state: { user },
  } = useContext(AuthContext);
  const [showEditModal, setShowEditModal] = useState(false);

  const handleDelete = async () => {
    if (!user) {
      return;
    }
    const response = await fetch(
      "http://localhost:4000/api/workouts/" + workout._id,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      }
    );
    const json = await response.json();
    if (response.ok) {
      dispatch({ type: "DELETE_WORKOUT", payload: json });
    }
  };

  const handleEdit = () => {
    setShowEditModal(true);
  };

  const handleSaveEdit = async (editedWorkout: any) => {
    if (!user) {
      return;
    }

    const response = await fetch(
      `http://localhost:4000/api/workouts/${editedWorkout._id}`,
      {
        method: "PUT",
        body: JSON.stringify(editedWorkout),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      }
    );

    const json = await response.json();

    if (response.ok) {
      dispatch({ type: "UPDATE_WORKOUT", payload: json });
    }

    setShowEditModal(false);
  };
  return (
    <>
      <Card style={{ width: "18rem", margin: "10px" }}>
        <Card.Title style={styles}>{workout.title}</Card.Title>
        <Card.Body>
          <strong>Reps: </strong>
          {workout.reps}
          <strong>Load: </strong>
          {workout.load}
          <div>
            <strong>id: </strong>
            {workout._id}
          </div>
        </Card.Body>
        <Card.Footer>
          {workout.createdAt}
          <Button onClick={handleDelete}>Delete</Button>
          <Button onClick={handleEdit}>Edit</Button>
        </Card.Footer>
      </Card>
      <Modal
        show={showEditModal}
        onHide={() => setShowEditModal(false)}
        onSave={handleSaveEdit}
        workout={workout}
      />
    </>
  );
};

export default WorkoutDetails;
