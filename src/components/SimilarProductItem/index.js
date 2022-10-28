import {Link} from 'react-router-dom'
import './index.css'

const SimilarProductItem = props => {
  const {similarProductDetails} = props
  const {id, title, brand, imageUrl, rating, price} = similarProductDetails

  return (
    <Link to={`/products/${id}`} className="similar-product-item-link">
      <li className="similar-product-item" key={id}>
        <img src={imageUrl} alt="similar product" className="thumbnail" />
        <h1 className="title">{title}</h1>
        <p className="brand">by {brand}</p>
        <div className="product-details">
          <p className="price">Rs {price}/-</p>
          <div className="rating-container">
            <p className="rating">{rating}</p>
            <img
              src="https://assets.ccbp.in/frontend/react-js/star-img.png"
              alt="star"
              className="star"
            />
          </div>
        </div>
      </li>
    </Link>
  )
}
export default SimilarProductItem
