import styled from '@emotion/styled';

import useContextState, { StateProvider } from './hooks/useContextState';
import ImageList from './components/ImageList'
import TitleText from './components/TitleText'
import Credits from './components/Credits';
import ButtonsGrid from './components/Buttons/ButtonsGrid';


const StyledApp = styled.div(({backgroundUrl}) => ({
  backgroundImage: backgroundUrl ? `url(${backgroundUrl})` : undefined,
  backgroundPosition: 'center',
  backgroundSize: 'cover',
  height: '100vh',
  '&::after': {
    content: '""',
    height: '100%',
    width: '100%',
    background: 'hsla(0, 0%, 100%, 0)',
    backdropFilter: `saturate(70%)`,
    pointerEvents: 'none',
    position: 'absolute',
    top: 0,
    left: 0,
  },
}))

const App = () => {
  const { displayImage } = useContextState();
  const { title, url } = displayImage;

  return (
    <StyledApp backgroundUrl={url} >
      <ImageList />
      <TitleText />
      <ButtonsGrid />
      <Credits />
    </ StyledApp>
  )
}

export default () =>
  <StateProvider>
    <App />
  </StateProvider>
