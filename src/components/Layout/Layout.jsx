// import React from "react";
// import "./Layout.module.css";
// import Navbar from "../Navbar/Navbar";
// import Footer from "../Footer/Footer";
// import { Outlet, useNavigation } from "react-router-dom";
// import Loader from "../Loader/Loader";

// export default function Layout() {
//   const navigation = useNavigation();
//   const isLoading = navigation.state === "loading";

//   if (isLoading) {
//     // Show only Loader, hide Navbar + Footer + content
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <Loader />
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen flex flex-col">
//       <Navbar />

//       <main className="flex-grow">
//         <Outlet />
//       </main>

//       <Footer />
//     </div>
//   );
// }



// import React, { useState } from "react";
// import "./Layout.module.css";
// import Navbar from "../Navbar/Navbar";
// import Footer from "../Footer/Footer";
// import { Outlet } from "react-router-dom";

// export default function Layout() {
//   const [isPageLoading, setIsPageLoading] = useState(false);

//   return (
//     <div className="min-h-screen flex flex-col">
//       <Navbar />

//       <main className="flex-grow">
//         <Outlet context={{ setIsPageLoading }} />
//       </main>

//       {!isPageLoading && <Footer />}
//     </div>
//   );
// }

import React, { useState } from "react";
import "./Layout.module.css";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import { Outlet } from "react-router-dom";

export default function Layout() {
  const [isPageLoading, setIsPageLoading] = useState(false);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* ✅ Added pt-20 to push content below fixed navbar */}
      <main className="flex-grow pt-20">
        <Outlet context={{ setIsPageLoading }} />
      </main>

      {!isPageLoading && <Footer />}
    </div>
  );
}
