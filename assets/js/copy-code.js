document.addEventListener("DOMContentLoaded", function () {
  // Add copy buttons to all code blocks
  document.querySelectorAll("pre").forEach(function (block) {
    // Create container
    var container = document.createElement("div");
    container.className = "code-container";

    // Create inner frame
    var frame = document.createElement("div");
    frame.className = "code-frame";

    // Create button
    var button = document.createElement("button");
    button.className = "copy-button";
    button.textContent = "Copy";

    // Add click handler
    button.addEventListener("click", function () {
      var code = block.textContent;
      navigator.clipboard
        .writeText(code)
        .then(function () {
          button.textContent = "Copied";
          setTimeout(function () {
            button.textContent = "Copy";
          }, 2000);
        })
        .catch(function (error) {
          console.error("Copy failed:", error);
          button.textContent = "Error";
        });
    });

    // Set up the structure
    block.parentNode.insertBefore(container, block);
    container.appendChild(frame);
    frame.appendChild(block);
    frame.appendChild(button);
  });
});
