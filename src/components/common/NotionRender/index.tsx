import { useEffect } from 'react'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import Image from 'next/image'
import { ExtendedRecordMap } from 'notion-types'
import { NotionRenderer } from 'react-notion-x'
import { useAppSelector } from '@/redux/hook'
import { dark } from '@/redux/slice/theme'

// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-return
const Code = dynamic(() => import('react-notion-x/build/third-party/code').then((m) => m.Code), { ssr: false })
const Collection = dynamic(() => import('react-notion-x/build/third-party/collection').then((m) => m.Collection))
const Equation = dynamic(() => import('react-notion-x/build/third-party/equation').then((m) => m.Equation))

interface NotionPageRendererProps {
  recordMap: ExtendedRecordMap
}

const NotionRender = ({ recordMap }: NotionPageRendererProps) => {
  const { theme } = useAppSelector((state) => state.theme)

  useEffect(() => {
    const tocDom = document.getElementsByClassName('notion-aside-table-of-contents-header')[0] as HTMLElement
    if (tocDom !== null) tocDom.textContent = '📋 목차'
  }, [])

  return (
    <NotionRenderer
      recordMap={recordMap}
      fullPage
      darkMode={theme === dark}
      disableHeader
      minTableOfContentsItems={1}
      pageCover={<></>}
      showTableOfContents
      previewImages={!!recordMap?.preview_images}
      // TOC에 댓글 추가
      pageAside={
        <div className="px-[8px]">
          <a href="#kku-detail-comment" className="notion-table-of-contents-item notion-table-of-contents-item-indent-level-0 p-[8px]">
            <span className="notion-table-of-contents-item-body">💬 댓글</span>
          </a>
        </div>
      }
      components={{
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-return
        propertyDateValue: (dateProperty) => dateProperty.data[0][1][0][1].start_date,
        nextImage: Image,
        nextLink: Link,
        Code,
        Collection,
        Equation,
      }}
    />
  )
}

export default NotionRender
