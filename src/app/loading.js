import DeliveryTruckLoader from "@/components/shared/Loader";



export default function GlobalLoading() {
    return (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background/80 backdrop-blur-md transition-all duration-300">
            <div className=" max-w-md w-[90%] flex flex-col items-center justify-center  ">
                {/* আমাদের তৈরি করা অ্যানিমেটেড এসভিজি ট্রাক কম্পোনেন্ট */}
                <DeliveryTruckLoader />

                <p className="text-xs text-muted-foreground mt-4 font-medium tracking-wide">
                    Please wait while we sync library nodes...
                </p>
            </div>
        </div>
    );
}