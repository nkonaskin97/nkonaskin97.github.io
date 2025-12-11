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
    // ... остальные вопросы (скопируй из своего файла) ...
];

function updateButtonStates() {
    console.log("updateButtonStates вызвана!"); // Для отладки
    
    const prevBtn = document.querySelector('.btn-prev');
    const nextBtn = document.getElementById('nextBtn');
    const checkBtn = document.getElementById('checkBtn');
    
    // Кнопка "Назад" активна, если не первый вопрос
    prevBtn.disabled = currentQuestion === 0;
    
    // Текст кнопки "Далее"
    if (currentQuestion === quizData.length - 1) {
        nextBtn.textContent = 'Завершить';
    } else {
        nextBtn.textContent = 'Следующий';
    }
    
    // ВАЖНО: кнопка "Проверить ответ" активна только если есть выбранные ответы
    const hasAnswers = userAnswers[currentQuestion] && userAnswers[currentQuestion].length > 0;
    console.log("Есть выбранные ответы?", hasAnswers);
    
    checkBtn.disabled = !hasAnswers;
    
    // Визуальная обратная связь
    if (checkBtn.disabled) {
        checkBtn.style.opacity = '0.6';
        checkBtn.style.cursor = 'not-allowed';
        checkBtn.title = 'Сначала выберите ответы';
    } else {
        checkBtn.style.opacity = '1';
        checkBtn.style.cursor = 'pointer';
        checkBtn.title = 'Проверить выбранные ответы';
    }
}

// Глобальные переменные
let currentQuestion = 0;
let userAnswers = {};
let draggedElement = null;
let isMobile = false;

// Инициализация при загрузке
document.addEventListener('DOMContentLoaded', function() {
    detectDevice();
    setupEventListeners();
    loadBackgroundImages();
});

// Определение устройства
function detectDevice() {
    isMobile = window.innerWidth <= 768 || 
               /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    console.log('Устройство:', isMobile ? 'Мобильное' : 'ПК');
}

function checkAnswer() {
    console.log("checkAnswer вызвана!"); // Для отладки
    
    // Получаем текущий вопрос
    const question = quizData[currentQuestion];
    
    // Получаем выбранные пользователем ответы для текущего вопроса
    const userSelected = userAnswers[currentQuestion] || [];
    console.log("Выбранные ответы:", userSelected);
    
    // Получаем правильные ответы для этого вопроса
    const correctAnswers = question.answers
        .filter(ans => ans.correct)
        .map(ans => ans.text);
    console.log("Правильные ответы:", correctAnswers);
    
    // Сортируем массивы для корректного сравнения
    const sortedUserAnswers = [...userSelected].sort();
    const sortedCorrectAnswers = [...correctAnswers].sort();
    
    // Сравниваем
    const isCorrect = JSON.stringify(sortedUserAnswers) === JSON.stringify(sortedCorrectAnswers);
    console.log("Результат проверки:", isCorrect ? "ПРАВИЛЬНО" : "НЕПРАВИЛЬНО");
    
    // Очищаем предыдущий фидбек
    const feedbackArea = document.getElementById('feedbackArea');
    feedbackArea.innerHTML = '';
    
    // Создаем сообщение
    const feedback = document.createElement('div');
    feedback.className = `feedback-message show ${isCorrect ? 'feedback-correct' : 'feedback-incorrect'}`;
    
    if (isCorrect) {
        feedback.innerHTML = '<strong>✓ Правильно!</strong> Вы выбрали все верные ответы.';
    } else {
        let html = '<strong>✗ Неправильно.</strong> Правильные ответы:<div class="correct-answers-list">';
        correctAnswers.forEach(ans => {
            html += `<div>• ${ans}</div>`;
        });
        html += '</div>';
        feedback.innerHTML = html;
    }
    
    // Добавляем сообщение на страницу
    feedbackArea.appendChild(feedback);
    
    // Прокручиваем к сообщению
    setTimeout(() => {
        feedback.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }, 100);
    
    // Делаем кнопку "Следующий" активной и фокусируемся на ней
    const nextBtn = document.getElementById('nextBtn');
    if (nextBtn) {
        nextBtn.focus();
    }
}

// Настройка обработчиков событий
function setupEventListeners() {
    document.getElementById('startBtn').addEventListener('click', startQuiz);
    document.getElementById('prevBtn').addEventListener('click', previousQuestion);
    document.getElementById('nextBtn').addEventListener('click', nextQuestion);
    document.getElementById('checkBtn').addEventListener('click', checkAnswer);
    document.getElementById('restartBtn').addEventListener('click', () => location.reload());
    
    // Обработка изменения размера окна
    window.addEventListener('resize', detectDevice);
}

// Загрузка фоновых изображений
function loadBackgroundImages() {
    const images = [
        'bremenskiejpg', 'dyadya-stepajpg', 'ernest.jpg',
        'maigretjpg', 'missisjpg', 'poirotjpg',
        'proninjpg', 'solominjpg', 'watsonjpg'
    ];
    
    const container = document.getElementById('backgroundImages');
    const positions = [
        { top: '5%', left: '2%', width: '220px', height: '165px', rotation: -3 },
        { top: '15%', right: '2%', width: '180px', height: '135px', rotation: 2 },
        { top: '40%', left: '3%', width: '250px', height: '188px', rotation: -4 },
        { bottom: '20%', right: '1%', width: '200px', height: '150px', rotation: 3 },
        { top: '70%', left: '4%', width: '170px', height: '128px', rotation: -2 },
        { bottom: '10%', right: '4%', width: '230px', height: '173px', rotation: 4 },
        { top: '25%', right: '15%', width: '190px', height: '143px', rotation: -1 },
        { top: '60%', right: '12%', width: '210px', height: '158px', rotation: 5 },
        { bottom: '5%', left: '8%', width: '240px', height: '180px', rotation: -5 }
    ];
    
    images.forEach((img, index) => {
        const imgElement = document.createElement('img');
        imgElement.src = img;
        imgElement.className = 'character-bg';
        imgElement.style.cssText = `
            top: ${positions[index].top};
            ${positions[index].left ? `left: ${positions[index].left};` : ''}
            ${positions[index].right ? `right: ${positions[index].right};` : ''}
            width: ${positions[index].width};
            height: ${positions[index].height};
            transform: rotate(${positions[index].rotation}deg);
            animation-delay: ${index * 3}s;
        `;
        container.appendChild(imgElement);
    });
}

// Запуск квиза
function startQuiz() {
    document.getElementById('startScreen').classList.remove('active');
    document.getElementById('quizScreen').style.display = 'block';
    renderQuestion();
    document.getElementById('buttonGroup').style.display = 'flex';
}

// Рендер вопроса
function renderQuestion() {
    const quiz = quizData[currentQuestion];
    const container = document.getElementById('quizContent');
    
    container.innerHTML = '';

    const answers = isMobile ? quiz.answers : [...quiz.answers].sort(() => Math.random() - 0.5);

    const questionHTML = `
        <div class="question-block active">
            <div class="question-title">
                <span class="question-number">Вопрос ${currentQuestion + 1}/${quizData.length}</span>
                ${quiz.question}
            </div>
            
            <div class="options-section">
                <div>
                    <div class="available-answers">
                        <div class="answers-label">${isMobile ? 'Нажмите на ответ' : 'Доступные ответы'}</div>
                        <div id="availableAnswers">
                            ${answers.map((ans, idx) => `
                                <div class="answer-option" 
                                     data-answer="${ans.text.replace(/"/g, '&quot;')}"
                                     data-correct="${ans.correct}"
                                     onclick="selectAnswer('${ans.text.replace(/'/g, "\\'")}')"
                                     ${!isMobile ? 'draggable="true" ondragstart="dragStart(event)"' : ''}>
                                    ${ans.text}
                                </div>
                            `).join('')}
                        </div>
                    </div>
                </div>
                
                <div>
                    <div class="drop-zone" id="dropZone"
                         ${!isMobile ? 'ondragover="dragOver(event)" ondragleave="dragLeave(event)" ondrop="drop(event)"' : ''}>
                        <div class="drop-zone-label">${isMobile ? 'Выбранные ответы' : 'Ваши ответы'}</div>
                        <div id="placedAnswers">
                            <div class="empty-zone-text">${isMobile ? 'Нажмите на ответы выше' : 'Перетащите ответы сюда...'}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;

    container.innerHTML = questionHTML;

    // Восстановление выбранных ответов
    if (userAnswers[currentQuestion]) {
        userAnswers[currentQuestion].forEach(ans => {
            restoreAnswer(ans);
        });
    }

    updateProgress();
    updateButtonStates();
}

// Выбор ответа (универсальная функция для всех устройств)
function selectAnswer(answerText) {
    const original = document.querySelector(`[data-answer="${answerText.replace(/"/g, '\\"')}"]`);
    const placed = document.querySelector(`#placedAnswers [data-answer="${answerText.replace(/"/g, '\\"')}"]`);
    
    if (placed) {
        // Удаляем если уже выбран
        removeAnswer(answerText);
    } else {
        // Добавляем если не выбран
        addAnswer(answerText, original);
    }
}

// Добавление ответа
function addAnswer(answerText, element) {
    if (!element) return;
    
    const placedAnswers = document.getElementById('placedAnswers');
    
    // Проверка на дубликат
    if (placedAnswers.querySelector(`[data-answer="${answerText.replace(/"/g, '\\"')}"]`)) {
        return;
    }

    // Очистка пустого текста
    if (placedAnswers.querySelector('.empty-zone-text')) {
        placedAnswers.innerHTML = '';
    }

    const placedDiv = document.createElement('div');
    placedDiv.className = 'placed-answer';
    placedDiv.setAttribute('data-answer', answerText);
    
    placedDiv.innerHTML = `
        <span>${answerText}</span>
        <button class="remove-btn" onclick="removeAnswer('${answerText.replace(/'/g, "\\'")}')">✕</button>
    `;

    placedAnswers.appendChild(placedDiv);

    // Визуальная обратная связь
    if (isMobile) {
        element.classList.add('selected');
    } else {
        element.classList.add('placed');
    }

    // Сохранение ответа
    if (!userAnswers[currentQuestion]) {
        userAnswers[currentQuestion] = [];
    }
    if (!userAnswers[currentQuestion].includes(answerText)) {
        userAnswers[currentQuestion].push(answerText);
    }
    
    updateButtonStates();
}

// Восстановление ответа при рендере
function restoreAnswer(answerText) {
    const original = document.querySelector(`[data-answer="${answerText.replace(/"/g, '\\"')}"]`);
    if (!original) return;
    
    const placedAnswers = document.getElementById('placedAnswers');
    
    if (placedAnswers.querySelector('.empty-zone-text')) {
        placedAnswers.innerHTML = '';
    }

    const placedDiv = document.createElement('div');
    placedDiv.className = 'placed-answer';
    placedDiv.setAttribute('data-answer', answerText);
    placedDiv.innerHTML = `
        <span>${answerText}</span>
        <button class="remove-btn" onclick="removeAnswer('${answerText.replace(/'/g, "\\'")}')">✕</button>
    `;

    placedAnswers.appendChild(placedDiv);

    if (isMobile) {
        original.classList.add('selected');
    } else {
        original.classList.add('placed');
    }
}

// Удаление ответа
function removeAnswer(answerText) {
    const placed = document.querySelector(`#placedAnswers [data-answer="${answerText.replace(/"/g, '\\"')}"]`);
    if (placed) {
        placed.remove();
    }

    const original = document.querySelector(`[data-answer="${answerText.replace(/"/g, '\\"')}"]`);
    if (original) {
        if (isMobile) {
            original.classList.remove('selected');
        } else {
            original.classList.remove('placed');
        }
    }

    userAnswers[currentQuestion] = userAnswers[currentQuestion].filter(a => a !== answerText);

    // Если ответов нет, показываем пустое состояние
    if (document.getElementById('placedAnswers').children.length === 0) {
        document.getElementById('placedAnswers').innerHTML = 
            `<div class="empty-zone-text">${isMobile ? 'Нажмите на ответы выше' : 'Перетащите ответы сюда...'}</div>`;
    }
    
    updateButtonStates();
}

// Функции для drag & drop (только для ПК)
function dragStart(e) {
    if (isMobile) return;
    draggedElement = e.target;
    e.target.classList.add('dragging');
    e.dataTransfer.effectAllowed = 'move';
}

function dragOver(e) {
    if (isMobile) return;
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    document.getElementById('dropZone').classList.add('drag-over');
}

function dragLeave(e) {
    if (isMobile) return;
    document.getElementById('dropZone').classList.remove('drag-over');
}

function drop(e) {
    if (isMobile) return;
    e.preventDefault();
    document.getElementById('dropZone').classList.remove('drag-over');
    
    if (draggedElement) {
        const answer = draggedElement.getAttribute('data-answer');
        selectAnswer(answer);
    }
}

// Обновление прогресса
function updateProgress() {
    const progress = ((currentQuestion + 1) / quizData.length) * 100;
    document.getElementById('progressFill').style.width = progress + '%';
}

// Обновление состояния кнопок
function updateButtonStates() {
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const checkBtn = document.getElementById('checkBtn');

    prevBtn.disabled = currentQuestion === 0;
    
    if (currentQuestion === quizData.length - 1) {
        nextBtn.textContent = 'Завершить';
    } else {
        nextBtn.textContent = 'Следующий';
    }

    // ВАЖНО: проверяем наличие ответов
    const hasAnswers = userAnswers[currentQuestion] && userAnswers[currentQuestion].length > 0;
    checkBtn.disabled = !hasAnswers;
    
    // Визуальная обратная связь
    checkBtn.classList.toggle('active', hasAnswers);
}

// Проверка ответа
function checkAnswer() {
    const question = quizData[currentQuestion];
    const userAns = userAnswers[currentQuestion] || [];

    const correctAnswers = question.answers
        .filter(ans => ans.correct)
        .map(ans => ans.text);

    // Сортировка для корректного сравнения
    const sortedUserAnswers = [...userAns].sort();
    const sortedCorrectAnswers = [...correctAnswers].sort();
    
    const isCorrect = JSON.stringify(sortedUserAnswers) === JSON.stringify(sortedCorrectAnswers);

    const feedbackArea = document.getElementById('feedbackArea');
    feedbackArea.innerHTML = '';

    const feedback = document.createElement('div');
    feedback.className = `feedback-message ${isCorrect ? 'feedback-correct' : 'feedback-incorrect'}`;

    if (isCorrect) {
        feedback.innerHTML = '<strong>✓ Правильно!</strong> Вы выбрали все верные ответы.';
    } else {
        let html = '<strong>✗ Неправильно.</strong> Правильные ответы:<div class="correct-answers-list">';
        correctAnswers.forEach(ans => {
            html += `<div>• ${ans}</div>`;
        });
        html += '</div>';
        feedback.innerHTML = html;
    }

    feedbackArea.appendChild(feedback);
    
    // Прокрутка к результату
    setTimeout(() => {
        feedback.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }, 100);
    
    // Блокируем кнопку проверки после использования
    document.getElementById('checkBtn').disabled = true;
}

// Навигация
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
        document.getElementById('feedbackArea').innerHTML = '';
        renderQuestion();
        window.scrollTo(0, 0);
    }
}

// Показать результаты
function showResults() {
    let correctCount = 0;

    for (let qIdx = 0; qIdx < quizData.length; qIdx++) {
        const question = quizData[qIdx];
        const userAns = userAnswers[qIdx] || [];

        const correctAnswers = question.answers
            .filter(ans => ans.correct)
            .map(ans => ans.text);

        const sortedUserAnswers = [...userAns].sort();
        const sortedCorrectAnswers = [...correctAnswers].sort();

        if (JSON.stringify(sortedUserAnswers) === JSON.stringify(sortedCorrectAnswers)) {
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
        message = 'Неплохо! Рекомендуем повторить материал.';
    } else {
        message = 'Рекомендуем тщательнее изучить тему.';
    }

    document.getElementById('resultMessage').textContent = `${message} (${percentage}%)`;

    document.getElementById('quizContent').style.display = 'none';
    document.getElementById('buttonGroup').style.display = 'none';
    document.getElementById('resultsScreen').classList.add('active');
    window.scrollTo(0, 0);
}

// Экспорт функций в глобальную область видимости
window.selectAnswer = selectAnswer;
window.removeAnswer = removeAnswer;
window.dragStart = dragStart;
window.dragOver = dragOver;
window.dragLeave = dragLeave;
window.drop = drop;


