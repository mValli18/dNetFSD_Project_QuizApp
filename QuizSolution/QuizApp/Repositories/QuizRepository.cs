using Microsoft.EntityFrameworkCore;
using QuizApp.Contexts;
using QuizApp.Interfaces;
using QuizApp.Models;

namespace QuizApp.Repositories
{
    public class QuizRepository : IRepository<int, Quiz>
    {
        private readonly QuizContext _context;
        private Quiz quiz;

        public QuizRepository(QuizContext context)
        {
            _context = context;
        }
        public Quiz Add(Quiz entity)
        {
            _context.Quizs.Add(entity);
            _context.SaveChanges();
            return entity;
        }

        public Quiz Delete(int key)
        {
            var product = GetById(key);
            if (product != null)
            {
                _context.Quizs.Remove(quiz);
                _context.SaveChanges();
                return product;
            }
            return null;
        }

        public IList<Quiz> GetAll()
        {
            if (_context.Quizs.Count() == 0)
                return null;
            return _context.Quizs.ToList();
        }

        public Quiz GetById(int key)
        {
            var product = _context.Quizs.SingleOrDefault(u => u.Id == key);
            return quiz;
        }

        public Quiz Update(Quiz entity)
        {
            var quiz = GetById(entity.Id);
            if (quiz != null)
            {
                _context.Entry<Quiz>(quiz).State = EntityState.Modified;
                _context.SaveChanges();
                return quiz;
            }
            return null;
        }
    }
}


