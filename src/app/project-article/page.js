import { PageSwitcher, PageWrapper } from "@/components/page-switcher";
import { ProjectComponent } from "@/components/project-component";

export default function ProjectArticlePage() {
    const tabPages = ["Project", "Article"];

    return (
        <PageSwitcher pages={tabPages}>
            <PageWrapper id="Project">
                <ProjectComponent />
            </PageWrapper>

            <PageWrapper id="Article">
                <div className="py-8">
                    <h2 className="text-3xl font-bold mb-6">My Articles</h2>
                    <div className="space-y-6">
                        <article className="pb-6 border-b">
                            <h3 className="text-xl font-semibold mb-2">Article Title 1</h3>
                            <p className="text-gray-600 mb-2">Published on Jan 1, 2025</p>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit...</p>
                        </article>
                        <article className="pb-6 border-b">
                            <h3 className="text-xl font-semibold mb-2">Article Title 2</h3>
                            <p className="text-gray-600 mb-2">Published on Feb 15, 2025</p>
                            <p>Sed do eiusmod tempor incididunt ut labore et dolore...</p>
                        </article>
                    </div>
                </div>
            </PageWrapper>
        </PageSwitcher>
    );
}