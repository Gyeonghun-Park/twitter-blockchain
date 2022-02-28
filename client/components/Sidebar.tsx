import { useState } from 'react'
import { useRouter } from 'next/router'
import Modal from 'react-modal'
import { RiHome7Line, RiHome7Fill, RiFileList2Fill } from 'react-icons/ri'
import { BiHash } from 'react-icons/bi'
import { FiBell, FiMoreHorizontal } from 'react-icons/fi'
import { HiOutlineMail, HiMail } from 'react-icons/hi'
import { FaRegListAlt, FaHashtag, FaBell } from 'react-icons/fa'
import { CgMoreO } from 'react-icons/cg'
import { VscTwitter } from 'react-icons/vsc'
import {
  BsBookmark,
  BsBookmarkFill,
  BsPerson,
  BsPersonFill,
} from 'react-icons/bs'
import { useTwitter } from '@contexts/TwitterContext'
import { customStyles } from '@lib/constants'
import { SidebarOption } from '@components'
import { ProfileImageMinter } from '@components/Profile/mintingModal'

interface SidebarProps {
  initialSelectedIcon: string
}

function Sidebar({ initialSelectedIcon }: SidebarProps) {
  const [selected, setSelected] = useState<String>(initialSelectedIcon)
  const { currentAccount, currentUser } = useTwitter()
  const router = useRouter()

  return (
    <div className={style.wrapper}>
      <div className={style.twitterIconContainer}>
        <VscTwitter />
      </div>
      <div className={style.navContainer}>
        <SidebarOption
          Icon={selected === 'Home' ? RiHome7Fill : RiHome7Line}
          text="Home"
          isActive={selected === 'Home'}
          setSelected={setSelected}
          redirect={'/'}
        />
        <SidebarOption
          Icon={selected === 'Explore' ? FaHashtag : BiHash}
          text="Explore"
          isActive={selected === 'Explore'}
          setSelected={setSelected}
        />
        <SidebarOption
          Icon={selected === 'Notifications' ? FaBell : FiBell}
          text="Notifications"
          isActive={selected === 'Notifications'}
          setSelected={setSelected}
        />
        <SidebarOption
          Icon={selected === 'Messages' ? HiMail : HiOutlineMail}
          text="Messages"
          isActive={selected === 'Messages'}
          setSelected={setSelected}
        />
        <SidebarOption
          Icon={selected === 'Bookmarks' ? BsBookmarkFill : BsBookmark}
          text="Bookmarks"
          isActive={selected === 'Bookmarks'}
          setSelected={setSelected}
        />
        <SidebarOption
          Icon={selected === 'Lists' ? RiFileList2Fill : FaRegListAlt}
          text="Lists"
          isActive={selected === 'Lists'}
          setSelected={setSelected}
        />
        <SidebarOption
          Icon={selected === 'Profile' ? BsPersonFill : BsPerson}
          text="Profile"
          isActive={selected === 'Profile'}
          setSelected={setSelected}
          redirect={'/profile'}
        />
        <SidebarOption Icon={CgMoreO} text="More" />
        <div
          onClick={() =>
            router.push(`${router.pathname}/?mint=${currentAccount}`)
          }
          className={style.tweetButton}
        >
          Mint
        </div>
      </div>
      <div className={style.profileButton}>
        <div className={style.profileLeft}>
          <img
            src={currentUser.profileImage}
            alt="profile"
            className={
              currentUser.isProfileImageNft
                ? `${style.profileImage} smallocta`
                : style.profileImage
            }
          />
        </div>
        <div className={style.profileRight}>
          <div className={style.details}>
            <div className={style.name}>{currentUser.name}</div>
            <div className={style.handle}>
              @{currentAccount.slice(0, 6)}...{currentAccount.slice(39)}
            </div>
          </div>
          <div className={style.moreContainer}>
            <FiMoreHorizontal />
          </div>
        </div>
      </div>

      <Modal
        isOpen={Boolean(router.query.mint)}
        onRequestClose={() => router.back()}
        style={customStyles}
      >
        <ProfileImageMinter />
      </Modal>
    </div>
  )
}

export default Sidebar

const style = {
  wrapper: `flex flex-[0.7] flex-col px-8`,
  twitterIconContainer: `m-4 text-3xl`,
  tweetButton: `mt-[20px] flex h-[50px] cursor-pointer items-center justify-center rounded-3xl bg-[#1d9bf0] font-bold hover:bg-[#1b8cd8]`,
  navContainer: `flex-1`,
  profileButton: `mb-6 flex cursor-pointer items-center rounded-[100px] p-2 hover:bg-[#333c45]`,
  profileLeft: `item-center flex-1 justify-center`,
  profileImage: `h-12 w-12 rounded-full`,
  profileRight: `flex flex-1`,
  details: `flex-1`,
  name: `text-lg`,
  handle: `text-[#8899a6]`,
  moreContainer: ` mr-2 flex items-center`,
}
