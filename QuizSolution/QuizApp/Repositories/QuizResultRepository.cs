// QuizResultRepository.cs
using Microsoft.EntityFrameworkCore;
using QuizApp.Contexts;
using QuizApp.Interfaces;
using QuizApp.Models;
using System;
using System.Collections.Generic;
using System.Linq;

namespace QuizApp.Repositories
{
    public class QuizResultRepository : IRepository<int, QuizResult>
    {
        private readonly QuizContext _context;

        public QuizResultRepository(QuizContext context)
        {
            _context = context;
        }

        public QuizResult Add(QuizResult entity)
        {
            _context.QuizResults.Add(entity);
            _context.SaveChanges();
            return entity;
        }

        public QuizResult Delete(int key)
        {
            var quizResult = GetById(key);
            if (quizResult != null)
            {
                _context.QuizResults.Remove(quizResult);
                _context.SaveChanges();
                return quizResult;
            }
            return null;
        }

        public IList<QuizResult> GetAll()
        {
            return _context.QuizResults.ToList();
        }

        public QuizResult GetById(int key)
        {
            return _context.QuizResults.FirstOrDefault(qr => qr.QuizResultId == key);
        }

        public QuizResult Update(QuizResult entity)
        {
            var existingQuizResult = GetById(entity.QuizResultId);
            if (existingQuizResult != null)
            {
                _context.Entry(existingQuizResult).CurrentValues.SetValues(entity);
                _context.SaveChanges();
                return existingQuizResult;
            }
            return null;
        }


        public IList<QuizResult> GetResultsByUser(string username)
        {
            return _context.QuizResults
                .Where(qr => qr.Username.Equals(username))
                .ToList();
        }

        // Example method to get results by quiz
        public IList<QuizResult> GetResultsByQuiz(int quizId)
        {
            return _context.QuizResults
                .Where(qr => qr.QuizId == quizId)
                .ToList();
        }
    }
}