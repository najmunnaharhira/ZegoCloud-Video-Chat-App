import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MdVideoCall } from 'react-icons/md';

const MAX_NAME_LENGTH = 64;
const MAX_ROOM_ID_LENGTH = 32;

function randomID(len = 6) {
  const chars = '12345qwertyuiopasdfgh67890jklmnbvcxzMNBVCZXASDQWERTYHGFUIOLKJP';
  let result = '';
  for (let i = 0; i < len; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

function sanitize(str, maxLen) {
  return String(str).trim().slice(0, maxLen);
}

const JoinCall = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState('');
  const [roomID, setRoomID] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleCreateAndJoin = (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    const id = randomID(6);
    const displayName = sanitize(userName, MAX_NAME_LENGTH) || `User_${randomID(4)}`;
    navigate(`/call?roomID=${encodeURIComponent(id)}&userName=${encodeURIComponent(displayName)}`, {
      state: { userName: displayName, roomID: id },
    });
    setLoading(false);
  };

  const handleJoinWithCode = (e) => {
    e.preventDefault();
    setError('');
    const displayName = sanitize(userName, MAX_NAME_LENGTH) || `User_${randomID(4)}`;
    const id = sanitize(roomID, MAX_ROOM_ID_LENGTH);
    if (!id) {
      setError('Enter a room ID or use "Create new room".');
      return;
    }
    setLoading(true);
    navigate(`/call?roomID=${encodeURIComponent(id)}&userName=${encodeURIComponent(displayName)}`, {
      state: { userName: displayName, roomID: id },
    });
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white/95 backdrop-blur rounded-2xl shadow-2xl p-8">
        <div className="flex flex-col items-center mb-8">
          <div className="w-16 h-16 rounded-full bg-blue-500 flex items-center justify-center mb-4" aria-hidden>
            <MdVideoCall className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-gray-800">Video Chat</h1>
          <p className="text-gray-500 text-sm mt-1">Start or join a video call with chat</p>
        </div>

        <form onSubmit={handleJoinWithCode} className="space-y-5" noValidate>
          <div>
            <label htmlFor="join-userName" className="block text-sm font-medium text-gray-700 mb-1">
              Your name
            </label>
            <input
              id="join-userName"
              type="text"
              autoComplete="name"
              maxLength={MAX_NAME_LENGTH}
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              placeholder="e.g. Alex"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:opacity-50"
              disabled={loading}
              aria-invalid={error ? 'true' : undefined}
              aria-describedby={error ? 'join-error' : undefined}
            />
          </div>

          <div className="border-t border-gray-200 pt-5">
            <p className="text-sm font-medium text-gray-700 mb-2">Create new room</p>
            <p className="text-xs text-gray-500 mb-3">Start a call and invite others with a link.</p>
            <button
              type="button"
              onClick={handleCreateAndJoin}
              disabled={loading}
              className="w-full py-3 px-4 bg-blue-500 hover:bg-blue-600 disabled:bg-blue-400 disabled:cursor-not-allowed text-white font-medium rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              {loading ? 'Joining…' : 'Create room & join'}
            </button>
          </div>

          <div className="border-t border-gray-200 pt-5">
            <p className="text-sm font-medium text-gray-700 mb-2">Join with room ID</p>
            <input
              id="join-roomID"
              type="text"
              autoComplete="off"
              maxLength={MAX_ROOM_ID_LENGTH}
              value={roomID}
              onChange={(e) => setRoomID(e.target.value)}
              placeholder="Paste room ID or code"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:opacity-50 mb-3"
              disabled={loading}
            />
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 bg-gray-700 hover:bg-gray-800 disabled:opacity-50 text-white font-medium rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
            >
              Join with code
            </button>
          </div>

          {error && (
            <p id="join-error" className="text-red-600 text-sm" role="alert">
              {error}
            </p>
          )}
        </form>

        <p className="mt-6 text-center text-gray-500 text-xs">
          Powered by{' '}
          <a href="https://www.zegocloud.com" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
            ZEGOCLOUD
          </a>
        </p>
      </div>
    </div>
  );
};

export default JoinCall;
