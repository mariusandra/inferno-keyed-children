import './styles.scss'

import React, { Component } from 'react'
import { connectMapping, propTypesFromMapping } from 'kea/logic'

import Slider from './slider'

import sceneLogic from './logic'
import sliderLogic from './slider/logic'

const mapping = {
  actions: [
    sceneLogic, [
      'setBroken'
    ]
  ],
  props: [
    sceneLogic, [
      'broken'
    ]
  ]
}

const FunnyComponent = (props) => <div>{`${props.id}`}</div>

class HomepageScene extends Component {
  static propTypes = propTypesFromMapping(mapping)

  render () {
    const { broken } = this.props
    const { setBroken } = this.props.actions

    return (
      <div className='homepage-scene'>
        <p>
          <FunnyComponent id='1' key='key-1' />
          {broken ? null : <FunnyComponent id='2' key='key-1' />}
          <FunnyComponent id='3' key='key-1' />
        </p>
        <p>
          <button onClick={setBroken}>Break me!</button>
        </p>
      </div>
    )
  }
}

export default connectMapping(mapping)(HomepageScene)
