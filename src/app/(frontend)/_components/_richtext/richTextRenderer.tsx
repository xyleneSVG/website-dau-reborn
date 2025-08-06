import React, { JSX } from 'react'

export const RichTextRenderer = ({ content }: { content: any }) => {
  if (!content || !Array.isArray(content.children)) return null

  const renderTextNode = (child: any, key: number) => {
    if (child.type === 'linebreak') return <br key={key} />

    if (child.type === 'text') {
      const style = []
      if (child.format & 1) style.push('font-bold') // Bold
      if (child.format & 2) style.push('italic') // Italic
      if (child.format & 4) style.push('line-through') // Strikethrough
      if (child.format & 8) style.push('underline') // Underline
      if (child.format & 16) style.push('subscript') // Subscript
      if (child.format & 32) style.push('superscript') // Superscript
      if (child.format & 64) style.push('font-mono bg-gray-200 px-1 rounded') // Inline code

      return (
        <span key={key} className={style.join(' ')}>
          {child.text}
        </span>
      )
    }

    return null
  }

  const renderLinkNode = (node: any, key: number) => {
    const { fields, children } = node
    const { url, newTab, linkType, doc } = fields || {}

    let href = '#'
    if (linkType === 'custom') {
      href = url || '#'
    } else if (linkType === 'internal' && doc?.value?.pageKey) {
      href = doc.value.pageKey
    }

    return (
      <a
        key={key}
        href={href}
        target={newTab ? '_blank' : '_self'}
        rel={newTab ? 'noopener noreferrer' : undefined}
        className="text-blue-600 underline hover:text-blue-800"
      >
        {children?.map((child: any, j: number) =>
          child.type === 'text' ? renderTextNode(child, j) : null,
        )}
      </a>
    )
  }

  const renderChildren = (children: any[]) => {
    return children.map((child, index) => {
      if (child.type === 'linebreak') return <br key={index} />
      if (child.type === 'text') return renderTextNode(child, index)
      if (child.type === 'link') return renderLinkNode(child, index)
      return null
    })
  }

  return (
    <div className="font-extralight text-black text-[14px] md:text-[16px] lg:text-[18px] xl:text-[20px] 2xl:text-[24px]">
      {content.children.map((node: any, i: number) => {
        switch (node.type) {
          case 'paragraph':
            let alignClass = ''
            switch (node.format) {
              case 'left':
                alignClass = 'text-left'
                break
              case 'center':
                alignClass = 'text-center'
                break
              case 'right':
                alignClass = 'text-right'
                break
              case 'justify':
                alignClass = 'text-justify'
                break
              default:
                alignClass = ''
            }

            return (
              <p key={i} className={`mb-2 ${alignClass}`}>
                {renderChildren(node.children || [])}
              </p>
            )

          case 'heading':
            const HeadingTag =
              `h${[1, 2, 3, 4, 5, 6].includes(Number(node.tag)) ? node.tag : 2}` as keyof JSX.IntrinsicElements
            return (
              <HeadingTag
                key={i}
                className="text-[16px] font-extralight md:text-[20px] lg:text-[28px] xl:text-[32px] 2xl:text-[40px] leading-tight"
              >
                {renderChildren(node.children || [])}
              </HeadingTag>
            )

          case 'blockquote':
            return (
              <blockquote
                key={i}
                className="border-l-4 border-gray-400 pl-4 italic text-gray-700 mb-4"
              >
                {renderChildren(node.children || [])}
              </blockquote>
            )

          case 'list':
            const ListTag = node.listType === 'ordered' ? 'ol' : 'ul'
            return (
              <ListTag key={i} className="list-inside list-disc mb-4">
                {node.children?.map((item: any, j: number) => (
                  <li key={j}>{renderChildren(item.children || [])}</li>
                ))}
              </ListTag>
            )

          case 'linebreak':
            return <br key={i} />

          case 'link':
            return renderLinkNode(node, i)

          default:
            return null
        }
      })}
    </div>
  )
}
