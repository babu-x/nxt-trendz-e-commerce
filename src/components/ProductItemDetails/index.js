import {Component} from 'react'
import {Link} from 'react-router-dom'
import Loader from 'react-loader-spinner'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import {BsPlusSquare, BsDashSquare} from 'react-icons/bs'
import {RiArrowGoBackLine} from 'react-icons/ri'
import Cookies from 'js-cookie'
import Header from '../Header'
import SimilarProductItem from '../SimilarProductItem'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class ProductItemDetails extends Component {
  state = {
    productItemDetails: [],
    similarProducts: [],
    addToCartProducts: 1,
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getProductItemDetails()
  }

  onIncrement = () => {
    this.setState(prevState => ({
      addToCartProducts: prevState.addToCartProducts + 1,
    }))
  }

  onDecrement = () => {
    const {addToCartProducts} = this.state
    if (addToCartProducts !== 1) {
      this.setState(prevState => ({
        addToCartProducts: prevState.addToCartProducts - 1,
      }))
    } else {
      this.setState({addToCartProducts: 1})
    }
  }

  getProductItemDetails = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})

    const jwtToken = Cookies.get('jwt_token')
    const {match} = this.props
    const {params} = match
    const {id} = params
    const apiUrl = `https://apis.ccbp.in/products/${id}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(apiUrl, options)
    if (response.ok === true) {
      const data = await response.json()

      const updatedData = {
        id: data.id,
        title: data.title,
        imageUrl: data.image_url,
        totalReviews: data.total_reviews,
        brand: data.brand,
        availability: data.availability,
        rating: data.rating,
        price: data.price,
        description: data.description,
      }
      const updatedSimilarProducts = data.similar_products.map(
        eachSimilarProduct => ({
          title: eachSimilarProduct.title,
          brand: eachSimilarProduct.brand,
          imageUrl: eachSimilarProduct.image_url,
          rating: eachSimilarProduct.rating,
          price: eachSimilarProduct.price,
          id: eachSimilarProduct.id,
        }),
      )
      this.setState({
        productItemDetails: updatedData,
        similarProducts: updatedSimilarProducts,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderLoader = () => (
    <div>
      <Loader
        type="ThreeDots"
        color="#0b69ff"
        height={80}
        width={80}
        className="rendingLoader"
      />
    </div>
  )

  renderProductItemDetails = () => {
    const {productItemDetails, similarProducts, addToCartProducts} = this.state
    const {
      imageUrl,
      title,
      price,
      rating,
      totalReviews,
      description,
      availability,
      brand,
    } = productItemDetails
    return (
      <>
        <div className="product-item-details-container">
          <img src={imageUrl} alt="product" className="product-item-image" />
          <div className="product-text-container">
            <h1 className="product-title">{title}</h1>
            <p className="product-price">Rs {price} /- </p>
            <div className="rating-and-review-container">
              <button className="rating-container" type="button">
                <p className="product-rating">{rating}</p>
                <img
                  src="https://assets.ccbp.in/frontend/react-js/star-img.png"
                  alt="star"
                  className="rating-star"
                />
              </button>
              <p className="total-reviews">{totalReviews} Reviews</p>
            </div>
            <p className="product-description">{description}</p>
            <p className="product-availability">
              Available: <span>{availability}</span>{' '}
            </p>
            <p className="product-availability">
              Brand: <span>{brand}</span>{' '}
            </p>
            <hr className="horizontal-line" />
            <div className="increment-decrement-container">
              <button
                type="button"
                className="minus-btn"
                onClick={this.onDecrement}
              >
                <BsDashSquare className="increment-button" />
              </button>
              <p className="add-cart-item-num">{addToCartProducts}</p>
              <button
                className="plus-btn"
                onClick={this.onIncrement}
                type="button"
              >
                <BsPlusSquare className="decrement-button" />
              </button>
            </div>
            <button className="add-cart-button" type="button">
              ADD TO CART
            </button>
            <Link to="/products">
              <button type="button" className="go-back">
                <RiArrowGoBackLine />
              </button>
            </Link>
          </div>
        </div>
        <div className="similar-products-sec-container">
          <h1 className="similar-products-sec-heading">Similar Products</h1>
          <ul className="similar-products-container">
            {similarProducts.map(eachProduct => (
              <SimilarProductItem
                similarProductDetails={eachProduct}
                key={eachProduct.id}
              />
            ))}
          </ul>
        </div>
      </>
    )
  }

  renderFailureView = () => (
    <div className="error-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-error-view-img.png"
        alt="error view"
        className="failure view"
      />
      <h1 className="error-title">Product Not Found</h1>
      <Link to="/products" className="link-item">
        <button type="button" className="error-btn">
          Continue Shopping
        </button>
      </Link>
    </div>
  )

  renderProductItems = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderProductItemDetails()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoader()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        {this.renderProductItems()}
      </>
    )
  }
}

export default ProductItemDetails
