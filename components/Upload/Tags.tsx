import { useRef, useState } from 'react'
import { PlusCircle, MinusCircle } from './Icons'
import s from './Tags.module.css'
import { Tag, TagWithImages } from '@/pages/upload/index'

type TagsProps = {
  tags: Tag[]
  setTags: React.Dispatch<React.SetStateAction<Tag[]>>
  allTags: TagWithImages[]
}

function Tags({ tags, setTags, allTags }: TagsProps) {
  const newTagRef = useRef<HTMLInputElement>(null)
  const [tagExists, setTagExists] = useState(false)

  const handleKeyDown = function (event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === 'Enter' && newTagRef.current?.value && newTagRef.current.value.length > 0) {
      handleAddTag()
    }
  }

  function findMatchingTag(name: string, allTags: Tag[]): Tag | undefined {
    return allTags.find((tag) => tag.name.toLowerCase() === name.toLowerCase())
  }

  const handleAddTag = async function () {
    const newTag = newTagRef.current?.value
    if (newTag) {
      if (tags.find((tag) => tag.name.toLowerCase() === newTag.toLowerCase())) {
        setTagExists(true)
        return
      }
      const tagMatch = findMatchingTag(newTag, allTags)
      if (tagMatch) {
        setTags((prev) => [...prev, tagMatch])
        newTagRef.current.value = ''
      } else {
        const freshTag = await fetch('/api/tag', {
          method: 'POST',
          body: JSON.stringify({ name: newTag }),
          headers: {
            'Content-Type': 'application/json',
          },
        })
        const tag = await freshTag.json()
        setTags((prev) => [...prev, tag])
        newTagRef.current.value = ''
      }
    }
  }

  const handleRemoveTag = function (id: string) {
    setTags((prev) => prev.filter((tag) => tag.id !== id))
  }

  return (
    <>
      <div className={s.label}>
        <label htmlFor='newTag'>Tags</label>
        {tagExists && <p>Tag already exists</p>}
      </div>
      <div className={s.tags}>
        {tags.map((tag) => {
          return (
            <div key={tag.id}>
              <p>{tag.name}</p>
              <span onClick={() => handleRemoveTag(tag.id)}>
                <MinusCircle color='var(--warning)' size={18} />
              </span>
            </div>
          )
        })}
        <div className={s.tagInput}>
          <input onChange={() => tagExists && setTagExists(false)} onKeyDown={handleKeyDown} type='text' id='newTag' name='newTag' ref={newTagRef} />
          <span onClick={handleAddTag}>
            <PlusCircle color='var(--primary-color)' size={18} />
          </span>
        </div>
      </div>
    </>
  )
}

export default Tags
