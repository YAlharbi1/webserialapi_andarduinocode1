const texts = document.querySelector(".words");
document.querySelector('button').addEventListener('click', async () => {
  // Prompt user to select any serial port.
  const port = await navigator.serial.requestPort();
  const ports = await navigator.serial.getPorts();
  await port.open({baudRate:9600});

});



window.SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;

const recognition = new SpeechRecognition();
recognition.lang="ar-AR";
recognition.interimResults = true;

let p = document.createElement("p");

recognition.addEventListener("result", (e) => {
  texts.appendChild(p);
  const text = Array.from(e.results)
    .map((result) => result[0])
    .map((result) => result.transcript)
    .join("");

  p.innerText = text;
  if (e.results[0].isFinal) {
    if(text.includes("يمين")){
      p = document.createElement("p");
      const textEncoder = new TextEncoderStream();
      const writableStreamClosed = textEncoder.readable.pipeTo(port.writable);
      const writer = textEncoder.writable.getWriter();
      await writer.write(text);
    }
    if(text.includes("يسار")){
      p = document.createElement("p");
      const textEncoder = new TextEncoderStream();
      const writableStreamClosed = textEncoder.readable.pipeTo(port.writable);
      const writer = textEncoder.writable.getWriter();
      await writer.write(text);
      writer.releaseLock();
    }
    p = document.createElement("p");
  }
  await port.close();
});

recognition.addEventListener("end", () => {
  recognition.start();
});

recognition.start();

