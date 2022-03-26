import { useNavigate } from "react-router-dom";
import styled from "styled-components";

function Participant({ participantImage, id }) {
  const navigate = useNavigate();
  const ParticipantButton = styled.button`
    background-color: url(participantImage);
    height: 86px;
    width: 86px;
    border-radius: 43px;
  `;
  const goToProfile = () => {
    navigate("/profile", {
      state: { userId: id },
    });
  };
  return <ParticipantButton onClick={goToProfile} />;
}

export default Participant;
