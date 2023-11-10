using QuizApp.Interfaces;
using QuizApp.Models;
using QuizApp.Exceptions;
namespace QuizApp.Services
{
    public class QuizService : IQuizService
    {
        private readonly IRepository<int, Quiz> _quizRepository;

        public QuizService(IRepository<int, Quiz> repository)
        {
            _quizRepository = repository;
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

    }
}
