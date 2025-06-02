var cardNames=  ['01_TheFool.webp', '02_TheMagician.webp', '03_TheHighPriestess.webp', '04_TheEmpress.webp', '05_TheEmperor.webp', '06_TheHierophant.webp', '07_TheLovers.webp', '08_TheChariot.webp', '09_Strength.webp', '10_TheHermit.webp', '11_WheelOfFortune.webp', '12_Justice.webp', '13_TheHangedMan.webp', '14_Death.webp', '15_Temperance.webp', '16_TheDevil.webp', '17_TheTower.webp', '18_TheStar.webp', '19_TheMoon.webp', '20_TheSun.webp', '21_Judgement.webp', '22_TheWorld.webp', '23_KingOfCups_CP2077PL.webp', '24_KingOfPentacles_CP2077PL.webp', '25_KingOfSwords_CP2077PL.webp', '26_KingOfWands_CP2077PL.webp']
var cardDescEn = "assets/card-desc-en.json"
var cardDescDe = "assets/card-desc-de.json"
var cardNumbers = Array.from({ length: 26 }, (_, i) => i + 1)
var cardCount = 0
var cardsDescEn;
var cardsDescDe;

async function init() {
    cardsDescEn = await getCardsDesc("en");
    cardsDescDe = await getCardsDesc("de");
}

init()

async function drawCard(cardNum=undefined) {
    if (cardCount >= 3) {
        resetPlayfield();
    }

    try {
        const cardNumber = cardNum ? cardNum : cardNumbers[Math.floor(Math.random() * cardNumbers.length)];
        cardNumbers.pop(cardNumber)
        console.log(cardNumbers)
    
        const cardNameEn = cardsDescEn[cardNumber.toString()].name;
        const cardDescEn = cardsDescEn[cardNumber.toString()].desc;
        const cardNameDe = cardsDescDe[cardNumber.toString()].name;
        const cardDescDe = cardsDescDe[cardNumber.toString()].desc;
    
        const cardImageName = cardNames[cardNumber - 1];
    
        if (cardNameEn && cardImageName) {
            document.getElementById('playfield').innerHTML += `
            <div class="card-wrapper" id="card-${cardNumber}">
                <div class="desc">
                    <div id="en">
                        <h2>${cardNameEn}</h2>
                        <p>${cardDescEn}</p>
                    </div>
                    <div id="de">
                        <h2>${cardNameDe}</h2>
                        <p>${cardDescDe}</p>
                    </div>
                    <div class="lang-select">
                        <a id="lang-en" href="#playfield" onclick="showEn('${cardNumber}')">EN</a>
                        <a id="lang-de" href="#playfield" onclick="showDe('${cardNumber}')">DE</a>
                    </div>
                </div>
                <div class="img-wrapper">
                    <img src="img/cards/${cardImageName}" alt="${cardNameEn}">
                </div>
            </div>`;
        } else {
            console.error(`Could not find data for card number: ${cardNumber}`);
        }
        cardCount += 1
    } catch (e) {
        console.log(e)
    }
}

async function getReading() {
    let numbers = shuffle([...cardNumbers]).slice(0, 3);
    resetPlayfield();
    for (let i = 0; i < numbers.length; i++) {
        const cardNumber = numbers[i];
        drawCard(cardNumber)
    }
}

function resetPlayfield() {
    document.getElementById('playfield').innerHTML = "";
    cardCount = 0;
    cardNumbers = Array.from({ length: 26 }, (_, i) => i + 1);
}

function shuffle(array) {
    let shuffled = [...array];
    let i = array.length, j;
    while (--i > 0) {
        j = Math.floor(Math.random() * (i+1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled
}


async function getCardsDesc(lang) {
    try {
        const response = await fetch('assets/card-desc-' + lang + '.json');
        if (!response.ok) {
            throw new Error(response.status);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Failed to fetch data:', error);
        return null;
    }
}

function showEn(cardNum) {
    document.getElementById("card-"+cardNum).childNodes.item(1).childNodes.item(1).style.transform = "translateX(0%)";
    document.getElementById("card-"+cardNum).childNodes.item(1).childNodes.item(3).style.transform = "translateX(100%)";
}

function showDe(cardNum) {
    document.getElementById("card-"+cardNum).childNodes.item(1).childNodes.item(1).style.transform = "translateX(-100%)";
    document.getElementById("card-"+cardNum).childNodes.item(1).childNodes.item(3).style.transform = "translateX(0%)";
}   