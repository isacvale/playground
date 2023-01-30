import styled from "@emotion/styled";

import useContextState from "../../hooks/useContextState";

const StyledButton = styled.button(({ backgroundUrl, isSelected, skeleton }) => ({
  backgroundColor: skeleton ? 'hsla(0, 0%, 0%, 0.8)' : undefined,
  backgroundImage: `url(${backgroundUrl.trim()}), url(https://images-assets.nasa.gov/image/PIA00123/PIA00123~small.jpg)`,
  backgroundSize: 'cover',
  border: 'none',
  boxShadow: isSelected
    ? '0 0 0 1px gray, 0 2px 12px 6px hsla(0, 0%, 0%, 0.6), 0 4px 6px -12px hsla(0, 0%, 0%, 0.6)'
    : '0 0 0 0px gray, 0 0 3px 3px hsla(0, 0%, 0%, 0.3), 0 2px 6px -3px hsla(0, 0%, 0%, 0.3)',
  cursor: 'pointer',
  height: 90,
  opacity: isSelected ? 1 : 0.75,
  outline: 'none',
  padding: 0,
  position: 'relative',
  transition: 'box-shadow 0.2s ease-in-out',
  zIndex: isSelected ? 1 : 0,
  '&::after': {
    content: '""',
    height: '100%',
    background: 'hsla(0, 0%, 100%, 0)',
    backdropFilter: `blur(${isSelected ? '0px' : '1px'}) saturate(${isSelected ? 100 : 30}%)`,
    pointerEvents: 'none',
    position: 'absolute',
    top: 0,
    left: 0,
    transition: 'backdropFilter 1s',
    width: '100%',
  },
}))

const ImageButton = ({ skeleton, title, url }) => {
  const { ACTIONS, dispatch, displayImage } = useContextState()

  const handleSelection = () => {
    dispatch({ type: ACTIONS.SET_DISPLAY_IMAGE, payload: { title, url } })
  }

  const isSelected = url === displayImage.url

  const actions = skeleton ? {} : { onClick: handleSelection, onFocus: handleSelection }

  return <StyledButton backgroundUrl={url} isSelected={isSelected} {...actions} aria-label={title} skeleton={skeleton} />
}

export default ImageButton