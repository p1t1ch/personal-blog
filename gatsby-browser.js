import React from 'react'
import RootWrapper from '@/components/RootWrapper'
// import 'prismjs/themes/prism-okaidia.css'
import 'prismjs/themes/prism-solarizedlight.css'
// import 'prismjs/themes/prism-tomorrow.css'
import 'prismjs/plugins/line-numbers/prism-line-numbers.css'
import 'prismjs/plugins/command-line/prism-command-line.css'

export const wrapRootElement = ({ element }) => <RootWrapper>{element}</RootWrapper>
