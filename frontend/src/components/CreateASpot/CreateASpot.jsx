import { useNavigate } from 'react-router-dom';
import './CreateASpot.css'
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { createSpotThunk } from '../../redux/spots';

const CreateASpot = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [country, setCountry] = useState('');
  const [streetAddress, setStreetAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [description, setDescription] = useState('');
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [previewImg, setPreviewImg] = useState('');
  const [imageOne, setImageOne] = useState('');
  const [imageTwo, setImageTwo] = useState('');
  const [imageThree, setImageThree] = useState('');
  const [imageFour, setImageFour] = useState('');
  const [validationErrors, setValidationErrors] = useState({});
  const [submitErrors, setSubmitErrors] = useState({})
  const [hasSubmitted, setHasSubmitted] = useState(false);

  useEffect(() => {
    const errors = {};

    if(!country.length.trim()) errors['country'] = "Country is required";
    if(!streetAddress.length.trim()) errors['streetAddress'] = "Address is required";
    if(!city.length.trim()) errors['city'] = "City is required";
    if(!state.length.trim()) errors['state'] = "State is required";
    if(!latitude.length.trim()) errors['latitude'] = "Latitude is required";
    if(!longitude.length.trim()) errors['longitude'] = "Longitude is required";
    if(!description.length.trim()) errors['description'] = "Description needs a minimum of 30 characters";
    if(!title.length.trim()) errors['title'] = "Name is required";
    if(!price.length.trim()) errors['price'] = "Price is required";
    if(!previewImg.length.trim()) errors['previewImg'] = "Preview Image URL required";
    if(!previewImg.endsWith('png') || !previewImg.endsWith('jpg') || !previewImg.endsWith('jpeg')) errors['previewImg'] = "Preview Image URL must end in .png, .jpg, or .jpeg";
    if(!imageOne.endsWith('png') || !imageOne.endsWith('jpg') || !imageOne.endsWith('jpeg')) errors['imageOne'] = "Image URL must end in .png, .jpg, or .jpeg";
    if(!imageTwo.endsWith('png') || !imageTwo.endsWith('jpg') || !imageTwo.endsWith('jpeg')) errors['imageTwo'] = "Image URL must end in .png, .jpg, or .jpeg";
    if(!imageThree.endsWith('png') || !imageThree.endsWith('jpg') || !imageThree.endsWith('jpeg')) errors['imageThree'] = "Image URL must end in .png, .jpg, or .jpeg";
    if(!imageFour.endsWith('png') || !imageFour.endsWith('jpg') || !imageFour.endsWith('jpeg')) errors['imageFour'] = "Image URL must end in .png, .jpg, or .jpeg";
    setValidationErrors(errors);  
  }, [country, streetAddress, city, state, latitude, longitude, description, title, price, previewImg, imageOne, imageTwo, imageThree, imageFour])

  // const onSubmit = async (e) => {
  //   setHasSubmitted(true);
  //   e.preventDefault();
  //   e.stopPropogation();

  //   const images = [
  //     { url: previewImg, preview: true },
  //     { url: imageOne || <img src="../../../../images/spotImages/noImage.jpg"/>, preview: false },
  //     { url: imageTwo || <img src="../../../../images/spotImages/noImage.jpg"/>, preview: false },
  //     { url: imageThree || <img src="../../../../images/spotImages/noImage.jpg"/>, preview: false },
  //     { url: imageFour || <img src="../../../../images/spotImages/noImage.jpg"/>, preview: false }
  //   ]

  //   const spot = { country, streetAddress, city, state, latitude, longitude, description, title, price}

  //   const createdSpot = await dispatch(createSpotThunk(spot, images))

  //   if(!createdSpot.ok && createdSpot.ok !== undefined) {
  //     const data = await createdSpot.json();
  //     setSubmitErrors(data.errors);
  //   } else {
  //     const createdSpotId = createdSpot.formattedNewSpot.id;
  //     navigate(`/spots/${createdSpotId}`)
  //   }
  // }

  return (
    <div 
    onSubmit={onSubmit}
    className='full-form'>
      <div className='form-top'>
      <div className='section-one-form'>
        <h1>Create a new Spot</h1>
        <h3>Where&apos;s your place located?</h3>
        <p>Guests will only get your exact address once they booked a reservation.</p>
      </div>
        <form>
          <div>
            <label htmlFor='country'>Country</label>
            <input
              id='country'
              placeholder='Country'
              type='text'
              onChange={e => setCountry(e.target.value)}
              value={country}
            />
            <div className='error'>
              {hasSubmitted && validationErrors.country && `* ${validationErrors.country}`}
            </div>
          </div>
          <div>
            <label htmlFor='streetAddress'>Street Address</label>
            <input
              id='streetAddress'
              placeholder='Address'
              type='text'
              onChange={e => setStreetAddress(e.target.value)}
              value={streetAddress}
            />
            <div className='error'>
              {hasSubmitted && validationErrors.streetAddress && `* ${validationErrors.streetAddress}`}
            </div>
          </div>
          <div>
            <label htmlFor='city'>City</label>
            <input
              id='city'
              placeholder='City'
              type='text'
              onChange={e => setCity(e.target.value)}
              value={city}
            />
            <div className='error'>
              {hasSubmitted && validationErrors.city && `* ${validationErrors.city}`}
            </div>
          </div>
          <div>
            <label htmlFor='state'>State</label>
            <input
              id='state'
              placeholder='State'
              type='text'
              onChange={e => setState(e.target.value)}
              value={state}
            />
            <div className='error'>
              {hasSubmitted && validationErrors.state && `* ${validationErrors.state}`}
            </div>
          </div>
          <div>
            <label htmlFor='latitude'>Latitude</label>
            <input
              id='latitude'
              placeholder='Latitude'
              type='latitude'
              onChange={e => setLatitude(e.target.value)}
              value={latitude}
            />
            <div className='error'>
              {hasSubmitted && validationErrors.city && `* ${validationErrors.latitude}`}
            </div>
          </div>
          <div>
            <label htmlFor='longitude'>Longitude</label>
            <input
              id='longitude'
              placeholder='Longitude'
              type='text'
              onChange={e => setLongitude(e.target.value)}
              value={longitude}
            />
            <div className='error'>
              {hasSubmitted && validationErrors.longitude && `* ${validationErrors.longitude}`}
            </div>
          </div>
        </form>
      </div>
      <div className='section-two-form'>
        <div>
          <h3>Describe your place to guests</h3>
          <p>Mention the best features of your space, any special amentities like fast wif or parking, and what you love about the neighborhood.
          </p>
        </div>
        <div>
          <label htmlFor='description'></label>
          <input 
            id='description'
            placeholder='Please write at least 30 characters'
            type='textarea'
            onChange={e => setDescription(e.target.value)}
            value={description}
          />
          <div className='error'>
              {hasSubmitted && validationErrors.description && `* ${validationErrors.description}`}
            </div>
        </div>
      </div>
      <div className='section-three-form'>
        <div>
          <h3>Create a title for your spot</h3>
          <p>Catch guests&apos; attention with a spot title that highlights what makes your place special.</p>
        </div>
        <div>
        <label htmlFor='title'></label>
          <input 
            id='title'
            placeholder='Name of your spot'
            type='text'
            onChange={e => setTitle(e.target.value)}
            value={title}
          />
          <div className='error'>
              {hasSubmitted && validationErrors.title && `* ${validationErrors.title}`}
            </div>
        </div>
      </div>
      <div className='section-four-form'>
        <div>
          <h3>Set a base price for your spot</h3>
          <p>Competitive pricing can help your listing stand out and rank higher in search results.</p>
        </div>
        <div>
        <label htmlFor='price'></label>
          <input 
            id='price'
            placeholder='Name of your spot'
            type='text'
            onChange={e => setPrice(e.target.value)}
            value={price}
          />
          <div className='error'>
              {hasSubmitted && validationErrors.price && `* ${validationErrors.price}`}
            </div>
        </div>
      </div>
      <div className='section-fifth-form'>
        <div>
          <h3>Liven up your spot with photos</h3>
          <p>Submit a link to at least one photo to publish your spot.</p>
        </div>
        <div>
        <label htmlFor='previewImg'></label>
          <input 
            id='previewImg'
            placeholder='Preview Image URL'
            type='url'
            onChange={e => setPreviewImg(e.target.value)}
            value={previewImg}
          />
          <div className='error'>
              {hasSubmitted && validationErrors.previewImg && `* ${validationErrors.previewImg}`}
          </div>
        </div>
        <div>
          <label htmlFor='imageOne'></label>
            <input 
              id='imageOne'
              placeholder='Image URL'
              type='url'
              onChange={e => setImageOne(e.target.value)}
              value={imageOne}
            />
            <div className='error'>
                {hasSubmitted && validationErrors.imageOne && `* ${validationErrors.imageOne}`}
            </div>
        </div>
        <div>
          <label htmlFor='imageTwo'></label>
            <input 
              id='imageTwo'
              placeholder='Image URL'
              type='url'
              onChange={e => setImageTwo(e.target.value)}
              value={imageTwo}
            />
            <div className='error'>
                {hasSubmitted && validationErrors.imageTwo && `* ${validationErrors.imageTwo}`}
            </div>
        </div>
        <div>
          <label htmlFor='imageThree'></label>
            <input 
              id='imageThree'
              placeholder='Image URL'
              type='url'
              onChange={e => setImageThree(e.target.value)}
              value={imageThree}
            />
            <div className='error'>
                {hasSubmitted && validationErrors.imageThree && `* ${validationErrors.imageThree}`}
            </div>
        </div>
        <div>
          <label htmlFor='imageFour'></label>
            <input 
              id='imageFour'
              placeholder='Image URL'
              type='url'
              onChange={e => setImageFour(e.target.value)}
              value={imageFour}
            />
            <div className='error'>
                {hasSubmitted && validationErrors.imageFour && `* ${validationErrors.imageFour}`}
            </div>
        </div>
      </div>
      <button>Create Spot</button>
    </div>
  )
}

export default CreateASpot;
