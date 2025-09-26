import Image from "next/image";
import { whyUs } from "./system";
import { Title } from "./title";

export const WhyUs = () => {
    return (
        <main className="margin spacing space-y-5">
            <div className="flex md:flex-row flex-col gap-2">
                <div className="relative flex-1 flex items-center justify-center bg-lightColor/50 dark:bg-darkColor rounded-main overflow-hidden">

                    <div className="absolute inset-0 flex flex-col items-center justify-center space-y-3 z-10 px-4 text-center">
                        <Title
                            className={"text-center inset-0 !text-white"}
                            icon={false}
                        >
                            WHy Us
                        </Title>
                    </div>
                    <Image
                        width={300}
                        height={300}
                        className="rounded-main shadow-custom brightness-50 h-[40vh] md:h-full w-full"
                        src="https://images.unsplash.com/photo-1652203106991-f21f915237b9?q=80&w=948&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                        alt="Why Us"
                    />
                </div>
                {whyUs.map((item, index) => {
                    const Icon = item.icon;
                    return (
                        <div key={index} className="flex flex-col p-4 bg-lightColor dark:bg-darkColor rounded-main gap-3 flex-1">
                            <div className="bg-radial from-transparent to-neutral-300 dark:to-secondaryDark w-fit h-fit p-3 rounded-full mb-30">
                                <Icon className="text-primary text-4xl flex-shrink-0 " />
                            </div>
                            <div className="flex flex-col items-start">
                                <h3 className="text-lg font-semibold mb-2">
                                    {item.title}
                                </h3>
                                <p className="leading-relaxed">{item.desc}</p>
                            </div>
                        </div>
                    );
                })}
            </div>

        </main>
    )
}