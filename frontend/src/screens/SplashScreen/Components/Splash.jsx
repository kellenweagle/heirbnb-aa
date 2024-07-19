import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaStar } from "react-icons/fa";
import './Splash.css'
import { useNavigate } from "react-router-dom";
import { getSpotsThunk } from "../../../store/spots";

const Splash = () => {
  // HOOKS
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // HOOKS - manage state
  const spots = useSelector((state) => state.spotState.allSpots);
  const [isLoaded, setIsLoaded] = useState(false);


  // USE EFFECTS
  useEffect(() => {
    const getData = async() => {
      // grab the data from the backend
      await dispatch(getSpotsThunk());
      setIsLoaded(true);
    }

    // we are not loaded
    if(!isLoaded && !spots.length) {
      getData()
    }
  }, [dispatch, isLoaded, spots])

  // Custom FUNCTIONS and variables

  const goToSpot = (e, spot) => {
    e.preventDefault();
    e.stopPropagation();

    navigate(`/spots/${spot.id}`)
  }

  // JSX

  if(!isLoaded){
    setTimeout(()=> {
    return <img
      src="https://media.tenor.com/On7kvXhzml4AAAAj/loading-gif.gif"
      alt="loading animation"
      style={{height: '30px', width: '30px'}}
      />
    }, 1000)
  }
  return (
    <>
      <div className="spotSection">
        {spots.map((spot, idx)=> (
            <div
              className="spot-card"
              key={`${idx}-${spot.id}`}
              onClick={e => goToSpot(e, spot)}
              >
                <span className="tooltip-text" id="top">{spot.name}</span>
                <div className="spotCardInfo">
                  <img className="spotCardInfoImg" src={spot.previewImage} />
                  <div className="spotCardText">
                    <span>{spot.city}, {spot.state}</span>
                    <span className="starRating"><FaStar /> {spot.avgRating ? spot.avgRating.toFixed(1) : "New"}</span>
                  </div>
                </div>
              <div>
                <span className="spotCardPrice">${spot.price} </span>
                <span>night</span>
              </div>
            </div>
        ))}
      </div>
    </>
  )
}

export default Splash;
