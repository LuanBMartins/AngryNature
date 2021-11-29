import React from 'react'

export default function isAuthenticated() {
  const token = localStorage.getItem('token')
  console.log(token)
  if(token){
    return true
  } else {
    return false
  }
}
