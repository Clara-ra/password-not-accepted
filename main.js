const input = document.querySelector('input')
const statusText = document.querySelector('#status')

input.addEventListener('input', getPasswordStatus)

function getPasswordStatus() {
    displayStatus(checkPassword())
    return
}

function checkPassword() {
    const p = input.value //grab password
    console.log(`check password triggered. Length is ${p.length} for ${p}`)
    if (p.length < 6) return "Password must contain at least 6 characters."
    if (p.match(/^[A-Z]/)) return "Password cannot start with a capitalized letter."
    if (!p.match(/[a-zA-Z]/)) return "Password must contain at least one letter."
    if (!p.match(/[a-z]/)) return "Password must contain at least one lowercase letter."
    if (!p.match(/[A-Z]/)) return "Password must contain at least one uppercase letter."
    if (!p.match(/[\d]/)) return "Password must contain at least one digit."
    if (!p.match(/[-’/`~!#*$@_%+=.,^&(){}[\]|;:”<>?\\]/)) return "Password must contain at least one special character."
    if (p.match(/[\s]/)) return "Password cannot contain spaces."
    // if (!p.match(/[0-9]{3}/)) return "Password must contain 3 repeating digits."
    if (mostCommonPasses.find(pass => p.includes(pass))) return "Password cannot contain a common password."
    if(p.match(/["!_,@#<>]/)) return "The following special characters cannot be used: \" ! _ , @ # < >"
    if (p.length < 16) return "Actually, the length must be at least 16 characters."
    // here, () denotes a capturing group. We are looking for [a-zA-Z] in our capturing group. 
    //\1 is a backreference. We are saying "match the text most recently matched in the capturing group". 
    // If we wanted to look for 3 or more consecutive characters we could append {2,} to this.
    if (p.match(/([a-zA-Z])\1/)) return "Password cannot contain consecutive repeating letters."
    if (!p.match(/([0-9])\1/)) return "Password must contain 2 repeating digits."
    if (!p.match(/([0-9])\1{2,}/)) return "Did I say 2 repeating digits? I meant 3."
    if (!p.match(/[0-9]{4}/)) return "Actually 4..."
    if (!p.match(/([0-9])\1{4,}/)) return "5 repeating digits!"
    if (!p.match(1848)) return "Password must contain the year the Treaty of Guadalupe Hidalgo was signed."
    if (p.match(/\d$/)) return "Password cannot end with a digit."
    if (!astrologicalSign.find(sign => p.toLowerCase().includes(sign))) return "Password must contain your astrological sign."
    if (!p.match(/(?:[\u2648-\u2653])/)) return "Password must contain your astrological sign... as an emoji."
    const chosenSign = astrologicalSign.find( (word, i) => p.toLowerCase().includes( word ) && p.match( astrologicalEmoji[i] ) );
    if (!chosenSign) return "Astrological sign and Astrological emoji do not match."
    if (!p.match(/\p{Emoji_Modifier_Base}/u)) return "Password must contain an emoji of a person."
    //In this regex we are check to see that all 5 Code points are present, in any order.
    //(?= ) here refers to what is called a positive lookahead. It means we can match a pattern here without consuming characters. This is what allows us to check things in any order.
    //.* means we will accept any character 0 or more times. 
    // \u refers to a hex character. To check for Emoji diversity, we verifying that all 6 Fitzpatrick skin tones are present as Unicodes in the password.
    //Since the unicode for Fitzpatrick skin tones is greater than 16 bits, The lead and tail surrogates are used for the calculation.
    if (!p.match(/.*(?=.*\uD83C\uDFFB)(?=.*\uD83C\uDFFC)(?=.*\uD83C\uDFFD)(?=.*\uD83C\uDFFE)(?=.*\uD83C\uDFFF).*/g)) return "Emojis must be more diverse."
    if (p.length > 31 + chosenSign.length) return "Password is too long."
    //I managed to do it under 36. Keep in mind each Emoji has a length of  on 2, plus this skin tones. This means each diverse emoji has a length of 4. Astrological sign emojis just so happen to be in the BMP so they have a length of 1.
    return ""
}



function displayStatus(msg ='') {
    console.log(`displaying status message of ${msg}`)
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

const astrologicalSign = ["aries", "taurus", "gemini", "cancer", "leo", "virgo", "libra", "scorpio", "sagittarius", "capricorn", "aquarius", "pisces"]
const astrologicalEmoji = [/\u2648/, /\u2649/, /\u264A/, /\u264B/, /\u264C/, /\u264D/, /\u264E/, /\u264F/, /\u2650/, /\u2651/, /\u2652/, /\u2653/]

