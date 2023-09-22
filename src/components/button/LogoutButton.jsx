import pb from '@/api/pocketbase';
import { useChannel } from '@/hooks';
import { handleKeyboardArrowControl } from '@/utils';

function LogoutButton() {
  const { initialState, setChannelList } = useChannel();

  return (
    <button
      onKeyDown={handleKeyboardArrowControl}
      onClick={() => {
        setChannelList(() => ({ ...initialState }));
        pb.authStore.clear();
      }}
      className="h-[34px] w-[88px] rounded-lg bg-lionly-white text-lionly-md text-lionly-black shadow-lg transition-all hover:scale-110"
    >
      Logout
    </button>
  );
}

export default LogoutButton;
