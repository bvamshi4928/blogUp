import React from "react";

const skills = [
  "JavaScript",
  "React",
  "Node.js",
  "MongoDB",
  "Express",
  "Tailwind CSS",
  "Git",
  "REST APIs",
];

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 flex items-center justify-center pt-24 lg:pt-28 pb-10">
      <div className="max-w-3xl mx-auto p-6 bg-white dark:bg-slate-800 rounded-3xl shadow-2xl text-center flex flex-col gap-8">
        {/* Profile Section */}
        <div className="flex flex-col items-center gap-3">
          <img
            src="https://avatars.githubusercontent.com/u/9919?s=200&v=4"
            alt="Profile"
            className="w-28 h-28 rounded-full border-4 border-indigo-300 dark:border-indigo-700 shadow-lg mb-2"
          />
          <h1 className="text-3xl font-extrabold text-indigo-700 dark:text-indigo-300">
            Vamshi Bisapogu
          </h1>
          <p className="text-md text-gray-500 dark:text-gray-300">
            Full Stack Developer & Blogger
          </p>
        </div>
        {/* About Text */}
        <div className="text-md text-gray-600 dark:text-gray-200 flex flex-col gap-6">
          <p>
            Welcome to my Tech Blog! I created this space to share my journey,
            thoughts, and tutorials on web development, programming, and
            technology trends. My goal is to help others learn and grow in the
            tech world.
          </p>
          <p>
            I publish weekly articles on topics like JavaScript, React, backend
            development, and best practices. I believe in building a strong
            community of learners who support and inspire each other.
          </p>
        </div>
        {/* Skills Section */}
        <div>
          <h2 className="text-xl font-bold text-teal-600 dark:text-teal-300 mb-2">
            Skills & Tools
          </h2>
          <div className="flex flex-wrap gap-3 justify-center">
            {skills.map((skill, i) => (
              <span
                key={i}
                className="bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-200 px-4 py-1 rounded-full text-sm font-semibold shadow-sm"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
        {/* Timeline/Highlights */}
        <div>
          <h2 className="text-xl font-bold text-teal-600 dark:text-teal-300 mb-2">
            Highlights
          </h2>
          <ul className="text-left mx-auto max-w-md flex flex-col gap-2 text-gray-700 dark:text-gray-200">
            <li>🚀 3+ years of experience in web development</li>
            <li>📝 50+ blog articles published</li>
            <li>👨‍💻 Built multiple full-stack projects</li>
            <li>🌱 Passionate about learning and teaching</li>
          </ul>
        </div>
        {/* Contact Section */}
        <div className="mt-4">
          <h2 className="text-xl font-bold text-teal-600 dark:text-teal-300 mb-2">
            Contact
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            Let's connect! Reach out via{" "}
            <a
              href="mailto:vamshi@example.com"
              className="text-indigo-500 dark:text-indigo-300 underline"
            >
              email
            </a>{" "}
            or on{" "}
            <a
              href="https://github.com/vamshi"
              target="_blank"
              rel="noopener noreferrer"
              className="text-indigo-500 dark:text-indigo-300 underline"
            >
              GitHub
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
