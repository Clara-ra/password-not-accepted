const input = document.querySelector('input')
const statusText = document.querySelector('#status')

input.addEventListener('input', getPasswordStatus)

function getPasswordStatus() {
    displayStatus(checkPassword())
    return
}

function checkPassword() {
    const p = input.value //grab password
    if (p.length < 6) return "Password must contain at least 6 characters."
    if (!p.match(/[a-zA-Z]/)) return "Password must contain at least one letter."
    if (!p.match(/[a-z]/)) return "Password must contain at least one lowercase letter."
    if (!p.match(/[A-Z]/)) return "Password must contain at least one uppercase letter."
    if (!p.match(/[\d]/)) return "Password must contain at least one digit."
    if (!p.match(/[-’/`~!#*$@_%+=.,^&(){}[\]|;:”<>?\\]/)) return "Password must contain at least one special character."
    if (p.match(/[\s]/)) return "Password cannot contain spaces."
    if (!p.match(/[0-9]{3}/)) return "Password must contain 3 repeating digits."
    if (mostCommonPasses.find(pass => p.includes(pass))) return "Password cannot contain a common password."
    if (p.length < 16) return "Actually, the length must be at least 16 characters."
    // here, () denotes a capturing group. We are looking for [a-zA-Z] in our capturing group. 
    //\1 is a backreference. We are saying "match the text most recently matched in the capturing group". 
    // If we wanted to look for 3 or more consecutive characters we could append {2,} to this.
    if (p.match(/([a-zA-Z])\1/)) return "Password cannot contain consecutive repeating letters."
    return ""
}

//outlaw half of the special chars. tell user you can't use those. blank not allowed.
//double length required.          actually, the length must be at least 16 characters.
//two repeating digits required        must contain 2 repeating digits.
//letters cannot repeat               repeating letters not allowed.
//must contain the year the treaty of gaudalupe hidalgo was signed (1848)
//three repeating digits required            did I say 2 repeating digits? I meant 3.
//outlaw almost all of the special characters       Actually we don't accept blank.
//check emoji is included        did I mention you need an emoji?
//check two emojis is included    two emojis?
//check it is a palindrome         must be a palindrome.
//check it is not longer than 20    oh, also it must be less than 20 characters.
//aB`111848EE848111`Ba

function displayStatus(msg ='') {
    if (msg) {
        statusText.classList.add('bad')
        statusText.classList.remove('good')
    }
    else {
        statusText.classList.add('good')
        statusText.classList.remove('bad')
    }
    statusText.textContent = msg || 'Password accepted! Enjoy your strong password.'
    statusText.classList.remove('hidden')
}


//list pulled from Wikipedia https://en.wikipedia.org/wiki/Wikipedia:10,000_most_common_passwords
const mostCommonPasses = ["123456", "password", "12345678", "qwerty", "123456789", "12345", 
"1234", "111111", "1234567", "dragon", "123123", "baseball", "abc123", "football", "monkey", 
"letmein", "696969", "shadow", "master", "666666", "qwertyuiop", "123321", "mustang", "1234567890", 
"michael", "654321", "pussy", "superman", "1qaz2wsx", "7777777", "fuckyou", "121212", "000000", "qazwsx", 
"123qwe", "killer", "trustno1", "jordan", "jennifer", "zxcvbnm", "asdfgh", "hunter", "buster", "soccer", "harley", 
"batman", "andrew", "tigger", "sunshine", "iloveyou", "fuckme", "2000", "charlie", "robert", "thomas", "hockey", 
"ranger", "daniel", "starwars", "klaster", "112233", "george", "asshole", "computer", "michelle", "jessica", "pepper", 
"1111", "zxcvbn", "555555", "11111111", "131313", "freedom", "777777", "pass", "fuck", "maggie", "159753", "aaaaaa", 
"ginger", "princess", "joshua", "cheese", "amanda", "summer", "love", "ashley", "6969", "nicole", "chelsea", "biteme", 
"matthew", "access", "yankees", "987654321", "dallas", "austin", "thunder", "taylor", "matrix", "minecraft"]