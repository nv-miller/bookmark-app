const showModalBtn = document.getElementById('show-modal')
const closeModalBtn = document.getElementById('close-modal')
const modal = document.getElementById('modal')
const bookmarkForm = document.getElementById('bookmark-form')
const bookmarksContainer = document.querySelector('.app__body')

let bookmarks = [{ title: 'Google', url: 'google.com' }, { title: 'Yandex', url: 'ya.ru' }]

const createBookmarkItem = (title, url) => {
	return `
		<div class="app__item bookmark">
				<img class="bookmark__icon" src="https://s2.googleusercontent.com/s2/favicons?domain=www.${url}" alt="favicon" loading="lazy">
				<a class="bookmark__link" href="https://${url}" target="_blank">${title}</a>
				<button class="bookmark__delete-btn" title="delete bookmark" data-title=${title}>
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
						<path d="M135.2 17.7C140.6 6.8 151.7 0 163.8 0L284.2 0c12.1 0 23.2 6.8 28.6 17.7L320 32l96 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 96C14.3 96 0 81.7 0 64S14.3 32 32 32l96 0 7.2-14.3zM32 128l384 0 0 320c0 35.3-28.7 64-64 64L96 512c-35.3 0-64-28.7-64-64l0-320zm96 64c-8.8 0-16 7.2-16 16l0 224c0 8.8 7.2 16 16 16s16-7.2 16-16l0-224c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16l0 224c0 8.8 7.2 16 16 16s16-7.2 16-16l0-224c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16l0 224c0 8.8 7.2 16 16 16s16-7.2 16-16l0-224c0-8.8-7.2-16-16-16z" />
					</svg>
				</button>
			</div>
	`
}

const updateBookmarks = (bookmarks) => {
	bookmarksContainer.innerHTML = ''
	if (bookmarks.length) {
		bookmarks.forEach(({ title, url }) => {
			bookmarksContainer.insertAdjacentHTML('beforeend', createBookmarkItem(title, url))
		})
	}
}

// Validate form fields
const validate = (title, url) => {
	const regexp = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&\/\/=]*)/g
	if (!title || !url) {
		alert('Please submit values for both fields')
		return false
	}
	if (!url.match(regexp)) {
		alert('Please provide a valid URL')
		return false
	}
	return true
}


// process form submitting
const handleFormSubmit = (e) => {
	e.preventDefault()
	const bookmarkTitle = e.target['website-title'].value
	const bookmarkURL = e.target['website-url'].value.includes('http://') || e.target['website-url'].value.includes('https://')
		? e.target['website-url'].value.split('//')[1]
		: e.target['website-url'].value
	const isValidate = validate(bookmarkTitle, bookmarkURL)
	if (isValidate) {
		bookmarks.push({ title: bookmarkTitle, url: bookmarkURL })
		updateBookmarks(bookmarks)
		bookmarkForm.reset()
		modal.close()
	}
}

// Event Listeners
showModalBtn.addEventListener("click", function (e) {
	modal.showModal()
})

bookmarkForm.addEventListener("submit", handleFormSubmit)

bookmarksContainer.addEventListener('click', (e) => {
	const currentBtn = e.target.closest('.bookmark__delete-btn')
	if (currentBtn) {
		const bookmarkTitle = currentBtn.dataset.title
		bookmarks = bookmarks.filter(({ title }) => title !== bookmarkTitle)
		updateBookmarks(bookmarks)
	}
})

modal.addEventListener('click', (e) => {
	if (!e.target.closest('.modal__inner') || e.target.closest('.modal__close')) {
		modal.close()
	}
})

// on load
updateBookmarks(bookmarks)
