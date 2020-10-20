import { ColorSchemeVars } from '@theme'

const colorVar = (varName: ColorSchemeVars) => `var(--color-${varName})`

export default colorVar
