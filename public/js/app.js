// Client side javascript

const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

const getWeather = (address) => { 
    fetch(`/weather?address=${address}`).then((response) => {
        response.json().then(data => {
            if (data.error) {
                messageOne.textContent = data.error
            } else {
                messageOne.textContent = data.location
                messageTwo.textContent = data.output
            }
        })
    })
}

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')

weatherForm.addEventListener('submit', (e) => {
    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''
    e.preventDefault()
    const location = search.value
    getWeather(location)
})