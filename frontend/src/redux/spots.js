import { csrfFetch } from "../store/csrf";

//CONSTRANTS
const GET_ALL_SPOTS = "spots/getAllSpots"
const GET_SPOT = "spot/getSpot"
const GET_REVIEWS = "spot/getReviews"

//ACTION CREATORS
const getAllSpots = (spots) => ({
  type: GET_ALL_SPOTS,
  payload: spots
})

const getSpot = (spot) => ({
  type: GET_SPOT,
  payload: spot
})

const getReviews = (reviews) => ({
  type: GET_REVIEWS,
  payload: reviews
})

//THUNKS
export const getSpotsThunk = () => async(dispatch) => {
  try {
    const res = await csrfFetch('/api/spots');
    if(res.ok){
      const data = await res.json();
      await dispatch(getAllSpots(data))

    } else {
      throw res;
    }
  } catch(e) {
    return e;
  }
}

export const getSpotsDetailsThunk = (id) => async(dispatch) => {
  try {
    const res = await csrfFetch(`/api/spots/${id}`);
    if(res.ok) {
      const data = await res.json();
      await dispatch(getSpot(data))
    } else {
      throw res;
    }
  } catch(e) {
    return e;
  }
}

export const getSpotReviewsThunk = (id) => async(dispatch) => {
  try {
    const res = await csrfFetch(`/api/spots/${id}/reviews`);
    if(res.ok) {
      const data = await res.json();
      await dispatch(getReviews(data))

    } else {
      throw res;
    }
  } catch(e) {
    return e;
  }
}

//REDUCER

const initialState = {
  allSpots: [],
  byId: {}
}

function spotsReducer(state = initialState, action) {
  let newState;
  switch (action.type) {
    case GET_ALL_SPOTS:
      newState = {...state}
      newState.allSpots = action.payload.Spots;

      for(let spot of action.payload.Spots) {
        newState.byId[spot.id] = spot;
      }
      return newState;
    case GET_SPOT:
      newState = {...state}
      newState.singleSpot = action.payload;
      return newState;
    case GET_REVIEWS:
      newState = {...state}
      newState.allReviews = action.payload.Reviews;

      for(let review of action.payload.Reviews) {
        newState.byId[review.id] = review;
      }
      console.log('.........', newState.allReviews)
      return newState;
    default:
      return state;
  }
}

export default spotsReducer;