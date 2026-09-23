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
            "React",
            "Next.js",
            "TypeScript",
            "JavaScript",
            "Node.js",
            "Web Development",
            "Frontend Development",
            "Backend Development",
            "Game Development",
        ],
        sameAs: [
            profile.socials.github,
            profile.socials.linkedin,
            profile.socials.facebook,
        ],
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
    );
}

export function WebsiteJsonLd() {
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "WebSite",
        name: `${profile.name} - Portfolio`,
        url: "https://mikhailjamesnavarro.dev",
        description: `${profile.title} Portfolio showcasing projects and skills`,
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
    );
}
