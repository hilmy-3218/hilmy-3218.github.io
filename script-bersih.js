
// SCROLL HEADER
window.addEventListener('scroll', function() {
  const header = document.querySelector('header');
  if (window.scrollY > 400) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
});

// ROBOT INTERAKSI
const head = document.getElementById('head');
const body = document.getElementById('body');
const leftArm = document.getElementById('left-arm');
const rightArm = document.getElementById('right-arm');
const greeting = document.getElementById('greeting');
const robot = document.querySelector('.robot');
const eyeLines = document.querySelectorAll('.eye-line');
const smileLine = document.querySelector('.smile-line');

document.addEventListener('mousemove', (e) => {
  const sceneRect = document.querySelector('.scene').getBoundingClientRect();
  const relativeX = (e.clientX - sceneRect.left) / sceneRect.width;
  const relativeY = (e.clientY - sceneRect.top) / sceneRect.height;
  const x = (relativeX - 0.5) * 2;
  const y = (relativeY - 0.5) * 2;

  head.style.transform = `rotateX(${-y * 15}deg) rotateY(${x * 10}deg)`;
  body.style.transform = `rotateX(${-y * 15 / 4}deg) rotateY(${x * 10 / 4}deg)`;
  leftArm.style.transform = `rotateZ(${x * 10}deg)`;
  rightArm.style.transform = `rotateZ(${-x * 10}deg)`;

  const centerX = sceneRect.left + sceneRect.width / 2;
  const centerY = sceneRect.top + sceneRect.height / 2;
  const thresholdX = sceneRect.width * 0.2;
  const thresholdY = sceneRect.height * 0.2;

  greeting.style.opacity = (Math.abs(e.clientX - centerX) < thresholdX && Math.abs(e.clientY - centerY) < thresholdY) ? 1 : 0;
});

function blinkEyes() {
  eyeLines.forEach(eye => eye.classList.add('blink'));
  setTimeout(() => {
    eyeLines.forEach(eye => eye.classList.remove('blink'));
  }, 200);
}
setInterval(blinkEyes, 5000);

function yawnMouth() {
  smileLine.classList.add('yawn');
  setTimeout(() => {
    smileLine.classList.remove('yawn');
  }, 1500);
}
setInterval(yawnMouth, 23000);

robot.addEventListener('mouseenter', () => {
  smileLine.classList.remove('yawn');
  smileLine.classList.add('talk');
  setTimeout(() => {
    smileLine.classList.remove('talk');
  }, 700);
});


// akhir robot


// SCROLL ANIMASI
const animElements = document.querySelectorAll('.scroll-anim');
const animateOnScroll = () => {
  animElements.forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top <= window.innerHeight - 100) {
      el.classList.add('show');
    }
  });
};
window.addEventListener('scroll', animateOnScroll);
window.addEventListener('load', animateOnScroll);

// SCROLL BOX TEKNOLOGI
function scrollLeft() {
  document.getElementById('scrollBox').scrollBy({ left: -300, behavior: 'smooth' });
}
function scrollRight() {
  document.getElementById('scrollBox').scrollBy({ left: 300, behavior: 'smooth' });
}

// CHATBOT
const chatbotBtn = document.getElementById('chatbot-btn');
const chatbotWindow = document.getElementById('chatbot-window');
const closeChat = document.getElementById('close-chat');
const chatBody = document.getElementById('chat-body');
const userInput = document.getElementById('user-input');
const chatHeader = document.getElementById('chat-header');

const responses = new Map([
  [/siapa|nama/, "Saya chat bot buatan Hilmiy, pelajar SMKN 2 Kota Kediri jurusan TKJ"],
  [/halo|hai/, "Hai"],
  [/pkl.*(dimana|di mana)|magang/, "Saya pernah PKL di Direktorat Pengembangan Teknologi Dan Sistem informasi - ITS"],
  [/lahir|tanggal lahir/, "Saya lahir tanggal 10 Mei 2007 di Kediri"],
  [/hobi/, "Hobi saya bersepeda dan ngoding"],
  [/lama pkl|bulan pkl/, "PKL saya selama 4 bulan dimulai dari tanggal 1 Juli sampai 31 Oktober"],
  [/tinggal|alamat/, "Tempat tinggal saya berada di Desa Lirboyo, Jl Raung, Kediri, Jawa Timur"],
  [/bahasa pemrograman/, "Saya pernah mencoba menggunakan bahasa pemrograman JavaScript, PHP, Python, dan Java"],
  [/website/, "Ya! Saya bisa membuat website menggunakan HTML, CSS, JS, PHP dan SQL"],
  [/umur|usia|berapa tahun/, () => `Saya berusia ${calculateAge("2007-05-10")} tahun`],
  [/kelas|tingkat/, "Saya sekarang berada di kelas XII TKJ 2"],
  [/sekolah|smk/, "Saya bersekolah di SMKN 2 Kota Kediri"],
  [/cita cita|bercita cita/, "Cita-cita saya adalah menjadi Web Developer profesional"],
  [/ngoding/, "Saya suka ngoding web pakai HTML, CSS, JavaScript, dan PHP"],
  [/desain grafis/, "Saya tidak terlalu fokus ke desain grafis, tapi saya bisa desain web!"],
  [/projek|project/, "Saya pernah membuat portfolio web, sistem manajemen asrama, chatbot sekolah, dan lainnya."],
  [/oh/, "Hehe"],
  [/keren/, "Terima kasih"],
  [/kelaz/, "😎"]
]);

const kataKasar = ["bodoh", "cok", "peli", "jembut", "goblok", "tolol", "anjing", "babi", "bangsat", "kontol", "memek", "bokep", "tempek", "coli", "silit", "jancok", "cok", "peler", "ngentot", "ngentod", "tod"];

chatbotBtn.onclick = () => {
  chatbotWindow.style.display = 'flex';
  userInput.focus();
};

closeChat.onclick = () => {
  chatbotWindow.style.display = 'none';
  chatBody.innerHTML = '<div class="msg bot">Halo! Tanyakan apapun tentang saya 👋</div>';
};

function sendQuick(text) {
  userInput.value = text;
  sendMessage();
}

function sendMessage() {
  const text = userInput.value.trim();
  if (!text) return;
  appendMessage('user', text);

  const typingIndicator = document.createElement('div');
  typingIndicator.className = 'msg bot typing';
  typingIndicator.textContent = 'Bot sedang mengetik...';
  chatBody.appendChild(typingIndicator);
  chatBody.scrollTop = chatBody.scrollHeight;

  const response = generateBotResponse(text);

  setTimeout(() => {
    chatBody.removeChild(typingIndicator);
    appendMessage('bot', response);
  }, 800);

  userInput.value = '';
  userInput.focus();
}

function appendMessage(sender, text) {
  const msg = document.createElement('div');
  msg.className = `msg ${sender}`;
  chatBody.appendChild(msg);
  chatBody.scrollTop = chatBody.scrollHeight;

  if (sender === 'bot') {
    let i = 0;
    const typingSpeed = 30;
    const interval = setInterval(() => {
      if (i < text.length) {
        msg.textContent += text.charAt(i);
        chatBody.scrollTop = chatBody.scrollHeight;
        i++;
      } else {
        clearInterval(interval);
      }
    }, typingSpeed);
  } else {
    msg.textContent = text;
  }
}

function calculateAge(birthDateStr) {
  const birthDate = new Date(birthDateStr);
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
}

function generateBotResponse(input) {
  const lower = input.toLowerCase();

  if (kataKasar.some(kata => lower.includes(kata))) {
    const teguran = [
      "Tolong jaga bahasa ya",
      "Gunakan kata-kata yang baik agar percakapan tetap nyaman.",
      "Maaf, saya tidak bisa menanggapi kata-kata seperti itu.",
      "Bahasa yang sopan akan lebih dihargai, jadi mengerti lah!",
      "Ups! Sepertinya kata itu tidak pantas."
    ];
    return teguran[Math.floor(Math.random() * teguran.length)];
  }

  for (let [pattern, response] of responses) {
    if (pattern.test(lower)) return typeof response === 'function' ? response() : response;
  }
  return "Maaf, saya belum paham maksud kamu. Coba ajukan pertanyaan lain";
}

userInput.addEventListener("keypress", function (e) {
  if (e.key === "Enter") sendMessage();
});

let isDragging = false, offsetX = 0, offsetY = 0;
chatHeader.addEventListener('mousedown', function (e) {
  isDragging = true;
  const rect = chatbotWindow.getBoundingClientRect();
  offsetX = e.clientX - rect.left;
  offsetY = e.clientY - rect.top;
  document.body.style.userSelect = 'none';
});

document.addEventListener('mousemove', function (e) {
  if (isDragging) {
    chatbotWindow.style.left = (e.clientX - offsetX) + 'px';
    chatbotWindow.style.top = (e.clientY - offsetY) + 'px';
    chatbotWindow.style.bottom = 'auto';
    chatbotWindow.style.right = 'auto';
  }
});

document.addEventListener('mouseup', function () {
  isDragging = false;
  document.body.style.userSelect = 'auto';
});

// cursor
    const cursor = document.getElementById('cursor');
    const ripple = document.getElementById('ripple');

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let curX = mouseX;
    let curY = mouseY;

    // Kecepatan diperbesar sedikit agar lebih responsif
    const ease = 0.28;

    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      cursor.style.opacity = 1;
    });

    window.addEventListener('mouseleave', () => { cursor.style.opacity = 0 });
    window.addEventListener('mouseenter', () => { cursor.style.opacity = 1 });

    function raf() {
      curX += (mouseX - curX) * ease;
      curY += (mouseY - curY) * ease;
      cursor.style.transform = `translate3d(${curX}px, ${curY}px, 0) translate(-50%, -50%)`;
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    const interactives = Array.from(document.querySelectorAll('a, button, input, textarea, [role="button"]'));
    interactives.forEach(el => {
      el.addEventListener('mouseenter', () => cursor.classList.add('big'));
      el.addEventListener('mouseleave', () => cursor.classList.remove('big'));
    });

    window.addEventListener('mousedown', (e) => {
      ripple.style.left = e.clientX + 'px';
      ripple.style.top = e.clientY + 'px';
      ripple.style.opacity = 1;
      ripple.style.transform = 'translate(-50%,-50%) scale(1)';
      setTimeout(() => {
        ripple.style.opacity = 0;
        ripple.style.transform = 'translate(-50%,-50%) scale(0)';
      }, 400);

      const core = cursor.querySelector('.core');
      core.style.transform = 'scale(1.6)';
      setTimeout(() => core.style.transform = '', 120);
    });

// star
    (() => {
      const canvas = document.getElementById('stars');
      const ctx = canvas.getContext('2d', { alpha: true });

      function resizeCanvas() {
        const dpr = window.devicePixelRatio || 1;
        canvas.width = Math.round(canvas.clientWidth * dpr);
        canvas.height = Math.round(canvas.clientHeight * dpr);
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      }
      window.addEventListener('resize', resizeCanvas, { passive: true });
      resizeCanvas();

      let CONFIG = {
        STAR_COUNT: 200,
        MAX_STAR_SIZE: 2.6,
        MIN_STAR_SIZE: 0.6,
        TWINKLE_SPEED: 0.02,
        GLOBAL_SPEED: 0.2,  
        CONNECT_DISTANCE: 130,
        LINE_WIDTH: 1.2,
        STAR_COLOR: '255,255,255'
      };

      class Star {
        constructor() { this.reset(); }
        reset() {
          this.x = Math.random() * canvas.clientWidth;
          this.y = Math.random() * canvas.clientHeight;
          this.baseSize = CONFIG.MIN_STAR_SIZE + Math.random() * (CONFIG.MAX_STAR_SIZE - CONFIG.MIN_STAR_SIZE);
          this.alpha = 0.2 + Math.random() * 0.8;
          this.twinkleDir = Math.random() < 0.5 ? -1 : 1;
          this.twinkleSpeed = 0.002 + Math.random() * CONFIG.TWINKLE_SPEED;
          this.angle = Math.random() * Math.PI * 2;
          this.speedFactor = 0.1 + Math.random() * 0.8;
          this.updateVelocity();
          this.parallax = Math.random() * 0.6;
          this.drawX = this.x;
          this.drawY = this.y;
        }
        updateVelocity() {
          this.vx = Math.cos(this.angle) * (CONFIG.GLOBAL_SPEED * this.speedFactor);
          this.vy = Math.sin(this.angle) * (CONFIG.GLOBAL_SPEED * this.speedFactor);
        }
        update(delta, mouse) {
          const f = delta / 16;
          this.alpha += this.twinkleDir * this.twinkleSpeed * f;
          if (this.alpha <= 0.15) { this.alpha = 0.15; this.twinkleDir = 1; }
          if (this.alpha >= 1.0)  { this.alpha = 1.0; this.twinkleDir = -1; }
          this.x += this.vx * f;
          this.y += this.vy * f;
          if (this.x < -10) this.x = canvas.clientWidth + 10;
          if (this.x > canvas.clientWidth + 10) this.x = -10;
          if (this.y < -10) this.y = canvas.clientHeight + 10;
          if (this.y > canvas.clientHeight + 10) this.y = -10;
          if (mouse.x !== null) {
            this.drawX = this.x + (mouse.x - canvas.clientWidth/2) * 0.002 * this.parallax;
            this.drawY = this.y + (mouse.y - canvas.clientHeight/2) * 0.002 * this.parallax;
          } else {
            this.drawX = this.x;
            this.drawY = this.y;
          }
        }
        draw(ctx) {
          const r = this.baseSize;
          const g = ctx.createRadialGradient(this.drawX, this.drawY, 0, this.drawX, this.drawY, r*6);
          g.addColorStop(0, `rgba(${CONFIG.STAR_COLOR}, ${this.alpha})`);
          g.addColorStop(0.3, `rgba(${CONFIG.STAR_COLOR}, ${this.alpha * 0.35})`);
          g.addColorStop(1, `rgba(${CONFIG.STAR_COLOR}, 0)`);
          ctx.beginPath();
          ctx.arc(this.drawX, this.drawY, r*6, 0, Math.PI*2);
          ctx.fillStyle = g;
          ctx.fill();
          ctx.beginPath();
          ctx.arc(this.drawX, this.drawY, r, 0, Math.PI*2);
          ctx.fillStyle = `rgba(${CONFIG.STAR_COLOR}, ${this.alpha})`;
          ctx.fill();
        }
      }

      let stars = [];
      function initStars() {
        stars = [];
        for (let i = 0; i < CONFIG.STAR_COUNT; i++) stars.push(new Star());
      }
      initStars();

      const mouse = { x: null, y: null };
      window.addEventListener('mousemove', (e) => { 
        const rect = canvas.getBoundingClientRect();
        if (e.clientX >= rect.left && e.clientX <= rect.right && e.clientY >= rect.top && e.clientY <= rect.bottom) {
          mouse.x = e.clientX - rect.left;
          mouse.y = e.clientY - rect.top;
        } else {
          mouse.x = null; mouse.y = null;
        }
      }, { passive: true });

      window.addEventListener('mouseleave', () => { mouse.x = null; mouse.y = null; });

      let last = performance.now();
      function animate(now) {
        const delta = Math.min(60, now - last);
        last = now;
        ctx.clearRect(0,0,canvas.width, canvas.height);
        for (let s of stars) { s.update(delta, mouse); s.draw(ctx); }
        const maxDist = CONFIG.CONNECT_DISTANCE;
        const maxDist2 = maxDist * maxDist;
        ctx.lineWidth = CONFIG.LINE_WIDTH;
        for (let i = 0; i < stars.length; i++) {
          const a = stars[i];
          for (let j = i + 1; j < stars.length; j++) {
            const b = stars[j];
            const dx = a.drawX - b.drawX;
            const dy = a.drawY - b.drawY;
            const dist2 = dx*dx + dy*dy;
            if (dist2 < maxDist2) {
              const dist = Math.sqrt(dist2);
              const alpha = (1 - dist / maxDist) * 0.35 * Math.min(a.alpha, b.alpha);
              ctx.beginPath();
              ctx.strokeStyle = `rgba(${CONFIG.STAR_COLOR}, ${alpha})`;
              ctx.moveTo(a.drawX, a.drawY);
              ctx.lineTo(b.drawX, b.drawY);
              ctx.stroke();
            }
          }
        }
        requestAnimationFrame(animate);
      }
      requestAnimationFrame(animate);

      setInterval(() => {
        for (let s of stars) {
          s.twinkleSpeed = 0.002 + Math.random() * CONFIG.TWINKLE_SPEED;
        }
      }, 4000);
    })();

    // awan mendung
        const sky = document.getElementById("sky");

    // Path SVG berbentuk awan bergelombang lebih realistis
    const cloudPath = `
      M60,60
      C50,40 20,40 15,60
      C-5,65 -5,90 20,90
      C25,105 55,105 60,90
      C80,110 120,110 130,90
      C150,90 150,60 130,60
      C125,40 95,35 80,55
      C75,40 65,40 60,60 Z
    `;

    function createCloud(){
      const cloud = document.createElement("div");
      cloud.className = "cloud";

      // random size, position, opacity, duration
      const size = Math.random() * 250 + 200; // 200–450px
      const y = Math.random() * 6 + -20; 
      const o = Math.random() * 0.4 + 0.6; // 0.6–1
      const dur = Math.random() * 40 + 60; // 60–100s

      cloud.style.setProperty("--s", size+"px");
      cloud.style.setProperty("--y", y+"%");
      cloud.style.setProperty("--o", o);
      cloud.style.setProperty("--dur", dur+"s");

      cloud.innerHTML = `
        <svg viewBox="0 0 160 120" preserveAspectRatio="xMidYMid meet">
          <path d="${cloudPath}" />
        </svg>
      `;

      return cloud;
    }

    // generate beberapa awan
    for(let i=0; i<15; i++){
      sky.appendChild(createCloud());
    }

    // bintang jatuh
  const galaxy = document.querySelector("#galaxy");

  // Buat bintang kecil twinkle
function createTwinkle() {
  const star = document.createElement("div");
  star.classList.add("twinkle");
  galaxy.appendChild(star);

  const posY = Math.random() * galaxy.clientHeight;
  const posX = Math.random() * galaxy.clientWidth;

  // hitung skala: makin ke bawah makin kecil
  const scale = 1 - (posY / galaxy.clientHeight) * 0.7; 
  // atas = 1, bawah = 0.3

  star.style.top = posY + "px";
  star.style.left = posX + "px";
  star.style.transform = `scale(${scale})`;
  star.style.animationDuration = (Math.random() * 3 + 2) + "s";
}

  // Buat shooting star
  function createShootingStar() {
    const star = document.createElement("div");
    star.classList.add("shooting-star");
    galaxy.appendChild(star);

    star.style.top = Math.random() * galaxy.clientHeight/2 + "px";
    star.style.left = Math.random() * galaxy.clientWidth + "px";

    const duration = Math.random() * 1.5 + 1; 
    star.style.animationDuration = duration + "s";

    setTimeout(() => star.remove(), duration * 1000);
  }

  // Tambah banyak twinkle sekali di awal
  for (let i = 0; i < 100; i++) {
    createTwinkle();
  }

  // Shooting star muncul random
  setInterval(() => {
    if (Math.random() > 0.6) {
      createShootingStar();
    }
  }, 800);

  