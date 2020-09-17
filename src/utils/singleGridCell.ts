import { CSSObject } from '@emotion/core'

const singleGridCell: CSSObject = {
  display: 'grid',
  gridTemplateAreas: '"cell"',
  '> *': { gridArea: 'cell' },
}

export default singleGridCell
