// frontend/src/components/LoginFormModal/LoginFormModal.jsx

import './PostReview.css'
import { getSpotReviewsThunk, postReviewThunk } from '../../../store/spots';
import { useDispatch, useSelector } from 'react-redux';
import { useModal } from '../../../context/Modal';
import { useState } from 'react';


function PostReviewModal({spotId}) {
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const sessionUser = useSelector((state) => state.session.user)

  console.log(spotId, "This is in post review")

  const [form, setForm] = useState({
    userId: sessionUser.id,
    spotId: spotId,
    review: "",
    stars: 3 
  })

  const updateForm = (val, key) => {
    return setForm((prev) => {
      const newPrev = { ...prev };
      newPrev[key] = val
      return newPrev
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    await dispatch(postReviewThunk(form, spotId))

    closeModal()

    await dispatch(getSpotReviewsThunk(spotId))
  };

  return (
    <div
     className='spot-review-form'
     >
      <h1>How was your stay?</h1>
      <div className='describe-review'>
          <textarea
            className='description-textarea'
            placeholder='Leave your review here...'
            value={form.review}
            onChange={(e) => updateForm(e.target.value, "review")}
          />
        </div>
        <button 
        disabled={form.review.length < 10}
        onClick={handleSubmit} 
        className='submit-review-button'>Submit your review</button>
    </div>
  );
}

export default PostReviewModal;