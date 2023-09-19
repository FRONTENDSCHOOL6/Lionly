import pb from '@/api/pocketbase';
import useChannel from '@/hooks/useChannel';

function LogoutButton() {
  const { initialState, setChannelList } = useChannel();

  return (
    <button
      onClick={() => {
        setChannelList(() => ({ ...initialState }));
        pb.authStore.clear();
      }}
      className="h-[34px] w-[88px] rounded-lg bg-lionly-white text-lionly-md text-lionly-black shadow-lg transition-all hover:scale-125 focus:scale-125"
    >
      Logout
    </button>
  );
}

export default LogoutButton;
