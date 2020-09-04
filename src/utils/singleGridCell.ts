import { CSSObject } from '@emotion/core'

const singleGridCell: CSSObject = {
  display: 'grid',
  gridTemplateAreas: '"cell"',
  alignItems: 'center',
  '> *': { gridArea: 'cell' },
}

export default singleGridCell
