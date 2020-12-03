import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import api from '../../services/api'
import './product.css'

const Product = () => {
  const [product, setProduct] = useState();
  const { id } = useParams()
  
  const loadProduct = async () => {
    const response = await api.get(`/products/${id}`)
    const product = response.data

    if (product) {
      setProduct(product)
    }

    return product
  }

  useEffect(() => {
    loadProduct()
  }, [])

  return (product &&
   (
    <div className="product-info">
      <h1>{product.title}</h1>
      <p>{product.description}</p>
      <p>
        URL: <a href={product.url}>{product.url}</a>
      </p>
    </div>
  )) || null
}

export default Product