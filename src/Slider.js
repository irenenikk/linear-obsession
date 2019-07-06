import React from 'react'
import Slider, { createSliderWithTooltip } from 'rc-slider';

const SliderWithTooltip = createSliderWithTooltip(Slider);

export default ({ value, onChange }) => {
  return (
    <div className="slider">
      <div className="heading">Amount of data:</div>
      <SliderWithTooltip
        value={value}
        min={0}
        max={500}
        onChange={onChange}
        step={1}
      />
    </div>
  )
}
