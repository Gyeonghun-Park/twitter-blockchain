import { Dispatch, SetStateAction } from 'react'
import { IconType } from 'react-icons'
import { useRouter } from 'next/router'

interface SidebarOptionProps {
  text: String
  Icon: IconType
  isActive?: Boolean
  setSelected?: Dispatch<SetStateAction<String>>
  redirect?: URL | string
}

function SidebarOption({
  text,
  Icon,
  isActive,
  setSelected,
  redirect,
}: SidebarOptionProps) {
  const router = useRouter()

  const handleClick = (buttonText = text) => {
    if (buttonText !== 'More' && setSelected) {
      setSelected(buttonText)
    } else return
  }

  return (
    <div
      className={style.wrapper}
      onClick={() => {
        handleClick(text)
        if (redirect) {
          router.push(redirect)
        } else return
      }}
    >
      <div className={style.iconContainer}>
        <Icon />
      </div>
      <div className={`${isActive ? style.textActive : style.textGeneral}`}>
        {text}
      </div>
    </div>
  )
}

export default SidebarOption

const style = {
  wrapper: `flex w-min cursor-pointer items-center rounded-[100px] p-4 transition-all hover:bg-[#333c45] hover:duration-200 hover:ease-in-out`,
  iconContainer: `mr-4 text-xl`,
  textGeneral: `font-medium`,
  textActive: `font-bold`,
}
