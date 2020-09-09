import React from 'react'
import RootWrapper from '@/components/RootWrapper'
import 'prism-themes/themes/prism-a11y-dark.css'
import 'prismjs/plugins/command-line/prism-command-line.css'

export const wrapRootElement = ({ element }) => <RootWrapper>{element}</RootWrapper>
