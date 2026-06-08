// Shared UI components — Tương ớt Mường Khương
const { useState, useEffect, useRef } = React;

// ——— Icons (stroke-based, minimal) ———
function Icon({ name, size = 22, stroke = 2, color = 'currentColor', style }) {
  const p = { width: size, height: size, viewBox: '0 0 24 24', fill: 'none', stroke: color, strokeWidth: stroke, strokeLinecap: 'round', strokeLinejoin: 'round', style };
  switch (name) {
    case 'leaf': return <svg {...p}><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"/><path d="M2 21c0-3 1.85-5.36 5.08-6"/></svg>;
    case 'star': return <svg {...p}><path d="m12 2 3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>;
    case 'qr': return <svg {...p}><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><path d="M14 14h3v3M21 14v.01M14 21h3M21 17v4"/></svg>;
    case 'truck': return <svg {...p}><path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2"/><path d="M14 9h4l4 4v4a1 1 0 0 1-1 1h-1"/><circle cx="7.5" cy="18.5" r="2.5"/><circle cx="17.5" cy="18.5" r="2.5"/></svg>;
    case 'hands': return <svg {...p}><path d="M12 22a8 8 0 0 0 8-8c0-2-1-3-2-4M12 22a8 8 0 0 1-8-8c0-2 1-3 2-4"/><path d="M8 10V5a2 2 0 0 1 4 0M12 10V4a2 2 0 0 1 4 0v6"/></svg>;
    case 'cart': return <svg {...p}><circle cx="8" cy="21" r="1.5"/><circle cx="18" cy="21" r="1.5"/><path d="M2.5 3h2l2.4 12.4a2 2 0 0 0 2 1.6h8.2a2 2 0 0 0 2-1.6L21.5 7H6"/></svg>;
    case 'plus': return <svg {...p}><path d="M12 5v14M5 12h14"/></svg>;
    case 'minus': return <svg {...p}><path d="M5 12h14"/></svg>;
    case 'close': return <svg {...p}><path d="M18 6 6 18M6 6l12 12"/></svg>;
    case 'arrow': return <svg {...p}><path d="M5 12h14M13 6l6 6-6 6"/></svg>;
    case 'check': return <svg {...p}><path d="M20 6 9 17l-5-5"/></svg>;
    case 'menu': return <svg {...p}><path d="M4 6h16M4 12h16M4 18h16"/></svg>;
    case 'shield': return <svg {...p}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z"/></svg>;
    case 'pin': return <svg {...p}><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>;
    case 'mail': return <svg {...p}><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m2 7 10 6 10-6"/></svg>;
    case 'phone': return <svg {...p}><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3-8.6A2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.3 1.8.6 2.7a2 2 0 0 1-.5 2.1L8 9.6a16 16 0 0 0 6 6l1.1-1.1a2 2 0 0 1 2.1-.5c.9.3 1.8.5 2.7.6a2 2 0 0 1 1.7 2Z"/></svg>;
    case 'spark': return <svg {...p}><path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M18.4 5.6l-2.1 2.1M7.7 16.3l-2.1 2.1"/></svg>;
    default: return null;
  }
}

// ——— Button ———
function Btn({ children, variant = 'primary', size = 'md', onClick, full, icon, iconRight, href, style, type }) {
  const base = {
    display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8,
    fontWeight: 600, fontFamily: 'inherit', cursor: 'pointer', borderRadius: 6,
    border: '0.5px solid transparent', transition: 'all .16s ease', textDecoration: 'none',
    width: full ? '100%' : 'auto', whiteSpace: 'nowrap',
    padding: size === 'lg' ? '14px 26px' : size === 'sm' ? '8px 14px' : '11px 20px',
    fontSize: size === 'lg' ? 16 : size === 'sm' ? 13.5 : 15,
  };
  const variants = {
    primary: { background: 'var(--green)', color: '#fff', boxShadow: '0 1px 2px rgba(39,80,10,.18)' },
    outline: { background: 'transparent', color: 'var(--green)', borderColor: 'var(--green)' },
    light:   { background: 'var(--bg-soft)', color: 'var(--green-d)', borderColor: 'transparent' },
    cream:   { background: 'var(--bg-soft)', color: 'var(--green-d)' },
    zalo:    { background: '#0068FF', color: '#fff' },
    ghost:   { background: 'transparent', color: 'var(--ink)' },
    white:   { background: '#fff', color: 'var(--green-d)', borderColor: 'rgba(0,0,0,.08)' },
  };
  const [h, setH] = useState(false);
  const hov = h ? { filter: 'brightness(.94)', transform: 'translateY(-1px)' } : {};
  const Comp = href ? 'a' : 'button';
  return (
    <Comp type={type} href={href} onClick={onClick} onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
      style={{ ...base, ...variants[variant], ...hov, ...style }}>
      {icon && <Icon name={icon} size={size === 'lg' ? 20 : 18} />}
      {children}
      {iconRight && <Icon name={iconRight} size={size === 'lg' ? 20 : 18} />}
    </Comp>
  );
}

// ——— Pill / Badge ———
function Pill({ children, tone = 'soft', style }) {
  const tones = {
    soft: { background: 'var(--bg-soft)', color: 'var(--green-d)', border: '0.5px solid var(--accent)' },
    solid: { background: 'var(--green)', color: '#fff' },
    save: { background: '#fff', color: 'var(--green-d)', border: '0.5px solid var(--green)' },
    dark: { background: 'rgba(255,255,255,.12)', color: '#fff' },
  };
  return <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '6px 14px', borderRadius: 20, fontSize: 13, fontWeight: 600, ...tones[tone], ...style }}>{children}</span>;
}

// ——— Striped image placeholder ———
function Placeholder({ label, ratio = '1 / 1', radius = 8, style }) {
  return (
    <div style={{
      aspectRatio: ratio, borderRadius: radius, width: '100%',
      background: 'repeating-linear-gradient(135deg, #e4eed6, #e4eed6 11px, #dce8c9 11px, #dce8c9 22px)',
      border: '0.5px solid var(--accent)', display: 'flex', alignItems: 'center', justifyContent: 'center',
      color: '#7d9460', fontFamily: 'ui-monospace, Menlo, monospace', fontSize: 13, letterSpacing: .3, ...style,
    }}>{label}</div>
  );
}

// ——— Product image: real photo or placeholder ———
function ProductImg({ p, style, contain = true }) {
  if (p.img) {
    return <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#fff', ...style }}>
      <img src={p.img} alt={p.name} loading="lazy" style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
    </div>;
  }
  return <Placeholder label={p.placeholder || 'ảnh sản phẩm'} style={style} />;
}

Object.assign(window, { Icon, Btn, Pill, Placeholder, ProductImg });
