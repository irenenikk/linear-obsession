import React from 'react'
import Slider, { createSliderWithTooltip } from 'rc-slider';

const SliderWithTooltip = createSliderWithTooltip(Slider);

export default ({ value, onChange, title, min, max }) => {
  return (
    <div className="slider">
      {title}:
      <SliderWithTooltip
        value={value}
        min={min}
        max={max}
        onChange={onChange}
        step={0.1}
      />
    </div>
  )
}
