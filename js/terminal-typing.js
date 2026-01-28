/**
 * Terminal hero: types commands and outputs in sequence, then reveals CTA.
 * Sequence: whoami → cat about.txt → ls skills → display avatar.png → cd projects
 */
(function () {
  var output = document.getElementById("terminal-output");
  var commandEl = document.getElementById("terminal-command");
  var cursorEl = document.getElementById("terminal-cursor");
  var ctaWrap = document.getElementById("terminal-cta-wrap");

  if (!output || !commandEl) return;

  var prompt = "negar@portfolio ~ $";

  var steps = [
    {
      cmd: "whoami",
      output: "Negar Baharmand",
      outputType: "text",
    },
    {
      cmd: "cat about.txt",
      output: "Fullstack developer, educator, builder of web apps.",
      outputType: "text",
    },
    {
      cmd: "ls skills",
      output: "React · Node · JavaScript · …",
      outputType: "text",
    },
    {
      cmd: "display avatar.png",
      output: "./images/profile.jpeg",
      outputType: "avatar",
    },
  ];

  var stepIndex = 0;
  var charIndex = 0;
  var isTypingCommand = true;

  function appendInputLine(text) {
    var line = document.createElement("div");
    line.className = "terminal-line terminal-line-input";
    line.innerHTML =
      '<span class="terminal-prompt">' +
      prompt +
      "</span> <span class=\"terminal-cmd\">" +
      escapeHtml(text) +
      "</span>";
    output.appendChild(line);
  }

  function appendOutputLine(content, isAvatar) {
    var line = document.createElement("div");
    line.className = "terminal-line terminal-line-output" + (isAvatar ? " terminal-line--avatar" : "");
    if (isAvatar) {
      var img = document.createElement("img");
      img.src = content;
      img.alt = "Negar Baharmand";
      line.appendChild(img);
    } else {
      line.textContent = content;
    }
    output.appendChild(line);
  }

  function escapeHtml(s) {
    var div = document.createElement("div");
    div.textContent = s;
    return div.innerHTML;
  }

  function scrollToBottom() {
    output.scrollTop = output.scrollHeight;
  }

  function typeNextChar() {
    var step = steps[stepIndex];
    if (!step) {
      showCta();
      return;
    }

    if (isTypingCommand) {
      if (charIndex < step.cmd.length) {
        commandEl.textContent = step.cmd.slice(0, charIndex + 1);
        charIndex++;
        setTimeout(typeNextChar, 60 + Math.random() * 40);
      } else {
        isTypingCommand = false;
        setTimeout(function () {
          appendInputLine(step.cmd);
          commandEl.textContent = "";
          appendOutputLine(step.output, step.outputType === "avatar");
          scrollToBottom();
          charIndex = 0;
          stepIndex++;
          isTypingCommand = true;
          setTimeout(typeNextChar, 800);
        }, 400);
      }
    }
  }

  function showCta() {
    commandEl.textContent = "";
    if (cursorEl) cursorEl.style.visibility = "hidden";
    if (ctaWrap) {
      ctaWrap.classList.add("terminal-cta-visible");
      ctaWrap.removeAttribute("aria-hidden");
      var ctaLink = document.getElementById("terminal-cta");
      if (ctaLink) ctaLink.removeAttribute("tabindex");
    }
  }

  function start() {
    setTimeout(typeNextChar, 800);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", start);
  } else {
    start();
  }
})();
