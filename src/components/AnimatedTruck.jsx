// export default function AnimatedTruck() {
//   return (
//     <div className="relative w-48 h-48 rounded-3xl bg-white/15 overflow-hidden flex items-end justify-center pb-8">
//       {/* road */}
//       <svg viewBox="0 0 200 20" className="absolute bottom-6 left-0 w-full h-3" preserveAspectRatio="none">
//         <line
//           x1="0" y1="10" x2="200" y2="10"
//           stroke="rgba(255,255,255,0.35)"
//           strokeWidth="3"
//           strokeDasharray="10 8"
//           strokeLinecap="round"
//           className="animate-dash-move"
//         />
//       </svg>

//       {/* truck group */}
//       <div className="relative animate-truck-bounce">
//         {/* exhaust puffs */}
//         <span className="absolute -left-2 top-6 w-2.5 h-2.5 rounded-full bg-white/60 animate-puff-1" />
//         <span className="absolute -left-2 top-6 w-2.5 h-2.5 rounded-full bg-white/60 animate-puff-2" />
//         <span className="absolute -left-2 top-6 w-2.5 h-2.5 rounded-full bg-white/60 animate-puff-3" />

//         <svg width="104" height="72" viewBox="0 0 104 72" fill="none" xmlns="http://www.w3.org/2000/svg">
//           {/* cargo box */}
//           <rect x="4" y="14" width="56" height="34" rx="6" fill="white" />
//           {/* cab */}
//           <path d="M60 26h20l14 12v10a4 4 0 0 1-4 4H60V26Z" fill="white" />
//           {/* window */}
//           <path d="M66 30h11l9 8H66v-8Z" fill="#0d8a80" />
//           {/* bumper accent */}
//           <rect x="4" y="42" width="56" height="6" rx="3" fill="#cdf6f0" />

//           {/* wheels (separate group so we can spin just the rim) */}
//           <g className="animate-wheel-spin">
//             <circle cx="22" cy="54" r="9" fill="#0f2e2b" />
//             <circle cx="22" cy="54" r="3.4" fill="white" />
//             <rect x="21.3" y="46.5" width="1.4" height="15" fill="#0f2e2b" />
//             <rect x="14.5" y="53.3" width="15" height="1.4" fill="#0f2e2b" />
//           </g>
//           <g className="animate-wheel-spin">
//             <circle cx="78" cy="54" r="9" fill="#0f2e2b" />
//             <circle cx="78" cy="54" r="3.4" fill="white" />
//             <rect x="77.3" y="46.5" width="1.4" height="15" fill="#0f2e2b" />
//             <rect x="70.5" y="53.3" width="15" height="1.4" fill="#0f2e2b" />
//           </g>
//         </svg>
//       </div>
//     </div>
//   );
// }

export default function AnimatedTruck() {
  return (
    <div className="relative w-64 h-64 rounded-3xl bg-white/15 overflow-hidden flex items-end justify-center pb-8">
      {/* road */}
      <svg
        viewBox="0 0 200 20"
        className="absolute bottom-6 left-0 w-full h-3"
        preserveAspectRatio="none">
        <line
          x1="0"
          y1="10"
          x2="200"
          y2="10"
          stroke="rgba(255,255,255,0.35)"
          strokeWidth="3"
          strokeDasharray="10 8"
          strokeLinecap="round"
          className="animate-dash-move"
        />
      </svg>

      {/* truck group */}
      <div className="relative animate-truck-bounce">
        {/* exhaust puffs */}
        <span className="absolute -left-2 top-6 w-2.5 h-2.5 rounded-full bg-white/60 animate-puff-1" />
        <span className="absolute -left-2 top-6 w-2.5 h-2.5 rounded-full bg-white/60 animate-puff-2" />
        <span className="absolute -left-2 top-6 w-2.5 h-2.5 rounded-full bg-white/60 animate-puff-3" />

        <svg
          width="150"
          height="104"
          viewBox="0 0 104 72"
          fill="none"
          xmlns="http://www.w3.org/2000/svg">
          {/* cargo box */}
          <rect x="4" y="14" width="56" height="34" rx="6" fill="white" />
          {/* cab */}
          <path d="M60 26h20l14 12v10a4 4 0 0 1-4 4H60V26Z" fill="white" />
          {/* window */}
          <path d="M66 30h11l9 8H66v-8Z" fill="#0d8a80" />
          {/* bumper accent */}
          <rect x="4" y="42" width="56" height="6" rx="3" fill="#cdf6f0" />

          {/* wheels (separate group so we can spin just the rim) */}
          <g className="animate-wheel-spin">
            <circle cx="22" cy="54" r="9" fill="#0f2e2b" />
            <circle cx="22" cy="54" r="3.4" fill="white" />
            <rect x="21.3" y="46.5" width="1.4" height="15" fill="#0f2e2b" />
            <rect x="14.5" y="53.3" width="15" height="1.4" fill="#0f2e2b" />
          </g>
          <g className="animate-wheel-spin">
            <circle cx="78" cy="54" r="9" fill="#0f2e2b" />
            <circle cx="78" cy="54" r="3.4" fill="white" />
            <rect x="77.3" y="46.5" width="1.4" height="15" fill="#0f2e2b" />
            <rect x="70.5" y="53.3" width="15" height="1.4" fill="#0f2e2b" />
          </g>
        </svg>
      </div>
    </div>
  );
}
