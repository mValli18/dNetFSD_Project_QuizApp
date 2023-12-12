// QuizService.cs
using QuizApp.Exceptions;
using QuizApp.Interfaces;
using QuizApp.Models;
using QuizApp.Models.DTOs;
using QuizApp.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace QuizApp.Services
{
    // Implementation of IQuizService
    public class QuizService : IQuizService
    {
        private readonly IRepository<int, Quiz> _quizRepository;
        private readonly IRepository<int, Questions> _questionRepository;

        // Constructor to inject dependencies
        public QuizService(IRepository<int, Quiz> quizRepository, IRepository<int, Questions> questionRepository)
        {
            _quizRepository = quizRepository;
            _questionRepository = questionRepository;
        }

        // Add a quiz
        public Quiz Add(Quiz quiz)
        {
            var result = _quizRepository.Add(quiz);
            return result;
        }

        // Get all quizzes
        public List<Quiz> GetQuizs()
        {
            var quizs = _quizRepository.GetAll();

            if (quizs != null)
            {
                return quizs.ToList();
            }

            throw new NoQuizsAvailableException();
        }
        public List<string> GetCategories()
        {
            var quizzes = _quizRepository.GetAll();

            if (quizzes != null && quizzes.Count > 0)
            {
                // Extract the distinct Category values from all Quiz entities
                List<string> categories = quizzes.Select(q => q.Category).Distinct().ToList();
                return categories;
            }

            throw new NoQuizsAvailableException();
        }
        public List<string> GetTitles()
        {
            var quizzes = _quizRepository.GetAll();

            if (quizzes != null && quizzes.Count > 0)
            {
                // Extract the distinct Category values from all Quiz entities
                List<string> titles = quizzes.Select(q => q.Title).Distinct().ToList();
                return titles;
            }

            throw new NoQuizsAvailableException();
        }
        public int GetId(string title)
        {
            var quiz = _quizRepository.GetAll().FirstOrDefault(q => q.Title == title);

            if (quiz != null)
            {
                return quiz.QuizId;
            }

            throw new KeyNotFoundException($"Quiz with title '{title}' not found");
        }

        // Get quizzes by category
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

        // Get a quiz by its ID
        public Quiz GetQuizById(int id)
        {
            var res = _quizRepository.GetById(id);

            if (res != null)
            {
                return res;
            }

            throw new NoQuizsAvailableException();
        }

        // Get a quiz by its ID with associated questions
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

        // Delete a quiz if it has no associated questions
        public bool DeleteQuizIfNoQuestions(int quizId)
        {
            var questionsCount = _questionRepository.GetAll().Count(q => q.QuizId == quizId);

            if (questionsCount == 0)
            {
                var deletedQuiz = _quizRepository.Delete(quizId);

                if (deletedQuiz == null)
                {
                    throw new NoQuizsAvailableException();
                }

                return true; // Quiz deleted successfully
            }

            return false; // Quiz has questions, cannot delete
        }

        // Update quiz details
        public Quiz UpdateQuiz(Quiz updatedQuiz)
        {
            if (updatedQuiz != null)
            {
                ValidateQuizTitle(updatedQuiz.Title);
                ValidateQuizTimeLimit(updatedQuiz.Timelimit);

                var existingQuiz = _quizRepository.GetById(updatedQuiz.QuizId);

                if (existingQuiz == null)
                {
                    throw new InvalidOperationException($"Quiz with ID {updatedQuiz.QuizId} not found.");
                }
                existingQuiz.Title = updatedQuiz.Title;
                existingQuiz.Description = updatedQuiz.Description;
                existingQuiz.Timelimit = updatedQuiz.Timelimit;

                var updatedQuizResult = _quizRepository.Update(existingQuiz);

                return updatedQuizResult;
            }
            return null;
        }

        // Validate quiz title
        private void ValidateQuizTitle(string title)
        {
            if (string.IsNullOrWhiteSpace(title))
            {
                throw new ArgumentException("Quiz title cannot be empty or whitespace.", nameof(title));
            }
        }

        // Validate quiz time limit (Example: Ensure it's a positive value)
        private void ValidateQuizTimeLimit(int? timeLimit)
        {
            if (timeLimit < 0)
            {
                throw new ArgumentException("Time limit must be a positive value.", nameof(timeLimit));
            }
        }
    }
}