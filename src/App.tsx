import React from "react";
import {
  Box,
  Card,
  CardBody,
  Container,
  Divider,
  Heading,
} from "@chakra-ui/react";
import ConfigModal from "./components/ConfigModal";
import PinInputForm from "./components/PinInputForm";

function App() {
  return (
    <Box bgGradient="linear(to-r, teal.500, green.500)">
      <Container className="flex h-screen flex-wrap items-center justify-center">
        <Card>
          <div className="p-3 text-center">
            <Heading
              bgGradient="linear(to-r, teal.500, green.500)"
              bgClip="text"
            >
              PIN INPUT
            </Heading>
          </div>
          <Divider />
          <CardBody className="pb-0 text-center">
            <PinInputForm />
          </CardBody>
          <Divider />
          <div className="p-3">
            <ConfigModal />
          </div>
        </Card>
      </Container>
    </Box>
  );
}

export default App;
