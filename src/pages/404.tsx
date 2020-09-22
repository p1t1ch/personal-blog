import React from 'react'
import { PageProps } from 'gatsby'
import Layout from '@/components/Layout'
import Seo from '@/components/Seo'
import Container from '@/components/Container'

const NotFoundPage = ({ location }: PageProps) => {
  return (
    <Layout>
      <Seo title="p1t1ch – Страница не найдена" />
      <Container>
        <h1>Ошибка 404</h1>
        <p>Страница &ldquo;{location.pathname}&rdquo; не найдена</p>
      </Container>
    </Layout>
  )
}

export default NotFoundPage
