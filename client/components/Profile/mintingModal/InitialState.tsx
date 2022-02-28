import { Dispatch, SetStateAction } from 'react'
import { GiEarthAmerica } from 'react-icons/gi'

interface InitialStateProps {
  profileImage: File
  setProfileImage: Dispatch<SetStateAction<File | undefined>>
  name: string
  setName: Dispatch<SetStateAction<string>>
  description: string
  setDescription: Dispatch<SetStateAction<string>>
  mint: Function
}

const InitialState = ({
  profileImage,
  setProfileImage,
  name,
  setName,
  description,
  setDescription,
  mint,
}: InitialStateProps) => {
  console.log(profileImage)

  return (
    <div className={style.wrapper}>
      <div className={style.inputFieldsContainer}>
        <div className={style.inputContainer}>
          <label
            htmlFor="image-upload"
            className={profileImage ? style.fileSelected : style.customInput}
          >
            <input
              type="file"
              id="image-upload"
              accept=".jpg, .jpeg, .png"
              className={style.fileInput}
              placeholder="Image URL"
              onChange={(e) => setProfileImage(e.target.files![0])}
            />
            Select File
          </label>
        </div>
        <div className={style.inputContainer}>
          <input
            type="text"
            className={style.input}
            placeholder="Title of Image"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className={style.inputContainer}>
          <input
            type="text"
            className={style.input}
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
      </div>
      <div className={style.lower}>
        <div className={style.visibility}>
          <GiEarthAmerica />
          <span className={style.visibilityText}>Everyone can see this</span>
        </div>
        <div
          className={
            name && description && profileImage
              ? style.mintButton
              : style.inactiveMintButton
          }
          onClick={() => {
            if (name && description && profileImage) {
              mint()
            }
          }}
        >
          Mint
        </div>
      </div>
    </div>
  )
}

export default InitialState

const style = {
  wrapper: `flex h-[20rem] w-[35rem] flex-col rounded-3xl bg-[#15202b] p-10 text-white`,
  inputFieldsContainer: `flex-1`,
  inputContainer: `mb-4`,
  fileInput: `hidden`,
  input: `w-full bg-transparent text-xl outline-none`,
  customInput: `cursor-pointer rounded-full bg-white px-3 py-1 text-black hover:bg-[#8899a6]`,
  fileSelected: `cursor-pointer rounded-full bg-[#2b6127] px-3 py-1 text-white hover:bg-[#8899a6]`,
  lower: `flex items-center justify-between`,
  visibility: `flex items-center text-sm font-bold text-[#1d9bf0]`,
  visibilityText: `ml-2`,
  mintButton: `cursor-pointer rounded-full bg-white px-3 py-1 text-black hover:bg-[#8899a6]`,
  inactiveMintButton: `rounded-full bg-[#8899a6] px-3 py-1 text-black`,
}
