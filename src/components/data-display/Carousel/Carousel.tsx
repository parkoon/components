import React, { useState, useEffect, useRef } from 'react'
import styled from 'styled-components'

import CarouselItem from './CarouselItem'
import palette from '../../../themes/palette'

type CarouselItemWrapperProps = {
  active: number
  slideWidth: number
  totalWidth: number
}
const CarouselItemWrapper = styled.ul<CarouselItemWrapperProps>`
  margin: 0;
  padding: 0;
  list-style: none;

  transition: 0.5s;
  overflow: auto;

  width: ${props => props.totalWidth}px;
  transform: ${props => `translateX(${props.active * -props.slideWidth}px)`};
`

const StyledCarouselWrapper = styled.div`
  position: relative;
`
const StyledIndicatorWrapper = styled.div`
  position: absolute;
  bottom: 12px;
  left: 50%;

  transform: translateX(-50%);
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
`
const StyledIndicator = styled.input.attrs({ type: 'radio', name: 'carousel' })`
  display: none;
  &:checked + label {
    width: 32px;
    background: ${palette.primary};
  }
`

const StyledIndicatorLabel = styled.label`
  display: inline-block;
  width: 24px;
  height: 6px;
  padding: 3px;
  border-radius: 2px;
  background: rgba(0, 0, 0, 0.3);
  transition: 0.2s;
  box-sizing: border-box;
  cursor: pointer;
  margin-right: 7px;

  &:hover {
    background: rgba(255, 255, 255, 0.3);
  }
`

const StyledSlideTrack = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;
`

type CarouselProps = {
  children: React.ReactNode
}

function Carousel({ children }: CarouselProps) {
  const [active, setActive] = useState(0)

  const [slideWidth, setSlideWidth] = useState(window.innerWidth)

  const slideCount = React.Children.count(children)

  const totalSlideWidth = slideWidth * slideCount

  const slideWrapperRef = useRef(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setActive(Number(e.target.value))
  }

  const handleResize = () => {
    setSlideWidth(window.innerWidth)
  }

  useEffect(() => {
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('reisze', handleResize)
    }
  }, [])

  return (
    <StyledCarouselWrapper>
      <StyledSlideTrack>
        <CarouselItemWrapper active={active} ref={slideWrapperRef} totalWidth={totalSlideWidth} slideWidth={slideWidth}>
          {Array.isArray(children) ? (
            children.map((child, index) => <CarouselItem key={index} child={child} slideWidth={slideWidth} />)
          ) : (
            <CarouselItem key={0} child={children} slideWidth={slideWidth} />
          )}
        </CarouselItemWrapper>
      </StyledSlideTrack>

      <StyledIndicatorWrapper>
        <li>
          <StyledIndicator id={'1'} value={0} onChange={handleChange} checked={active === 0} />
          <StyledIndicatorLabel htmlFor={'1'} />
        </li>
        <li>
          <StyledIndicator id={'2'} value={1} onChange={handleChange} checked={active === 1} />
          <StyledIndicatorLabel htmlFor={'2'} />
        </li>

        <li>
          <StyledIndicator id={'3'} value={2} onChange={handleChange} checked={active === 2} />
          <StyledIndicatorLabel htmlFor={'3'} />
        </li>
        <li>
          <StyledIndicator id={'4'} value={3} onChange={handleChange} checked={active === 3} />
          <StyledIndicatorLabel htmlFor={'4'} />
        </li>
      </StyledIndicatorWrapper>
    </StyledCarouselWrapper>
  )
}

export default Carousel
