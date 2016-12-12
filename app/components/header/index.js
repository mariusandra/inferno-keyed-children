import './styles.scss'

import React, { Component } from 'react'
import { connect } from 'react-redux'

import { push } from 'react-router-redux'
import { createStructuredSelector } from 'reselect'

const selector = createStructuredSelector({
  path: (state) => state.routing.locationBeforeTransitions.pathname
})

class Header extends Component {
  static propTypes = {
    // libs
    dispatch: React.PropTypes.func.isRequired,

    // react-router
    path: React.PropTypes.string.isRequired
  }

  static defaultProps = {
  }

  render () {
    const { dispatch, path } = this.props

    function load (url) {
      return (event) => { event.preventDefault(); dispatch(push(url)) }
    }

    return (
      <header className='body-header'>
        <nav>
          <a href='/' onClick={load('/')} className={path === '/' ? 'active' : ''}>Kea example</a>
          <a href='/todos' onClick={load('/todos')} className={path.indexOf('/todos') === 0 ? 'active' : ''}>Todos</a>
          <a href='#'>Form example</a>
        </nav>
      </header>
    )
  }
}

export default connect(selector)(Header)
