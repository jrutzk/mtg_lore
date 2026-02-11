// Get DOM elements
const characterInput = document.getElementById('characterInput');
const getLoreBtn = document.getElementById('getLoreBtn');
const loading = document.getElementById('loading');
const error = document.getElementById('error');
const results = document.getElementById('results');

// Add event listener to button
getLoreBtn.addEventListener('click', handleGetLore);

// Allow pressing Enter in the input field to trigger search
characterInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        handleGetLore();
    }
});

/**
 * Main function to handle the "Get Lore" button click
 */
async function handleGetLore() {
    const characterName = characterInput.value.trim();

    // Validate input
    if (!characterName) {
        showError('Please enter a character name');
        return;
    }

    // Reset UI state
    hideError();
    hideResults();
    showLoading();
    disableButton();

    try {
        // Make POST request to backend
        const response = await fetch('/api/lore', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ characterName })
        });

        // Parse the JSON response
        const data = await response.json();

        // Check if request was successful
        if (!response.ok) {
            throw new Error(data.error || 'Failed to fetch character lore');
        }

        // Display the results
        displayResults(data);

    } catch (err) {
        console.error('Error:', err);
        showError(err.message || 'Something went wrong. Please try again.');
    } finally {
        hideLoading();
        enableButton();
    }
}

/**
 * Display the character lore results on the page
 * @param {Object} data - The lore data from the API
 */
function displayResults(data) {
    // Populate character name
    document.getElementById('characterName').textContent = data.name;

    // Populate plane
    document.getElementById('plane').textContent = data.plane || 'Unknown';

    // Populate affiliations
    const affiliationsList = document.getElementById('affiliations');
    affiliationsList.innerHTML = '';
    if (data.affiliations && data.affiliations.length > 0) {
        data.affiliations.forEach(affiliation => {
            const li = document.createElement('li');
            li.textContent = affiliation;
            affiliationsList.appendChild(li);
        });
    } else {
        const li = document.createElement('li');
        li.textContent = 'None known';
        affiliationsList.appendChild(li);
    }

    // Populate summary
    document.getElementById('summary').textContent = data.summary;

    // Populate relationship badges
    populateRelationship('nahiriRelationship', data.nahiri_relationship);
    populateRelationship('aureliaRelationship', data.aurelia_relationship);

    // Show results
    results.classList.remove('hidden');
}

/**
 * Populate a relationship badge with the appropriate styling
 * @param {string} elementId - The ID of the element to populate
 * @param {string} relationship - The relationship type
 */
function populateRelationship(elementId, relationship) {
    const element = document.getElementById(elementId);
    element.textContent = relationship.replace(/_/g, ' ');
    element.className = 'relationship-badge';
    element.classList.add(relationship);
}

/**
 * Show loading indicator
 */
function showLoading() {
    loading.classList.remove('hidden');
}

/**
 * Hide loading indicator
 */
function hideLoading() {
    loading.classList.add('hidden');
}

/**
 * Show error message
 * @param {string} message - The error message to display
 */
function showError(message) {
    error.textContent = message;
    error.classList.remove('hidden');
}

/**
 * Hide error message
 */
function hideError() {
    error.classList.add('hidden');
}

/**
 * Hide results section
 */
function hideResults() {
    results.classList.add('hidden');
}

/**
 * Disable the get lore button
 */
function disableButton() {
    getLoreBtn.disabled = true;
    getLoreBtn.textContent = 'Loading...';
}

/**
 * Enable the get lore button
 */
function enableButton() {
    getLoreBtn.disabled = false;
    getLoreBtn.textContent = 'Get Lore';
}
