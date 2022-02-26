function Home() {
  return (
    <div className={style.wrapper}>
      <h2>Sidebar</h2>
      <h2>Feed</h2>
      <h2>Widgets</h2>
      <h2></h2>
    </div>
  )
}

export default Home

const style = {
  wrapper: `flex justify-center h-screen w-screen select-none bg-[#15202b] text-white`,
}
