import { Icon } from "lucide-react";
import { MdOutlineArrowOutward } from "react-icons/md";

export const Title = ({
    children,
    className = "",
    icon = true,
}) => {
    return  (
        <h2 className={`${className} flex items-center gap-2 uppercase tracking-wider text-xl font-semibold`}>
            {children}
            <span className={icon === false ? 'hidden' : 'block'}>
                <MdOutlineArrowOutward className="rotate-90" />
            </span>
        </h2>
    );
}