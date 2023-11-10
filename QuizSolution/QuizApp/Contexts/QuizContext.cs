using Microsoft.EntityFrameworkCore;
using QuizApp.Models;
using System.Collections.Generic;
using System.Reflection.Emit;

namespace QuizApp.Contexts
{
    public class QuizContext : DbContext
    {
        public QuizContext(DbContextOptions options) : base(options)
        {

        }
        public DbSet<User> Users { get; set; }
        public DbSet<Quiz> Quizs { get; set; }
        public DbSet<Questions> Questions { get; set; }
        public DbSet<Option> Option { get; set; }
        //public DbSet<Category> Category { get; set; }

        
        /*protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
           
            modelBuilder.Entity<Quiz>()
                .HasMany(q => q.Questions)
                .WithOne(q => q.Quiz_Id)
                .HasForeignKey(q => q.Quiz_Id);

            modelBuilder.Entity<Quiz>()
            .HasOne(q => q.Questions)
            .WithMany()
            .HasForeignKey(q => q.Question_Id);


        }*/
    }
}
