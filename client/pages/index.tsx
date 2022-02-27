import Image from 'next/image'
import { useTwitter } from '@contexts/TwitterContext'
import { Sidebar, Widgets } from '@components'
import { Feed } from '@components/Home'

import metamaskLogo from '@images/metamask.png'
import errorImg from '@images/error.png'

function Home() {
  const { appStatus, connectWallet } = useTwitter()

  const app = {
    connected: (
      <div className={style.content}>
        <Sidebar initialSelectedIcon={'Home'} />
        <Feed />
        <Widgets />
      </div>
    ),
    notConnected: (
      <div className={style.loginContainer}>
        <Image src={metamaskLogo} width={200} height={200} />
        <div
          className={style.walletConnectButton}
          onClick={() => connectWallet && connectWallet()}
        >
          Connect Wallet
        </div>
        <div className={style.loginContent}>Connect to Metamask.</div>
      </div>
    ),
    noMetaMask: (
      <div className={style.loginContainer}>
        <Image src={metamaskLogo} width={200} height={200} />
        <div className={style.loginContent}>
          <a
            target="_blank"
            rel="noreferrer"
            href={`https://metamask.io/download.html`}
          >
            You must install Metamask, a <br /> virtual Ethereum wallet, in your
            browser.
          </a>
        </div>
      </div>
    ),
    error: (
      <div className={style.loginContainer}>
        <Image src={errorImg} width={250} height={200} />
        <div className={style.loginContent}>
          An error occurred. Please try again later or from another browser.
        </div>
      </div>
    ),
    loading: (
      <div className={style.loginContainer}>
        <div className={style.loginContent}>Loading...</div>
      </div>
    ),
  }

  return <div className={style.wrapper}>{app[appStatus]}</div>
}

export default Home

const style = {
  wrapper: `flex justify-center h-screen w-screen select-none bg-[#15202b] text-white`,
  content: `flex w-2/3 max-w-[1400px] justify-between`,
  loginContainer: `flex h-full w-full flex-col items-center justify-center pb-48`,
  walletConnectButton: `mb-[-3rem] mt-[3rem] cursor-pointer rounded-full bg-white px-6 py-4 text-2xl font-bold text-black hover:bg-[#d7dbdc]`,
  loginContent: `mt-24 text-center text-3xl font-bold`,
}
