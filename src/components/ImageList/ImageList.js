import { useEffect, useState } from 'react'
import styled from '@emotion/styled'

import useContextState from '../../hooks/useContextState'
import ImageButton from './ImageButton'
import { range } from '../../utils'

const Grid = styled.div({
  alignContent: 'start',
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
  padding: '2rem',
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
}})

const makeEmptyElements = range(12).map((cur) => ({ title: `skeleton-${cur}`, url: '', skeleton: true }))

const ImageList = () => {
  const { imageList } = useContextState()

  const imageElements = [...imageList, ...makeEmptyElements].slice(0, 12)

  console.log({imageElements})
  return (
    <Grid>
      { 
        imageElements.map(({ title, url }) => <ImageButton key={title} url={url} title={title} />)
      }
    </Grid>
  )
}

export default ImageList 