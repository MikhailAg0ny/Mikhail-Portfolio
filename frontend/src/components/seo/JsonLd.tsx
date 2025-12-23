export function PersonJsonLd() {
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "Person",
        name: "Mikhail James Navarro",
        url: "https://mikhailjamesnavarro.dev",
        jobTitle: "Fullstack Developer",
        description: "Fullstack Developer from Cebu, Philippines specializing in React, Next.js, and TypeScript",
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
            "https://github.com/MikhailAg0ny",
            "https://www.linkedin.com/in/mikhailjamesnavarro/",
            "https://www.facebook.com/M1kh4ilAg0ny",
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
        name: "Mikhail James Navarro - Portfolio",
        url: "https://mikhailjamesnavarro.dev",
        description: "Fullstack Developer Portfolio showcasing projects and skills",
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
    );
}
