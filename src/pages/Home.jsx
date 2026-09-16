import { useHomeContent } from '../hooks/useHomeContent'
import { Hero } from '../components/home/Hero'
import { PainPoints } from '../components/home/PainPoints'
import { Approaches } from '../components/home/Approaches'
import { ComparisonTable } from '../components/home/ComparisonTable'
import { FounderSection } from '../components/home/FounderSection'
import { CtaSection } from '../components/home/CtaSection'

export function Home() {
  const { content, founder, painTabs, approaches, sinItems, conItems, isLoading } = useHomeContent()

  if (isLoading) {
    return <div className="min-h-screen bg-slate-950" />
  }

  return (
    <div>
      <Hero content={content} />
      <PainPoints tabs={painTabs} />
      <Approaches approaches={approaches} />
      <ComparisonTable sinItems={sinItems} conItems={conItems} />
      <FounderSection founder={founder} />
      <CtaSection content={content} />
    </div>
  )
}
