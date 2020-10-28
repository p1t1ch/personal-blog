import React from 'react'
import styled from '@emotion/styled'
import { ThemeProps } from '@theme'
import colorVar from '@/utils/colorVar'

const DiagonalLine = styled.div(({ theme }: ThemeProps) => ({
  width: '100%',
  height: theme.sizes.clipSize,
  backgroundColor: colorVar('primary'),
  clipPath: `polygon(0 0, 100% calc(100% - ${theme.sizes.linesWidth}), 100% 100%, 0 ${theme.sizes.linesWidth})`,
}))

const Content = styled.div(
  ({ theme, topLine, bottomLine }: ThemeProps & { topLine: boolean; bottomLine: boolean }) => ({
    ...(topLine ? { marginTop: `calc(-${theme.sizes.clipSize} + ${theme.sizes.linesWidth})` } : {}),
    ...(bottomLine ? { marginBottom: `calc(-${theme.sizes.clipSize} + ${theme.sizes.linesWidth})` } : {}),
    clipPath: `polygon(0 0, 100% ${
      topLine ? `calc(${theme.sizes.clipSize} - ${theme.sizes.linesWidth})` : '0'
    }, 100% 100%, 0 ${bottomLine ? `calc(100% - ${theme.sizes.clipSize} + ${theme.sizes.linesWidth})` : '100%'})`,
    textAlign: 'center',
  })
)

interface DiagonalSectionProps {
  /** Section content */
  children: React.ReactNode
  /** Add top line */
  topLine?: boolean
  /** Add bottom line */
  bottomLine?: boolean
}

const DiagonalSection = ({ children, topLine = false, bottomLine = false, ...props }: DiagonalSectionProps) => {
  return (
    <section>
      {topLine && <DiagonalLine />}
      <Content topLine={topLine} bottomLine={bottomLine} {...props}>
        {children}
      </Content>
      {bottomLine && <DiagonalLine />}
    </section>
  )
}

export default DiagonalSection
