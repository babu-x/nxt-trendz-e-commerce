import {Component} from 'react'
import {Link} from 'react-router-dom'
import './index.css'

class ProductCard extends Component {
  state = {addToCartItemsId: []}

  addToCart = () => {
    const {productData} = this.props
    const {id} = productData
    const {addToCartItemsId} = this.state
    const newId = [...addToCartItemsId, id]
    this.setState({addToCartItemsId: newId})
  }

  render() {
    const {productData} = this.props
    const {id, title, brand, imageUrl, rating, price} = productData

    return (
      <Link to={`/products/${id}`} className="product-item-link">
        <li className="product-item" onClick={this.addToCart}>
          <img src={imageUrl} alt="product" className="thumbnail" />
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
}
export default ProductCard
