const router = require('express').Router()

const authController = require('./controllers/authController.js')
const quizController = require('./controllers/quizController.js')
const questionController = require('./controllers/questionController.js')

const authenticate = require('./middlewares/authenticate.js')

router.post('/auth/register', authController.create)
router.post('/auth/login', authController.login)
router.get('/auth/me', authenticate, authController.currentUser)

router.post('/quiz', authenticate, quizController.create)
router.get('/quiz/:_id', authenticate, quizController.findQuiz)
router.get('/my-quiz', authenticate, quizController.findMyQuiz)
router.post('/quiz/answer', authenticate, quizController.answer)

router.post('/questions', authenticate, questionController.create)

module.exports = router;
