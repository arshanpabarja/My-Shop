import React from 'react'
import styled from './IsLoading.module.css';
function SmallLoading() {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className={styled.loader}></div>
    </div>
  )
}

export default SmallLoading