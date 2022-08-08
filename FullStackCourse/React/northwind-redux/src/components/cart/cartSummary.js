import React, {Component} from 'react';
import {Badge, DropdownItem, DropdownMenu, DropdownToggle, NavItem, NavLink, UncontrolledDropdown} from "reactstrap";
import {connect} from "react-redux";

class CartSummary extends Component {
    renderEmpty() {
        return (
            <NavItem>
                <NavLink>Cart is Empty</NavLink>
            </NavItem>
        );
    }

    renderSummary() {
        return (
            <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                    Cart
                </DropdownToggle>
                <DropdownMenu right>
                    <DropdownItem>
                        {
                            this.props.cart.map(cartItem => (
                                <DropdownItem key={cartItem.product.id}>
                                    {
                                        cartItem.product.productName
                                    }
                                    <Badge color="success">{cartItem.quantity}</Badge>
                                </DropdownItem>
                            ))
                        }
                    </DropdownItem>
                    <DropdownItem divider/>
                    <DropdownItem>
                        Go to Cart
                    </DropdownItem>
                </DropdownMenu>
            </UncontrolledDropdown>
        );
    }

    render() {
        return (
            <div>
                {
                    this.props.cart.length > 0 ? this.renderSummary() : this.renderEmpty()
                }
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        cart: state.cartReducer
    }
}

export default connect(mapStateToProps)(CartSummary);