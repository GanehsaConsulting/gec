import Image from "next/image";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function ReusableBanner({
    // Image props
    imageSrc,
    imageAlt = "Banner Image",
    imageClassName = "",
    imageHeight = "h-screen",

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
    scrollOffset = 500,
    scrollBehavior = "smooth",

    // Layout props
    contentAlign = "between",
    containerClassName = "",
    sectionClassName = "",

    // Custom children
    customContent,
}) {
    const handleScrollDown = () => {
        if (buttonOnClick) {
            buttonOnClick();
        } else if (buttonHref) {
            window.location.href = buttonHref;
        } else {
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

    const contentSection = (
        <section
            className={cn(
                "h-fit shrink-0 px-4 md:px-10 py-10 md:py-20",
                sectionClassName
            )}
        >
            <div
                className={cn(
                    "flex flex-col md:flex-row gap-5",
                    alignmentClasses[contentAlign],
                    containerClassName
                )}
            >
                {(title || titleHighlight) && (
                    <div>
                        <h1
                            className={cn(
                                "text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-tighter text-balance pb-1",
                                titleClassName
                            )}
                        >
                            {title && (
                                <>
                                    {title}
                                    <br />
                                </>
                            )}
                            {titleHighlight && (
                                <span className="text-neutral-600 dark:text-neutral-400">
                                    {titleHighlight}
                                </span>
                            )}
                        </h1>
                    </div>
                )}

                {(description || showButton || customContent) && (
                    <div className="space-y-3">
                        {description && (
                            <p
                                className={cn(
                                    "text-sm sm:text-base leading-5 md:leading-6 max-w-2xl",
                                    descriptionClassName
                                )}
                            >
                                {description}
                            </p>
                        )}

                        {customContent}

                        {showButton && (buttonText || buttonIcon) && (
                            <Button
                                variant={buttonVariant}
                                onClick={handleScrollDown}
                            >
                                {buttonText}
                                {buttonIcon && (
                                    <span className="ml-2">{buttonIcon}</span>
                                )}
                            </Button>
                        )}
                    </div>
                )}
            </div>
        </section>
    );

    if (!imageSrc) {
        return contentSection;
    }

    return (
        <div className={cn("flex flex-col w-full", imageHeight)}>
            <div className="relative flex-1 min-h-0 w-full overflow-hidden">
                <Image
                    src={imageSrc}
                    alt={imageAlt}
                    fill
                    className={cn("object-cover", imageClassName)}
                    sizes="100vw"
                    priority
                />
            </div>

            {contentSection}
        </div>
    );
}
