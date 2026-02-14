import { MdVideocam, MdChat, MdScreenShare, MdGroup, MdLink, MdGrid3X3 } from 'react-icons/md';

const features = [
  {
    icon: <MdVideocam className="w-8 h-8" />,
    title: 'HD video & audio',
    text: 'Real-time video and audio with low latency. Toggle camera and microphone anytime.',
  },
  {
    icon: <MdChat className="w-8 h-8" />,
    title: 'In-call text chat',
    text: 'Send messages to everyone in the room without leaving the call.',
  },
  {
    icon: <MdScreenShare className="w-8 h-8" />,
    title: 'Screen sharing',
    text: 'Share your screen so others can see your presentation or content.',
  },
  {
    icon: <MdGroup className="w-8 h-8" />,
    title: 'Participant list',
    text: 'See who is in the call and who joins or leaves.',
  },
  {
    icon: <MdLink className="w-8 h-8" />,
    title: 'Invite by link',
    text: 'Copy a link and send it to others so they can join the same room.',
  },
  {
    icon: <MdGrid3X3 className="w-8 h-8" />,
    title: 'Layout options',
    text: 'Switch between grid and sidebar layouts for a better view.',
  },
];

const Features = () => {
  return (
    <section id="features" className="bg-white py-16 scroll-mt-16">
      <div className="container mx-auto px-6">
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-2">Video chat features</h2>
        <p className="text-gray-500 text-center mb-12 max-w-lg mx-auto">
          Everything you need for group video calls: video, audio, chat, screen share, and more.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {features.map((f, i) => (
            <div key={i} className="text-center p-6 rounded-xl bg-gray-50 border border-gray-100 hover:border-blue-100 transition-colors">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-blue-100 text-blue-600 mb-4">
                {f.icon}
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">{f.title}</h3>
              <p className="text-gray-600 text-sm">{f.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
