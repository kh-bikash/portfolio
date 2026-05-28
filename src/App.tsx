import { BrowserRouter, Route, Routes } from "react-router-dom"
import { ReactLenis } from '@studio-freight/react-lenis'
import { FilmNav } from "@/components/layout/FilmNav"
import { ScrollDirector } from "@/components/layout/ScrollDirector"
import Work from "@/pages/Work"
import ProjectDetail from "@/pages/ProjectDetail"

function App() {
    return (
        <BrowserRouter>
            <ReactLenis root options={{ lerp: 0.1 }}>
                <FilmNav />
                <Routes>
                    <Route path="/" element={<ScrollDirector />} />
                    <Route path="/brain" element={<ScrollDirector />} />
                    <Route path="/work" element={<Work />} />
                    <Route path="/work/:id" element={<ProjectDetail />} />
                </Routes>
            </ReactLenis>
        </BrowserRouter>
    )
}

export default App
