const About = () => {
  return (
    <section id="about" className="bg-gray-50 py-12 scroll-mt-16">
      <div className="container py-8 px-6 mx-auto max-w-2xl">
        <h2 className="font-bold text-gray-800 text-xl mb-4">About</h2>
        <p className="text-gray-600 leading-relaxed">
          This is a <strong>ZegoCloud Video Chat</strong> demo app. It uses{' '}
          <a
            href="https://www.zegocloud.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
          >
            ZEGOCLOUD
          </a>{' '}
          UIKit for real-time video calls. You can create a room, share the link, and invite others to join. Configure your App ID and Server Secret in the backend to enable video calls.
        </p>
      </div>
    </section>
  );
};

export default About;
