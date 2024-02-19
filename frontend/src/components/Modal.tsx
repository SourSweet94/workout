import { ChangeEvent } from "react";
import { Modal as BSModal, Form, Button } from "react-bootstrap";

interface ModalProps {
  show: boolean;
  onHide: () => void;
  onSave: (editedWorkout: any) => void;
  workout: any | null;
}

const Modal = ({ show, onHide, onSave, workout }: ModalProps) => {
  const handleConfirmEdit = () => {
    // Validate and save the edited workout
    onSave(workout);
  };

  return (
    <BSModal show={show} onHide={onHide}>
      <BSModal.Header closeButton>
        <BSModal.Title>Edit Workout</BSModal.Title>
      </BSModal.Header>
      <BSModal.Body>
        <Form.Group className="mb-3">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            placeholder="Title"
            value={workout?.title || ""}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              onSave({ ...workout, title: e.target.value })
            }
          />
        </Form.Group>

        {/* Add similar Form.Group components for reps and load */}
      </BSModal.Body>
      <BSModal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
        <Button variant="primary" onClick={handleConfirmEdit}>
          Confirm Edit
        </Button>
      </BSModal.Footer>
    </BSModal>
  );
};

export default Modal;
