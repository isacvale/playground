import React, { useContext, useEffect, useReducer, useRef } from 'react'

import { NASA_API_KEY } from '../config'

const StateContext = React.createContext()

const emptyDisplayImage = {
  title: 'Select an image',
  url: undefined,
}

const ACTIONS = {
  LOAD_NEXT_IMAGE: 'loadNextImage',
  LOAD_PREVIOUS_IMAGE: 'loadPreviousImage',
  RESET_IMAGES: 'resetImages',
  SET_DISPLAY_IMAGE: 'setDisplayImage',
}

const reducer = (state, {payload, type}) => {
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
        imageList: [ ...state.imageList.slice(1, 12), ...payload ]
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

const getImages = async count => {
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

export const StateProvider = ({ children }) => {
  const [state, rawDispatch] = useReducer(reducer, {
    imageList: [],
    displayImage: emptyDisplayImage,
  })
  const ref = useRef(Math.random())

  const dispatch = async action => {
    const asyncActions = [ACTIONS.LOAD_NEXT_IMAGE, ACTIONS.LOAD_PREVIOUS_IMAGE, ACTIONS.RESET_IMAGES]
    if (!asyncActions.includes(action.type)) {
      rawDispatch(action)
      return
    }
    const newImages = action.type === ACTIONS.RESET_IMAGES ? await getImages(12) : await getImages(1)
    console.log({newImages})
    rawDispatch({
      type: action.type,
      payload: newImages
    })
  }

  useEffect(() => {
    if (state.imageList.length === 0) {
      dispatch({ type: ACTIONS.RESET_IMAGES })
    }
  }, [state])

  const stateValue = { ACTIONS, dispatch, ...state }

  return <StateContext.Provider value={stateValue}>{children}</StateContext.Provider>
}

const useContextState = () => useContext(StateContext)

export default useContextState