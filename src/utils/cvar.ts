const colorVars = ['primary', 'secondary', 'active'] as const
const cvar = (varName: typeof colorVars[number]) => `var(--color-${varName})`

export default cvar
