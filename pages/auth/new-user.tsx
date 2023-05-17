import { useState } from 'react'
import { prisma } from '@/prisma-client'
import { useSession } from 'next-auth/react'

export default function NewUser() {
  const { data: session } = useSession()
  console.log(session)
  const [isOrg, setIsOrg] = useState(false)
  async function handleForm() {
    const updateUser = await prisma.user.update({
      where: {
        id: session?.user?.id,
      },
      data: {
        isOrganization: isOrg ? 'ORG' : 'USER',
      },
    })
  }

  return (
    <>
      <h1>onboarding</h1>
      <form onSubmit={handleForm}>
        <label htmlFor='role'>Are you an organization?</label>
        <input onChange={() => setIsOrg(!isOrg)} checked={isOrg} type='checkbox' />
        <button>submit</button>
      </form>
    </>
  )
}
