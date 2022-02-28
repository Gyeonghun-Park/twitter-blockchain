import { GridLoader } from 'react-spinners'
import { css } from '@emotion/react'

const LoadingState = () => {
  return (
    <div className={style.wrapper}>
      <div className={style.title}>Minting in progress...</div>
      <GridLoader color={'#fff'} loading={true} css={cssOverride} size={30} />
    </div>
  )
}

export default LoadingState

const style = {
  wrapper: `flex h-[20rem] w-[35rem] flex-col items-center justify-center rounded-3xl bg-[#15202b] p-10 text-white`,
  title: `mb-6 text-xl font-semibold`,
}

const cssOverride = css`
  display: block;
  margin: 0 auto;
  border-color: white;
`
