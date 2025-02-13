import React from 'react'
import './style.css'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'

type Props = {
  content: string
}

const UpdateSection = ({ content }: Props) => {
  return (
    <>
      {!content ? (
        <div>
          <SkeletonTheme baseColor="#202020" highlightColor="#444">
            <p>
              <Skeleton height={'50vh'} width={'100vw'} />
            </p>
          </SkeletonTheme>
        </div>
      ) : (
        <div
          className="updateContent"
          dangerouslySetInnerHTML={{ __html: content }}
        />
      )}
    </>
  )
}
export default UpdateSection
