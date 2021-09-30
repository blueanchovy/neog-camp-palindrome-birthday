const dateOfBirth = document.querySelector("#date-of-birth");
const checkButton = document.querySelector("#check-button")
const outputText = document.querySelector("#output-text");

function reverseStr(str){
    return str.split('').reverse().join('');
}

function isPalindrome(str){
    const reversedStr = reverseStr(str);
    return str === reversedStr; 
}

function numToStr(date){
    const dateStr = { day: '', month: '', year:''};

    if(date.day < 10){
        dateStr.day = '0' + date.day.toString();
    }
    else{
        dateStr.day = date.day.toString();
    }

    if(date.month < 10){
        dateStr.month = '0' + date.month.toString();
    }
    else{
        dateStr.month = date.month.toString();
    }

    dateStr.year = date.year.toString();
    return dateStr;
}

function getAllDateFormats(date){
    const dateStr = numToStr(date);
     
    const ddmmyyyy = dateStr.day + dateStr.month + dateStr.year;
    const mmddyyyy = dateStr.month + dateStr.day + dateStr.year;
    const yyyymmdd = dateStr.year + dateStr.month + dateStr.day;
    const ddmmyy = dateStr.day + dateStr.month + dateStr.year.slice(-2);
    const mmddyy = dateStr.month + dateStr.day + dateStr.year.slice(-2);
    const yymmdd = dateStr.year.slice(-2) + dateStr.month + dateStr.day;

    return [ddmmyyyy, mmddyyyy, yyyymmdd, ddmmyy, mmddyy, yymmdd];
}

function isPalindrome(str) {
    var reverse = reverseStr(str);
    return str === reverse;
}

function checkPalindromeForAllDateFormats(date){
    var listOfPalindromes = getAllDateFormats(date);

    var flag = false;

    for(var i = 0; i<listOfPalindromes.length ; i++){
        if(isPalindrome(listOfPalindromes[i])){
            flag = true;
            break;
        }
    }

    return flag;
}

function isLeapYear(str){
    if(str%400 === 0){
        return true;
    }
    if(str%100 === 0){
        return false;
    }
    if(str%4 === 0){
        return true;
    }
    return false;
}

function getNextDate(date){
    const daysInMonth = ['31', '28', '31', '30', '31', '30', '31', '31', '30', '31', '30', '31' ]

    let day = date.day + 1;
    let month = date.month;
    let year = date.year;


    if(month === 2){
        if(isLeapYear(year)){
            if(day>29){
                day=1;
                month++;
            }
        }
        else{
            if(day>28){
                day=1;
                month++;
            } 
        }
    }
    else{
        if(day>daysInMonth[month-1]){
            day=1;
            month++;
        }
    }

    if(month>12){
        month=1;
        year++;
    }

    return {
        day : day,
        month : month,
        year : year
    };
}

function getNextPalindromeDate(date){
    
    let nextDate = getNextDate(date);
    let count = 0;
    while(1){
        count++;
        let isItPalindrome = checkPalindromeForAllDateFormats(nextDate);
        if(isItPalindrome){
            break;
        }
        nextDate = getNextDate(nextDate);
    }

    return [count, nextDate];
}

clickHandler = () => {
    let bday = dateOfBirth.value;

    if(bday !== ''){
        let listOfDate = bday.split('-');

        let date = {
            day : Number(listOfDate[2]),
            month : Number(listOfDate[1]),
            year : Number(listOfDate[0])
        };

        let isPalindrome = checkPalindromeForAllDateFormats(date);

        if(isPalindrome){
            outputText.innerText = "Yay! Your birthday is a palindrome";
        }
        else{
            const [count, nextDate] = getNextPalindromeDate(date);
            outputText.innerText = 'Your birthday is not a palindrome. The next palindrome date is on ' + nextDate.day + '-' + nextDate.month + '-' + nextDate.year + ' which is ' + count + ' days after your birthday!';
        }
    }


};

checkButton.addEventListener('click', () => {
    console.log(dateOfBirth.value);
    if(dateOfBirth.value === ''){
        outputText.innerText = "Please enter your Birthdate before checking!";
    }
    else{
        clickHandler();
    }  
});
