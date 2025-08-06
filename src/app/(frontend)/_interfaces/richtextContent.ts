// RichTextContent
export interface RichTextContent {
  root: {
    type: 'root'
    format: string
    indent: number
    version: number
    direction: string
    textFormat: number
    children: RichTextNode[]
  }
}

export type RichTextNode = ParagraphNode | LinebreakNode

export interface ParagraphNode {
  type: 'paragraph'
  format: string
  indent: number
  version: number
  direction: string
  textStyle: string
  textFormat: number
  children: RichTextTextNode[]
}

export interface LinebreakNode {
  type: 'linebreak'
  version: number
}

export interface RichTextTextNode {
  type: 'text'
  version: number
  mode: string
  text: string
  style: string
  detail: number
  format: number
}
