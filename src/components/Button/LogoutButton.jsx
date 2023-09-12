import pb from "@/api/pocketbase";

function LogoutButton() {
  return (
    <button 
    className="h-[34px] w-[88px] rounded-lg bg-lionly-white text-lionly-md text-lionly-black"
    onClick={()=>{
      pb.authStore.clear();
    }}
    >
      Logout
    </button>
  );
}

export default LogoutButton;
