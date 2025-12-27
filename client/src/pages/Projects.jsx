import CallToAction from "../components/CallToAction";

const projects = [
  {
    title: "Personal Portfolio",
    description:
      "A modern portfolio website to showcase my work, skills, and experience. Built with React and Tailwind CSS.",
    tech: ["React", "Tailwind CSS", "Vercel"],
    github: "https://github.com/vamshi-portfolio",
    demo: "https://vamshi-portfolio.vercel.app/",
  },
  {
    title: "Blog Platform",
    description:
      "A full-stack blog platform with authentication, CRUD posts, and comments. Built using MERN stack.",
    tech: ["MongoDB", "Express", "React", "Node.js"],
    github: "https://github.com/vamshi-blog",
    demo: "#",
  },
  {
    title: "Weather App",
    description:
      "A responsive weather app that fetches real-time weather data using OpenWeatherMap API.",
    tech: ["React", "API", "CSS"],
    github: "https://github.com/vamshi-weather",
    demo: "#",
  },
];

const Projects = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-teal-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 py-10">
      <div className="max-w-4xl mx-auto flex flex-col gap-10 p-4">
        <h1 className="text-4xl font-extrabold text-center text-teal-700 dark:text-teal-300 mb-2">
          Projects
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 text-center mb-6">
          Explore some of my favorite projects. Each project is built with
          passion and the latest technologies.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, idx) => (
            <div
              key={idx}
              className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-6 flex flex-col gap-4 border-t-4 border-teal-400 hover:scale-105 transition-transform"
            >
              <h2 className="text-2xl font-bold text-indigo-600 dark:text-indigo-300">
                {project.title}
              </h2>
              <p className="text-gray-700 dark:text-gray-200">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-2 mt-2">
                {project.tech.map((tech, i) => (
                  <span
                    key={i}
                    className="bg-teal-100 dark:bg-teal-900 text-teal-700 dark:text-teal-200 px-3 py-1 rounded-full text-xs font-semibold"
                  >
                    {tech}
                  </span>
                ))}
              </div>
              <div className="flex gap-4 mt-3">
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 dark:text-blue-300 hover:underline font-medium"
                >
                  GitHub
                </a>
                {project.demo !== "#" && (
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-teal-600 dark:text-teal-300 hover:underline font-medium"
                  >
                    Live Demo
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
        <div className="mt-10">
          <CallToAction />
        </div>
      </div>
    </div>
  );
};

export default Projects;
