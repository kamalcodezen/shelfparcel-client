"use client";

export default function DeliveryTruckLoader() {
  return (
    <div className="flex flex-col items-center justify-center p-8 w-full min-h-[250px] ">
      {/* Container holding the custom animated elements */}
      <div className="relative w-72 h-32 flex items-end justify-center overflow-hidden">
        {/* হাইওয়ে রোড বা রাস্তার স্পিড লাইন ইফেক্ট (গাড়ি যে জোরে চলছে তা বোঝানোর জন্য) */}
        <div className="absolute bottom-6 left-0 w-full h-[3px] bg-foreground/10 overflow-hidden">
          <div
            className="w-[200%] h-full bg-repeating-linear-gradient animate-[roadMove_0.3s_linear_infinite]"
            style={{
              backgroundImage:
                "linear-gradient(90deg, currentColor 0px, currentColor 25px, transparent 25px, transparent 50px)",
              color: "rgb(var(--border))",
            }}
          />
        </div>

        {/* এই র্যাপারটি পুরো গাড়িকে স্ক্রিনের বাম থেকে ডানে অনবরত ড্রাইভ করে নিয়ে যায় */}
        <div className="w-full h-full flex items-end animate-[truckDriveAhead_4s_linear_infinite] relative">
          {/* রিয়ালিস্টিক এসভিজি (SVG) ট্রাক ইউনিট (যা হালকা বাউন্স করবে) */}
          <svg
            viewBox="0 0 220 100"
            className="w-52 h-26 mb-4 relative z-10 animate-[truckBounce_0.2s_ease-in-out_infinite]"
          >
            {/* ডাইনামিক হেডলাইটের আলোর গ্লো (সামনের লাইটের ইফেক্ট) */}
            <polygon
              points="165,58 220,50 220,75 165,68"
              fill="url(#headlightGlow)"
              opacity="0.4"
            />

            {/* কালার এবং আলোর ইফেক্ট সুন্দর করার জন্য গ্রেডিয়েন্ট ডেফিনিশন */}
            <defs>
              {/* গাড়ির সামনের লাল কেবিনের গ্রেডিয়েন্ট */}
              <linearGradient
                id="truckCabin"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="100%"
              >
                <stop offset="0%" stopColor="#FF3333" />
                <stop offset="100%" stopColor="#990000" />
              </linearGradient>

              {/* বই রাখার পেছনের কন্টেইনারের গ্রেডিয়েন্ট */}
              <linearGradient
                id="truckContainer"
                x1="0%"
                y1="0%"
                x2="0%"
                y2="100%"
              >
                <stop offset="0%" stopColor="rgb(var(--card-soft))" />
                <stop offset="100%" stopColor="rgb(var(--card))" />
              </linearGradient>

              {/* হেডলাইটের আলোর জন্য রেডিয়াল গ্রেডিয়েন্ট গ্লো */}
              <radialGradient id="headlightGlow" cx="0%" cy="50%" r="100%">
                <stop offset="0%" stopColor="rgba(0, 245, 212, 0.7)" />
                <stop offset="100%" stopColor="transparent" />
              </radialGradient>
            </defs>

            {/* গাড়ির সাইলেন্সার পাইপ থেকে বের হওয়া ধোঁয়ার অ্যানিমেশন */}
            <g className="text-muted-foreground/30">
              <circle
                cx="22"
                cy="74"
                r="3"
                className="animate-[smoke_0.4s_ease-out_infinite_0s]"
                style={{ transformOrigin: "22px 74px" }}
              />
              <circle
                cx="18"
                cy="73"
                r="4.5"
                className="animate-[smoke_0.4s_ease-out_infinite_0.1s]"
                style={{ transformOrigin: "18px 73px" }}
              />
              <circle
                cx="14"
                cy="72"
                r="6"
                className="animate-[smoke_0.4s_ease-out_infinite_0.2s]"
                style={{ transformOrigin: "14px 72px" }}
              />
            </g>

            {/* সাইলেন্সার পাইপ (Exhaust Pipe) */}
            <path
              d="M 25 75 L 32 75 L 32 72"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
            />

            {/* বই রাখার মেইন কার্গো কন্টেইনার (বডি পার্ট) */}
            <rect
              x="35"
              y="25"
              width="80"
              height="50"
              fill="url(#truckContainer)"
              stroke="currentColor"
              strokeWidth="2.5"
              rx="5"
            />

            {/* ডেকোরেশন এবং প্রফেশনাল লুকের জন্য কন্টেইনারের মাঝের ডিজাইন লাইন্স */}
            <line
              x1="45"
              y1="35"
              x2="105"
              y2="35"
              stroke="currentColor"
              strokeWidth="2"
              strokeDasharray="5"
              className="text-primary/40"
            />
            <line
              x1="45"
              y1="45"
              x2="105"
              y2="45"
              stroke="rgb(var(--primary))"
              strokeWidth="1.5"
              opacity="0.6"
            />

            {/* ড্রাইভারের সামনের লাল কেবিন (Driver's Cabin) */}
            <path
              d="M 115 38 L 148 38 L 165 54 L 165 75 L 115 75 Z"
              fill="url(#truckCabin)"
              stroke="currentColor"
              strokeWidth="2.5"
            />

            {/* কেবিনের জানালার গ্লাস (Window) */}
            <path
              d="M 120 43 L 144 43 L 155 54 L 120 54 Z"
              fill="rgb(var(--background))"
              stroke="currentColor"
              strokeWidth="2"
            />

            {/* পেছনের চাকা (বাম দিকের চাকা) - যা পুরো ৩৬০ ডিগ্রিতে অনবরত ঘুরবে */}
            <g
              className="animate-[wheelSpin_0.3s_linear_infinite]"
              style={{ transformOrigin: "55px 75px" }}
            >
              <circle
                cx="55"
                cy="75"
                r="13"
                fill="rgb(var(--background))"
                stroke="currentColor"
                strokeWidth="3"
              />
              <circle cx="55" cy="75" r="5" fill="currentColor" />
              <line
                x1="55"
                y1="62"
                x2="55"
                y2="88"
                stroke="currentColor"
                strokeWidth="2.5"
              />
              <line
                x1="42"
                y1="75"
                x2="68"
                y2="75"
                stroke="currentColor"
                strokeWidth="2.5"
              />
            </g>

            {/* সামনের চাকা (ডান দিকের চাকা) - চাকা ঘোরার স্পিড চেইন */}
            <g
              className="animate-[wheelSpin_0.3s_linear_infinite]"
              style={{ transformOrigin: "135px 75px" }}
            >
              <circle
                cx="135"
                cy="75"
                r="13"
                fill="rgb(var(--background))"
                stroke="currentColor"
                strokeWidth="3"
              />
              <circle cx="135" cy="75" r="5" fill="currentColor" />
              <line
                x1="135"
                y1="62"
                x2="135"
                y2="88"
                stroke="currentColor"
                strokeWidth="2.5"
              />
              <line
                x1="122"
                y1="75"
                x2="148"
                y2="75"
                stroke="currentColor"
                strokeWidth="2.5"
              />
            </g>
          </svg>

          {/* মাটির ওপর গাড়ির চাকার কালো শ্যাডো বা ছায়া ইফেক্ট */}
          <div className="absolute bottom-[22px] left-[36px] w-36 h-[4px] bg-black/20 rounded-full blur-[2px] animate-[shadowPulse_0.2s_ease-in-out_infinite]" />
        </div>
      </div>

      {/* লোডিং টেক্সট */}
      <p className="text-xl font-bold tracking-[0.25em] text-primary animate-pulse mt-2 uppercase">
        BiblioDrop Delivering...
      </p>

      {/* কাস্টম সিএসএস কি-ফ্রেম অ্যানিমেশন (Tailwind v4 এর সাথে সামঞ্জস্যপূর্ণ) */}
      <style jsx global>{`
        /* গাড়িকে স্ক্রিনের বাম থেকে ডানে ড্রাইভ করানোর লজিক */
        @keyframes truckDriveAhead {
          0% {
            transform: translateX(-80%);
          }
          100% {
            transform: translateX(90%);
          }
        }
        /* চাকা ঘোরানোর জন্য ৩৬০ ডিগ্রি রোটেশন */
        @keyframes wheelSpin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
        /* গাড়ি চলার সময় হালকা বাউন্স বা ঝাঁকুনি ইফেক্ট */
        @keyframes truckBounce {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-1px);
          }
        }
        /* রাস্তার স্পিড লাইনের মুভমেন্ট লজিক */
        @keyframes roadMove {
          0% {
            transform: translateX(0px);
          }
          100% {
            transform: translateX(-10px);
          }
        }
        /* ধোঁয়া লাইভ বের হয়ে মিলিয়ে যাওয়ার লজিক */
        @keyframes smoke {
          0% {
            transform: translate(0, 0) scale(0.5);
            opacity: 0.8;
          }
          100% {
            transform: translate(-30px, -15px) scale(1.5);
            opacity: 0;
          }
        }
        /* গাড়ির নিচের ছায়ার পালস ইফেক্ট */
        @keyframes shadowPulse {
          0%,
          100% {
            transform: scaleX(1);
          }
          50% {
            transform: scaleX(0.95);
          }
        }
      `}</style>
    </div>
  );
}
