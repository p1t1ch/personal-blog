import React from 'react'
import { PageProps } from 'gatsby'
import Layout from '@/components/Layout'
import Seo from '@/components/Seo'

const NotFoundPage = ({ location }: PageProps) => {
  return (
    <Layout>
      <Seo />
      <h1>Ошибка 404</h1>
      <p>Страница &ldquo;{location.pathname}&rdquo; не найдена</p>
    </Layout>
  )
}

export default NotFoundPage
