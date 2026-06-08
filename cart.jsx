// Cart drawer, order form, product detail, Zalo modal
const { useState: useStateC, useEffect: useEffectC } = React;

// ——— Overlay wrapper ———
function Overlay({ onClose, children, align = 'flex-end' }) {
  useEffectC(() => {
    const k = (e) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', k);
    document.body.style.overflow = 'hidden';
    return () => { document.removeEventListener('keydown', k); document.body.style.overflow = ''; };
  }, []);
  return (
    <div onClick={onClose} style={{ position: 'fixed', inset: 0, zIndex: 100, background: 'rgba(20,30,8,.45)', backdropFilter: 'blur(2px)', display: 'flex', justifyContent: align, animation: 'fade .2s ease' }}>
      {children}
    </div>
  );
}

// ——— Qty stepper ———
function Qty({ value, onChange, small }) {
  const s = small ? 28 : 34;
  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', border: '0.5px solid rgba(0,0,0,.18)', borderRadius: 6, overflow: 'hidden' }}>
      <button onClick={() => onChange(Math.max(1, value - 1))} style={{ width: s, height: s, border: 'none', background: '#fff', cursor: 'pointer', display: 'grid', placeItems: 'center', color: 'var(--green-d)' }}><Icon name="minus" size={15} /></button>
      <span style={{ minWidth: small ? 26 : 34, textAlign: 'center', fontWeight: 600, fontSize: small ? 14 : 15 }}>{value}</span>
      <button onClick={() => onChange(value + 1)} style={{ width: s, height: s, border: 'none', background: '#fff', cursor: 'pointer', display: 'grid', placeItems: 'center', color: 'var(--green-d)' }}><Icon name="plus" size={15} /></button>
    </div>
  );
}

// ——— Cart drawer ———
function CartDrawer({ items, onClose, onQty, onRemove, onCheckout }) {
  const total = items.reduce((s, x) => s + x.price * x.qty, 0);
  const ship = total >= 200000 || total === 0 ? 0 : 25000;
  return (
    <Overlay onClose={onClose}>
      <aside onClick={(e) => e.stopPropagation()} className="drawer" style={{ width: 'min(440px,100%)', height: '100%', background: '#fff', display: 'flex', flexDirection: 'column', boxShadow: '-10px 0 40px rgba(0,0,0,.2)', animation: 'slideIn .26s cubic-bezier(.2,.8,.2,1)' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '20px 22px', borderBottom: '0.5px solid rgba(0,0,0,.1)' }}>
          <h3 style={{ margin: 0, fontSize: 18, fontWeight: 700, color: 'var(--green-d)', display: 'flex', alignItems: 'center', gap: 9 }}><Icon name="cart" size={20} /> Giỏ hàng ({items.reduce((s, x) => s + x.qty, 0)})</h3>
          <button onClick={onClose} style={{ width: 36, height: 36, borderRadius: 8, border: 'none', background: '#f2f4ec', cursor: 'pointer', display: 'grid', placeItems: 'center' }}><Icon name="close" size={20} /></button>
        </div>
        {items.length === 0 ? (
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 14, color: '#7d8a6c', padding: 30 }}>
            <Icon name="cart" size={48} color="#c4cdb6" />
            <p style={{ margin: 0, fontSize: 15 }}>Giỏ hàng của bạn đang trống</p>
            <Btn variant="outline" onClick={onClose}>Tiếp tục mua sắm</Btn>
          </div>
        ) : (
          <>
            <div style={{ flex: 1, overflowY: 'auto', padding: '8px 22px' }}>
              {items.map(it => (
                <div key={it.id} style={{ display: 'flex', gap: 14, padding: '16px 0', borderBottom: '0.5px solid rgba(0,0,0,.07)' }}>
                  <div style={{ width: 66, height: 66, borderRadius: 8, background: '#fbfcf8', border: '0.5px solid rgba(0,0,0,.08)', flexShrink: 0, display: 'grid', placeItems: 'center', padding: 6 }}><ProductImg p={it} style={{ background: 'transparent' }} /></div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 14.5, fontWeight: 600, color: 'var(--ink)', lineHeight: 1.3 }}>{it.name}</div>
                    <div style={{ fontSize: 13.5, color: 'var(--green-d)', fontWeight: 700, marginTop: 3 }}>{window.fmt(it.price)}{it.unit || ''}</div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 9 }}>
                      <Qty small value={it.qty} onChange={(q) => onQty(it.id, q)} />
                      <button onClick={() => onRemove(it.id)} style={{ border: 'none', background: 'none', cursor: 'pointer', fontSize: 13, color: '#b14a2a' }}>Xóa</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div style={{ borderTop: '0.5px solid rgba(0,0,0,.1)', padding: '18px 22px 22px', background: '#fbfcf8' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14, color: '#5d6b4f', marginBottom: 7 }}><span>Tạm tính</span><span>{window.fmt(total)}</span></div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14, color: '#5d6b4f', marginBottom: 7 }}><span>Phí giao hàng</span><span>{ship === 0 ? 'Miễn phí' : window.fmt(ship)}</span></div>
              {total < 200000 && total > 0 && <div style={{ fontSize: 12.5, color: '#7d8a6c', marginBottom: 12 }}>Mua thêm {window.fmt(200000 - total)} để được miễn phí giao hàng</div>}
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 18, fontWeight: 700, color: 'var(--green-d)', margin: '12px 0 16px' }}><span>Tổng cộng</span><span>{window.fmt(total + ship)}</span></div>
              <Btn full size="lg" onClick={onCheckout} iconRight="arrow">Tiến hành đặt hàng</Btn>
            </div>
          </>
        )}
      </aside>
    </Overlay>
  );
}

// ——— Field ———
function Field({ label, children, required, hint }) {
  return (
    <label style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
      <span style={{ fontSize: 13.5, fontWeight: 600, color: 'var(--ink)' }}>{label}{required && <span style={{ color: '#c0492a' }}> *</span>}</span>
      {children}
      {hint && <span style={{ fontSize: 12, color: '#7d8a6c' }}>{hint}</span>}
    </label>
  );
}
const inputStyle = { padding: '11px 13px', borderRadius: 6, border: '0.5px solid rgba(0,0,0,.2)', fontSize: 14.5, fontFamily: 'inherit', background: '#fff', outline: 'none', width: '100%', boxSizing: 'border-box' };

// ——— Order form modal ———
function OrderModal({ items, onClose, onPlaced, onZalo }) {
  const [form, setForm] = useStateC({ name: '', phone: '', address: '', note: '', pay: 'cod' });
  const [err, setErr] = useStateC({});
  const total = items.reduce((s, x) => s + x.price * x.qty, 0);
  const ship = total >= 200000 || total === 0 ? 0 : 25000;
  const set = (k, v) => { setForm(f => ({ ...f, [k]: v })); setErr(e => ({ ...e, [k]: null })); };
  const pays = [['cod', 'Thanh toán khi nhận hàng (COD)'], ['bank', 'Chuyển khoản ngân hàng'], ['vnpay', 'Ví VNPay']];
  const submit = () => {
    const e = {};
    if (!form.name.trim()) e.name = 'Vui lòng nhập họ tên';
    if (!/^0\d{8,10}$/.test(form.phone.trim())) e.phone = 'Số điện thoại không hợp lệ';
    if (!form.address.trim()) e.address = 'Vui lòng nhập địa chỉ';
    setErr(e);
    if (Object.keys(e).length === 0) onPlaced(form);
  };
  return (
    <Overlay onClose={onClose} align="center">
      <div onClick={(e) => e.stopPropagation()} className="modal" style={{ width: 'min(820px,94%)', maxHeight: '92vh', background: '#fff', borderRadius: 14, overflow: 'hidden', display: 'flex', boxShadow: '0 24px 60px rgba(0,0,0,.3)', animation: 'pop .24s cubic-bezier(.2,.8,.2,1)' }}>
        <div className="order-form" style={{ flex: 1.25, padding: '26px 28px', overflowY: 'auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 18 }}>
            <h3 style={{ margin: 0, fontSize: 20, fontWeight: 700, color: 'var(--green-d)' }}>Thông tin đặt hàng</h3>
            <button onClick={onClose} className="modal-x" style={{ width: 36, height: 36, borderRadius: 8, border: 'none', background: '#f2f4ec', cursor: 'pointer', display: 'grid', placeItems: 'center' }}><Icon name="close" size={20} /></button>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 15 }}>
            <Field label="Họ và tên" required><input style={{ ...inputStyle, borderColor: err.name ? '#c0492a' : inputStyle.border }} value={form.name} onChange={(e) => set('name', e.target.value)} placeholder="Nguyễn Văn A" />{err.name && <span style={{ fontSize: 12, color: '#c0492a' }}>{err.name}</span>}</Field>
            <Field label="Số điện thoại" required><input style={{ ...inputStyle, borderColor: err.phone ? '#c0492a' : inputStyle.border }} value={form.phone} onChange={(e) => set('phone', e.target.value)} placeholder="09xx xxx xxx" inputMode="tel" />{err.phone && <span style={{ fontSize: 12, color: '#c0492a' }}>{err.phone}</span>}</Field>
            <Field label="Địa chỉ nhận hàng" required><input style={{ ...inputStyle, borderColor: err.address ? '#c0492a' : inputStyle.border }} value={form.address} onChange={(e) => set('address', e.target.value)} placeholder="Số nhà, đường, phường/xã, quận/huyện, tỉnh/thành" />{err.address && <span style={{ fontSize: 12, color: '#c0492a' }}>{err.address}</span>}</Field>
            <Field label="Ghi chú (tùy chọn)"><textarea style={{ ...inputStyle, resize: 'vertical', minHeight: 64 }} value={form.note} onChange={(e) => set('note', e.target.value)} placeholder="Thời gian giao, ghi chú cho người bán..." /></Field>
            <div>
              <span style={{ fontSize: 13.5, fontWeight: 600, color: 'var(--ink)', display: 'block', marginBottom: 9 }}>Phương thức thanh toán</span>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 9 }}>
                {pays.map(([v, t]) => (
                  <label key={v} style={{ display: 'flex', alignItems: 'center', gap: 11, padding: '13px 15px', borderRadius: 8, border: '1px solid ' + (form.pay === v ? 'var(--green)' : 'rgba(0,0,0,.14)'), background: form.pay === v ? 'var(--bg-soft)' : '#fff', cursor: 'pointer' }}>
                    <span style={{ width: 18, height: 18, borderRadius: '50%', border: '1.5px solid ' + (form.pay === v ? 'var(--green)' : '#bbb'), display: 'grid', placeItems: 'center', flexShrink: 0 }}>{form.pay === v && <span style={{ width: 9, height: 9, borderRadius: '50%', background: 'var(--green)' }} />}</span>
                    <input type="radio" name="pay" checked={form.pay === v} onChange={() => set('pay', v)} style={{ display: 'none' }} />
                    <span style={{ fontSize: 14.5, color: 'var(--ink)' }}>{t}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="order-summary" style={{ flex: 1, background: '#fbfcf8', borderLeft: '0.5px solid rgba(0,0,0,.08)', padding: '26px 26px', display: 'flex', flexDirection: 'column' }}>
          <h4 style={{ margin: '0 0 16px', fontSize: 15, fontWeight: 700, color: 'var(--green-d)' }}>Đơn hàng của bạn</h4>
          <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 13 }}>
            {items.map(it => (
              <div key={it.id} style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                <div style={{ width: 48, height: 48, borderRadius: 7, background: '#fff', border: '0.5px solid rgba(0,0,0,.08)', flexShrink: 0, display: 'grid', placeItems: 'center', padding: 5, position: 'relative' }}>
                  <ProductImg p={it} style={{ background: 'transparent' }} />
                  <span style={{ position: 'absolute', top: -7, right: -7, width: 19, height: 19, borderRadius: '50%', background: 'var(--green)', color: '#fff', fontSize: 11, fontWeight: 700, display: 'grid', placeItems: 'center' }}>{it.qty}</span>
                </div>
                <div style={{ flex: 1, fontSize: 13, lineHeight: 1.3 }}>{it.name}</div>
                <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--green-d)' }}>{window.fmt(it.price * it.qty)}</div>
              </div>
            ))}
          </div>
          <div style={{ borderTop: '0.5px solid rgba(0,0,0,.1)', marginTop: 16, paddingTop: 14 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13.5, color: '#5d6b4f', marginBottom: 6 }}><span>Tạm tính</span><span>{window.fmt(total)}</span></div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13.5, color: '#5d6b4f', marginBottom: 10 }}><span>Giao hàng</span><span>{ship === 0 ? 'Miễn phí' : window.fmt(ship)}</span></div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 17, fontWeight: 700, color: 'var(--green-d)', marginBottom: 16 }}><span>Tổng</span><span>{window.fmt(total + ship)}</span></div>
            <Btn full size="lg" onClick={submit} iconRight="check">Xác nhận đặt hàng</Btn>
            <button onClick={onZalo} style={{ width: '100%', marginTop: 10, padding: '11px', borderRadius: 6, border: 'none', background: '#0068FF', color: '#fff', fontWeight: 600, fontSize: 14.5, fontFamily: 'inherit', cursor: 'pointer' }}>Hoặc đặt qua Zalo OA</button>
          </div>
        </div>
      </div>
    </Overlay>
  );
}

// ——— Success modal ———
function SuccessModal({ form, onClose }) {
  return (
    <Overlay onClose={onClose} align="center">
      <div onClick={(e) => e.stopPropagation()} style={{ width: 'min(440px,92%)', background: '#fff', borderRadius: 14, padding: '36px 32px', textAlign: 'center', boxShadow: '0 24px 60px rgba(0,0,0,.3)', animation: 'pop .24s cubic-bezier(.2,.8,.2,1)' }}>
        <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'var(--bg-soft)', display: 'grid', placeItems: 'center', margin: '0 auto 18px' }}><Icon name="check" size={34} color="var(--green)" stroke={2.6} /></div>
        <h3 style={{ margin: '0 0 10px', fontSize: 21, fontWeight: 700, color: 'var(--green-d)' }}>Đặt hàng thành công!</h3>
        <p style={{ margin: '0 0 6px', fontSize: 15, lineHeight: 1.6, color: '#5d6b4f' }}>Cảm ơn <b>{form.name}</b>. HTX Hoa Lợi sẽ liên hệ số <b>{form.phone}</b> để xác nhận đơn hàng trong ít phút.</p>
        <p style={{ margin: '0 0 22px', fontSize: 13, color: '#7d8a6c' }}>Giao toàn quốc · COD · Đổi trả trong 7 ngày</p>
        <Btn full size="lg" onClick={onClose}>Hoàn tất</Btn>
      </div>
    </Overlay>
  );
}

// ——— Product detail modal ———
function ProductModal({ p, onClose, onAdd }) {
  const [qty, setQty] = useStateC(1);
  const rows = [['Thành phần', p.ingredients], ['Hướng dẫn dùng', p.usage], ['Hạn sử dụng', p.expiry], ['Bảo quản', p.storage]];
  return (
    <Overlay onClose={onClose} align="center">
      <div onClick={(e) => e.stopPropagation()} className="modal" style={{ width: 'min(880px,94%)', maxHeight: '92vh', background: '#fff', borderRadius: 14, overflow: 'hidden', display: 'flex', boxShadow: '0 24px 60px rgba(0,0,0,.3)', animation: 'pop .24s cubic-bezier(.2,.8,.2,1)' }}>
        <div className="pm-img" style={{ flex: 1, background: '#fbfcf8', padding: 30, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
          {p.badge && <span style={{ position: 'absolute', top: 18, left: 18, background: 'var(--green)', color: '#fff', fontSize: 12, fontWeight: 700, padding: '6px 12px', borderRadius: 20 }}>{p.badge}</span>}
          <div style={{ maxHeight: 340 }}><ProductImg p={p} style={{ background: 'transparent' }} /></div>
        </div>
        <div className="pm-info" style={{ flex: 1.1, padding: '28px 30px', overflowY: 'auto', display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12 }}>
            <div>
              {p.tag && <span style={{ fontSize: 11.5, fontWeight: 700, letterSpacing: .5, textTransform: 'uppercase', color: 'var(--green)' }}>{p.tag}</span>}
              <h3 style={{ margin: '6px 0 0', fontSize: 23, fontWeight: 700, color: 'var(--green-d)', lineHeight: 1.2 }}>{p.name}</h3>
            </div>
            <button onClick={onClose} className="modal-x" style={{ width: 36, height: 36, borderRadius: 8, border: 'none', background: '#f2f4ec', cursor: 'pointer', display: 'grid', placeItems: 'center', flexShrink: 0 }}><Icon name="close" size={20} /></button>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 7, fontSize: 13.5, color: '#7d8a6c', margin: '10px 0 14px' }}><Icon name="pin" size={15} /> {p.origin}</div>
          <div style={{ fontSize: 26, fontWeight: 700, color: 'var(--green-d)', marginBottom: 4 }}>{window.fmt(p.price)}{p.unit || ''}{p.oldPrice && <span style={{ fontSize: 15, color: '#a4ab98', textDecoration: 'line-through', marginLeft: 9, fontWeight: 500 }}>{window.fmt(p.oldPrice)}</span>}</div>
          <p style={{ fontSize: 14.5, lineHeight: 1.7, color: '#5d6b4f', margin: '12px 0 18px' }}>{p.desc}</p>
          <div style={{ borderTop: '0.5px solid rgba(0,0,0,.08)', display: 'flex', flexDirection: 'column' }}>
            {rows.map(([k, v]) => v && (
              <div key={k} style={{ display: 'flex', gap: 14, padding: '11px 0', borderBottom: '0.5px solid rgba(0,0,0,.06)', fontSize: 13.5 }}>
                <span style={{ width: 120, flexShrink: 0, color: '#7d8a6c', fontWeight: 600 }}>{k}</span>
                <span style={{ color: 'var(--ink)', lineHeight: 1.55 }}>{v}</span>
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 14, padding: '14px 16px', background: 'var(--bg-soft)', borderRadius: 8 }}>
            <span style={{ width: 38, height: 38, borderRadius: 8, background: '#fff', display: 'grid', placeItems: 'center', color: 'var(--green)', flexShrink: 0 }}><Icon name="qr" size={22} /></span>
            <span style={{ fontSize: 13, color: '#5d6b4f', lineHeight: 1.5 }}>Quét <b>mã QR</b> trên nắp hũ để truy xuất vùng trồng, ngày sản xuất & lô hàng.</span>
          </div>
          <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginTop: 'auto', paddingTop: 18 }}>
            <Qty value={qty} onChange={setQty} />
            <Btn full size="lg" icon="cart" onClick={() => { onAdd(p, qty); onClose(); }}>Thêm vào giỏ · {window.fmt(p.price * qty)}</Btn>
          </div>
        </div>
      </div>
    </Overlay>
  );
}

// ——— Zalo OA modal ———
function ZaloModal({ onClose }) {
  return (
    <Overlay onClose={onClose} align="center">
      <div onClick={(e) => e.stopPropagation()} style={{ width: 'min(400px,92%)', background: '#fff', borderRadius: 14, padding: '30px 30px 26px', textAlign: 'center', boxShadow: '0 24px 60px rgba(0,0,0,.3)', animation: 'pop .24s cubic-bezier(.2,.8,.2,1)' }}>
        <button onClick={onClose} style={{ position: 'absolute' }} aria-hidden />
        <div style={{ width: 56, height: 56, borderRadius: 14, background: '#0068FF', display: 'grid', placeItems: 'center', margin: '0 auto 16px', color: '#fff', fontWeight: 800, fontSize: 22, fontStyle: 'italic' }}>Zalo</div>
        <h3 style={{ margin: '0 0 8px', fontSize: 19, fontWeight: 700, color: 'var(--green-d)' }}>Đặt hàng qua Zalo OA</h3>
        <p style={{ margin: '0 0 18px', fontSize: 14, lineHeight: 1.6, color: '#5d6b4f' }}>Quét mã hoặc nhấn nút để chat trực tiếp với HTX Hoa Lợi trên Zalo Official Account.</p>
        <div style={{ width: 168, height: 168, margin: '0 auto 18px', borderRadius: 12, border: '0.5px solid rgba(0,0,0,.12)', display: 'grid', placeItems: 'center', background: 'repeating-linear-gradient(135deg,#eef3e6,#eef3e6 9px,#e3ecd6 9px,#e3ecd6 18px)', color: '#7d9460', fontFamily: 'ui-monospace,monospace', fontSize: 12 }}>mã QR Zalo OA</div>
        <a href="https://zalo.me" target="_blank" rel="noopener" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, width: '100%', boxSizing: 'border-box', padding: '13px', borderRadius: 6, background: '#0068FF', color: '#fff', fontWeight: 600, fontSize: 15, textDecoration: 'none' }}>Mở Zalo OA</a>
      </div>
    </Overlay>
  );
}

Object.assign(window, { Overlay, Qty, CartDrawer, OrderModal, SuccessModal, ProductModal, ZaloModal });
