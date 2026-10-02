import { profile } from "@/lib/profile";

export function PersonJsonLd() {
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "Person",
        name: profile.name,
        url: "https://mikhailjamesnavarro.dev",
        jobTitle: profile.title,
        description: profile.bio.hero,
        knowsAbout: [
            "Software Development",
            "Full Stack Development",
            "Web Development",
            "Frontend Development",
            "Backend Development",
            "Game Development",
            "Mobile Application Development",
            "C#",
            "PHP",
            "React",
            "JavaScript",
            "Node.js",
            "SQL",
            "MySQL",
            "Lua",
            "Godot Engine",
        ],
        hasOccupation: [
            {
                "@type": "Occupation",
                name: "Software Developer",
            },
            {
                "@type": "Occupation",
                name: "Full Stack Developer",
            },
            {
                "@type": "Occupation",
                name: "Web Developer",
            },
        ],
        alumniOf: {
            "@type": "EducationalOrganization",
            name: "Cebu Institute of Technology - University",
        },
        sameAs: [
            profile.socials.github,
            profile.socials.linkedin,
            profile.socials.facebook,
        ],
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
        />
    );
}

export function WebsiteJsonLd() {
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "WebSite",
        name: `${profile.name} - Portfolio`,
        url: "https://mikhailjamesnavarro.dev",
        description: `${profile.title} & Full Stack Web Developer Portfolio showcasing projects and skills`,
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
        />
    );
}
