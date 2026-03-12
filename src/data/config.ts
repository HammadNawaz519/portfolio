const config = {
  title: "Hammad Nawaz | Portfolio",
  description: {
    long: "Explore the portfolio of Naresh, a full-stack developer and creative technologist specializing in interactive web experiences, 3D animations, and innovative projects. Discover my latest work, including Coding Ducks, The Booking Desk, Ghostchat, and more. Let's build something amazing together!",
    short:
      "Discover the portfolio of Naresh, a full-stack developer creating interactive web experiences and innovative projects.",
  },
  keywords: [
    "Hammad",
    "portfolio",
    "full-stack developer",
    "creative technologist",
    "web development",
    "3D animations",
    "interactive websites",
    "Coding Ducks",
    "The Booking Desk",
    "Ghostchat",
    "web design",
    "GSAP",
    "React",
    "Next.js",
    "Spline",
    "Framer Motion",
  ],
  author: "Hammad Nawaz",
  email: "hammadnawaz519@gmail.com",
  site: "https://x.com/_hammadnawaz",

  // for github stars button
  githubUsername: "HammadNawaz519",
  githubRepo: "portfolio",

  get ogImg() {
    return this.site + "/assets/seo/og-image.png";
  },
  social: {
    twitter: "https://x.com/_hammadnawaz",
    linkedin: "https://www.linkedin.com/in/hammadnawaz519",
    instagram: "https://www.instagram.com/_hammadnawaz/",
    facebook: "https://www.facebook.com/profile.php?id=61573731039164",
    github: "https://github.com/HammadNawaz519",
  },
};
export { config };
