import { useState } from 'react'
import { ethers } from 'ethers'
import { useTwitter } from '@contexts/TwitterContext'
import { useRouter } from 'next/router'
import InitialState from './InitialState'
import LoadingState from './LoadingState'
import FinishedState from './FinishedState'
import { client } from '@lib/client'
import { contractABI, contractAddress } from '@lib/constants'
import { pinJSONToIPFS, pinFileToIPFS } from '@lib/pinata'
declare let window: any
let metamask: any

if (typeof window !== 'undefined') {
  metamask = window.ethereum
}

interface Metadata {
  name: string
  description: string
  image: string
}

interface HeaderObject {
  key: string | undefined
  value: string | undefined
}

const getEthereumContract = () => {
  const provider = new ethers.providers.Web3Provider(metamask)
  const signer = provider.getSigner()
  const transactionContract = new ethers.Contract(
    contractAddress,
    contractABI,
    signer
  )

  return transactionContract
}

const createPinataRequestHeaders = (headers: Array<HeaderObject>) => {
  const requestHeaders: HeadersInit = new Headers()

  headers.forEach((header: any) => {
    requestHeaders.append(header.key, header.value)
  })

  return requestHeaders
}

const ProfileImageMinter = () => {
  const { currentAccount, setAppStatus } = useTwitter()
  const router = useRouter()

  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [status, setStatus] = useState('initial')
  const [profileImage, setProfileImage] = useState<File>()

  const mint = async () => {
    if (!name || !description || !profileImage) return
    setStatus('loading')

    const pinataMetaData = {
      name: `${name} - ${description}`,
    }

    const ipfsImageHash = await pinFileToIPFS(profileImage, pinataMetaData)

    await client
      .patch(currentAccount)
      .set({ profileImage: ipfsImageHash })
      .set({ isProfileImageNft: true })
      .commit()

    const imageMetaData: Metadata = {
      name: name,
      description: description,
      image: `ipfs://${ipfsImageHash}`,
    }

    const ipfsJsonHash = await pinJSONToIPFS(imageMetaData)

    const contract = await getEthereumContract()

    const transactionParameters = {
      to: contractAddress,
      from: currentAccount,
      data: await contract.mint(currentAccount, `ipfs://${ipfsJsonHash}`),
    }

    try {
      await metamask.request({
        method: 'eth_sendTransaction',
        params: [transactionParameters],
      })

      setStatus('finished')
    } catch (error: any) {
      console.log(error)
      setStatus('finished')
    }
  }

  const handlers = {
    initial: (
      <InitialState
        profileImage={profileImage!}
        setProfileImage={setProfileImage}
        name={name}
        setName={setName}
        description={description}
        setDescription={setDescription}
        mint={mint}
      />
    ),
    loading: <LoadingState />,
    finished: <FinishedState />,
  }

  const app = (modalStatus) => {
    const handler = handlers[modalStatus]
    if (!handler) {
      setAppStatus('error')
      router.push('/')
    }
    return handler
  }

  return <>{app(status)}</>
}

export default ProfileImageMinter
