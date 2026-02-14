import { Link } from 'react-router-dom';
import {
  MdVideocam,
  MdLink,
  MdGroup,
  MdMic,
  MdScreenShare,
  MdPersonAdd,
  MdCallEnd,
  MdSettingsVoice,
} from 'react-icons/md';

const beforeCallFeatures = [
  {
    icon: <MdPersonAdd className="w-7 h-7" />,
    title: 'Create or join room',
    text: 'Enter your name and a Room ID, or leave Room ID blank to create a new video chat room.',
  },
  {
    icon: <MdLink className="w-7 h-7" />,
    title: 'Share invite link',
    text: 'After joining, copy the room link and send it to others so they can join the same call.',
  },
  {
    icon: <MdGroup className="w-7 h-7" />,
    title: 'Group video chat',
    text: 'Multiple people can join one room. Everyone sees and hears each other in real time.',
  },
];

const inCallFeatures = [
  {
    icon: <MdVideocam className="w-7 h-7" />,
    title: 'Video & camera',
    text: 'Turn your camera on or off anytime. HD video with low latency.',
  },
  {
    icon: <MdMic className="w-7 h-7" />,
    title: 'Microphone',
    text: 'Mute or unmute your mic. Choose speaker or other audio device in the pre-join screen.',
  },
  {
    icon: <MdScreenShare className="w-7 h-7" />,
    title: 'Screen sharing',
    text: 'Share your screen during the call so everyone can see your content.',
  },
  {
    icon: <MdCallEnd className="w-7 h-7" />,
    title: 'Leave call',
    text: 'End the call anytime. You can rejoin the same room with the same link.',
  },
];

const FeatureCard = ({ icon, title, text }) => (
  <div className="p-5 rounded-xl bg-gray-50 border border-gray-100 hover:border-blue-100 hover:bg-blue-50/50 transition-colors">
    <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-blue-100 text-blue-600 mb-3">
      {icon}
    </div>
    <h3 className="font-semibold text-gray-800 mb-1.5">{title}</h3>
    <p className="text-gray-600 text-sm leading-relaxed">{text}</p>
  </div>
);

const Features = () => {
  return (
    <section id="features" className="bg-white py-16 scroll-mt-16">
      <div className="container mx-auto px-6 max-w-5xl">
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-2">
          Video Chat Features
        </h2>
        <p className="text-gray-500 text-center mb-12 max-w-xl mx-auto">
          Start a call, invite others with a link, and use video, mic, and screen share—all in one app.
        </p>

        {/* Section 1: Before / Join */}
        <div className="mb-14">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <MdSettingsVoice className="w-5 h-5 text-blue-500" />
            1. Join & start a call
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {beforeCallFeatures.map((f, i) => (
              <FeatureCard key={i} icon={f.icon} title={f.title} text={f.text} />
            ))}
          </div>
          <div className="mt-6 text-center">
            <Link
              to="/join"
              className="inline-flex items-center gap-2 text-blue-600 font-medium hover:underline"
            >
              Go to Join Call
              <span aria-hidden>→</span>
            </Link>
          </div>
        </div>

        {/* Section 2: In-call */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <MdVideocam className="w-5 h-5 text-blue-500" />
            2. During the call
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {inCallFeatures.map((f, i) => (
              <FeatureCard key={i} icon={f.icon} title={f.title} text={f.text} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
