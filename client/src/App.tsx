import "./App.css";
import Canvas from "./components/Canvas";
import Menu from "./components/Menu";
import Navbar from "./components/Navbar";
import WebSocketContextProvider from "./context/WebsocketContext";

function App() {
    return (
        <WebSocketContextProvider>
            <Navbar></Navbar>
            <section className="w-full flex py-16 justify-center">
                <Menu></Menu>
                <Canvas></Canvas>
            </section>
        </WebSocketContextProvider>
    );
}

export default App;
