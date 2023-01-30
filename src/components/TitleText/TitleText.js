import styled from "@emotion/styled";

import useContextState from "../../hooks/useContextState";

const StyledText = styled.p({
  color: "black",
  fontSize: "2.5rem",
  fontWeight: "bold",
  padding: '0 2.5rem',
  textAlign: 'center',
  textShadow: '0 0 18px gray, 0 0 3px darkgrey',
})

const TitleText = () => {
  const { displayImage } = useContextState();
  return (
      <StyledText>
        {displayImage.title}
      </StyledText>
  );
}

export default TitleText