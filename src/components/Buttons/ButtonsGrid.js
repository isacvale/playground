import styled from '@emotion/styled';

import useContextState from '../../hooks/useContextState';

const StyledGrid = styled.div({ 
  bottom: '6rem',
  display: 'flex',
  justifyContent: 'center',
  position: 'absolute',
  width: '100%',
})

const StyledButton = styled.button(({controlType}) => ({
  background: 'hsla(0, 0%, 0%, 0.4)',
  border: '1px solid gray',
  borderRadius: {
    back: '0.5rem 0 0 0.5rem',
    refresh: '0',
    next: '0 0.5rem 0.5rem 0',
  }[controlType],
  color: 'gray',
  cursor: 'pointer',
  outline: 'none',
  padding: '0.5rem',
  position: 'relative',
  '&:focus': {
    background: 'hsla(0, 0%, 0%, 0.4)',
    borderColor: 'white',
    color: 'white',
    zIndex: 1,
  },
  '&:active': {
    background: 'hsla(0, 0%, 0%, 0.55)',
  }
}))

const ButtonsGrid = () => {
  const { ACTIONS, dispatch } = useContextState();

  const handleClick = action => () =>{
    dispatch({ type: action })
  }

  return <StyledGrid>
    <StyledButton controlType="back" onClick={handleClick(ACTIONS.LOAD_PREVIOUS_IMAGE)}>Back</StyledButton>
    <StyledButton controlType="refresh" onClick={handleClick(ACTIONS.RESET_IMAGES)}>Refresh</StyledButton>
    <StyledButton controlType="next" onClick={handleClick(ACTIONS.LOAD_NEXT_IMAGE)}>Next</StyledButton>
  </StyledGrid>
}

export default ButtonsGrid;