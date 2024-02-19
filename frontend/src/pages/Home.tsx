import { useContext, useEffect } from "react";

import { Col, Container, Row } from "react-bootstrap";
import WorkoutForm from "../components/WorkoutForm";
import WorkoutDetails from "../components/WorkoutDetails";
import { ThemeContext } from "../context/ThemeContext";
import { WorkoutContext } from "../context/WorkoutContext";
import { AuthContext } from "../context/AuthContext";

const Home = () => {
  const {
    state: { workouts },
    dispatch,
  } = useContext(WorkoutContext);
  const {
    state: { user },
  } = useContext(AuthContext);

  useEffect(() => {
    const fetchWorkouts = async () => {
      const response = await fetch("http://localhost:4000/api/workouts", {
        headers: {
          "Authorization": `Bearer ${user.token}`
        }
      });
      const json = await response.json();
      if (response.ok) {
        dispatch({ type: "SET_WORKOUT", payload: json });
        console.log(workouts);
      }
    };
    if (user) {
      fetchWorkouts();
    }
  }, [dispatch, user]);

  const { isLightTheme, light, dark } = useContext(ThemeContext);
  const theme = isLightTheme ? light : dark;

  return (
    <>
      <Row style={{ background: theme.bg, color: theme.ui }}>
        <Col xs={8}>
          <Container>
            <Row>
              {workouts &&
                workouts.map((workout, index) => {
                  return (
                    <WorkoutDetails
                      workout={workout}
                      styles={{ color: theme.syntax }}
                      key={index}
                    />
                  );
                })}
              {workouts?.length === 0 && <div>No workouts</div>}
            </Row>
          </Container>
        </Col>

        <Col className="px-5 py-5">
          <Container>
            <WorkoutForm />
          </Container>
        </Col>
      </Row>
    </>
  );
};

export default Home;
