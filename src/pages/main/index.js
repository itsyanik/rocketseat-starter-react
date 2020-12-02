import React, { useEffect } from 'react'
import api from '../../services/api'

const Main = () => {
  const loadProducts = async () => {
    const response = await api.get('/products')
    
    return response.data
  }

  useEffect(() => {
    loadProducts()
  }, [])

  return(
    <div>
      <h1>Hello Rocketseat</h1>
    </div>
  )
}

export default Main