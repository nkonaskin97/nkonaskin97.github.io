<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Тест: Преступления и правонарушения</title>
    <style>
        * {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }

        body {
            background: linear-gradient(135deg, #1a237e 0%, #283593 50%, #3949ab 100%);
            color: #333;
            min-height: 100vh;
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 20px;
        }

        .quiz-container {
            background: white;
            border-radius: 20px;
            box-shadow: 0 15px 35px rgba(0, 0, 0, 0.3);
            width: 100%;
            max-width: 900px;
            min-height: 600px;
            overflow: hidden;
            position: relative;
        }

        /* Экран начала */
        .screen {
            padding: 40px;
            height: 100%;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            text-align: center;
            transition: opacity 0.3s ease;
        }

        .screen.active {
            display: flex;
        }

        .screen:not(.active) {
            display: none;
        }

        .quiz-title {
            font-size: 2.8rem;
            color: #2c3e50;
            margin-bottom: 15px;
            background: linear-gradient(90deg, #1a237e, #3949ab);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            font-weight: 700;
        }

        .quiz-description {
            font-size: 1.2rem;
            color: #555;
            margin-bottom: 30px;
            max-width: 600px;
            line-height: 1.6;
        }

        .start-btn {
            background: linear-gradient(135deg, #1a237e 0%, #3949ab 100%);
            color: white;
            border: none;
            padding: 18px 50px;
            font-size: 1.3rem;
            border-radius: 50px;
            cursor: pointer;
            transition: all 0.3s ease;
            font-weight: 600;
            letter-spacing: 1px;
            margin-top: 20px;
            box-shadow: 0 8px 20px rgba(26, 35, 126, 0.3);
        }

        .start-btn:hover {
            transform: translateY(-3px);
            box-shadow: 0 12px 25px rgba(26, 35, 126, 0.4);
            background: linear-gradient(135deg, #3949ab 0%, #1a237e 100%);
        }

        /* Прогресс бар */
        .progress-container {
            background: #f5f5f5;
            height: 8px;
            border-radius: 4px;
            margin: 20px 40px 0;
            overflow: hidden;
        }

        .progress-bar {
            height: 100%;
            background: linear-gradient(90deg, #1a237e, #3949ab);
            width: 0%;
            transition: width 0.5s ease;
            border-radius: 4px;
        }

        /* Вопросы */
        .question-block {
            padding: 30px 40px;
        }

        .question-title {
            font-size: 1.5rem;
            font-weight: 600;
            color: #2c3e50;
            margin-bottom: 30px;
            line-height: 1.4;
            background: #f8f9fa;
            padding: 20px;
            border-radius: 12px;
            border-left: 5px solid #3949ab;
        }

        .question-number {
            display: block;
            font-size: 1rem;
            color: #3949ab;
            margin-bottom: 8px;
            font-weight: 500;
        }

        .options-section {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 30px;
            margin-top: 20px;
        }

        @media (max-width: 768px) {
            .options-section {
                grid-template-columns: 1fr;
            }
        }

        .available-answers, .drop-zone {
            background: #f8f9fa;
            border-radius: 12px;
            padding: 20px;
            height: 400px;
            display: flex;
            flex-direction: column;
            border: 2px dashed #ddd;
        }

        .answers-label, .drop-zone-label {
            font-size: 1rem;
            color: #555;
            margin-bottom: 15px;
            font-weight: 600;
            padding-bottom: 10px;
            border-bottom: 2px solid #eee;
        }

        /* Доступные ответы */
        #availableAnswers {
            flex: 1;
            overflow-y: auto;
            padding-right: 10px;
        }

        .answer-option {
            background: white;
            border: 2px solid #e0e0e0;
            border-radius: 8px;
            padding: 15px;
            margin-bottom: 12px;
            cursor: move;
            transition: all 0.3s ease;
            font-size: 1rem;
            color: #333;
            user-select: none;
        }

        .answer-option:hover {
            transform: translateX(5px);
            border-color: #3949ab;
            box-shadow: 0 5px 15px rgba(57, 73, 171, 0.1);
        }

        .answer-option.placed {
            opacity: 0.4;
            cursor: not-allowed;
            transform: none;
        }

        .answer-option.dragging {
            opacity: 0.7;
            transform: scale(1.02);
            box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);
        }

        /* Зона для ответов */
        #placedAnswers {
            flex: 1;
            overflow-y: auto;
            padding-right: 10px;
            min-height: 100px;
        }

        .drop-zone.drag-over {
            border-color: #3949ab;
            background: rgba(57, 73, 171, 0.05);
        }

        .empty-zone-text {
            display: flex;
            align-items: center;
            justify-content: center;
            height: 100%;
            color: #999;
            font-style: italic;
            text-align: center;
            padding: 20px;
            font-size: 1.1rem;
        }

        .placed-answer {
            background: white;
            border: 2px solid #4caf50;
            border-radius: 8px;
            padding: 15px;
            margin-bottom: 12px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            animation: fadeIn 0.3s ease;
            box-shadow: 0 4px 8px rgba(76, 175, 80, 0.1);
        }

        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
        }

        .placed-answer span {
            flex: 1;
            color: #2e7d32;
            font-weight: 500;
        }

        .remove-btn {
            background: #ff6b6b;
            color: white;
            border: none;
            padding: 8px 16px;
            border-radius: 6px;
            cursor: pointer;
            font-size: 0.9rem;
            transition: background 0.3s;
            margin-left: 10px;
        }

        .remove-btn:hover {
            background: #ff5252;
        }

        /* Кнопки навигации */
        .button-group {
            display: flex;
            justify-content: space-between;
            padding: 25px 40px;
            background: #f8f9fa;
            border-top: 1px solid #eee;
        }

        .nav-btn {
            padding: 14px 35px;
            border: none;
            border-radius: 10px;
            font-size: 1.1rem;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s ease;
            display: flex;
            align-items: center;
            justify-content: center;
            min-width: 150px;
        }

        .btn-prev {
            background: #757575;
            color: white;
        }

        .btn-prev:hover:not(:disabled) {
            background: #616161;
            transform: translateX(-3px);
        }

        .btn-next {
            background: linear-gradient(135deg, #1a237e 0%, #3949ab 100%);
            color: white;
        }

        .btn-next:hover:not(:disabled) {
            background: linear-gradient(135deg, #3949ab 0%, #1a237e 100%);
            transform: translateX(3px);
        }

        .btn-check {
            background: linear-gradient(135deg, #2e7d32 0%, #4caf50 100%);
            color: white;
            margin: 0 15px;
        }

        .btn-check:hover:not(:disabled) {
            background: linear-gradient(135deg, #4caf50 0%, #2e7d32 100%);
            transform: translateY(-3px);
        }

        .nav-btn:disabled {
            opacity: 0.5;
            cursor: not-allowed;
            transform: none !important;
        }

        /* Обратная связь */
        #feedbackArea {
            margin: 0 40px;
            padding: 20px;
            border-radius: 12px;
            animation: slideIn 0.5s ease;
        }

        @keyframes slideIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
        }

        .feedback-message {
            padding: 20px;
            border-radius: 10px;
            font-size: 1.1rem;
            line-height: 1.5;
        }

        .feedback-correct {
            background: rgba(76, 175, 80, 0.1);
            border-left: 5px solid #4caf50;
            color: #2e7d32;
        }

        .feedback-incorrect {
            background: rgba(244, 67, 54, 0.1);
            border-left: 5px solid #f44336;
            color: #c62828;
        }

        .correct-answers-list {
            margin-top: 15px;
            padding-left: 20px;
        }

        .correct-answers-list div {
            margin: 8px 0;
            color: #2e7d32;
            font-weight: 500;
        }

        /* Результаты */
        .results-container {
            text-align: center;
            padding: 50px 40px;
        }

        .results-title {
            font-size: 2.5rem;
            color: #2c3e50;
            margin-bottom: 30px;
        }

        .score-circle {
            width: 200px;
            height: 200px;
            border-radius: 50%;
            background: linear-gradient(135deg, #1a237e 0%, #3949ab 100%);
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            margin: 30px auto;
            color: white;
            box-shadow: 0 15px 30px rgba(26, 35, 126, 0.3);
        }

        .score-number {
            font-size: 4rem;
            font-weight: 700;
            line-height: 1;
        }

        .score-label {
            font-size: 1.2rem;
            opacity: 0.9;
        }

        .result-message {
            font-size: 1.4rem;
            color: #555;
            margin: 30px 0;
            line-height: 1.6;
            max-width: 600px;
            margin-left: auto;
            margin-right: auto;
        }

        .restart-btn {
            background: linear-gradient(135deg, #1a237e 0%, #3949ab 100%);
            color: white;
            border: none;
            padding: 18px 50px;
            font-size: 1.3rem;
            border-radius: 50px;
            cursor: pointer;
            transition: all 0.3s ease;
            font-weight: 600;
            letter-spacing: 1px;
            margin-top: 20px;
            box-shadow: 0 8px 20px rgba(26, 35, 126, 0.3);
        }

        .restart-btn:hover {
            transform: translateY(-3px);
            box-shadow: 0 12px 25px rgba(26, 35, 126, 0.4);
            background: linear-gradient(135deg, #3949ab 0%, #1a237e 100%);
        }

        /* Мобильная версия */
        @media (max-width: 768px) {
            body {
                padding: 10px;
            }
            
            .quiz-container {
                min-height: 500px;
            }
            
            .screen, .question-block, .button-group {
                padding: 20px;
            }
            
            .quiz-title {
                font-size: 2rem;
            }
            
            .question-title {
                font-size: 1.3rem;
            }
            
            .available-answers, .drop-zone {
                height: 300px;
            }
            
            .nav-btn {
                min-width: 120px;
                padding: 12px 25px;
                font-size: 1rem;
            }
            
            .score-circle {
                width: 150px;
                height: 150px;
            }
            
            .score-number {
                font-size: 3rem;
            }
        }

        /* Полоса прокрутки */
        ::-webkit-scrollbar {
            width: 8px;
        }

        ::-webkit-scrollbar-track {
            background: #f1f1f1;
            border-radius: 10px;
        }

        ::-webkit-scrollbar-thumb {
            background: #c1c1c1;
            border-radius: 10px;
        }

        ::-webkit-scrollbar-thumb:hover {
            background: #a8a8a8;
        }
    </style>
</head>
<body>
    <div class="quiz-container">
        <!-- Экран начала -->
        <div class="screen active" id="startScreen">
            <h1 class="quiz-title">Тест: Преступления и правонарушения</h1>
            <p class="quiz-description">
                Проверьте свои знания по теме "Преступления и правонарушения". 
                В каждом вопросе выберите правильные ответы, перетаскивая их в правую колонку.
                Внимательно читайте вопросы - в некоторых может быть несколько правильных ответов.
            </p>
            <button class="start-btn" onclick="startQuiz()">Начать тест</button>
        </div>

        <!-- Экран теста -->
        <div id="quizScreen" style="display: none;">
            <!-- Прогресс бар -->
            <div class="progress-container">
                <div class="progress-bar" id="progressFill"></div>
            </div>

            <!-- Вопросы -->
            <div id="quizContent"></div>

            <!-- Обратная связь -->
            <div id="feedbackArea"></div>

            <!-- Кнопки навигации -->
            <div class="button-group" id="buttonGroup" style="display: none;">
                <button class="nav-btn btn-prev" onclick="previousQuestion()" disabled>
                    ← Назад
                </button>
                <button class="nav-btn btn-check" id="checkBtn" onclick="checkAnswer()" disabled>
                    Проверить ответ
                </button>
                <button class="nav-btn btn-next" id="nextBtn" onclick="nextQuestion()">
                    Следующий →
                </button>
            </div>
        </div>

        <!-- Экран результатов -->
        <div class="screen" id="resultsScreen">
            <div class="results-container">
                <h2 class="results-title">Результаты теста</h2>
                <div class="score-circle">
                    <div class="score-number" id="scoreDisplay">0/10</div>
                    <div class="score-label">правильно</div>
                </div>
                <p class="result-message" id="resultMessage"></p>
                <button class="restart-btn" onclick="restartQuiz()">Пройти тест снова</button>
            </div>
        </div>
    </div>

    <script>
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

        function startQuiz() {
            document.getElementById('startScreen').classList.remove('active');
            document.getElementById('quizScreen').style.display = 'block';
            document.getElementById('buttonGroup').style.display = 'flex';
            renderQuestion();
        }

        function renderQuestion() {
            const quiz = quizData[currentQuestion];
            const container = document.getElementById('quizContent');

            container.innerHTML = '';

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

            updateButtonStates();
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

            updateButtonStates();
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

            // Ключевое исправление: проверяем наличие ответов у текущего вопроса
            const hasAnswers = userAnswers[currentQuestion] && userAnswers[currentQuestion].length > 0;
            checkBtn.disabled = !hasAnswers;
        }

        function checkAnswer() {
            const question = quizData[currentQuestion];
            const userAns = userAnswers[currentQuestion] || [];

            const correctAnswers = question.answers
                .filter(ans => ans.correct)
                .map(ans => ans.text);

            const isCorrect = JSON.stringify(userAns.sort()) === JSON.stringify(correctAnswers.sort());

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
                document.getElementById('feedbackArea').innerHTML = '';
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

        function restartQuiz() {
            currentQuestion = 0;
            userAnswers = {};
            
            document.getElementById('resultsScreen').classList.remove('active');
            document.getElementById('quizContent').style.display = 'block';
            document.getElementById('buttonGroup').style.display = 'flex';
            document.getElementById('feedbackArea').innerHTML = '';
            
            renderQuestion();
            window.scrollTo(0, 0);
        }

        // Инициализация
        window.addEventListener('DOMContentLoaded', function() {
            // Все готово
        });
    </script>
</body>
</html>
