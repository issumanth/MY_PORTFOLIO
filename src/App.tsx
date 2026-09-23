/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Skills } from './components/Skills';
import { Projects } from './components/Projects';
import { Experience } from './components/Experience';
import { Footer } from './components/Footer';
import { CreativeIllustrationsBackground } from './components/CreativeIllustrationsBackground';
import { GooeyCursorBlob } from './components/GooeyCursorBlob';
import { skillsData, projectsData, experienceData, resumeData } from './data/portfolioData';

export default function App() {
  return (
    <div className="min-h-screen text-white flex flex-col font-sans selection:bg-cyan-500/30 selection:text-cyan-200 relative bg-gradient-to-b from-[#02131b] via-[#041a24] via-[#021118] to-[#01090d]">
      {/* 1. Global Creative Illustrations Theme across the ENTIRE webpage */}
      <CreativeIllustrationsBackground />

      {/* 2. Theme-matched Gooey Jelly Cursor Blob in the Background */}
      <GooeyCursorBlob />

      {/* 3. Header with Name & Social Icons */}
      <Navbar />

      {/* 3. Main Page Content */}
      <main className="flex-grow relative z-10">
        {/* Hero Section with Prominent Portrait Photo */}
        <Hero />

        {/* About Section */}
        <About />

        {/* Skills Section with "Things I Did" and conditional Code, PDF, Pic, Vid attachments */}
        <Skills skills={skillsData} />

        {/* Curated Projects Section (No Images, direct Live & Code options) */}
        <Projects projects={projectsData} />

        {/* Experience & Certifications Section with kinetic timeline & Resume viewer */}
        <Experience experience={experienceData} resume={resumeData} />
      </main>

      {/* 4. Footer */}
      <Footer />
    </div>
  );
}
