// Page sections — Tương ớt Mường Khương
const { useState: useStateS, useEffect: useEffectS } = React;

// ——— Logo lockup ———
function Logo({ light }) {
  return (
    <a href="#top" style={{ display: 'flex', alignItems: 'center', gap: 11, textDecoration: 'none' }}>
      <span style={{ width: 40, height: 40, borderRadius: 9, background: light ? 'rgba(255,255,255,.14)' : 'var(--green)', display: 'grid', placeItems: 'center', flexShrink: 0 }}>
        <Icon name="leaf" size={23} color="#fff" stroke={2} />
      </span>
      <span style={{ lineHeight: 1.15 }}>
        <span style={{ display: 'block', fontWeight: 700, fontSize: 16.5, color: light ? '#fff' : 'var(--green-d)', letterSpacing: -.2 }}>Tương ớt Mường Khương</span>
        <span style={{ display: 'block', fontSize: 11.5, color: light ? 'rgba(255,255,255,.7)' : '#7d8a6c', fontWeight: 500 }}>HTX Hoa Lợi · Lào Cai</span>
      </span>
    </a>
  );
}

// ——— Navbar ———
function Navbar({ count, onCart, onOrder }) {
  const [scrolled, setScrolled] = useStateS(false);
  const [open, setOpen] = useStateS(false);
  useEffectS(() => {
    const f = () => setScrolled(window.scrollY > 12);
    f(); window.addEventListener('scroll', f, { passive: true });
    return () => window.removeEventListener('scroll', f);
  }, []);
  const links = [['#products', 'Sản phẩm'], ['#story', 'Câu chuyện'], ['#why', 'Phân phối'], ['#footer', 'Liên hệ']];
  const go = (e, h) => { e.preventDefault(); setOpen(false); const el = document.querySelector(h); if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 76, behavior: 'smooth' }); };
  return (
    <header data-screen-label="navbar" style={{ position: 'sticky', top: 0, zIndex: 50, background: 'rgba(255,255,255,.92)', backdropFilter: 'blur(10px)', borderBottom: '0.5px solid ' + (scrolled ? 'rgba(0,0,0,.08)' : 'transparent'), boxShadow: scrolled ? '0 2px 14px rgba(39,80,10,.07)' : 'none', transition: 'box-shadow .2s, border-color .2s' }}>
      <div className="wrap" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 66, gap: 20 }}>
        <Logo />
        <nav className="nav-links" style={{ display: 'flex', alignItems: 'center', gap: 30 }}>
          {links.map(([h, t]) => <a key={h} href={h} onClick={(e) => go(e, h)} className="nav-a" style={{ fontSize: 14.5, fontWeight: 500, color: 'var(--ink)', textDecoration: 'none' }}>{t}</a>)}
        </nav>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <button onClick={onCart} aria-label="Giỏ hàng" style={{ position: 'relative', width: 42, height: 42, borderRadius: 8, border: '0.5px solid rgba(0,0,0,.1)', background: '#fff', display: 'grid', placeItems: 'center', cursor: 'pointer', color: 'var(--green-d)' }}>
            <Icon name="cart" size={21} />
            {count > 0 && <span style={{ position: 'absolute', top: -6, right: -6, minWidth: 20, height: 20, padding: '0 5px', borderRadius: 10, background: '#d8400f', color: '#fff', fontSize: 11.5, fontWeight: 700, display: 'grid', placeItems: 'center', boxShadow: '0 0 0 2px #fff' }}>{count}</span>}
          </button>
          <div className="nav-cta"><Btn onClick={onOrder}>Đặt hàng ngay</Btn></div>
          <button className="nav-burger" onClick={() => setOpen(o => !o)} aria-label="Menu" style={{ display: 'none', width: 42, height: 42, borderRadius: 8, border: '0.5px solid rgba(0,0,0,.1)', background: '#fff', placeItems: 'center', cursor: 'pointer', color: 'var(--green-d)' }}>
            <Icon name={open ? 'close' : 'menu'} size={22} />
          </button>
        </div>
      </div>
      {open && (
        <div className="nav-mobile" style={{ borderTop: '0.5px solid rgba(0,0,0,.07)', padding: '10px 20px 18px', display: 'none', flexDirection: 'column', gap: 4, background: '#fff' }}>
          {links.map(([h, t]) => <a key={h} href={h} onClick={(e) => go(e, h)} style={{ padding: '12px 4px', fontSize: 16, fontWeight: 500, color: 'var(--ink)', textDecoration: 'none', borderBottom: '0.5px solid rgba(0,0,0,.05)' }}>{t}</a>)}
          <div style={{ marginTop: 10 }}><Btn full onClick={() => { setOpen(false); onOrder(); }}>Đặt hàng ngay</Btn></div>
        </div>
      )}
    </header>
  );
}

// ——— HERO (3 variants) ———
function Hero({ variant, onAdd, onOrder }) {
  const hero = window.PRODUCTS[0];
  const badge = <Pill tone="soft"><Icon name="star" size={14} /> Sản phẩm OCOP 4 sao</Pill>;
  const h1 = <h1 style={{ fontSize: 'clamp(32px, 4.6vw, 56px)', lineHeight: 1.08, fontWeight: 700, letterSpacing: -1, margin: 0, color: 'var(--green-d)' }}>Tương ớt Mường Khương<br /><span style={{ color: 'var(--green)' }}>Chính gốc vùng cao</span></h1>;
  const desc = <p style={{ fontSize: 17, lineHeight: 1.65, color: '#5d6b4f', maxWidth: 480, margin: 0 }}>Chế biến từ ớt chỉ thiên tươi của đồng bào vùng cao Mường Khương, Lào Cai. Không chất bảo quản, không màu nhân tạo — giữ trọn vị cay nồng truyền thống.</p>;
  const cta = <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}><Btn size="lg" onClick={onOrder} iconRight="arrow">Mua ngay</Btn><Btn size="lg" variant="outline" onClick={() => document.querySelector('#products').scrollIntoView({ behavior: 'smooth' })}>Xem sản phẩm</Btn></div>;

  // Variant C — full-bleed dark with bottle
  if (variant === 'C') {
    return (
      <section data-screen-label="hero" style={{ background: 'var(--green-d)', color: '#fff', overflow: 'hidden', position: 'relative' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 78% 40%, rgba(192,221,151,.16), transparent 55%)' }} />
        <div className="wrap hero-grid" style={{ position: 'relative', display: 'grid', gridTemplateColumns: '1.05fr .95fr', gap: 50, alignItems: 'center', padding: '64px 0' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            <Pill tone="dark"><Icon name="star" size={14} /> Sản phẩm OCOP 4 sao</Pill>
            <h1 style={{ fontSize: 'clamp(32px, 4.8vw, 58px)', lineHeight: 1.06, fontWeight: 700, letterSpacing: -1, margin: 0 }}>Tương ớt Mường Khương<br /><span style={{ color: 'var(--accent)' }}>Chính gốc vùng cao</span></h1>
            <p style={{ fontSize: 17, lineHeight: 1.65, color: 'rgba(255,255,255,.8)', maxWidth: 480, margin: 0 }}>Chế biến từ ớt chỉ thiên tươi của đồng bào vùng cao Mường Khương, Lào Cai. Không chất bảo quản, không màu nhân tạo.</p>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}><Btn size="lg" variant="cream" onClick={onOrder} iconRight="arrow">Mua ngay</Btn><Btn size="lg" variant="ghost" onClick={() => document.querySelector('#products').scrollIntoView({ behavior: 'smooth' })} style={{ color: '#fff', border: '0.5px solid rgba(255,255,255,.35)' }}>Xem sản phẩm</Btn></div>
          </div>
          <div className="hero-img" style={{ position: 'relative', display: 'flex', justifyContent: 'center' }}>
            <div style={{ width: 'min(360px,80%)', filter: 'drop-shadow(0 30px 50px rgba(0,0,0,.4))' }}><ProductImg p={hero} style={{ background: 'transparent' }} /></div>
          </div>
        </div>
      </section>
    );
  }

  // Variant B — centered, single column, product below
  if (variant === 'B') {
    return (
      <section data-screen-label="hero" style={{ background: 'var(--bg-soft)' }}>
        <div className="wrap" style={{ textAlign: 'center', padding: '64px 0 0', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 22 }}>
          {badge}
          <h1 style={{ fontSize: 'clamp(34px, 5.2vw, 62px)', lineHeight: 1.06, fontWeight: 700, letterSpacing: -1.2, margin: 0, color: 'var(--green-d)', maxWidth: 760 }}>Tương ớt Mường Khương — Chính gốc vùng cao</h1>
          <p style={{ fontSize: 17.5, lineHeight: 1.6, color: '#5d6b4f', maxWidth: 560, margin: 0 }}>Chế biến từ ớt chỉ thiên tươi của đồng bào vùng cao Lào Cai. Không chất bảo quản, không màu nhân tạo.</p>
          {cta}
          <div className="hero-img" style={{ width: 'min(280px,70%)', marginTop: 12, filter: 'drop-shadow(0 24px 36px rgba(39,80,10,.18))' }}><ProductImg p={hero} style={{ background: 'transparent' }} /></div>
        </div>
      </section>
    );
  }

  // Variant A — classic two columns (default)
  return (
    <section data-screen-label="hero" style={{ background: 'var(--bg-soft)' }}>
      <div className="wrap hero-grid" style={{ display: 'grid', gridTemplateColumns: '1.05fr .95fr', gap: 50, alignItems: 'center', padding: '60px 0' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          {badge}{h1}{desc}{cta}
          <div style={{ display: 'flex', gap: 22, marginTop: 6, color: '#5d6b4f', fontSize: 13.5, fontWeight: 500, flexWrap: 'wrap' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: 7 }}><Icon name="check" size={16} color="var(--green)" /> Không chất bảo quản</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: 7 }}><Icon name="check" size={16} color="var(--green)" /> Giao toàn quốc</span>
          </div>
        </div>
        <div className="hero-img" style={{ position: 'relative', display: 'flex', justifyContent: 'center' }}>
          <div style={{ position: 'absolute', width: 340, height: 340, borderRadius: '50%', background: 'var(--accent)', opacity: .5, filter: 'blur(8px)' }} />
          <div style={{ position: 'relative', width: 'min(320px,82%)', filter: 'drop-shadow(0 28px 44px rgba(39,80,10,.22))' }}><ProductImg p={hero} style={{ background: 'transparent' }} /></div>
        </div>
      </div>
    </section>
  );
}

// ——— Trust bar ———
function TrustBar() {
  return (
    <section style={{ borderTop: '0.5px solid rgba(0,0,0,.09)', borderBottom: '0.5px solid rgba(0,0,0,.09)', background: '#fff' }}>
      <div className="wrap trust-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', padding: '24px 0' }}>
        {window.TRUST.map((x, i) => (
          <div key={i} style={{ textAlign: 'center', padding: '4px 16px', borderLeft: i ? '0.5px solid rgba(0,0,0,.08)' : 'none' }}>
            <div style={{ fontWeight: 700, fontSize: 18, color: 'var(--green-d)' }}>{x.k}</div>
            <div style={{ fontSize: 13, color: '#7d8a6c', marginTop: 3 }}>{x.v}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

// ——— Section heading ———
function Head({ kicker, title, sub, center }) {
  return (
    <div style={{ textAlign: center ? 'center' : 'left', maxWidth: center ? 620 : 'none', margin: center ? '0 auto' : 0, marginBottom: 36 }}>
      {kicker && <div style={{ fontSize: 13, fontWeight: 700, letterSpacing: 1.4, textTransform: 'uppercase', color: 'var(--green)', marginBottom: 10 }}>{kicker}</div>}
      <h2 style={{ fontSize: 'clamp(26px,3.4vw,38px)', fontWeight: 700, letterSpacing: -.6, color: 'var(--green-d)', margin: 0, lineHeight: 1.15 }}>{title}</h2>
      {sub && <p style={{ fontSize: 16, lineHeight: 1.6, color: '#5d6b4f', margin: '12px auto 0', maxWidth: 560 }}>{sub}</p>}
    </div>
  );
}

Object.assign(window, { Logo, Navbar, Hero, TrustBar, Head });
