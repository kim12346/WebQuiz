$('.open-modal').click(function () {// 모달창을 여는 버튼을 누르면
    $('.modal').fadeIn();// 모달창 나오고
    $('.modal-inner').fadeIn();
    $('.modal2').fadeIn();
    $('.modal-inner2').fadeIn();
});
$('.close-modal').click(function () { // 닫기버튼을 누르면
    $('.modal').fadeOut();//사라지고
    $('.modal-inner').fadeOut();
    $('.modal2').fadeOut();
    $('.modal-inner2').fadeOut();
});

const quizData = [ // 질문 리스트
    { question: "Q: What is the largest planet in the universe?", a: "Earth", b: "Jupiter", c: "Saturn", d: "Mars", correct: "b" },
    { question: "Q: What is the only natural satellite on Earth?", a: "Mars", b: "Venus", c: "Earth", d: "Moon", correct: "d" },
    { question: "Q: What is the name of our galaxy?", a: "Andromeda Galaxy", b: "a triangular galaxy", c: "Mellan Eunha", d: "The milky way", correct: "d" },
    { question: "Q: Which celestial body takes about 8 minutes for light to reach Earth?", a: "Moon", b: "Sun", c: "Mars", d: "Jupiter", correct: "b" },
    { question: "Q: What is the main function of the International Space Station (ISS)?", a: "Collecting space junk", b: "Conducting astronomical research", c: "Purifying the earth's atmosphere", d: "Acting as a starting point for traveling to another planet", correct: "b" },
    { question: "Q: What is the most hot planets in the solar system?", a: "Mercury", b: "Venus", c: "Mars", d: "Earth", correct: "b" },
    { question: "Q: What is the outermost planet in the solar system?", a: "Uranus", b: "Neptune", c: "Pluto", d: "Saturn", correct: "b" },
    { question: "Q: What should astronauts do to maintain their bones and muscles in zero gravity?", a: "Eat a high-speed meal", b: "regular exercise", c: "solar exposure", d: "increasing salt intake", correct: "b" },
    { question: "Q: What is the name of the planet expelled from the solar system?", a: "Neptune", b: "Pluto", c: "Venus", d: "Earth", correct: "b" },
    { question: "Q: What is the first spacecraft on the moon?", a: "Apollo 11", b: "Voyager 1", c: "Luna 3", d: "Smurney Ketchy 1", correct: "c" },
];

let currentQuiz = 0; // 현재 퀴즈의 인덱스
let score = 0; // 사용자의 점수
let selectedQuizData; // 퀴즈 배열들을 무작위로 섞은 뒤 처음 5개 질문을 변수에 저장
let selectedAnswer; // 사용자가 선택한 답 저장
let wrongAnswers = []; // 오답을 저장하는 배열

const questionEl = $('#question'); // html에서 question 이라는 id를 자바스크립트에서 questionEl로 사용
const choicesEls = $('.choice'); // 위와 기능 동일
const quiz = $('#quiz');
const result = $('#result');    
const scoreEl = $('#score');
const restartBtn = $('#restart');
const rateEl = $('#rate');
const ans = $('#WA');

function shuffleArray(array) { //문제 랜덤으로 섞기
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]]; // 요소끼리 서로 교환한다.
    }
}

function loadQuiz() {
    const currentQuizData = selectedQuizData[currentQuiz]; // 현재 질문 데이터
    questionEl.text(currentQuizData.question);// 화면에 표시
    $('#a').text(currentQuizData.a).data('answer', 'a');//각각 선택지들
    $('#b').text(currentQuizData.b).data('answer', 'b');
    $('#c').text(currentQuizData.c).data('answer', 'c');
    $('#d').text(currentQuizData.d).data('answer', 'd');
}

function loadQuizData() {
    shuffleArray(quizData); // 배열을 무작위로 섞은 후
    selectedQuizData = quizData.slice(0, 5);// 첫번째부터 다섯번째까지의 문제 출력
}

function displayAccuracy() {
    const accuracy = ((score / selectedQuizData.length) * 100).toFixed(2);// 정답률 계산, 소수점 둘째자리까지 반올림
    rateEl.text(`${accuracy}%`);
}

choicesEls.click(function () { // 선택지를 클릭하면
    selectedAnswer = $(this).data('answer'); // 사용자가 선택한 답변 저장
    if (selectedAnswer === selectedQuizData[currentQuiz].correct) { // 만약 답과 같으면
        score++; // score + 1
    } else { //아니면
        wrongAnswers.push({ // 틀린문제를 저장, push: 배열끝에 새로운 요소 추가
            question: selectedQuizData[currentQuiz].question, // 현재 질문을 가져옴
            correct: selectedQuizData[currentQuiz][selectedQuizData[currentQuiz].correct] // 현재 문제의 정답을 가져옴
        });
    }
    currentQuiz++; // 문제 번호 인덱스에 1을 더하여 다음문제로 넘어감
    if (currentQuiz < selectedQuizData.length) { // 만약 남은 문제가 있으면
        loadQuiz(); // 계속 진행
    } else { // 아니면
        result.removeClass('hidden'); // 결과를 화면에 보이게 함
        scoreEl.text(`${score} / ${selectedQuizData.length}`); // 점수 출력: 맞은 점수 / 전체 점수
        displayAccuracy(); // 정답률 출력
        if (wrongAnswers.length > 0) { // 만약 틀린문제가 존재하면
            $('.open-modal').show();// 모달창 열기
            ans.text(''); //html에 있던 기존 텍스트 지우기
            wrongAnswers.forEach((item, index) => { // 틀린답 각각(질문 및 정답 포함)
                ans.append(`<p>Number ${index + 1} is wrong!<br> ${item.question},<br> A: ${item.correct}</p><hr>`); // 출력
            });
        } else {
            $('.open-modal').hide();// 틀린게 없으면 오답창 여는 버튼 숨기기
        }
    }
});

restartBtn.click(function () {// 재시작 버튼을 누르면
    score = 0; // 점수 초기화
    currentQuiz = 0; // 퀴즈의 인덱스 초기화
    wrongAnswers = []; // 오답 배열 초기화
    result.addClass('hidden'); // 결과화면 숨기고
    quiz.removeClass('hidden'); // 퀴즈화면 표시
    scoreEl.text(''); // html에 써져있는 텍스트 지우기
    rateEl.text(''); // 위와 동일
    $('.open-modal').hide()
    loadQuizData();
    loadQuiz();
});

loadQuizData();
loadQuiz();
