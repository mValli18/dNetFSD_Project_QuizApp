using QuizApp.Models;

namespace QuizApp.Interfaces
{
    public interface IQuizService
    {
        List<Quiz> GetQuizs();
        Quiz Add(Quiz quiz);
    }
}
