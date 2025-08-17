// import React from "react";
// import ReactDOM from "react-dom/client";
// import App from "./App.jsx";

// import { TokenContextProvider } from "./Context/TokenContext.jsx";
// import CartContextProvider from "./Context/CartContext.jsx";
// import { CounterContextProvider } from "./Context/CounterContext.jsx";

// import { Provider } from "react-redux";
// import { store } from "./Redux/store.js";

// // Global CSS imports
// import "@fortawesome/fontawesome-free/css/all.min.css";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
// import "./index.css";
// import WishlistContextProvider from "./Context/WishlistContext.jsx";

// ReactDOM.createRoot(document.getElementById("root")).render(
//   <React.StrictMode>
//     <Provider store={store}>
//       <TokenContextProvider>
//         <WishlistContextProvider>

//         <CartContextProvider>
//           <CounterContextProvider>
//             <App />
//           </CounterContextProvider>
//         </CartContextProvider>
//         </WishlistContextProvider>
//       </TokenContextProvider>
//     </Provider>
//   </React.StrictMode>
// );

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";

import { TokenContextProvider } from "./Context/TokenContext.jsx";
import CartContextProvider from "./Context/CartContext.jsx";
import { CounterContextProvider } from "./Context/CounterContext.jsx";

import { Provider } from "react-redux";
import { store } from "./Redux/store.js";

import WishlistContextProvider from "./Context/WishlistContext.jsx";

// React Query
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

// Global CSS imports
import "@fortawesome/fontawesome-free/css/all.min.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./index.css";

// ✅ Create a QueryClient instance
const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <TokenContextProvider>
        <WishlistContextProvider>
          <CartContextProvider>
            <CounterContextProvider>
              <QueryClientProvider client={queryClient}>
                <App />
                {/* React Query Devtools (optional) */}
                <ReactQueryDevtools initialIsOpen={false} />
              </QueryClientProvider>
            </CounterContextProvider>
          </CartContextProvider>
        </WishlistContextProvider>
      </TokenContextProvider>
    </Provider>
  </React.StrictMode>
);
