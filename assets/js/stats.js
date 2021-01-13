function printStats() {
    window.print();
}

function undoText() {
    document.execCommand("undo");
}

function redoText() {
    document.execCommand("redo");
}

function clearText() {
    document.getElementById("inputBox").value = "";
}

function getInputText() {
    return document.getElementById('inputBox').value;
}

function getSearchText() {
    return document.getElementById('searchBox').value;
}

function printResult(value, id) {
    if (getInputText().length == 0 || value == null || value.length == 0 || value == "") {
        document.getElementById(id).innerHTML = "0";
    } else if (id == "searchResult" && getSearchText().length == 0) {
        document.getElementById(id).innerHTML = "0";
    } else if (Array.isArray(value) && value.length || id == "charWithSpaces" || id == "charWithoutSpaces") {
        document.getElementById(id).innerHTML = "" + value.length;
    } else {
        document.getElementById(id).innerHTML = "" + value;
    }
}

function searchValue() {
    const searchExp = new RegExp(getSearchText(), 'gi');
    var searchResult = getInputText().match(searchExp);
    printResult(searchResult, "searchResult");
}

function analyzeText() {
    // Characters with white spaces
    printResult(getInputText(), "charWithSpaces");

    // Characters without white spaces
    var charWithoutSpaces = getInputText().replace(/\s/g, "");
    printResult(charWithoutSpaces, "charWithoutSpaces");

    // Alphanumeric Characters
    var alphanumericCharacters = getInputText().match(/[A-Za-z0-9]/g);
    printResult(alphanumericCharacters, "alphanumericCharacters");

    // No of Words
    var noOfWords = getInputText().trim().split(/\s+/);
    printResult(noOfWords, "noOfWords");

    // No of Sentences
    var noOfSentences = getInputText().match(/\w[.?!](\s|$)/g);
    printResult(noOfSentences, "noOfSentences");

    // // No of Paragraphs
    var noOfParagraphs = getInputText().replace(/\n$/gm, '').split(/\n/);
    printResult(noOfParagraphs, "noOfParagraphs");

    // No of Syllables
    var noOfSyllables = 0;
    for (var i = 0; i < noOfWords.length; i++) {
        if (noOfWords[i].match(/[aeiou]/i)) {
            noOfSyllables++;
        }
    }
    printResult(noOfSyllables, "noOfSyllables");

    // Characters per Word
    var charPerWord = (charWithoutSpaces.length / noOfWords.length).toFixed(0);
    printResult(charPerWord, "charPerWord");

    // Characters per Sentence
    var charactersPerSentence = noOfSentences == null ? 0 : (charWithoutSpaces.length / noOfSentences.length).toFixed(0);
    printResult(charactersPerSentence, "charactersPerSentence");

    // Words per Sentence
    var wordsPerSentence = noOfSentences == null ? 0 : (noOfWords.length / noOfSentences.length).toFixed(0);
    printResult(wordsPerSentence, "wordsPerSentence");

    // Characters per Paragraphs
    var charPerParagraphs = (charWithoutSpaces.length / noOfParagraphs.length).toFixed(0);
    printResult(charPerParagraphs, "charPerParagraphs");

    // Words per Paragraphs
    var wordsPerParagraphs = (noOfWords.length / noOfParagraphs.length).toFixed(0);
    printResult(wordsPerParagraphs, "wordsPerParagraphs");

    // Sentence per Paragraphs
    var sentencePerParagraphs = noOfSentences == null ? 0 : (noOfSentences.length / noOfParagraphs.length).toFixed(0);
    printResult(sentencePerParagraphs, "sentencePerParagraphs");

    // Average reading time
    var averageReadingTime = (noOfWords.length / 100).toFixed(2);
    printResult(averageReadingTime, "averageReadingTime");

    // Unique Words & Most Common Word
    var noOfUniqueWords = 0;
    var noOfCommonWord = 0;
    var commonWordList = [];
    var newWordList = [];
    for (var i = 0; i < noOfWords.length; i++) {
        newWordList[i] = noOfWords[i].replace(/\./g, "");
    }

    for (var i = 0; i < newWordList.length; i++) {
        var isUnique = 1;
        for (var j = 0; j < newWordList.length; j++) {
            if (i != j) {
                if (newWordList[i] == newWordList[j]) {
                    isUnique = !isUnique;
                    commonWordList[noOfCommonWord] = newWordList[i];
                    break;
                }
            }
        }
        if (isUnique == 1) {
            noOfUniqueWords++;
        }
        else {
            noOfCommonWord++;
        }
    }
    commonWordList = [...new Set(commonWordList)];
    printResult(noOfUniqueWords, "noOfUniqueWords");
    printResult(commonWordList, "noOfCommonWord");

}