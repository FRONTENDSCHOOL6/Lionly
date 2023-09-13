import pb from '@/api/pocketbase';

function LogoutButton() {
  return (
    <button
      onClick={() => {
        pb.authStore.clear();
      }}
      className="h-[34px] w-[88px] rounded-lg bg-lionly-white text-lionly-md text-lionly-black shadow-lg"
    >
      Logout
    </button>
  );
}

export default LogoutButton;
