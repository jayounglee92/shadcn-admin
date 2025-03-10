import React, { useEffect } from 'react'
import { Color } from '@tiptap/extension-color'
import Highlight from '@tiptap/extension-highlight'
import Image from '@tiptap/extension-image'
import Link from '@tiptap/extension-link'
import ListItem from '@tiptap/extension-list-item'
import TextAlign from '@tiptap/extension-text-align'
import TextStyle from '@tiptap/extension-text-style'
import Underline from '@tiptap/extension-underline'
import { EditorProvider, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { ImageNode } from './image-node'
import MenuBar from './menu-bar'

const content = `
<h1>
  h1: 대웅제약X다이소, 국민 건강 프로젝트 ‘닥터베어’ 26종 출시… 품질∙가격∙접근성으로 온 가족 건강 올케어
</h1>
<h2>
h2: 대웅제약 고품질 건강기능식품 브랜드 ‘닥터베어’가 다이소와 손잡고 국민 건강 프로젝트를 펼친다.
</h2>
<h3>
h3 : 대웅제약 (대표 이창재∙박성수)이 다이소에 닥터베어를 공식 출시했다. 이번 제품은 24일부터 전국 다이소 매장 200곳에서 판매를 시작하며, 간 건강, 눈 건강, 혈압∙혈당∙혈행 관리, 체지방 관리 등 소비자들의 다양한 건강 고민에 따라 총 26종의 제품을 선보인다.
</h3>
<p>
p : 또한 닥터베어는 소비자가 쉽게 선택할 수 있도록 건강 고민별로 제안 문구를 패키지에 삽입했다. 예를 들어, ‘높은 혈압이 걱정이라면? 코엔자임 Q10’과 같은 문구를 통해 소비자들이 자신에게 필요한 제품을 직관적으로 고를 수 있도록 돕는다.
</p>
<ul>
  <li>
    ‘누구가 건강할 권리가 있다’ 국민 건강 프로젝트 ‘닥터베어’, 24일 전국 다이소 200개 매장 출시
  </li>
  <li>
    온 가족 건강 고민 ‘올케어’ 26종… 대웅제약 노하우 담은 고품질 영양 설계
  </li>
   <li>
    합리적인 가격, 전국 곳곳에 분포한 다이소 유통망으로 소비자 접근성 강화
  </li>
</ul>
<ol>
  <li>
    ‘누구가 건강할 권리가 있다’ 국민 건강 프로젝트 ‘닥터베어’, 24일 전국 다이소 200개 매장 출시
  </li>
  <li>
    온 가족 건강 고민 ‘올케어’ 26종… 대웅제약 노하우 담은 고품질 영양 설계
  </li>
   <li>
    합리적인 가격, 전국 곳곳에 분포한 다이소 유통망으로 소비자 접근성 강화
  </li>
</ol>
`

const extensions = [
  StarterKit,
  Color,
  ListItem,
  TextStyle,
  Link,
  Underline,
  TextAlign.configure({
    types: [
      'heading',
      'paragraph',
      'listItem',
      'bulletList',
      'orderedList',
      'image',
    ],
    alignments: ['left', 'center', 'right', 'justify'],
    defaultAlignment: 'left',
  }),
  Highlight.configure({ multicolor: true }),
  Image.configure({
    inline: true,
  }),
  ImageNode,
  Color.configure({
    types: ['textStyle'],
  }),
]

const RichTextEditor = () => {
  const [isEditable] = React.useState(true)

  const editor = useEditor({
    extensions: extensions,
    content: content,
  })

  useEffect(() => {
    if (editor) {
      editor.setEditable(isEditable)
    }
  }, [isEditable, editor])

  return (
    <>
      <EditorProvider
        extensions={extensions}
        content={content}
        // editorProps={{
        //   attributes: {
        //     class:
        //       'prose prose-sm sm:prose-base lg:prose-lg xl:prose-2xl m-5 focus:outline-none',
        //   },
        // }}
      >
        {/* https://github.com/ueberdosis/tiptap/discussions/1014 */}
        {/* <BubbleMenu editor={null}>{editor && <MenuBar />}</BubbleMenu> */}

        {editor && <MenuBar />}
      </EditorProvider>
    </>
  )
}

export default RichTextEditor
