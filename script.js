const userInfoForm = document.getElementById('userInfoForm');
const summaryList = document.querySelector('#summaryList');
const emptyMessage = document.getElementById('emptyMessage');
const cardName = document.getElementById('cardName');
const cardCaption = document.getElementById('cardCaption');
const avatarInitials = document.getElementById('avatarInitials');
const clearButton = document.getElementById('clearButton');
const favoriteColor = document.getElementById('favoriteColor');
const customColorGroup = document.getElementById('customColorGroup');
const customFavoriteColor = document.getElementById('customFavoriteColor');

// querySelectorAll selects all form fields; getElementsByClassName updates the card state.
const formFields = document.querySelectorAll('#userInfoForm .form-control:not(#customFavoriteColor)');
const infoCards = document.getElementsByClassName('info-card');

document.getElementById('fieldCount').textContent = formFields.length;

favoriteColor.addEventListener('change', () => {
    const showCustomColor = favoriteColor.value === 'Other';
    customColorGroup.hidden = !showCustomColor;
    customFavoriteColor.required = showCustomColor;

    if (!showCustomColor) {
        customFavoriteColor.value = '';
    }
});

userInfoForm.addEventListener('submit', (event) => {
    event.preventDefault();
    summaryList.replaceChildren();

    formFields.forEach((field) => {
        const row = document.createElement('div');
        row.className = 'summary-row';

        const label = document.createElement('dt');
        label.textContent = field.dataset.label;

        const value = document.createElement('dd');
        // Read the live DOM value and use textContent so user input is displayed safely as text.
        value.textContent = field.id === 'favoriteColor' && field.value === 'Other'
            ? customFavoriteColor.value
            : field.value;

        row.append(label, value);
        summaryList.append(row);
    });

    const nameValue = document.getElementById('fullName').value;
    cardName.textContent = nameValue || 'Your name';
    cardCaption.textContent = document.querySelector('#occupation').value || 'Your personal snapshot';
    avatarInitials.textContent = getInitials(nameValue);
    emptyMessage.hidden = true;

    // getElementsByClassName returns a live collection; toggle the generated-card appearance.
    if (infoCards.length > 0) {
        infoCards[0].classList.add('has-info');
    }
});

clearButton.addEventListener('click', () => {
    // Reset the preview too, so it always matches the current form state.
    window.setTimeout(() => {
        customColorGroup.hidden = true;
        customFavoriteColor.required = false;
        summaryList.replaceChildren();
        cardName.textContent = 'Your name';
        cardCaption.textContent = 'Your personal snapshot';
        avatarInitials.textContent = '✦';
        emptyMessage.hidden = false;

        if (infoCards.length > 0) {
            infoCards[0].classList.remove('has-info');
        }
    }, 0);
});

function getInitials(name) {
    const words = name.trim().split(/\s+/).filter(Boolean);
    if (words.length === 0) return '✦';
    return words.slice(0, 2).map((word) => word.charAt(0).toUpperCase()).join('');
}
