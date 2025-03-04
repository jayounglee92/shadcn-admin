import React, { useEffect } from 'react'
import { Color } from '@tiptap/extension-color'
import Highlight from '@tiptap/extension-highlight'
import Link from '@tiptap/extension-link'
import ListItem from '@tiptap/extension-list-item'
import Subscript from '@tiptap/extension-subscript'
import Superscript from '@tiptap/extension-superscript'
import TextAlign from '@tiptap/extension-text-align'
import TextStyle from '@tiptap/extension-text-style'
import Underline from '@tiptap/extension-underline'
import { BubbleMenu, EditorProvider, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import MenuBar from './menu-bar'

const content = `
<h1>
  대웅제약X다이소, 국민 건강 프로젝트 ‘닥터베어’ 26종 출시… 품질∙가격∙접근성으로 온 가족 건강 올케어
</h1>
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
<p>
대웅제약 고품질 건강기능식품 브랜드 ‘닥터베어’가 다이소와 손잡고 국민 건강 프로젝트를 펼친다.
</p>
<p>
대웅제약 (대표 이창재∙박성수)이 다이소에 닥터베어를 공식 출시했다. 이번 제품은 24일부터 전국 다이소 매장 200곳에서 판매를 시작하며, 간 건강, 눈 건강, 혈압∙혈당∙혈행 관리, 체지방 관리 등 소비자들의 다양한 건강 고민에 따라 총 26종의 제품을 선보인다.
</p>
<p>
대웅제약은 셀프 메디케이션(Self-Medication) 시대에 검증된 건강기능식품을 누구나 쉽게, 합리적인 가격으로 접할 수 있도록, ‘국민 건강 프로젝트: 누구나 건강할 권리가 있다’를 통해 다이소와 협력해 고품질 제품을 제공한다. 닥터베어는 ▲온 가족 ‘맞춤형’ 올케어 솔루션 ▲대웅제약의 노하우를 담은 ‘고품질’ 영양 설계▲ 합리적인 ‘가격’ ▲다이소 유통망을 통한 높은 ‘구매 접근성’이 특징이다.</p>
<p>
먼저 닥터베어는 연령∙성별∙건강 고민에 맞춘 ‘온 가족 맞춤형 올케어’ 솔루션을 제공한다. 이번에 출시한 26종은 ▲종합 건강을 위한 종합비타민미네랄, 비타민B ▲간 건강을 위한 밀크씨슬 ▲ 눈 건강을 위한 루테인 ▲뼈 및 관절 건강을 위한 칼슘, 칼슘·마그네슘·비타민D, MSM ▲혈압 관리를 위한 코엔자임Q10 ▲혈당 관리를 위한 바나바잎추출물 ▲혈행 관리를 위한 rTG 오메가3 ▲항산화를 위한 비타민C ▲체지방 관리를 위한 녹차 카테킨, 가르시니아 ▲어린이 종합 건강 비타민, 칼슘비타민 등이다.
</p>
<p>
또한 닥터베어는 소비자가 쉽게 선택할 수 있도록 건강 고민별로 제안 문구를 패키지에 삽입했다. 예를 들어, ‘높은 혈압이 걱정이라면? 코엔자임 Q10’과 같은 문구를 통해 소비자들이 자신에게 필요한 제품을 직관적으로 고를 수 있도록 돕는다.
</p>
`

const extensions = [
  StarterKit,
  Color,
  ListItem,
  TextStyle,
  Highlight,
  Link,
  Subscript,
  Superscript,
  Underline,
  TextAlign.configure({
    types: [
      'heading',
      'paragraph',
      'listItem',
      'bulletList',
      'orderedList',
      'blockquote',
      'image',
    ],
    alignments: ['left', 'center', 'right', 'justify'],
    defaultAlignment: 'left',
  }),
  Highlight.configure({ multicolor: true }),
]

const RichTextEditor = () => {
  const [isEditable, setIsEditable] = React.useState(true)

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
    <EditorProvider
      extensions={extensions}
      content={content}
      editorProps={{
        attributes: {
          class:
            'prose prose-sm sm:prose-base lg:prose-lg xl:prose-2xl m-5 focus:outline-none',
        },
      }}
    >
      <BubbleMenu editor={null}>
        {editor && <MenuBar />}
        {/* <FloatingMenu editor={null}>This is the floating menu</FloatingMenu>*/}
      </BubbleMenu>
    </EditorProvider>
  )
}

export default RichTextEditor
