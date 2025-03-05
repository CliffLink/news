document.addEventListener('DOMContentLoaded', () => {
    const articlesContainer = document.getElementById('articles');
    const searchInput = document.getElementById('searchInput');
    const searchButton = document.getElementById('searchButton');
    const tabButtons = document.querySelectorAll('.tab-button');

    // Пример статей с изображениями и категориями
    const articles = [
        {
            id: 1,
            title: 'Открытие портала в параллельную вселенную',
            content: 'Ученые из Института квантовой физики объявили о потрясающем достижении: им удалось успешно открыть стабильный портал в параллельную вселенную. Этот прорыв стал возможен благодаря многолетним исследованиям и использованию передовых технологий, таких как квантовые компьютеры и ультрасовременные лазеры. Первые исследования показывают, что в этой параллельной вселенной люди живут под водой и общаются с помощью телепатии. Это открывает перед учеными новые горизонты для изучения альтернативных форм жизни и коммуникации. В будущем планируется отправить исследовательские экспедиции для более детального изучения этой удивительной вселенной и ее обитателей.',
            image: 'https://www.ptoday.ru/uploads/posts/2025-02/aa95ab10e5_oune75ot.webp',
            category: 'science'
        },
        {
            id: 2,
            title: 'Новый вид динозавров обнаружен в Антарктиде',
            content: 'Палеонтологи совершили сенсационное открытие: в вечной мерзлоте Антарктиды были обнаружены останки нового вида динозавров. Этот динозавр, названный "Фростозавр", имел уникальную способность выживать в экстремальных холодных условиях. Находка позволяет ученым лучше понять, как динозавры адаптировались к различным климатическим условиям и какие механизмы помогали им выживать в суровых условиях. Исследования показывают, что "Фростозавр" имел толстую шерсть и специальные железы, вырабатывающие антифриз, что позволяло ему сохранять тепло в холодном климате. Это открытие может помочь в разработке новых технологий для выживания в экстремальных условиях.',
            image: 'https://i.simpalsmedia.com/point.md/news/900x900/53da5ae5f376cb3ed6b373e3e2ee927f.jpg',
            category: 'science'
        },
        {
            id: 3,
            title: 'Создан первый в мире летающий автомобиль',
            content: 'Компания "Скайкар" представила миру первый летающий автомобиль, который может перевозить до четырех пассажиров. Этот инновационный транспорт оснащен электрическими двигателями и может развивать скорость до 200 км/ч в воздухе. Летающий автомобиль открывает новые возможности для транспортировки и может значительно сократить время в пути, избегая пробок на дорогах. В будущем планируется создать сеть заправочных станций для таких автомобилей, а также разработать систему управления воздушным движением для обеспечения безопасности полетов.',
            image: 'https://www.atomic-energy.ru/files/images/2022/03/fd68043234fb4e9dbc72535ee8a2bdb6.jpg',
            category: 'technology'
        },
        {
            id: 4,
            title: 'Найден источник вечной молодости',
            content: 'Исследователи из Университета вечной жизни объявили о находке источника вечной молодости в джунглях Амазонии. Первые тесты показали, что вода из этого источника способна замедлять процесс старения на 90%. Это открытие может революционизировать медицину и косметологию, предлагая людям возможность сохранять молодость и здоровье на протяжении многих лет. Ученые планируют провести дополнительные исследования, чтобы понять механизм действия этой воды и разработать на её основе новые лекарства и косметические средства.',
            image: 'https://sun9-13.userapi.com/s/v1/ig2/kWm4k71kGQzELFfj6JUjvFNdPpOsPxI5NRtqgeN_g_UdXj68-y23JInSP0ucyIg4IXL6CbKxZDQjx7J14h1AzY3_.jpg?quality=96&as=32x18,48x28,72x42,108x62,160x92,240x139,360x208,480x277,540x312,640x369,720x416,1080x624,1280x739&from=bu&u=0MVagcvV70hX8SkGOTy8E_gaXC-k7Y4Zdh7oykqRgmk&cs=807x466',
            category: 'world'
        }
    ];

    // Загрузка статей
    const loadArticles = (category = 'all', query = '') => {
        const filteredArticles = articles.filter(article => {
            const matchesCategory = category === 'all' || article.category === category;
            const matchesQuery = article.title.toLowerCase().includes(query.toLowerCase()) || article.content.toLowerCase().includes(query.toLowerCase());
            return matchesCategory && matchesQuery;
        });

        articlesContainer.innerHTML = filteredArticles.map(article => `
            <div class="article" data-id="${article.id}">
                <h2>${article.title}</h2>
                <img src="${article.image}" alt="${article.title}">
                <p>${article.content}</p>
                <form class="comment-form">
                    <label for="name-${article.id}">Имя:</label>
                    <input type="text" id="name-${article.id}" name="name" required>
                    <label for="comment-${article.id}">Комментарий:</label>
                    <textarea id="comment-${article.id}" name="comment" required></textarea>
                    <button type="submit">Отправить</button>
                </form>
                <div class="comments" data-id="${article.id}">
                    <h3>Комментарии</h3>
                </div>
            </div>
        `).join('');

        // Загрузка комментариев для каждой статьи
        document.querySelectorAll('.comments').forEach(commentsSection => {
            const articleId = commentsSection.getAttribute('data-id');
            loadComments(articleId, commentsSection);
        });

        // Обработка отправки формы комментариев
        document.querySelectorAll('.comment-form').forEach(form => {
            form.addEventListener('submit', (event) => {
                event.preventDefault();
                const articleId = form.parentElement.getAttribute('data-id');
                const name = form.querySelector('input[name="name"]').value;
                const comment = form.querySelector('textarea[name="comment"]').value;
                saveComment(articleId, name, comment);
                form.reset();
            });
        });
    };

    // Загрузка комментариев из localStorage
    const loadComments = (articleId, commentsSection) => {
        const comments = JSON.parse(localStorage.getItem(`comments-${articleId}`)) || [];
        commentsSection.innerHTML = comments.map(comment => `
            <div class="comment">
                <p><strong>${comment.name}</strong></p>
                <p>${comment.comment}</p>
            </div>
        `).join('');
    };

    // Сохранение комментария в localStorage
    const saveComment = (articleId, name, comment) => {
        const comments = JSON.parse(localStorage.getItem(`comments-${articleId}`)) || [];
        comments.push({ name, comment });
        localStorage.setItem(`comments-${articleId}`, JSON.stringify(comments));
        loadComments(articleId, document.querySelector(`.comments[data-id="${articleId}"]`));
    };

    // Обработка клика по вкладкам
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            tabButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            const category = button.getAttribute('data-category');
            loadArticles(category);
        });
    });

    // Обработка поиска
    searchButton.addEventListener('click', () => {
        const query = searchInput.value;
        loadArticles('all', query);
    });

    // Загрузка статей при загрузке страницы
    loadArticles();

});
