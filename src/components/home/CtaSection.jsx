import { Link } from 'react-router-dom'

export function CtaSection({ content }) {
  if (!content) return null

  return (
    <section className="border-t border-slate-800 bg-slate-950 py-20 text-center">
      <div className="mx-auto max-w-2xl px-4">
        <h2 className="font-serif text-3xl font-medium text-slate-50">{content.cta_title}</h2>
        <p className="mt-3 text-slate-400">{content.cta_subtitle}</p>
        <Link
          to="/reservar"
          className="mt-8 inline-flex rounded-md bg-sky-400 px-6 py-3 text-sm font-semibold text-slate-950 transition-colors hover:bg-sky-300"
        >
          {content.cta_button_text} →
        </Link>
      </div>
    </section>
  )
}
