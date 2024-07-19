// frontend/src/components/LoginFormModal/LoginFormModal.jsx

import './PostReview.css'
import { useDispatch } from 'react-redux';
import { useModal } from '../../../context/Modal';
import './DeleteReviewModal.css'
import { deleteReviewThunk, getSpotReviewsThunk } from '../../../store/spots';


function DeleteReviewModal({review}) {
  const dispatch = useDispatch();
  const { closeModal } = useModal();

  console.log(review)

  const handleSubmit = async (e) => {
    e.preventDefault();

    await dispatch(deleteReviewThunk(review))

    closeModal()

    await dispatch(getSpotReviewsThunk(review.spotId))
  };

  return (
    <div className='delete-review'>
      <h1>Confirm Delete</h1>
      <span>Are you sure you want to delete this review?</span>
      <button 
      className='delete-yes'
      onClick={handleSubmit}
      >Yes (Delete Review)</button>
      <button 
      className='delete-no'
      onClick={closeModal}
      >No (Keep Review)</button>
    </div>
  );
}

export default DeleteReviewModal;