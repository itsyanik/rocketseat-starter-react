import React, { useEffect, useState } from 'react'
import api from '../../services/api'
import { Link } from 'react-router-dom'
import './main.css'

const Main = () => {

  const [products, setProducts] = useState()
  const [currentPage, setPage] = useState(1)
  const [lastPage, setLastPage] = useState()

  const loadProducts = async (page = currentPage) => {
    const response = await api.get(`/products?page=${page}`)
    const { docs: productData, ...pageInfo } = response.data
    const { pages } = pageInfo

    if (productData) {
      setProducts(productData)
      setLastPage(pages)
    }

    return productData
  }

  const previousPage = () => {
    if (currentPage === 1) return

    const previousPage = currentPage - 1

    setPage(previousPage)
    loadProducts(previousPage)
  }

  const nextPage = () => {
    if (currentPage === lastPage) return

    const nextPage = currentPage + 1
    
    setPage(nextPage)
    loadProducts(nextPage)
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
            <Link to={`/products/${id}`}>Access</Link>
          </article>
        )
      })}
      <div className="actions">
        <button disabled={currentPage === 1} onClick={() => previousPage()}>Previous</button>
        <button disabled={currentPage === lastPage} onClick={() => nextPage()}>Next</button>
      </div>
    </div>
  ) || null
}

export default Main