import React, { useEffect, useState } from 'react'
import api from '../../services/api'
import { Link } from 'react-router-dom'
import './main.css'

interface ProductList {
  data: {
    docs: object[],
    pages: number
  }
}

const Main: React.FC = () => {

  const [products, setProducts] = useState<ProductList>()
  const [currentPage, setPage] = useState<ProductList>(1)
  const [lastPage, setLastPage] = useState()

  useEffect(() => {
    const loadProducts = async (page = currentPage) => {
      const response: ProductList = await api.get(`/products?page=${page}`)
      const { docs: productData, ...pageInfo } = response.data
      const { pages } = pageInfo
  
      if (productData) {
        setProducts(productData)
        setLastPage(pages)
      }
  
      return productData
    }

    loadProducts()
  }, [currentPage])

  const previousPage = () => {
    if (currentPage === 1) return

    const previousPage = currentPage - 1

    setPage(previousPage)
  }

  const nextPage = () => {
    if (currentPage === lastPage) return

    const nextPage = currentPage + 1
    
    setPage(nextPage)
  }

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