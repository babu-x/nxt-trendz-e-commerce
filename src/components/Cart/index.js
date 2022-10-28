import {Component} from 'react'
import Header from '../Header'
import './index.css'

class Cart extends Component {
  render() {
    return (
      <>
        <Header />
        <div className="cart-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-cart-img.png"
            alt="cart"
            className="cart-img"
          />
        </div>
      </>
    )
  }
}

export default Cart
