import Image from "next/image";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function ReusableBanner({
    // Image props
    imageSrc,
    imageAlt = "Banner Image",
    imageClassName = "",
    imageHeight = "max-h-[50vh] h-[50lvh] md:h-full",

    // Title props
    title,
    titleHighlight,
    titleClassName = "",

    // Description props
    description,
    descriptionClassName = "",

    // Button props
    buttonText,
    buttonIcon,
    buttonHref,
    buttonOnClick,
    buttonVariant = "default",
    showButton = true,
    scrollOffset = 500, // Jarak scroll dalam pixels
    scrollBehavior = "smooth", // "smooth" | "auto"

    // Layout props
    contentAlign = "between", // "between" | "start" | "end" | "center"
    containerClassName = "",
    sectionClassName = "",

    // Custom children
    customContent,
}) {
    // Function untuk scroll ke bawah
    const handleScrollDown = () => {
        if (buttonOnClick) {
            buttonOnClick();
        } else if (buttonHref) {
            window.location.href = buttonHref;
        } else {
            // Default: scroll ke bawah
            window.scrollBy({
                top: scrollOffset,
                behavior: scrollBehavior,
            });
        }
    };

    const alignmentClasses = {
        between: "justify-between",
        start: "justify-start",
        end: "justify-end",
        center: "justify-center",
    };

    return (
        <>
            {/* Banner Image */}
            {imageSrc && (
                <div className="relative w-full overflow-hidden">
                    <Image
                        src={imageSrc}
                        alt={imageAlt}
                        width={1920}
                        height={800}
                        className={cn(
                            "object-cover w-full",
                            imageHeight,
                            imageClassName
                        )}
                        priority
                    />
                </div>
            )}

            {/* Content Section */}
            <section className={cn("px-4 md:px-10 py-10 md:py-20", sectionClassName)}>
                <div className={cn(
                    "flex flex-col md:flex-row gap-5",
                    alignmentClasses[contentAlign],
                    containerClassName
                )}>
                    {/* Title Section */}
                    {(title || titleHighlight) && (
                        <div>
                            <h1 className={cn(
                                "text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-tighter text-balance pb-1",
                                titleClassName
                            )}>
                                {title && <>{title}<br /></>}
                                {titleHighlight && (
                                    <span className="text-neutral-600 dark:text-neutral-400">
                                        {titleHighlight}
                                    </span>
                                )}
                            </h1>
                        </div>
                    )}

                    {/* Description & Button Section */}
                    {(description || showButton || customContent) && (
                        <div className="space-y-3">
                            {description && (
                                <p className={cn(
                                    "text-sm sm:text-base leading-5 md:leading-6 max-w-2xl",
                                    descriptionClassName
                                )}>
                                    {description}
                                </p>
                            )}

                            {/* Custom Content */}
                            {customContent}

                            {/* Button */}
                            {showButton && (buttonText || buttonIcon) && (
                                <Button
                                    variant={buttonVariant}
                                    onClick={handleScrollDown}
                                >
                                    {buttonText}
                                    {buttonIcon && (
                                        <span className="ml-2">
                                            {buttonIcon}
                                        </span>
                                    )}
                                </Button>
                            )}
                        </div>
                    )}
                </div>
            </section>
        </>
    );
}