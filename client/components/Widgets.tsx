import { news, whoToFollow } from '@lib/static'
import { BiSearch } from 'react-icons/bi'

function Widgets() {
  return (
    <div className={style.wrapper}>
      <div className={style.searchBar}>
        <BiSearch className={style.searchIcon} />
        <input
          placeholder="Search Twitter"
          type="text"
          className={style.inputBox}
        />
      </div>
      <div className={style.section}>
        <div className={style.title}>What's happening</div>
        {news.map((item, index) => (
          <div key={index} className={style.item}>
            <div className={style.newsItemLeft}>
              <div className={style.newsItemCategory}>{item.category}</div>
              <div className={style.newsItemTitle}>{item.title}</div>
            </div>
            <div className={style.newsItemRight}>
              <img
                src={item.image}
                alt={item.category}
                className={style.newsItemImage}
              />
            </div>
          </div>
        ))}
        <div className={style.showMore}>Show more</div>
      </div>
      <div className={style.section}>
        <div className={style.title}>Who to follow</div>
        {whoToFollow.map((item, index) => (
          <div key={index} className={style.item}>
            <div className={style.followAvatarContainer}>
              <img
                src={item.avatar}
                alt={item.handle}
                className={style.followAvatar}
              />
            </div>
            <div className={style.profileDetails}>
              <div className={style.name}>{item.name}</div>
              <div className={style.handle}>{item.handle}</div>
            </div>
            <div className={style.followButton}>Follow</div>
          </div>
        ))}
        <div className={style.showMore}>Show more</div>
      </div>
    </div>
  )
}

export default Widgets

const style = {
  wrapper: `flex-[1] p-4`,
  searchBar: `flex items-center rounded-3xl bg-[#243340] p-2`,
  searchIcon: `mr-2 text-[#8899a6]`,
  inputBox: `bg-transparent outline-none`,
  section: `my-6 overflow-hidden rounded-xl bg-[#192734]`,
  title: `p-2 text-lg font-bold`,
  showMore: `cursor-pointer p-2 text-sm text-[#1d9bf0] hover:bg-[#22303c]`,
  item: `my-2 flex cursor-pointer items-center p-3 hover:bg-[#22303c]`,
  newsItemLeft: `flex-1`,
  newsItemCategory: `text-xs font-semibold text-[#8899a6]`,
  newsItemTitle: `text-sm font-bold`,
  newsItemRight: `ml-3 w-1/5`,
  newsItemImage: `h-14 w-14 rounded-xl object-cover`,
  followAvatarContainer: `w-1/6`,
  followAvatar: `h-[40px] w-[40px] rounded-full`,
  profileDetails: `flex-1`,
  name: `font-bold`,
  handle: `text-[#8899a6]`,
  followButton: `rounded-full bg-white px-3 py-1 text-xs font-bold text-black`,
}
