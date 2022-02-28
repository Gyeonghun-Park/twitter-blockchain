import { useEffect } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useTwitter } from '@contexts/TwitterContext'
import checkMark from '@images/check.png'

const FinishedState = () => {
  const router = useRouter()
  const { getCurrentUserDetails } = useTwitter()

  useEffect(() => {
    getCurrentUserDetails()
  })

  return (
    <div className={style.wrapper}>
      <div className={style.title}>Minting Successful!</div>
      <Image src={checkMark} alt="checkmark" height={100} width={100} />
      <div onClick={() => router.push('/')} className={style.closeButton}>
        Close
      </div>
    </div>
  )
}

export default FinishedState

const style = {
  wrapper: `flex h-[20rem] w-[35rem] flex-col items-center justify-center rounded-3xl bg-[#15202b] p-10 text-white`,
  title: `mb-6 text-xl font-semibold`,
  closeButton: `mt-6 cursor-pointer rounded-full bg-white px-3 py-1 text-black hover:bg-[#8899a6]`,
}
