import { useContext, useEffect } from 'react'
import { BsStars } from 'react-icons/bs'
import { Post } from '@components'
import { TweetBox } from '@components/Home'

interface Tweet {
  author: TweetAuthor
  tweet: string
  timestamp: string
}

interface TweetAuthor {
  name: string
  walletAddress: string
  profileImage: string
  isProfileImageNft: boolean
}

function Feed() {
  return (
    <div className={`${style.wrapper} no-scrollbar`}>
      <div className={style.header}>
        <div className={style.headerTitle}>Home</div>
        <BsStars />
      </div>
      <TweetBox />
      {[].map((tweet: Tweet, index: number) => (
        <Post
          key={index}
          displayName={
            tweet.author.name === 'Unnamed'
              ? `${tweet.author.walletAddress.slice(
                  0,
                  4
                )}...${tweet.author.walletAddress.slice(41)}`
              : tweet.author.name
          }
          userName={`${tweet.author.walletAddress.slice(
            0,
            4
          )}...${tweet.author.walletAddress.slice(41)}`}
          text={tweet.tweet}
          avatar={tweet.author.profileImage}
          isProfileImageNft={tweet.author.isProfileImageNft}
          timestamp={tweet.timestamp}
        />
      ))}
    </div>
  )
}

export default Feed

const style = {
  wrapper: `flex-[2] overflow-y-scroll border-r border-l border-[#38444d]`,
  header: `sticky top-0 z-10 flex items-center justify-between bg-[#15202b] p-4`,
  headerTitle: `text-xl font-bold`,
}
