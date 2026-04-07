"use client";

import { FiGithub } from "react-icons/fi";
import { FaLinkedinIn, FaFacebookF } from "react-icons/fa6";
import { useEffect, useRef, useState, createContext, useContext } from "react";
import { TbWorldCode } from "react-icons/tb";
import { GiShoppingCart } from "react-icons/gi";
import { IoShield } from "react-icons/io5";
import { useInView } from "./Helpers/useInView";
import { TbCameraAi,TbBallFootball,TbCalendarTime  } from "react-icons/tb";
import { Project, Experience } from "./Types/type";


type Lang = "vi" | "en";
const LangContext = createContext<{ lang: Lang; setLang: (l: Lang) => void }>({
  lang: "vi",
  setLang: () => {},
});
const useLang = () => useContext(LangContext);

const T = {
  vi: {
    nav: ["Về tôi", "Sở thích", "Kỹ năng", "Kinh nghiệm", "Dự án", "Liên hệ"],
    navContact: "Liên hệ",
    navResume: "Sơ yếu lý lịch",

    heroGreeting: "Xin chào, tôi là",
    heroDesc:
      "Đam mê phát triển phần mềm, xây dựng ứng dụng Web và nghiên cứu các mô hình Trí tuệ nhân tạo. Luôn tìm kiếm cơ hội để giải quyết bài toán thực tế bằng công nghệ.",
    heroViewProjects: "Xem dự án →",
    heroGithub: "GitHub của tôi",
    phrases: [
      "Lập trình viên Full-Stack",
      "Nghiên cứu AI & Computer Vision",
      "Chuyên ngành: Toán - Tin",
    ],

    aboutTitle1: "Tư duy logic,",
    aboutTitle2: "code thực chiến",
    aboutP1: (
      <>
        Với nền tảng tư duy logic từ chuyên ngành{" "}
        <strong className="text-white">Toán - Tin</strong>, tôi tiếp cận việc
        lập trình không chỉ là viết code mà là thiết kế các hệ thống tối ưu và
        giải pháp thuật toán hiệu quả.
      </>
    ),
    aboutP2: (
      <>
        Kinh nghiệm đa dạng từ ứng dụng quản lý Desktop (C#), phát triển
        Backend/Frontend cho Web (NodeJs), đến nghiên cứu triển khai các mô hình
        Computer Vision như <strong className="text-cyan-400">YOLO</strong>.
      </>
    ),
    aboutP3: (
      <>
        <strong className="text-white">Mục tiêu nghề nghiệp:</strong> Trở thành
        một Kỹ sư phần mềm toàn diện, không ngừng học hỏi và áp dụng các công
        nghệ mới để xây dựng những sản phẩm mang lại giá trị thực tiễn cao cho
        doanh nghiệp và cộng đồng.
      </>
    ),
    aboutStats: [
      { n: "4+", label: "Năm học tập" },
      { n: "10+", label: "Dự án cá nhân" },
      { n: "8", label: "Công nghệ" },
    ],

    hobbiesTitle1: "Đam mê",
    hobbiesTitle2: "khám phá",
    hobbiesP1:
      "Ngoài thời gian dành cho những dòng code và thuật toán, tôi có một niềm đam mê mãnh liệt với việc xê dịch và khám phá những thế giới mới.",
    hobbiesP2:
      "Mỗi chuyến đi không chỉ mang lại cơ hội trải nghiệm sự đa dạng của các nền văn hóa, thưởng thức ẩm thực địa phương mà còn là cách để tôi tìm kiếm nguồn cảm hứng, tái tạo năng lượng sáng tạo và mở rộng thế giới quan.",

    skillsTitle1: "Công nghệ &",
    skillsTitle2: "Kỹ năng",
    skillsMastery: "Mức độ thành thạo",

    expTitle1: "Hành trình",
    expTitle2: "Sự nghiệp",
    expViewPhoto: "Xem ảnh",

    projTitle1: "Dự án cá nhân",
    projTitle2: "tiêu biểu",
    projSubtitle: "Một số sản phẩm tiêu biểu tôi đã nghiên cứu và phát triển.",
    projGithub: "Xem trên GitHub",

    contactTitle1: "Hãy",
    contactTitle2: "kết nối",
    contactDesc:
      "Tôi luôn sẵn sàng thảo luận về các dự án mới, cơ hội hợp tác, hay chỉ đơn giản là một cuộc trò chuyện về công nghệ.",

    footer: `© ${new Date().getFullYear()} Vũ Hà Nam. All rights reserved.`,
  },

  en: {
    nav: ["About", "Hobbies", "Skills", "Experience", "Projects", "Contact"],
    navContact: "Contact",
    navResume: "Resume",

    heroGreeting: "Hi, I'm",
    heroDesc:
      "Passionate about software development, building Web applications and researching Artificial Intelligence models. Always looking for opportunities to solve real-world problems with technology.",
    heroViewProjects: "View projects →",
    heroGithub: "My GitHub",
    phrases: [
      "Full-Stack Developer",
      "AI & Computer Vision Researcher",
      "Major: Math - CS",
    ],

    aboutTitle1: "Logical thinking,",
    aboutTitle2: "practical code",
    aboutP1: (
      <>
        With a strong logical foundation from my{" "}
        <strong className="text-white">Math - CS</strong> major, I approach
        programming not just as writing code but as designing optimal systems
        and efficient algorithmic solutions.
      </>
    ),
    aboutP2: (
      <>
        Diverse experience ranging from Desktop management apps (C#),
        Backend/Frontend Web development (Node.js), to researching and deploying
        Computer Vision models like{" "}
        <strong className="text-cyan-400">YOLO</strong>.
      </>
    ),
    aboutP3: (
      <>
        <strong className="text-white">Career goal:</strong> Become a
        well-rounded Software Engineer, continuously learning and applying new
        technologies to build products that deliver real value to businesses and
        communities.
      </>
    ),
    aboutStats: [
      { n: "4+", label: "Years of study" },
      { n: "10+", label: "Personal projects" },
      { n: "8", label: "Technologies" },
    ],

    hobbiesTitle1: "Passion for",
    hobbiesTitle2: "exploration",
    hobbiesP1:
      "Beyond hours of coding and algorithms, I have a strong passion for traveling and exploring new worlds.",
    hobbiesP2:
      "Every trip not only brings the chance to experience diverse cultures and enjoy local cuisine, but also a way for me to find inspiration, recharge creative energy, and broaden my worldview.",

    skillsTitle1: "Technologies &",
    skillsTitle2: "Skills",
    skillsMastery: "Proficiency level",

    expTitle1: "Career",
    expTitle2: "Journey",
    expViewPhoto: "View photo",

    projTitle1: "Featured",
    projTitle2: "projects",
    projSubtitle: "Some notable products I have researched and developed.",
    projGithub: "View on GitHub",

    contactTitle1: "Let's",
    contactTitle2: "connect",
    contactDesc:
      "I'm always open to discussing new projects, collaboration opportunities, or simply a conversation about technology.",

    footer: `© ${new Date().getFullYear()} Vũ Hà Nam. All rights reserved.`,
  },
} as const;

const NAV_IDS = [
  "about",
  "hobbies",
  "skills",
  "experience",
  "projects",
  "contact",
];

const SKILLS: { label: string; level: number; cat: string }[] = [
  { label: "C# / .NET", level: 88, cat: "backend" },
  { label: "Python", level: 82, cat: "backend" },
  { label: "SQL", level: 85, cat: "backend" },
  { label: "JavaScript / TypeScript", level: 80, cat: "frontend" },
  { label: "React", level: 78, cat: "frontend" },
  { label: "Node.js", level: 74, cat: "backend" },
  { label: "Deep Learning / YOLO", level: 70, cat: "ai" },
  { label: "Git / GitLab", level: 87, cat: "tools" },
];

const EXPERIENCES_DATA = {
  vi: [
    {
      company: "Newwave Solutions",
      role: "Software Engineer",
      period: "10/2025 - 4/2026",
      desc: "Tham gia phát triển các dự án phần mềm y tế, đảm nhiệm vai trò xây dựng hệ thống Backend mạnh mẽ và ứng dụng đa nền tảng sử dụng công nghệ .NET MAUI. Công việc đòi hỏi sự chính xác cao, xử lý các nghiệp vụ phức tạp đặc thù của ngành y tế, đồng thời đảm bảo hiệu năng và tính bảo mật nghiêm ngặt cho dữ liệu hệ thống.",
      images: [
        "/z7700752158892_35cf93189a2a6b19faefaec65dfc5003.jpg",
        "/z7700752156892_c5bc5d024d383a768648550195bc9042.jpg",
      ],
      color: "#10b981",
    },
    {
      company: "MobiFone",
      role: "Frontend Developer",
      period: "2/2025 - 7/2025",
      desc: "Đảm nhiệm vai trò Intern Frontend Developer, trực tiếp tham gia xây dựng và tối ưu hóa giao diện cho các nền tảng dịch vụ của MobiFone. Trọng tâm công việc là hiện thực hóa các thiết kế UI/UX thành sản phẩm thực tế, xử lý luồng dữ liệu mượt mà qua việc tích hợp API Backend và cải thiện trải nghiệm tương tác cho người dùng cuối.",
      images: ["/z7700752128955_8257d1bc89a31faf9b136de293694239.jpg"],
      color: "#3b82f6",
    },
  ] as Experience[],
  en: [
    {
      company: "Newwave Solutions",
      role: "Software Engineer",
      period: "10/2025 - 4/2026",
      desc: "Participated in developing medical software projects, responsible for building robust Backend systems and cross-platform applications using .NET MAUI. The work demanded high precision, handling complex business logic specific to the healthcare industry, while ensuring strict performance and data security.",
      images: [
        "/z7700752158892_35cf93189a2a6b19faefaec65dfc5003.jpg",
        "/z7700752156892_c5bc5d024d383a768648550195bc9042.jpg",
      ],
      color: "#10b981",
    },
    {
      company: "MobiFone",
      role: "Frontend Developer",
      period: "2/2025 - 7/2025",
      desc: "Served as an Intern Frontend Developer, directly involved in building and optimizing interfaces for MobiFone's service platforms. Core work focused on translating UI/UX designs into real products, handling smooth data flows through Backend API integration and improving end-user interaction experience.",
      images: ["/z7700752128955_8257d1bc89a31faf9b136de293694239.jpg"],
      color: "#3b82f6",
    },
  ] as Experience[],
};

const PROJECTS_DATA = {
  vi: [
    {
      title: "Owen",
      desc: "Hệ thống quản lý và vận hành sàn thương mại điện tử. Xây dựng bằng Node.js và MongoDB, tối ưu hóa quy trình xử lý đơn hàng, quản lý giỏ hàng, và xử lý lượng lớn dữ liệu sản phẩm với hiệu năng cao.",
      tags: ["Node.js", "MongoDB", "Express", "REST API"],
      color: "#3b82f6",
      icon: <GiShoppingCart />,
      github: "https://github.com/VuNam002/Owen"
    },
    {
      title: "AI Giám sát an toàn & PPE",
      desc: "Đồ án tốt nghiệp: Hệ thống web end-to-end tích hợp AI tự động hóa giám sát an toàn lao động qua phát hiện trang bị bảo hộ (YOLO/SSD) và nhận diện nhân sự. Xây dựng REST API bằng C# (.NET Core) xử lý luồng nhận diện thời gian thực và Dashboard quản lý bằng Next.js & TypeScript.",
      tags: ["Python", "PyTorch", "OpenCV", ".NET Core API", "Next.js","SQL Server","Shadcn/ui"],
      color: "#10b981",
      icon: <IoShield />,
      github: "https://github.com/VuNam002/Graduation-Project",
    },
    {
      title: "Student Management App",
      desc: "Hệ thống quản lý học sinh toàn diện với giao diện hiện đại, mượt mà. Xây dựng backend mạnh mẽ bằng ASP.NET kết hợp cùng frontend tối ưu bằng Next.js và thư viện UI shadcn/ui.",
      tags: ["ASP.NET", "Next.js", "Shadcn/ui", "TypeScript", "SQL Server"],
      color: "#8b5cf6",
      icon: <TbWorldCode />,
      github: "https://github.com/VuNam002/Student",
    },
    {
      title: "Real-time Playing Cards Detection",
      desc: "Hệ thống thị giác máy tính nhận diện và phân loại lá bài qua webcam theo thời gian thực sử dụng YOLOv8. Dự án xử lý tập dữ liệu hơn 10.100 ảnh (Roboflow), tối ưu luồng video tracking đa đối tượng với thông lượng cao và áp dụng nền tảng toán học (thuật toán Subgradient) để tối ưu hiệu suất mô hình học sâu.",
      tags: [
        "YOLOv8",
        "Python",
        "Computer Vision",
        "Deep Learning",
        "Roboflow",
      ],
      color: "#ef4444",
      icon: <TbCameraAi />,
      github: "https://github.com/VuNam002/PlayingCards_Camera",
    },
    {
      title: "Football Tracking & Analysis",
      desc: "Huấn luyện mô hình YOLO tùy chỉnh để nhận diện và theo dõi cầu thủ, trọng tài, quả bóng. Xây dựng data pipeline tự động hóa tiền xử lý dữ liệu. Phân tích hiệu suất mô hình qua biểu đồ nhiệt, ma trận tương quan và triển khai suy luận trên video để trích xuất chỉ số chuyển động theo thời gian thực.",
      tags: ["YOLO", "Object Detection", "Data Analysis", "Python", "Deep Learning"],
      color: "#22c55e",
      icon: <TbBallFootball />,
      github: "https://github.com/VuNam002/Deep-learning",
    },
    {
      title: "Clinic Appointment System",
      desc: "Hệ thống quản lý đặt lịch hẹn phòng khám chuyên nghiệp, hỗ trợ bệnh nhân đăng ký trực tuyến và bác sĩ quản lý lịch trình làm việc. Dự án tối ưu hóa quy trình vận hành y tế thông qua việc quản lý hồ sơ bệnh án điện tử, tự động hóa sắp xếp lịch hẹn và đảm bảo tính bảo mật dữ liệu cao.",
      tags: ["MAUI", "SQL Server", "Entity Framework"],
      color: "#0ea5e9", 
      icon: <TbCalendarTime />, 
      github: "https://github.com/VuNam002/appointment-scheduling-project",
},
  ] as Project[],
  en: [
    {
      title: "Owen",
      desc: "E-commerce platform management and operations system. Built with Node.js and MongoDB, optimizing order processing, cart management, and handling large volumes of product data with high performance.",
      tags: ["Node.js", "MongoDB", "Express", "REST API"],
      color: "#3b82f6",
      icon: <GiShoppingCart />,
      github: "https://github.com/VuNam002/Owen",
    },
    {
      title: "AI Safety Surveillance & PPE",
      desc: "Graduation project: An end-to-end web system integrating AI to automate workplace safety monitoring via PPE detection (YOLO/SSD) and personnel identification. Built REST API with C# (.NET Core) for real-time detection streams and a management dashboard with Next.js & TypeScript.",
      tags: ["Python", "PyTorch", "OpenCV", ".NET Core API", "Next.js"],
      color: "#10b981",
      icon: <IoShield />,
      github: "https://github.com/VuNam002/Graduation-Project",
    },
    {
      title: "Student Management App",
      desc: "A comprehensive student management system with a modern, smooth interface. Built with a robust ASP.NET backend combined with an optimized Next.js frontend and the shadcn/ui component library.",
      tags: ["ASP.NET", "Next.js", "shadcn/ui", "TypeScript"],
      color: "#8b5cf6",
      icon: <TbWorldCode />,
      github: "https://github.com/VuNam002/Student",
    },
    {
      title: "Real-time Playing Cards Detection",
      desc: "Computer vision system for real-time playing cards detection and classification via webcam using YOLOv8. Processed a dataset of over 10,100 images (Roboflow), optimized high-throughput multi-object tracking video stream, and applied mathematical foundation (Subgradient algorithm) to optimize deep learning model performance.",
      tags: ["YOLOv8", "Python", "Computer Vision", "Deep Learning", "Roboflow"],
      color: "#ef4444",
      icon: <TbCameraAi />,
      github: "https://github.com/VuNam002/PlayingCards_Camera",
    },
    {
      title: "Football Tracking & Analysis",
      desc: "Trained a custom YOLO model to detect and track players, referees, and the ball. Built an automated data preprocessing pipeline. Analyzed model performance via heatmaps, correlation matrices, and deployed video inference to extract real-time movement metrics.",
      tags: ["YOLO", "Object Detection", "Data Analysis", "Python", "Deep Learning"],
      color: "#22c55e",
      icon: <TbBallFootball />,
      github: "https://github.com/VuNam002/Deep-learning",
    },
    {
      title: "Clinic Appointment System",
      desc: "Professional clinic appointment management system, supporting online patient registration and doctor schedule management. Optimized healthcare operations through electronic medical record management, automated appointment scheduling, and strict data security.",
      tags: ["MAUI", "SQL Server", "Entity Framework"],
      color: "#0ea5e9", 
      icon: <TbCalendarTime />, 
      github: "https://github.com/VuNam002/appointment-scheduling-project",
    },
  ] as Project[],
};

const CONTACT_LINKS = [
  { label: "GitHub", href: "https://github.com", icon: <FiGithub /> },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/feed/",
    icon: <FaLinkedinIn />,
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com/vu.ha.nam.876666/?locale=vi_VN",
    icon: <FaFacebookF />,
  },
];

function LangToggle() {
  const { lang, setLang } = useLang();
  return (
    <button
      onClick={() => setLang(lang === "vi" ? "en" : "vi")}
      className="flex items-center gap-1.5 px-2 py-1.5 rounded-md text-zinc-400 text-sm   transition-colors duration-300 bg-transparent cursor-pointer"
      title={lang === "vi" ? "Switch to English" : "Chuyển sang Tiếng Việt"}
    >
      <span className="text-base leading-none">
        {lang === "vi" ? "VN" : "EN"}
      </span>
      <span className="font-medium uppercase tracking-wider">
        {lang === "vi" ? "EN" : "VI"}
      </span>
    </button>
  );
}

function MatrixCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const CHARS = "01アイウエオカキクケコABCDEF+-=><";
    const fontSize = 13;
    let cols = Math.floor(canvas.width / fontSize);
    const drops: number[] = Array(cols).fill(1);

    const tick = () => {
      ctx.fillStyle = "rgba(0,0,0,0.05)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "#1d4ed8";
      ctx.font = `${fontSize}px monospace`;

      cols = Math.floor(canvas.width / fontSize);
      for (let i = 0; i < cols; i++) {
        const ch = CHARS[Math.floor(Math.random() * CHARS.length)];
        ctx.fillText(ch, i * fontSize, (drops[i] ?? 1) * fontSize);
        if (
          (drops[i] ?? 1) * fontSize > canvas.height &&
          Math.random() > 0.975
        ) {
          drops[i] = 0;
        }
        drops[i] = (drops[i] ?? 0) + 1;
      }
    };

    const id = setInterval(tick, 50);
    return () => {
      clearInterval(id);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full opacity-20 pointer-events-none z-0"
    />
  );
}

function GlowCard({
  children,
  className = "",
  glowColor = "#3b82f6",
}: {
  children: React.ReactNode;
  className?: string;
  glowColor?: string;
}) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        boxShadow: hovered
          ? `0 0 30px 4px ${glowColor}55, 0 0 0 1px ${glowColor}88`
          : `0 0 0 1px rgba(255,255,255,0.08)`,
        transition: "box-shadow 0.4s ease",
      }}
      className={`rounded-2xl bg-zinc-900/80 backdrop-blur-sm p-6 ${className}`}
    >
      {children}
    </div>
  );
}
function SkillBar({
  label,
  level,
  delay,
}: {
  label: string;
  level: number;
  delay: number;
}) {
  const { ref, visible } = useInView();
  return (
    <div ref={ref} className="mb-4">
      <div className="flex justify-between mb-1.5 text-sm">
        <span className="text-zinc-300 tracking-wide">{label}</span>
        <span className="text-blue-400 tracking-wide">{level}%</span>
      </div>
      <div className="h-1.5 rounded-full bg-zinc-800 overflow-hidden">
        <div
          className="h-full rounded-full bg-gradient-to-r from-blue-600 to-cyan-400"
          style={{
            width: visible ? `${level}%` : "0%",
            transition: `width 1.1s cubic-bezier(.4,0,.2,1) ${delay}ms`,
          }}
        />
      </div>
    </div>
  );
}

function ProjectCard({ project, delay }: { project: Project; delay: number }) {
  const { ref, visible } = useInView();
  const { lang } = useLang();
  const t = T[lang];
  return (
    <div
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(40px)",
        transition: `opacity 0.7s ease ${delay}ms, transform 0.7s ease ${delay}ms`,
      }}
    >
      <GlowCard
        glowColor={project.color}
        className="h-full flex flex-col gap-4"
      >
        <div className="flex items-start justify-between">
          <div className="text-4xl">{project.icon}</div>
        </div>
        <h3
          className="text-2xl font-semibold text-white tracking-wide"
          style={{ fontFamily: "var(--font-playfair), serif" }}
        >
          {project.title}
        </h3>
        <p className="text-zinc-400 text-sm leading-relaxed flex-1">
          {project.desc}
        </p>
        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              style={{
                borderColor: project.color + "66",
                color: project.color,
              }}
              className="text-xs px-2.5 py-1 rounded-full border tracking-wide"
            >
              {tag}
            </span>
          ))}
        </div>
        {project.github && (
          <div className="pt-4 mt-2 border-t border-zinc-800/50">
            <a
              href={project.github}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 text-sm font-medium text-zinc-400 hover:text-white transition-colors duration-300"
            >
              <FiGithub className="w-5 h-5" />
              {t.projGithub}
            </a>
          </div>
        )}
      </GlowCard>
    </div>
  );
}

function ExperienceCard({
  exp,
  delay,
  onImageClick,
}: {
  exp: Experience;
  delay: number;
  onImageClick: (img: string) => void;
}) {
  const { ref, visible } = useInView();
  const { lang } = useLang();
  const t = T[lang];

  return (
    <div
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(40px)",
        transition: `opacity 0.7s ease ${delay}ms, transform 0.7s ease ${delay}ms`,
      }}
    >
      <GlowCard glowColor={exp.color} className="flex flex-col gap-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-zinc-800/50 pb-5">
          <div>
            <h3
              className="text-2xl font-semibold text-white tracking-wide"
              style={{ fontFamily: "var(--font-playfair), serif" }}
            >
              {exp.role}
            </h3>
            <p
              className="text-lg mt-1 tracking-wide font-medium"
              style={{ color: exp.color }}
            >
              {exp.company}
            </p>
          </div>
          <span className="text-sm tracking-wide text-zinc-400 px-4 py-1.5 bg-zinc-800/50 rounded-full w-fit whitespace-nowrap border border-zinc-700/50">
            {exp.period}
          </span>
        </div>
        <p className="text-zinc-400 leading-relaxed text-base">{exp.desc}</p>
        {exp.images.length > 0 && (
          <div
            className={`grid gap-4 mt-2 ${
              exp.images.length === 1
                ? "grid-cols-1 md:w-3/4 mx-auto"
                : "grid-cols-1 md:grid-cols-2"
            }`}
          >
            {exp.images.map((img, idx) => (
              <div
                key={idx}
                onClick={() => onImageClick(img)}
                className="relative group overflow-hidden rounded-xl border border-zinc-800/80 aspect-video bg-zinc-950/50 shadow-inner cursor-pointer"
              >
                <img
                  src={img}
                  alt="background blur"
                  className="absolute inset-0 w-full h-full object-cover blur-xl opacity-30 scale-110 pointer-events-none"
                />
                <img
                  src={img}
                  alt={`${exp.company} view ${idx + 1}`}
                  className="relative z-10 w-full h-full object-contain opacity-70 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 ease-out"
                />
                <div className="absolute inset-0 z-20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none bg-black/30 backdrop-blur-[2px]">
                  <span className="px-5 py-2 bg-black/80 backdrop-blur-md rounded-full text-[10px] text-zinc-300 group-hover:text-white uppercase tracking-widest border border-white/10 shadow-[0_0_15px_rgba(255,255,255,0.1)]">
                    {t.expViewPhoto}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </GlowCard>
    </div>
  );
}

export default function Home() {
  const [lang, setLang] = useState<Lang>("vi");
  const t = T[lang];
  const EXPERIENCES = EXPERIENCES_DATA[lang];
  const PROJECTS = PROJECTS_DATA[lang];

  const [scrolled, setScrolled] = useState(false);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [selectedImg, setSelectedImg] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
      let current = "";
      NAV_IDS.forEach((id) => {
        const section = document.getElementById(id);
        if (section && window.scrollY >= section.offsetTop - 300) {
          current = id;
        }
      });
      setActiveSection(current);
    };
    window.addEventListener("scroll", onScroll);
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const move = (e: MouseEvent) =>
      setCursorPos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  const [phraseIdx, setPhraseIdx] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    setPhraseIdx(0);
    setDisplayed("");
    setDeleting(false);
  }, [lang]);

  useEffect(() => {
    const phrases = t.phrases;
    const phrase = phrases[phraseIdx]!;
    const delay = deleting ? 40 : 80;
    const timeout = setTimeout(() => {
      if (!deleting && displayed.length < phrase.length) {
        setDisplayed(phrase.slice(0, displayed.length + 1));
      } else if (!deleting && displayed.length === phrase.length) {
        setTimeout(() => setDeleting(true), 1600);
      } else if (deleting && displayed.length > 0) {
        setDisplayed(displayed.slice(0, -1));
      } else {
        setDeleting(false);
        setPhraseIdx((phraseIdx + 1) % phrases.length);
      }
    }, delay);
    return () => clearTimeout(timeout);
  });

  const { ref: aboutRef, visible: aboutVisible } = useInView();
  const { ref: hobbiesRef, visible: hobbiesVisible } = useInView();

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const navLabels = t.nav;

  return (
    <LangContext.Provider value={{ lang, setLang }}>
      <div className="min-h-screen bg-black text-white overflow-x-hidden">
        <MatrixCanvas />
        <div
          className="pointer-events-none fixed inset-0 z-30 transition-opacity duration-300"
          style={{
            background: `radial-gradient(600px circle at ${cursorPos.x}px ${cursorPos.y}px, rgba(29,78,216,0.07), transparent 80%)`,
          }}
        />

        <div
          className="pointer-events-none fixed inset-0 z-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        <nav
          className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
            scrolled
              ? "bg-black/80 backdrop-blur-xl border-b border-white/5"
              : ""
          }`}
        >
          <div className="max-w-6xl mx-auto px-6 py-5 flex justify-between items-center">
            <div className="md:hidden text-white font-medium tracking-widest uppercase">
              Vũ Hà Nam
            </div>

            <div className="hidden md:flex gap-8">
              {NAV_IDS.map((id, i) => (
                <button
                  key={id}
                  onClick={() => scrollTo(id)}
                  className={`text-sm uppercase tracking-widest transition-colors relative group bg-transparent border-none cursor-pointer ${
                    activeSection === id
                      ? "text-white font-semibold"
                      : "text-zinc-400 hover:text-white"
                  }`}
                >
                  {navLabels[i]}
                  <span
                    className={`absolute -bottom-0.5 left-0 h-px bg-blue-500 transition-all duration-300 ${
                      activeSection === id ? "w-full" : "w-0 group-hover:w-full"
                    }`}
                  />
                </button>
              ))}
            </div>

            <div className="hidden md:flex items-center gap-4">
              <LangToggle />
              <a
                href="https://drive.google.com/file/d/16e61vQOS1vEs1RwYwzlJi3GDFdsdCdDf/view?usp=sharing"
                target="_blank"
                rel="noreferrer"
                className="px-4 py-1.5 text-sm font-medium tracking-wider rounded-md bg-blue-600/10 text-blue-400 hover:bg-blue-600/20 transition-colors border border-blue-500/20"
              >
                {t.navResume}
              </a>
            </div>

            <button
              className="md:hidden text-white p-2 -mr-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                {mobileMenuOpen ? (
                  <>
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </>
                ) : (
                  <>
                    <line x1="3" y1="12" x2="21" y2="12" />
                    <line x1="3" y1="6" x2="21" y2="6" />
                    <line x1="3" y1="18" x2="21" y2="18" />
                  </>
                )}
              </svg>
            </button>
          </div>

          <div
            className={`md:hidden absolute top-full left-0 w-full bg-black/95 backdrop-blur-xl border-b border-white/10 overflow-hidden transition-all duration-300 ${
              mobileMenuOpen
                ? "max-h-[500px] py-4"
                : "max-h-0 py-0 border-transparent"
            }`}
          >
            <div className="flex flex-col px-6 gap-4">
              {NAV_IDS.map((id, i) => (
                <button
                  key={id}
                  onClick={() => {
                    scrollTo(id);
                    setMobileMenuOpen(false);
                  }}
                  className={`text-sm uppercase tracking-widest transition-colors text-left ${
                    activeSection === id
                      ? "text-white font-semibold"
                      : "text-zinc-400 hover:text-white"
                  }`}
                >
                  {navLabels[i]}
                </button>
              ))}
              <div className="flex items-center gap-4 mt-2 pt-4 border-t border-white/10">
                <LangToggle />
                <a
                  href="https://drive.google.com/file/d/16e61vQOS1vEs1RwYwzlJi3GDFdsdCdDf/view?usp=sharing"
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-1.5 text-sm font-medium tracking-wider rounded-md bg-blue-600/10 text-blue-400 hover:bg-blue-600/20 transition-colors border border-blue-500/20"
                >
                  {t.navResume}
                </a>
              </div>
            </div>
          </div>
        </nav>

        <main className="relative z-10">
          <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-6">
            <div className="absolute top-1/3 left-1/4 w-96 h-96 rounded-full bg-blue-700/10 blur-3xl pointer-events-none" />
            <div className="absolute bottom-1/3 right-1/4 w-64 h-64 rounded-full bg-cyan-700/10 blur-3xl pointer-events-none" />

            <div className="relative text-center max-w-4xl">
              <h1
                className="text-5xl md:text-7xl lg:text-8xl font-medium tracking-tight mb-6 leading-tight"
                style={{ fontFamily: "var(--font-playfair), serif" }}
              >
                <span
                  className="block text-zinc-500 text-2xl md:text-3xl font-light italic mb-4 tracking-wide"
                  style={{ fontFamily: "var(--font-playfair), serif" }}
                >
                  {t.heroGreeting}
                </span>
                <span className="bg-gradient-to-r from-white via-blue-100 to-cyan-300 bg-clip-text text-transparent">
                  Vũ Hà Nam
                </span>
              </h1>

              <div className="h-10 mb-8 flex items-center justify-center">
                <p className="text-lg md:text-xl text-blue-400 font-light tracking-wide">
                  {displayed}
                  <span className="inline-block w-0.5 h-5 bg-blue-400 ml-1 animate-pulse" />
                </p>
              </div>

              <p className="text-zinc-400 max-w-xl mx-auto mb-10 leading-relaxed text-base md:text-lg">
                {t.heroDesc}
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => scrollTo("projects")}
                  className="group relative px-8 py-3.5 rounded-xl bg-blue-600 text-white tracking-wide font-medium overflow-hidden transition-all duration-300 hover:bg-blue-500 hover:shadow-[0_0_25px_rgba(59,130,246,0.5)] cursor-pointer border-none"
                >
                  <span className="relative z-10">{t.heroViewProjects}</span>
                </button>
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noreferrer"
                  className="px-8 py-3.5 rounded-xl border border-zinc-700 text-zinc-300 tracking-wide hover:border-zinc-500 hover:text-white transition-all duration-300"
                >
                  {t.heroGithub}
                </a>
              </div>
            </div>

            <div className="absolute bottom-8 flex flex-col items-center gap-2 animate-bounce">
              <span className="text-xs uppercase tracking-widest text-zinc-600">
                scroll
              </span>
              <div className="w-px h-8 bg-gradient-to-b from-zinc-600 to-transparent" />
            </div>
          </section>

          <section id="about" className="py-28 px-6">
            <div className="max-w-6xl mx-auto">
              <div
                ref={aboutRef}
                className="grid md:grid-cols-2 gap-16 items-center"
                style={{
                  opacity: aboutVisible ? 1 : 0,
                  transform: aboutVisible ? "none" : "translateY(40px)",
                  transition: "opacity 0.8s ease, transform 0.8s ease",
                }}
              >
                <div>
                  <h2
                    className="text-4xl md:text-5xl font-medium mb-6 leading-tight"
                    style={{ fontFamily: "var(--font-playfair), serif" }}
                  >
                    {t.aboutTitle1}{" "}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
                      {t.aboutTitle2}
                    </span>
                  </h2>
                  <p className="text-zinc-400 leading-relaxed mb-4">
                    {t.aboutP1}
                  </p>
                  <p className="text-zinc-400 leading-relaxed mb-4">
                    {t.aboutP2}
                  </p>
                  <p className="text-zinc-400 leading-relaxed">{t.aboutP3}</p>

                  <div className="grid grid-cols-3 gap-4 mt-10">
                    {t.aboutStats.map(({ n, label }) => (
                      <div key={label} className="text-center">
                        <div
                          className="text-4xl font-light text-white mb-2"
                          style={{ fontFamily: "var(--font-playfair), serif" }}
                        >
                          {n}
                        </div>
                        <div className="text-xs text-zinc-500 mt-1">
                          {label}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="relative mt-12 md:mt-0 pb-16 md:pb-10">
                  <div className="absolute top-5 right-0 w-1/4 h-px bg-gradient-to-l from-blue-500/60 to-transparent z-[5]" />
                  <div className="absolute bottom-20 left-0 w-px h-1/4 bg-gradient-to-t from-cyan-500/40 to-transparent z-[5]" />
                  <div className="relative w-4/5 md:w-3/4 aspect-[4/5] rounded-2xl overflow-hidden border border-zinc-800/80 z-10 ml-auto group shadow-2xl shadow-blue-900/10 bg-zinc-900">
                    <img
                      src="/gioithieubanthan.jpg"
                      className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/20 to-transparent pointer-events-none opacity-50 group-hover:opacity-100 transition-opacity duration-700" />
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section id="hobbies" className="py-28 px-6 bg-zinc-950/50">
            <div className="max-w-6xl mx-auto">
              <div
                ref={hobbiesRef}
                className="grid md:grid-cols-2 gap-16 items-center"
                style={{
                  opacity: hobbiesVisible ? 1 : 0,
                  transform: hobbiesVisible ? "none" : "translateY(40px)",
                  transition: "opacity 0.8s ease, transform 0.8s ease",
                }}
              >
                <div className="order-2 md:order-1 relative w-full aspect-[4/3] rounded-2xl overflow-hidden border border-zinc-800/80 group shadow-2xl shadow-blue-900/10 bg-zinc-900">
                  <img
                    src="/anh7.jpg"
                    alt="Hobby travel"
                    className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500/20 to-transparent pointer-events-none opacity-50 group-hover:opacity-100 transition-opacity duration-700" />
                </div>

                <div className="order-1 md:order-2">
                  <h2
                    className="text-4xl md:text-5xl font-medium mb-6 leading-tight"
                    style={{ fontFamily: "var(--font-playfair), serif" }}
                  >
                    {t.hobbiesTitle1}{" "}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">
                      {t.hobbiesTitle2}
                    </span>
                  </h2>
                  <p className="text-zinc-400 leading-relaxed mb-4">
                    {t.hobbiesP1}
                  </p>
                  <p className="text-zinc-400 leading-relaxed">{t.hobbiesP2}</p>
                </div>
              </div>
            </div>
          </section>

          <section id="skills" className="py-28 px-6">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <h2
                  className="text-4xl md:text-5xl font-medium"
                  style={{ fontFamily: "var(--font-playfair), serif" }}
                >
                  {t.skillsTitle1}{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
                    {t.skillsTitle2}
                  </span>
                </h2>
              </div>

              <div className="grid md:grid-cols-2 gap-12">
                <GlowCard>
                  <h3 className="text-xs text-zinc-500 tracking-widest uppercase mb-6">
                    {t.skillsMastery}
                  </h3>
                  {SKILLS.map((s, i) => (
                    <SkillBar
                      key={s.label}
                      label={s.label}
                      level={s.level}
                      delay={i * 80}
                    />
                  ))}
                </GlowCard>

                <div className="flex flex-col gap-6">
                  {[
                    {
                      title: "Backend",
                      items: ["C# / .NET", "Python", "Node.js", "SQL Server"],
                      color: "#3b82f6",
                    },
                    {
                      title: "Frontend",
                      items: ["React", "TypeScript", "Tailwind CSS", "Next.js"],
                      color: "#10b981",
                    },
                    {
                      title: "AI / ML",
                      items: ["YOLOv8", "OpenCV", "PyTorch", "Scikit-learn"],
                      color: "#8b5cf6",
                    },
                    {
                      title: "DevOps & Tools",
                      items: ["Git", "GitLab", "Docker", "GitHub"],
                      color: "#f59e0b",
                    },
                  ].map((cat) => (
                    <GlowCard
                      key={cat.title}
                      glowColor={cat.color}
                      className="py-4"
                    >
                      <h4
                        className="text-xs tracking-widest uppercase mb-3"
                        style={{ color: cat.color }}
                      >
                        {cat.title}
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {cat.items.map((item) => (
                          <span
                            key={item}
                            className="px-3 py-1 rounded-md bg-zinc-800 text-zinc-300 text-xs tracking-wide hover:text-white transition-colors"
                          >
                            {item}
                          </span>
                        ))}
                      </div>
                    </GlowCard>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <section id="experience" className="py-28 px-6 bg-zinc-950/50">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-16">
                <h2
                  className="text-4xl md:text-5xl font-medium"
                  style={{ fontFamily: "var(--font-playfair), serif" }}
                >
                  {t.expTitle1}{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
                    {t.expTitle2}
                  </span>
                </h2>
              </div>
              <div className="flex flex-col gap-10">
                {EXPERIENCES.map((exp, i) => (
                  <ExperienceCard
                    key={exp.company}
                    exp={exp}
                    delay={i * 150}
                    onImageClick={setSelectedImg}
                  />
                ))}
              </div>
            </div>
          </section>

          <section id="projects" className="py-28 px-6">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <h2
                  className="text-4xl md:text-5xl font-medium"
                  style={{ fontFamily: "var(--font-playfair), serif" }}
                >
                  {t.projTitle1}{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
                    {t.projTitle2}
                  </span>
                </h2>
                <p className="text-zinc-500 mt-4 max-w-xl mx-auto">
                  {t.projSubtitle}
                </p>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {PROJECTS.map((p, i) => (
                  <ProjectCard key={p.title} project={p} delay={i * 150} />
                ))}
              </div>
            </div>
          </section>

          <section id="contact" className="py-28 px-6 bg-zinc-950/50">
            <div className="max-w-2xl mx-auto text-center">
              <h2
                className="text-4xl md:text-5xl font-medium mb-6"
                style={{ fontFamily: "var(--font-playfair), serif" }}
              >
                {t.contactTitle1}{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
                  {t.contactTitle2}
                </span>
              </h2>
              <p className="text-zinc-400 mb-10 leading-relaxed">
                {t.contactDesc}
              </p>
              <div className="flex justify-center gap-6">
                {CONTACT_LINKS.map(({ label, href, icon }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    className="flex flex-col items-center gap-2 group"
                  >
                    <div className="w-12 h-12 rounded-xl border border-zinc-700 flex items-center justify-center text-lg text-zinc-400 group-hover:border-blue-500 group-hover:text-blue-400 transition-all duration-300 group-hover:shadow-[0_0_15px_rgba(59,130,246,0.3)]">
                      {icon}
                    </div>
                    <span className="text-xs text-zinc-600 group-hover:text-zinc-400 transition-colors">
                      {label}
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </section>
        </main>

        <footer className="border-t border-zinc-900 py-8 px-6">
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-xs tracking-wide text-zinc-600">
            <span>{t.footer}</span>
          </div>
        </footer>

        {selectedImg && (
          <div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm cursor-zoom-out"
            onClick={() => setSelectedImg(null)}
          >
            <img
              src={selectedImg}
              alt="Phóng to"
              className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
            />
            <button
              className="absolute top-6 right-6 text-white bg-white/10 hover:bg-white/20 w-10 h-10 flex items-center justify-center rounded-full backdrop-blur-md transition-colors"
              onClick={(e) => {
                e.stopPropagation();
                setSelectedImg(null);
              }}
            >
              ✕
            </button>
          </div>
        )}
      </div>
    </LangContext.Provider>
  );
}
