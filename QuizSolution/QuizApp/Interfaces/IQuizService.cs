using QuizApp.Models;

namespace QuizApp.Interfaces
{
    public interface IQuizService
    {
        List<Quiz> GetQuizs();
        Quiz Add(Quiz quiz);

        Quiz GetQuizById(int id);
        Task<Quiz> GetQuizByIdWithQuestions(int id);
        List<Quiz> GetQuizzesByCategory(string category);
        bool DeleteQuizIfNoQuestions(int quizId);
        void UpdateQuiz(Quiz updatedQuiz);
        //public Quiz StartQuiz(int quizId);
    }
}