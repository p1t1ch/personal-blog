import React, { useEffect, useState } from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import { useTheme } from 'emotion-theming'
import { Theme } from '@theme'
import randomInt from '@/utils/randomInt'

interface SubheadingQuery {
  site: {
    siteMetadata: {
      subheadingPrefix: string
      subheadingPostfix: string
      subheadingTags: string[]
    }
  }
}

const Subheading = () => {
  const theme = useTheme<Theme>()

  const {
    site: { siteMetadata: data },
  }: SubheadingQuery = useStaticQuery(graphql`
    {
      site {
        siteMetadata {
          subheadingPrefix
          subheadingPostfix
          subheadingTags
        }
      }
    }
  `)

  const [tags, setTags] = useState<string[]>([])

  useEffect(() => {
    const tagsCopy = [...data.subheadingTags]
    const tagsCount = tagsCopy.length

    const randomTags: string[] = []

    for (let i = 0; i < 3; i++) {
      const tagIndex = randomInt(0, tagsCount - (1 + i))
      randomTags.push(tagsCopy[tagIndex])
      tagsCopy.splice(tagIndex, 1)
    }

    setTags(randomTags)
  }, [data.subheadingTags])

  return (
    <p css={theme.typography.styles.subheading}>
      {tags.length
        ? `${data.subheadingPrefix}${'аиуоэ'.includes(tags[0][0]) ? 'б' : ''} ${tags.join(', ')} ${
            data.subheadingPostfix
          }`
        : ''}
    </p>
  )
}

export default Subheading
