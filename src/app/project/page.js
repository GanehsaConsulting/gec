import { Button } from "@/components/ui/button";
import { MdOutlineArrowOutward } from "react-icons/md";

export default function ProjectArticlePage() {

    return (
        <>
            <img
                src="https://images.unsplash.com/photo-1512207736890-6ffed8a84e8d?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1758"
                alt="Under Construction"
                className="object-cover w-full max-h-[50vh] h-full"
            />
            <section className="margin py-20">
                <div className="flex justify-between">
                        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-tighter text-balance pb-1">
                            Our Project  <br />
                            <span className="text-neutral-600">
                                & Activity
                            </span>
                        </h1>
                    <div className="space-y-3">
                    <p className="text-sm sm:text-base leading-5 md:leading-6 max-w-2xl">
                        Menampilkan berbagai proyek dan aktifitas yang telah GEC selesaikan dengan standar mutu tinggi, presisi teknik, dan dedikasi penuh terhadap kepuasan mitra.
                    </p>
                        <Button>
                            Explore <MdOutlineArrowOutward className="rotate-90"/>
                        </Button>
                    </div>
                </div>
            </section>
        </>
    );
}