import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactElement,
  Dispatch,
  SetStateAction,
} from 'react'
import { useRouter } from 'next/router'
import { client } from '@lib/client'
declare var window: any

type TwitterProps = {
  appStatus: string
  currentAccount: string
  connectWallet: () => Promise<void>
  tweets: never[]
  fetchTweets: () => Promise<void>
  setAppStatus: Dispatch<SetStateAction<string>>
  getNftProfileImage: (
    imageUri: string,
    isNft: boolean
  ) => Promise<string | undefined>
  currentUser: {}
  getCurrentUserDetails: (userAccount?: string) => Promise<void>
}

export const TwitterContext = createContext<Partial<TwitterProps>>({})

interface ProviderProps {
  children: ReactElement | ReactElement[]
}

export function TwitterProvider({ children }: ProviderProps) {
  const [appStatus, setAppStatus] = useState('')
  const [currentAccount, setCurrentAccount] = useState('')
  const [currentUser, setCurrentUser] = useState({})
  const [tweets, setTweets] = useState([])
  const router = useRouter()

  useEffect(() => {
    checkIfWalletIsConnected()
  }, [])

  useEffect(() => {
    if (!currentAccount && appStatus == 'connected') return
    getCurrentUserDetails(currentAccount)
    fetchTweets()
  }, [currentAccount, appStatus])

  const checkIfWalletIsConnected = async () => {
    if (!window.ethereum) return setAppStatus('noMetaMask')
    try {
      const addressArray = await window.ethereum.request({
        method: 'eth_accounts',
      })
      if (addressArray.length > 0) {
        setAppStatus('connected')
        setCurrentAccount(addressArray[0])

        createUserAccount(addressArray[0])
      } else {
        router.push('/')
        setAppStatus('notConnected')
      }
    } catch (err) {
      router.push('/')
      setAppStatus('error')
    }
  }

  const connectWallet = async () => {
    if (!window.ethereum) return setAppStatus('noMetaMask')
    try {
      setAppStatus('loading')

      const addressArray = await window.ethereum.request({
        method: 'eth_requestAccounts',
      })

      if (addressArray.length > 0) {
        setCurrentAccount(addressArray[0])
        createUserAccount(addressArray[0])
      } else {
        router.push('/')
        setAppStatus('notConnected')
      }
    } catch (err) {
      console.log(err)
      setAppStatus('error')
    }
  }

  const createUserAccount = async (userAddress = currentAccount) => {
    if (!window.ethereum) return setAppStatus('noMetaMask')
    try {
      const userDoc = {
        _type: 'users',
        _id: userAddress,
        name: 'Unnamed',
        isProfileImageNft: false,
        profileImage:
          'https://about.twitter.com/content/dam/about-twitter/en/brand-toolkit/brand-download-img-1.jpg.twimg.1920.jpg',
        walletAddress: userAddress,
      }

      await client.createIfNotExists(userDoc)

      setAppStatus('connected')
    } catch (error) {
      router.push('/')
      setAppStatus('error')
    }
  }

  const getNftProfileImage = async (imageUri: string, isNft: boolean) => {
    if (isNft) {
      return `https://gateway.pinata.cloud/ipfs/${imageUri}`
    } else if (!isNft) {
      return imageUri
    }
  }

  const fetchTweets = async () => {
    const query = `
      *[_type == "tweets"]{
        "author": author->{name, walletAddress, profileImage, isProfileImageNft},
        tweet,
        timestamp
      }|order(timestamp desc)
    `

    // setTweets(await client.fetch(query))

    const sanityResponse = await client.fetch(query)

    setTweets([])

    sanityResponse.forEach(async (item) => {
      const profileImageUrl = await getNftProfileImage(
        item.author.profileImage,
        item.author.isProfileImageNft
      )

      if (item.author.isProfileImageNft) {
        const newItem = {
          tweet: item.tweet,
          timestamp: item.timestamp,
          author: {
            name: item.author.name,
            walletAddress: item.author.walletAddress,
            profileImage: profileImageUrl,
            isProfileImageNft: item.author.isProfileImageNft,
          },
        }

        setTweets((prevState) => [...prevState, newItem])
      } else {
        setTweets((prevState) => [...prevState, item])
      }
    })
  }

  const getCurrentUserDetails = async (userAccount = currentAccount) => {
    if (appStatus !== 'connected') return

    const query = `
      *[_type == "users" && _id == "${userAccount}"]{
        "tweets": tweets[]->{timestamp, tweet}|order(timestamp desc),
        name,
        profileImage,
        isProfileImageNft,
        coverImage,
        walletAddress
      }
    `
    const response = await client.fetch(query)

    const profileImageUri = await getNftProfileImage(
      response[0].profileImage,
      response[0].isProfileImageNft
    )

    setCurrentUser({
      tweets: response[0].tweets,
      name: response[0].name,
      profileImage: profileImageUri,
      walletAddress: response[0].walletAddress,
      coverImage: response[0].coverImage,
      isProfileImageNft: response[0].isProfileImageNft,
    })
  }

  return (
    <TwitterContext.Provider
      value={{
        appStatus,
        currentAccount,
        connectWallet,
        tweets,
        fetchTweets,
        setAppStatus,
        getNftProfileImage,
        currentUser,
        getCurrentUserDetails,
      }}
    >
      {children}
    </TwitterContext.Provider>
  )
}

export const useTwitter = () => {
  return useContext(TwitterContext)
}
