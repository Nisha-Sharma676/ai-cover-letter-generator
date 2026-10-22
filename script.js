const form = document.getElementById("cover-letter-form");
const resultSection = document.getElementById("result-section");
const coverLetterOutput = document.getElementById("cover-letter-output");
const copyButton = document.getElementById("copy-button");
const copyStatus = document.getElementById("copy-status");

form.addEventListener("submit", async function(event) {
  event.preventDefault();

  const name = document.getElementById("candidate-name").value.trim();
  const role = document.getElementById("job-role").value.trim();
  const company = document.getElementById("company").value.trim();
  const skills = document.getElementById("skills").value.trim();

  const generateButton = form.querySelector('button[type="submit"]');

  generateButton.disabled = true;
  generateButton.textContent = "Generating...";
  resultSection.hidden = true;
  copyStatus.textContent = "";

  try {
    const response = await fetch("/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ name, role, company, skills })
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Failed to generate cover letter.");
    }

    coverLetterOutput.textContent = data.coverLetter;
    resultSection.hidden = false;
    resultSection.scrollIntoView({ behavior: "smooth" });
  } catch (error) {
    alert(error.message || "Something went wrong. Please try again.");
  } finally {
    generateButton.disabled = false;
    generateButton.textContent = "Generate Cover Letter";
  }
});

copyButton.addEventListener("click", async function() {
  try {
    await navigator.clipboard.writeText(coverLetterOutput.textContent);
    copyStatus.textContent = "Cover letter copied successfully!";
  } catch (error) {
    copyStatus.textContent = "Copy failed. Please copy the letter manually.";
  }
});
