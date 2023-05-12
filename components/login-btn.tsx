import { signIn, signOut, useSession } from 'next-auth/react'
import { FC } from 'react'
import s from '@/styles/login-btn.module.css'

interface LoginBtnProps {}

const LoginBtn: FC<LoginBtnProps> = () => {
  const { data: session } = useSession()

  console.log(session)

  const status = session ? `Signed in as ${session.user?.email}` : 'Not signed in'

  const handleClick = () => {
    if (session) {
      signOut()
    } else {
      signIn()
    }
  }

  return (
    <div className={s.btnWrapper}>
      <p>{status}</p>
      <button className={s.btn} onClick={handleClick}>
        {session ? 'Sign Out' : 'Sign In'}
      </button>
    </div>
  )
}

export default LoginBtn
