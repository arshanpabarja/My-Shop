import React from 'react'
import styled from './IsLoading.module.css';
function IsLoading() {
  return (
    <div className="overflow-hidden w-screen fixed right-0 left-0 top-0 h-screen flex items-center z-50 justify-center">
      <div className={styled.loader}></div>
    </div>
  )
}

export default IsLoading