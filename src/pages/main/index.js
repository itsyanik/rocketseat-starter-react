import React, { useEffect, useState } from 'react'
import api from '../../services/api'

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
        const { _id: id, title} = product;

        return(<h2 key={id}>{title}</h2>)
      })}
    </div>
  )
}

export default Main