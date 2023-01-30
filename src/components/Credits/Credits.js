import styled from "@emotion/styled"

const StyledCredits = styled.small({
    bottom: '2.5rem',
    color: 'white',
    display: 'block',
    fontSize: '1rem',
    fontWeight: 'bold',
    position: 'absolute',
    textAlign: 'center',
    width: '100%',
})

const Credits = () => <StyledCredits>Pictures provided by Nasa Open API.</ StyledCredits>

export default Credits