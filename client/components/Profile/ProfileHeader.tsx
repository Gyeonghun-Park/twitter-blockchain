import { useState, useEffect } from 'react'
import { BsArrowLeftShort } from 'react-icons/bs'
import { useRouter } from 'next/router'
import Modal from 'react-modal'
import { useTwitter } from '@contexts/TwitterContext'

Modal.setAppElement('#__next')

interface Tweets {
  tweet: string
  timestamp: string
}

interface UserData {
  name: string
  profileImage: string
  coverImage: string
  walletAddress: string
  tweets: Array<Tweets>
  isProfileImageNft: Boolean | undefined
}

const ProfileHeader = () => {
  const router = useRouter()
  const { currentAccount, currentUser } = useTwitter()
  const [userData, setUserData] = useState<UserData>({
    name: '',
    profileImage: '',
    coverImage: '',
    walletAddress: '',
    tweets: [],
    isProfileImageNft: undefined,
  })

  useEffect(() => {
    if (!currentUser) return

    setUserData({
      name: currentUser.name,
      profileImage: currentUser.profileImage,
      walletAddress: currentUser.walletAddress,
      coverImage: currentUser.coverImage,
      tweets: currentUser.tweets,
      isProfileImageNft: currentUser.isProfileImageNft,
    })
  }, [currentUser])

  return (
    <div className={style.wrapper}>
      <div className={style.header}>
        <div onClick={() => router.push('/')} className={style.backButton}>
          <BsArrowLeftShort />
        </div>
        <div className={style.details}>
          <div className={style.primary}>{userData.name}</div>
          <div className={style.secondary}>
            {userData.tweets?.length} Tweets
          </div>
        </div>
      </div>
      <div className={style.coverPhotoContainer}>
        {userData.coverImage ? (
          <img
            src={userData.coverImage}
            alt="cover"
            className={style.coverPhoto}
          />
        ) : (
          <div className={style.coverPhotoDefault}></div>
        )}
      </div>
      <div className={style.profileImageContainer}>
        <div className={true ? 'octa' : style.profileImageContainer}>
          <img
            src={userData.profileImage}
            alt={userData.walletAddress}
            className={true ? style.profileImageNft : style.profileImage}
          />
        </div>
      </div>
      <div className={style.details}>
        <div>
          <div className={style.primary}>{currentUser.name}</div>
        </div>
        <div className={style.secondary}>
          {currentAccount && (
            <>
              @{currentAccount.slice(0, 8)}...{currentAccount.slice(37)}
            </>
          )}
        </div>
      </div>
      <div className={style.nav}>
        <div className={style.activeNav}>Tweets</div>
        <div>Tweets & Replies</div>
        <div>Media</div>
        <div>Likes</div>
      </div>
    </div>
  )
}

export default ProfileHeader

const style = {
  wrapper: `border-b border-[#38444d]`,
  header: `mt-2 flex items-center py-1 px-3`,
  primary: `bg-transparent font-bold outline-none`,
  secondary: `text-xs text-[#8899a6]`,
  backButton: `mr-2 cursor-pointer rounded-full p-1 text-3xl hover:bg-[#313b44]`,
  coverPhotoContainer: `flex h-[15vh] items-center justify-center overflow-hidden`,
  coverPhoto: `h-full w-full object-cover`,
  coverPhotoDefault: `h-full w-full bg-[#2F3336]`,
  profileImageContainer: `mt-[-3rem] mb-2 flex h-[6rem] w-full items-center justify-between rounded-full px-3`,
  profileImage: `h-full rounded-full object-cover`,
  profileImageNft: `h-full object-cover`,
  profileImageMint: `cursor-pointer rounded-full bg-white px-3 py-1 text-black hover:bg-[#8899a6]`,
  details: `px-3`,
  nav: `mt-4 mb-2 flex justify-around text-xs font-semibold text-[#8899a6]`,
  activeNav: `text-white`,
}
