import { Sidebar } from '@components'

function Home() {
  return (
    <div className={style.wrapper}>
      <Sidebar initialSelectedIcon="Home" />
      <h2>Feed</h2>
      <h2>Widgets</h2>
      <h2></h2>
    </div>
  )
}

export default Home

const style = {
  wrapper: `flex justify-center h-screen w-screen select-none bg-[#15202b] text-white`,
  content: `flex w-2/3 max-w-[1400px] justify-between`,
  loginContainer: `flex h-full w-full flex-col items-center justify-center pb-48`,
  walletConnectButton: `mb-[-3rem] mt-[3rem] cursor-pointer rounded-full bg-white px-6 py-4 text-2xl font-bold text-black hover:bg-[#d7dbdc]`,
  loginContent: `mt-24 text-center text-3xl font-bold`,
}
