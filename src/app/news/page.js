import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function NewsPage() {
    return (
        <div className="min-h-screen flex flex-col gap-4 items-center justify-center">
            <p className="text-xs px-3 py-2 border rounded-full">
                News & Blog
            </p>

            <h1 className="text-2xl">
                Coming Soon!
            </h1>
            <Link href="/">
                <Button>
                    Go Back
                </Button>
            </Link>
        </div>
    )
}