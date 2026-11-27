export default function WaveDivider({ from, to, overlay = false }: { from: string; to: string; overlay?: boolean }) {
  return <svg className={`wave-divider${overlay ? ' wave-divider-overlay' : ''}`} viewBox="0 0 1440 70" preserveAspectRatio="none" aria-hidden="true" style={{ backgroundColor: overlay ? 'transparent' : from }}><path d="M0 22C160 82 285 0 453 30S751 78 916 28 1231 0 1440 42V70H0Z" fill={to}/></svg>
}
