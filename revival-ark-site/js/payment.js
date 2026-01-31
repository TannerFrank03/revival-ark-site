// js/payment.js
(function () {
  // Tabs UI (One-Time / Monthly)
  const tabs = document.querySelectorAll('.tab');
  const fineprint = document.getElementById('fineprint');

  tabs.forEach(t => {
    t.addEventListener('click', () => {
      tabs.forEach(x => x.classList.remove('active'));
      t.classList.add('active');
      const mode = t.dataset.tab;
      if (fineprint) {
        fineprint.textContent =
          mode === 'monthly'
            ? 'Monthly donation selected (demo UI).'
            : 'One-time donation selected (demo UI).';
      }
    });
  });

  // Amount selection
  const amountBtns = document.querySelectorAll('.amount');
  const customRow = document.getElementById('customRow');
  const customAmount = document.getElementById('customAmount');

  let selectedAmount = 100;

  amountBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      amountBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const val = btn.dataset.amount;
      if (val === 'custom') {
        selectedAmount = null;
        if (customRow) customRow.hidden = false;
        if (customAmount) customAmount.focus();
      } else {
        selectedAmount = Number(val);
        if (customRow) customRow.hidden = true;
      }
    });
  });

  // Payment actions (demo)
  const form = document.getElementById('donationForm');

  function getFinalAmount() {
    if (selectedAmount != null) return selectedAmount;
    const v = (customAmount?.value || '').replace(/[^\d]/g, '');
    return v ? Number(v) : null;
  }

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const amt = getFinalAmount();
      if (!amt || amt <= 0) {
        alert('Please select or enter a valid amount.');
        return;
      }
      alert(`Demo: Card payment initiated for R ${amt.toLocaleString('en-ZA')}.`);
    });
  }

  document.getElementById('btnGpay')?.addEventListener('click', () => {
    const amt = getFinalAmount();
    if (!amt) return alert('Please select or enter a valid amount.');
    alert(`Demo: Google Pay initiated for R ${amt.toLocaleString('en-ZA')}.`);
  });

  document.getElementById('btnApay')?.addEventListener('click', () => {
    const amt = getFinalAmount();
    if (!amt) return alert('Please select or enter a valid amount.');
    alert(`Demo: Apple Pay initiated for R ${amt.toLocaleString('en-ZA')}.`);
  });
})();
