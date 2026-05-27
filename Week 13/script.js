// Local cache state variables for handling selection strings
let activeMeaning1 = "";
let activeMeaning2 = "";

// Bind our modal reference to the DOM
const lyricsModalElement = new bootstrap.Modal(document.getElementById('lyricsModal'));

/**
 * Feeds specific album variables cleanly into the target interface modal nodes
 */
function openLyricsModal(albumTitle, trackTitle, bar1, bar2, meaning1, meaning2) {
    document.getElementById('modalAlbumTitle').textContent = albumTitle + " // Breakdown Session";
    document.getElementById('modalTrackTitle').textContent = `"${trackTitle}"`;
    
    const bar1Container = document.getElementById('lyricBar1');
    const bar2Container = document.getElementById('lyricBar2');
    
    // Inject lines cleanly
    bar1Container.textContent = `🎤 "${bar1}"`;
    bar2Container.textContent = `🎤 "${bar2}"`;
    
    // Store variables into active memory
    activeMeaning1 = meaning1;
    activeMeaning2 = meaning2;

    // Reset styles
    bar1Container.classList.remove('active-bar');
    bar2Container.classList.remove('active-bar');
    document.getElementById('meaningText').textContent = "Choose a line above to display the genius breakdown...";

    // Show the modal container window interface
    lyricsModalElement.show();
}

/**
 * Handles toggling active classes and displaying contextual breakdowns
 */
function selectBar(barNum) {
    const bar1Container = document.getElementById('lyricBar1');
    const bar2Container = document.getElementById('lyricBar2');
    const displayBox = document.getElementById('meaningText');

    if (barNum === 1) {
        bar1Container.classList.add('active-bar');
        bar2Container.classList.remove('active-bar');
        displayBox.textContent = activeMeaning1;
    } else if (barNum === 2) {
        bar2Container.classList.add('active-bar');
        bar1Container.classList.remove('active-bar');
        displayBox.textContent = activeMeaning2;
    }
}

/* =======================================================
   FORM INTERACTION LOGIC (DOM SELECTION & VALIDATION)
   ======================================================= */
const breakdownForm = document.getElementById('breakdownForm');
const fanNameInput = document.getElementById('fanName');
const requestedTrackInput = document.getElementById('requestedTrack');
const formFeedback = document.getElementById('formFeedback');

const requestReceipt = document.getElementById('requestReceipt');
const receiptUser = document.getElementById('receiptUser');
const receiptTrack = document.getElementById('receiptTrack');

breakdownForm.addEventListener('submit', function(event) {
    // Stop standard browser page refresh action
    event.preventDefault();

    const nameValue = fanNameInput.value.trim();
    const trackValue = requestedTrackInput.value.trim();

    // Input Form Validation
    if (nameValue === "" || trackValue === "") {
        formFeedback.textContent = "⚠ Field Error: Both fields must be filled out before submitting.";
        formFeedback.style.color = "#ff3333";
        requestReceipt.style.display = "none";
        return;
    }

    // Success Action Path
    formFeedback.textContent = "Submission Received!";
    formFeedback.style.color = "#00cc66";

    // Dynamic DOM Content updates
    receiptUser.textContent = nameValue;
    receiptTrack.textContent = trackValue;
    requestReceipt.style.display = "block";

    // Clear form inputs out for the user
    fanNameInput.value = "";
    requestedTrackInput.value = "";
});