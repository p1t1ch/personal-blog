import React from 'react'
import styled from '@emotion/styled'
import { ThemeProps } from '@theme'
import colorVar from '@/utils/colorVar'

const Block = styled.div(
  ({ theme, topLine, bottomLine }: ThemeProps & { topLine: boolean; bottomLine: boolean; as?: string }) => ({
    position: 'relative',
    '::after, ::before': {
      position: 'absolute',
      left: 0,
      right: 0,
      height: theme.sizes.clipSize,
      backgroundColor: colorVar('primary'),
      clipPath: `polygon(0 0, 100% calc(100% - ${theme.sizes.linesWidth}), 100% 100%, 0 ${theme.sizes.linesWidth})`,
    },
    ...(topLine
      ? {
          '::before': {
            content: '""',
            top: 1,
          },
        }
      : {}),
    ...(bottomLine
      ? {
          '::after': {
            content: '""',
            bottom: 1,
          },
        }
      : {}),
  })
)

const Content = styled.div(
  ({ theme, topLine, bottomLine }: ThemeProps & { topLine: boolean; bottomLine: boolean }) => ({
    position: 'relative',
    zIndex: -1,
    clipPath: `polygon(0 ${theme.sizes.linesWidth}, 100% ${topLine ? theme.sizes.clipSize : '0'}, 100% calc(100% - ${
      theme.sizes.linesWidth
    }), 0 ${bottomLine ? `calc(100% - ${theme.sizes.clipSize})` : '100%'})`,
    textAlign: 'center',
  })
)

interface DiagonalBlockProps {
  /** Section content */
  children: React.ReactNode
  /** Add top line */
  topLine?: boolean
  /** Add bottom line */
  bottomLine?: boolean
  /** Tag to render component with */
  as?: string
}

const DiagonalBlock = ({ children, topLine = false, bottomLine = false, as, ...props }: DiagonalBlockProps) => {
  return (
    <Block as={as} topLine={topLine} bottomLine={bottomLine}>
      <Content topLine={topLine} bottomLine={bottomLine} {...props}>
        {children}
      </Content>
    </Block>
  )
}

export default DiagonalBlock
