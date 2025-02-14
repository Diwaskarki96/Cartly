// import React from "react";

// const Footer = () => {
//   return (
//     <div className="w-full h-[440px] bg-black dark:bg-[#37474F] flex justify-center items-center text-sm ">
//       <div className="h-[236px] w-[1170px] text-white dark:text-[#e0e0e0] px-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1.2fr_.8fr_.5fr] gap-10">
//         <div className="flex justify-between gap-8 lg:col-span-1">
//           <ul>
//             <li className="text-xl mb-4 ">Exclusive</li>
//             <li>Subscribe</li>
//             <li>Get 10% off your first order</li>
//           </ul>
//           <ul>
//             <li className="text-xl mb-4">Support</li>
//             <li>Balkot, Bhaktapur, Nepal</li>
//             <li>diwaskarki96@gmail.com</li>
//             <li>9876465432</li>
//           </ul>
//         </div>
//         <div className="flex justify-between gap-8 ">
//           <ul>
//             <li className="text-xl mb-4">Account</li>
//             <li>Login / Register</li>
//             <li>Shop</li>
//           </ul>
//           <ul>
//             <li className="text-xl mb-4">Quick Link</li>
//             <li>Privacy Policy</li>
//             <li>Terms of Use</li>
//             <li>FAQ</li>
//             <li>Contact</li>
//           </ul>
//         </div>
//         <div className="flex  ">
//           <ul>
//             <li className="text-xl mb-4">Download App</li>
//             <li>Save $3 with App New USer Only</li>
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
    <div className="w-full py-[100px] bg-black dark:bg-[#37474F] flex justify-center  text-sm ">
      <div className=" text-white dark:text-[#e0e0e0]  flex flex-col md:flex-row ">
        <div className="flex  ">
          <div className="flex px-10 gap-10">
            <ul>
              <li className="text-xl mb-4">Exclusive</li>
              <li>Subscribe</li>
              <li>Get 10% off your first order</li>
            </ul>
            <ul>
              <li className="text-xl mb-4">Support</li>
              <li>Balkot, Bhaktapur, Nepal</li>
              <li>diwaskarki96@gmail.com</li>
              <li>9876465462</li>
            </ul>
          </div>
          <div className=" flex px-10 gap-10">
            <ul>
              <li className="text-xl mb-4">Account</li>
              <li>Login / Register</li>
              <li>Shop</li>
            </ul>
            <ul>
              <li className="text-xl mb-4">Quick Link</li>
              <li>Privacy Policy</li>
              <li>Terms of Use</li>
              <li>FAQ</li>
              <li>Contact</li>
            </ul>
          </div>
        </div>
        <div className="px-10">
          <ul>
            <li className="text-xl mb-4 ">Download App</li>
            <li>Save $3 with App New User Only</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Footer;
