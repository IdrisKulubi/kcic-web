import { SiteHeader } from "@/components/site-header"
import { countOpenProgrammes } from "@/lib/actions/programmes"

export async function SiteHeaderShell() {
  const openProgrammesCount = await countOpenProgrammes()

  return <SiteHeader openProgrammesCount={openProgrammesCount} />
}
