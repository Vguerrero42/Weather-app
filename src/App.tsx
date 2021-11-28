import React from "react";

import { ChakraProvider } from "@chakra-ui/react";

import { Home } from "./components";

function App() {
  return (
    <ChakraProvider>
      <Home />
    </ChakraProvider>
  );
}

export default App;
