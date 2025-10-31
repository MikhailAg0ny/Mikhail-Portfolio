# Frontend Project Structure

## 📁 Organized Folder Structure

```
frontend/
├── src/
│   ├── app/
│   │   ├── page.tsx                    # Main home page (composed of sections)
│   │   ├── layout.tsx                  # Root layout
│   │   ├── globals.css                 # Global styles
│   │   └── (main)/
│   │       ├── about/
│   │       │   ├── page.tsx
│   │       │   └── AboutPage.tsx
│   │       ├── projects/
│   │       │   ├── page.tsx
│   │       │   └── ProjectsPage.tsx
│   │       ├── contact/
│   │       │   ├── page.tsx
│   │       │   └── ContactPage.tsx
│   │       ├── achievements/
│   │       │   ├── page.tsx
│   │       │   └── AchievementsPage.tsx
│   │       └── certifications/
│   │           ├── page.tsx
│   │           └── CertificationsPage.tsx
│   │
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navbar.tsx              # Fixed navigation bar with profile
│   │   │   └── Footer.tsx              # Footer with social links
│   │   ├── sections/
│   │   │   ├── HeroSection.tsx         # Hero introduction section
│   │   │   ├── SkillsSection.tsx       # Programming languages & skills
│   │   │   └── FeaturedProjectsSection.tsx  # Project showcase
│   │   └── ui/
│   │       └── (future reusable components)
│   │
│   ├── lib/
│   │   └── data.ts                     # All data arrays & constants
│   │
│   ├── types/
│   │   └── index.ts                    # TypeScript type definitions
│   │
│   └── styles/
│       └── (future custom styles)
│
└── public/
    ├── images/
    │   └── profile.jpg                 # Your profile photo
    ├── fonts/
    ├── icons/
    └── Mikhail-Agony-Resume.pdf        # Resume file
```

## 🎯 Component Organization

### Layout Components (`components/layout/`)
- **Navbar**: Fixed top navigation with profile icon and nav links
- **Footer**: Bottom section with contact info and social links

### Section Components (`components/sections/`)
- **HeroSection**: Introduction with profile photo and CTAs
- **SkillsSection**: Programming languages with progress bars + frameworks grid
- **FeaturedProjectsSection**: Showcase of key projects

### UI Components (`components/ui/`)
- Reserved for reusable atomic components like Button, Card, Tag, etc.

## 📊 Data Management

All static data is centralized in `src/lib/data.ts`:
- `navLinks` - Navigation menu items
- `featuredProjects` - Project showcase data
- `programmingLanguages` - Skills with proficiency levels
- `frameworks` - Technology stack
- `highlights` - Stats/metrics
- `principles` - Work philosophy

## 🔤 Type Safety

TypeScript interfaces defined in `src/types/index.ts`:
- `Project`
- `ProgrammingLanguage`
- `Highlight`
- `NavLink`
- `Experience`
- `Certificate`
- `Achievement`

## 🚀 Next Steps

1. Add your profile photo to `/public/images/profile.jpg`
2. Update data in `src/lib/data.ts` with your real information
3. Customize styles in `globals.css` or create theme files in `src/styles/`
4. Build reusable UI components as needed
5. Add more sections/pages as your portfolio grows
