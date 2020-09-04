import React from 'react'
import Layout from '@/components/Layout'
import Seo from '@/components/Seo'

const IndexPage = () => {
  return (
    <Layout isHome>
      <Seo title="Главная страница" />
      <h1>Главная страница</h1>
    </Layout>
  )
}

export default IndexPage
