import Image from "next/image";
import Link from "next/link";

const projects = [
  {
    category: "Research Synthesis",
    title: "Evidence-Based Supplements for ASD, ADHD & OCD",
    description:
      "Comprehensive analysis of peer-reviewed clinical trials and meta-analyses on nutritional interventions for neurodevelopmental conditions. Identified cross-condition synergies and developed a tiered protocol combining supplements strategically for enhanced benefits.",
    github:
      "https://github.com/acorona1234/supplement-research",
    image: "/images/supplements-venn-diagram.png",
  },
  {
    category: "Machine Learning",
    title: "Predicting Customer Churn",
    description:
      "Built a Random Forest classifier with 90% accuracy to predict e-commerce customer churn. Key insight: tenure is the #1 retention driver — long-term customers become loyal repeat buyers, revealing a clear opportunity for early engagement strategies.",
    github:
      "https://github.com/acorona1234/Predicting-Customer-Churn-in-an-Online-E-Commerce-Company-using-Random-Forest-Classifier",
    image: "/images/customer-churn.png",
  },
  {
    category: "Data Analysis",
    title: "World Happiness Report Analysis",
    description:
      "Analyzed factors influencing happiness across 146 countries. Found that GDP per capita, social support, healthy life expectancy, and freedom to make life choices are the strongest predictors of national happiness.",
    github:
      "https://github.com/acorona1234/Analysis-of-Factors-Influencing-Happiness",
    image: "/images/happiness-factors.png",
  },
  {
    category: "Data Analysis",
    title: "Helping Doctors Prescribe Medicine",
    description:
      "Analysis of patient data to predict suitable medication based on age, sex, blood pressure, and cholesterol levels. Includes data preprocessing, one-hot encoding, and decision tree visualizations.",
    github:
      "https://github.com/acorona1234/Drug-Rx-Decider-OneHotEncoder-and-Decision-Tree",
    image: "/images/image-1.png",
  },
  {
    category: "Data Analysis",
    title: "Infertility & Hormone Levels",
    description:
      "NHANES survey analysis exploring the relationship between hormone levels and infertility, revealing that estrogen levels are higher among individuals experiencing infertility.",
    github:
      "https://github.com/acorona1234/Data-Analysis-and-Visualization-NHANES-Survey-Hormone_Levels_Correlation_with_Infertility",
    image: "/images/sex-steriod.png",
  },
];

const skills = [
  "Data Analysis",
  "Project Management",
  "Python",
  "R",
  "SQL",
  "Machine Learning",
  "Data Visualization",
];

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-900 text-white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-slate-900/95 backdrop-blur border-b border-slate-800">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/" className="text-lg font-bold tracking-tight">
            AMY CORONA
          </Link>
          <a
            href="https://www.linkedin.com/in/amy-corona-96492744/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 bg-indigo-600 hover:bg-indigo-700 px-3 py-1.5 rounded-lg transition-colors text-xs font-medium"
          >
            <svg
              className="w-3.5 h-3.5"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
            </svg>
            <span className="hidden sm:inline">Connect on LinkedIn</span>
            <span className="sm:hidden">LinkedIn</span>
          </a>
        </div>
      </header>

      <main>
        {/* Hero Section */}
        <section className="py-8 sm:py-12 md:py-16 px-4">
          <div className="max-w-6xl mx-auto text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3">
              Compensation Analyst
              <span className="block text-2xl sm:text-3xl md:text-4xl text-slate-400 mt-1">&amp; Project Manager</span>
            </h1>
            <p className="text-base sm:text-lg text-slate-400 max-w-xl mx-auto mt-4">
              Turning complex data into actionable insights that drive business decisions
            </p>
          </div>
        </section>

        {/* About Section */}
        <section className="py-8 sm:py-12 px-4 bg-slate-800/50">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col lg:flex-row gap-6 sm:gap-8 items-center">
              {/* Photo */}
              <div className="w-full lg:w-1/3 flex justify-center">
                <div className="w-32 h-32 sm:w-48 sm:h-48 rounded-xl overflow-hidden">
                  <Image
                    src="/images/amy-squared-crop-l-768x768.jpg"
                    alt="Amy Corona"
                    width={768}
                    height={768}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* Bio */}
              <div className="w-full lg:w-2/3 space-y-3 text-center lg:text-left">
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold">Amy Corona</h2>
                  <p className="text-indigo-400 text-sm font-medium">Data-Driven Problem Solver</p>
                </div>
                <div className="space-y-2 text-slate-300 text-sm leading-relaxed">
                  <p>
                    I'm a compensation analyst and project manager who turns complex data into clear, actionable insights. My background in data science gives me a unique perspective on solving business challenges through analytics.
                  </p>
                  <p>
                    With expertise in Python, R, SQL, and machine learning, I bridge the gap between technical analysis and business strategy. I thrive on making data accessible and meaningful for diverse stakeholders.
                  </p>
                </div>

                {/* Skills */}
                <div className="flex flex-wrap justify-center lg:justify-start gap-1.5 pt-2">
                  {skills.map((skill) => (
                    <span
                      key={skill}
                      className="bg-slate-700 px-2.5 py-1 rounded-full text-xs"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Projects */}
        <section className="py-8 sm:py-12 px-4 border-t border-slate-800">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-xl sm:text-2xl font-bold mb-6 sm:mb-8 text-center">
              Data Science Projects
            </h2>

            <div className="space-y-8 sm:space-y-12">
              {projects.map((project, index) => (
                <div
                  key={index}
                  className={`flex flex-col gap-4 sm:gap-6 ${
                    index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
                  } lg:items-center`}
                >
                  {/* Image */}
                  <div className="w-full lg:w-1/2">
                    <div className="bg-slate-800 rounded-xl overflow-hidden">
                      <Image
                        src={project.image}
                        alt={project.title}
                        width={800}
                        height={600}
                        className="w-full h-auto object-contain"
                      />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="w-full lg:w-1/2 space-y-2 sm:space-y-3">
                    <span className="text-indigo-400 text-xs font-semibold uppercase tracking-wider">
                      {project.category}
                    </span>
                    <h3 className="text-lg sm:text-xl font-bold">
                      {project.title}
                    </h3>
                    <p className="text-slate-400 text-sm leading-relaxed">
                      {project.description}
                    </p>
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 bg-slate-800 hover:bg-slate-700 px-4 py-2 rounded-lg transition-colors text-sm mt-2"
                    >
                      <svg
                        className="w-4 h-4"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                      </svg>
                      View on GitHub
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

      </main>

      {/* Footer */}
      <footer className="py-4 px-4 border-t border-slate-800">
        <div className="max-w-6xl mx-auto text-center text-slate-500 text-xs">
          <p>© {new Date().getFullYear()} Amy Corona</p>
        </div>
      </footer>
    </div>
  );
}
