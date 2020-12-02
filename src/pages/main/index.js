import React, { useEffect, useState } from 'react'
import api from '../../services/api'
import './main.css'

const Main = () => {

  const [products, setProducts] = useState()
  const loadProducts = async () => {
    const response = await api.get('/products')
    const docs = response.data.docs

    if (docs) {
      setProducts(docs)
    }

    return docs
  }

  useEffect(() => {
    loadProducts()
  }, [])

  return(
    <div className='product-list'>
      {products && products.map(product => {
        const { _id: id, title, description} = product;

        return(
          <article key={id}>
            <strong>{title}</strong>
            <p>{description}</p>
            <a href='#'>Access</a>
          </article>
        )
      })}
    </div>
  )
}

export default Main