import { useSearchParams } from "react-router-dom"
import { Orchestrator } from "@/components/Orchestrator"

export default function Home() {
    const [searchParams] = useSearchParams()
    const mode = searchParams.get("mode") === "brain" ? "brain" : "portal"
    return <Orchestrator initialMode={mode} />
}
