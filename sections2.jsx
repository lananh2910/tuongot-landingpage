// Page sections part 2 — products, story, why, CTA, footer
const { useState: useState2 } = React;

// ——— Product card ———
function ProductCard({ p, onAdd, onOpen, layout = 'top' }) {
  const [hov, setHov] = useState2(false);
  const horizontal = layout === 'horizontal';
  return (
    <article onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{
        background: '#fff', borderRadius: 8, overflow: 'hidden', display: 'flex',
        flexDirection: horizontal ? 'row' : 'column',
        border: p.highlight ? '1.5px solid var(--green)' : '0.5px solid rgba(0,0,0,.1)',
        boxShadow: hov ? '0 10px 26px rgba(39,80,10,.12)' : '0 1px 2px rgba(0,0,0,.03)',
        transform: hov ? 'translateY(-3px)' : 'none', transition: 'all .18s ease', position: 'relative',
      }}>
      {p.badge && <span style={{ position: 'absolute', top: 12, left: 12, zIndex: 2, background: 'var(--green)', color: '#fff', fontSize: 12, fontWeight: 700, padding: '5px 11px', borderRadius: 20 }}>{p.badge}</span>}
      <div onClick={() => onOpen(p)} style={{ cursor: 'pointer', background: '#fbfcf8', padding: horizontal ? 14 : 20, width: horizontal ? 150 : 'auto', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', aspectRatio: horizontal ? 'auto' : '4 / 3' }}>
        <div style={{ height: horizontal ? 130 : 170, display: 'flex', alignItems: 'center' }}><ProductImg p={p} style={{ background: 'transparent', height: '100%' }} /></div>
      </div>
      <div style={{ padding: '16px 18px 18px', display: 'flex', flexDirection: 'column', gap: 7, flex: 1 }}>
        {p.tag && <span style={{ fontSize: 11.5, fontWeight: 700, letterSpacing: .5, textTransform: 'uppercase', color: 'var(--green)' }}>{p.tag}</span>}
        <h3 onClick={() => onOpen(p)} style={{ margin: 0, fontSize: 16.5, fontWeight: 600, color: 'var(--ink)', lineHeight: 1.25, cursor: 'pointer' }}>{p.name}</h3>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12.5, color: '#7d8a6c' }}><Icon name="pin" size={13} /> {p.origin}</div>
        <p style={{ margin: '2px 0 0', fontSize: 13.5, lineHeight: 1.5, color: '#6a7860', flex: 1 }}>{p.short}</p>
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 10, marginTop: 8 }}>
          <div>
            <span style={{ fontSize: 21, fontWeight: 700, color: 'var(--green-d)' }}>{window.fmt(p.price)}</span>
            {p.unit && <span style={{ fontSize: 13, color: '#7d8a6c' }}>{p.unit}</span>}
            {p.oldPrice && <span style={{ fontSize: 13.5, color: '#a4ab98', textDecoration: 'line-through', marginLeft: 7 }}>{window.fmt(p.oldPrice)}</span>}
          </div>
          <Btn size="sm" icon="plus" onClick={() => onAdd(p)}>Thêm giỏ</Btn>
        </div>
      </div>
    </article>
  );
}

// ——— Products section (3 variants) ———
function Products({ variant, onAdd, onOpen }) {
  const ps = window.PRODUCTS;
  let cols = 'repeat(2,1fr)', layout = 'top';
  if (variant === 'B') cols = 'repeat(4,1fr)';
  if (variant === 'C') { cols = 'repeat(2,1fr)'; layout = 'horizontal'; }
  return (
    <section id="products" data-screen-label="products" style={{ background: '#fff', padding: '60px 0' }}>
      <div className="wrap">
        <Head kicker="Sản phẩm nổi bật" title="Đặc sản từ Mường Khương" sub="Mỗi sản phẩm là kết tinh của khí hậu vùng cao và bàn tay người nông dân bản địa." center />
        <div className={'prod-grid ' + (layout === 'horizontal' ? 'prod-h' : '')} style={{ display: 'grid', gridTemplateColumns: cols, gap: 22 }}>
          {ps.map(p => <ProductCard key={p.id} p={p} onAdd={onAdd} onOpen={onOpen} layout={layout} />)}
        </div>
      </div>
    </section>
  );
}

// ——— Brand story ———
function Story() {
  const tags = ['Sản xuất tại chỗ', 'Dân tộc bản địa', 'Không phụ gia', 'Lào Cai'];
  return (
    <section id="story" data-screen-label="story" style={{ background: 'var(--bg-soft)', padding: '64px 0' }}>
      <div className="wrap story-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 50, alignItems: 'center' }}>
        <Placeholder label="ruộng nương Mường Khương" ratio="4 / 3.4" radius={10} style={{ minHeight: 300 }} />
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <div style={{ fontSize: 13, fontWeight: 700, letterSpacing: 1.4, textTransform: 'uppercase', color: 'var(--green)' }}>Câu chuyện thương hiệu</div>
          <h2 style={{ fontSize: 'clamp(26px,3.4vw,38px)', fontWeight: 700, letterSpacing: -.6, color: 'var(--green-d)', margin: 0, lineHeight: 1.16 }}>Từ ruộng nương Mường Khương đến bàn ăn của bạn</h2>
          <p style={{ fontSize: 16, lineHeight: 1.72, color: '#5d6b4f', margin: 0 }}>Hơn 20 năm qua, HTX Hoa Lợi gắn bó với bà con dân tộc thiểu số nơi rẻo cao Lào Cai. Từng trái ớt chỉ thiên được trồng, hái và chế biến thủ công theo công thức truyền thống của đồng bào — giữ nguyên vị cay nồng đặc trưng mà không cần đến bất kỳ phụ gia nào.</p>
          <p style={{ fontSize: 16, lineHeight: 1.72, color: '#5d6b4f', margin: 0 }}>Mỗi hũ tương ớt là một phần sinh kế của người vùng cao, và là lời mời bạn nếm trải hương vị thật của núi rừng Tây Bắc.</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 9, marginTop: 4 }}>
            {tags.map(t => <Pill key={t} tone="save"><Icon name="check" size={13} color="var(--green)" /> {t}</Pill>)}
          </div>
        </div>
      </div>
    </section>
  );
}

// ——— Why choose us ———
function Why() {
  return (
    <section id="why" data-screen-label="why" style={{ background: '#fff', padding: '60px 0' }}>
      <div className="wrap">
        <Head kicker="Tại sao chọn chúng tôi" title="Cam kết của HTX Hoa Lợi" center />
        <div className="why-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 18 }}>
          {window.WHY.map((x, i) => (
            <div key={i} style={{ display: 'flex', gap: 16, padding: 24, borderRadius: 8, border: '0.5px solid rgba(0,0,0,.1)', background: '#fbfcf8' }}>
              <span style={{ width: 46, height: 46, borderRadius: 10, background: 'var(--bg-soft)', display: 'grid', placeItems: 'center', flexShrink: 0, color: 'var(--green)' }}><Icon name={x.icon} size={24} /></span>
              <div>
                <h3 style={{ margin: '2px 0 6px', fontSize: 17, fontWeight: 600, color: 'var(--green-d)' }}>{x.t}</h3>
                <p style={{ margin: 0, fontSize: 14.5, lineHeight: 1.6, color: '#6a7860' }}>{x.d}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ——— CTA order (2 variants) ———
function CTASection({ variant, onOrder, onZalo }) {
  const steps = window.STEPS;
  const stepRow = (
    <div className="cta-steps" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, flexWrap: 'wrap', marginTop: 6 }}>
      {steps.map((s, i) => (
        <React.Fragment key={s}>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(255,255,255,.12)', color: '#fff', padding: '9px 16px', borderRadius: 20, fontSize: 14, fontWeight: 600 }}>
            <span style={{ width: 20, height: 20, borderRadius: '50%', background: 'var(--accent)', color: 'var(--green-d)', display: 'grid', placeItems: 'center', fontSize: 12, fontWeight: 700 }}>{i + 1}</span>{s}
          </span>
          {i < steps.length - 1 && <Icon name="arrow" size={16} color="rgba(255,255,255,.5)" />}
        </React.Fragment>
      ))}
    </div>
  );
  const buttons = (
    <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap', marginTop: 8 }}>
      <Btn size="lg" variant="cream" onClick={onOrder} iconRight="arrow">Mua trên website</Btn>
      <Btn size="lg" variant="zalo" onClick={onZalo}>Đặt qua Zalo OA</Btn>
    </div>
  );
  const subText = <p style={{ margin: '4px 0 0', fontSize: 14, color: 'rgba(255,255,255,.7)' }}>Giao toàn quốc · Thanh toán COD · Đổi trả trong 7 ngày</p>;

  if (variant === 'B') {
    // split layout
    return (
      <section data-screen-label="cta" style={{ padding: '60px 0', background: 'var(--bg-soft)' }}>
        <div className="wrap"><div className="cta-split" style={{ background: 'var(--green-d)', borderRadius: 16, padding: 'clamp(32px,5vw,56px)', color: '#fff', display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: 40, alignItems: 'center' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 18, textAlign: 'left' }}>
            <h2 style={{ fontSize: 'clamp(26px,3.2vw,38px)', fontWeight: 700, letterSpacing: -.6, margin: 0, lineHeight: 1.15 }}>Đặt hàng chỉ trong vài bước</h2>
            <div className="cta-steps" style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {steps.map((s, i) => <span key={s} style={{ display: 'inline-flex', alignItems: 'center', gap: 11, fontSize: 15.5 }}><span style={{ width: 26, height: 26, borderRadius: '50%', background: 'var(--accent)', color: 'var(--green-d)', display: 'grid', placeItems: 'center', fontSize: 13, fontWeight: 700 }}>{i + 1}</span>{s}</span>)}
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <Btn size="lg" full variant="cream" onClick={onOrder} iconRight="arrow">Mua trên website</Btn>
            <Btn size="lg" full variant="zalo" onClick={onZalo}>Đặt qua Zalo OA</Btn>
            {subText}
          </div>
        </div></div>
      </section>
    );
  }

  // Variant A — full band
  return (
    <section data-screen-label="cta" style={{ background: 'var(--green-d)', color: '#fff', padding: '60px 0', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 50% -10%, rgba(192,221,151,.16), transparent 50%)' }} />
      <div className="wrap" style={{ position: 'relative', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 18 }}>
        <h2 style={{ fontSize: 'clamp(28px,3.6vw,42px)', fontWeight: 700, letterSpacing: -.7, margin: 0, lineHeight: 1.12, maxWidth: 640 }}>Mang vị cay vùng cao về căn bếp của bạn</h2>
        {stepRow}{buttons}{subText}
      </div>
    </section>
  );
}

// ——— Footer ———
function Footer({ onZalo }) {
  return (
    <footer id="footer" data-screen-label="footer" style={{ background: '#1c2f0b', color: 'rgba(255,255,255,.78)', padding: '52px 0 28px' }}>
      <div className="wrap foot-grid" style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr 1fr', gap: 40 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <Logo light />
          <p style={{ margin: 0, fontSize: 14, lineHeight: 1.65, maxWidth: 320 }}>Đặc sản tương ớt và nông sản sạch từ vùng cao Mường Khương, Lào Cai. Sản phẩm OCOP 4 sao của HTX Hoa Lợi.</p>
        </div>
        <div>
          <h4 style={{ margin: '4px 0 14px', fontSize: 14, fontWeight: 700, color: '#fff', letterSpacing: .4 }}>Liên hệ</h4>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 11, fontSize: 14 }}>
            <li style={{ display: 'flex', gap: 9, alignItems: 'flex-start' }}><Icon name="mail" size={17} color="var(--accent)" /> htxhoaloilaocai@gmail.com</li>
            <li style={{ display: 'flex', gap: 9, alignItems: 'flex-start' }}><Icon name="pin" size={17} color="var(--accent)" /> Huyện Mường Khương, tỉnh Lào Cai</li>
          </ul>
        </div>
        <div>
          <h4 style={{ margin: '4px 0 14px', fontSize: 14, fontWeight: 700, color: '#fff', letterSpacing: .4 }}>Kênh bán hàng</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, fontSize: 14 }}>
            <a href="#" style={{ color: 'inherit', textDecoration: 'none' }}>Facebook</a>
            <a href="#" onClick={(e) => { e.preventDefault(); onZalo(); }} style={{ color: 'inherit', textDecoration: 'none' }}>Zalo OA</a>
            <a href="#" style={{ color: 'inherit', textDecoration: 'none' }}>Shopee</a>
          </div>
        </div>
      </div>
      <div className="wrap" style={{ borderTop: '0.5px solid rgba(255,255,255,.12)', marginTop: 36, paddingTop: 20, display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 8, fontSize: 13, color: 'rgba(255,255,255,.5)' }}>
        <span>© 2026 HTX Hoa Lợi · Tương ớt Mường Khương</span>
        <span>OCOP 4★ · Lào Cai</span>
      </div>
    </footer>
  );
}

Object.assign(window, { ProductCard, Products, Story, Why, CTASection, Footer });
