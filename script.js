const quizData = [
    {
        question: "Какие признаки характеризуют преступление?",
        answers: [
            { text: "Общественная опасность деяния", correct: true },
            { text: "Нарушение административного регламента", correct: false },
            { text: "Виновность действия", correct: true },
            { text: "Запрет в уголовном кодексе", correct: true },
            { text: "Нарушение внутреннего распорядка", correct: false }
        ]
    },
    {
        question: "Что отличает преступление от других правонарушений?",
        answers: [
            { text: "Высокая степень общественной опасности", correct: true },
            { text: "Меньшая степень ответственности", correct: false },
            { text: "Предусмотрено уголовным законодательством", correct: true },
            { text: "Наказание назначается только судом", correct: true },
            { text: "Может наказываться штрафом", correct: false }
        ]
    },
    {
        question: "Какие виды ответственности существуют за правонарушения?",
        answers: [
            { text: "Уголовная ответственность", correct: true },
            { text: "Административная ответственность", correct: true },
            { text: "Гражданско-правовая ответственность", correct: true },
            { text: "Дисциплинарная ответственность", correct: true },
            { text: "Моральная ответственность", correct: false }
        ]
    },
    {
        question: "Какие деяния являются правонарушениями?",
        answers: [
            { text: "Действия, противоречащие нормам права", correct: true },
            { text: "Бездействие, когда требовалось действие", correct: true },
            { text: "Деяния, совершённые малолетним ребёнком", correct: false },
            { text: "Противоправное, виновное и общественно опасное поведение", correct: true },
            { text: "Любое нарушение правил вежливости", correct: false }
        ]
    },
    {
        question: "Какие из следующих действий квалифицируются как преступления?",
        answers: [
            { text: "Кража имущества", correct: true },
            { text: "Убийство человека", correct: true },
            { text: "Опоздание на работу", correct: false },
            { text: "Разбой с применением насилия", correct: true },
            { text: "Нарушение ПДД без последствий", correct: false }
        ]
    },
    {
        question: "В чём разница между проступком и преступлением?",
        answers: [
            { text: "Преступление имеет большую общественную опасность", correct: true },
            { text: "Проступок влечёт административную ответственность", correct: true },
            { text: "Преступление регулируется уголовным кодексом", correct: true },
            { text: "Они совершаются разными лицами", correct: false },
            { text: "Проступок менее опасен для общества", correct: true }
        ]
    },
    {
        question: "Какие элементы входят в состав преступления?",
        answers: [
            { text: "Объект преступления", correct: true },
            { text: "Объективная сторона", correct: true },
            { text: "Субъект преступления", correct: true },
            { text: "Субъективная сторона (вина)", correct: true },
            { text: "Возраст потерпевшего", correct: false }
        ]
    },
    {
        question: "Какие из перечисленных действий являются административными правонарушениями?",
        answers: [
            { text: "Нарушение правил дорожного движения", correct: true },
            { text: "Нарушение санитарных правил", correct: true },
            { text: "Убийство человека", correct: false },
            { text: "Появление в общественном месте в нетрезвом виде", correct: true },
            { text: "Неправомерное присвоение чужого имущества в крупном размере", correct: false }
        ]
    },
    {
        question: "С какого возраста наступает уголовная ответственность?",
        answers: [
            { text: "С 16 лет за большинство преступлений", correct: true },
            { text: "С 18 лет за все преступления", correct: false },
            { text: "С 14 лет за особо тяжкие преступления", correct: true },
            { text: "С 12 лет за административные нарушения", correct: false },
            { text: "С 14 лет за убийство и насилие", correct: true }
        ]
    },
    {
        question: "Какие из следующих характеристик определяют понятие 'преступление'?",
        answers: [
            { text: "Виновное деяние", correct: true },
            { text: "Противоправность (запрещено законом)", correct: true },
            { text: "Общественная опасность", correct: true },
            { text: "Наказуемость по уголовному закону", correct: true },
            { text: "Совершено в состоянии аффекта", correct: false }
        ]
    }
];

let currentQuestion = 0;
let userAnswers = {};
let draggedElement = null;
let answersChecked = {};

function startQuiz() {
    document.getElementById('startScreen').classList.remove('active');
    document.getElementById('quizScreen').style.display = 'block';
    renderQuestion();
    document.getElementById('buttonGroup').style.display = 'flex';
}

// Добавить эти функции в существующий скрипт после renderQuestion() функции

let touchStartX = 0;
let touchStartY = 0;
let touchEndX = 0;
let touchEndY = 0;
let activeTouchElement = null;

function handleTouchStart(e) {
    if (e.target.classList.contains('answer-option') && !e.target.classList.contains('placed')) {
        touchStartX = e.touches[0].clientX;
        touchStartY = e.touches[0].clientY;
        activeTouchElement = e.target;
        e.target.classList.add('dragging');
        e.preventDefault();
    }
}

function handleTouchMove(e) {
    if (activeTouchElement) {
        touchEndX = e.touches[0].clientX;
        touchEndY = e.touches[0].clientY;
        e.preventDefault();
    }
}

function handleTouchEnd(e) {
    if (activeTouchElement) {
        activeTouchElement.classList.remove('dragging');

        // Проверяем, был ли это drag-жест (движение больше 10px)
        const diffX = Math.abs(touchEndX - touchStartX);
        const diffY = Math.abs(touchEndY - touchStartY);

        // Если движение было достаточно большим, считаем это drag-жестом
        if (diffX > 10 || diffY > 10) {
            // Ищем ближайшую drop-зону
            const dropZone = document.getElementById('dropZone');
            const rect = dropZone.getBoundingClientRect();

            // Проверяем, попал ли палец в зону drop-зоны
            if (touchEndX >= rect.left && touchEndX <= rect.right &&
                touchEndY >= rect.top && touchEndY <= rect.bottom) {
                addToDropZone(activeTouchElement);
            }
        } else {
            // Если движение было маленьким, считаем это кликом
            addToDropZone(activeTouchElement);
        }

        activeTouchElement = null;
        e.preventDefault();
    }
}

// Функция для мобильного удаления ответов
function handleMobileRemove(e, answer) {
    e.preventDefault();
    e.stopPropagation();
    removeAnswer(answer);
}

// Обновить функцию addToDropZone для поддержки мобильных устройств
function addToDropZone(element) {
    const answer = element.getAttribute('data-answer');
    const placedAnswers = document.getElementById('placedAnswers');

    // Проверяем, нет ли уже этого ответа
    if (placedAnswers.querySelector(`[data-answer="${answer}"]`)) {
        return;
    }

    // Если это первый элемент, очищаем текст
    if (placedAnswers.querySelector('.empty-zone-text')) {
        placedAnswers.innerHTML = '';
    }

    const placedDiv = document.createElement('div');
    placedDiv.className = 'placed-answer';
    placedDiv.setAttribute('data-answer', answer);
    placedDiv.innerHTML = `
        <span>${answer}</span>
        <button class="remove-btn" 
                onclick="handleMobileRemove(event, '${answer}')"
                ontouchstart="handleMobileRemove(event, '${answer}')">
            Удалить
        </button>
    `;

    placedAnswers.appendChild(placedDiv);

    // Скрываем исходный элемент
    element.classList.add('placed');

    // Сохраняем ответ
    if (!userAnswers[currentQuestion]) {
        userAnswers[currentQuestion] = [];
    }
    if (!userAnswers[currentQuestion].includes(answer)) {
        userAnswers[currentQuestion].push(answer);
    }

    updateButtonStates();
}

// Обновить функцию renderQuestion для добавления сенсорных событий
function renderQuestion() {
    const quiz = quizData[currentQuestion];
    const container = document.getElementById('quizContent');

    // Очищаем контейнер
    container.innerHTML = '';

    // Перемешиваем ответы
    const shuffledAnswers = [...quiz.answers].sort(() => Math.random() - 0.5);

    const questionHTML = `
        <div class="question-block active">
            <div class="question-title">
                <span class="question-number">Вопрос ${currentQuestion + 1}/${quizData.length}</span>
                ${quiz.question}
            </div>
            
            <div class="options-section">
                <div>
                    <div class="available-answers">
                        <div class="answers-label">Доступные ответы</div>
                        <div id="availableAnswers">
                            ${shuffledAnswers.map((ans, idx) => `
                                <div class="answer-option" 
                                     draggable="true" 
                                     data-answer="${ans.text}"
                                     data-correct="${ans.correct}"
                                     data-id="ans-${currentQuestion}-${idx}"
                                     ondragstart="dragStart(event)"
                                     ondragend="dragEnd(event)"
                                     ontouchstart="handleTouchStart(event)"
                                     ontouchmove="handleTouchMove(event)"
                                     ontouchend="handleTouchEnd(event)">
                                    ${ans.text}
                                </div>
                            `).join('')}
                        </div>
                    </div>
                </div>
                
                <div>
                    <div class="drop-zone" id="dropZone"
                         ondragover="dragOver(event)"
                         ondragleave="dragLeave(event)"
                         ondrop="drop(event)">
                        <div class="drop-zone-label">Ваши ответы</div>
                        <div id="placedAnswers">
                            <div class="empty-zone-text">Перетащите или нажмите на ответы...</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;

    container.innerHTML = questionHTML;

    // Восстанавливаем сохранённые ответы
    if (userAnswers[currentQuestion]) {
        userAnswers[currentQuestion].forEach(ans => {
            const element = document.querySelector(`[data-answer="${ans}"]`);
            if (element) {
                addToDropZone(element);
            }
        });
    }

    updateProgress();
    updateButtonStates();
}

// Добавить обработчики для всего документа
document.addEventListener('touchmove', function(e) {
    if (activeTouchElement) {
        e.preventDefault();
    }
}, { passive: false });

// Обновить текст для мобильных устройств
function updateForMobile() {
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    if (isMobile) {
        const emptyText = document.querySelector('.empty-zone-text');
        if (emptyText) {
            emptyText.textContent = 'Нажмите на ответы...';
        }
    }
}

// Вызвать при загрузке
window.addEventListener('DOMContentLoaded', function() {
    updateForMobile();
});

function renderQuestion() {
    const quiz = quizData[currentQuestion];
    const container = document.getElementById('quizContent');

    // Очищаем контейнер
    container.innerHTML = '';

    // Перемешиваем ответы
    const shuffledAnswers = [...quiz.answers].sort(() => Math.random() - 0.5);

    const questionHTML = `
        <div class="question-block active">
            <div class="question-title">
                <span class="question-number">Вопрос ${currentQuestion + 1}/${quizData.length}</span>
                ${quiz.question}
            </div>
            
            <div class="options-section">
                <div>
                    <div class="available-answers">
                        <div class="answers-label">Доступные ответы</div>
                        <div id="availableAnswers">
                            ${shuffledAnswers.map((ans, idx) => `
                                <div class="answer-option" 
                                     draggable="true" 
                                     data-answer="${ans.text}"
                                     data-correct="${ans.correct}"
                                     data-id="ans-${currentQuestion}-${idx}"
                                     ondragstart="dragStart(event)"
                                     ondragend="dragEnd(event)">
                                    ${ans.text}
                                </div>
                            `).join('')}
                        </div>
                    </div>
                </div>
                
                <div>
                    <div class="drop-zone" id="dropZone"
                         ondragover="dragOver(event)"
                         ondragleave="dragLeave(event)"
                         ondrop="drop(event)">
                        <div class="drop-zone-label">Ваши ответы</div>
                        <div id="placedAnswers">
                            <div class="empty-zone-text">Перетащите ответы сюда...</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;

    container.innerHTML = questionHTML;

    // Восстанавливаем сохранённые ответы
    if (userAnswers[currentQuestion]) {
        userAnswers[currentQuestion].forEach(ans => {
            const element = document.querySelector(`[data-answer="${ans}"]`);
            if (element) {
                addToDropZone(element);
            }
        });
    }

    updateProgress();
    updateButtonStates();
}

function dragStart(e) {
    draggedElement = e.target;
    e.target.classList.add('dragging');
    e.dataTransfer.effectAllowed = 'move';
}

function dragEnd(e) {
    e.target.classList.remove('dragging');
}

function dragOver(e) {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    document.getElementById('dropZone').classList.add('drag-over');
}

function dragLeave(e) {
    document.getElementById('dropZone').classList.remove('drag-over');
}

function drop(e) {
    e.preventDefault();
    document.getElementById('dropZone').classList.remove('drag-over');

    if (draggedElement) {
        addToDropZone(draggedElement);
    }
}

function addToDropZone(element) {
    const answer = element.getAttribute('data-answer');
    const placedAnswers = document.getElementById('placedAnswers');

    // Проверяем, нет ли уже этого ответа
    if (placedAnswers.querySelector(`[data-answer="${answer}"]`)) {
        return;
    }

    // Если это первый элемент, очищаем текст
    if (placedAnswers.querySelector('.empty-zone-text')) {
        placedAnswers.innerHTML = '';
    }

    const placedDiv = document.createElement('div');
    placedDiv.className = 'placed-answer';
    placedDiv.setAttribute('data-answer', answer);
    placedDiv.innerHTML = `
        <span>${answer}</span>
        <button class="remove-btn" onclick="removeAnswer('${answer}')">Удалить</button>
    `;

    placedAnswers.appendChild(placedDiv);

    // Скрываем исходный элемент
    element.classList.add('placed');

    // Сохраняем ответ
    if (!userAnswers[currentQuestion]) {
        userAnswers[currentQuestion] = [];
    }
    if (!userAnswers[currentQuestion].includes(answer)) {
        userAnswers[currentQuestion].push(answer);
    }
}

function removeAnswer(answer) {
    const placed = document.querySelector(`#placedAnswers [data-answer="${answer}"]`);
    if (placed) {
        placed.remove();
    }

    // Показываем исходный элемент
    const original = document.querySelector(`[data-answer="${answer}"]`);
    if (original) {
        original.classList.remove('placed');
    }

    userAnswers[currentQuestion] = userAnswers[currentQuestion].filter(a => a !== answer);

    if (document.getElementById('placedAnswers').children.length === 0) {
        document.getElementById('placedAnswers').innerHTML = '<div class="empty-zone-text">Перетащите ответы сюда...</div>';
    }
}

function updateProgress() {
    const progress = ((currentQuestion + 1) / quizData.length) * 100;
    document.getElementById('progressFill').style.width = progress + '%';
}

function updateButtonStates() {
    const prevBtn = document.querySelector('.btn-prev');
    const nextBtn = document.getElementById('nextBtn');
    const checkBtn = document.getElementById('checkBtn');

    prevBtn.disabled = currentQuestion === 0;

    if (currentQuestion === quizData.length - 1) {
        nextBtn.textContent = 'Завершить';
    } else {
        nextBtn.textContent = 'Следующий';
    }

    checkBtn.disabled = !userAnswers[currentQuestion] || userAnswers[currentQuestion].length === 0;
}

function checkAnswer() {
    const question = quizData[currentQuestion];
    const userAns = userAnswers[currentQuestion] || [];

    const correctAnswers = question.answers
        .filter(ans => ans.correct)
        .map(ans => ans.text);

    const isCorrect = JSON.stringify(userAns.sort()) === JSON.stringify(correctAnswers.sort());
    answersChecked[currentQuestion] = isCorrect;

    const feedbackArea = document.getElementById('feedbackArea');
    feedbackArea.innerHTML = '';

    const feedback = document.createElement('div');
    feedback.className = `feedback-message show ${isCorrect ? 'feedback-correct' : 'feedback-incorrect'}`;

    if (isCorrect) {
        feedback.innerHTML = '<strong>Правильно!</strong> Вы выбрали все верные ответы.';
    } else {
        let html = '<strong>Неправильно.</strong> Правильные ответы:<div class="correct-answers-list">';
        correctAnswers.forEach(ans => {
            html += `<div>• ${ans}</div>`;
        });
        html += '</div>';
        feedback.innerHTML = html;
    }

    feedbackArea.appendChild(feedback);
    document.getElementById('nextBtn').focus();
}

function nextQuestion() {
    if (currentQuestion < quizData.length - 1) {
        currentQuestion++;
        document.getElementById('feedbackArea').innerHTML = '';
        renderQuestion();
        window.scrollTo(0, 0);
    } else {
        showResults();
    }
}

function previousQuestion() {
    if (currentQuestion > 0) {
        currentQuestion--;
        renderQuestion();
        window.scrollTo(0, 0);
    }
}

function showResults() {
    let correctCount = 0;

    for (let qIdx = 0; qIdx < quizData.length; qIdx++) {
        const question = quizData[qIdx];
        const userAns = userAnswers[qIdx] || [];

        const correctAnswers = question.answers
            .filter(ans => ans.correct)
            .map(ans => ans.text);

        if (JSON.stringify(userAns.sort()) === JSON.stringify(correctAnswers.sort())) {
            correctCount++;
        }
    }

    const percentage = Math.round((correctCount / quizData.length) * 100);
    document.getElementById('scoreDisplay').textContent = `${correctCount}/${quizData.length}`;

    let message = '';
    if (percentage === 100) {
        message = 'Отлично! Вы отлично знаете материал!';
    } else if (percentage >= 80) {
        message = 'Хорошо! Вы хорошо освоили тему.';
    } else if (percentage >= 60) {
        message = 'Не плохо! Рекомендуем повторить материал.';
    } else {
        message = 'Рекомендуем тщательнее изучить тему.';
    }

    document.getElementById('resultMessage').textContent = message + ` (${percentage}%)`;

    document.getElementById('quizContent').style.display = 'none';
    document.getElementById('buttonGroup').style.display = 'none';
    document.getElementById('resultsScreen').classList.add('active');
    window.scrollTo(0, 0);
}

// Инициализация при загрузке страницы
window.addEventListener('DOMContentLoaded', function() {
    // Инициализация уже выполнена в объявлении переменных
});
