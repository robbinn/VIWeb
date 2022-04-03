let currPos = 0;

async function showQuestion(questionPos, category, question_set) {

    if (questionPos < 0)
        currPos = question_set.length - 1;
    else
        currPos = (questionPos + (question_set.length)) % (question_set.length) ;

    const qNum = document.getElementById("questionNumber");
    qNum.innerText = (currPos+1).toString() + "/" + question_set.length.toString();

    const getButton = document.getElementById("answerStatus");
    if (getButton.innerText === "Hide Answer")
        getButton.innerText = "Show Answer";

    // Remove the previous information, be ready to load new question
    const div = document.getElementById("questionList");
    div.innerHTML = '';

    let node = document.createElement("h4");
    node.innerHTML = category[0] + ": " + question_set[currPos][0];
    document.getElementById("questionList").appendChild(node);

    for (let i=1; i<category.length; i++) {

        node = document.createElement("h4");

        const question = document.createElement("text");
        question.setAttribute("id", currPos.toString());
        question.innerHTML = category[i] + ": "
        node.appendChild(question);
        document.getElementById("questionList").appendChild(node);

        // If answer == -1, meaning there is no answer needed
        const a = question_set[currPos][i];

        let inputSpace = document.createElement("input");
        inputSpace.setAttribute("id", "a" + i.toString());
        inputSpace.setAttribute("class", "form-control");
        node.appendChild(inputSpace);
        document.getElementById("questionList").appendChild(node);

        // disable the input field is no answer needed
        if (a === "-1")
            inputSpace.setAttribute("disabled", "disabled");
    }
}

function showAnswer(questionPos, question_set) {
    let answer;
    let inputSpace;
    let idName;
    const getButton = document.getElementById("answerStatus");
    const status = getButton.innerText;

    if (status === "Show Answer") {
        getButton.innerText = "Hide Answer";
        for (let i=1; i<question_set[questionPos].length; i++) {
            answer = question_set[questionPos][i]
            idName = 'a' + (i).toString();
            inputSpace = document.getElementById(idName);
            if (answer !== "-1")
                inputSpace.setAttribute("placeholder", answer);
        }
    }

    else {
        getButton.innerText = "Show Answer";
        for (let i=1; i<question_set[questionPos].length; i++) {
            idName = 'a' + (i).toString();
            inputSpace = document.getElementById(idName);
            answer = question_set[questionPos][i];
            if (answer !== "-1")
                inputSpace.setAttribute("placeholder", '');
        }
    }
}

function checkAnswer(questionPos, question_set) {
    console.log(question_set);
    for (let i=1; i<question_set[questionPos].length; i++) {

        var inputSpace = document.getElementById("a" + (i).toString());
        var userAns = inputSpace.value;
        var question = question_set[questionPos][0];
        var correctAns = question_set[questionPos][i].split(",");
        let correctAnsCopy;

        // If single answer
        if (correctAns.length === 1) {
            if (correctAns[0] !== "-1") {
                userAns = userAns.trim().toLowerCase();
                correctAnsCopy = correctAns[0].trim().toLowerCase();

                if (userAns === correctAnsCopy)
                    inputSpace.setAttribute("class", "form-control is-valid");
                else
                    inputSpace.setAttribute("class", "form-control is-invalid");
            }
        }

        // If multiple answer
        else {
            let check = false;
            correctAnsCopy = [...correctAns];
            // User answer should contain comma for multiple answers
            if (userAns.includes(",")) {
                let ansArr = userAns.split(",");
                if (ansArr.length === correctAnsCopy.length) {
                    for (let j=0; j<ansArr.length; j++) {
                        ansArr[j] = ansArr[j].trim().toLowerCase();
                        correctAnsCopy[j] = correctAnsCopy[j].trim().toLowerCase();
                    }

                    // check if two array contain the same element regardless of order
                    check = ansArr.every(function (element) {
                        return correctAnsCopy.includes(element);
                    });
                }
            }

            if (check)
                inputSpace.setAttribute("class", "form-control is-valid");
            else
                inputSpace.setAttribute("class", "form-control is-invalid");
        }
    }
}