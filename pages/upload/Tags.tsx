import { useRef, useState } from 'react'
import { RxPlusCircled, RxMinusCircled } from 'react-icons/rx'
import s from './Tags.module.css'
import { Tag } from './index'

type TagsProps = {
  tags: Tag[]
  setTags: React.Dispatch<React.SetStateAction<Tag[]>>
}

function Tags({ tags, setTags }: TagsProps) {
  const newTagRef = useRef<HTMLInputElement>(null)

  const handleKeyDown = function (event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === 'Enter' && newTagRef.current?.value && newTagRef.current.value.length > 0) {
      handleAddTag()
    }
  }

  const handleAddTag = function () {
    const newTag = newTagRef.current?.value
    if (newTag) {
      setTags((prev) => [...prev, { name: newTag, id: prev.length + 1 }])
      newTagRef.current.value = ''
    }
  }

  const handleRemoveTag = function (id: number) {
    setTags((prev) => prev.filter((tag) => tag.id !== id))
  }

  return (
    <>
      <label htmlFor='newTag'>Tags</label>
      <div className={s.tags}>
        {tags.map((tag) => {
          return (
            <div key={tag.id}>
              <p>{tag.name}</p>
              <span onClick={() => handleRemoveTag(tag.id)}>
                <RxMinusCircled color='var(--warning)' />
              </span>
            </div>
          )
        })}
        <div className={s.tagInput}>
          <input onKeyDown={handleKeyDown} type='text' id='newTag' name='newTag' ref={newTagRef} />
          <span onClick={handleAddTag}>
            <RxPlusCircled color='var(--primary-color)' size={18} />
          </span>
        </div>
      </div>
    </>
  )
}

export default Tags
