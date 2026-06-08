// Main App — Tương ớt Mường Khương
const { useState: useStateA, useEffect: useEffectA } = React;

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "heroVariant": "A",
  "productVariant": "A",
  "ctaVariant": "A",
  "accent": ["#3B6D11", "#EAF3DE", "#C0DD97"]
}/*EDITMODE-END*/;

function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const [cart, setCart] = useStateA([]);
  const [view, setView] = useStateA(null); // 'cart' | 'order' | 'success' | 'zalo'
  const [detail, setDetail] = useStateA(null);
  const [lastOrder, setLastOrder] = useStateA(null);
  const [toast, setToast] = useStateA(null);

  // apply accent palette
  useEffectA(() => {
    const [green, soft, accent] = t.accent;
    const root = document.documentElement;
    root.style.setProperty('--green', green);
    root.style.setProperty('--bg-soft', soft);
    root.style.setProperty('--accent', accent);
  }, [t.accent]);

  const count = cart.reduce((s, x) => s + x.qty, 0);
  const addToCart = (p, qty = 1) => {
    setCart(c => {
      const ex = c.find(x => x.id === p.id);
      if (ex) return c.map(x => x.id === p.id ? { ...x, qty: x.qty + qty } : x);
      return [...c, { ...p, qty }];
    });
    setToast(p.name + ' đã thêm vào giỏ');
  };
  const setQty = (id, q) => setCart(c => c.map(x => x.id === id ? { ...x, qty: q } : x));
  const removeItem = (id) => setCart(c => c.filter(x => x.id !== id));

  useEffectA(() => { if (!toast) return; const tm = setTimeout(() => setToast(null), 2200); return () => clearTimeout(tm); }, [toast]);

  const checkout = () => { if (cart.length === 0) { setToast('Giỏ hàng đang trống'); return; } setView('order'); };
  const placed = (form) => { setLastOrder(form); setCart([]); setView('success'); };

  return (
    <div id="top">
      <Navbar count={count} onCart={() => setView('cart')} onOrder={checkout} />
      <Hero variant={t.heroVariant} onAdd={addToCart} onOrder={checkout} />
      <TrustBar />
      <Products variant={t.productVariant} onAdd={addToCart} onOpen={setDetail} />
      <Story />
      <Why />
      <CTASection variant={t.ctaVariant} onOrder={checkout} onZalo={() => setView('zalo')} />
      <Footer onZalo={() => setView('zalo')} />

      {/* Floating Zalo button */}
      <button onClick={() => setView('zalo')} aria-label="Chat Zalo OA" className="zalo-fab" style={{ position: 'fixed', right: 20, bottom: 20, zIndex: 60, width: 56, height: 56, borderRadius: '50%', background: '#0068FF', color: '#fff', border: 'none', cursor: 'pointer', boxShadow: '0 6px 20px rgba(0,104,255,.4)', fontWeight: 800, fontSize: 15, fontStyle: 'italic', display: 'grid', placeItems: 'center' }}>Zalo</button>

      {/* Overlays */}
      {view === 'cart' && <CartDrawer items={cart} onClose={() => setView(null)} onQty={setQty} onRemove={removeItem} onCheckout={checkout} />}
      {view === 'order' && <OrderModal items={cart} onClose={() => setView(null)} onPlaced={placed} onZalo={() => setView('zalo')} />}
      {view === 'success' && lastOrder && <SuccessModal form={lastOrder} onClose={() => setView(null)} />}
      {view === 'zalo' && <ZaloModal onClose={() => setView(null)} />}
      {detail && <ProductModal p={detail} onClose={() => setDetail(null)} onAdd={addToCart} />}

      {/* Toast */}
      {toast && (
        <div className="toast" style={{ position: 'fixed', left: '50%', bottom: 28, transform: 'translateX(-50%)', zIndex: 120, background: 'var(--green-d)', color: '#fff', padding: '13px 22px', borderRadius: 10, fontSize: 14.5, fontWeight: 600, boxShadow: '0 10px 30px rgba(0,0,0,.25)', display: 'flex', alignItems: 'center', gap: 10, animation: 'toastIn .3s ease' }}>
          <Icon name="check" size={18} color="var(--accent)" stroke={2.6} /> {toast}
        </div>
      )}

      {/* Tweaks */}
      <TweaksPanel>
        <TweakSection label="Biến thể Hero" />
        <TweakRadio label="Kiểu Hero" value={t.heroVariant} options={['A', 'B', 'C']} onChange={(v) => setTweak('heroVariant', v)} />
        <div style={{ fontSize: 11.5, color: '#8a8a8a', padding: '0 2px 4px', lineHeight: 1.5 }}>A: 2 cột cổ điển · B: căn giữa · C: nền xanh đậm</div>
        <TweakSection label="Biến thể Sản phẩm" />
        <TweakRadio label="Bố cục" value={t.productVariant} options={['A', 'B', 'C']} onChange={(v) => setTweak('productVariant', v)} />
        <div style={{ fontSize: 11.5, color: '#8a8a8a', padding: '0 2px 4px', lineHeight: 1.5 }}>A: lưới 2×2 · B: 4 cột gọn · C: ảnh bên trái</div>
        <TweakSection label="Biến thể CTA" />
        <TweakRadio label="Kiểu CTA" value={t.ctaVariant} options={['A', 'B']} onChange={(v) => setTweak('ctaVariant', v)} />
        <div style={{ fontSize: 11.5, color: '#8a8a8a', padding: '0 2px 4px', lineHeight: 1.5 }}>A: dải xanh đầy · B: thẻ chia đôi</div>
        <TweakSection label="Bảng màu" />
        <TweakColor label="Tông màu" value={t.accent} options={[["#3B6D11", "#EAF3DE", "#C0DD97"], ["#8a3010", "#f6ece2", "#e8b48f"], ["#1f5c3a", "#e6f0e9", "#a8d4ba"]]} onChange={(v) => setTweak('accent', v)} />
      </TweaksPanel>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
