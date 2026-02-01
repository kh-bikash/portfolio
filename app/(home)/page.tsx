import { Orchestrator } from "@/components/Orchestrator"

export default async function Home(props: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const searchParams = await props.searchParams
  const mode = searchParams?.mode === "brain" ? "brain" : "portal"
  return <Orchestrator initialMode={mode} />
}
