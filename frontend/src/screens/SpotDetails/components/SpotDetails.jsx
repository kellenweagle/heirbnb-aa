import { useEffect, useState } from 'react'
import { useParams} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FaStar } from "react-icons/fa";
import './SpotDetails.css'
import { getSpotReviewsThunk, getSpotsThunk } from '../../../store/spots';

export default function SpotDetails() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const spot = useSelector((state) => state.spotState.byId[id])
  const reviews = useSelector((state) => state.spotState.allReviews)
  const sessionUser = useSelector((state) => state.session.user)

  console.log(spot, "************************** spot")
  console.log(reviews)

  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const getData = async() => {
      await dispatch(getSpotsThunk());
      await dispatch(getSpotReviewsThunk(id))
      setIsLoaded(true);
    }

    if(!isLoaded || spot === undefined) {
      getData()
    } 
  }, [dispatch, id, isLoaded, spot])

  if(!isLoaded || spot === undefined) {
    return (
      <div>loading...</div>
    )
  }

  const isUserOwner = () => {
    // if the session user is not the spot owner, return true. otherwise return false.
    if(sessionUser.id !== spot.Owner.id) {
      return true;
    } else {
      return false;
    }
  }

  return (
    <div className='spotDetails'>
      <div>
        <h2>{spot.name}</h2>
        <p>{spot.city}, {spot.state}, {spot.country}</p>
      </div>
      <div className="images">
        <div className="previewImg">
        <img src={isLoaded && spot.SpotImages[0] ? spot.SpotImages[0].url : null} />
        </div>
        <div className="smallImageDivRow1">
        <img src={isLoaded && spot.SpotImages[1] ? spot.SpotImages[1].url : null} />
        <img src={isLoaded && spot.SpotImages[2]  ? spot.SpotImages[2].url : null} />
        </div>

        <div className="smallImageDivRow2">
        <img src={isLoaded && spot.SpotImages[3] ? spot.SpotImages[3].url : null} />
        <img src={isLoaded && spot.SpotImages[4] ? spot.SpotImages[4].url : null} />
        </div>
      </div>
      <div className='spotDetailsInfo'>
        <div>
          <h2>Hosted by {spot.Owner.firstName} {spot.Owner.lastName}</h2>
          <p>{spot.description}</p>
        </div>
        <div className='spotDetailsReserve'>
          <div className='spotDetailsPriceAndRev'>
            <div>
              <span className='spotPrice'>${spot.price} </span>
              <span > night</span>
            </div>
            <span><FaStar /> {spot.numReviews === 0 ? "New" : `${spot.avgRating.toFixed(1)} · ${spot.numReviews === 1 ? `${spot.numReviews} Review`: `${spot.numReviews} Reviews`}`}</span>
          </div>
          <button 
            className='reserveButton'
            onClick={alert("Feature coming soon")}
          >Reserve</button>
        </div>
      </div>
      <div>
        <h2><FaStar /> {spot.numReviews === 0 ? "New" : `${spot.avgRating.toFixed(1)} · ${spot.numReviews === 1 ? `${spot.numReviews} Review`: `${spot.numReviews} Reviews`}`}</h2>
      </div>
      <div>
        {isUserOwner && !spot.numReviews ? "Be the first to post a review!" : 
          <ul className='reviews'>
          {reviews.map((review, idx) => (
          <li key={`${idx}-${review.id}`}>
            <h3 className='reviewUserName'>{review.User.firstName}</h3>
            <p>
              {review.review}
            </p>
          </li>
        ))}
        </ul>
        }
      </div>
    </div>
  )
}
