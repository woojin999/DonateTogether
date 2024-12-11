import { Outlet } from "react-router-dom";
import "./App.css";
import Main from "./components/Main";
import Header from "./Header";
import Footer from "./Footer";
import { StsProvider } from "./context/StsProvider";

function App() {
  return (
    <>
      <StsProvider>
        <Header />
        <Main>
          <Outlet />
        </Main>
        <Footer />
      </StsProvider>
    </>
  );
}

export default App;
