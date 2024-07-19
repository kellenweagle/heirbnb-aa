// frontend/src/components/LoginFormModal/LoginFormModal.jsx
import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal';
import './PostReview.css'

function PostReviewModal() {
  const dispatch = useDispatch();
  const { closeModal } = useModal();

  const [form, setForm] = useState({
    description: "",
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

    await dispatch()

    closeModal()
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
            value={form.description}
            onChange={(e) => updateForm(e.target.value, "description")}
          />
        </div>
        <button className='post-review'>Submit your review</button>
    </div>
  );
}

export default PostReviewModal;