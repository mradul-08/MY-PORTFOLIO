import { Services } from "@/types/type"
import Image1 from "../../public/images/services/list/serviceList_1.jpg"
import Image2 from "../../public/images/services/list/serviceList_2.jpg"
import Image3 from "../../public/images/services/list/serviceList_3.jpg"
import Image4 from "../../public/images/services/list/serviceList_4.jpg"

const services = [
    {
        title: "01 — PROBLEM SOLVING",
        skillsLabel: "Skills",
        technologies: [
            "C",
            "C++",
            "JavaScript",
        ],
        description: "I started with logic before I started thinking in frameworks. C and C++ are where I sharpen my DSA, algorithms, and problem-solving skills — breaking problems down, finding better approaches, and learning to think about efficiency before implementation. JavaScript extends that same thinking into the web, where logic becomes something people can actually interact with.",
        image: Image2
    },
    {
        title: "02 — FULL-STACK DEVELOPMENT",
        skillsLabel: "Skills",
        technologies: [
            "HTML",
            "CSS",
            "React",
            "Vite",
            "Redux Toolkit",
            "Tailwind CSS",
            "Node.js",
            "Express.js",
            "REST APIs",
            "JWT",
            "MongoDB"
        ],
        description: "Then the problems became products. I moved from solving individual problems to building complete applications — designing interfaces, managing state, creating APIs, handling authentication, and structuring persistent data. This is the layer where an idea becomes an actual product instead of just a collection of screens.",
        image: Image1
        
    },
    {
        title: "03 — SYSTEMS & PRODUCTION",
        skillsLabel: "Skills",
        technologies: [
            "Socket.IO",
            "Redis",
            "Docker",
            "AWS EC2",
            "Nginx",
            "systemd",
            "Firebase",
            "Passport.js",
            "Cloudinary",
            "LiveKit",
            "Razorpay",
            "GitHub",
            "Postman",
        ],
        description: "Building the feature was only half the challenge. Making everything work together was the next step. I started dealing with real-time communication, external services, isolated code execution, deployments, authentication providers, media, payments, server processes, and production infrastructure. That's where development stopped being just about writing code and became about keeping an entire system connected and reliable.",
        image: Image3
    },
    {
        title: "04 — AI ENGINEERING",
        skillsLabel: "Skills",
        technologies: [
            "Groq",
            "Mistral",
            "ZhipuAI",
            "Cerebras",
            "SambaNova",
            "Cloudflare Workers AI",
            "OpenRouter",
        ],
        description: "Then came the question: what if the software could build part of itself? GenWeb.ai became my exploration of that idea — turning natural-language instructions into websites, allowing those websites to be refined conversationally, and building a provider layer that can work across multiple AI models. Instead of treating AI as a single API call, I explored it as another engineering layer inside a real product.",
        image: Image4
    },
]

export const allServices : Services[] = []

services.forEach((item, i) => {
    allServices.push({
        ...item,
        id: i + 1
    })
})
