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

Với t thì Điệp sẽ luôn là 1 người bạn tốt. T thấy Điệp có nội lực, có personality nma chưa bung toả hết ra (hoặc do t ko nch với m nhiều😀). Chúc Điệp lột xác, trở thành phiên bản tốt hơn của bản thân nhá, cố lên💪Mong bao giờ t đến Nhật chơi trong tương lai thì Điệp làm hướng dẫn viên haha:D

Với cả nhớ update trên tiktok đấy:))) Bọn t sẽ dõi theo m. Đó, chúc có vậy thui, nếu cần giúp gì thì t sẵn sàng nhá, sau này nhớ đến bạn là đc😌

うまくいきますように🍀!

kly`
  }
];

const introScreen = document.querySelector("#intro-screen");
const lettersScreen = document.querySelector("#letters-screen");
const lettersTitle = document.querySelector("#letters-title");
const unfoldButton = document.querySelector("#unfold-button");
const lettersList = document.querySelector("#letters-list");
const letterDialog = document.querySelector("#letter-dialog");
const dialogSender = document.querySelector("#dialog-sender");
const dialogMessage = document.querySelector("#dialog-message");
const dialogClose = document.querySelector("#dialog-close");

let lastFocusedElement = null;

function renderLetters() {
  const fragment = document.createDocumentFragment();

  letters.forEach((letter) => {
    const listItem = document.createElement("li");
    const card = document.createElement("button");
    const label = document.createElement("span");
    const sender = document.createElement("span");

    card.className = "letter-card";
    card.type = "button";
    card.setAttribute("aria-haspopup", "dialog");

    label.className = "letter-card-label";
    label.textContent = "Letter from";

    sender.className = "letter-card-sender";
    sender.textContent = letter.sender;

    card.append(label, sender);
    card.addEventListener("click", () => openLetter(letter, card));
    listItem.append(card);
    fragment.append(listItem);
  });

  lettersList.append(fragment);
}

function showLetters() {
  const revealLetters = () => {
    introScreen.hidden = true;
    introScreen.classList.remove("is-leaving");
    lettersScreen.hidden = false;
    lettersScreen.classList.add("is-visible");
    lettersTitle.focus();
  };

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    revealLetters();
    return;
  }

  introScreen.classList.add("is-leaving");
  introScreen.addEventListener("animationend", revealLetters, { once: true });
}

function openLetter(letter, card) {
  lastFocusedElement = card;
  dialogSender.textContent = letter.sender;
  dialogMessage.textContent = letter.message;
  document.body.classList.add("modal-open");
  letterDialog.showModal();
  dialogClose.focus();
}

function closeLetter() {
  if (letterDialog.open) {
    letterDialog.close();
    handleDialogClose();
  }
}

function handleDialogClose() {
  if (letterDialog.open) {
    return;
  }

  document.body.classList.remove("modal-open");

  if (lastFocusedElement?.isConnected) {
    lastFocusedElement.focus();
  }

  lastFocusedElement = null;
}

function handleBackdropClick(event) {
  const bounds = letterDialog.getBoundingClientRect();
  const clickedOutside =
    event.clientX < bounds.left ||
    event.clientX > bounds.right ||
    event.clientY < bounds.top ||
    event.clientY > bounds.bottom;

  if (clickedOutside) {
    closeLetter();
  }
}

unfoldButton.addEventListener("click", showLetters);
dialogClose.addEventListener("click", closeLetter);
letterDialog.addEventListener("click", handleBackdropClick);
letterDialog.addEventListener("cancel", (event) => {
  event.preventDefault();
  closeLetter();
});
letterDialog.addEventListener("close", handleDialogClose);

renderLetters();
