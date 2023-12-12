// QuizResultService.cs
using Microsoft.AspNetCore.Mvc;
using QuizApp.Exceptions;
using QuizApp.Interfaces;
using QuizApp.Models;
using QuizApp.Models.DTOs;
using QuizApp.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;

namespace QuizApp.Services
{
    // Implementation of IQuizResultService
    public class QuizResultService : IQuizResultService
    {
        private readonly IRepository<int, Quiz> _quizRepository;
        private readonly IRepository<int, QuizResult> _quizResultRepository;
        private readonly IRepository<int, Questions> _questionRepository;

        // Constructor to inject dependencies
        public QuizResultService(IRepository<int, QuizResult> quizResultRepository, IRepository<int, Questions> questionRepository, IRepository<int, Quiz> quizRepository)
        {
            _quizResultRepository = quizResultRepository ?? throw new ArgumentNullException(nameof(quizResultRepository));
            _questionRepository = questionRepository ?? throw new ArgumentNullException(nameof(questionRepository));
            _quizRepository = quizRepository ?? throw new ArgumentNullException(nameof(quizRepository));
        }

        // Add a quiz result
        public QuizResult AddQuizResult(QuizResult quizResult)
        {
            if (quizResult == null)
                throw new ArgumentNullException(nameof(quizResult));

            return _quizResultRepository.Add(quizResult);
        }

        // Delete a quiz result by ID
        public bool DeleteQuizResult(int quizResultId)
        {
            var existingResult = _quizResultRepository.GetById(quizResultId);
            if (existingResult != null)
            {
                _quizResultRepository.Delete(quizResultId);
                return true;
            }
            return false;
        }

        // Get all quiz results
        public IList<QuizResult> GetAllQuizResults()
        {
            return _quizResultRepository.GetAll();
        }

        // Get a quiz result by ID
        public QuizResult GetQuizResultById(int quizResultId)
        {
            return _quizResultRepository.GetById(quizResultId);
        }

        // Get quiz results by quiz ID and map to DTO
        public IList<QuizResult> GetResultsByQuiz(int quizId)
        {
            return _quizResultRepository
                .GetAll()
                .Where(result => result.QuizId == quizId)
                .Select(result => (result))
                .ToList();
        }

        // Get the total score for a user in a quiz
        public int GetTotalScoreForUserInQuiz(int quizId, string username)
        {
            var quizResults = _quizResultRepository
                .GetAll()
                .Where(result => result.QuizId == quizId && result.Username.Equals(username))
                .ToList();
            if (quizResults != null)
            {
                int totalScore = quizResults.Sum(result => result.Score);

                return totalScore;
            }
            throw new NoQuizResultsAvailableException();
        }
        public int[] GetAnsweredQuizIdsForUser(string username)
        {
            var quizResults = _quizResultRepository
                .GetAll()
                .Where(result => result.Username == username)
                .ToList();

            if (quizResults.Any())
            {
                var answeredQuizIds = quizResults.Select(result => result.QuizId).Distinct().ToArray();
                return answeredQuizIds;
            }

            throw new NoQuizResultsAvailableException();
        }

        // Get quiz results by user and quiz, and map to DTO
        public IList<QuizResultDTO> GetResultsByUserAndQuiz(string username, int quizId)
        {
            var results = _quizResultRepository
                .GetAll()
                .Where(result => result.Username == username && result.QuizId == quizId)
                .Select(result => MapToQuizResultDTO(result))
                .ToList();
            if (results == null)
            {
                throw new NoQuizResultsAvailableException();
            }
            return results;
        }

        // Update a quiz result
        public QuizResult UpdateQuizResult(QuizResult quizResult)
        {
            if (quizResult == null)
                throw new ArgumentNullException(nameof(quizResult));

            var existingResult = _quizResultRepository.GetById(quizResult.QuizResultId);
            if (existingResult != null)
            {
                return _quizResultRepository.Update(quizResult);
            }
            return null;
        }

        // Evaluate an answer and return the result as DTO
        public QuizResultDTO EvaluateAnswer(int quizId, AnswerDTO answerdto)
        {
            var quiz = _quizRepository.GetById(quizId);
            var question = _questionRepository.GetById(answerdto.QuestionId);

            if (quiz == null || question == null)
            {
                // Handle invalid quiz or question
                throw new NotFoundException();
            }

            // Check if the provided question belongs to the specified quiz
            if (question.QuizId != quizId)
            {
                throw new BadRequestException();
            }

            bool userAnswerIsCorrect = (answerdto.UserAnswer.Equals(question.Answer));

            int score = (userAnswerIsCorrect) ? 1 : 0;

            var quizResult = new QuizResult
            {
                QuizId = quizId,
                Username = answerdto.Username,
                QuestionId = answerdto.QuestionId,
                UserAnswer = answerdto.UserAnswer,
                IsCorrect = userAnswerIsCorrect,
                Score = score
            };

            _quizResultRepository.Add(quizResult);

            return MapToQuizResultDTO(quizResult);
        }

        // Map QuizResult entity to QuizResultDTO
        public QuizResultDTO MapToQuizResultDTO(QuizResult result)
        {
            var resultDTO = new QuizResultDTO
            {
                Username = result.Username,
                UserAnswer = result.UserAnswer,
                QuizId = result.QuizId,
                Score = result.Score,
                IsCorrect = result.IsCorrect,
            };

            return resultDTO;
        }

        // Get the leaderboard for a quiz
        public IList<LeaderboardEntryDTO> GetLeaderboard(int quizId)
        {
            return _quizResultRepository
                .GetAll()
                .Where(result => result.QuizId == quizId)
                .GroupBy(result => result.Username)
                .Select(group => new LeaderboardEntryDTO
                {
                    Username = group.Key,
                    Score = group.Sum(result => result.Score)
                })
                .OrderByDescending(entry => entry.Score)
                .ToList();
        }
    }
}