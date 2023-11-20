using QuizApp.Exceptions;
using QuizApp.Interfaces;
using QuizApp.Models;
using QuizApp.Models.DTOs;
using QuizApp.Repositories;

namespace QuizApp.Services
{
    public class QuestionService : IQuestionService
    {
        private readonly IRepository<int, Questions> _questionRepository;
        private readonly IRepository<int, Quiz> _quizRepository;
        private readonly IRepository<int, QuizResult> _quizResultRepository;

        public QuestionService(IRepository<int, Questions> QuestionRepository,
            IRepository<int, Quiz> QuizRepository, IRepository<int, QuizResult> QuizResultRepository)
        {
            Console.WriteLine("QuestionService constructor called");
            _questionRepository = QuestionRepository;
            _quizRepository = QuizRepository;
            _quizResultRepository = QuizResultRepository;
        }
        public bool AddToQuiz(QuestionDTO questionDTO)
        {

            var Check = _questionRepository.GetAll().FirstOrDefault(c => c.QuestionId == questionDTO.QuestionId);
            int questionId = 0;
            if (Check == null)
            {
                var question = _questionRepository.Add(new Questions
                {
                    QuizId = questionDTO.QuizId,
                    QuestionTxt = questionDTO.QuestionTxt,
                    Option1 = questionDTO.Option1,
                    Option2 = questionDTO.Option2,
                    Option3 = questionDTO.Option3,
                    Option4 = questionDTO.Option4,
                    Answer = questionDTO.Answer,
                });
                questionId = questionDTO.QuestionId;
            }
            else
                questionId = Check.QuestionId;
            return true;
        }
        public IList<QuestionDTO> GetAllQuestions()
        {
            var questions = _questionRepository.GetAll();

            // Map entity list to DTO list
            var questionDTOs = questions.Select(q => new QuestionDTO
            {
                QuestionId = q.QuestionId,
                QuizId = q.QuizId,
                QuestionTxt = q.QuestionTxt,
                Option1 = q.Option1,
                Option2 = q.Option2,
                Option3 = q.Option3,
                Option4 = q.Option4
            }).ToList();

            return questionDTOs;
        }
        public IList<Questions> GetQuestionsByQuizId(int quizId)
        {
            if (quizId != 0)
            {
                // Retrieve questions for a specific quiz and order them by QuestionId
                var quizQuestions = _questionRepository
                    .GetAll()
                    .Where(q => q.QuizId == quizId)
                    .OrderBy(q => q.QuestionId)
                    .ToList();
                if (quizQuestions.Count != 0)
                {
                    // Map entity list to DTO list with required properties
                    var questions = quizQuestions.Select((q, index) => new Questions
                    {
                        QuestionId = q.QuestionId,
                        QuestionTxt = q.QuestionTxt,
                        Option1 = q.Option1,
                        Option2 = q.Option2,
                        Option3 = q.Option3,
                        Option4 = q.Option4
                    }).ToList();
                    return questions;
                }
                throw new NoQuestionsAvailableException();
            }

            return null;
        }


        public Questions GetQuestionById(int questionId)
        {
            return _questionRepository.GetById(questionId);
        }
        private bool CheckIfQuestionAlreadyPresent(int questionId, int quizId)
        {
            var question = _questionRepository.GetAll()
                .FirstOrDefault(ci => ci.QuizId == quizId && ci.QuestionId == questionId);
            return question != null ? true : false;
        }
        public bool RemoveFromQuiz(int quizid, int questionid)
        {
            var questionCheck = _questionRepository.GetAll().FirstOrDefault(c => c.QuestionId == questionid);

            bool CheckQuizQuestion = CheckIfQuestionAlreadyPresent(questionid, quizid);
            if (CheckQuizQuestion)
            {
                var result = _questionRepository.Delete(questionid);
                return true;

            }
            return false;
        }
        public void UpdateQuestion(int quizId, int questionId, Questions updatedQuestion)
        {
            if (updatedQuestion == null)
            {
                throw new ArgumentNullException(nameof(updatedQuestion), "Updated question data is null.");
            }


            // Ensure the question with the provided IDs exists
            var existingQuestion = _questionRepository.GetById(questionId);

            if (existingQuestion == null || existingQuestion.QuizId != quizId)
            {
                throw new InvalidOperationException($"Question with ID {questionId} not found in Quiz with ID {quizId}.");
            }

            // Update the properties of the existing question with the values from the updatedQuestion
            existingQuestion.QuestionTxt = updatedQuestion.QuestionTxt;
            existingQuestion.Option1 = updatedQuestion.Option1;
            existingQuestion.Option2 = updatedQuestion.Option2;
            existingQuestion.Option3 = updatedQuestion.Option3;
            existingQuestion.Option4 = updatedQuestion.Option4;
            existingQuestion.Answer = updatedQuestion.Answer;

            // Update the question in the repository
            _questionRepository.Update(existingQuestion);
        }


    }
}