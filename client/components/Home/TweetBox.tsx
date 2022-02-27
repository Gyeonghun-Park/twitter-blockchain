import Image from 'next/image'
import { useState, useContext } from 'react'
import { BsCardImage, BsEmojiSmile } from 'react-icons/bs'
import { RiFileGifLine, RiBarChartHorizontalFill } from 'react-icons/ri'
import { IoMdCalendar } from 'react-icons/io'
import { MdOutlineLocationOn } from 'react-icons/md'

function TweetBox() {
  const [tweetMessage, setTweetMessage] = useState('')

  const submitTweet = async (event: any) => {
    event.preventDefault()
  }

  return (
    <div className={style.wrapper}>
      <div className={style.tweetBoxLeft}>{/* <Image /> */}</div>
      <div className={style.tweetBoxRight}>
        <form>
          <textarea
            onChange={(e) => setTweetMessage(e.target.value)}
            value={tweetMessage}
            placeholder="What's happening?"
            className={style.inputField}
          />
          <div className={style.formLowerContainer}>
            <div className={style.iconsContainer}>
              <BsCardImage className={style.icon} />
              <RiFileGifLine className={style.icon} />
              <RiBarChartHorizontalFill className={style.icon} />
              <BsEmojiSmile className={style.icon} />
              <IoMdCalendar className={style.icon} />
              <MdOutlineLocationOn className={style.icon} />
            </div>
            <button
              type="submit"
              onClick={(event) => submitTweet(event)}
              disabled={!tweetMessage}
              className={`${style.submitGeneral} ${
                tweetMessage ? style.activeSubmit : style.inactiveSubmit
              }`}
            >
              Tweet
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default TweetBox

const style = {
  wrapper: `flex flex-row border-b border-[#38444d] px-4 pb-4`,
  tweetBoxLeft: `mr-4`,
  tweetBoxRight: `flex-1`,
  profileImage: `height-12 w-12 rounded-full`,
  inputField: `h-full w-full bg-transparent text-lg outline-none`,
  formLowerContainer: `flex`,
  iconsContainer: `flex flex-1 items-center text-[#1d9bf0]`,
  icon: `mr-2`,
  submitGeneral: `rounded-3xl px-6 py-2 font-bold`,
  inactiveSubmit: `bg-[#196195] text-[#95999e]`,
  activeSubmit: `bg-[#1d9bf0] text-white`,
}
