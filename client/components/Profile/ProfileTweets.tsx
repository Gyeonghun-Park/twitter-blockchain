import { useState, useEffect } from 'react'
import { useTwitter } from '@contexts/TwitterContext'
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
  const { currentUser } = useTwitter()
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

  useEffect(() => {
    if (!currentUser) return

    setTweets(currentUser.tweets)
    setAuthor({
      name: currentUser.name,
      profileImage: currentUser.profileImage,
      walletAddress: currentUser.walletAddress,
      isProfileImageNft: currentUser.isProfileImageNft,
    })
  }, [currentUser])

  return (
    <div className={style.wrapper}>
      {tweets?.map((tweet: Tweet, index: number) => (
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
