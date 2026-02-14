import { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation, useSearchParams } from 'react-router-dom';
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';
import { fetchZegoToken } from '../api';

function randomID(len = 5) {
  const chars = '12345qwertyuiopasdfgh67890jklmnbvcxzMNBVCZXASDQWERTYHGFUIOLKJP';
  let result = '';
  for (let i = 0; i < len; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

export function getUrlParams(url = window.location.href) {
  const urlStr = url.split('?')[1];
  return new URLSearchParams(urlStr || '');
}

const Call = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const containerRef = useRef(null);
  const zpRef = useRef(null);
  const [containerReady, setContainerReady] = useState(false);
  const [error, setError] = useState(null);
  const [joining, setJoining] = useState(true);

  const setContainerRef = (el) => {
    containerRef.current = el;
    setContainerReady(!!el);
  };

  useEffect(() => {
    if (!containerReady || !containerRef.current) return;

    const roomID = (searchParams.get('roomID') || getUrlParams().get('roomID') || randomID(6)).slice(0, 64);
    const userID = randomID(8);
    const userNameFromUrl = searchParams.get('userName') || getUrlParams().get('userName');
    const userNameFromState = location.state?.userName;
    const userName = (userNameFromUrl || userNameFromState || '').trim().slice(0, 128) || `User_${userID.slice(0, 4)}`;

    const joinRoom = async () => {
      try {
        let kitToken;
        const useProductionToken = typeof ZegoUIKitPrebuilt.generateKitTokenForProduction === 'function';

        try {
          const data = await fetchZegoToken({ userID, userName });
          if (useProductionToken && data.token && data.appID != null) {
            kitToken = ZegoUIKitPrebuilt.generateKitTokenForProduction(
              data.appID,
              data.token,
              roomID,
              data.userID || userID,
              userName
            );
          } else {
            throw new Error('Server did not return a valid token.');
          }
        } catch (apiErr) {
          const appID = import.meta.env.VITE_ZEGO_APP_ID ? parseInt(import.meta.env.VITE_ZEGO_APP_ID, 10) : 0;
          const serverSecret = (import.meta.env.VITE_ZEGO_SERVER_SECRET || '').slice(0, 32);
          if (appID && serverSecret.length === 32) {
            kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
              appID,
              serverSecret,
              roomID,
              userID,
              userName
            );
          } else {
            setError(
              apiErr.message ||
              'Video call is not configured. Set ZEGO_APP_ID and ZEGO_SERVER_SECRET in server .env (recommended), or VITE_ZEGO_APP_ID and VITE_ZEGO_SERVER_SECRET in client .env for development only.'
            );
            setJoining(false);
            return;
          }
        }

        const zp = ZegoUIKitPrebuilt.create(kitToken);
        zpRef.current = zp;
        zp.joinRoom({
          container: containerRef.current,
          scenario: { mode: ZegoUIKitPrebuilt.VideoConference },
          sharedLinks: [
            {
              name: 'Copy link',
              url: `${window.location.origin}${window.location.pathname}?roomID=${encodeURIComponent(roomID)}&userName=${encodeURIComponent(userName)}`,
            },
          ],
          // Minimal UI: only video call controls, hide SDK service list and extra options
          showPreJoinView: true,
          turnOnCameraWhenJoining: true,
          turnOnMicrophoneWhenJoining: true,
          showMoreButton: false,
          showAudioVideoSettingsButton: false,
          showRoomDetailsButton: false,
          showUserList: false,
          showTextChat: false,
          rightPanelExpandedType: 'None',
          showLayoutButton: false,
          showScreenSharingButton: true,
          showMyCameraToggleButton: true,
          showMyMicrophoneToggleButton: true,
          showPinButton: true,
          showInviteToCohostButton: false,
          showRemoveCohostButton: false,
          showRequestToCohostButton: false,
          showBackgroundProcessButton: false,
          showTurnOffRemoteCameraButton: false,
          showTurnOffRemoteMicrophoneButton: false,
          showRemoveUserButton: false,
          lowerLeftNotification: {
            showUserJoinAndLeave: true,
            showTextChat: false,
          },
          whiteboardConfig: {
            showCreateAndCloseButton: false,
          },
          showRoomTimer: false,
          layout: 'Auto',
          showLeavingView: true,
          showLeaveRoomConfirmDialog: true,
        });
        setError(null);
      } catch (err) {
        setError(err?.message || 'Failed to join call. Check your connection and try again.');
      } finally {
        setJoining(false);
      }
    };

    joinRoom();
    return () => {
      if (zpRef.current && typeof zpRef.current.destroy === 'function') {
        zpRef.current.destroy();
        zpRef.current = null;
      }
    };
  }, [containerReady]);

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-900 p-6">
        <p className="text-red-300 text-center max-w-md mb-6">{error}</p>
        <div className="flex gap-3">
          <button
            type="button"
            onClick={() => navigate('/join')}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            Join again
          </button>
          <button
            type="button"
            onClick={() => navigate('/')}
            className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-500"
          >
            Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-screen">
      {joining && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-900 text-white z-10">
          Joining call…
        </div>
      )}
      <div
        ref={setContainerRef}
        className="myCallContainer"
        style={{ width: '100%', height: '100vh' }}
      />
    </div>
  );
};

export default Call;
