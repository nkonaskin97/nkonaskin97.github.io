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
let isMobile = false;

// Определяем устройство при загрузке
function detectDevice() {
    isMobile = window.innerWidth <= 768 ||
        ('ontouchstart' in window) ||
        (navigator.maxTouchPoints > 0);

    console.log(`Устройство: ${isMobile ? 'Мобильное' : 'ПК/Планшет'}`);
}

function startQuiz() {
    document.getElementById('startScreen').style.display = 'none';
    document.getElementById('quizScreen').style.display = 'block';
    updateTotalQuestions();
    renderQuestion();
}

function updateTotalQuestions() {
    document.getElementById('totalQuestions').textContent = quizData.length;
}

function renderQuestion() {
    const quiz = quizData[currentQuestion];
    const container = document.getElementById('quizContent');

    // Обновляем номер текущего вопроса
    document.getElementById('currentQuestion').textContent = currentQuestion + 1;

    // Очищаем контейнер
    container.innerHTML = '';

    // Перемешиваем ответы
    const shuffledAnswers = [...quiz.answers].sort(() => Math.random() - 0.5);

    // Определяем события в зависимости от устройства
    const dragEvents = isMobile ?
        `onclick="mobileSelectAnswer(this)" ontouchstart="handleTouchStart(this)"` :
        `draggable="true" ondragstart="dragStart(event)" ondragend="dragEnd(event)"`;

    const questionHTML = `
        <div class="question-block">
            <div class="question-title">
                <span class="question-number">Вопрос ${currentQuestion + 1}</span>
                ${quiz.question}
            </div>

            <div class="options-section">
                <div class="available-answers">
                    <div class="answers-label">
                        <i class="fas fa-list"></i> Доступные ответы
                        ${isMobile ? '<span class="mobile-hint">(нажмите для выбора)</span>' : '<span class="desktop-hint">(перетащите в правую колонку)</span>'}
                    </div>
                    <div id="availableAnswers" class="${isMobile ? 'mobile-mode' : 'desktop-mode'}">
                        ${shuffledAnswers.map((ans, idx) => `
                            <div class="answer-option ${isMobile ? 'mobile-answer' : 'desktop-answer'}"
                                 data-answer="${ans.text}"
                                 data-correct="${ans.correct}"
                                 data-id="ans-${currentQuestion}-${idx}"
                                 ${dragEvents}>
                                ${ans.text}
                                ${isMobile ? '<i class="fas fa-plus select-icon"></i>' : ''}
                            </div>
                        `).join('')}
                    </div>
                </div>

                <div class="drop-zone" id="dropZone"
                     ${!isMobile ? `ondragover="dragOver(event)"
                     ondragleave="dragLeave(event)"
                     ondrop="drop(event)"` : ''}>
                    <div class="drop-zone-label">
                        <i class="fas fa-check-circle"></i> Ваши ответы
                        ${isMobile ? '<span class="mobile-hint">(нажмите чтобы удалить)</span>' : ''}
                    </div>
                    <div id="placedAnswers" class="${isMobile ? 'mobile-placed' : ''}">
                        <div class="empty-zone-text">
                            ${isMobile ? 'Нажмите на ответы слева, чтобы выбрать' : 'Перетащите ответы сюда...'}
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
            if (isMobile) {
                mobileRestoreAnswer(ans);
            } else {
                const element = document.querySelector(`[data-answer="${ans}"]`);
                if (element) {
                    addToDropZone(element);
                }
            }
        });
    }

    updateProgress();
    updateButtonStates();
}

// ========== ДЛЯ ПК (DRAG AND DROP) ==========
function dragStart(e) {
    if (isMobile) return;
    draggedElement = e.target;
    e.target.classList.add('dragging');
    e.dataTransfer.setData('text/plain', e.target.dataset.answer);
    e.dataTransfer.effectAllowed = 'move';
}

function dragEnd(e) {
    if (isMobile) return;
    e.target.classList.remove('dragging');
}

function dragOver(e) {
    if (isMobile) return;
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    const dropZone = document.getElementById('dropZone');
    if (dropZone) {
        dropZone.classList.add('drag-over');
    }
}

function dragLeave(e) {
    if (isMobile) return;
    const dropZone = document.getElementById('dropZone');
    if (dropZone) {
        dropZone.classList.remove('drag-over');
    }
}

function drop(e) {
    if (isMobile) return;
    e.preventDefault();
    const dropZone = document.getElementById('dropZone');
    if (dropZone) {
        dropZone.classList.remove('drag-over');
    }

    if (draggedElement) {
        addToDropZone(draggedElement);
    }
}

// ========== ДЛЯ МОБИЛЬНЫХ (TAP TO SELECT) ==========
function mobileSelectAnswer(element) {
    if (!isMobile) return;

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

    // Создаем элемент в правой колонке
    const placedDiv = document.createElement('div');
    placedDiv.className = 'placed-answer mobile-placed-answer';
    placedDiv.setAttribute('data-answer', answer);
    placedDiv.setAttribute('onclick', 'mobileRemoveAnswer(this)');
    placedDiv.innerHTML = `
        <span>${answer}</span>
        <i class="fas fa-times remove-icon"></i>
    `;

    placedAnswers.appendChild(placedDiv);

    // Помечаем исходный элемент как выбранный
    element.classList.add('selected');
    element.classList.add('placed');

    // Сохраняем ответ
    if (!userAnswers[currentQuestion]) {
        userAnswers[currentQuestion] = [];
    }
    if (!userAnswers[currentQuestion].includes(answer)) {
        userAnswers[currentQuestion].push(answer);
    }

    updateButtonStates();

    // Визуальная обратная связь
    element.style.transform = 'scale(0.95)';
    setTimeout(() => {
        element.style.transform = '';
    }, 150);
}

function mobileRemoveAnswer(element) {
    if (!isMobile) return;

    const answer = element.getAttribute('data-answer');

    // Удаляем элемент из правой колонки
    element.remove();

    // Убираем метку с исходного элемента
    const original = document.querySelector(`[data-answer="${answer}"]`);
    if (original) {
        original.classList.remove('selected');
        original.classList.remove('placed');
    }

    // Удаляем ответ из сохраненных
    userAnswers[currentQuestion] = userAnswers[currentQuestion].filter(a => a !== answer);

    // Если больше нет ответов, показываем текст-заглушку
    if (document.getElementById('placedAnswers').children.length === 0) {
        document.getElementById('placedAnswers').innerHTML =
            '<div class="empty-zone-text">Нажмите на ответы слева, чтобы выбрать</div>';
    }

    updateButtonStates();
}

function mobileRestoreAnswer(answer) {
    if (!isMobile) return;

    const element = document.querySelector(`[data-answer="${answer}"]`);
    if (element) {
        element.classList.add('selected', 'placed');

        const placedAnswers = document.getElementById('placedAnswers');
        if (placedAnswers.querySelector('.empty-zone-text')) {
            placedAnswers.innerHTML = '';
        }

        const placedDiv = document.createElement('div');
        placedDiv.className = 'placed-answer mobile-placed-answer';
        placedDiv.setAttribute('data-answer', answer);
        placedDiv.setAttribute('onclick', 'mobileRemoveAnswer(this)');
        placedDiv.innerHTML = `
            <span>${answer}</span>
            <i class="fas fa-times remove-icon"></i>
        `;

        placedAnswers.appendChild(placedDiv);
    }
}

// Обработка касания для визуальной обратной связи
function handleTouchStart(element) {
    if (!isMobile) return;

    element.classList.add('touching');
    setTimeout(() => {
        element.classList.remove('touching');
    }, 200);
}

// Общая функция для добавления в зону ответов
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
        <button class="remove-btn" onclick="removeAnswer('${answer}')">
            <i class="fas fa-times"></i> Удалить
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

// Общая функция удаления
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
        document.getElementById('placedAnswers').innerHTML =
            '<div class="empty-zone-text">Перетащите ответы сюда...</div>';
    }

    updateButtonStates();
}

function updateProgress() {
    const progress = ((currentQuestion + 1) / quizData.length) * 100;
    const progressFill = document.getElementById('progressFill');
    if (progressFill) {
        progressFill.style.width = progress + '%';
    }
}

function updateButtonStates() {
    const prevBtn = document.querySelector('.btn-prev');
    const nextBtn = document.getElementById('nextBtn');

    prevBtn.disabled = currentQuestion === 0;

    if (currentQuestion === quizData.length - 1) {
        nextBtn.innerHTML = '<i class="fas fa-flag-checkered"></i> Завершить';
    } else {
        nextBtn.innerHTML = 'Далее <i class="fas fa-arrow-right"></i>';
    }
}

function nextQuestion() {
    if (currentQuestion < quizData.length - 1) {
        currentQuestion++;
        renderQuestion();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
        showResults();
    }
}

function previousQuestion() {
    if (currentQuestion > 0) {
        currentQuestion--;
        renderQuestion();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}

function showResults() {
    document.getElementById('quizScreen').style.display = 'none';
    document.getElementById('resultsScreen').style.display = 'block';

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
    document.getElementById('scorePercent').textContent = `${percentage}%`;

    let message = '';
    if (percentage === 100) {
        message = 'Отлично! Вы отлично знаете материал!';
    } else if (percentage >= 80) {
        message = 'Хорошо! Вы хорошо освоили тему.';
    } else if (percentage >= 60) {
        message = 'Неплохо! Рекомендуем повторить некоторые темы.';
    } else {
        message = 'Рекомендуем тщательнее изучить материал.';
    }

    document.getElementById('resultMessage').textContent = message;
}

function showDetailedResults() {
    const container = document.getElementById('detailedResults');
    container.style.display = 'block';

    let html = '<h3 style="color: #2c3e50; margin-bottom: 20px; text-align: center;"><i class="fas fa-file-alt"></i> Подробные результаты</h3>';

    for (let qIdx = 0; qIdx < quizData.length; qIdx++) {
        const question = quizData[qIdx];
        const userAns = userAnswers[qIdx] || [];

        const correctAnswers = question.answers
            .filter(ans => ans.correct)
            .map(ans => ans.text);

        const isCorrect = JSON.stringify(userAns.sort()) === JSON.stringify(correctAnswers.sort());

        html += `
            <div class="result-item ${isCorrect ? 'correct' : 'incorrect'}">
                <div class="result-question">
                    <strong>Вопрос ${qIdx + 1}:</strong> ${question.question}
                </div>
                <div style="margin-top: 10px;">
                    <strong>Ваши ответы:</strong>
                    <div class="result-answers">
                        ${userAns.length > 0 ?
            userAns.map(ans => `
                                <div class="user-answer">
                                    ${ans} ${correctAnswers.includes(ans) ? '✓' : '✗'}
                                </div>
                            `).join('') :
            '<div style="color: #e74c3c; font-style: italic;">Нет ответа</div>'
        }
                    </div>
                </div>
                <div style="margin-top: 10px;">
                    <strong>Правильные ответы:</strong>
                    <div class="result-answers">
                        ${correctAnswers.map(ans => `
                            <div class="correct-answer">
                                ${ans}
                            </div>
                        `).join('')}
                    </div>
                </div>
                <div style="margin-top: 15px; padding-top: 10px; border-top: 1px solid #eee; color: ${isCorrect ? '#27ae60' : '#e74c3c'}; font-weight: 600;">
                    ${isCorrect ? '✓ Правильно' : '✗ Неправильно'}
                </div>
            </div>
        `;
    }

    container.innerHTML = html;
    container.scrollIntoView({ behavior: 'smooth' });
}

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    detectDevice();
    updateTotalQuestions();

    // Переопределяем при изменении размера окна
    window.addEventListener('resize', function() {
        const wasMobile = isMobile;
        detectDevice();
        if (wasMobile !== isMobile && document.getElementById('quizScreen').style.display !== 'none') {
            // Если режим изменился во время прохождения квиза, перерисовываем вопрос
            renderQuestion();
        }
    });
});