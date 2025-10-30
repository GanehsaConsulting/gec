import { CardPost } from "./card-post"
import { Sidebar } from "./sidebar"

export const ProjectComponent = () => {


    return (
        <main className="">
            <div className="absolute left-10 z-50 min-w-100 h-full">
                <Sidebar/>
            </div>
            <div className="">
                <CardPost />
            </div>
        </main>
    )
}