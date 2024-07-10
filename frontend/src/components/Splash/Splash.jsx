import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSpotsThunk } from "../../redux/spots";
import { FaStar } from "react-icons/fa";
import './Splash.css'
import { useNavigate } from "react-router-dom";

const Splash = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const spots = useSelector((state) => state.spotState.allSpots);
  console.log(spots)
  // const user = useSelector((state) => state.session.user);

  const [isLoaded, setIsLoaded] = useState(false);
  // const [newTweet, setNewSpot] = useState("");
  // const [errors, setErrors] = useState({});

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

  // const handleButtonClick = async() => {
  //   const form = {
  //     user,
  //     newSpot
  //   }

  //   const res = await dispatch()

  // }

  if(!isLoaded){
    setTimeout(()=> {
    return <img
      src="https://media.tenor.com/On7kvXhzml4AAAAj/loading-gif.gif"
      alt="loading animation"
      style={{height: '30px', width: '30px'}}
      />
    }, 1000
    )
  }

  const goToSpot = (e, spot) => {
    e.preventDefault();
    e.stopPropagation();
    
    navigate(`/spots/${spot.id}`)
  }

  return (
    <>
      <div className="spotSection">
        {spots.map((spot, idx)=> (
            <div
              className="spotCard"
              key={`${idx}-${spot.id}`}
              onClick={e => goToSpot(e, spot)}
              >
                <span className="tooltiptext">test</span>
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