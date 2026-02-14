const About = () => {
  return (
    <section id="about" className="bg-gray-50 py-12 scroll-mt-16">
      <div className="container py-8 px-6 mx-auto max-w-2xl">
        <h2 className="font-bold text-gray-800 text-xl mb-4">About this video chat app</h2>
        <p className="text-gray-600 leading-relaxed mb-4">
          This is a <strong>video chat app</strong> powered by{' '}
          <a
            href="https://www.zegocloud.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
          >
            ZEGOCLOUD
          </a>
          . You can <strong>start a video call</strong> and <strong>invite others</strong> with a single link. Both features work together: create a room, share the link, and everyone joins the same call with video, audio, and screen sharing.
        </p>
        <p className="text-gray-600 leading-relaxed text-sm">
          Set your Zego App ID and Server Secret in the server <code className="bg-gray-200 px-1 rounded">.env</code> to enable video calls.
        </p>
      </div>
    </section>
  );
};

export default About;
