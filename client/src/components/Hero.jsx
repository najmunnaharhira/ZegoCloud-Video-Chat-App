import { Link } from 'react-router-dom';
import { MdVideoCall } from 'react-icons/md';

const Hero = () => {
  return (
    <section className="relative w-full bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center opacity-30"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=2074&auto=format&fit=crop)',
        }}
      />
      <div className="relative container mx-auto px-6 py-20 md:py-28 flex flex-col items-center text-center">
        <div className="w-20 h-20 rounded-full bg-blue-500/80 flex items-center justify-center mb-6">
          <MdVideoCall className="w-10 h-10 text-white" />
        </div>
        <h1 className="text-4xl md:text-5xl font-bold mb-4">ZegoCloud Video Chat</h1>
        <p className="text-lg md:text-xl text-blue-100 max-w-xl mb-8">
          Start a video call and invite others with a link. Video, audio, and screen sharing—all in one app. Powered by ZEGOCLOUD.
        </p>
        <Link
          to="/join"
          className="inline-flex items-center gap-2 px-8 py-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-xl shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-slate-900"
        >
          <MdVideoCall className="w-6 h-6" />
          Start Video Call
        </Link>
      </div>
    </section>
  );
};

export default Hero;
