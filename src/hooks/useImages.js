import { useEffect, useReducer, useRef } from 'react'

import { NASA_API_KEY } from '../config'

const ACTIONS = {
  LOAD_NEXT_IMAGE: 'loadNextImage',
  LOAD_PREVIOUS_IMAGE: 'loadPreviousImage',
  RESET_IMAGES: 'resetImages',
  SET_DISPLAY_IMAGE: 'setDisplayImage',
}

const getImage = async count => {
  const data = await new Promise(resolve => {
    return fetch(`https://api.nasa.gov/planetary/apod?count=${ count }&api_key=${ NASA_API_KEY }`)
      .then(response => {
        if (!response.ok) throw new Error('Unable to find image.')
        return response.json()
      })
      .then(data => {
        resolve(data)
      })
      .catch(error => {
        console.warn('Some image could not be found:', error)
      })
  })
  if (!Array.isArray(data)) return []

  return data.map(({title, url}) => ({ title, url }))
}

const imageReducer = (state, {payload, type}) => {
  switch (type) {
    case ACTIONS.SET_DISPLAY_IMAGE:
      return {
        ...state,
        displayImage: payload,
      }
      break
    case ACTIONS.LOAD_NEXT_IMAGE:
      return {
        ...state,
        imageList: [ ...state.imageList, ...payload ]
      }
      break
    case ACTIONS.LOAD_PREVIOUS_IMAGE:
      return {
        ...state,
        imageList: [ ...payload, ...state.imageList ]
      }
      break
    case ACTIONS.RESET_IMAGES:
      return {
        displayImage: {
          title: '',
          url: undefined,
        },
        imageList: [ ...payload ]
      }
      break
    default:
      return state
  } 
}

const useImages = () => {
  const [state, dispatch ] = useReducer(imageReducer, {
    imageList: [],
    displayImage: {
      title: '',
      url: undefined,
    }
  })

  const ref = useRef(Math.random())

  const handleAsyncDispatch = async action => {
    if (action.type === ACTIONS.SET_DISPLAY_IMAGE)
      return dispatch(action) 

    const newImages =  action.type === ACTIONS.RESET_IMAGES ? await getImage(12) : await getImage(1)
    dispatch({
      type: action.type,
      payload: newImages
    })
  }

  useEffect(() => {
    if (state.imageList.length === 0) {
      handleAsyncDispatch({ type: ACTIONS.RESET_IMAGES })
    }
  }, [state])

  return {
      ACTIONS,
      dispatch: handleAsyncDispatch,
      imageList: state.imageList,
      displayImage: state.displayImage,
      ref,
  } 
}

export default useImages