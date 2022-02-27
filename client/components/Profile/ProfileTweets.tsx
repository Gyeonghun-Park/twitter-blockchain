import { useState } from 'react'
import { Post } from '@components'

interface Tweet {
  timestamp: string
  tweet: string
}

interface Tweets extends Array<Tweet> {}

interface Author {
  name: string
  profileImage: string
  walletAddress: string
  isProfileImageNft: Boolean | undefined
}

const ProfileTweets = () => {
  const [tweets, setTweets] = useState<Tweets>([
    {
      timestamp: '',
      tweet: '',
    },
  ])
  const [author, setAuthor] = useState<Author>({
    name: '',
    profileImage: '',
    walletAddress: '',
    isProfileImageNft: undefined,
  })

  return (
    <div className={style.wrapper}>
      {[]?.map((tweet: Tweet, index: number) => (
        <Post
          key={index}
          displayName={
            author.name === 'Unnamed'
              ? `${author.walletAddress.slice(
                  0,
                  4
                )}...${author.walletAddress.slice(41)}`
              : author.name
          }
          userName={`${author.walletAddress.slice(
            0,
            4
          )}...${author.walletAddress.slice(41)}`}
          text={tweet.tweet}
          avatar={author.profileImage}
          timestamp={tweet.timestamp}
          isProfileImageNft={author.isProfileImageNft}
        />
      ))}
    </div>
  )
}

const style = {
  wrapper: `no-scrollbar`,
  header: `sticky top-0 z-10 flex items-center justify-between bg-[#15202b] p-4`,
  headerTitle: `text-xl font-bold`,
}

export default ProfileTweets
