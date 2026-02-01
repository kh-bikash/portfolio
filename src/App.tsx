import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom"
import { ReactLenis } from '@studio-freight/react-lenis'
import { GlobalUIWrapper } from "@/components/GlobalUIWrapper"
import Home from "@/pages/Home"
import Work from "@/pages/Work"
import ProjectDetail from "@/pages/ProjectDetail"

function AppContent() {
    const location = useLocation()
    const isWorkPage = location.pathname.startsWith("/work")

    const Content = (
        <GlobalUIWrapper>
            <Routes location={location} key={location.pathname}>
                <Route path="/" element={<Home />} />
                <Route path="/work" element={<Work />} />
                <Route path="/work/:id" element={<ProjectDetail />} />
            </Routes>
        </GlobalUIWrapper>
    )

    if (isWorkPage) {
        return Content
    }

    return (
        <ReactLenis root>
            {Content}
        </ReactLenis>
    )
}

function App() {
    return (
        <BrowserRouter>
            <AppContent />
        </BrowserRouter>
    )
}

export default App
