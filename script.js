const letters = [
  {
    sender: "Công",
    message: `Chúc bạn Điệp sang Nhật thuận lợi nhé. Hi vọng bạn luôn mạnh khỏe, may mắn và có thật nhiều trải nghiệm đáng nhớ ở một hành trình mới. Sang đấy nhớ quay nhiều vlog vào để tui còn xem, đi họp đồng hương nhớ về sớm đừng la cà linh tinh. Nào có dịp tui sẽ sang đấy chơi hehe.`
  },
  {
    sender: "Trà My",
    message: `Chúc bạn Điệp thượng lộ bình an, sang bên đó mọi thứ đều suôn sẻ và có thật nhiều trải nghiệm đáng nhớ nhé, mong cuộc sống mới của b có nhiều điều may mắn, có nhiều niềm vui hơn ở bển nhaa`
  },
  {
    sender: "Thuỳ Trang",
    message: `Cuối cùng ngày ấy cũng đến, ngày anh ấy bay đi và tôi không còn được nhìn thấy anh ấy nữa, được nghe giọng nói thảo mai và hay kháy đểu mọi người…

Chúc bạn mình bay cao bay xa bay lên thành leader và đừng quên mình nhé! Mãi một trái tim chờ mong tại Việt Nam

Bạn sang đấy mạnh giỏi, ăn uống khoẻ mạnh, sớm giàu sang, phát đạt

Dù là 5 năm hay 10 năm thì vẫn sẽ chờ bạn mình nhé!!! Mãi mến thương huhu`
  },
  {
    sender: "Linh Anh",
    message: `Saying goodbye to you today was really tough, but I’m so excited for this new chapter of yours. Wishing you all the love, luck, and huge success ahead. Shine bright out there, and see you soon!`
  },
  {
    sender: "Kiều",
    message: `Chúc Điệp thượng lộ bình an, vạn sự hạnh thông, mong mọi khó khăn ban đầu sẽ qua đi, công việc thuận lợi, suôn sẻ và gặt hái nhiều quả ngọt🫰💖`
  },
  {
    sender: "Ly",
    message: `Hi Điệp nhá:) Giờ này Điệp đang ở Nhật nhỉ. Không khí ở đó như nào, thời tiết giờ ra sao, có như ở VN không? Bây giờ Điệp đang cảm thấy gì? Chắc lúc mới đến vừa hồi hộp mà vừa phấn khởi nhỉ. Chúc Điệp với cuộc hành trình mới toanh này thật nhiều may mắn, gặp được những người đồng nghiệp tốt, những người bạn hợp cạ, gặp được quý nhân phù trợ trên con đường sắp tới. Chắc chắn sẽ có rất nhiều khó khăn ở phía trước, nhưng Điệp sẽ vượt qua thôi:D Chúc cho những trải nghiệm mới này sẽ làm dày dặn thêm thế giới quan của Điệp, làm Điệp tiến gần hơn với mục tiêu cuộc đời mình. Nghe sến nhỉ:) nma lời từ thật lòng hết đó. Đọc cái này khi cần nhá haha.

Với t thì Điệp sẽ luôn là 1 người bạn tốt. T thấy Điệp có nội lực, có cá tính nma chưa bung toả hết ra (hoặc do t ko nch với m nhiều😀). Chúc Điệp lột xác, trở thành phiên bản tốt hơn của bản thân nhá, cố lên💪Mong bao giờ t đến Nhật chơi trong tương lai thì Điệp làm hướng dẫn viên haha:D

Với cả nhớ update trên tiktok đấy:))) Bọn t sẽ dõi theo m. Đó, chúc có vậy thui, nếu cần giúp gì thì t sẵn sàng nhá, sau này nhớ đến bạn là đc😌

うまくいきますように🍀!

kly`
  }
];

const introScreen = document.querySelector("#intro-screen");
const introContent = document.querySelector(".intro-content");
const lettersScreen = document.querySelector("#letters-screen");
const lettersTitle = document.querySelector("#letters-title");
const unfoldButton = document.querySelector("#unfold-button");
const lettersList = document.querySelector("#letters-list");
const letterDialog = document.querySelector("#letter-dialog");
const dialogSender = document.querySelector("#dialog-sender");
const dialogMessage = document.querySelector("#dialog-message");
const dialogBody = document.querySelector(".dialog-body");
const dialogClose = document.querySelector("#dialog-close");
const sakuraLayer = document.querySelector("#sakura-layer");
const mobilePetalsQuery = window.matchMedia("(max-width: 43.99rem)");
const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

let screenState = "intro";
let openingCard = null;
let activeCard = null;
let savedScroll = null;
let backdropPress = false;

function renderLetters() {
  const fragment = document.createDocumentFragment();

  letters.forEach((letter, index) => {
    const listItem = document.createElement("li");
    const card = document.createElement("button");
    const flap = document.createElement("span");
    const number = document.createElement("span");
    const copy = document.createElement("span");
    const label = document.createElement("span");
    const sender = document.createElement("span");
    const mark = document.createElement("span");

    card.className = "envelope";
    card.type = "button";
    card.setAttribute("aria-haspopup", "dialog");
    card.setAttribute("aria-controls", "letter-dialog");

    flap.className = "envelope-flap";
    flap.setAttribute("aria-hidden", "true");
    mark.className = "envelope-mark";
    mark.setAttribute("aria-hidden", "true");
    number.className = "envelope-number";
    number.textContent = String(index + 1).padStart(2, "0");
    copy.className = "envelope-copy";
    label.className = "envelope-label";
    label.textContent = "Letter from";
    sender.className = "envelope-sender";
    sender.textContent = letter.sender;

    copy.append(label, sender);
    card.append(flap, number, copy, mark);
    card.addEventListener("click", () => openEnvelope(letter, card));
    listItem.append(card);
    fragment.append(listItem);
  });

  lettersList.replaceChildren(fragment);
}

// Await CSS motion, including cancellation when reduced motion changes.
async function finishMotion(element) {
  await Promise.allSettled(element.getAnimations().map((animation) => animation.finished));
}

async function showLetters() {
  if (screenState !== "intro") return;

  screenState = "transitioning";
  unfoldButton.setAttribute("aria-disabled", "true");

  if (!reducedMotionQuery.matches) {
    introScreen.classList.add("is-leaving");
    await finishMotion(introContent);
  }

  introScreen.hidden = true;
  introScreen.classList.remove("is-leaving");
  lettersScreen.hidden = false;
  lettersScreen.classList.add("is-visible");
  document.body.classList.add("has-letters");
  screenState = "letters";
  window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  lettersTitle.focus({ preventScroll: true });
}

async function openEnvelope(letter, card) {
  if (openingCard || letterDialog.open) return;

  openingCard = card;
  card.setAttribute("aria-busy", "true");
  card.classList.add("is-opening");

  if (!reducedMotionQuery.matches) {
    await finishMotion(card.querySelector(".envelope-flap"));
  }

  if (openingCard !== card) return;

  openingCard = null;
  card.removeAttribute("aria-busy");
  activeCard = card;
  savedScroll = { top: window.scrollY, left: window.scrollX };
  dialogSender.textContent = letter.sender;
  dialogMessage.textContent = letter.message;
  document.documentElement.classList.add("modal-open");
  document.body.classList.add("is-reading");
  letterDialog.showModal();
  dialogBody.scrollTop = 0;
  dialogClose.focus({ preventScroll: true });
}

function closeLetter() {
  if (!letterDialog.open) return;
  letterDialog.close();
  restorePage();
}

function restorePage() {
  if (letterDialog.open || !activeCard) return;

  document.documentElement.classList.remove("modal-open");
  document.body.classList.remove("is-reading");
  activeCard.classList.remove("is-opening");

  if (savedScroll) {
    window.scrollTo({ ...savedScroll, behavior: "instant" });
  }

  if (activeCard.isConnected) {
    activeCard.focus({ preventScroll: true });
  }

  activeCard = null;
  savedScroll = null;
  backdropPress = false;
}

function isOnBackdrop(event) {
  if (event.target !== letterDialog) return false;
  const bounds = letterDialog.getBoundingClientRect();
  return event.clientX < bounds.left || event.clientX > bounds.right ||
    event.clientY < bounds.top || event.clientY > bounds.bottom;
}

function renderSakura() {
  const count = reducedMotionQuery.matches ? 3 : mobilePetalsQuery.matches ? 10 : 16;
  const variants = Array.from({ length: count }, (_, index) => index + 1);

  // Shuffle pre-styled variants so each visit has a different arrangement.
  for (let index = variants.length - 1; index > 0; index -= 1) {
    const swap = Math.floor(Math.random() * (index + 1));
    [variants[index], variants[swap]] = [variants[swap], variants[index]];
  }

  const fragment = document.createDocumentFragment();
  variants.forEach((variant) => {
    const petal = document.createElement("span");
    petal.className = `sakura-petal petal-${variant}`;
    fragment.append(petal);
  });
  sakuraLayer.replaceChildren(fragment);
}

unfoldButton.addEventListener("click", showLetters);
dialogClose.addEventListener("click", closeLetter);
letterDialog.addEventListener("pointerdown", (event) => {
  backdropPress = isOnBackdrop(event);
});
letterDialog.addEventListener("click", (event) => {
  if (backdropPress && isOnBackdrop(event)) closeLetter();
  backdropPress = false;
});
letterDialog.addEventListener("cancel", (event) => {
  event.preventDefault();
  closeLetter();
});
letterDialog.addEventListener("close", restorePage);
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && openingCard) {
    openingCard.classList.remove("is-opening");
    openingCard.removeAttribute("aria-busy");
    openingCard = null;
  }
});
document.addEventListener("visibilitychange", () => {
  document.body.classList.toggle("page-inactive", document.hidden);
});
mobilePetalsQuery.addEventListener("change", renderSakura);
reducedMotionQuery.addEventListener("change", renderSakura);

renderLetters();
renderSakura();
