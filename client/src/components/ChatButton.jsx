import { MdVideoCall } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const ChatButton = () => {
  const navigate = useNavigate();
  return (
    <div className="fixed bottom-4 right-4 z-50">
      <button
        onClick={() => navigate("/join")}
        className="bg-blue-500 text-white rounded-full p-4 shadow-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-white"
        title="Start or join video call"
      >
        <MdVideoCall className="w-7 h-7" />
      </button>
    </div>
  );
};

export default ChatButton;
