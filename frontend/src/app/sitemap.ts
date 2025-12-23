import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = "https://mikhailjamesnavarro.dev";

    return [
        {
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency: "monthly",
            priority: 1,
        },
        // Add more pages here if you create additional routes
        // {
        //   url: `${baseUrl}/projects`,
        //   lastModified: new Date(),
        //   changeFrequency: "weekly",
        //   priority: 0.8,
        // },
    ];
}
