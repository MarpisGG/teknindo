"use client";
import React from "react";
import { StickyScroll } from "@/components/ui/sticky-scroll-reveal";

interface ContentItem {
    title: string;
    description: string;
    content: React.ReactNode;
}

const content: ContentItem[] = [
    {
        title: "2019 - The Beginning",
        description:
            "In 2019, we embarked on a journey to revolutionize the way teams collaborate. Our mission was clear: to create a platform that would empower teams to work together seamlessly, no matter where they were located.",
        content: (
            <div className="h-full w-full bg-[linear-gradient(to_bottom_right,var(--cyan-500),var(--emerald-500))] flex items-center justify-center text-white">
                Collaborative Editing
            </div>
        ),
    },
    {
        title: "2022 ",
        description:
            "See changes as they happen. With our platform, you can track every modification in real time. No more confusion about the latest version of your project. Say goodbye to the chaos of version control and embrace the simplicity of real-time updates.",
        content: (
            <div className="h-full w-full  flex items-center justify-center text-white">
                <img
                    src="https://ui.aceternity.com/_next/image?url=%2Flinear.webp&w=640&q=75"
                    width={300}
                    height={300}
                    className="h-full w-full object-cover"
                    alt="linear board demo"
                />
            </div>
        ),
    },
    {
        title: "Version control",
        description:
            "Experience real-time updates and never stress about version control again. Our platform ensures that you're always working on the most recent version of your project, eliminating the need for constant manual updates. Stay in the loop, keep your team aligned, and maintain the flow of your work without any interruptions.",
        content: (
            <div className="h-full w-full bg-[linear-gradient(to_bottom_right,var(--orange-500),var(--yellow-500))] flex items-center justify-center text-white">
                Version control
            </div>
        ),
    },
    {
        title: "Running out of content",
        description:
            "Experience real-time updates and never stress about version control again. Our platform ensures that you're always working on the most recent version of your project, eliminating the need for constant manual updates. Stay in the loop, keep your team aligned, and maintain the flow of your work without any interruptions.",
        content: (
            <div className="h-full w-full bg-[linear-gradient(to_bottom_right,var(--cyan-500),var(--emerald-500))] flex items-center justify-center text-white">
                Running out of content
            </div>
        ),
    },
];

const StickyScrollRevealComponent = (): React.ReactElement => {
    return (
        <div style={{ overflowY: 'auto', scrollbarWidth: 'none', msOverflowStyle: 'none' }} className="h-full">
            <style dangerouslySetInnerHTML={{ __html: `::-webkit-scrollbar { display: none; }` }} />
            <StickyScroll content={content} />
        </div>
    );
}

export default StickyScrollRevealComponent;
