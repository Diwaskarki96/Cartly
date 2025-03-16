// import React from "react";

// const Footer = () => {
//   return (
//     <div className="w-full py-[clamp(50px,10vw,100px)] bg-[#e74a4a] flex justify-center text-sm">
//       <div className="text-white dark:text-[#e0e0e0] w-full max-w-[1170px] px-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1.2fr,0.8fr,0.5fr] gap-[clamp(20px,5vw,40px)]">
//         <div className="flex flex-col md:flex-row justify-between gap-[clamp(20px,5vw,40px)] lg:col-span-1">
//           <ul>
//             <li className="text-[clamp(18px,2vw,24px)] mb-4">Exclusive</li>
//             <li>Subscribe</li>
//             <li>Get 10% off your first order</li>
//           </ul>
//           <ul>
//             <li className="text-[clamp(18px,2vw,24px)] mb-4">Support</li>
//             <li>Balkot, Bhaktapur, Nepal</li>
//             <li>diwaskarki96@gmail.com</li>
//             <li>9876465432</li>
//           </ul>
//         </div>
//         <div className="flex flex-col md:flex-row justify-between gap-[clamp(20px,5vw,40px)]">
//           <ul>
//             <li className="text-[clamp(18px,2vw,24px)] mb-4">Account</li>
//             <li>Login / Register</li>
//             <li>Shop</li>
//           </ul>
//           <ul>
//             <li className="text-[clamp(18px,2vw,24px)] mb-4">Quick Link</li>
//             <li>Privacy Policy</li>
//             <li>Terms of Use</li>
//             <li>FAQ</li>
//             <li>Contact</li>
//           </ul>
//         </div>
//         <div className="flex">
//           <ul>
//             <li className="text-[clamp(18px,2vw,24px)] mb-4">Download App</li>
//             <li>Save $3 with App New User Only</li>
//           </ul>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Footer;
import React from "react";

const Footer = () => {
  return (
    <div className="bg-neutral-900 py-[80px] px-8">
      <div className="max-w-[1200px] mx-auto bg-neutral-900 grid grid-cols-2  sm:grid-cols-2  md:grid-cols-3 lg:grid-cols-5 text-white gap-4">
        <div className="">
          <ul>
            <li className="mb-4">Exclusive</li>
            <li>Subscribe</li>
            <li>Get 10% off your first order</li>
          </ul>
        </div>
        <div className="">
          <ul>
            <li className=" mb-4">Support</li>
            <li>Balkot, Bhaktapur, Nepal</li>
            <li>diwaskarki96@gmail.com</li>
            <li>9876465432</li>
          </ul>
        </div>
        <div className="sm:mt-4">
          <ul>
            <li className="mb-4">Account</li>
            <li>Login / Register</li>
            <li>Shop</li>
          </ul>
        </div>
        <div className="md:mt-6 sm:mt-4 mt-4">
          <ul>
            <li className=" mb-4">Quick Link</li>
            <li>Privacy Policy</li>
            <li>Terms of Use</li>
            <li>FAQ</li>
            <li>Contact</li>
          </ul>
        </div>
        <div className="md:mt-6 sm:mt-4 mt-4">
          <ul>
            <li className=" mb-4">Download App</li>
            <li>Save $3 with App New User Only</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Footer;
