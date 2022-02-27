import { ProfileHeader, ProfileTweets } from '@components/Profile'
import { Sidebar, Widgets } from '@components'

const profile = () => {
  return (
    <div className={style.wrapper}>
      <div className={style.content}>
        <Sidebar initialSelectedIcon={'Profile'} />
        <div className={style.mainContent}>
          <ProfileHeader />
          <ProfileTweets />
        </div>
        <Widgets />
      </div>
    </div>
  )
}

const style = {
  wrapper: `flex h-screen w-screen select-none justify-center bg-[#15202b] text-white`,
  content: `flex w-2/3 max-w-[1400px] justify-between`,
  mainContent: `flex-[2] border-r border-l border-[#38444d]`,
}

export default profile
