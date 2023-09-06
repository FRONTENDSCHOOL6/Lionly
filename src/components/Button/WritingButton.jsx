import pen from '@/assets/pen.svg'

function WritingButton() {
  return (
    <button className='w-[88px] h-[34px] text-lionly-md rounded-lg bg-lionly-secondary-color text-lionly-white flex items-center justify-center gap-2'>
      <img src={pen} alt="글 작성하기"/>
      글쓰기
    </button>
  )
}

export default WritingButton;