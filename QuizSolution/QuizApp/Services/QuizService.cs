using QuizApp.Exceptions;
using QuizApp.Interfaces;
using QuizApp.Models;
using QuizApp.Models.DTOs;
using QuizApp.Repositories;

namespace QuizApp.Services
{
    public class QuizService : IQuizService
    {
        private readonly IRepository<int, Quiz> _quizRepository;
        private readonly IRepository<int, Questions> _questionRepository;
        private readonly TimerService _timerService;

        public QuizService(IRepository<int, Quiz> quizRepository, IRepository<int, Questions> questionRepository, TimerService timerService)
        {
            _quizRepository = quizRepository;
            _questionRepository = questionRepository;
            _timerService = timerService;
        }
        public Quiz Add(Quiz quiz)
        {
            var result = _quizRepository.Add(quiz);
            return result;
        }


        public List<Quiz> GetQuizs()
        {
            var quizs = _quizRepository.GetAll();
            if (quizs != null)
            {
                return quizs.ToList();
            }
            throw new NoQuizsAvailableException();
        }
        public List<Quiz> GetQuizzesByCategory(string category)
        {
            var quizzes = _quizRepository.GetAll();
            if (quizzes != null)
            {
                return quizzes
                    .Where(quiz => quiz.Category.Equals(category, StringComparison.OrdinalIgnoreCase))
                    .ToList();
            }
            throw new NoQuizsAvailableException();
        }

        public Quiz GetQuizById(int id)
        {
            var res = _quizRepository.GetById(id);
            if (res != null)
            {
                return res;
            }
            throw new NoQuizsAvailableException();
        }
        public async Task<Quiz> GetQuizByIdWithQuestions(int id)
        {
            var quiz = await Task.Run(() => GetQuizById(id));
            if (quiz != null && quiz.Questions != null)
            {
                quiz.Questions = quiz.Questions.OrderBy(q => q.QuestionId).ToList(); // Order by QuestionId
                foreach (var question in quiz.Questions)
                {
                    question.QuestionId = 0; // Reset QuestionId to start from 1
                }
            }
            return quiz;
        }
        public bool DeleteQuizIfNoQuestions(int quizId)
        {
            // Check if there are any questions associated with the quiz
            var questionsCount = _questionRepository.GetAll().Count(q => q.QuizId == quizId);

            if (questionsCount == 0)
            {
                // No questions, safe to delete the quiz
                var deletedQuiz = _quizRepository.Delete(quizId);

                if (deletedQuiz == null)
                {
                    // The specified quiz does not exist
                    throw new NoQuizsAvailableException();
                }

                return true; // Quiz deleted successfully
            }

            return false; // Quiz has questions, cannot delete
        }

        public void UpdateQuiz(Quiz updatedQuiz)
        {
            if (updatedQuiz == null)
            {
                throw new ArgumentNullException(nameof(updatedQuiz), "Updated quiz data is null.");
            }


            ValidateQuizTitle(updatedQuiz.Title);

            // Ensure the quiz with the provided ID exists
            var existingQuiz = _quizRepository.GetById(updatedQuiz.QuizId);

            if (existingQuiz == null)
            {
                throw new InvalidOperationException($"Quiz with ID {updatedQuiz.QuizId} not found.");
            }

            // Update the properties of the existing quiz with the values from the updatedQuiz
            existingQuiz.Title = updatedQuiz.Title;
            existingQuiz.Description = updatedQuiz.Description;
            //existingQuiz.TimeLimit = updatedQuiz.TimeLimit;

            // Update the quiz in the repository
            _quizRepository.Update(existingQuiz);
        }

        private void ValidateQuizTitle(string title)
        {
            // Example: Ensure the quiz title is not empty
            if (string.IsNullOrWhiteSpace(title))
            {
                throw new ArgumentException("Quiz title cannot be empty or whitespace.", nameof(title));
            }


        }

        private void ValidateQuizTimeLimit(double timeLimit)
        {
            // Example: Ensure the time limit is a positive value
            if (timeLimit < 0)
            {
                throw new ArgumentException("Time limit must be a positive value.", nameof(timeLimit));
            }

            // You can add more validation rules for the time limit if needed
        }
       /* public Quiz StartQuiz(int quizId)
        {
            var quiz = _quizRepository.GetById(quizId);

            if (quiz != null)
            {
                // Start the timer for the quiz
                if (quiz.TimeLimit != null)
                {
                    _timerService.TimerElapsed += OnTimerElapsed;
                    _timerService.StartTimer(quizId, quiz.TimeLimit);
                    QuizStateDTO quizState = new QuizStateDTO();
                    // Update quiz status or perform other setup actions
                    quizState.Status = "InProgress";
                    // ... other setup actions
                }
                _quizRepository.Update(quiz);

            }

            return quiz;
        }*/

        private void OnTimerElapsed(int quizId)
        {
            // Handle timer elapsed event, e.g., end the quiz
            EndQuiz(quizId);
        }

        public void EndQuiz(int quizId)
        {
            var quiz = _quizRepository.GetById(quizId);

            if (quiz != null)
            {
                // Stop the timer
                _timerService.StopTimer();
                QuizStateDTO quizState = new QuizStateDTO();
                // Update quiz status or perform other actions when the quiz ends
                quizState.Status = "Completed";
                // ... other actions

                _quizRepository.Update(quiz);
            }
        }
    }

}